// LA CORRECTION DES FAUTES DE FRAPPE, comparée à une version sans index.
//
// `corriger` ne regarde que les mots de même longueur (à une ou deux lettres près)
// qui partagent la première ou la dernière lettre. Ce test la compare, sur des
// milliers de fautes tirées au hasard, à la recherche exhaustive : mêmes corrections,
// à la lettre près.
import { describe, expect, it } from "vitest";
import { DetecteurDeConcepts } from "../src/moteur/concepts";
import { corriger, distanceEdition } from "../src/moteur/texte";
import { BASE } from "../src/savoir/index";

const vocabulaire = new DetecteurDeConcepts(BASE).vocabulaireDesAlias;

/** La même règle, sans index : le mot du vocabulaire le plus proche, à égalité le premier par ordre alphabétique. */
function correctionExhaustive(racine: string): string | undefined {
  if (vocabulaire.has(racine)) return racine;
  if (racine.length < 6 || /\d/.test(racine)) return undefined;
  const max = racine.length >= 9 ? 2 : 1;
  let meilleur: string | undefined;
  let meilleureDistance = max + 1;
  for (const candidat of [...vocabulaire].sort()) {
    if (Math.abs(candidat.length - racine.length) > max) continue;
    if (candidat[0] !== racine[0] && candidat[candidat.length - 1] !== racine[racine.length - 1]) continue;
    const d = distanceEdition(racine, candidat, max);
    if (d < meilleureDistance || (d === meilleureDistance && meilleur !== undefined && candidat < meilleur)) {
      meilleur = candidat;
      meilleureDistance = d;
    }
  }
  return meilleureDistance <= max ? meilleur : undefined;
}

function hasard(graine: number): () => number {
  let etat = graine;
  return () => {
    etat = (etat * 1664525 + 1013904223) % 4294967296;
    return etat / 4294967296;
  };
}

describe("corriger", () => {
  const alea = hasard(2026);
  const mots = [...vocabulaire].filter((m) => m.length >= 6);
  const lettres = "abcdefghijklmnopqrstuvwxyz";

  function faute(mot: string): string {
    const c = [...mot];
    for (let k = 0; k < 1 + Math.floor(alea() * 2); k++) {
      const i = Math.floor(alea() * (c.length - 1));
      const t = alea();
      if (t < 0.25) c.splice(i, 1);
      else if (t < 0.5) c.splice(i, 0, lettres[Math.floor(alea() * 26)]!);
      else if (t < 0.75) [c[i], c[i + 1]] = [c[i + 1]!, c[i]!];
      else c[i] = lettres[Math.floor(alea() * 26)]!;
    }
    return c.join("");
  }

  it("donne la même correction que la recherche exhaustive sur des fautes tirées au hasard", () => {
    expect(mots.length).toBeGreaterThan(300);
    const ecarts: string[] = [];
    for (let i = 0; i < 3000; i++) {
      const mot = faute(mots[Math.floor(alea() * mots.length)]!);
      const attendu = correctionExhaustive(mot);
      const obtenu = corriger(mot, vocabulaire);
      if (obtenu !== attendu) ecarts.push(`${mot} : ${String(obtenu)} au lieu de ${String(attendu)}`);
    }
    expect(ecarts).toEqual([]);
  });

  it("ne corrige pas un mot inventé", () => {
    for (let i = 0; i < 500; i++) {
      const mot = Array.from({ length: 7 + Math.floor(alea() * 5) }, () => lettres[Math.floor(alea() * 26)]).join("");
      expect(corriger(mot, vocabulaire), mot).toBe(correctionExhaustive(mot));
    }
  });
});
