// ═══════════════════════════════════════════════════════════════════════════
// CONSTRUIRE LA RÉPONSE : les faits des concepts cités, dans le plan du type.
//
// 1. Chaque concept cité apporte sa LIGNÉE (lui, sa famille, …). Un concept
//    cité pèse 1, sa famille 1/2, la famille de sa famille 1/3… Le premier
//    concept de la phrase (sa tête) pèse un peu plus que les suivants. Un
//    concept reconnu par le sens (« flacon » → « bouteille ») pèse moins qu'un
//    alias exact (sa confiance multiplie son poids).
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

/**
 * Le rôle d'un concept cité dans la phrase (phrase.ts) : l'objet demandé, sa destination, une contrainte, ou une
 * exclusion (le concept est nié : « sans sulfites »).
 */
export type RoleDeConcept = "objet" | "destination" | "contrainte" | "exclusion";
/** Le poids d'un concept selon son rôle ; chaque concept suivant du même rôle perd un dixième, jusqu'à 0,7. */
const POIDS_DU_ROLE: Readonly<Record<RoleDeConcept, number>> = { objet: 1, destination: 0.9, contrainte: 0.8, exclusion: 0.7 };
/** Une valeur demandée (« 24 mm ») que le texte d'un fait contient le favorise : le bonus est celui des mots, en plus fort. */
const BONUS_PAR_NOMBRE = 0.03;
const BONUS_NOMBRES_MAX = 0.06;
/** Un fait qui ne parle que d'un concept nié (« sans boucheuse ») passe après les autres. */
const FACTEUR_DES_NIEES = 0.5;

