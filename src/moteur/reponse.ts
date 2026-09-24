// ═══════════════════════════════════════════════════════════════════════════
// CONSTRUIRE LA RÉPONSE : les faits des concepts cités, dans le plan du type.
//
// 1. Chaque concept cité apporte sa LIGNÉE (lui, sa famille, …). Un concept
//    cité pèse 1, sa famille 1/2, la famille de sa famille 1/3… Le premier
//    concept de la phrase (sa tête) pèse un peu plus que les suivants.
// 2. Un fait est candidat si TOUS ses concepts sont dans ces lignées. Sa
//    SPÉCIFICITÉ vaut son maillon le plus faible, multiplié par son nombre de
//    concepts : un fait sur « bouchon + vin de garde » (2) passe devant un
//    fait sur « bouchon » (1), qui passe devant un fait du catalogue (1/4).
// 3. Pour chaque aspect du plan, le niveau le plus spécifique répond, et lui
//    seul : un fait propre au produit REMPLACE le fait général, il ne s'y
//    ajoute pas.
// 4. Avec un type de question précis, le premier aspect trouvé dans le plan
//    répond ; sans type, ou avec un type « souple » (conseil, oui/non,
//    permission), c'est le plus spécifique. Les aspects suivants ne complètent
//    la réponse que s'ils sont au moins aussi spécifiques et parlent du même
//    sujet. À spécificité égale, le fait qui reprend les mots de la question
//    passe devant.
//
// Aucune phrase qui ne remonte pas à un fait : la réponse n'invente rien.
// ═══════════════════════════════════════════════════════════════════════════
import type { Aspect, Fait, Lien, TypeDeQuestion } from "../savoir/types";
import { PLANS_DE_REPONSE, PLAN_PAR_DEFAUT } from "../savoir/types";
import type { DetecteurDeConcepts } from "./concepts";
import { racines } from "./texte";

/** Le plan d'un type souple, complété par les autres aspects dans l'ordre par défaut. */
function avecLeReste(plan: readonly Aspect[]): Aspect[] {
  return [...plan, ...PLAN_PAR_DEFAUT.filter((a) => !plan.includes(a))];
}

const MAX_FAITS = 3;
const MAX_FAITS_PAR_ASPECT = 2;
const MAX_LIENS = 3;
/** Dans un même aspect, on garde les faits presque aussi spécifiques que le meilleur. */
const TOLERANCE = 0.75;
/**
 * À spécificité égale, le fait dont le texte reprend des mots précis de la
 * question passe devant (« risque de botulisme ? » → le fait qui parle du
 * botulisme).
 * Le bonus reste inférieur au plus petit écart entre deux niveaux de lignée.
 */
const BONUS_PAR_MOT = 0.015;
const BONUS_MAX = 0.05;
/**
 * Les types dont le plan n'est qu'une préférence : « que faire ? », « est-ce
 * que… ? », « je peux… ? » ne réclament pas un aspect précis. Le fait le plus
 * spécifique répond en premier.
 */
const TYPES_SOUPLES: ReadonlySet<TypeDeQuestion> = new Set(["conseil", "fait", "permission"]);
/**
 * Pour un type précis, le premier aspect du plan répond… à condition de ne
 * pas être plus d'un niveau de lignée en dessous du meilleur fait du plan :
 * « comment reconnaître une bouteille qui supporte la pression ? » ne répond
 * pas par la procédure générale de mise en bouteille, trois crans plus haut.
 * Le prix et le lieu font exception : leur réponse générale est voulue.
 */
const ECART_DE_NIVEAU = 0.5;
/** Pour un type souple, un fait de l'un de ses aspects préférés passe devant à niveau égal. */
const BONUS_DU_PLAN = 0.05;
/** Les seuls types auxquels répondent les faits généraux de la racine. */
const TYPES_DE_LA_RACINE: ReadonlySet<TypeDeQuestion> = new Set(["prix", "lieu"]);

export interface FaitRetenu {
  readonly fait: Fait;
  /** Le niveau de lignée qui le porte : son concept le moins proche de la question, fois son nombre de concepts. */
  readonly specificite: number;
  /** La spécificité, plus un petit bonus pour les mots de la question repris : sert au classement. */
  readonly score: number;
}

export interface Construction {
  readonly faits: readonly FaitRetenu[];
  readonly plan: readonly Aspect[];
  readonly liens: readonly Lien[];
}

export interface OptionsDeConstruction {
  /**
   * Si fourni, chaque fait retenu doit toucher au moins un de ces concepts
   * (ou de leurs familles). Sert aux relances « et pour le cidre ? » : la
   * réponse doit parler du NOUVEAU concept, pas redire la précédente.
   */
  readonly doitToucher?: ReadonlySet<string>;
  /** Les racines des mots de la question : départagent deux faits de même niveau. */
  readonly mots?: readonly string[];
}

