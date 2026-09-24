// ═══════════════════════════════════════════════════════════════════════════
// L'ASSISTANT : de la question du client à la réponse.
//
//   Politesse ? → Type de question → Concepts cités (+ relance) → Faits → Texte
//                                         ↘ aucun concept : recherche plein texte
//                                                          ↘ rien de sûr : service client
//
// Le chatbot ne fait QUE répondre. Il n'a accès ni aux comptes, ni aux
// commandes : tout ce qui demande une action renvoie vers le site ou le
// service client.
// ═══════════════════════════════════════════════════════════════════════════
import type { BaseDeSavoir, Concept, Lien, TypeDeQuestion } from "../savoir/types";
import { TYPES_DE_QUESTION } from "../savoir/types";
import { DetecteurDeConcepts } from "./concepts";
import { RechercheDansLesFaits } from "./recherche";
import { ConstructeurDeReponse, type FaitRetenu } from "./reponse";
import { normaliser } from "./texte";
import { lireTypeDeQuestion } from "./types-de-question";

/** Ce que le widget renvoie avec la question suivante, pour les relances. */
export interface Contexte {
  readonly concepts: readonly string[];
  readonly type: TypeDeQuestion | null;
}

export type Nature = "reponse" | "recherche" | "accueil" | "politesse" | "inconnu";

export interface Reponse {
  readonly nature: Nature;
  /** Texte affiché (mise en forme légère : **gras**, listes, paragraphes). */
  readonly texte: string;
  readonly liens: readonly Lien[];
  /** Questions cliquables proposées ensuite. */
  readonly suggestions: readonly string[];
  readonly contexte: Contexte;
  /** Pourquoi cette réponse : type lu, concepts cités, faits retenus. */
  readonly trace: Trace;
}

export interface Trace {
  readonly type: TypeDeQuestion | null;
  readonly signal: string | null;
  readonly concepts: readonly string[];
  /** Les concepts viennent de la question précédente. */
  readonly relance: boolean;
  readonly faits: readonly string[];
  readonly plan: readonly string[];
}

/** Les réglages du domaine : coordonnées pour les réponses de repli, questions de départ. */
export interface Reglages {
  readonly telephone: string;
  readonly email: string;
  readonly contact: Lien;
  /** Questions proposées à l'ouverture du chat et après une question non comprise. */
  readonly questionsDeDepart: readonly string[];
  /**
   * Le concept qui répond aux questions sans sujet mais au type clair
   * (« c'est cher ? », « vous vendez quoi ? ») : la racine du catalogue.
   */
  readonly conceptRacine?: string;
}

/** Une relance commence par une coordination : « et pour le cidre ? », « aussi pour… ». */
const RELANCE = /^(?:et|aussi|pareil|idem|meme chose|egalement|sinon)\b/;
/** Les formules de politesse reconnues, sur la phrase normalisée entière. */
const SALUTATION = /^(?:bonjour|bonsoir|salut|hello|coucou|hey|bjr|slt|yo)(?: (?:a vous|a tous|madame|monsieur|l equipe|duhalle))*$/;
const REMERCIEMENT = /^(?:(?:merci|thanks|parfait|super|genial|top|cool|nickel|ok|d accord|tres bien|c est note|entendu)(?: (?:beaucoup|bien|pour (?:tout|votre aide|l info|la reponse|les infos)|infiniment|a vous))*)+$/;
const AU_REVOIR = /^(?:au revoir|bonne (?:journee|soiree|fin de journee)|a bientot|a plus|bye|ciao)(?: .*)?$/;
const IDENTITE = /\b(?:qui es tu|tu es qui|t es qui|robot|bot|chatbot|es tu humain|etes vous humain|es tu une personne|chatgpt|intelligence artificielle|une ia|l ia)\b/;
const HUMAIN = /\b(?:parler a (?:un|une|quelqu)|un humain|une vraie personne|une personne|un conseiller|une conseillere|joindre quelqu un)\b/;

/** Sous cette confiance, la recherche plein texte ne répond pas : on redirige. */
const SEUIL_RECHERCHE = 0.6;
/** Entre ce seuil et le précédent, on propose des pistes sans répondre. */
const SEUIL_PISTES = 0.3;

export class Assistant {
  private readonly detecteur: DetecteurDeConcepts;
  private readonly constructeur: ConstructeurDeReponse;
  private readonly recherche: RechercheDansLesFaits;

