// PRÉPARATION HORS LIGNE DES VECTEURS DE MOTS (étape 2 de la lecture de la question).
//
//   npm run vecteurs -- chemin/vers/cc.fr.300.vec [--mots 20000] [--dimensions 64] [--lignes 200000] [--proximite 0.4] [--courants 12000]
//
// Le Worker ne charge jamais les 2 millions de vecteurs de fastText (1,2 Go compressés) : ce script en tire
// src/moteur/vecteurs.ts, quelques dizaines de milliers de mots à 64 dimensions, en entiers 8 bits.
//
// OBTENIR LES VECTEURS. « Word vectors for 157 languages » (fastText, cc.fr.300), Facebook Research, licence
// Creative Commons Attribution-ShareAlike 3.0 (voir README). Le fichier est trié du mot le plus fréquent au moins
// fréquent : pour n'en lire que le début, sans télécharger le reste,
//
//   curl -s https://dl.fbaipublicfiles.com/fasttext/vectors-crawl/cc.fr.300.vec.gz | gunzip -c | head -n 200001 > cc.fr.300.head.vec
//   npm run vecteurs -- cc.fr.300.head.vec
//
// (curl se plaint d'une erreur 23 à la fin : c'est normal, `head` a fermé le tube.) Le fichier complet, non
// compressé ou en .gz, convient aussi : seules les premières lignes sont lues.
//
// CE QUI EST GARDÉ.
//  1. Les mots de la base de savoir (alias, libellés des concepts) : ce sont les cibles d'une reconnaissance par le sens.
//  2. Les mots du français qui PEUVENT être reconnus par le sens : ceux dont le vecteur complet (300 dimensions) est
//     proche, au moins --proximite (0,40 par défaut) en cosinus, d'un mot de la base. Un mot que ne rapproche de rien
//     ne sera jamais substitué : inutile de l'embarquer. Les mots de tous les jours (voir --courants) ne le sont pas non plus,
//     sauf s'ils sont dans la base (cibles) : seuls les mots rares sont gardés comme mots à rapprocher. S'il y en a plus que --mots (20 000 par défaut), on garde les plus
//     proches. Ce sont les mots que les clients peuvent employer sans que la base les connaisse (« capuchon »,
//     « hermétique », « obturateur »).
//  Les mots sont rangés du plus fréquent au moins fréquent. Les --courants (12 000 par défaut) premiers mots du fichier sont des
//  mots de tous les jours (« dernière », « belge », « minutes ») : la base ne les connaît pas exprès, et leurs voisins par le sens
//  sont des faux amis (« dernière » ~ « première », « belge » ~ « suisse »). Le fichier de sortie dit combien de mots gardés sont
//  courants (MOTS_COURANTS) : ceux-là ne sont jamais substitués.
//  Seuls les mots simples en minuscules (lettres, au moins 3) sont gardés ; deux écritures d'un même mot sans accents
//  (« étanche », « etanche ») n'en font qu'un, la plus fréquente.
//
// COMMENT ILS SONT RÉDUITS. Chaque vecteur est normalisé, puis projeté sur les --dimensions premières composantes
// principales de l'ensemble gardé (analyse en composantes principales, calculée ici), normalisé de nouveau et arrondi à
// un entier de -127 à 127. Le cosinus de deux mots se calcule ensuite sur ces entiers.
//
// Rejouable : mêmes entrées, même fichier de sortie.
import { build } from "esbuild";
import { createReadStream } from "node:fs";
import { mkdtemp, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import { createInterface } from "node:readline";
import { pathToFileURL } from "node:url";
import { createGunzip } from "node:zlib";

const racine = resolve(import.meta.dirname, "..");
const argumentsNus = process.argv.slice(2);
const option = (nom, defaut) => {
  const i = argumentsNus.indexOf(`--${nom}`);
  return i >= 0 ? Number(argumentsNus[i + 1]) : defaut;
};
const chemin = argumentsNus.find((a, i) => !a.startsWith("--") && !(i > 0 && argumentsNus[i - 1].startsWith("--")));
if (!chemin) {
  console.error("Usage : npm run vecteurs -- chemin/vers/cc.fr.300.vec [--mots 20000] [--dimensions 64] [--lignes 200000] [--proximite 0.4] [--courants 12000]");
  process.exit(1);
}
const MOTS = option("mots", 20000);
const PROXIMITE = option("proximite", 0.4);
const COURANTS = option("courants", 12000);
const DIMENSIONS = option("dimensions", 64);
const LIGNES = option("lignes", 200000);
const DIMENSIONS_SOURCE = 300;

// 1. Le vocabulaire des alias de la base de savoir.
const dossier = await mkdtemp(join(tmpdir(), "vecteurs-"));
const sortieMoteur = join(dossier, "moteur.mjs");
let moteur;
try {
  await build({
    stdin: {
      contents: `
        export { BASE } from "./src/savoir/index";
        export { normaliser } from "./src/moteur/texte";
      `,
      resolveDir: racine,
      loader: "ts",
    },
    bundle: true,
    platform: "node",
    format: "esm",
    outfile: sortieMoteur,
    logLevel: "error",
  });
  moteur = await import(pathToFileURL(sortieMoteur).href);
} finally {
  await rm(dossier, { recursive: true, force: true });
}
const { BASE, normaliser } = moteur;
const motsDesAlias = new Set();
for (const c of BASE.concepts) {
  for (const texte of [c.libelle, ...c.alias]) {
    for (const mot of normaliser(texte).split(" ")) if (/^[a-z]{3,}$/.test(mot)) motsDesAlias.add(mot);
  }
}

// 2. Lecture des premières lignes du fichier de vecteurs.
const flux = chemin.endsWith(".gz") ? createReadStream(chemin).pipe(createGunzip()) : createReadStream(chemin);
const lignes = createInterface({ input: flux, crlfDelay: Infinity });
const candidats = []; // { mot, cle, vecteur } dans l'ordre du fichier (le plus fréquent d'abord)
const vus = new Set();
let numero = 0;
for await (const ligne of lignes) {
  if (numero++ === 0) continue; // l'en-tête : « 2000000 300 »
  if (numero > LIGNES + 1) break;
  const morceaux = ligne.trimEnd().split(" ");
  const mot = morceaux[0];
  if (!/^[a-zàâäçéèêëîïôöùûüÿœæ]{3,}$/.test(mot) || morceaux.length !== DIMENSIONS_SOURCE + 1) continue;
  const cle = normaliser(mot);
  if (vus.has(cle)) continue;
  vus.add(cle);
  const vecteur = new Float32Array(DIMENSIONS_SOURCE);
  let norme = 0;
  for (let i = 0; i < DIMENSIONS_SOURCE; i++) {
    const v = Number(morceaux[i + 1]);
    vecteur[i] = v;
    norme += v * v;
  }
  norme = Math.sqrt(norme) || 1;
  for (let i = 0; i < DIMENSIONS_SOURCE; i++) vecteur[i] /= norme;
  candidats.push({ cle, vecteur });
}
lignes.close();

// 3. Les mots gardés : ceux des alias, puis ceux qui peuvent être reconnus par le sens (proches d'un mot des alias).
const aliasTrouves = candidats.filter((c) => motsDesAlias.has(c.cle));
const deLaBase = aliasTrouves.length;
const proches = [];
candidats.forEach((c, rang) => {
  // Un mot de tous les jours n'est jamais substitué (voir --courants) : son vecteur ne servirait à rien.
  if (motsDesAlias.has(c.cle) || rang < COURANTS) return;
  let max = -1;
  for (const a of aliasTrouves) {
    let somme = 0;
    for (let k = 0; k < DIMENSIONS_SOURCE; k++) somme += c.vecteur[k] * a.vecteur[k];
    if (somme > max) max = somme;
  }
  if (max >= PROXIMITE) proches.push({ c, rang, max });
});
const retenus = proches.sort((a, b) => b.max - a.max || a.rang - b.rang).slice(0, Math.max(0, MOTS - deLaBase));
const retenusSet = new Set(retenus.map((r) => r.c.cle));
const gardes = candidats.filter((c) => motsDesAlias.has(c.cle) || retenusSet.has(c.cle));
const rangDansLeFichier = new Map(candidats.map((c, rang) => [c.cle, rang]));
const motsCourants = gardes.filter((g) => rangDansLeFichier.get(g.cle) < COURANTS).length;
const manquants = [...motsDesAlias].filter((m) => !vus.has(m));

// 4. Analyse en composantes principales : covariance, puis valeurs propres par la méthode de Jacobi.
const n = gardes.length;
const moyenne = new Float64Array(DIMENSIONS_SOURCE);
for (const { vecteur } of gardes) for (let j = 0; j < DIMENSIONS_SOURCE; j++) moyenne[j] += vecteur[j];
for (let j = 0; j < DIMENSIONS_SOURCE; j++) moyenne[j] /= n;
const covariance = Array.from({ length: DIMENSIONS_SOURCE }, () => new Float64Array(DIMENSIONS_SOURCE));
const centre = new Float64Array(DIMENSIONS_SOURCE);
for (const { vecteur } of gardes) {
  for (let j = 0; j < DIMENSIONS_SOURCE; j++) centre[j] = vecteur[j] - moyenne[j];
  for (let j = 0; j < DIMENSIONS_SOURCE; j++) {
    const ligneCov = covariance[j];
    const cj = centre[j];
    for (let k = j; k < DIMENSIONS_SOURCE; k++) ligneCov[k] += cj * centre[k];
  }
}
for (let j = 0; j < DIMENSIONS_SOURCE; j++) {
  for (let k = j; k < DIMENSIONS_SOURCE; k++) {
    covariance[j][k] /= n;
    covariance[k][j] = covariance[j][k];
  }
}
const propres = Array.from({ length: DIMENSIONS_SOURCE }, (_, i) => Float64Array.from({ length: DIMENSIONS_SOURCE }, (_, j) => (i === j ? 1 : 0)));
for (let balayage = 0; balayage < 30; balayage++) {
  let hors = 0;
  for (let p = 0; p < DIMENSIONS_SOURCE - 1; p++) for (let q = p + 1; q < DIMENSIONS_SOURCE; q++) hors += covariance[p][q] ** 2;
  if (hors < 1e-18) break;
  for (let p = 0; p < DIMENSIONS_SOURCE - 1; p++) {
    for (let q = p + 1; q < DIMENSIONS_SOURCE; q++) {
      const apq = covariance[p][q];
      if (Math.abs(apq) < 1e-14) continue;
      const theta = (covariance[q][q] - covariance[p][p]) / (2 * apq);
      const t = Math.sign(theta || 1) / (Math.abs(theta) + Math.sqrt(theta * theta + 1));
      const c = 1 / Math.sqrt(t * t + 1);
      const s = t * c;
      for (let k = 0; k < DIMENSIONS_SOURCE; k++) {
        const akp = covariance[k][p];
        const akq = covariance[k][q];
        covariance[k][p] = c * akp - s * akq;
        covariance[k][q] = s * akp + c * akq;
      }
      for (let k = 0; k < DIMENSIONS_SOURCE; k++) {
        const apk = covariance[p][k];
        const aqk = covariance[q][k];
        covariance[p][k] = c * apk - s * aqk;
        covariance[q][k] = s * apk + c * aqk;
      }
      for (let k = 0; k < DIMENSIONS_SOURCE; k++) {
        const vkp = propres[k][p];
        const vkq = propres[k][q];
        propres[k][p] = c * vkp - s * vkq;
        propres[k][q] = s * vkp + c * vkq;
      }
    }
  }
}
const ordre = Array.from({ length: DIMENSIONS_SOURCE }, (_, i) => i).sort((a, b) => covariance[b][b] - covariance[a][a] || a - b);
const composantes = ordre.slice(0, DIMENSIONS).map((i) => Float64Array.from({ length: DIMENSIONS_SOURCE }, (_, k) => propres[k][i]));
// Le signe d'une composante est arbitraire : on le fixe pour que le fichier soit identique d'une exécution à l'autre.
for (const comp of composantes) {
  let imax = 0;
  for (let k = 1; k < DIMENSIONS_SOURCE; k++) if (Math.abs(comp[k]) > Math.abs(comp[imax])) imax = k;
  if (comp[imax] < 0) for (let k = 0; k < DIMENSIONS_SOURCE; k++) comp[k] = -comp[k];
}
const variance = ordre.slice(0, DIMENSIONS).reduce((s, i) => s + covariance[i][i], 0) / ordre.reduce((s, i) => s + covariance[i][i], 0);

// 5. Projection, normalisation, entiers 8 bits.
const matrice = new Int8Array(n * DIMENSIONS);
gardes.forEach(({ vecteur }, i) => {
  const projete = new Float64Array(DIMENSIONS);
  let norme = 0;
  for (let d = 0; d < DIMENSIONS; d++) {
    let somme = 0;
    const comp = composantes[d];
    for (let k = 0; k < DIMENSIONS_SOURCE; k++) somme += (vecteur[k] - moyenne[k]) * comp[k];
    projete[d] = somme;
    norme += somme * somme;
  }
  norme = Math.sqrt(norme) || 1;
  for (let d = 0; d < DIMENSIONS; d++) matrice[i * DIMENSIONS + d] = Math.max(-127, Math.min(127, Math.round((projete[d] / norme) * 127)));
});

// 6. Le fichier.
const base64 = Buffer.from(matrice.buffer, matrice.byteOffset, matrice.byteLength).toString("base64");
const source = `// ═══════════════════════════════════════════════════════════════════════════
// LES VECTEURS DE MOTS : le sens d'un mot, en ${DIMENSIONS} nombres, pour reconnaître « flacon » comme une bouteille.
//
// ⚠️ FICHIER GÉNÉRÉ : ne le modifiez pas à la main. Pour le refaire :
//   npm run vecteurs -- chemin/vers/cc.fr.300.head.vec    (voir scripts/preparer-vecteurs.mjs)
//
// Les données viennent des vecteurs fastText « cc.fr.300 » (Grave, Bojanowski, Gupta, Joulin, Mikolov, « Learning
// Word Vectors for 157 Languages », LREC 2018), publiés par Facebook Research sous la licence Creative Commons
// Attribution-ShareAlike 3.0. Cette table en est une version réduite et modifiée (${n} mots, ${DIMENSIONS} dimensions
// par analyse en composantes principales, entiers 8 bits) : elle reste sous la même licence, sans garantie.
//
// MOTS : les mots, sans accents, du plus fréquent au moins fréquent, séparés par un espace.
// MOTS_COURANTS : combien de ces premiers mots sont des mots de tous les jours (jamais substitués).
// VECTEURS : une ligne de ${DIMENSIONS} entiers 8 bits par mot (norme 127), dans l'ordre de MOTS, en base 64.
// ═══════════════════════════════════════════════════════════════════════════

export const DIMENSIONS = ${DIMENSIONS};

export const MOTS =
  ${JSON.stringify(gardes.map((g) => g.cle).join(" "))};

/** Les ${motsCourants} premiers mots de MOTS sont des mots de tous les jours (rang de fréquence < ${COURANTS} dans le fichier d'origine). */
export const MOTS_COURANTS = ${motsCourants};

export const VECTEURS_EN_BASE_64 =
  ${JSON.stringify(base64)};
`;
await writeFile(join(racine, "src/moteur/vecteurs.ts"), source);
console.log(`Lignes lues : ${Math.min(numero - 1, LIGNES)}. Mots candidats : ${candidats.length}.`);
console.log(`Mots de la base de savoir trouvés : ${deLaBase}/${motsDesAlias.size}${manquants.length ? ` (sans vecteur : ${manquants.slice(0, 15).join(", ")}${manquants.length > 15 ? "…" : ""})` : ""}.`);
console.log(`Mots proches d'un mot de la base (cosinus >= ${PROXIMITE}) : ${proches.length}, gardés : ${retenus.length}.`);
console.log(`Mots courants (rang < ${COURANTS}) parmi les mots gardés : ${motsCourants}.`);
console.log(`Mots gardés : ${n}, ${DIMENSIONS} dimensions (${Math.round(variance * 1000) / 10} % de la variance), ${Math.round(matrice.byteLength / 1024)} Kio de vecteurs.`);
