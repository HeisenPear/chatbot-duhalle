// ═══════════════════════════════════════════════════════════════════════════
// L'ASSISTANT : de la question du client à la réponse.
//
//   Politesse ? → Type de question → Concepts cités (+ relance) → Faits → Texte
//                                         ↘ aucun concept : anglais ? recherche plein texte
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
import { normaliser, racines } from "./texte";
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

/**
 * Une question proposée en bouton, avec le concept dont sa réponse parle : le
 * moteur ne propose pas ce qui vient d'être demandé, et les tests vérifient que
 * chaque question donne bien la réponse attendue.
 */
export interface QuestionProposee {
  readonly question: string;
  readonly concept: string;
}

/** Les réglages du domaine : coordonnées pour les réponses de repli, questions de départ. */
export interface Reglages {
  readonly telephone: string;
  readonly email: string;
  readonly contact: Lien;
  /** Questions proposées à l'ouverture du chat et après une question non comprise. */
  readonly questionsDeDepart: readonly string[];
  /**
   * VENTE ADDITIONNELLE — les questions les plus posées et les plus utiles,
   * proposées en fin de réponse même quand elles ne portent pas sur le sujet du
   * client : il s'intéresse peut-être à un autre produit.
   */
  readonly vitrine?: readonly QuestionProposee[];
  /**
   * Les compléments d'un sujet : ce qu'on achète avec lui (boucheuse avec les
   * bouchons, robinet avec le vinaigrier…). Rangés par concept ; les membres
   * d'une famille héritent des compléments de leur famille.
   */
  readonly complements?: Readonly<Record<string, readonly QuestionProposee[]>>;
  /**
   * Les sujets après lesquels on ne propose aucun produit : un client dont le
   * colis est abîmé ou le paiement refusé n'a pas la tête à acheter.
   */
  readonly sansVente?: readonly string[];
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
/**
 * Un client en colère : injure, reproche fait au chatbot, départ chez un concurrent.
 * Aucun de ces messages n'est une question sur un produit : y répondre par la
 * procédure « pour commander » (comme avant) aggrave la situation. On s'excuse,
 * sans commenter l'injure, et on offre l'équipe.
 */
const INSULTE =
  /\b(?:connard|connards|connasse|salope|salopes|pute|putes|putain|merde|enculer|enculez|encule|enculee|nique|niquer|ntm|fdp|abruti|abrutis|debile|debiles|imbecile|imbeciles|idiot|idiote|idiots|cretin|cretins|batard|batards|bordel|couille|couilles|branle|branler|foutre|ta gueule|va te faire|vas te faire|allez vous faire)\b/;
// Seulement des reproches à la deuxième personne : « je ne sais rien faire » est un débutant, pas un mécontent.
const REPROCHE =
  /\b(?:(?:tu|vous|t) ne? ?(?:ser[st]?|servez) a rien|vous ne connaiss(?:ez|az) pas (?:les )?produits|vous ne connaiss(?:ez|az) rien|vous ne savez rien|tu ne sais rien|tu sais rien|vous ne comprenez rien|tu ne comprends rien|tu comprends rien|n importe quoi|a cote de la plaque|hors sujet|rien a voir avec ma question|pas ma question|ne repond\w* pas a ma question|repondez pas a ma question|(?:vous etes|tu es|t es) nul(?:le)?s?|bot nul|service nul|je vais acheter ailleurs|j achete ailleurs|j irai ailleurs|je vais voir ailleurs)\b/;
/** Mots anglais courants : assez de ces mots, et la phrase est en anglais. */
const MOTS_ANGLAIS = new Set(
  (
    "can could would will shall should may might must please hello hi hey thanks thank ask question questions upload image images picture pictures photo photos " +
    "send sent order orders shipping ship delivery deliver price prices cost wine bottle bottles cork corks stopper help need want have has had how what where " +
    "when which who why is are was were do does did you your yours my mine it its the this that these those there with for to of in at if and not no yes ok " +
    "okay english speak language much many buy sell pay payment free open hours contact phone email address account password invoice refund return product " +
    "products size diameter use used i we us our they their"
  ).split(" "),
);
/** Les mots-outils anglais qui n'existent pas en français : au moins un, en plus des mots courants, pour qu'une phrase soit anglaise (« photo image » est français). */
const MOTS_OUTILS_ANGLAIS = new Set("the you your is are can do does did i it my we to of for with how what where when please thanks thank would could will have has and if in at this that there".split(" "));
/** Un pronom qui renvoie à la réponse précédente : « faut-il le tremper ? », « et ça coûte combien ? ». */
const ANAPHORE = /\b(?:le|la|les|l|ca|cela|il|elle|ils|elles)\b/;
/** Un message qui commence par un article ou un déterminant ouvre un nouveau sujet (« la poignée ? ») : ce n'est pas une suite. */
const DEBUT_DE_SUJET = /^(?:le|la|les|l|un|une|des|du|de|ce|cet|cette|ces) /;
/** Une référence de commande ou de colis (cinq chiffres ou plus) : la valeur n'importe pas, la forme oui. */
const REFERENCE_BRUTE = /\b[a-z]{0,3}\d{5,}[a-z0-9]*\b/gi;

/** Sous cette confiance, la recherche plein texte ne répond pas : on redirige. */
const SEUIL_RECHERCHE = 0.6;
/** Entre ce seuil et le précédent, on propose des pistes sans répondre. */
const SEUIL_PISTES = 0.3;
/** Boutons proposés après une réponse : ceux du sujet d'abord, puis les compléments et la vitrine. */
const MAX_SUGGESTIONS = 4;
const MAX_SUJET = 2;

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