  constructor(
    private readonly base: BaseDeSavoir,
    private readonly reglages: Reglages,
  ) {
    this.detecteur = new DetecteurDeConcepts(base);
    this.constructeur = new ConstructeurDeReponse(base.faits, this.detecteur);
    this.recherche = new RechercheDansLesFaits(base);
  }

  /** Nettoie un contexte reçu du navigateur : on ne garde que des ids connus. */
  contexteValide(brut: unknown): Contexte | null {
    if (!brut || typeof brut !== "object") return null;
    const { concepts, type } = brut as { concepts?: unknown; type?: unknown };
    const ids = Array.isArray(concepts)
      ? concepts.filter((c): c is string => typeof c === "string" && this.detecteur.concept(c) !== undefined).slice(0, 5)
      : [];
    const typeValide = TYPES_DE_QUESTION.find((t) => t === type) ?? null;
    return ids.length > 0 ? { concepts: ids, type: typeValide } : null;
  }

  repondre(message: string, precedent: Contexte | null = null): Reponse {
    const forme = normaliser(message);
    const politesse = this.politesse(forme);
    if (politesse) return politesse;

    const marque = lireTypeDeQuestion(forme);
    let type = marque?.type ?? null;
    let cites = this.plusPrecis(this.detecteur.detecter(message).map((c) => c.concept.id));
    let relance = false;
    let doitToucher: Set<string> | undefined;

    if (precedent) {
      if (cites.length === 0 && type !== null) {
        // « et combien de temps ? », « comment faire ? » : on parle encore de la même chose.
        cites = [...precedent.concepts];
        relance = true;
      } else if (cites.length > 0 && RELANCE.test(forme)) {
        // « et pour le cidre ? » : la question précédente, appliquée au nouveau concept.
        doitToucher = this.lignees(cites);
        cites = [...cites, ...precedent.concepts.filter((c) => !cites.includes(c))];
        type ??= precedent.type;
        relance = true;
      }
    }

    // « C'est cher ? », « vous vendez quoi ? » : un type clair sans sujet vise le catalogue entier.
    const racine = this.reglages.conceptRacine;
    if (cites.length === 0 && racine && (type === "prix" || type === "gamme" || type === "lieu")) {
      cites = [racine];
    }

    if (cites.length > 0) {
      const mots = this.detecteur.racinesCorrigees(message);
      const construction = this.constructeur.construire(cites, type, doitToucher ? { doitToucher, mots } : { mots });
      if (construction.faits.length > 0) {
        return this.mettreEnForme("reponse", construction.faits, construction.liens, cites, type, {
          signal: marque?.signal ?? null,
          relance,
          plan: construction.plan,
        });
      }
    }

    // Aucun concept reconnu (ou rien à en dire) : recherche dans le texte des faits.
    const trouves = this.recherche.chercher(message);
    const meilleur = trouves[0];
    if (meilleur && meilleur.confiance >= SEUIL_RECHERCHE) {
      const retenus: FaitRetenu[] = [{ fait: meilleur.fait, specificite: meilleur.confiance, score: meilleur.confiance }];
      const liens = meilleur.fait.concepts.map((id) => this.detecteur.concept(id)?.lien).filter((l): l is Lien => !!l);
      return this.mettreEnForme("recherche", retenus, [...(meilleur.fait.liens ?? []), ...liens].slice(0, 3), [...meilleur.fait.concepts], type, {
        signal: marque?.signal ?? null,
        relance: false,
        plan: [],
      });
    }

    const pistes = trouves
      .filter((t) => t.confiance >= SEUIL_PISTES)
      .flatMap((t) => t.fait.concepts)
      .map((id) => this.detecteur.concept(id))
      .filter((c): c is Concept => !!c);
    return this.inconnu(pistes, marque?.type ?? null, marque?.signal ?? null);
  }

  // ─── Mise en forme ────────────────────────────────────────────────────────

  private mettreEnForme(
    nature: Nature,
    faits: readonly FaitRetenu[],
    liens: readonly Lien[],
    cites: readonly string[],
    type: TypeDeQuestion | null,
    trace: { signal: string | null; relance: boolean; plan: readonly string[] },
  ): Reponse {
    const concepts = [...new Set(faits.flatMap((f) => f.fait.concepts))];
    return {
      nature,
      texte: faits.map((f) => f.fait.enonce.trim()).join("\n\n"),
      liens: [...liens],
      suggestions: this.suggestions(cites, faits),
      contexte: { concepts: [...new Set([...cites, ...concepts])].slice(0, 5), type },
      trace: { type, concepts: [...cites], faits: faits.map((f) => f.fait.id), ...trace },
    };
  }

