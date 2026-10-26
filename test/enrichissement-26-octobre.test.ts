// L'ENRICHISSEMENT DU 26 OCTOBRE : des détails de fiches que la base ne portait pas encore.
// Les faits viennent de fiches du site (recherche sur duhalle-boutique.fr, 26/10/2026) : à faire valider.
// Chaque test vérifie un chiffre ou une limite que le client demande vraiment.
import { describe, expect, it } from "vitest";
import { Assistant } from "../src/moteur/assistant";
import { REGLAGES } from "../src/savoir/coordonnees";
import { BASE } from "../src/savoir/index";

const assistant = new Assistant(BASE, REGLAGES);

const dit = (question: string, ...motifs: RegExp[]) => {
  const reponse = assistant.repondre(question);
  expect(reponse.nature, question).toBe("reponse");
  for (const motif of motifs) expect(reponse.texte, question).toMatch(motif);
  return reponse;
};

describe("les dimensions des casiers", () => {
  it("donne les cotes de chaque famille de casiers", () => {
    dit("quelles sont les dimensions du casier 30 places ?", /30 places, 63 x 51 x 26 cm/);
    dit("dimensions casier 60 bouteilles", /60 places, 63 x 101 x 26 cm/);
    dit("quelle est la taille du casier 144 places ?", /126 x 120 x 26 cm/);
    dit("dimensions du casier chromé 72 places", /72 places, 59 x 124 x 26 cm/);
    dit("dimensions casier polystyrène 16 places", /44,5 x 44,5 x 26 cm/);
  });

  it("présente le lot de trois casiers en polystyrène", () => {
    dit("quels casiers proposez-vous ?", /lot de 3 casiers gris de 3 bouteilles/);
  });
});

describe("les accessoires de service du vin", () => {
  it("décrit le support BIB'UP pour Bag in Box, 3, 5 et 10 litres", () => {
    for (const question of ["Avez-vous un support pour bag in box ?", "bib up", "un support de cubi 10 litres"]) dit(question, /3, 5 et 10 litres/);
  });

  it("décrit le thermomètre à vin de 0 à 30 °C", () => {
    for (const question of ["thermomètre à vin", "avez-vous un thermomètre pour le vin ?"]) dit(question, /de \*\*0 à 30 °C\*\*/);
  });

  it("cite la pince à champagne et le tire-bouchon tonneau", () => {
    dit("pince à champagne", /pince à champagne en acier/);
    dit("quels tire-bouchons proposez-vous ?", /tire-bouchon tonneau/);
  });
});

describe("le soutirage et le nettoyage", () => {
  it("donne les caractéristiques de la soutireuse Easy Start et du kit tireuse", () => {
    dit("quel matériel de soutirage proposez-vous ?", /63 cm/, /65 °C/, /60 °C/, /entonnoir de cave/);
  });

  it("décrit l'entonnoir de cave de 37 cm", () => {
    for (const question of ["entonnoir de cave", "avez-vous un grand entonnoir ?"]) dit(question, /37 cm de diamètre/, /plastique alimentaire/);
  });

  it("dit que l'entonnoir à arrêt automatique ne convient pas aux bonbonnes ni aux bidons", () => {
    for (const question of ["l'entonnoir à arrêt automatique convient-il à une dame-jeanne ?", "entonnoir arrêt automatique pour bonbonne"]) {
      dit(question, /ne fonctionne pas avec les bonbonnes ni les bidons/, /entonnoir de cave/);
    }
  });

  it("donne la longueur des goupillons", () => {
    dit("quels goupillons proposez-vous ?", /47 cm/, /49 x 7 cm/);
  });
});

describe("l'œnologie et la cire", () => {
  it("décrit les pastilles Rénovyn sans en donner la dose", () => {
    for (const question of ["pastilles Rénovyn", "à quoi servent les pastilles renovyn ?", "avez-vous du métabisulfite en pastilles ?"]) {
      const reponse = dit(question, /20 pastilles de 10 g/, /métabisulfite de potassium/, /je ne la donne pas/);
      expect(reponse.texte, question).not.toMatch(/\d+ pastilles? par hectolitre/i);
    }
  });

  it("estime la cire par bouteille d'après une fiche, de 80 à 250 bouteilles par kilo", () => {
    for (const question of ["combien de bouteilles peut-on cacheter avec 1 kg de cire (Code: 8008S0001) ?", "combien de bouteilles avec 500 g de cire ?"]) {
      dit(question, /4 à 12 g de cire par bouteille/, /80 à 250 bouteilles par kilo/);
    }
  });
});

describe("les conserves et les bouteilles", () => {
  it("donne la capacité du stérilisateur : 14 bocaux de 500 g, de 40 à 100 °C", () => {
    dit("quelle est la capacité du stérilisateur ?", /14 bocaux de 500 g/, /40 à 100 °C/);
  });

  it("ne propose que des bouteilles de 75 cl, sans inventer d'autre contenance", () => {
    for (const question of ["avez-vous des bouteilles de 1 litre ?", "quelles bouteilles vides proposez-vous ?"]) {
      dit(question, /75 cl/, /pas trace d'autres contenances/);
    }
  });
});
