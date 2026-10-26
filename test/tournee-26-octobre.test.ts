// LA TOURNÉE DU 26 OCTOBRE : les questions réelles des clients du 20 au 26 octobre (base D1) dont la réponse était à côté.
// Les faits tirés des fiches du site (26/10/2026) sont à faire valider par Duhallé (voir README).
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

describe("les questions de commande et de paiement", () => {
  it("reconnaît un bouton de paiement qui ne répond pas", () => {
    for (const question of [
      "JE VEUX PAYER PAR CARTE BANCAIRE MAIS LORSQUE JE CLIQUE SUR CARTE BANCAIRE, rien ne se passe",
      "Y A T'IL UN MINIMUM DE COMMANDE, lorsque je clique sur payer par CB, rien ne se passe",
      "Quand je clique sur valider mon panier, rien ne se passe",
    ]) {
      dit(question, /paiement est refusé ou ne se valide pas/, /rechargez la page/);
    }
  });

  it("ne prend pas « rien ne se passe » pour un problème de paiement quand le client parle d'autre chose", () => {
    const reponse = assistant.repondre("ma fermentation a commencé hier mais rien ne se passe dans le barboteur");
    expect(reponse.texte).not.toMatch(/paiement/);
  });

  it("explique une commande qui ne bouge pas", () => {
    for (const question of ["pourquoi ma commande ne bouge pas", "Ma commande n'avance plus depuis trois jours"]) {
      dit(question, /Je n'ai pas accès aux commandes/, /2 à 5 jours ouvrés/);
    }
  });

  it("répond aux frais de transport avant la commande par les frais de port", () => {
    for (const question of [
      "J’aimerais savoir combien me coûte le transport avant de passer commande. Mon panier est déjà fait",
      "Combien coûte la livraison de ma commande ?",
    ]) {
      dit(question, /69 €/, /calculés dans votre panier/);
    }
  });

  it("répond à la boutique de Mulhouse : la boutique est en ligne", () => {
    for (const question of ["Dans quelle boutique vous trouvez a mulhouse", "Avez-vous un magasin près de chez moi ?"]) {
      dit(question, /boutique en ligne/, /retrait sur place/);
    }
  });
});

describe("ce qui est livré avec le produit", () => {
  it("confirme que le robinet est fourni avec le vinaigrier", () => {
    for (const question of ["Le robinet est bien fourni", "Le robinet est-il bien livré avec le vinaigrier ?"]) dit(question, /livrés avec leur \*\*robinet en bois\*\*/);
  });

  it("dit que les bouteilles vides sont vendues sans bouchon", () => {
    for (const question of ["le bouchon est il inclu avec les bouteilles ?", "Les bouteilles sont-elles vendues avec un bouchon ?"]) {
      dit(question, /bouteilles vides\*\* Duhallé sont vendues \*\*sans bouchon ni capsule/, /vinaigriers en grès\*\* sont livrés avec leur \*\*bouchon en liège/);
    }
  });

  it("répond au bouchon à tête plastique décrit avec les mots du client", () => {
    const reponse = dit("Ou bon liège avec tête fixée dans un rond plastiquep", /tête plastique/);
    expect(reponse.trace.faits[0]).toBe("bouchon-tete.definition");
  });
});

describe("les canettes de bière", () => {
  it("propose la capsule couronne de 26 mm et la capsuleuse, et prévient pour les vraies canettes en aluminium", () => {
    dit("Peux-t-on boucher des canettes de bière de 33 cl ?", /capsules couronne de 26 mm/, /capsuleuses manuelles Duhallé acceptent les capsules de \*\*26 et 29 mm/, /vraies canettes \*\*en aluminium/);
  });
});

describe("les fûts de macération bleus", () => {
  it("connaît le fût bleu de 60 litres", () => {
    for (const question of ["Bleu 60 litres", "Quelles tailles de fûts de macération avez-vous ?"]) dit(question, /30, 60, 120 et 220 L/, /62 cm de haut/);
  });

  it("donne le diamètre du joint de chaque fût", () => {
    dit("Quel est le diamètre du joint de fut de 60l", /\*\*300 mm\*\* pour le \*\*60 L\*\*/, /235 mm/, /400 mm/, /600 mm/);
  });

  it("ne confond pas le joint d'un fût avec celui d'un bocal", () => {
    const reponse = assistant.repondre("Quel est le diamètre du joint de fut de 60l");
    expect(reponse.texte).not.toMatch(/bocaux/);
  });

  it("dit qu'un fût de 150 litres n'existe pas au catalogue et donne la gamme", () => {
    for (const question of ["VENDEZ VOUS DES FUTS DE 150l", "Avez-vous un fût de 200 litres ?"]) {
      dit(question, /pas de fût de cette contenance/, /5 à 100 L/, /30, 60, 120 et 220 L/);
    }
  });

  it("garde la gamme pour une contenance qui existe", () => {
    const reponse = assistant.repondre("Avez-vous un fût de 120 litres ?");
    expect(reponse.texte).not.toMatch(/pas de fût de cette contenance/);
  });
});

describe("les densimètres", () => {
  it("distingue le mustimètre pour le vin et le pèse-cidre pour le cidre", () => {
    dit("un densimètre peut il servir pour le cidre et pour le vin ?", /mustimètre\*\*.*0,98 à 1,30/, /pèse-cidre\*\*/);
  });

  it("décrit le pèse-cidre sans donner de seuil de mise en bouteille", () => {
    const reponse = dit("Quelle est l'échelle du pèse-cidre ?", /1002 à 1018/, /0 à 13 %/);
    expect(reponse.texte).toMatch(/je ne donne pas de seuil chiffré/);
    dit("Quel densimètre pour mon cidre ?", /pèse-cidre/);
  });
});

describe("l'empilage des casiers", () => {
  it("dit quels casiers sont empilables", () => {
    for (const question of ["combien de casier peut-on empiler en hauteur ?", "Les casiers en polystyrène sont-ils empilables ?", "Peut-on superposer deux casiers chromés ?"]) {
      dit(question, /polystyrène\*\* \(12 places/, /96 places au maximum/, /8 caisses/);
    }
  });

  it("ne prend pas les bocaux du stérilisateur pour des casiers", () => {
    const reponse = assistant.repondre("peut-on empiler les bocaux dans le stérilisateur ?");
    expect(reponse.trace.faits[0]).toBe("empilage-bocaux.condition");
  });
});

describe("les frais de retour", () => {
  it("dit que les frais de retour sont à la charge du client en cas de rétractation", () => {
    for (const question of [
      "en cas de retour dans les 14 jours des frais sont ils appliques ? qui prend les frais de retour en charge?",
      "si le produit ne convient pas quelles sont les modalites de retour",
      "Qui paie les frais de retour ?",
    ]) {
      dit(question, /frais de retour sont à la charge du client/, /14 jours/);
    }
  });

  it("ne présente pas un produit abîmé comme une rétractation à la charge du client", () => {
    const reponse = assistant.repondre("Mon colis est arrivé cassé, qui paie le retour ?");
    expect(reponse.texte).not.toMatch(/à la charge du client/);
  });
});
