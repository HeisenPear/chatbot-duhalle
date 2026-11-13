// ═══════════════════════════════════════════════════════════════════════════
// RECONNAÎTRE UN MOT PAR LE SENS.
//
// Un client écrit « flacon », « capuchon », « hermétique » : aucun alias ne les contient. Les vecteurs de
// mots (vecteurs.ts, préparés hors ligne par scripts/preparer-vecteurs.mjs) disent quels mots se
// ressemblent par le sens. Ici, pour un mot que la base ne connaît pas, on cherche le mot des alias dont le
// sens est le plus proche : « flacon » → « bouteille », « capuchon » → « couvercle », « hermétique » → « étanche ».
//
// ⚠️ UN SENS PROCHE N'EST PAS UN SYNONYME. « Jambon » est proche de « saucisse », « sel » de « sucre »,
// « rembourser » de « payer ». Une substitution n'est donc acceptée que si :
//   - la similarité dépasse un seuil, réglé sur le jeu de mesure (npm run mesure) ;
//   - elle dépasse nettement la deuxième candidate : un mot qui hésite entre deux cibles ne choisit pas ;
//   - la cible n'est pas un mot trop courant pour dire de quoi on parle (« maison », « couleur », « fruits »,
//     « produit », « vin », « temps » : voir MOTS_TROP_COURANTS et le README) ;
//   - le mot n'est pas un mot de tous les jours : « dernière », « belge », « minutes » sont des mots que la base ne connaît
//     pas exprès, et leurs voisins (« première », « suisse », « heures ») sont des faux amis. Seuls les mots rares,
//     qui sont ceux d'un métier ou d'un objet précis (« fiole », « entreposage », « hermétique »), sont rapprochés ;
//   - le mot a au moins quatre lettres, et un message ne cherche que quelques mots à la fois.
// Le concept ainsi reconnu pèse moins qu'un alias exact (voir POIDS_DU_SENS dans concepts.ts).
//
// Aucun calcul n'est fait avec un modèle : un produit scalaire sur 64 entiers, pour chaque mot cible.
// ═══════════════════════════════════════════════════════════════════════════
import { DIMENSIONS, MOTS, MOTS_COURANTS, VECTEURS_EN_BASE_64 } from "./vecteurs";

/** Ce qu'une substitution par le sens donne, et de quoi l'expliquer dans la trace. */
export interface Substitution {
  /** Le mot de la question, sans accents. */
  readonly mot: string;
  /** Le mot des alias dont le sens est le plus proche. */
  readonly cible: string;
  /** La racine de la cible : c'est elle que la détection des concepts lit à la place du mot. */
  readonly racine: string;
  /** Le cosinus des deux vecteurs, entre 0 et 1. */
  readonly similarite: number;
}

/** Les réglages de la reconnaissance par le sens : modifiables par le script de mesure, pour régler le seuil. */
export const REGLAGES_DU_SENS = {
  /**
   * Similarité minimale quand la question ne cite encore aucun concept : le sens est alors la seule chance de la comprendre.
   * Réglée sur le jeu de mesure (voir le README, « Mesure de la qualité »).
   */
  seuil: 0.75,
  /**
   * Similarité minimale quand la question cite déjà un concept par ses propres mots : une substitution ne peut alors que
   * lui nuire (« demain matin » → « demain lendemain » donnait la livraison le lendemain), sauf si elle est presque sûre.
   */
  seuilAvecConcept: 0.92,
  /** Écart minimal avec la deuxième candidate (d'une autre racine). */
  marge: 0.04,
  /** Longueur minimale du mot de la question. */
  longueurMin: 4,
  /** Nombre de mots inconnus qu'une question cherche au plus : le temps de calcul d'un message piégé reste borné. */
  essaisMax: 4,
};

/**
 * Les mots trop courants pour servir de cible : ils rattacheraient à tort la question à un autre sujet (règle du README :
 * « un mot courant n'est pas un alias »). Sans accents, au singulier.
 */
