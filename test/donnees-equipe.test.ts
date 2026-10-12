// CE QUE L'ÉQUIPE DUHALLÉ A CONFIRMÉ LE 12/10/2026 : délais, livraison hors France,
// seuils de livraison offerte, cotes de produits, numéro de téléphone.
// Chaque chiffre vient de l'équipe : un test échoue si une réponse le perd ou
// le déforme, et si l'ancien numéro de téléphone réapparaît.
import { describe, expect, it } from "vitest";
import { Assistant } from "../src/moteur/assistant";
import { EMAIL, REGLAGES, TELEPHONE } from "../src/savoir/coordonnees";
import { BASE } from "../src/savoir/index";

const assistant = new Assistant(BASE, REGLAGES);

const dit = (question: string, ...motifs: RegExp[]) => {
  const reponse = assistant.repondre(question);
  expect(reponse.nature, question).toBe("reponse");
  for (const motif of motifs) expect(reponse.texte, question).toMatch(motif);
};

describe("le délai de livraison", () => {
  it("est de 2 à 5 jours ouvrés, plus long en période de forte activité", () => {
    for (const question of [
      "delai de livraison pour ma commande",
      "quel est le délai de livraison ?",
      "Quel est le délai de livraison ?",
      "quel est le delai delivraison",
      "combien de temps pour être livré ?",
      "sous combien de temps je reçois ma commande ?",
      "dans combien de temps je serai livré",
    ]) {
      dit(question, /2 à 5 jours ouvrés/, /allongés/);
    }
  });

  it("figure aussi dans la réponse sur les livraisons express", () => {
    dit("livraison express", /2 à 5 jours ouvrés/);
  });
});

describe("la livraison en Belgique et en Suisse", () => {
  it("dépend des produits de la commande, et le service client prend le relais", () => {
    for (const question of [
      "livraison en belgique",
      "Livrez-vous en Belgique ?",
      "Pas de livraison à mon adresse en Belgique, que dois je faire ?",
      "quels sont les frais de port pour la Belgique ?",
      "Pour combien de matériel faut-il acheter pour avoir une livraison gratuite en Belgique ?",
    ]) {
      dit(question, /Belgique/, /dépend des \*\*produits\*\*/, new RegExp(TELEPHONE));
    }
  });

  it("ajoute des frais de douane pour la Suisse et envoie toujours vers le service client", () => {
    for (const question of ["Livraison en Suisse 3063", "livraison en Suisse", "livrez-vous en Suisse ?", "droits de douane suisse"]) {
      dit(question, /Suisse/, /frais de douane/, /systématiquement le service client/, new RegExp(TELEPHONE));
    }
    expect(assistant.repondre("frais de douane").texte).toMatch(/frais de douane/);
  });

  it("n'annonce jamais un prix ni un délai pour ces pays", () => {
    for (const question of ["livraison en belgique", "livraison en Suisse"]) {
      const { texte } = assistant.repondre(question);
      expect(texte, question).not.toMatch(/jours ouvrés|€/);
    }
  });
});

describe("la livraison offerte", () => {
  it("donne les trois seuils, et exclut les articles lourds et volumineux des deux premiers", () => {
    for (const question of ["À partir de quel montant la livraison est-elle offerte ?", "livraison gratuite ?", "à partir de combien la livraison est gratuite"]) {
      dit(question, /69 €/, /79 €/, /150 €/, /ni lourds ni volumineux/);
    }
    // Sans autre précision, « franco de port » donne la fourchette.
    dit("franco de port", /de \*\*69 €\*\* à \*\*150 €\*\*/);
  });

  it("exclut les pressoirs de la livraison offerte", () => {
    dit("À partir de quel montant la livraison est-elle offerte ?", /à l'exception des pressoirs/);
    for (const question of ["les pressoirs sont-ils livrés gratuitement ?", "livraison offerte pour un pressoir ?"]) {
      dit(question, /pressoirs.*exclus de la livraison offerte/);
    }
  });
});

describe("les cotes données par l'équipe", () => {
  it("mustimètre : de 0,98 à 1,30", () => {
    dit("quelle est l'échelle du mustimètre ?", /0,98 à 1,30/);
    dit("Quelle est la graduation d’un mustimètre", /0,98 à 1,30/);
  });

  it("éprouvette : 29 cm de hauteur", () => {
    dit("quel est la hauteur de l'éprouvette graduée 250Ml", /29 cm de hauteur/);
  });

  it("cuillère à confiture : 19 cm", () => {
    dit("Quelle est la longueur de la cuillère pour pot à confiture ?", /19 cm\*\* de long/);
    dit("Quelle est la longueur de la cuillère avec crochet ?", /19 cm\*\* de long/);
  });

  it("grilles de hachoir : de 6,8 à 7 cm, sans inventer le trou central", () => {
    dit("pouvez vous preciser le diametre ext de la grille et du trou central ?", /6,8 et 7 cm/, /trou central n'est pas indiqué/);
  });

  it("robinets de fût : petit 4,2 cm, grand 4,8 cm", () => {
    for (const question of ["QUEL EST LE DIAMETRE DU ROBINET POUR FUT ALIMENTAIRE DUHALE", "Quel est le diamètre du robinet code D5 pour fut plastique 50 L"]) {
      dit(question, /4,2 cm/, /4,8 cm/);
    }
  });

  it("robinets en bois : le diamètre est sur la fiche de chaque robinet", () => {
    dit("quel est le diamètre du robinet en bois ?", /fiche produit/);
  });
});

describe("le numéro de téléphone", () => {
  const ANCIEN = /05[ .]?62[ .]?11[ .]?73[ .]?09|\+?33[ .]?5[ .]?62[ .]?11[ .]?73[ .]?09/;

  it("est 02 47 53 00 26, et l'ancien numéro n'apparaît nulle part dans la base", () => {
    expect(TELEPHONE).toBe("02 47 53 00 26");
    expect(JSON.stringify(BASE)).not.toMatch(ANCIEN);
    expect(JSON.stringify(REGLAGES)).not.toMatch(ANCIEN);
  });

  it("n'apparaît dans aucune réponse de repli ni de contact", () => {
    for (const question of ["azertyuiop", "votre numéro de téléphone", "comment vous contacter", "tu nesers à rien", "english please"]) {
      const { texte } = assistant.repondre(question);
      expect(texte, question).not.toMatch(ANCIEN);
    }
    expect(assistant.repondre("votre numéro de téléphone").texte).toContain(TELEPHONE);
    expect(assistant.repondre("votre numéro de téléphone").texte).toContain(EMAIL);
  });
});