export class ConstructeurDeReponse {
  private readonly faitsParConcept = new Map<string, Fait[]>();

  private readonly motsDesFaits = new Map<string, Set<string>>();

  constructor(
    faits: readonly Fait[],
    private readonly detecteur: DetecteurDeConcepts,
  ) {
    for (const fait of faits) {
      // Les mots qui PRÉCISENT le fait : ceux de son texte, moins les noms de ses
      // concepts (déjà comptés par la détection). « Botulisme » départage deux
      // faits sur les conserves ; « conserve » ne départage rien.
      const noms = new Set(
        fait.concepts.flatMap((id) => {
          const c = detecteur.concept(id);
          return c ? [c.libelle, ...c.alias].flatMap((a) => racines(a)) : [];
        }),
      );
      this.motsDesFaits.set(fait.id, new Set(racines(fait.enonce).filter((m) => !noms.has(m))));
      for (const id of fait.concepts) {
        const liste = this.faitsParConcept.get(id) ?? [];
        liste.push(fait);
        this.faitsParConcept.set(id, liste);
      }
    }
  }

  /**
   * Poids de chaque concept atteignable depuis les concepts cités.
   *
   * - La TÊTE de la phrase pèse plus : dans « étiquettes pour mes bouteilles »,
   *   on parle d'étiquettes ; la bouteille n'est que la destination. Chaque
   *   concept cité après le premier perd un dixième.
   * - On remonte la lignée (la famille pèse 1/2, la famille de la famille 1/3…).
   */
  poids(cites: readonly string[]): Map<string, number> {
    const poids = new Map<string, number>();
    cites.forEach((id, rang) => {
      const tete = Math.max(0.7, 1 - 0.1 * rang);
      this.detecteur.lignee(id).forEach((c, distance) => poids.set(c.id, Math.max(poids.get(c.id) ?? 0, tete / (1 + distance))));
    });
    return poids;
  }

  /**
   * Pour une question de CHOIX, on descend d'un cran : « quelle cire ? »
   * trouve le choix posé sur ses membres, la cire dure et la cire souple. Un
   * tel fait ne doit parler QUE des membres : « bouchon + vin de garde » ne
   * répond pas à « quel bouchon pour mon vin ? », où la garde n'est pas dite.
   */
  private membres(cites: readonly string[], dejaAtteints: ReadonlyMap<string, number>): Map<string, number> {
    const membres = new Map<string, number>();
    cites.forEach((id, rang) => {
      const tete = Math.max(0.7, 1 - 0.1 * rang);
      for (const enfant of this.detecteur.enfants(id)) {
        if (!dejaAtteints.has(enfant.id)) membres.set(enfant.id, Math.max(membres.get(enfant.id) ?? 0, tete / 3));
      }
    });
    return membres;
  }

  /**
   * Les faits dont tous les concepts sont atteignables, avec leur spécificité.
   *
   * ⚠️ UN FAIT DE LA RACINE NE RÉPOND PAS À TOUT. « Les prix sont sur la fiche
   * produit » vaut pour tout le catalogue, mais seulement quand on demande un
   * prix ou un lieu — ou quand la racine est citée elle-même. Sans cette
   * garde, « où en est ma commande ? » ressortait la gamme du catalogue.
   */
  candidats(cites: readonly string[], type: TypeDeQuestion | null, options: OptionsDeConstruction = {}): FaitRetenu[] {
    const poids = this.poids(cites);
    const membres = type === "choix" ? this.membres(cites, poids) : new Map<string, number>();
    const racineAdmise = (id: string) =>
      this.detecteur.concept(id)?.famille !== undefined || cites.includes(id) || (type !== null && TYPES_DE_LA_RACINE.has(type));
    const vus = new Set<string>();
    const out: FaitRetenu[] = [];
    for (const id of [...poids.keys(), ...membres.keys()]) {
      for (const fait of this.faitsParConcept.get(id) ?? []) {
        if (vus.has(fait.id)) continue;
        vus.add(fait.id);
        const parLaLignee = fait.concepts.every((c) => poids.has(c) && racineAdmise(c));
        const parLesMembres = fait.concepts.every((c) => membres.has(c));
        if (!parLaLignee && !parLesMembres) continue;
        if (options.doitToucher && !fait.concepts.some((c) => options.doitToucher!.has(c))) continue;
        const mots = this.motsDesFaits.get(fait.id)!;
        const repris = new Set((options.mots ?? []).filter((m) => mots.has(m))).size;
        const bonus = Math.min(BONUS_MAX, repris * BONUS_PAR_MOT);
        // Un fait à plusieurs concepts vaut autant de fois son maillon le plus
        // faible : « bouchon + vin de garde », tous deux cités, pèse près de 2 ;
        // « bouteille + cidre », quand seule une bouteille champenoise est
        // citée, ne pèse pas plus que le fait propre à la bouteille champenoise.
        const specificite =
          Math.min(...fait.concepts.map((c) => poids.get(c) ?? membres.get(c) ?? 0)) * fait.concepts.length;
        out.push({ fait, specificite, score: specificite + bonus });
      }
    }
    return out;
  }

