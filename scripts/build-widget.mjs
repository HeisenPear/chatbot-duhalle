// Compile le widget (src/widget/widget.ts) en un seul fichier public/widget.js,
// servi par le Worker. Le fichier compilé est versionné : Cloudflare le
// déploie tel quel, sans étape de construction à configurer.
//
// Il calcule aussi l'empreinte d'intégrité (SRI) du fichier et la reporte
// dans les codes à coller dans Oxatis : le navigateur refusera tout widget.js
// qui ne serait pas exactement celui-ci.
import { createHash } from "node:crypto";
import { readFileSync, writeFileSync } from "node:fs";
import { build } from "esbuild";

await build({
  entryPoints: ["src/widget/widget.ts"],
  outfile: "public/widget.js",
  bundle: true,
  format: "iife",
  target: "es2019",
  minify: true,
  legalComments: "none",
  banner: {
    js: "/* Chatbot Duhallé — widget compilé depuis src/widget/widget.ts (npm run build). Ne pas modifier à la main. */",
  },
  logLevel: "info",
});

const empreinte = `sha384-${createHash("sha384").update(readFileSync("public/widget.js")).digest("base64")}`;
for (const fichier of ["oxatis/1-script-chatbot.html"]) {
  const avant = readFileSync(fichier, "utf8");
  const apres = avant.replace(/integrity="sha384-[A-Za-z0-9+/=]*"/g, `integrity="${empreinte}"`);
  if (apres !== avant) writeFileSync(fichier, apres);
}
console.log(`Empreinte du widget : ${empreinte}`);