export interface OptionsDeConstruction {
  /**
   * Si fourni, chaque fait retenu doit toucher au moins un de ces concepts
   * (ou de leurs familles). Sert aux relances « et pour le cidre ? » : la
   * réponse doit parler du NOUVEAU concept, pas redire la précédente.
   */
  readonly doitToucher?: ReadonlySet<string>;
  /** Les racines des mots de la question : départagent deux faits de même niveau. */
  readonly mots?: readonly string[];
  /**
   * La confiance de chaque concept cité, quand elle est inférieure à 1 : un concept reconnu par le sens
   * (« flacon » → « bouteille ») pèse moins qu'un concept cité par ses propres mots.
   */
  readonly confiances?: ReadonlyMap<string, number>;
  /**
   * Le rôle de chaque concept cité. L'OBJET demandé est la tête de la phrase (poids 1), puis la destination (0,9), les
   * contraintes (0,8) et les concepts niés (0,7) : « quelle boucheuse pour mes bouteilles ? » parle de la boucheuse, pas des
   * bouteilles, et « pour boucher mes bouteilles, quelle boucheuse ? » aussi. Sans rôles, le premier concept cité est la tête.
   */
  readonly roles?: ReadonlyMap<string, RoleDeConcept>;
  /** Les nombres de la question : les faits qui les contiennent passent devant, à niveau égal. */
  readonly nombres?: readonly string[];
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
  poids(cites: readonly string[], confiances?: ReadonlyMap<string, number>, roles?: ReadonlyMap<string, RoleDeConcept>): Map<string, number> {
    const poids = new Map<string, number>();
    const dejaVus = new Map<RoleDeConcept, number>();
    cites.forEach((id, rang) => {
      const role = roles?.get(id);
      let tete: number;
      if (role === undefined) tete = Math.max(0.7, 1 - 0.1 * rang);
      else {
        const avant = dejaVus.get(role) ?? 0;
        dejaVus.set(role, avant + 1);
        tete = Math.max(0.7, POIDS_DU_ROLE[role] - 0.1 * avant);
      }
      tete *= confiances?.get(id) ?? 1;
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
  private membres(cites: readonly string[], dejaAtteints: ReadonlyMap<string, number>, roles?: ReadonlyMap<string, RoleDeConcept>): Map<string, number> {
    const membres = new Map<string, number>();
    cites.forEach((id, rang) => {
      // Un concept nié (« sans boucheuse ») ne donne pas ses membres : ce n'est pas ce que le client cherche.
      if (roles?.get(id) === "exclusion") return;
      // Un concept cité qui n'est que la famille d'un autre concept cité donne le contexte
      // (« commande en attente… ou… » parle de la commande en attente, pas de ses cousines) :
      // on ne descend pas vers ses autres membres.
      if (cites.some((autre) => autre !== id && this.detecteur.lignee(autre).some((c) => c.id === id))) return;
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
    const poids = this.poids(cites, options.confiances, options.roles);
    const membres = type === "choix" ? this.membres(cites, poids, options.roles) : new Map<string, number>();
    const racineAdmise = (id: string) =>
      this.detecteur.concept(id)?.famille !== undefined || cites.includes(id) || (type !== null && TYPES_DE_LA_RACINE.has(type));
    // Un concept NIÉ (« sans boucheuse ») reste lu, mais la réponse ne parle pas de lui : un fait dont un concept n'est atteint que par
    // un concept nié passe après les faits de ce que le client veut vraiment (« comment boucher sans boucheuse ? » ne répond pas par
    // le mode d'emploi de la boucheuse). Les concepts qu'un concept cité et un concept nié ont en commun (leur famille) restent permis.
    const niees = cites.filter((id) => options.roles?.get(id) === "exclusion");
    const reservesAuxNiees = new Set<string>();
    if (niees.length > 0 && niees.length < cites.length) {
      const voulus = new Set(cites.filter((id) => !niees.includes(id)).flatMap((id) => this.detecteur.lignee(id).map((c) => c.id)));
      for (const id of niees) for (const c of this.detecteur.lignee(id)) if (!voulus.has(c.id)) reservesAuxNiees.add(c.id);
    }
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
        const nombresRepris = (options.nombres ?? []).filter((n) => mots.has(n)).length;
        const bonus = Math.min(BONUS_MAX, repris * BONUS_PAR_MOT) + Math.min(BONUS_NOMBRES_MAX, nombresRepris * BONUS_PAR_NOMBRE);
        // Un fait à plusieurs concepts vaut autant de fois son maillon le plus
        // faible : « bouchon + vin de garde », tous deux cités, pèse près de 2 ;
        // « bouteille + cidre », quand seule une bouteille champenoise est
        // citée, ne pèse pas plus que le fait propre à la bouteille champenoise.
        const facteur = fait.concepts.some((c) => reservesAuxNiees.has(c)) ? FACTEUR_DES_NIEES : 1;
        const specificite =
          Math.min(...fait.concepts.map((c) => poids.get(c) ?? membres.get(c) ?? 0)) * fait.concepts.length * facteur;
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
    // Un concept exclusif (la disponibilité) répond seul, s'il a de quoi répondre à ce type de question.
    const exclusifs = cites.filter((id) => this.detecteur.concept(id)?.exclusif);
    let faits: FaitRetenu[] = [];
    if (exclusifs.length > 0) {
      const seuls = candidats.filter((c) => c.fait.concepts.some((id) => exclusifs.includes(id)));
      faits = this.selectionner(seuls, plan, !souple, strict, prefere);
    }
    if (faits.length === 0) faits = this.selectionner(candidats, plan, !souple, strict, prefere);
    if (faits.length === 0 && type !== null) {
      // Le type ne trouve rien à dire sur ces concepts : on présente ce qu'on sait.
      plan = PLAN_PAR_DEFAUT;
      faits = this.selectionner(candidats, plan, false, false, null);
    }
    // Une mise en garde (loi, sécurité) accompagne la réponse dès que son
    // concept est cité, même si la question porte surtout sur autre chose.
    // Pas dans une relance : elle a déjà été dite.
    if (!options.doitToucher) {
      const dits = new Set(faits.map((f) => f.fait.id));
      const sujets = new Set(faits.flatMap((f) => f.fait.concepts));
      // Pas de mise en garde si la réponse parle déjà de ce sujet : elle l'a dite.
      const garde = candidats
        .filter(
          (c) =>
            c.fait.avertissement &&
            !dits.has(c.fait.id) &&
            c.fait.concepts.every((id) => cites.includes(id)) &&
            !c.fait.concepts.some((id) => sujets.has(id)),
        )
        .sort((a, b) => b.score - a.score)[0];
      if (garde) faits = [...faits, garde];
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
    // Un même énoncé écrit pour plusieurs aspects (« procédure » et « condition »)
    // ne s'affiche qu'une fois.
    const dits = new Set<string>();
    // Un complément est au moins aussi spécifique que le principal, fait par fait : un second fait,
    // moins proche de la question, ne rejoint pas la réponse parce qu'il partage un aspect avec elle.
    const sansDoublon = retenus
      .flatMap((g) => (g === principal ? g.faits : g.faits.filter((f) => f.specificite >= principal.specificite)))
      .filter((f) => !dits.has(f.fait.enonce) && !!dits.add(f.fait.enonce));
    return sansDoublon.slice(0, MAX_FAITS);
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
