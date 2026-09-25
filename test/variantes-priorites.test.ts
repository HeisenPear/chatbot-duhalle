// Validation adversariale des 200 intentions prioritaires. Chaque question est
// soumise sous cinq formes nouvelles : conversationnelle, indirecte, sans
// accents, synonymique et avec une faute de frappe réaliste.
import { describe, expect, it } from "vitest";
import { Assistant } from "../src/moteur/assistant";
import { normaliser, raciner } from "../src/moteur/texte";
import { REGLAGES } from "../src/savoir/coordonnees";
import { BASE } from "../src/savoir/index";
import { QUESTIONS_P1 } from "./priorites-p1.test";
import { FAITS_ATTENDUS, QUESTIONS } from "./priorites-suite.test";

const assistant = new Assistant(BASE, REGLAGES);

interface Priorite {
  readonly rang: number;
  readonly question: string;
  readonly faitsAcceptables: readonly string[];
}

interface Variante extends Priorite {
  readonly famille: string;
  readonly formulation: string;
}

const PRIORITES: Priorite[] = [
  ...QUESTIONS_P1.map(([rang, question, faitsAcceptables]) => ({ rang, question, faitsAcceptables })),
  ...QUESTIONS.map(([rang, question]) => ({ rang, question, faitsAcceptables: FAITS_ATTENDUS[rang]! })),
];

function sansPointFinal(question: string): string {
  return question.trim().replace(/[?!.]+$/u, "");
}

function minusculeInitiale(texte: string): string {
  return texte.length === 0 ? texte : `${texte[0]!.toLocaleLowerCase("fr")}${texte.slice(1)}`;
}

