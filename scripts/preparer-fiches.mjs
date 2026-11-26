// ═══════════════════════════════════════════════════════════════════════════
// LES MESURES DES FICHES PRODUITS, TIRÉES DU FLUX GOOGLE SHOPPING D'OXATIS.
//
//   npm run fiches -- chemin/vers/products.csv
//
// Le flux (export Oxatis « products.csv », séparateur « ; », encodage DOS cp850)
// donne pour chaque article son nom, son lien et la description de sa fiche.
// On garde le nom, le lien et les lignes de la description qui donnent une
// mesure (hauteur, diamètre, contenance…) ; le reste de la fiche ne sert pas
// au chatbot. Le fichier produit, src/savoir/fiches-produits.ts, se rejoue à
// l'identique : à refaire à chaque nouvel export du catalogue.
// ═══════════════════════════════════════════════════════════════════════════
import { readFileSync, writeFileSync } from "node:fs";

const chemin = process.argv[2];
if (!chemin) {
  console.error("Usage : npm run fiches -- chemin/vers/products.csv");
  process.exit(1);
}

// ─── Lecture du CSV (champs entre guillemets, sur plusieurs lignes) ────────

/** Le flux est en cp850 (page de code DOS) : les octets 0x80 à 0xFF n'y sont pas du latin-1. */
const CP850 =
  "ÇüéâäàåçêëèïîìÄÅÉæÆôöòûùÿÖÜø£Ø×ƒáíóúñÑªº¿®¬½¼¡«»░▒▓│┤ÁÂÀ©╣║╗╝¢¥┐└┴┬├─┼ãÃ╚╔╩╦╠═╬¤ðÐÊËÈıÍÎÏ┘┌█▄¦Ì▀ÓßÔÒõÕµþÞÚÛÙýÝ¯´­±‗¾¶§÷¸°¨·¹³²■ ";
function decoder(octets) {
  let s = "";
  for (const o of octets) s += o < 0x80 ? String.fromCharCode(o) : CP850[o - 0x80];
  return s;
}

function lireCsv(texte, separateur) {
  const lignes = [];
  let ligne = [];
  let champ = "";
  let entreGuillemets = false;
  for (let i = 0; i < texte.length; i++) {
    const c = texte[i];
    if (entreGuillemets) {
      if (c === '"' && texte[i + 1] === '"') {
        champ += '"';
        i++;
      } else if (c === '"') entreGuillemets = false;
      else champ += c;
    } else if (c === '"') entreGuillemets = true;
    else if (c === separateur) {
      ligne.push(champ);
      champ = "";
    } else if (c === "\n" || c === "\r") {
      if (c === "\r" && texte[i + 1] === "\n") i++;
      ligne.push(champ);
      champ = "";
      if (ligne.some((x) => x !== "")) lignes.push(ligne);
      ligne = [];
    } else champ += c;
  }
  if (champ !== "" || ligne.length > 0) {
    ligne.push(champ);
    lignes.push(ligne);
  }
  return lignes;
}

// ─── Nettoyage du texte ───────────────────────────────────────────────────

const ENTITES = { amp: "&", lt: "<", gt: ">", quot: '"', apos: "'", nbsp: " " };
function texteBrut(html) {
  return html
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<[^>]+>/g, " ")
    .replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(Number(n)))
    .replace(/&([a-z]+);/gi, (m, nom) => ENTITES[nom.toLowerCase()] ?? m);
}

/**
 * L'export a perdu les tirets longs et les apostrophes typographiques : ils y sont devenus « ? ».
 * Entre deux lettres c'est une apostrophe (« l?humidité »), entre deux espaces un tiret (« Butane ? Propane »).
 */
function reparer(texte) {
  return texte
    .replace(/(\p{L})\?(\p{L})/gu, "$1’$2")
    .replace(/ \? /g, " – ")
    .replace(/\s+/g, " ")
    .trim();
}

/** Une ligne de description qui donne une mesure : un mot de mesure ET un nombre. */
const MOT_DE_MESURE =
  /\b(hauteur|largeur|longueur|profondeur|diam[eè]tre|dimensions?|dim\b|contenance|capacit[eé]|[ée]paisseur|poids|volume|calibre|section|ouverture|bague|col|taille|format|graduations?|grille)\b|Ø|\d\s?(?:mm|cm|ml|cl|l|litres?|kg|g)\b/i;
const NOMBRE = /\d/;

function mesures(description) {
  return texteBrut(description)
    .split("\n")
    .map((l) => reparer(l.replace(/^[\s✦•☛\-–*]+/u, "")))
    .filter((l) => l.length > 0 && l.length <= 160 && NOMBRE.test(l) && MOT_DE_MESURE.test(l))
    // Les lignes de prix ou de lot (« Gros volume : demander un devis ») ne sont pas des mesures.
    .filter((l) => !/devis|€|prix|promo/i.test(l));
}

// ─── Le fichier produit ───────────────────────────────────────────────────

const [entete, ...lignes] = lireCsv(decoder(readFileSync(chemin)), ";");
const col = (nom) => {
  const i = entete.indexOf(nom);
  if (i < 0) throw new Error(`Colonne absente du flux : ${nom}`);
  return i;
};
const [ID, NOM, LIEN, DESCRIPTION] = [col("ns1:id"), col("title2"), col("link3"), col("description4")];

const vus = new Set();
const fiches = [];
for (const l of lignes) {
  const id = (l[ID] ?? "").trim();
  const nom = reparer(texteBrut(l[NOM] ?? ""));
  const url = (l[LIEN] ?? "").trim();
  if (!id || !nom || !url.startsWith("https://www.duhalle-boutique.fr/")) continue;
  // Les articles de démonstration du thème Oxatis ne sont pas des produits.
  if (/^\[studio\]|^test|ne pas supprimer/i.test(nom) || /test/i.test(id)) continue;
  if (vus.has(id)) continue;
  vus.add(id);
  fiches.push({ id, nom, url, mesures: [...new Set(mesures(l[DESCRIPTION] ?? ""))] });
}
fiches.sort((a, b) => a.id.localeCompare(b.id));

const corps = fiches.map((f) => `  ${JSON.stringify(f)},`).join("\n");
writeFileSync(
  new URL("../src/savoir/fiches-produits.ts", import.meta.url),
  `// FICHIER PRODUIT par scripts/preparer-fiches.mjs à partir du flux produits d'Oxatis : ne pas modifier à la main.
// ${fiches.length} articles, dont ${fiches.filter((f) => f.mesures.length > 0).length} avec au moins une mesure dans leur fiche.
import type { FicheProduit } from "./types";

export const FICHES_PRODUITS: readonly FicheProduit[] = [
${corps}
];
`,
);
console.log(`${fiches.length} fiches, ${fiches.filter((f) => f.mesures.length > 0).length} avec des mesures.`);
