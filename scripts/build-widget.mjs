// Compile le widget (src/widget/widget.ts) en un seul fichier public/widget.js,
// servi par le Worker. Le fichier compilé est versionné : Cloudflare le
// déploie tel quel, sans étape de construction à configurer.
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
