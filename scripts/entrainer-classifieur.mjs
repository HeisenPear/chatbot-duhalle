// ENTRAÎNEMENT HORS LIGNE DU CLASSIFIEUR DE TYPES DE QUESTION (étape 4 de la lecture de la question).
//
//   npm run classifieur                                   entraîne sur les tests du dépôt, écrit src/moteur/classifieur.ts
//   npm run classifieur -- --variantes variantes.json     ajoute des variantes (voir plus bas)
//   npm run classifieur -- --validation                   n'écrit rien : validation croisée seulement
//
// Le Worker ne lance aucun entraînement : il ne charge que les poids exportés (src/moteur/classifieur.ts, du JSON).
//
// LE MODÈLE. Une régression logistique multinomiale (un score par type) sur des MORCEAUX DE MOTS de 2 à 5 lettres de
// la question normalisée (« comment » → « co », « com », « omm »… avec les espaces de bord), repliés par hachage sur 4096
// colonnes. 14 types de question, plus « aucun » : une question sans marque (« bouchon conique »), que le moteur lit avec
// son plan par défaut.
//
// LES DONNÉES. Les questions annotées du dépôt : chaque test du banc, des questions réelles, des tournées… qui associe une
// question à l'identifiant du fait attendu en tête de réponse (« comment mettre mon vin en bouteille » -> « mise-en-bouteille.procedure »).
// Le type vient de cet aspect, validé par une personne, et des motifs actuels (types-de-question.ts) :
//   - un motif s'applique et l'aspect attendu est dans le plan de son type : le type du motif ;
//   - aucun motif ne s'applique : l'aspect attendu donne le type (procédure -> « procedure », dimension -> « valeur »…) ; un aspect
//     « définition » ou « usage » donne « aucun » (le plan par défaut présente la définition d'abord) ; « condition » est ambigu
//     (fait, permission ou conseil) : la question est écartée ;
//   - sinon (un motif s'applique mais l'aspect attendu n'est pas dans son plan) : écartée, le motif est une exception voulue.
// Ni le jeu de mesure ni le jeu inédit n'entrent dans l'entraînement : ils restent des jeux de contrôle.
//
// LES VARIANTES. Un fichier JSON [{ "question": "...", "type": "procedure" }, ...] ajoute des façons de parler que le dépôt ne
// contient pas. Le type est l'un des 14 types, ou « aucun ». Elles servent à l'entraînement, jamais à la validation croisée
// (qui ne mesure que les questions du dépôt, pour que les chiffres ne dépendent pas des variantes).
//
// VALIDATION CROISÉE. 5 plis, tirés au sort avec une graine fixe : chaque question est classée par un modèle qui ne l'a jamais vue.
// Le script donne l'exactitude, le rappel par type, et, pour les questions SANS motif, la couverture et la précision selon la
// probabilité minimale : c'est ainsi qu'on choisit le seuil de src/moteur/classifieur.ts.
//
// Rejouable : même graine, mêmes entrées, même fichier de sortie.
import { build } from "esbuild";
import { mkdtemp, readFile, readdir, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import { pathToFileURL } from "node:url";

const racine = resolve(import.meta.dirname, "..");
const args = process.argv.slice(2);
const valeur = (nom) => {
  const i = args.indexOf(`--${nom}`);
  return i >= 0 ? args[i + 1] : undefined;
};
const SEULEMENT_VALIDER = args.includes("--validation");
const COLONNES = 4096;
const N_MIN = 2;
const N_MAX = 5;
const EPOCHS = Number(valeur("epoques") ?? 300);
const REGULARISATION = Number(valeur("regularisation") ?? 0.00005);
const PLIS = 5;

// 1. Le moteur actuel : les motifs de type et les plans.
const dossier = await mkdtemp(join(tmpdir(), "classifieur-"));
const sortieMoteur = join(dossier, "moteur.mjs");
let moteur;
try {
  await build({
    stdin: {
      contents: `
        export { lireTypeDeQuestion } from "./src/moteur/types-de-question";
        export { normaliser } from "./src/moteur/texte";
        export { PLANS_DE_REPONSE, TYPES_DE_QUESTION } from "./src/savoir/types";
        export { fonctionsDeLaQuestion } from "./src/moteur/classifieur-outils";
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
const { lireTypeDeQuestion, normaliser, PLANS_DE_REPONSE, TYPES_DE_QUESTION, fonctionsDeLaQuestion } = moteur;
const CLASSES = [...TYPES_DE_QUESTION, "aucun"];

// 2. Les questions annotées des tests : [question, "fait.aspect"] ou [question, ["fait.aspect", ...]] ou [n, question, [...]].
const CHAINE = String.raw`"((?:[^"\\\n]|\\.)+)"`;
const IDENTIFIANT = String.raw`"([a-z0-9+\-]+\.[a-z]+(?:\.\d+)?)"`;
const EXCLUS = /(?:mesure|sens\.test|phrase\.test|lexique|robustesse|jeu-de|inedit|classifieur)/;
const annotees = new Map();
for (const fichier of (await readdir(join(racine, "test"))).filter((f) => /\.(ts|mjs)$/.test(f) && !EXCLUS.test(f))) {
  const t = await readFile(join(racine, "test", fichier), "utf8");
  const ajouter = (q, ids) => {
    const question = q.replace(/\\"/g, '"');
    if (question.length > 5 && question.includes(" ")) {
      const dejaVus = annotees.get(question) ?? new Set();
      ids.forEach((i) => dejaVus.add(i));
      annotees.set(question, dejaVus);
    }
  };
  for (const m of t.matchAll(new RegExp(String.raw`\[\s*${CHAINE}\s*,\s*${IDENTIFIANT}\s*\]`, "g"))) ajouter(m[1], [m[2]]);
  for (const m of t.matchAll(new RegExp(String.raw`\[\s*${CHAINE}\s*,\s*\[((?:\s*${IDENTIFIANT}\s*,?)+)\]\s*\]`, "g"))) ajouter(m[1], [...m[2].matchAll(new RegExp(IDENTIFIANT, "g"))].map((x) => x[1]));
  for (const m of t.matchAll(new RegExp(String.raw`\[\s*\d+\s*,\s*${CHAINE}\s*,\s*\[((?:\s*${IDENTIFIANT}\s*,?)+)\]\s*\]`, "g"))) ajouter(m[1], [...m[2].matchAll(new RegExp(IDENTIFIANT, "g"))].map((x) => x[1]));
}

// 3. Les types : voir « LES DONNÉES ».
const TYPE_DE_L_ASPECT = { prix: "prix", lieu: "lieu", gamme: "gamme", duree: "duree", moment: "moment", raison: "raison", dimension: "valeur", choix: "choix", procedure: "procedure", entretien: "entretien", definition: "aucun", usage: "aucun" };
const exemples = []; // { question, forme, classe, marque }
let ecartees = 0;
for (const [question, ids] of annotees) {
  const forme = normaliser(question);
  const aspects = [...new Set([...ids].map((i) => i.split(".")[1]))];
  const marque = lireTypeDeQuestion(forme);
  let classe;
  if (marque) {
    const plan = new Set(PLANS_DE_REPONSE[marque.type]);
    classe = aspects.some((a) => plan.has(a)) ? marque.type : undefined;
  } else {
    const types = new Set(aspects.map((a) => TYPE_DE_L_ASPECT[a]).filter(Boolean));
    classe = types.size === 1 ? [...types][0] : undefined;
  }
  if (classe) exemples.push({ question, forme, classe, marque: marque?.type ?? null });
  else ecartees++;
}
const nombreAnnotees = exemples.length;
const variantes = [];
if (valeur("variantes")) {
  for (const { question, type } of JSON.parse(await readFile(valeur("variantes"), "utf8"))) {
    if (!CLASSES.includes(type)) throw new Error(`type inconnu dans les variantes : ${type}`);
    variantes.push({ question, forme: normaliser(question), classe: type, marque: lireTypeDeQuestion(normaliser(question))?.type ?? null });
  }
}

// 4. Les caractéristiques : morceaux de mots de 2 à 5 lettres, repliés par hachage (FNV-1a).
function caracteristiques(forme) {
  return fonctionsDeLaQuestion(forme, COLONNES, N_MIN, N_MAX);
}

// 5. La régression logistique multinomiale (descente de gradient à pas fixe, régularisation L2, classes pondérées).
const K = CLASSES.length;
function entrainer(donnees) {
  const poids = new Float64Array(COLONNES * K);
  const biais = new Float64Array(K);
  const comptes = new Array(K).fill(0);
  donnees.forEach((d) => comptes[CLASSES.indexOf(d.classe)]++);
  const poidsDeClasse = comptes.map((c) => (c === 0 ? 0 : donnees.length / (K * c)));
  const X = donnees.map((d) => caracteristiques(d.forme));
  const y = donnees.map((d) => CLASSES.indexOf(d.classe));
  const pas = Number(valeur("pas") ?? 40);
  for (let epoque = 0; epoque < EPOCHS; epoque++) {
    const gradient = new Float64Array(COLONNES * K);
    const gradientBiais = new Float64Array(K);
    donnees.forEach((_, i) => {
      const logits = Float64Array.from(biais);
      for (const [col, v] of X[i]) for (let k = 0; k < K; k++) logits[k] += poids[col * K + k] * v;
      const max = Math.max(...logits);
      let somme = 0;
      const p = logits.map((l) => {
        const e = Math.exp(l - max);
        somme += e;
        return e;
      });
      const w = poidsDeClasse[y[i]];
      for (let k = 0; k < K; k++) {
        const erreur = (p[k] / somme - (k === y[i] ? 1 : 0)) * w;
        gradientBiais[k] += erreur;
        for (const [col, v] of X[i]) gradient[col * K + k] += erreur * v;
      }
    });
    const n = donnees.length;
    for (let j = 0; j < poids.length; j++) poids[j] -= pas * (gradient[j] / n + REGULARISATION * poids[j]);
    for (let k = 0; k < K; k++) biais[k] -= pas * (gradientBiais[k] / n);
  }
  return { poids, biais };
}
function probabilites(modele, forme) {
  const logits = Float64Array.from(modele.biais);
  for (const [col, v] of caracteristiques(forme)) for (let k = 0; k < K; k++) logits[k] += modele.poids[col * K + k] * v;
  const max = Math.max(...logits);
  const e = logits.map((l) => Math.exp(l - max));
  const somme = e.reduce((s, x) => s + x, 0);
  return Array.from(e, (x) => x / somme);
}

// 6. La validation croisée : 5 plis tirés au sort avec une graine fixe.
function melange(liste, graine) {
  let x = graine;
  const hasard = () => ((x = (x * 1103515245 + 12345) % 2147483648) / 2147483648);
  const copie = [...liste];
  for (let i = copie.length - 1; i > 0; i--) {
    const j = Math.floor(hasard() * (i + 1));
    [copie[i], copie[j]] = [copie[j], copie[i]];
  }
  return copie;
}
const ordre = melange(exemples, 42);
const predictions = [];
for (let pli = 0; pli < PLIS; pli++) {
  const test = ordre.filter((_, i) => i % PLIS === pli);
  const apprentissage = [...ordre.filter((_, i) => i % PLIS !== pli), ...variantes];
  const modele = entrainer(apprentissage);
  for (const d of test) {
    const p = probabilites(modele, d.forme);
    const rang = p.map((v, k) => [v, k]).sort((a, b) => b[0] - a[0]);
    predictions.push({ ...d, predit: CLASSES[rang[0][1]], probabilite: rang[0][0], second: CLASSES[rang[1][1]], probabiliteSecond: rang[1][0] });
  }
}
const juste = predictions.filter((d) => d.predit === d.classe).length;
// Comme dans le Worker (types-appris.ts, MOTS_MIN) : un mot ou deux ne sont jamais classés.
const sansMarque = predictions.filter((d) => d.marque === null && d.forme.split(" ").length >= 3);
console.log(`Questions annotées : ${nombreAnnotees} (${ecartees} écartées), variantes : ${variantes.length}.`);
console.log(`Exactitude en validation croisée (${PLIS} plis) : ${Math.round((1000 * juste) / predictions.length) / 10} % (${juste}/${predictions.length}).`);
console.log("Rappel par type :");
for (const classe of CLASSES) {
  const lot = predictions.filter((d) => d.classe === classe);
  if (lot.length) console.log(`  ${classe.padEnd(12)} ${String(lot.length).padStart(4)} questions, ${Math.round((100 * lot.filter((d) => d.predit === classe).length) / lot.length)} % retrouvées`);
}
console.log(`Questions SANS motif : ${sansMarque.length}. Pour chaque seuil de probabilité, la part des questions classées et leur précision :`);
for (const seuil of [0.4, 0.5, 0.6, 0.7, 0.8, 0.9]) {
  const retenues = sansMarque.filter((d) => d.probabilite >= seuil);
  const justes = retenues.filter((d) => d.predit === d.classe).length;
  console.log(`  seuil ${seuil} : ${retenues.length} classées (${Math.round((100 * retenues.length) / sansMarque.length)} %), ${retenues.length ? Math.round((1000 * justes) / retenues.length) / 10 : "-"} % justes`);
}
if (SEULEMENT_VALIDER) process.exit(0);

// 7. L'entraînement final et l'export des poids, en JSON.
const modele = entrainer([...exemples, ...variantes]);
const lignes = [];
for (let col = 0; col < COLONNES; col++) {
  // Un poids plus petit que 0,05 ne change aucune réponse : il est écarté, pour alléger le fichier.
  const ligne = Array.from({ length: K }, (_, k) => (Math.abs(modele.poids[col * K + k]) < 0.05 ? 0 : Math.round(modele.poids[col * K + k] * 100) / 100));
  if (ligne.some((v) => v !== 0)) lignes.push(`"${col}":[${ligne.join(",")}]`);
}
const source = `// ═══════════════════════════════════════════════════════════════════════════
// LE CLASSIFIEUR DE TYPES DE QUESTION : les poids d'une régression logistique sur des morceaux de mots.
//
// ⚠️ FICHIER GÉNÉRÉ : ne le modifiez pas à la main. Pour le refaire :
//   npm run classifieur    (voir scripts/entrainer-classifieur.mjs)
//
// Entraîné sur ${nombreAnnotees} questions annotées du dépôt${variantes.length ? ` et ${variantes.length} variantes` : ""}. Les poids sont du JSON : aucune dépendance au moment de l'exécution.
// ═══════════════════════════════════════════════════════════════════════════

export const CLASSES: readonly string[] = ${JSON.stringify(CLASSES)};
export const COLONNES = ${COLONNES};
export const N_MIN = ${N_MIN};
export const N_MAX = ${N_MAX};
export const BIAIS: readonly number[] = ${JSON.stringify(Array.from(modele.biais, (v) => Math.round(v * 100) / 100))};
/** Pour chaque colonne utile : un poids par classe, dans l'ordre de CLASSES. */
export const POIDS: Readonly<Record<string, readonly number[]>> = JSON.parse(
  ${JSON.stringify("{" + lignes.join(",") + "}")},
);
`;
await writeFile(join(racine, "src/moteur/classifieur.ts"), source);
console.log(`Poids exportés : ${lignes.length} colonnes utiles sur ${COLONNES}, ${Math.round(source.length / 1024)} Kio.`);
