// Compile le widget (src/widget/widget.ts) en un seul fichier, servi par le
// Worker. Les fichiers compilés sont versionnés : Cloudflare les déploie tels
// quels, sans étape de construction à configurer.
//
// Chaque version a sa propre adresse, qui ne change plus : public/v/<version>.js.
// Le site Oxatis charge une version précise, avec son empreinte d'intégrité
// (SRI) : le navigateur refuse tout fichier modifié. Publier une nouvelle
// version ne touche donc pas au site : il garde l'ancienne tant que la balise
// n'est pas mise à jour dans Oxatis.
//
// Ce script reporte l'adresse et l'empreinte de la nouvelle version dans le
// code à coller dans Oxatis et dans la page de démonstration.
// (public/widget.js est l'ancienne adresse unique, figée : ne plus l'utiliser.)
import { createHash } from "node:crypto";
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { build } from "esbuild";

const resultat = await build({
  entryPoints: ["src/widget/widget.ts"],
  bundle: true,
  format: "iife",
  target: "es2019",
  minify: true,
  legalComments: "none",
  banner: {
    js: "/* Chatbot Duhallé — widget compilé depuis src/widget/widget.ts (npm run build). Ne pas modifier à la main. */",
  },
  write: false,
  logLevel: "info",
});
const code = resultat.outputFiles[0].contents;

const version = createHash("sha256").update(code).digest("hex").slice(0, 12);
const empreinte = `sha384-${createHash("sha384").update(code).digest("base64")}`;
mkdirSync("public/v", { recursive: true });
writeFileSync(`public/v/${version}.js`, code);

function reporter(fichier, remplacements) {
  const avant = readFileSync(fichier, "utf8");
  const apres = remplacements.reduce((texte, [motif, valeur]) => texte.replace(motif, valeur), avant);
  if (apres !== avant) writeFileSync(fichier, apres);
}
reporter("oxatis/1-script-chatbot.html", [
  [/workers\.dev\/(?:widget|v\/[0-9a-f]+)\.js/g, `workers.dev/v/${version}.js`],
  [/integrity="sha384-[A-Za-z0-9+/=]*"/g, `integrity="${empreinte}"`],
]);
reporter("public/index.html", [[/src="(?:widget|v\/[0-9a-f]+)\.js"/g, `src="v/${version}.js"`]]);

console.log(`Widget : public/v/${version}.js (${(code.length / 1024).toFixed(1)} Ko)`);
console.log(`Empreinte : ${empreinte}`);
