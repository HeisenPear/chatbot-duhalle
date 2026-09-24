// ═══════════════════════════════════════════════════════════════════════════
// LE FRANÇAIS, CÔTÉ MOTS : normaliser, retirer les mots vides, raciner,
// comparer malgré les fautes de frappe.
//
// Les questions des clients ET les alias des concepts passent par les mêmes
// fonctions : c'est ce qui garantit que « Bouchons », « bouchon » et
// « bouchôn » se comparent.
// ═══════════════════════════════════════════════════════════════════════════

/** Minuscules, sans accents ni ponctuation, espaces simples. */
export function normaliser(texte: string): string {
  return texte
    .toLowerCase()
    .replace(/œ/g, "oe")
    .replace(/æ/g, "ae")
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    // « 45x24 », « 45 x 24 » et « 45*24 » deviennent « 45 24 ».
    .replace(/(\d)\s*[x×*]\s*(?=\d)/g, "$1 ")
    // « 24mm », « 75cl » : le nombre et l'unité sont deux mots.
    .replace(/(\d)([a-z])/g, "$1 $2")
    // « 1,5 » et « 1.5 » : un seul nombre, écrit « 1p5 ».
    .replace(/(\d)[.,](\d)/g, "$1p$2")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

/**
 * Les mots vides : trop courants pour dire DE QUOI on parle. Les mots qui
 * disent CE QU'ON DEMANDE (« comment », « quel », « combien ») sont lus avant,
 * par les types de question, sur la phrase entière.
 */
const MOTS_VIDES = new Set(
  (
    "a ai aie aient aies ait alors as au aucun aucune aupres aura aurai aurait aux avait avant avec avez aviez avoir avons " +
    "bah beaucoup bien bon bonne c ca car ce ceci cela celle celles celui cependant certain certaine ces cet cette ceux chaque chez ci comme comment " +
    "d dans de des deja dit dites doit dois donc dont du elle elles en encore est et etaient etais etait etant ete etes etre eu eux " +
    "faire fais faisons fait faites faudrait faut fois ici il ils j je jusqu l la laquelle le lequel les lesquelles lesquels leur leurs lui " +
    "m ma madame mais me meme memes merci mes moi mon monsieur n ne ni non nos notre nous o on ont ou oui par parce pas peu peut peuvent peux " +
    "plait plus pour pourquoi pourrais pourrait pouvez pouvons puis puisque qu quand que quel quelle quelles quels qui quoi " +
    "s sa sans sauriez savez savoir se sera serait ses si sil sils soit sommes son sont souhaite souhaiterais souhaitons stp suis sur svp " +
    "t ta te tes toi ton tous tout toute toutes tres tu un une unes uns vais veut veux voici voila voir vos votre voudrais voudrait voulez vous vu y " +
    "bonjour bonsoir salut hello coucou question questions renseignement renseignements aide aider info infos information informations " +
    "chose choses truc trucs quelqu quelque quelques combien exemple besoin cherche chercher trouve trouver conseil conseils conseiller conseillez " +
    "possible faudra falloir utiliser utilise sert marche fonctionne choisir choisit prendre prends"
  ).split(" "),
);

export function estMotVide(mot: string): boolean {
  return MOTS_VIDES.has(mot);
}

/**
 * Suffixes retirés par la racinisation, du plus long au plus court. Les
 * suffixes d'agent (« -euse », « -eur », « -ier ») ne sont PAS retirés : une
 * boucheuse n'est pas le bouchage, un vinaigrier n'est pas le vinaigre.
 */
const SUFFIXES = [
  "issement", "ation", "ement", "ment", "aison", "ante", "ant", "ance", "ence",
  "ent", "age", "ite", "ive", "if", "ee", "er", "ez", "e",
].sort((a, b) => b.length - a.length);

const RACINE_MIN = 3;

/**
 * Racinisation volontairement simple, en deux temps : on retire la marque du
 * pluriel, puis UN suffixe courant. « Bouchages », « bouchage » et « boucher »
 * tombent ainsi sur la même racine, « boucheuses » et « boucheuse » sur une autre.
 */
export function raciner(mot: string): string {
  if (/\d/.test(mot) || mot.length <= RACINE_MIN) return mot;
  let m = mot;
  if (/[^s][sx]$/.test(m) && m.length - 1 >= RACINE_MIN) m = m.slice(0, -1);
  for (const suffixe of SUFFIXES) {
    if (m.endsWith(suffixe) && m.length - suffixe.length >= RACINE_MIN) {
      return m.slice(0, -suffixe.length);
    }
  }
  return m;
}

/**
 * Les racines des mots porteurs de sens, dans l'ordre de la phrase.
 * Les nombres sont gardés : ils portent les tailles (« 24 mm », « 29 »).
 */
export function racines(texte: string): string[] {
  const out: string[] = [];
  for (const mot of normaliser(texte).split(" ")) {
    if (!mot || estMotVide(mot)) continue;
    out.push(raciner(mot));
  }
  return out;
}

/**
 * Une question n'est lue que jusqu'à ce nombre de mots utiles : c'est bien
 * plus qu'une vraie question, et un message fleuve ne coûte pas plus cher.
 */
export const MOTS_MAX = 40;

/**
 * Les racines d'une QUESTION : comme `racines`, mais un mot nié ne compte pas.
 * « On peut boucher sans boucheuse ? », « je n'ai pas de boucheuse » : la
 * boucheuse n'est pas le sujet. (Les alias, eux, gardent tous leurs mots.)
 */
export function racinesDeLaQuestion(texte: string): string[] {
  const mots = normaliser(texte).split(" ");
  const out: string[] = [];
  let nie = false;
  for (let i = 0; i < mots.length && out.length < MOTS_MAX; i++) {
    const mot = mots[i]!;
    if (mot === "sans" || (mot === "pas" && (mots[i + 1] === "de" || mots[i + 1] === "d"))) {
      nie = true;
      continue;
    }
    if (!mot || estMotVide(mot)) continue;
    if (nie) {
      nie = false;
      continue;
    }
    out.push(raciner(mot));
  }
  return out;
}

/** Distance d'édition (Damerau-Levenshtein restreinte), arrêtée au-delà de `max`. */
export function distanceEdition(a: string, b: string, max: number): number {
  if (Math.abs(a.length - b.length) > max) return max + 1;
  // Trois lignes du tableau suffisent : la transposition regarde deux lignes en arrière.
  let avant = new Array<number>(b.length + 1).fill(0);
  let precedente = Array.from({ length: b.length + 1 }, (_, j) => j);
  let courante = new Array<number>(b.length + 1).fill(0);
  for (let i = 1; i <= a.length; i++) {
    courante[0] = i;
    let minLigne = i;
    for (let j = 1; j <= b.length; j++) {
      const cout = a[i - 1] === b[j - 1] ? 0 : 1;
      let v = Math.min(precedente[j]! + 1, courante[j - 1]! + 1, precedente[j - 1]! + cout);
      if (i > 1 && j > 1 && a[i - 1] === b[j - 2] && a[i - 2] === b[j - 1]) {
        v = Math.min(v, avant[j - 2]! + 1);
      }
      courante[j] = v;
      minLigne = Math.min(minLigne, v);
    }
    if (minLigne > max) return max + 1;
    [avant, precedente, courante] = [precedente, courante, avant];
  }
  return precedente[b.length]!;
}

/** Un vocabulaire rangé par longueur de mot, et les corrections déjà calculées. */
interface IndexDeCorrection {
  taille: number;
  parLongueur: Map<number, Array<{ mot: string; lettres: Int8Array }>>;
  memoire: Map<string, string | null>;
}

/** Le compte de chaque lettre d'un mot (a à z, puis « autre »). */
function compterLettres(mot: string): Int8Array {
  const lettres = new Int8Array(27);
  for (let i = 0; i < mot.length; i++) {
    const c = mot.charCodeAt(i) - 97;
    lettres[c >= 0 && c < 26 ? c : 26]!++;
  }
  return lettres;
}

/**
 * Minorant rapide de la distance d'édition : les lettres en trop d'un côté ou
 * de l'autre. Il écarte la plupart des mots sans faire le calcul complet.
 */
function ecartDeLettres(a: Int8Array, b: Int8Array, max: number): number {
  let enTrop = 0;
  let enMoins = 0;
  for (let i = 0; i < 27; i++) {
    const d = a[i]! - b[i]!;
    if (d > 0) enTrop += d;
    else enMoins -= d;
    if (enTrop > max || enMoins > max) return max + 1;
  }
  return Math.max(enTrop, enMoins);
}

const INDEX_DE_CORRECTION = new WeakMap<ReadonlySet<string>, IndexDeCorrection>();

/**
 * Au-delà de ce nombre de corrections gardées en mémoire, on repart de zéro :
 * un flot de mots inventés ne peut pas faire grossir la mémoire sans fin.
 */
const MEMOIRE_MAX = 5_000;

function indexer(vocabulaire: ReadonlySet<string>): IndexDeCorrection {
  let index = INDEX_DE_CORRECTION.get(vocabulaire);
  if (!index || index.taille !== vocabulaire.size) {
    const parLongueur: IndexDeCorrection["parLongueur"] = new Map();
    for (const mot of [...vocabulaire].sort()) {
      const entree = { mot, lettres: compterLettres(mot) };
      const liste = parLongueur.get(mot.length);
      if (liste) liste.push(entree);
      else parLongueur.set(mot.length, [entree]);
    }
    index = { taille: vocabulaire.size, parLongueur, memoire: new Map() };
    INDEX_DE_CORRECTION.set(vocabulaire, index);
  }
  return index;
}

/**
 * Corrige une racine inconnue par la plus proche d'un vocabulaire.
 * Une faute à partir de 6 lettres, deux à partir de 9 ; rien en dessous : les
 * mots courts se ressemblent trop (« temps » n'est pas « trempe », « trompé »
 * n'est pas « trempage »).
 *
 * Seuls les mots de longueur voisine sont comparés, et chaque correction est
 * retenue : une question remplie de mots inventés reste rapide à traiter.
 */
export function corriger(racine: string, vocabulaire: ReadonlySet<string>): string | undefined {
  if (vocabulaire.has(racine)) return racine;
  if (racine.length < 6 || /\d/.test(racine)) return undefined;
  const index = indexer(vocabulaire);
  const connue = index.memoire.get(racine);
  if (connue !== undefined) return connue ?? undefined;

  const max = racine.length >= 9 ? 2 : 1;
  const lettres = compterLettres(racine);
  let meilleur: string | undefined;
  let meilleureDistance = max + 1;
  for (let longueur = racine.length - max; longueur <= racine.length + max; longueur++) {
    for (const { mot: candidat, lettres: lettresDuCandidat } of index.parLongueur.get(longueur) ?? []) {
      const plafond = Math.min(max, meilleureDistance);
      if (ecartDeLettres(lettres, lettresDuCandidat, plafond) > plafond) continue;
      const d = distanceEdition(racine, candidat, plafond);
      // À distance égale, on garde le premier par ordre alphabétique : le
      // résultat ne dépend pas de l'ordre d'insertion.
      if (d < meilleureDistance || (d === meilleureDistance && meilleur !== undefined && candidat < meilleur)) {
        meilleur = candidat;
        meilleureDistance = d;
      }
    }
  }
  const correction = meilleureDistance <= max ? meilleur : undefined;
  if (index.memoire.size >= MEMOIRE_MAX) index.memoire.clear();
  index.memoire.set(racine, correction ?? null);
  return correction;
}
