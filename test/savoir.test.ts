import { describe, expect, it } from "vitest";
import { Assistant } from "../src/moteur/assistant";
import { racines } from "../src/moteur/texte";
import { REGLAGES } from "../src/savoir/coordonnees";
import { BASE, defautsDeLaBase } from "../src/savoir/index";

describe("la base de connaissances", () => {
  it("est bien formée : ids uniques, familles et concepts connus, sources, liens https", () => {
    expect(defautsDeLaBase(BASE)).toEqual([]);
  });

  it("est conséquente", () => {
    expect(BASE.concepts.length).toBeGreaterThanOrEqual(90);
    expect(BASE.faits.length).toBeGreaterThanOrEqual(150);
  });

  it("n'a aucun alias qui désigne deux concepts à la fois", () => {
    // Deux alias aux mêmes racines dans deux concepts : la question serait
    // attribuée au hasard de l'ordre des fichiers.
    const parCle = new Map<string, Set<string>>();
    for (const c of BASE.concepts) {
      for (const alias of [c.libelle, ...c.alias]) {
        const cle = [...racines(alias)].sort().join(" ");
        if (!cle) continue;
        const ids = parCle.get(cle) ?? new Set<string>();
        ids.add(c.id);
        parCle.set(cle, ids);
      }
    }
    const ambigus = [...parCle].filter(([, ids]) => ids.size > 1).map(([cle, ids]) => `${cle} → ${[...ids].join(", ")}`);
    expect(ambigus).toEqual([]);
  });

  it("n'a aucun alias vide une fois les mots courants retirés", () => {
    const vides = BASE.concepts.flatMap((c) => c.alias.filter((a) => racines(a).length === 0).map((a) => `${c.id} : ${a}`));
    expect(vides).toEqual([]);
  });

  it("vouvoie toujours le client", () => {
    // Les lettres accentuées comptent comme des lettres : « êtes » n'est pas « tes ».
    const tutoiement = /(?<!\p{L})(?:tu|toi|ton|ta|tes|te|t')(?!\p{L})/iu;
    const fautifs = BASE.faits.filter((f) => tutoiement.test(f.enonce)).map((f) => f.id);
    expect(fautifs).toEqual([]);

    // Les réponses toutes faites de l'assistant aussi.
    const assistant = new Assistant(BASE, REGLAGES);
    for (const message of ["bonjour", "merci", "au revoir", "tu es un robot ?", "je veux parler à un humain", "azertyuiop"]) {
      expect(assistant.repondre(message).texte).not.toMatch(tutoiement);
    }
  });

  it("n'utilise pas d'emoji", () => {
    const emoji = /\p{Extended_Pictographic}/u;
    expect(BASE.faits.filter((f) => emoji.test(f.enonce)).map((f) => f.id)).toEqual([]);
  });

  it("ne cite jamais Lafitte", () => {
    const tout = JSON.stringify(BASE);
    expect(tout).not.toMatch(/lafitte/i);
  });
});