  /** « Voir aussi » : les concepts proches des concepts cités, puis leurs déclinaisons. */
  private suggestions(cites: readonly string[], faits: readonly FaitRetenu[]): string[] {
    const exclus = new Set([...cites, ...faits.flatMap((f) => f.fait.concepts)]);
    const out: string[] = [];
    const ajouter = (c: Concept | undefined) => {
      if (c && !exclus.has(c.id) && !out.includes(c.libelle)) out.push(c.libelle);
    };
    for (const id of cites) this.detecteur.concept(id)?.voirAussi?.forEach((v) => ajouter(this.detecteur.concept(v)));
    for (const id of cites) this.detecteur.enfants(id).forEach(ajouter);
    return out.slice(0, 3);
  }

  /**
   * Quand la question cite un concept ET sa famille directe (« vous livrez en
   * Belgique ? » : la livraison, et la livraison hors France), le plus précis
   * suffit : la famille reste atteignable par sa lignée. Une famille plus
   * lointaine reste citée : dans « j'ai du mal à enfoncer le bouchon avec ma
   * boucheuse à levier », le sujet est le bouchage, pas la boucheuse.
   */
  private plusPrecis(ids: readonly string[]): string[] {
    return ids.filter((id) => !ids.some((autre) => autre !== id && this.detecteur.concept(autre)?.famille === id));
  }

  private lignees(ids: readonly string[]): Set<string> {
    return new Set(ids.flatMap((id) => this.detecteur.lignee(id).map((c) => c.id)));
  }

  private politesse(forme: string): Reponse | null {
    const { telephone, email, contact, questionsDeDepart } = this.reglages;
    const simple = (nature: Nature, texte: string, liens: Lien[] = [], suggestions = questionsDeDepart): Reponse => ({
      nature,
      texte,
      liens,
      suggestions: [...suggestions],
      contexte: { concepts: [], type: null },
      trace: { type: null, signal: null, concepts: [], relance: false, faits: [], plan: [] },
    });

    if (forme === "" || SALUTATION.test(forme)) {
      return simple(
        "accueil",
        "Bonjour et bienvenue chez Duhallé. Je réponds à vos questions sur nos produits et sur le savoir-faire du bouchage, de la mise en bouteille, du cidre, du vinaigre et des conserves maison. Que puis-je faire pour vous ?",
      );
    }
    if (REMERCIEMENT.test(forme)) {
      return simple("politesse", "Avec plaisir. Avez-vous une autre question ?");
    }
    if (AU_REVOIR.test(forme)) {
      return simple("politesse", "Merci de votre visite et à bientôt chez Duhallé.", [], []);
    }
    if (IDENTITE.test(forme)) {
      return simple(
        "politesse",
        `Je suis l'assistant en ligne de Duhallé : un programme qui répond à partir de notre base de connaissances, sans intelligence artificielle générative. Pour échanger avec un membre de l'équipe, appelez le **${telephone}** ou écrivez à **${email}**.`,
        [contact],
      );
    }
    if (HUMAIN.test(forme)) {
      return simple(
        "politesse",
        `Notre service client est là pour vous : appelez le **${telephone}** (service gratuit) ou écrivez à **${email}**.`,
        [contact],
      );
    }
    return null;
  }

  private inconnu(pistes: readonly Concept[], type: TypeDeQuestion | null, signal: string | null): Reponse {
    const { telephone, email, contact, questionsDeDepart } = this.reglages;
    const libelles = [...new Set(pistes.map((c) => c.libelle))].slice(0, 3);
    const texte =
      libelles.length > 0
        ? "Je ne suis pas certain d'avoir compris votre question. Parlez-vous de l'un de ces sujets ?"
        : `Je n'ai pas trouvé de réponse fiable à cette question dans ma base de connaissances. Vous pouvez la reformuler avec d'autres mots, ou contacter notre service client au **${telephone}** ou à **${email}** : l'équipe vous répondra avec plaisir.`;
    return {
      nature: "inconnu",
      texte,
      liens: libelles.length > 0 ? [] : [contact],
      suggestions: libelles.length > 0 ? libelles : [...questionsDeDepart],
      contexte: { concepts: [], type: null },
      trace: { type, signal, concepts: [], relance: false, faits: [], plan: [] },
    };
  }

  /** Nombre de concepts et de faits, pour le contrôle de santé. */
  get taille(): { concepts: number; faits: number } {
    return { concepts: this.base.concepts.length, faits: this.base.faits.length };
  }
}