export const MOTS_TROP_COURANTS: ReadonlySet<string> = new Set(
  (
    "maison couleur fruit produit vin temps chose truc article modele exemple type sorte forme usage cas fois partie " +
    "petit petite grand grande bon bonne beau belle nouveau nouvelle autre meme tout toute plein gros grosse haut haute bas basse " +
    "facile simple important normal general particulier different possible"
  ).split(" "),
);

// ─── Les données : décodées une fois, au démarrage de l'isolat ─────────────────────────────────────────────────

const binaire = atob(VECTEURS_EN_BASE_64);
const vecteurs = new Int8Array(binaire.length);
for (let i = 0; i < binaire.length; i++) vecteurs[i] = (binaire.charCodeAt(i) << 24) >> 24;
const rangDuMot = new Map<string, number>();
MOTS.split(" ").forEach((mot, rang) => rangDuMot.set(mot, rang));

function norme(v: ArrayLike<number>, debut: number): number {
  let somme = 0;
  for (let d = 0; d < DIMENSIONS; d++) somme += v[debut + d]! * v[debut + d]!;
  return Math.sqrt(somme) || 1;
}

/** Le rang d'un mot dans les vecteurs : lui-même, ou son singulier. */
function rangDe(mot: string): number | undefined {
  return rangDuMot.get(mot) ?? (mot.endsWith("s") || mot.endsWith("x") ? rangDuMot.get(mot.slice(0, -1)) : undefined);
}

/** Les mots que les vecteurs connaissent. */
export function connaitLeMot(mot: string): boolean {
  return rangDe(mot) !== undefined;
}

/** Le cosinus de deux mots que les vecteurs connaissent. */
export function similariteDeMots(a: string, b: string): number | undefined {
  const ra = rangDe(a);
  const rb = rangDe(b);
  if (ra === undefined || rb === undefined) return undefined;
  let somme = 0;
  for (let d = 0; d < DIMENSIONS; d++) somme += vecteurs[ra * DIMENSIONS + d]! * vecteurs[rb * DIMENSIONS + d]!;
  return somme / (norme(vecteurs, ra * DIMENSIONS) * norme(vecteurs, rb * DIMENSIONS));
}

export class VoisinageParLeSens {
  private readonly racines: string[] = [];
  private readonly mots: string[] = [];
  private readonly cibles: Int8Array;
  private readonly normes: Float64Array;
  private readonly memoire = new Map<string, (Substitution & { readonly ecart: number }) | null>();

  /**
   * @param surfacesParRacine pour chaque racine des alias, les mots (sans accents) qui s'y écrivent : la cible est le mot
   *   le plus proche de celui de la question, et la racine est ce que la détection lit.
   */
  constructor(surfacesParRacine: ReadonlyMap<string, ReadonlySet<string>>) {
    const lignes: Int8Array[] = [];
    for (const [racine, surfaces] of [...surfacesParRacine].sort((a, b) => (a[0] < b[0] ? -1 : 1))) {
      const utilisables = [...surfaces].filter((m) => !MOTS_TROP_COURANTS.has(m) && rangDe(m) !== undefined).sort();
      if (utilisables.length === 0 || MOTS_TROP_COURANTS.has(racine)) continue;
      // Un mot a un vecteur propre ; plusieurs écritures d'une racine donnent chacune leur ligne, la même racine.
      for (const mot of utilisables) {
        const rang = rangDe(mot)!;
        lignes.push(vecteurs.subarray(rang * DIMENSIONS, (rang + 1) * DIMENSIONS));
        this.racines.push(racine);
        this.mots.push(mot);
      }
    }
    this.cibles = new Int8Array(lignes.length * DIMENSIONS);
    lignes.forEach((ligne, i) => this.cibles.set(ligne, i * DIMENSIONS));
    this.normes = Float64Array.from(lignes, (_, i) => norme(this.cibles, i * DIMENSIONS));
  }

