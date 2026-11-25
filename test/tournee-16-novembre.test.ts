// LA TOURNÉE DU 16 NOVEMBRE : les questions réelles des clients du 12 au 16 novembre (base D1) dont la réponse était à côté.
import { describe, expect, it } from "vitest";
import { Assistant } from "../src/moteur/assistant";
import { REGLAGES } from "../src/savoir/coordonnees";
import { BASE } from "../src/savoir/index";

const assistant = new Assistant(BASE, REGLAGES);

const dit = (question: string, premierFait: string | RegExp, ...motifs: RegExp[]) => {
  const reponse = assistant.repondre(question);
  expect(reponse.nature, question).toBe("reponse");
  if (typeof premierFait === "string") expect(reponse.trace.faits[0], question).toBe(premierFait);
  else expect(reponse.trace.faits[0], question).toMatch(premierFait);
  for (const motif of motifs) expect(reponse.texte, question).toMatch(motif);
};

describe("les questions du 12 au 16 novembre", () => {
  it("dit que la boutique est en ligne à qui demande où elle se situe", () => {
    for (const question of ["Ou se situe votre boutique?", "Quelle est votre localisation en France?", "Où êtes-vous ?"]) dit(question, /^magasin\./, /boutique en ligne/);
  });

  it("donne l'adresse de la boutique de la Bouchonnerie Jocondienne, dont Duhallé fait partie", () => {
    for (const question of ["Ou se situe votre boutique?", "Quelle est votre adresse ?", "Y a t'il des magasins sur paris?", "Où est la boutique de la Jocondienne ?"]) {
      dit(question, /^magasin\./, /Bouchonnerie Jocondienne/, /7B rue des Artisans, 37300 Joué-lès-Tours/, /02 47 87 53 44/, /lundi au vendredi de 9h à 12h et de 14h à 18h, fermée le samedi et le dimanche/);
    }
    expect(assistant.repondre("Où est la boutique de la Jocondienne ?").texte).toMatch(/définira avec vous les possibilités/);
  });

  it("donne les horaires de la boutique, et ceux du service client quand on demande si vous êtes ouverts", () => {
    dit("Quels sont les horaires de la boutique ?", /^magasin\./, /lundi au vendredi de 9h à 12h et de 14h à 18h/, /fermée le samedi et le dimanche/);
    const reponse = assistant.repondre("Êtes-vous ouvert le samedi ?");
    expect(reponse.trace.faits[0]).toBe("service-client.definition");
    expect(reponse.texte).toMatch(/lundi au jeudi/);
    expect(reponse.texte).toMatch(/fermée le samedi et le dimanche/);
  });

  it("traite une commande arrivée cassée comme un produit abîmé", () => {
    for (const question of ["Commande arrivée cassée", "ma commande est arrivée abîmée"]) dit(question, "produit-abime.procedure", /photos/);
  });

  it("dit que les robinets de vinaigrier font 2 ou 3 pouces, pas 4", () => {
    dit("Robinet 4 pouces", "robinet-4-pouces.definition", /2 pouces/, /3 pouces/, /4 pouces/);
  });

  it("ne cite pas de bouteille champenoise dans la gamme connue", () => {
    for (const question of ["vendez vous de sbouteilles champenoises", "avez-vous des bouteilles champenoises vides ?"]) dit(question, "bouteille-champenoise.gamme", /bouteilles de vin de 75 cl/, /pas de \*\*bouteille champenoise\*\*/);
  });

  it("ferme une bouteille de bière avec une capsule couronne", () => {
    dit("quel bouchon pour une bouteille de biere", "canette.choix", /capsules couronne de 26 mm/);
    // Le banc garde « capsules pour bouteilles de bière » sur les capsules couronne.
    expect(assistant.repondre("capsules pour bouteilles de bière").trace.faits[0]).toBe("capsule-couronne.dimension");
  });

  it("dit que les dames-jeannes sont en verre transparent légèrement bleuté, pas opaque", () => {
    dit("Je cherche une dame Jeanne verre opaque", "verre-opaque.definition", /verre transparent légèrement bleuté/, /pas opaques/);
    expect(assistant.repondre("quelles dames-jeannes vendez-vous ?").texte).toMatch(/légèrement bleuté/);
  });

  it("choisit la bonde d'une carafe d'après le diamètre du col", () => {
    for (const question of ["Quel bouchon pour une carafe de 3,5 de diamètre", "bouchon pour carafe"]) dit(question, /^bouchon-carafe\./, /35\/31 mm/, /38\/34 mm/);
  });

  it("lit « quelleest » comme « quelle est », et la largeur d'une grille comme une dimension", () => {
    dit("QUELLEEST LA LARGEUR DE LA GRILLE", "grille-hachoir.dimension");
    dit("quelle est la largeur de la grille", "grille-hachoir.dimension");
    expect(assistant.repondre("quelle est la profondeur du casier").trace.type).toBe("valeur");
  });
});
