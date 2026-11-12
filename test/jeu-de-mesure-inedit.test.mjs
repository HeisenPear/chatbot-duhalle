// Le jeu de mesure ne doit contenir aucune question déjà réglée ailleurs (banc, questions réelles, tournées) :
// sinon il ne mesurerait plus la capacité du moteur à généraliser.
// (En JavaScript : le projet n'embarque pas les types Node, que le contrôle de types réserve au Worker.)
import { readFileSync, readdirSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { normaliser } from "../src/moteur/texte";
import { JEU_DE_MESURE } from "./mesure/jeu-de-mesure";

describe("le jeu de mesure est inédit", () => {
  it("ne contient aucune question présente dans un autre test", () => {
    const autres = readdirSync("test")
      .filter((f) => /\.(ts|mjs)$/.test(f) && !f.startsWith("jeu-de-mesure"))
      .map((f) => normaliser(readFileSync(`test/${f}`, "utf8")))
      .join(" ");
    const dejaVues = JEU_DE_MESURE.filter(([question]) => autres.includes(normaliser(question))).map(([question]) => question);
    expect(dejaVues).toEqual([]);
  });
});
