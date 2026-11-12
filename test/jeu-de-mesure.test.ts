// Le jeu de mesure doit rester sain : assez de questions, aucun doublon, des attendus qui existent dans la
// base. (L'absence de question déjà réglée ailleurs se vérifie en JavaScript : jeu-de-mesure-inedit.test.mjs.)
import { describe, expect, it } from "vitest";
import { normaliser } from "../src/moteur/texte";
import { BASE } from "../src/savoir/index";
import { JEU_DE_MESURE } from "./mesure/jeu-de-mesure";

describe("le jeu de mesure", () => {
  it("compte au moins 100 questions, sans doublon", () => {
    expect(JEU_DE_MESURE.length).toBeGreaterThanOrEqual(100);
    const formes = JEU_DE_MESURE.map(([question]) => normaliser(question));
    expect(new Set(formes).size).toBe(formes.length);
  });

  it("n'attend que des faits ou des notions qui existent dans la base", () => {
    const faits = new Set(BASE.faits.map((f) => f.id));
    const concepts = new Set(BASE.concepts.map((c) => c.id));
    const inconnus = JEU_DE_MESURE.flatMap(([question, attendus]) =>
      (attendus ?? []).filter((a) => !(a.includes(".") ? faits.has(a) : a.split("+").every((c) => concepts.has(c)))).map((a) => `${a} (${question})`),
    );
    expect(inconnus).toEqual([]);
  });

  it("garde quelques questions hors base, dont la bonne réponse est de rediriger", () => {
    expect(JEU_DE_MESURE.filter(([, attendus]) => attendus === null).length).toBeGreaterThanOrEqual(5);
  });
});