  repondre(brut: string, precedent: Contexte | null = null): Reponse {
    // « commande 1234567 » et « commande [référence] » (la forme enregistrée) se lisent pareil.
    const message = brut.replace(REFERENCE_BRUTE, " reference ");
    const forme = normaliser(message);
    const politesse = this.politesse(forme);
    if (politesse) return politesse;
    // Que des lettres isolées (« e », « u ») : inutile de chercher, on invite à préciser.
    if (!/[a-z0-9]{2,}/.test(forme)) return this.inconnu([], null, null, true);

    const marque = lireTypeDeQuestion(forme);
    let type = marque?.type ?? null;
    let cites = this.plusPrecis(this.detecteur.detecter(message).map((c) => c.concept.id));
    let relance = false;
    let doitToucher: Set<string> | undefined;

    if (precedent) {
      if (cites.length === 0 && (type !== null || this.estUneSuite(message, forme))) {
        // « et combien de temps ? », « comment faire ? », « faut-il le tremper ? » : on parle encore de la même chose.
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
    // Une valeur demandée sans sujet (« quelle dimension fait-il ? ») renvoie aussi à la fiche produit.
    if (cites.length === 0 && racine && (type === "prix" || type === "gamme" || type === "lieu" || (type === "valeur" && racines(message).length <= 2))) {
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

    // Une question en anglais ne se retrouve pas dans une base en français : on le dit,
    // plutôt que de proposer au hasard un fait qui partage un mot avec elle.
    if (cites.length === 0 && this.estAnglais(forme)) return this.anglais();

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

  /**
   * Les questions proposées après une réponse : d'abord le sujet (« voir aussi »,
   * déclinaisons), puis les compléments du sujet, puis la vitrine des questions
   * les plus utiles. Jamais plus de MAX_SUGGESTIONS, jamais le sujet qu'on vient de traiter.
   */
  private suggestions(cites: readonly string[], faits: readonly FaitRetenu[]): string[] {
    const exclus = new Set([...cites, ...faits.flatMap((f) => f.fait.concepts)]);
    const sujet: Concept[] = [];
    const ajouter = (c: Concept | undefined) => {
      if (c && !exclus.has(c.id) && !sujet.some((s) => s.libelle === c.libelle)) sujet.push(c);
    };
    for (const id of cites) this.detecteur.concept(id)?.voirAussi?.forEach((v) => ajouter(this.detecteur.concept(v)));
    for (const id of cites) this.detecteur.enfants(id).forEach(ajouter);

    const { vitrine = [], complements = {}, sansVente = [] } = this.reglages;
    // Le sujet réellement traité (les concepts des faits retenus), puis celui de la question : « le diamètre du
    // robinet du fût » peut citer le robinet de vinaigrier, mais c'est le fût qu'on a répondu.
    const traites = [...new Set([...faits.flatMap((f) => f.fait.concepts), ...cites])];
    const lignee = [...new Set(traites.flatMap((id) => this.detecteur.lignee(id).map((c) => c.id)))];
    const proposees = [...lignee.flatMap((id) => complements[id] ?? []), ...vitrine];
    if (proposees.length === 0 || lignee.some((id) => sansVente.includes(id))) return sujet.slice(0, 3).map((c) => c.libelle);

    const gardes = sujet.slice(0, MAX_SUJET);
    const out = gardes.map((c) => c.libelle);
    for (const { question, concept } of proposees) {
      if (out.length >= MAX_SUGGESTIONS) break;
      // Une question sur le sujet lui-même (ou sur sa famille), ou sur un bouton déjà proposé, n'apprend rien au client.
      if (lignee.includes(concept) || exclus.has(concept) || gardes.some((c) => c.id === concept) || out.includes(question)) continue;
      out.push(question);
    }
    return out;
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

  /**
   * « Faut-il le tremper ? » : peu de mots utiles et un pronom qui renvoie à la
   * réponse précédente. Sans ce pronom, une question courte n'est pas une suite.
   */
  private estUneSuite(message: string, forme: string): boolean {
    const utiles = racines(message).length;
    return utiles >= 1 && utiles <= 2 && ANAPHORE.test(forme) && !DEBUT_DE_SUJET.test(forme);
  }

  private estAnglais(forme: string): boolean {
    const mots = forme.split(" ").filter(Boolean);
    const anglais = mots.filter((m) => MOTS_ANGLAIS.has(m)).length;
    return anglais >= 2 && anglais / mots.length >= 0.5 && mots.some((m) => MOTS_OUTILS_ANGLAIS.has(m));
  }

  private anglais(): Reponse {
    const { telephone, email, contact } = this.reglages;
    return {
      nature: "politesse",
      texte: `Je ne réponds qu'en français. Posez-moi votre question en français, ou contactez notre service client au **${telephone}** ou à **${email}**.\n\nI can only answer in French. Please ask your question in French, or contact our customer service by phone (**${telephone}**) or by e-mail (**${email}**).`,
      liens: [contact],
      suggestions: [...this.reglages.questionsDeDepart],
      contexte: { concepts: [], type: null },
      trace: { type: null, signal: null, concepts: [], relance: false, faits: [], plan: [] },
    };
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

    // « Bonjour, U » : une salutation suivie d'une lettre égarée reste une salutation.
    const sansLettresSeules = forme.replace(/\b[a-z]\b/g, " ").replace(/\s+/g, " ").trim();
    if (forme === "" || SALUTATION.test(forme) || (sansLettresSeules !== forme && SALUTATION.test(sansLettresSeules))) {
      return simple(
        "accueil",
        "Bonjour et bienvenue chez Duhallé. Je réponds à vos questions sur nos produits et sur le savoir-faire du bouchage, de la mise en bouteille, du cidre, du vinaigre et des conserves maison. Que puis-je faire pour vous ?",
      );
    }
    // « Anglaise », « do you speak English ? » : on répond dans les deux langues.
    if ((forme.split(" ").length <= 2 && /\b(?:anglais|anglaise|english)\b/.test(forme)) || /\b(?:parlez vous|speak|en) (?:anglais|english)\b/.test(forme)) {
      return this.anglais();
    }
    if (INSULTE.test(forme) || REPROCHE.test(forme)) {
      return simple(
        "politesse",
        `Je suis désolé de ne pas avoir su vous aider. Je suis un programme qui répond d'après notre base de connaissances, et il m'arrive de passer à côté d'une question. Vous pouvez la reformuler avec d'autres mots, ou vous adresser directement à l'équipe : **${telephone}** (service gratuit) ou **${email}**.`,
        [contact],
        [],
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

  /** Un message sans mot utile (« e ») : on invite à poser la question en quelques mots. */
  private inconnu(pistes: readonly Concept[], type: TypeDeQuestion | null, signal: string | null, vide = false): Reponse {
    const { telephone, email, contact, questionsDeDepart } = this.reglages;
    const libelles = [...new Set(pistes.map((c) => c.libelle))].slice(0, 3);
    const texte = vide
      ? "Je n'ai pas bien saisi votre message. Posez-moi votre question en quelques mots, par exemple l'une de celles-ci :"
      : libelles.length > 0
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
