// PRÉPARATION HORS LIGNE DU LEXIQUE DES FORMES (étape 1 de la lecture de la question).
//
//   npm run lexique -- chemin/vers/lefff-3.4.mlex
//
// Le Worker ne charge jamais le Lefff entier (15 Mo) : ce script en tire la table réduite
// src/moteur/lexique.ts, forme -> racine du mot de base + nature.
//
// OBTENIR LE LEFFF (Lexique des Formes Fléchies du Français, Benoît Sagot, Inria / Alpage-Almanach,
// licence LGPL-LR, voir scripts/lexique/LICENCE-LGPL-LR.txt). Le fichier lefff-3.4.mlex est distribué dans
// le paquet PyPI « spacy-lefff » (dont le code est sous licence MIT, les données sous LGPL-LR) :
//
//   pip download spacy-lefff --no-deps -d /tmp/lefff && unzip -o /tmp/lefff/spacy_lefff-*.whl -d /tmp/lefff/x
//   npm run lexique -- /tmp/lefff/x/spacy_lefff/data/lefff-3.4.mlex
//
// CE QUI EST GARDÉ. Les mots de la base de savoir (alias, formules, énoncés des faits) et les mots des questions
// des tests forment le « vocabulaire ». Pour chaque mot du vocabulaire qui est un mot de base du lexique, on garde
// TOUTES ses formes (« bouchais », « mettront » pour « boucher », « mettre »), et pour chaque forme la racine du mot
// de base, calculée comme le Worker calcule celle d'un mot : par `racinerParSuffixes`. Une forme dont la racine ne
// diffère pas de celle que le repli par suffixes donnerait seul n'est gardée que si elle est dans le vocabulaire :
// il faut sa nature pour l'étape suivante, mais pas son entrée pour la racine.
//
// UNE FORME À PLUSIEURS LECTURES (« bouchons » : nom « bouchon » ou verbe « boucher ») prend d'abord la lecture dont le
// mot de base est la forme elle-même, puis celle du nom, de l'adjectif, du verbe, de l'adverbe : le nom est celui dont parle une boutique. Seules comptent les
// lectures dont le mot de base est dans le vocabulaire, donc « mets » (le plat) ne chasse pas « mettre ».
//
// LES VERBES QUI ENTRENT DANS TOUTE PHRASE (« je viens de passer une commande », « je peux », « il faut ») gardent la
// racine du repli par suffixes : le lexique ne donne que leur nature. Rapprocher « viens » de « venir » ferait citer
// le point de vente (alias « venir chercher ») à qui dit « je viens de commander ».
//
// Rejouable : mêmes entrées, même fichier de sortie (tout est trié).
import { build } from "esbuild";
import { mkdtemp, readFile, readdir, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import { pathToFileURL } from "node:url";

const racine = resolve(import.meta.dirname, "..");
const chemin = process.argv.slice(2).find((a) => !a.startsWith("--"));
if (!chemin) {
  console.error("Usage : npm run lexique -- chemin/vers/lefff-3.4.mlex");
  process.exit(1);
}

// 1. Le moteur actuel : la base de savoir, normaliser, racinerParSuffixes, estMotVide.
const dossier = await mkdtemp(join(tmpdir(), "lexique-"));
const sortieMoteur = join(dossier, "moteur.mjs");
let moteur;
try {
  await build({
    stdin: {
      contents: `
        export { BASE } from "./src/savoir/index";
        export { normaliser, racinerParSuffixes, estMotVide } from "./src/moteur/texte";
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
const { BASE, normaliser, racinerParSuffixes, estMotVide } = moteur;

// 2. Le vocabulaire : la base de savoir, puis les questions des tests.
const mots = (texte) => normaliser(texte).split(" ").filter((m) => /^[a-z]{2,}$/.test(m));
const vocabulaire = new Set();
for (const c of BASE.concepts) for (const t of [c.libelle, ...c.alias, ...(c.formules ?? [])]) mots(t).forEach((m) => vocabulaire.add(m));
for (const f of BASE.faits) mots(f.enonce).forEach((m) => vocabulaire.add(m));
const nombreDeMotsDeLaBase = vocabulaire.size;
for (const fichier of (await readdir(join(racine, "test"))).filter((f) => /\.(ts|mjs)$/.test(f))) {
  mots(await readFile(join(racine, "test", fichier), "utf8")).forEach((m) => vocabulaire.add(m));
}

// 3. Le Lefff : forme, catégorie, mot de base. Seuls les mots simples (une suite de lettres) sont gardés.
const NATURES = { nc: "n", adj: "a", v: "v", auxAvoir: "v", auxEtre: "v", adv: "r" };
const RANG = { n: 0, a: 1, v: 2, r: 3 };
const lectures = new Map(); // forme -> [{ base, nature }]
const formesDeLaBase = new Map(); // mot de base -> formes
for (const ligne of (await readFile(chemin, "utf8")).split("\n")) {
  const [formeBrute, categorie, baseBrute] = ligne.split("\t");
  const nature = NATURES[categorie ?? ""];
  if (!nature || !formeBrute || !baseBrute) continue;
  const forme = normaliser(formeBrute);
  const base = normaliser(baseBrute);
  if (!/^[a-z]+$/.test(forme) || !/^[a-z]+$/.test(base)) continue;
  const liste = lectures.get(forme) ?? [];
  if (!liste.some((l) => l.base === base && l.nature === nature)) liste.push({ base, nature });
  lectures.set(forme, liste);
  const formes = formesDeLaBase.get(base) ?? new Set();
  formes.add(forme);
  formesDeLaBase.set(base, formes);
}

/** Les verbes de toute phrase : leur racine reste celle du repli (voir l'en-tête). */
const VERBES_DE_TOUTE_PHRASE = new Set(["venir", "aller", "devoir", "pouvoir", "vouloir", "falloir", "savoir", "voir", "faire", "avoir", "etre"]);

// 4. Les mots de base à couvrir : ceux d'une lecture d'un mot du vocabulaire, qui sont eux-mêmes du vocabulaire.
const aCouvrir = new Set();
for (const mot of vocabulaire) {
  for (const { base } of lectures.get(mot) ?? []) if (vocabulaire.has(base)) aCouvrir.add(base);
}

// 5. Les entrées : toutes les formes de ces mots de base, avec leur lecture préférée.
const entrees = new Map(); // forme -> { racine, nature }
const candidates = new Set();
for (const base of aCouvrir) for (const forme of formesDeLaBase.get(base) ?? []) candidates.add(forme);
for (const forme of vocabulaire) if (lectures.has(forme)) candidates.add(forme);
for (const forme of candidates) {
  if (estMotVide(forme)) continue;
  const lues = (lectures.get(forme) ?? []).filter((l) => aCouvrir.has(l.base));
  if (lues.length === 0) continue;
  // Le mot de base identique à la forme d'abord (« arrivée » avant « arrivé », dont l'accent perdu donnerait « arrive »),
  // puis le nom, l'adjectif, le verbe, l'adverbe, puis le mot de base le plus proche de la forme.
  lues.sort(
    (a, b) =>
      Number(b.base === forme) - Number(a.base === forme) ||
      RANG[a.nature] - RANG[b.nature] ||
      b.base.length - a.base.length ||
      (a.base < b.base ? -1 : 1),
  );
  const { base, nature } = lues[0];
  const r = VERBES_DE_TOUTE_PHRASE.has(base) && nature === "v" ? racinerParSuffixes(forme) : racinerParSuffixes(base);
  if (r === racinerParSuffixes(forme) && !vocabulaire.has(forme)) continue;
  entrees.set(forme, { racine: r, nature });
}

// 6. Le fichier.
const lignes = [...entrees].sort((a, b) => (a[0] < b[0] ? -1 : 1)).map(([forme, { racine: r, nature }]) => `${forme}:${r}:${nature}`);
const donnees = lignes.join(";");
const source = `// ═══════════════════════════════════════════════════════════════════════════
// LE LEXIQUE DES FORMES : forme -> racine du mot de base + nature.
//
// ⚠️ FICHIER GÉNÉRÉ : ne le modifiez pas à la main. Pour le refaire :
//   npm run lexique -- chemin/vers/lefff-3.4.mlex    (voir scripts/preparer-lexique.mjs)
//
// Les données viennent du Lefff (Lexique des Formes Fléchies du Français), de Benoît Sagot,
// Inria / Alpage-Almanach, distribué sous la licence LGPL-LR (Lesser General Public License
// For Linguistic Resources, voir scripts/lexique/LICENCE-LGPL-LR.txt). Cette table en est une
// version réduite et modifiée : elle reste une ressource linguistique sous la même licence, sans
// garantie. Elle ne garde que les formes des mots de la base de savoir et des questions des tests.
//
// Format : « forme:racine:nature » séparés par « ; ». Natures : n nom, a adjectif, v verbe, r adverbe.
// ═══════════════════════════════════════════════════════════════════════════

export type NatureDeMot = "nom" | "verbe" | "adjectif" | "adverbe";

const NATURES: Readonly<Record<string, NatureDeMot>> = { n: "nom", a: "adjectif", v: "verbe", r: "adverbe" };

const FORMES = new Map<string, { racine: string; nature: NatureDeMot }>();
for (const entree of DONNEES.split(";")) {
  const [forme, racine, nature] = entree.split(":");
  if (forme && racine && nature) FORMES.set(forme, { racine, nature: NATURES[nature]! });
}

/** La racine et la nature d'un mot normalisé, ou \`undefined\` si le lexique ne le connaît pas. */
export function chercherDansLeLexique(mot: string): { racine: string; nature: NatureDeMot } | undefined {
  return FORMES.get(mot);
}

// Les données sont après le code pour garder l'en-tête lisible.
`;
// DONNEES doit être déclarée avant son usage : on la place en tête du code.
const final = source.replace("const NATURES:", `const DONNEES =\n  ${JSON.stringify(donnees)};\n\nconst NATURES:`).replace("\n// Les données sont après le code pour garder l'en-tête lisible.\n", "");
await writeFile(join(racine, "src/moteur/lexique.ts"), final);
console.log(`Vocabulaire : ${vocabulaire.size} mots (dont ${nombreDeMotsDeLaBase} de la base de savoir).`);
console.log(`Mots de base couverts : ${aCouvrir.size}. Entrées du lexique : ${entrees.size} (${Math.round(donnees.length / 1024)} Kio de données).`);
