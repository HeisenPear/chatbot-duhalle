// ═══════════════════════════════════════════════════════════════════════════
// LA STRUCTURE DU SAVOIR DU CHATBOT DUHALLÉ.
//
// Inspirée de l'« assistant déterministe » d'APISAAS : pas de fiches entières,
// mais des CONCEPTS (une notion, un produit, une rubrique) et des FAITS courts
// rattachés à ces concepts, chacun avec son ASPECT, sa SOURCE et sa date de
// vérification. Le TYPE de la question choisit le PLAN de la réponse : on ne
// répond pas à « comment » comme à « lequel choisir ».
//
// Aucun modèle de langage : chaque réponse se rejoue et s'explique (la trace
// dit quel type, quels concepts et quels faits ont été retenus).
//
// Le chatbot ne fait que répondre : il n'agit pas sur le compte client ni sur
// les commandes. Tout ce qui demande une action renvoie vers le site ou le
// service client.
// ═══════════════════════════════════════════════════════════════════════════

/** Un lien affiché sous la réponse. */
export interface Lien {
  readonly libelle: string;
  /** URL absolue (https://…). */
  readonly url: string;
}

// ───────────────────────────────────────────────────────────────────────────
// 1. LES CONCEPTS — ce dont on parle
// ───────────────────────────────────────────────────────────────────────────

/**
 * UN CONCEPT — une notion du métier, un produit ou une rubrique, avec ses
 * alias et sa FAMILLE. Un fait posé sur une famille vaut pour tous ses
 * membres ; un fait propre au membre l'emporte sur le fait général.
 *
 * Exemple : « bouchon-naturel » → famille « bouchon-liege » → « bouchage » →
 * « catalogue ». Le prix n'est connu d'aucun bouchon : c'est le fait général
 * du catalogue (« les prix sont sur la fiche produit ») qui répond.
 */
export interface Concept {
  readonly id: string;
  /** Le nom affiché (et reconnu comme un alias). */
  readonly libelle: string;
  /**
   * Les façons de le nommer. Pas besoin d'écrire pluriels, accents ou
   * majuscules : la comparaison les ignore. Un alias de plusieurs mots est
   * reconnu même si les mots sont dans un autre ordre, à peu près côte à côte.
   */
  readonly alias: readonly string[];
  /**
   * Expressions reconnues MOT POUR MOT, mots courants compris (« qui êtes
   * vous », « vous joindre ») : les alias ignorent les mots courants, les
   * formules non.
   */
  readonly formules?: readonly string[];
  /** L'id du concept parent — la famille. */
  readonly famille?: string;
  /** La page du site qui le présente (rubrique ou fiche produit). */
  readonly lien?: Lien;
  /** Concepts proches à proposer en « Voir aussi ». */
  readonly voirAussi?: readonly string[];
}

// ───────────────────────────────────────────────────────────────────────────
// 2. LES FAITS — ce qu'on en sait
// ───────────────────────────────────────────────────────────────────────────

/** Ce qu'un fait dit d'un concept — la facette qu'un type de question vient chercher. */
export const ASPECTS = [
  "definition", // ce que c'est
  "usage", // à quoi ça sert, pour quoi l'utiliser
  "gamme", // ce que Duhallé propose dans cette rubrique
  "choix", // lequel choisir, selon quel critère
  "dimension", // tailles, diamètres, contenances, compatibilités
  "procedure", // les étapes
  "duree", // combien de temps, délais
  "moment", // quand
  "condition", // conditions, précautions, zones, exceptions
  "raison", // pourquoi
  "erreur", // erreurs à éviter
  "entretien", // nettoyage, rangement, conservation du matériel
  "lieu", // où le trouver
  "prix", // prix et frais
] as const;
export type Aspect = (typeof ASPECTS)[number];

/**
 * UN FAIT — un énoncé court, rattaché à un ou plusieurs concepts. Un fait
 * rattaché à PLUSIEURS concepts ne sort que si tous sont cités (ou hérités) :
 * « pour un vin de garde, un bouchon 45 x 24 en liège naturel » n'a rien à
 * dire à qui demande seulement ce qu'est un vin de garde.
 */
export interface Fait {
  readonly id: string;
  readonly concepts: readonly string[];
  readonly aspect: Aspect;
  /**
   * L'énoncé affiché. Mise en forme légère : **gras**, listes « - » ou
   * « 1. » en début de ligne, ligne vide = nouveau paragraphe.
   */
  readonly enonce: string;
  readonly liens?: readonly Lien[];
  /** D'où vient le fait : une page du site, ou le savoir-faire général. */
  readonly source: string;
  /** Date ISO de la dernière vérification. */
  readonly verifieLe: string;
}

export interface BaseDeSavoir {
  readonly concepts: readonly Concept[];
  readonly faits: readonly Fait[];
}

// ───────────────────────────────────────────────────────────────────────────
// 3. LES TYPES DE QUESTION ET LEURS PLANS
// ───────────────────────────────────────────────────────────────────────────

/** Ce qu'une question DEMANDE, quel que soit son sujet. */
export const TYPES_DE_QUESTION = [
  "prix",
  "lieu",
  "gamme",
  "permission",
  "duree",
  "valeur",
  "moment",
  "raison",
  "choix",
  "conseil",
  "entretien",
  "procedure",
  "explication",
  "fait",
] as const;
export type TypeDeQuestion = (typeof TYPES_DE_QUESTION)[number];

/**
 * LE PLAN DE CHAQUE TYPE — les aspects cherchés, dans l'ordre où ils sont
 * affichés. Le premier aspect trouvé répond ; les suivants complètent.
 */
export const PLANS_DE_REPONSE: Readonly<Record<TypeDeQuestion, readonly Aspect[]>> = {
  prix: ["prix", "condition", "gamme", "lieu"],
  lieu: ["lieu", "gamme", "condition"],
  gamme: ["gamme", "dimension", "choix", "lieu"],
  permission: ["condition", "erreur", "choix", "procedure"],
  duree: ["duree", "condition", "procedure"],
  valeur: ["dimension", "choix", "condition", "duree", "gamme"],
  moment: ["moment", "duree", "condition"],
  raison: ["raison", "erreur", "condition", "definition"],
  choix: ["choix", "dimension", "gamme", "usage"],
  conseil: ["erreur", "condition", "entretien", "choix", "procedure"],
  entretien: ["entretien", "condition", "duree", "choix", "procedure"],
  procedure: ["procedure", "erreur", "condition", "duree", "entretien"],
  explication: ["definition", "usage", "gamme"],
  fait: ["condition", "definition", "choix", "raison"],
};

/** Quand la question ne porte aucune marque : une présentation générale. */
export const PLAN_PAR_DEFAUT: readonly Aspect[] = [
  "definition",
  "choix",
  "gamme",
  "procedure",
  "usage",
  "dimension",
  "duree",
  "moment",
  "condition",
  "raison",
  "erreur",
  "entretien",
  "prix",
  "lieu",
];