function sansAccentsNiPonctuation(question: string): string {
  return question
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/gu, "")
    .replace(/[’']/gu, " ")
    .replace(/[^a-zA-Z0-9×]+/gu, " ")
    .trim()
    .toLocaleLowerCase("fr");
}

function formeIndirecte(question: string): string {
  const corps = sansPointFinal(question);
  const transformations: Array<[RegExp, string]> = [
    [/^Combien de temps\s+/iu, "Quelle durée faut-il prévoir pour "],
    [/^Combien d’années\s+/iu, "Sur combien d’années "],
    [/^Combien de\s+/iu, "Quel est le nombre de "],
    [/^À quelle température\s+/iu, "Quelle température faut-il pour "],
    [/^À quelle densité\s+/iu, "Quelle densité faut-il pour "],
    [/^Quand faut-il\s+/iu, "À quel moment doit-on "],
    [/^Quand\s+/iu, "À quel moment faut-il "],
    [/^Pourquoi\s+/iu, "Quelle est la raison pour laquelle "],
    [/^Comment choisir\s+/iu, "Quels critères permettent de choisir "],
    [/^Comment savoir\s+/iu, "Quels signes permettent de savoir "],
    [/^Comment\s+/iu, "Quelle méthode faut-il suivre pour "],
    [/^Peut-on\s+/iu, "Est-il possible de "],
    [/^Faut-il\s+/iu, "Est-ce nécessaire de "],
    [/^Qu’est-ce qu[’']?\s*/iu, "Pouvez-vous définir "],
    [/^Quelle différence entre\s+/iu, "Comment distinguer "],
  ];
  for (const [motif, remplacement] of transformations) {
    if (motif.test(corps)) return `${remplacement}${corps.replace(motif, "") } ?`;
  }
  return `Pouvez-vous me dire ${minusculeInitiale(corps)} ?`;
}

const SYNONYMES: ReadonlyArray<readonly [RegExp, string]> = [
  [/\bconvient-il\b/giu, "est-il adapté"],
  [/\bavant la mise en bouteille\b/giu, "avant l'embouteillage"],
  [/\baprès la mise en bouteille\b/giu, "après l'embouteillage"],
  [/\bla mise en bouteille\b/giu, "l'embouteillage"],
  [/\bchoisir\b/giu, "sélectionner"],
  [/\bconserver\b/giu, "garder"],
  [/\bnettoyer\b/giu, "laver"],
  [/\butiliser\b/giu, "employer"],
  [/\béviter\b/giu, "empêcher"],
  [/\bmettre en bouteille\b/giu, "embouteiller"],
  [/\bmise en bouteille\b/giu, "embouteillage"],
  [/\bretirer\b/giu, "enlever"],
  [/\bremplacer\b/giu, "changer"],
  [/\bstocker\b/giu, "entreposer"],
  [/\bcommander\b/giu, "acheter"],
  [/\bcorrectement\b/giu, "comme il faut"],
  [/\bobligatoire\b/giu, "indispensable"],
  [/\bconvient\b/giu, "est adapté"],
];

function avecSynonymes(question: string): string {
  let resultat = sansPointFinal(question);
  for (const [motif, remplacement] of SYNONYMES) resultat = resultat.replace(motif, remplacement);
  resultat = resultat.replace(/\bde acheter\b/giu, "d'acheter");
  if (resultat === sansPointFinal(question)) {
    return `Dans la pratique, ${minusculeInitiale(resultat)} ?`;
  }
  return `${resultat} ?`;
}

function avecFaute(question: string): string {
  const mots = sansPointFinal(question).split(/(\s+)/u);
  let index = -1;
  let longueur = 0;
  for (let i = 0; i < mots.length; i += 2) {
    const lettres = mots[i]!;
    const racine = raciner(normaliser(lettres));
    if (/^\p{L}+$/u.test(lettres) && racine.length >= 6 && lettres.length > longueur && lettres.length >= 7) {
      index = i;
      longueur = lettres.length;
    }
  }
  if (index < 0) return `svp ${minusculeInitiale(sansPointFinal(question))} ?`;
  const mot = mots[index]!;
  const position = Math.max(2, Math.floor(mot.length / 2) - 1);
  if (mot[position] === mot[position + 1]) return `svp ${minusculeInitiale(sansPointFinal(question))} ?`;
  mots[index] = `${mot.slice(0, position)}${mot[position + 1]}${mot[position]}${mot.slice(position + 2)}`;
  return `${mots.join("")} ?`;
}

function variantes(priorite: Priorite): Variante[] {
  const corps = minusculeInitiale(sansPointFinal(priorite.question));
  const formes: Array<[string, string]> = [
    ["conversation", `Bonjour, j'ai une question : ${corps} ?`],
    ["indirecte", formeIndirecte(priorite.question)],
    ["normalisee", `svp ${sansAccentsNiPonctuation(priorite.question)}`],
    ["synonyme", avecSynonymes(priorite.question)],
    ["faute", avecFaute(priorite.question)],
  ];
  return formes.map(([famille, formulation]) => ({ ...priorite, famille, formulation }));
}

const VARIANTES = PRIORITES.flatMap(variantes);

describe("les variantes adversariales des 200 priorités", () => {
  it("construit exactement 1 000 formulations nouvelles et distinctes de leurs sources", () => {
    expect(PRIORITES).toHaveLength(200);
    expect(VARIANTES).toHaveLength(1_000);
    expect(new Set(VARIANTES.map(({ formulation }) => formulation)).size).toBe(1_000);
    expect(VARIANTES.every(({ formulation, question }) => formulation !== question)).toBe(true);
  });

  it.each(VARIANTES)("n°$rang [$famille] — $formulation", ({ formulation, faitsAcceptables }) => {
    const trace = assistant.repondre(formulation).trace;
    expect(
      trace.faits.some((fait) => faitsAcceptables.includes(fait)),
      `${formulation} → type=${trace.type ?? "aucun"}; concepts=${trace.concepts.join(", ") || "aucun"}; faits=${trace.faits.join(", ") || "aucun"}`,
    ).toBe(true);
  });
});
