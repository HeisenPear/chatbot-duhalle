// MESURE DU MOTEUR sur le jeu de mesure (test/mesure/jeu-de-mesure.ts).
//
//   npm run mesure                  les chiffres, et les écarts
//   npm run mesure -- --json        les chiffres en JSON (pour comparer deux étapes)
//   npm run mesure -- --ecarts      la liste complète des réponses fausses
//   npm run mesure -- --seuil 0.7 --seuil-avec-concept 0.9 --marge 0.05      règle la reconnaissance par le sens (voir src/moteur/sens.ts)
//   npm run mesure -- --sans-sens   la mesure sans reconnaissance par le sens
//
// Donne : la bonne réponse en premier (%), la bonne réponse parmi les 3 premiers faits (%), le taux de
// réponses « inconnu », le refus à bon escient des questions hors base, et le temps de calcul d'une
// question (moyen, 95e centile, maximum), à chaud puis à froid (première question d'un Worker neuf).
//
// Le script compile le moteur avec esbuild dans un dossier temporaire : rien n'est écrit dans le dépôt.
import { build } from "esbuild";
import { mkdtemp, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import { pathToFileURL } from "node:url";

const racine = resolve(import.meta.dirname, "..");
const dossier = await mkdtemp(join(tmpdir(), "mesure-"));
const sortie = join(dossier, "mesure.mjs");
try {
  await build({
    stdin: {
      contents: `
        export { Assistant } from "./src/moteur/assistant";
        export { REGLAGES } from "./src/savoir/coordonnees";
        export { BASE } from "./src/savoir/index";
        export { JEU_DE_MESURE } from "./test/mesure/jeu-de-mesure";
        export { REGLAGES_DU_SENS } from "./src/moteur/sens";
      `,
      resolveDir: racine,
      loader: "ts",
    },
    bundle: true,
    platform: "node",
    format: "esm",
    outfile: sortie,
    logLevel: "error",
  });
  const { Assistant, REGLAGES, BASE, JEU_DE_MESURE, REGLAGES_DU_SENS } = await import(pathToFileURL(sortie).href);
const valeur = (nom) => {
  const i = process.argv.indexOf(`--${nom}`);
  return i >= 0 ? Number(process.argv[i + 1]) : undefined;
};
if (valeur("seuil") !== undefined) REGLAGES_DU_SENS.seuil = valeur("seuil");
if (valeur("seuil-avec-concept") !== undefined) REGLAGES_DU_SENS.seuilAvecConcept = valeur("seuil-avec-concept");
if (valeur("marge") !== undefined) REGLAGES_DU_SENS.marge = valeur("marge");
if (process.argv.includes("--sans-sens")) REGLAGES_DU_SENS.seuil = REGLAGES_DU_SENS.seuilAvecConcept = 2;

  // La construction comprend le préchauffage du moteur : c'est ce que fait le Worker au démarrage de l'isolat.
  const debutDeLaConstruction = performance.now();
  const assistant = new Assistant(BASE, REGLAGES);
  const construction = performance.now() - debutDeLaConstruction;

  /** Le fait est attendu : son id, ou l'un de ses concepts. */
  const faitsParId = new Map(BASE.faits.map((f) => [f.id, f]));
  const convient = (idDuFait, attendus) => {
    const fait = faitsParId.get(idDuFait);
    // « a+b » : le fait doit porter les deux concepts (« bonde+contenant »).
    return attendus.some((a) => (a.includes(".") ? a === idDuFait : a.split("+").every((c) => fait?.concepts.includes(c))));
  };

  // La première réponse de chaque question est mesurée à froid (caches de correction vides).
  const froid = [];
  const chaud = [];
  const resultats = [];
  for (const [question, attendus] of JEU_DE_MESURE) {
    const debut = performance.now();
    const reponse = assistant.repondre(question);
    froid.push(performance.now() - debut);
    resultats.push({ question, attendus, reponse });
  }
  // Puis 5 passes à chaud : le Worker garde ses caches entre deux requêtes d'un même isolat.
  for (let passe = 0; passe < 5; passe++) {
    for (const [question] of JEU_DE_MESURE) {
      const debut = performance.now();
      assistant.repondre(question);
      chaud.push(performance.now() - debut);
    }
  }

  const avecReponse = resultats.filter((r) => r.attendus !== null);
  const horsBase = resultats.filter((r) => r.attendus === null);
  const premier = avecReponse.filter((r) => r.reponse.trace.faits[0] !== undefined && convient(r.reponse.trace.faits[0], r.attendus));
  const troisPremiers = avecReponse.filter((r) => r.reponse.trace.faits.slice(0, 3).some((f) => convient(f, r.attendus)));
  const inconnus = resultats.filter((r) => r.reponse.nature === "inconnu");
  const inconnusAvecReponse = avecReponse.filter((r) => r.reponse.nature === "inconnu");
  const refusOk = horsBase.filter((r) => r.reponse.nature === "inconnu");

  const pct = (n, total) => Math.round((1000 * n) / total) / 10;
  const stats = (valeurs) => {
    const tries = [...valeurs].sort((a, b) => a - b);
    const somme = tries.reduce((s, v) => s + v, 0);
    return {
      moyenne_ms: Math.round((100 * somme) / tries.length) / 100,
      p95_ms: Math.round(100 * tries[Math.floor(0.95 * (tries.length - 1))]) / 100,
      maximum_ms: Math.round(100 * tries[tries.length - 1]) / 100,
    };
  };
  const chiffres = {
    questions: resultats.length,
    avec_reponse_attendue: avecReponse.length,
    hors_base: horsBase.length,
    bonne_reponse_en_premier_pct: pct(premier.length, avecReponse.length),
    bonne_reponse_parmi_les_3_pct: pct(troisPremiers.length, avecReponse.length),
    inconnu_pct_toutes_questions: pct(inconnus.length, resultats.length),
    inconnu_pct_questions_avec_reponse: pct(inconnusAvecReponse.length, avecReponse.length),
    refus_a_bon_escient_pct: pct(refusOk.length, horsBase.length),
    temps_a_chaud: stats(chaud),
    temps_a_froid: stats(froid),
    construction_de_l_assistant_ms: Math.round(100 * construction) / 100,
    mots_reconnus_par_le_sens: resultats.reduce((total, r) => total + r.reponse.trace.substitutions.length, 0),
    questions_touchees_par_le_sens: resultats.filter((r) => r.reponse.trace.substitutions.length > 0).length,
  };

  if (process.argv.includes("--json")) {
    console.log(JSON.stringify(chiffres, null, 2));
  } else {
    console.log(`Jeu de mesure : ${chiffres.questions} questions (${chiffres.avec_reponse_attendue} avec réponse attendue, ${chiffres.hors_base} hors base)`);
    console.log(`  bonne réponse en premier        ${chiffres.bonne_reponse_en_premier_pct} %  (${premier.length}/${avecReponse.length})`);
    console.log(`  bonne réponse parmi les 3       ${chiffres.bonne_reponse_parmi_les_3_pct} %  (${troisPremiers.length}/${avecReponse.length})`);
    console.log(`  réponses « inconnu »            ${chiffres.inconnu_pct_toutes_questions} % de toutes les questions, ${chiffres.inconnu_pct_questions_avec_reponse} % de celles qui ont une réponse`);
    console.log(`  refus à bon escient (hors base) ${chiffres.refus_a_bon_escient_pct} %  (${refusOk.length}/${horsBase.length})`);
    console.log(`  temps de calcul à chaud         moyen ${chiffres.temps_a_chaud.moyenne_ms} ms, p95 ${chiffres.temps_a_chaud.p95_ms} ms, maximum ${chiffres.temps_a_chaud.maximum_ms} ms`);
    console.log(`  temps de calcul à froid         moyen ${chiffres.temps_a_froid.moyenne_ms} ms, p95 ${chiffres.temps_a_froid.p95_ms} ms, maximum ${chiffres.temps_a_froid.maximum_ms} ms`);
    console.log(`  construction de l'assistant     ${chiffres.construction_de_l_assistant_ms} ms (une fois par isolat)`);
    console.log(`  reconnaissance par le sens      ${chiffres.mots_reconnus_par_le_sens} mots reconnus dans ${chiffres.questions_touchees_par_le_sens} questions (seuil ${REGLAGES_DU_SENS.seuil}, avec concept ${REGLAGES_DU_SENS.seuilAvecConcept}, marge ${REGLAGES_DU_SENS.marge})`);
  }
  if (process.argv.includes("--ecarts")) {
    console.log("\nÉcarts (le premier fait n'est pas celui attendu) :");
    for (const r of avecReponse) {
      const f = r.reponse.trace.faits[0];
      if (f !== undefined && convient(f, r.attendus)) continue;
      const rang = r.reponse.trace.faits.findIndex((x) => convient(x, r.attendus));
      console.log(`  ${rang >= 0 ? `[rang ${rang + 1}]` : "[absent]"} ${r.question.slice(0, 90)}\n      attendu ${r.attendus.join(" | ")} ; obtenu ${r.reponse.nature} ${r.reponse.trace.faits.join(", ") || "-"}`);
    }
    for (const r of resultats.filter((x) => x.reponse.trace.substitutions.length > 0)) {
      console.log(`  [sens] ${r.question.slice(0, 80)} : ${r.reponse.trace.substitutions.join(", ")}`);
    }
    for (const r of horsBase.filter((x) => x.reponse.nature !== "inconnu")) {
      console.log(`  [hors base répondu] ${r.question.slice(0, 90)}\n      obtenu ${r.reponse.nature} ${r.reponse.trace.faits.join(", ")}`);
    }
  }
} finally {
  await rm(dossier, { recursive: true, force: true });
}
