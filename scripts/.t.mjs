import { build } from "esbuild";
import { pathToFileURL } from "node:url";
const racine = "/home/user/chatbot-duhalle";
const out = "/tmp/claude-0/-home-user-chatbot-duhalle/e19e6e16-d215-5530-bb01-e4e86391015f/scratchpad/t.out.mjs";
await build({ stdin: { contents: `export { Assistant } from "./src/moteur/assistant"; export { REGLAGES } from "./src/savoir/coordonnees"; export { BASE } from "./src/savoir/index"; export { lireLaPhrase } from "./src/moteur/phrase";`, resolveDir: racine, loader: "ts" }, bundle: true, platform: "node", format: "esm", outfile: out, logLevel: "error" });
const m = await import(pathToFileURL(out).href);
const a = new m.Assistant(m.BASE, m.REGLAGES);
for (const q of process.argv.slice(2)) { const r = a.repondre(q); console.log(q.padEnd(52), r.nature, r.trace.faits.slice(0,3).join(","), JSON.stringify(r.trace.concepts), JSON.stringify(m.lireLaPhrase(q).mots.map(x=>x.racine))); }
