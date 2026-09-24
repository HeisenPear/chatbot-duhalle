// Des messages piégés ne doivent ni ralentir le Worker ni changer les corrections.
import { describe, expect, it } from "vitest";
import { Assistant } from "../src/moteur/assistant";
import { corriger, distanceEdition } from "../src/moteur/texte";
import { REGLAGES } from "../src/savoir/coordonnees";
import { BASE } from "../src/savoir/index";

const assistant = new Assistant(BASE, REGLAGES);

/** Générateur pseudo-aléatoire reproductible. */
function hasard(graine: number) {
  let x = graine;
  return () => {
    x = (x * 1103515245 + 12345) % 2147483648;
    return x / 2147483648;
  };
}

/** La correction d'origine, sans index ni filtre : la référence. */
function corrigerReference(racine: string, vocabulaire: ReadonlySet<string>): string | undefined {
  if (vocabulaire.has(racine)) return racine;
  if (racine.length < 6 || /\d/.test(racine)) return undefined;
  const max = racine.length >= 9 ? 2 : 1;
  let meilleur: string | undefined;
  let meilleureDistance = max + 1;
  for (const candidat of vocabulaire) {
    const d = distanceEdition(racine, candidat, max);
    if (d < meilleureDistance || (d === meilleureDistance && meilleur !== undefined && candidat < meilleur)) {
      meilleur = candidat;
      meilleureDistance = d;
    }
  }
  return meilleureDistance <= max ? meilleur : undefined;
}

describe("correction des fautes de frappe", () => {
  it("donne exactement les corrections de l'algorithme de référence", () => {
    const vocabulaire = new Set(["bouchon", "bouchage", "capsule", "capsuleuse", "vinaigre", "vinaigrier", "trempage", "fermentation", "bouteille", "tirebouchon", "pressoir"]);
    const alea = hasard(7);
    const mots = [...vocabulaire].flatMap((mot) =>
      Array.from({ length: 30 }, () => {
        const lettres = mot.split("");
        const i = Math.floor(alea() * lettres.length);
        const operation = Math.floor(alea() * 4);
        const lettre = "abcdeilnoprstu"[Math.floor(alea() * 14)]!;
        if (operation === 0) lettres.splice(i, 1);
        else if (operation === 1) lettres.splice(i, 0, lettre);
        else if (operation === 2) lettres[i] = lettre;
        else if (i + 1 < lettres.length) [lettres[i], lettres[i + 1]] = [lettres[i + 1]!, lettres[i]!];
        return lettres.join("");
      }),
    );
    for (const mot of [...mots, "zzzzzzzz", "bouchonnage", "capsuleuze"]) {
      expect(corriger(mot, vocabulaire), mot).toBe(corrigerReference(mot, vocabulaire));
    }
  });

  it("calcule la même distance d'édition sur des mots au hasard", () => {
    const alea = hasard(3);
    const mot = () => Array.from({ length: 3 + Math.floor(alea() * 8) }, () => "abcde"[Math.floor(alea() * 5)]).join("");
    const reference = (a: string, b: string) => {
      const d = Array.from({ length: a.length + 1 }, (_, i) => Array.from({ length: b.length + 1 }, (_, j) => (i === 0 ? j : j === 0 ? i : 0)));
      for (let i = 1; i <= a.length; i++) {
        for (let j = 1; j <= b.length; j++) {
          d[i]![j] = Math.min(d[i - 1]![j]! + 1, d[i]![j - 1]! + 1, d[i - 1]![j - 1]! + (a[i - 1] === b[j - 1] ? 0 : 1));
          if (i > 1 && j > 1 && a[i - 1] === b[j - 2] && a[i - 2] === b[j - 1]) d[i]![j] = Math.min(d[i]![j]!, d[i - 2]![j - 2]! + 1);
        }
      }
      return d[a.length]![b.length]!;
    };
    for (let n = 0; n < 500; n++) {
      const a = mot();
      const b = mot();
      const vraie = reference(a, b);
      // Exacte jusqu'au seuil ; au-delà, seulement « plus grande que le seuil ».
      for (const max of [1, 2, 3]) {
        const d = distanceEdition(a, b, max);
        if (vraie <= max) expect(d, `${a}/${b}/${max}`).toBe(vraie);
        else expect(d, `${a}/${b}/${max}`).toBeGreaterThan(max);
      }
    }
  });
});

describe("messages piégés", () => {
  const alea = hasard(11);
  const motInvente = () => Array.from({ length: 7 + Math.floor(alea() * 5) }, () => "abcdefghijklmnopqrstuvwxyz"[Math.floor(alea() * 26)]).join("");
  const PIEGES: Record<string, () => string> = {
    "des mots inventés": () => Array.from({ length: 70 }, motInvente).join(" "),
    "tous les produits d'un coup": () =>
      Array.from({ length: 90 }, () => ["bouchon", "cire", "cidre", "vinaigre", "capsule", "bouteille", "pressoir", "bocal"][Math.floor(alea() * 8)]).join(" "),
    "des formats en rafale": () => Array.from({ length: 90 }, () => `${Math.floor(alea() * 99)}x${Math.floor(alea() * 99)}`).join(" "),
    "des négations en rafale": () => "ne pas sans ".repeat(60),
  };

  for (const [nom, fabriquer] of Object.entries(PIEGES)) {
    it(`répond vite à ${nom}`, () => {
      let pire = 0;
      for (let i = 0; i < 20; i++) {
        const message = fabriquer().slice(0, 500);
        const debut = performance.now();
        const reponse = assistant.repondre(message);
        pire = Math.max(pire, performance.now() - debut);
        expect(reponse.texte.length).toBeGreaterThan(0);
      }
      // Cloudflare coupe à 10 ms de calcul sur l'offre gratuite ; ici, marge large
      // pour une machine de test lente. Avant le correctif, on dépassait 50 ms.
      expect(pire).toBeLessThan(40);
    });
  }
});
