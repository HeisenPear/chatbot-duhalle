// LA TOURNÉE DU 25 NOVEMBRE : les questions réelles des clients du 16 au 25 novembre (base D1) dont la réponse était à côté.
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

describe("les questions du 16 au 25 novembre", () => {
  it("traite un vinaigrier qui goutte comme une fuite, et non comme la newsletter (« à la lettre »)", () => {
    dit("Bonjour, suite a ma commande du vinaigrier en grès, je vous informe que je suis très déçue par le produit car j ai respecté le protocole à la lettre pour la mise en place du bouchon et celui ci goutte sans arrêt, quelque soit la position. Bonne journée", "etancheite-vinaigrier.definition", /gonfl/);
    expect(assistant.repondre("j'ai suivi la notice à la lettre").trace.concepts).not.toContain("newsletter");
    dit("comment s'inscrire à la lettre d'information ?", /^newsletter\./);
  });

  it("aide le client qui ne peut pas ajouter un article ou augmenter sa quantité dans le panier", () => {
    for (const question of [
      "pourquoi ne puis-je pas augmenter le nombre de bouchons du même type dans mon panier?",
      "Bonjour,je souhaiterais commander du carbure de calcium sur votre site mais je ne parviens pas à le mettre dans le panier (ref [référence])",
      "je n'arrive pas à passer commande avec l'ordinateur : j'ai essayé plein de choses , mais je n'y arrive toujours pas",
    ]) dit(question, /^panier-bloque\./, /stock disponible/, /autre navigateur/);
  });

  it("dit quoi faire d'un colis non retiré à temps", () => {
    dit("Je ne suis pas allé chercher mon colis assez vite, comment faire", /^colis-non-retire\./, /renvoyé à l'expéditeur/);
  });

  it("explique comment changer l'adresse e-mail du compte", () => {
    dit("Depuis la panne Microsoft , Je n' ai plus du tout accès à la boite mail que j' avais inscrite lors de l inscription ... comment la changer ?", /^changer-email\./, /Mon compte/);
  });

  it("lit « dans quel pays est-il fabriqué » comme l'origine, pas le paiement", () => {
    dit("Dans quel pays ce produit est-il fabriqué ?", /^origine-fabrication\./);
  });

  it("donne le bouchon percé qui tient le robinet du vinaigrier", () => {
    for (const question of ["Quel est le diamètre du bouchon livré avec le robinet", "quel diametre le bouchon du robinet", "le vinaigrier est fourni avec le bouchon ?"]) {
      dit(question, /^bouchon-du-robinet\./, /bouchon percé/, /32\/28/);
    }
  });

  it("répond sur l'envoi d'une commande précise sans prétendre la connaître", () => {
    for (const question of ["Quand ma commande va t elle être envoyée ?", "Quelle est la date de livraison prévue ?"]) dit(question, /^commande-en-attente\./, /pas accès aux commandes/);
    dit("Combien de temps pour expédier ma commande ?", /^delai-expedition\./);
  });

  it("dit que Colissimo est le service de La Poste", () => {
    dit("C quoi collisimo fr", "colissimo.definition", /La Poste/);
    // La livraison en général garde sa réponse.
    expect(assistant.repondre("Quel transporteur utilisez-vous ?").trace.faits[0]).toBe("livraison.definition");
  });

  it("donne les frais de port d'une dame-jeanne", () => {
    // La question réelle reprend mot pour mot une question du jeu de mesure : on la teste sous une autre forme.
    dit("combien coute le port pour 1 damejeanne de 15l pour le 06", "livraison.prix", /Geodis/);
  });

  it("répond sur le Black Friday", () => {
    dit("Faite vous des remises pour le black friday", /^black-friday\./, /code promo/);
  });

  it("dit que le tabouret est livré avec le vinaigrier, et pas vendu seul dans la base", () => {
    for (const question of ["vendez vous des tabourets de vinaigrier", "je viens de vous acheté 2 vinaigriers avec tabuoret j'aimerais avoir un tabouret seul"]) {
      dit(question, /^tabouret-vinaigrier\./, /livré \*\*avec\*\*/, /vendu seul/);
    }
  });

  it("donne les dimensions du panier de récolte vert", () => {
    for (const question of ["Dimensions du panier", "Dimensions du panier vert à legumes"]) dit(question, /^panier-recolte\./, /30,5 cm/, /24 cm/);
    // Le panier de la commande garde sa réponse.
    expect(assistant.repondre("comment valider mon panier ?").trace.faits[0]).not.toMatch(/^panier-recolte\./);
  });

  it("présente les dénoyauteurs et la gamme du Comptoir de la Conserve", () => {
    dit("Dénoyauteur prunes et mirabelles semi-automatique", /^denoyauteur\./, /ventouse/, /cerises/);
    dit("Le Comptoir de la Conserve", /^comptoir-conserve\./, /hachoirs/, /stérilisateurs/);
  });

  it("explique la différence entre la cire souple en 333 g et en 1 kg", () => {
    dit("Quelle et la différence avec le jaune en 1kg et jaune en 333gramme", /^format-cire\./, /même cire souple/, /quantité/);
  });

  it("choisit la grille du hachoir selon la recette", () => {
    for (const question of ["quelle diamètre de grille pour patéé de campagne", "quel diamètre pour la grille de hachoir ? Merci de la réponse"]) dit(question, /^choix-grille-hachoir\./, /8 ou 10 mm/);
    // « Grilles de hachoir » seul garde la présentation des grilles.
    dit("Grilles de hachoir", "grille-hachoir.definition");
  });

  it("ne confond pas le capuchon du barboteur avec les bouchons en liège", () => {
    dit("faut t'il garder le bouchon rouge du barboteur lors de sa mise en service", /^capuchon-barboteur\./, /gaz carbonique/, /hermétiquement/);
  });

  it("renvoie vers la brosse de rechange et le service client pour une pièce du lave-bouteille", () => {
    for (const question of ["j'ai cassé la partie en plastique du lave bouteille est-ce qu'on commandé séparémement?", "Bonjour est-ce qu'on peut trouver des piéces détachées d'un lave bouteille?"]) {
      dit(question, /^piece-lave-bouteille\./, /brosse en inox/, /photo/);
    }
  });

  it("parle des casiers à qui demande s'ils rangent d'autres formats que 75 cl", () => {
    dit("Peut on stocker tous les formats différents de 75cl", /^casier\./);
  });

  it("pose les capsules de surbouchage sur le vin, et les capsules couronne sur le cidre", () => {
    dit("Comment mettre vos capsules sur les bouteilles de vin", "surbouchage.procedure", /rétracte/);
    expect(assistant.repondre("comment mettre vos capsules sur mes bouteilles de cidre").trace.faits[0]).not.toBe("surbouchage.procedure");
  });

  it("explique la différence entre un vin de garde et un vin à garder quelques années", () => {
    dit("Différence entre vin de garde et a garder quelques annee", /^garde-quelques-annees\./, /catégorie 1/, /catégorie 3/);
  });
});