  construire(cites: readonly string[], type: TypeDeQuestion | null, options: OptionsDeConstruction = {}): Construction {
    const candidats = this.candidats(cites, type, options);
    const souple = type === null || TYPES_SOUPLES.has(type);
    // Un type souple garde ses aspects préférés en tête, mais tous les aspects restent possibles.
    let plan = type === null ? PLAN_PAR_DEFAUT : souple ? avecLeReste(PLANS_DE_REPONSE[type]) : PLANS_DE_REPONSE[type];
    const strict = type !== null && TYPES_DE_LA_RACINE.has(type);
    const prefere = type !== null && souple ? new Set(PLANS_DE_REPONSE[type]) : null;
    let faits = this.selectionner(candidats, plan, !souple, strict, prefere);
    if (faits.length === 0 && type !== null) {
      // Le type ne trouve rien à dire sur ces concepts : on présente ce qu'on sait.
      plan = PLAN_PAR_DEFAUT;
      faits = this.selectionner(candidats, plan, false, false, null);
    }
    return { faits, plan, liens: this.liens(faits, cites) };
  }

  private selectionner(
    candidats: readonly FaitRetenu[],
    plan: readonly Aspect[],
    suivreLePlan: boolean,
    strict: boolean,
    prefere: ReadonlySet<Aspect> | null,
  ): FaitRetenu[] {
    const groupes: Array<{ aspect: Aspect; specificite: number; score: number; faits: FaitRetenu[] }> = [];
    for (const aspect of plan) {
      const duType = candidats.filter((c) => c.fait.aspect === aspect);
      if (duType.length === 0) continue;
      const max = Math.max(...duType.map((c) => c.specificite));
      const faits = duType
        .filter((c) => c.specificite >= max * TOLERANCE)
        .sort((a, b) => b.score - a.score)
        .slice(0, MAX_FAITS_PAR_ASPECT);
      const bonus = prefere?.has(aspect) ? BONUS_DU_PLAN : 0;
      groupes.push({ aspect, specificite: max, score: Math.max(...faits.map((f) => f.score)) + bonus, faits });
    }
    if (groupes.length === 0) return [];

    const meilleur = Math.max(...groupes.map((g) => g.specificite));
    const principal = suivreLePlan
      ? (strict ? groupes[0] : groupes.find((g) => g.specificite >= meilleur * ECART_DE_NIVEAU))!
      : groupes.reduce((a, b) => (b.score > a.score ? b : a));
    // Un complément doit être au moins aussi spécifique que le principal, et
    // parler de la même chose : un de ses concepts est celui du principal, sa
    // famille ou l'un de ses membres. « Quel bouchon pour mon vin ? » ne se
    // complète pas par la gamme du vin, qui ne partage avec le bouchon que la
    // racine du catalogue.
    const sujets = principal.faits.flatMap((f) => f.fait.concepts);
    const retenus = groupes.filter(
      (g) =>
        g === principal ||
        (g.specificite >= principal.specificite && g.faits.some((f) => f.fait.concepts.some((c) => sujets.some((s) => this.lies(c, s))))),
    );
    // Le principal d'abord, puis les compléments dans l'ordre du plan.
    retenus.sort((a, b) => (a === principal ? -1 : b === principal ? 1 : plan.indexOf(a.aspect) - plan.indexOf(b.aspect)));
    return retenus.flatMap((g) => g.faits).slice(0, MAX_FAITS);
  }

  /** Deux concepts sont liés si l'un est dans la lignée de l'autre. */
  private lies(a: string, b: string): boolean {
    return a === b || this.detecteur.lignee(a).some((c) => c.id === b) || this.detecteur.lignee(b).some((c) => c.id === a);
  }

  private liens(faits: readonly FaitRetenu[], cites: readonly string[]): Lien[] {
    const out: Lien[] = [];
    const ajouter = (lien: Lien | undefined) => {
      if (lien && !out.some((l) => l.url === lien.url)) out.push(lien);
    };
    for (const { fait } of faits) fait.liens?.forEach(ajouter);
    // Puis la page du concept le plus précis de chaque fait retenu, et des concepts cités.
    for (const { fait } of faits) {
      for (const id of fait.concepts) ajouter(this.detecteur.concept(id)?.lien);
    }
    for (const id of cites) ajouter(this.detecteur.concept(id)?.lien);
    return out.slice(0, MAX_LIENS);
  }
}