  get taille(): number {
    return this.racines.length;
  }

  /**
   * Le mot des alias le plus proche par le sens, ou `undefined` si aucun ne l'est assez : similarité au moins égale à
   * `seuil` (REGLAGES_DU_SENS.seuil par défaut) et écart avec la deuxième candidate d'au moins REGLAGES_DU_SENS.marge.
   */
  chercher(mot: string, seuil = REGLAGES_DU_SENS.seuil): Substitution | undefined {
    let meilleure = this.memoire.get(mot);
    if (meilleure === undefined) {
      meilleure = this.calculer(mot) ?? null;
      if (this.memoire.size >= 5_000) this.memoire.clear();
      this.memoire.set(mot, meilleure);
    }
    if (!meilleure || meilleure.similarite < seuil || meilleure.ecart < REGLAGES_DU_SENS.marge) return undefined;
    const { ecart: _ecart, ...substitution } = meilleure;
    return substitution;
  }

  /** Les `n` mots des alias les plus proches d'un mot, sans les seuils : sert à régler le seuil et à expliquer une substitution. */
  voisins(mot: string, n = 5): Array<{ cible: string; racine: string; similarite: number }> {
    const rang = rangDe(mot);
    if (rang === undefined) return [];
    const debut = rang * DIMENSIONS;
    const normeDuMot = norme(vecteurs, debut);
    const meilleurs = new Map<string, { cible: string; similarite: number }>();
    for (let i = 0; i < this.racines.length; i++) {
      let somme = 0;
      const base = i * DIMENSIONS;
      for (let d = 0; d < DIMENSIONS; d++) somme += vecteurs[debut + d]! * this.cibles[base + d]!;
      const similarite = somme / (normeDuMot * this.normes[i]!);
      const deja = meilleurs.get(this.racines[i]!);
      if (!deja || similarite > deja.similarite) meilleurs.set(this.racines[i]!, { cible: this.mots[i]!, similarite });
    }
    return [...meilleurs]
      .map(([racine, v]) => ({ cible: v.cible, racine, similarite: Math.round(v.similarite * 100) / 100 }))
      .sort((a, b) => b.similarite - a.similarite)
      .slice(0, n);
  }

  /** La meilleure cible d'un mot et son écart avec la deuxième candidate d'une autre racine, sans les seuils. */
  private calculer(mot: string): (Substitution & { readonly ecart: number }) | undefined {
    if (mot.length < REGLAGES_DU_SENS.longueurMin || !/^[a-z]+$/.test(mot)) return undefined;
    const rang = rangDe(mot);
    if (rang === undefined || rang < MOTS_COURANTS) return undefined;
    const debut = rang * DIMENSIONS;
    const normeDuMot = norme(vecteurs, debut);
    let meilleur = -1;
    let meilleureSimilarite = -1;
    let deuxieme = -1;
    for (let i = 0; i < this.racines.length; i++) {
      let somme = 0;
      const base = i * DIMENSIONS;
      for (let d = 0; d < DIMENSIONS; d++) somme += vecteurs[debut + d]! * this.cibles[base + d]!;
      const similarite = somme / (normeDuMot * this.normes[i]!);
      if (similarite > meilleureSimilarite) {
        if (meilleur >= 0 && this.racines[meilleur] !== this.racines[i]) deuxieme = Math.max(deuxieme, meilleureSimilarite);
        meilleur = i;
        meilleureSimilarite = similarite;
      } else if (this.racines[i] !== this.racines[meilleur]) deuxieme = Math.max(deuxieme, similarite);
    }
    if (meilleur < 0) return undefined;
    return {
      mot,
      cible: this.mots[meilleur]!,
      racine: this.racines[meilleur]!,
      similarite: Math.round(meilleureSimilarite * 100) / 100,
      ecart: meilleureSimilarite - deuxieme,
    };
  }
}
