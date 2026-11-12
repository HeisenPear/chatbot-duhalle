// LA TOURNÉE DU 12 NOVEMBRE : questions réelles des clients (base D1, 26 octobre au 12 novembre) dont la réponse
// était à côté. Quand une cote est absente de la base, la réponse le dit et renvoie vers le service client.
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

describe("les questions du 26 octobre au 12 novembre", () => {
  it("ne prend pas la soude pour le soudage du carbure", () => {
    dit("Information sur la soude", /Je n'ai pas trouvé de \*\*soude\*\*/);
    dit("à quoi sert le carbure pour le soudage", /carbure de calcium/);
  });

  it("renvoie pour une fiche de sécurité, sans parler de paiement", () => {
    for (const q of ["Besoin de la fiche de securiter sur l'huile parrafine", "fiche de sécurité de l'huile de paraffine"]) {
      const r = dit(q, /fiche de sécurité/, /huile de paraffine/);
      expect(r.texte).not.toMatch(/carte bancaire/);
    }
  });

  it("répond à la newsletter, aux étiquettes et au pot à olives", () => {
    dit("inscription newletter", /newsletter/);
    dit("quelle taille font les étiquettes personnallisées ?", /100 x 75 mm/);
    dit("avez vous des étiquettes 120 x 70 mm", /100 x 75 mm/);
    dit("CONTENANCE DU Pot à Olives en Grès Émaillé - avec sa Cuillère et son Couvercle en Bois", /contenance/, /service client/);
  });

  it("dit ce qu'il ne sait pas : dame-jeanne, fumoir, pince à bocaux, brosse, robinet", () => {
    dit("Dimension de la dame Jeanne 25 l", /3,9 cm/, /diamètre du corps/);
    dit("est ce qu'il y a un thermostat au fumoir pour bien réguler la température?", /thermostat/);
    dit("longueur de la pince à bocaux", /n'est pas indiquée/);
    dit("pouvez vous me donner le diamètre de fixation de la brosse de rechange et le pas de vis", /pas de vis/, /47 cm/);
    dit("est il possible de mettre un robinet en inox?", /robinets en bois/);
    dit("Quelles sont les dimensions exactes du modèle : Robinet en bois pour vinaigrier – 2 pouces – embout Ø8 mm", /3 pouces/, /diamètre du trou/);
  });

  it("distingue l'expédition de la livraison", () => {
    for (const q of ["sous combien de temps sont expédiés les commandes?", "Je ne parle pas de la livraison mais de l’expédition"]) {
      dit(q, /délai de préparation/, /2 à 5 jours ouvrés/);
    }
  });

  it("traite une livraison impossible, une remise et des capsules twist-off", () => {
    for (const q of ["On me dit que la livraison n'est pas possible pour mon adresse ?", "livraison impossible en drôme"]) dit(q, /impossible pour votre adresse/);
    for (const q of ["Réduction avec grosse commande?", "Ou apparaissent les 10% de remise"]) dit(q, /remise liée au montant/, /panier/);
    dit("Recherche capsules twist off 48mm", /twist-off de 48 mm/, /70 mm/);
  });
});
