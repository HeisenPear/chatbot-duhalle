// ═══════════════════════════════════════════════════════════════════════════
// LE TYPE DE LA QUESTION, APPRIS.
//
// Les motifs de types-de-question.ts restent PRIORITAIRES : ils sont des exceptions voulues (« combien coûte » est un prix
// avant d'être une valeur). Quand AUCUN motif ne s'applique, ce classifieur donne un score à chaque type d'après les
// morceaux de mots de la question (« comment », « combien de temps », « quelle taille »… et leurs variantes que les motifs
// n'ont pas prévues). Il est entraîné hors ligne (scripts/entrainer-classifieur.mjs) ; le Worker ne fait qu'une somme de poids.
//
// Un type n'est retenu que si sa probabilité atteint SEUIL_DU_TYPE : en dessous, la question reste sans type et le moteur la
// lit avec son plan par défaut, comme avant. Le classifieur propose aussi « aucun » : une question sans marque.
// ═══════════════════════════════════════════════════════════════════════════
import type { TypeDeQuestion } from "../savoir/types";
import { TYPES_DE_QUESTION } from "../savoir/types";
import { fonctionsDeLaQuestion } from "./classifieur-outils";
import { BIAIS, CLASSES, COLONNES, N_MAX, N_MIN, POIDS } from "./classifieur";

/** Les réglages du type appris : modifiables par le script de mesure, pour régler le seuil. */
export const REGLAGES_DU_TYPE = {
  /** Probabilité minimale pour retenir un type appris. Réglée par validation croisée et sur le jeu de mesure (voir le README). */
  seuil: 0.9,
  /** Les deux types les plus probables hésitent quand chacun atteint cette probabilité… */
  hesitationMin: 0.3,
  /** … et qu'ils sont à moins de cet écart l'un de l'autre. */
  ecartDeHesitation: 0.05,
};
/**
 * Un type se lit dans une PHRASE : un mot seul (« Livraison », « bouchon conique ») n'a pas de type, et ses morceaux de mots
 * ne disent que le sujet. En dessous de ce nombre de mots, le classifieur ne répond pas.
 */
export const MOTS_MIN = 3;

export interface Classement {
  /** Le type le plus probable ; `null` pour « aucun » (une question sans marque). */
  readonly type: TypeDeQuestion | null;
  readonly probabilite: number;
  /** Le deuxième type le plus probable, et sa probabilité : leur écart dit si la question hésite. */
  readonly second: TypeDeQuestion | null;
  readonly probabiliteSecond: number;
}

const AUCUN = "aucun";
const typeDeClasse = (classe: string): TypeDeQuestion | null => TYPES_DE_QUESTION.find((t) => t === classe) ?? null;

/** Les poids, rangés par colonne une fois pour toutes (la table JSON est lue au démarrage de l'isolat). */
const COLONNE_VERS_POIDS = new Map<number, readonly number[]>(Object.entries(POIDS).map(([c, p]) => [Number(c), p]));

/** La probabilité de chaque classe pour une question normalisée (forme sans accents ni ponctuation). */
export function classerLaQuestion(forme: string): Classement {
  if (forme.split(" ").length < MOTS_MIN) return { type: null, probabilite: 0, second: null, probabiliteSecond: 0 };
  const logits = BIAIS.slice();
  for (const [colonne, valeur] of fonctionsDeLaQuestion(forme, COLONNES, N_MIN, N_MAX)) {
    const poids = COLONNE_VERS_POIDS.get(colonne);
    if (poids) for (let k = 0; k < logits.length; k++) logits[k]! += poids[k]! * valeur;
  }
  const max = Math.max(...logits);
  const exponentielles = logits.map((l) => Math.exp(l - max));
  const somme = exponentielles.reduce((s, x) => s + x, 0);
  const classes = exponentielles.map((e, k) => ({ classe: CLASSES[k]!, p: e / somme })).sort((a, b) => b.p - a.p);
  return {
    type: classes[0]!.classe === AUCUN ? null : typeDeClasse(classes[0]!.classe),
    probabilite: Math.round(classes[0]!.p * 1000) / 1000,
    second: classes[1]!.classe === AUCUN ? null : typeDeClasse(classes[1]!.classe),
    probabiliteSecond: Math.round(classes[1]!.p * 1000) / 1000,
  };
}

/**
 * Les types « proches » : la question n'a aucun motif, et le classifieur hésite entre deux types sans en retenir un. Le moteur
 * peut alors demander ce qu'on veut savoir (assistant.ts) au lieu de présenter le sujet en général.
 */
export function typesProches(classement: Classement): [TypeDeQuestion, TypeDeQuestion] | null {
  const { type, second, probabilite, probabiliteSecond } = classement;
  if (type === null || second === null) return null;
  if (probabilite < REGLAGES_DU_TYPE.hesitationMin || probabiliteSecond < REGLAGES_DU_TYPE.hesitationMin) return null;
  if (probabilite - probabiliteSecond > REGLAGES_DU_TYPE.ecartDeHesitation) return null;
  return [type, second];
}

/**
 * Une question que le moteur sait lire, pour chaque type, sur un sujet : c'est le texte des BOUTONS d'une question de clarification.
 * Chaque modèle contient un motif de types-de-question.ts : cliquer sur le bouton redonne le type voulu, avec le sujet.
 */
export function questionDuType(type: TypeDeQuestion, sujet: string): string {
  switch (type) {
    case "prix":
      return `Combien coûte ${sujet} ?`;
    case "lieu":
      return `Où trouver ${sujet} ?`;
    case "gamme":
      return `Proposez-vous ${sujet} ?`;
    case "permission":
      return `Puis-je utiliser ${sujet} ?`;
    case "duree":
      return `Combien de temps pour ${sujet} ?`;
    case "valeur":
      return `Quelle taille pour ${sujet} ?`;
    case "moment":
      return `Quand utiliser ${sujet} ?`;
    case "raison":
      return `Pourquoi ${sujet} ?`;
    case "choix":
      return `Lequel choisir : ${sujet} ?`;
    case "conseil":
      return `Que faire avec ${sujet} ?`;
    case "entretien":
      return `Comment entretenir ${sujet} ?`;
    case "procedure":
      return `Comment utiliser ${sujet} ?`;
    case "explication":
      return `C'est quoi ${sujet} ?`;
    case "fait":
      return `Est-il nécessaire d'avoir ${sujet} ?`;
  }
}
