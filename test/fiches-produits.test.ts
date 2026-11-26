// LES MESURES DES FICHES PRODUITS (26/11/2026) : une question sur cinq demande une mesure d'un article précis (bilan
// d'octobre-novembre). Les fiches, tirées du flux produits d'Oxatis, répondent quand la base n'a pas relevé cette mesure.
import { describe, expect, it } from "vitest";
import { Assistant } from "../src/moteur/assistant";
import { ficheDonneLaMesure, FichesProduits } from "../src/moteur/fiches";
import { normaliser } from "../src/moteur/texte";
import { REGLAGES } from "../src/savoir/coordonnees";
import { FICHES_PRODUITS } from "../src/savoir/fiches-produits";
import { BASE } from "../src/savoir/index";

const assistant = new Assistant(BASE, REGLAGES);
const fiches = new FichesProduits(FICHES_PRODUITS);

const fiche = (id: string) => {
  const f = FICHES_PRODUITS.find((x) => x.id === id);
  if (!f) throw new Error(`fiche absente : ${id}`);
  return f;
};

describe("le fichier des fiches", () => {
  it("contient le catalogue, sans les articles de démonstration, avec des liens vers la boutique", () => {
    expect(FICHES_PRODUITS.length).toBeGreaterThan(300);
    expect(FICHES_PRODUITS.filter((f) => f.mesures.length > 0).length).toBeGreaterThan(200);
    expect(new Set(FICHES_PRODUITS.map((f) => f.id)).size).toBe(FICHES_PRODUITS.length);
    for (const f of FICHES_PRODUITS) {
      expect(f.url, f.nom).toMatch(/^https:\/\/www\.duhalle-boutique\.fr\//);
      expect(f.nom, f.id).not.toMatch(/\[studio\]|ne pas supprimer/i);
      for (const ligne of f.mesures) expect(ligne, f.nom).toMatch(/\d/);
    }
  });

  it("répare les caractères perdus par l'export (accents, apostrophes, tirets)", () => {
    const vinaigrier = fiche("02140001");
    expect(vinaigrier.nom).toBe("Vinaigrier Vert Grès Naturel - 2,5l - Tabouret en Bois");
    expect(vinaigrier.mesures).toContain("Hauteur avec tabouret : 34,5cm");
    for (const f of FICHES_PRODUITS) for (const texte of [f.nom, ...f.mesures]) expect(texte).not.toMatch(/\p{L}\?\p{L}/u);
  });

  it("ne garde pas les lignes de prix ou de devis", () => {
    for (const f of FICHES_PRODUITS) for (const ligne of f.mesures) expect(ligne).not.toMatch(/devis|€/i);
  });
});

describe("reconnaître l'article cité", () => {
  it("reconnaît un article par les mots rares de son nom", () => {
    const r = fiches.reconnaitre("quelle hauteur pour le seau à glace de 12 litres ?");
    expect(r.certain).toBe(true);
    expect(r.articles[0]!.fiche.id).toBe("00300001");
  });

  it("à égalité, garde les articles de la même sorte, trois au plus", () => {
    const r = fiches.reconnaitre("les cotes de la dame-jeanne de 25 litres svp");
    expect(r.certain).toBe(false);
    expect(r.articles.map((a) => a.fiche.nom)).toEqual([expect.stringMatching(/^Dame-jeanne 25 L/), expect.stringMatching(/^Dame-jeanne 25 L/)]);
  });

  it("ne désigne aucun article quand la question en cite trop, ou des sortes différentes", () => {
    expect(fiches.reconnaitre("le robinet en bois fait quel diamètre ?").articles).toEqual([]);
  });

  it("ne prend pas un mot secondaire du nom pour l'article (« goulot » n'est pas l'étiquette de goulot)", () => {
    expect(fiches.reconnaitre("quel diamètre pour le goulot ?").articles).toEqual([]);
  });

  it("ne confond pas deux contenances (« 25 cl » n'est pas la bouteille de 75 cl)", () => {
    expect(fiches.reconnaitre("hauteur de mes bouteilles de 25 cl").articles).toEqual([]);
  });

  it("ne prend pas la destination pour l'article (« pour une bouteille »)", () => {
    expect(fiches.reconnaitre("quel diamètre de bouchon pour une bouteille de 75 cl").articles.map((a) => a.fiche.nom)).not.toContainEqual(expect.stringMatching(/^Bouteille/));
  });

  it("sait si la fiche donne la mesure demandée", () => {
    const eprouvette = fiche(FICHES_PRODUITS.find((f) => /^Éprouvette Graduée 250/.test(f.nom))!.id);
    expect(ficheDonneLaMesure(eprouvette, normaliser("quelle contenance"))).toBe(true);
    expect(ficheDonneLaMesure(eprouvette, normaliser("quelle hauteur"))).toBe(false);
    expect(ficheDonneLaMesure(eprouvette, normaliser("ses dimensions"))).toBe(true);
  });
});

describe("répondre avec les mesures de la fiche", () => {
  const repond = (question: string, id: string, ...motifs: RegExp[]) => {
    const r = assistant.repondre(question);
    expect(r.nature, question).toBe("reponse");
    expect(r.trace.faits, question).toEqual([`fiche:${id}`]);
    expect(r.liens[0]?.url, question).toBe(fiche(id).url);
    for (const m of motifs) expect(r.texte, question).toMatch(m);
    return r;
  };

  it("donne les cotes d'un article que la base ne connaît pas", () => {
    repond("Le seau à glace 12 litres mesure combien en hauteur ?", "00300001", /Hauteur : 24,3cm/, /D'après la fiche/);
    repond("quelle largeur fait le seau à champagne de 5,25 L", "00290001", /Largeur : 17,3cm/);
    repond("Quelles dimensions a la balance de cuisine du Comptoir ?", "53610001", /épaisseur 2 cm/);
  });

  it("préfère la fiche à un conseil général sur la sorte d'article", () => {
    repond("Les dimensions du vinaigrier en chêne de 3 litres ?", "03290001", /Hauteur 24cm/, /Diamètre bas 21cm/);
  });

  it("préfère la fiche à un fait qui avoue ne pas connaître la mesure", () => {
    repond("Hauteur de la dame-jeanne de 2 litres ?", "00620001", /Hauteur : 252mm/);
  });

  it("garde les mesures relevées par l'équipe quand la base les a", () => {
    expect(assistant.repondre("Quelle hauteur fait l'éprouvette graduée de 250 ml ?").texte).toMatch(/29 cm/);
    expect(assistant.repondre("quelle longueur pour la cuillère à confiture avec crochet").texte).toMatch(/19 cm/);
  });

  it("liste les articles à égalité avec leurs mesures", () => {
    const r = assistant.repondre("quelle hauteur pour une dame-jeanne de 25 litres ?");
    expect(r.trace.faits).toHaveLength(2);
    expect(r.texte).toMatch(/Plusieurs articles correspondent/);
    expect(r.texte).toMatch(/43,4 ?cm/);
  });

  it("ne cherche pas de mesure quand la question n'en demande pas", () => {
    for (const q of ["Vendez-vous des seaux à champagne de 12 litres ?", "Quel est le prix du seau à glace 12 litres ?", "Comment régler la hauteur de ma capsuleuse ?"]) {
      expect(assistant.repondre(q).trace.faits.some((f) => f.startsWith("fiche:")), q).toBe(false);
    }
  });
});
