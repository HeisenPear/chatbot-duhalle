// QUESTIONS RÉELLES DES CLIENTS ET LEURS VOISINES.
//
// Le chatbot enregistre, anonymisées, les questions qu'on lui pose (base D1
// « questions_chatbot »). Chaque lot relu est mis ici : d'abord les questions
// telles que les clients les ont écrites, puis des questions voisines
// (formulations proches, cas voisins) pour que la réponse vise plus large que
// la seule phrase vue. Le fait attendu est celui qui ouvre la réponse.
//
// Pour ajouter un lot : lisez les questions `a_revoir` de la base, corrigez la
// base de connaissances, vérifiez la réponse, puis recopiez la question ici.
import { describe, expect, it } from "vitest";
import { Assistant } from "../src/moteur/assistant";
import { REGLAGES } from "../src/savoir/coordonnees";
import { BASE } from "../src/savoir/index";

const assistant = new Assistant(BASE, REGLAGES);

/** [question, id du premier fait attendu] */
export const QUESTIONS_CLIENTS: Array<[string, string]> = [
  // Questions réelles de clients (base D1, 25 septembre au 2 octobre)
  ["Quels sont les frais de livraison ?", "livraison.prix"],
  ["Suivre ma commande", "suivi-commande.procedure"],
  ["Livraison", "livraison.definition"],
  ["suivi commande", "suivi-commande.procedure"],
  ["Bjr j'ai commandé un alcoomettre chez vous le 29 septembre,il est toujours en attente de préparation.sa fait un peu long quand vai je recevoir ce dernier merci", "commande-en-attente.moment"],
  ["Bonjour, il n'y a pas de lien fonctionnel pour suivre ma commande [référence]. J'ai reçu plusieurs messages pour des colis annoncés livrés au point relais, il m'a fallu 30 minutes pour m'y rendre mais aucun colis n'était disponible sur place. Avez-vous des informations ? Merci", "colis-introuvable.procedure"],
  ["quand le stock sera approvisionné ?", "disponibilite.condition"],
  ["Quand un produit en rupture sera t il de nouveau disponible ?", "disponibilite.condition"],
  ["Vendez vous des pièces détachées ?", "piece-rechange.gamme"],
  ["Bonjour, est ce que vous vendez au détail les poignées de vos futs alimentaire de macération 60L?", "piece-rechange.gamme"],
  ["Bonjour je recherche un bouchon en liège pour la bonbonne marie jeanne de 2 litres. Merci", "bonde+contenant.gamme"],
  ["Taille des bouchons", "taille-bouchon.dimension"],
  ["DEMANDE FACTURE", "facture.procedure"],
  ["facture", "facture.procedure"],
  ["comment avoir la facture de ma commande", "facture+commande.procedure"],
  ["Bonjour, j'ai passé une commande en juillet. J'ai été livré mais la facture n'est pas éditée. Pouvez-vous la créer svp ?", "facture+commande.procedure"],
  ["combien de temps pour la livraison ?", "livraison.duree"],
  ["Délai de livraison", "livraison.duree"],
  ["que se passe-t-il si il y a un probleme à la livraison (casse)", "produit-abime.procedure"],
  ["Bonjour, je viens de commander 4 Bouchons Liège Percés - forme Conique - 4 Tailles Différentes (Code: [numéro]) ... J'aurais voulu en même temps (j'ai oublié) vous commander les robinets en bois pour mon vinaigrier. Question, dois-je annuler la commande et refaire la même commande + les robinets (pour n'avoir comme frais d'envoi que 1 envoi au lieu de 2) ou comment faire", "modifier-commande+regrouper-commandes.procedure"],
  ["votre numéro de téléphone", "service-client.definition"],
  ["le robinet ne fonctionne pas", "robinet-vinaigrier.condition"],
  ["Dimension casier", "casier.dimension"],
  ["Je viens de passer une commande et je ne la vois pas ?,,", "confirmation-commande+commande.procedure"],
  ["Nettoyer un chauffe-cire", "nettoyage-chauffe-cire.procedure"],
  ["Comment faire son cidre ?", "cidre.procedure"],
  ["diametre du filetage", "filetage.dimension"],
  ["quel est le diametre di filetage", "filetage.dimension"],
  ["diametre du bouchon pour ce vinaigrier", "bouchon-vinaigrier.dimension"],
  ["je veux savoir combien de temps je peux conserver un vin avec des bouchons de longue garde ?", "vin-de-garde.duree"],
  ["Humidité de la cave", "hygrometrie.condition"],
  ["le trou de mon vinaigrier mesure 2(5 mm", "trou-bouchon+vinaigrier.dimension"],
  ["Bouchon de vinaigrier", "bouchon-vinaigrier.definition"],
  ["est ce que ce bouchon correspond à un trou de 25 mm", "trou-bouchon.dimension"],
  ["comment choisir son robinet de vinaigrier", "choix-robinet.choix"],
  ["Est ce que ce vinaigrier existe en noir", "vinaigrier+coloris.gamme"],
  // Suivi et colis
  ["Où est mon colis ?", "suivi-commande.procedure"],
  ["Mon colis n'est pas arrivé", "suivi-commande.procedure"],
  ["Mon colis est indiqué comme livré mais je ne l'ai pas reçu", "colis-introuvable.procedure"],
  ["Le suivi de mon colis ne fonctionne pas", "colis-introuvable.procedure"],
  ["Mon colis est perdu", "colis-introuvable.procedure"],
  ["Le livreur n'est pas passé", "colis-introuvable.procedure"],
  ["Mon colis est en retard", "suivi-commande.procedure"],
  ["Je n'ai pas reçu ma commande", "suivi-commande.procedure"],
  ["Ma commande est en préparation depuis 5 jours", "commande-en-attente.duree"],
  ["Ma commande n'a toujours pas été expédiée", "commande-en-attente.duree"],
  ["Combien de temps pour préparer ma commande ?", "commande-en-attente.duree"],
  // Livraison
  ["Livrez-vous en point relais ?", "point-relais.condition"],
  ["Peut-on se faire livrer en point relais ?", "point-relais.condition"],
  ["Quel transporteur utilisez-vous ?", "livraison.definition"],
  ["Livrez-vous en Belgique ?", "zone-livraison.condition"],
  ["La livraison est-elle gratuite ?", "livraison.prix"],
  ["Livraison express possible ?", "options-livraison.duree"],
  ["Livrez-vous le samedi ?", "options-livraison.duree"],
  // Commande et paiement
  ["Puis-je ajouter un produit à ma commande déjà passée ?", "modifier-commande.procedure"],
  ["J'ai oublié un article dans ma commande", "modifier-commande.procedure"],
  ["Je voudrais annuler ma commande", "modifier-commande.procedure"],
  ["Comment regrouper deux commandes ?", "regrouper-commandes.procedure"],
  ["J'ai passé commande hier, je n'ai rien reçu par mail", "confirmation-commande.procedure"],
  ["Je n'ai pas reçu de mail de confirmation", "confirmation-commande.procedure"],
  ["Mon paiement a été refusé", "paiement-refuse.procedure"],
  ["Ma carte est refusée", "paiement-refuse.procedure"],
  ["Impossible de payer ma commande", "paiement-refuse.erreur"],
  // Colis abîmé, incomplet
  ["J'ai reçu un produit cassé", "produit-abime.procedure"],
  ["Il manque un produit dans mon colis", "produit-abime.procedure"],
  ["J'ai reçu le mauvais produit", "produit-abime.procedure"],
  ["Ma commande est incomplète", "produit-abime+commande.procedure"],
  ["La bouteille est arrivée brisée", "produit-abime.procedure"],
  ["Le colis est arrivé ouvert", "produit-abime.procedure"],
  ["Que faire si le colis est abîmé ?", "produit-abime.procedure"],
  // Facture
  ["Où télécharger ma facture ?", "facture.procedure"],
  ["Je voudrais une facture avec TVA", "facture.procedure"],
  ["Facture pour mon entreprise", "facture.procedure"],
  ["Je n'ai pas reçu ma facture", "facture.procedure"],
  ["Pouvez-vous m'envoyer un duplicata de facture ?", "facture.procedure"],
  ["Justificatif de commande", "facture+commande.procedure"],
  ["Ma facture est incorrecte", "facture-incorrecte.procedure"],
  // Stock
  ["Y a-t-il du stock ?", "disponibilite.condition"],
  ["Date de réapprovisionnement", "disponibilite.condition"],
  ["Ce produit est indisponible, quand revient-il ?", "disponibilite.condition"],
  ["Quand sera-t-il de nouveau en stock ?", "disponibilite.condition"],
  // Pièces vendues à part
  ["Je cherche une poignée pour mon fût", "piece-rechange.gamme"],
  ["Le couvercle du fût est vendu séparément ?", "piece-rechange.gamme"],
  ["Puis-je acheter uniquement le robinet ?", "piece-rechange.procedure"],
  ["Puis-je acheter un robinet seul ?", "piece-rechange.procedure"],
  ["Pièces détachées capsuleuse", "piece-rechange.gamme"],
  // Vinaigrier
  ["Quel bouchon pour mon vinaigrier ?", "bouchon-vinaigrier.choix"],
  ["Mon vinaigrier a un trou de 30 mm, quel bouchon ?", "trou-bouchon+vinaigrier.dimension"],
  ["Comment remplacer le bouchon de mon vinaigrier ?", "bouchon-vinaigrier.procedure"],
  ["Le bouchon de mon vinaigrier est trop petit", "bouchon-vinaigrier.choix"],
  ["Mon robinet de vinaigrier coule trop lentement", "robinet-vinaigrier.condition"],
  ["Mon robinet est bloqué", "robinet-vinaigrier.condition"],
  ["Quelle taille de robinet pour vinaigrier ?", "choix-robinet.choix"],
  ["Quelles couleurs de vinaigrier ?", "vinaigrier.gamme"],
  ["Le vinaigrier existe en blanc ?", "vinaigrier+coloris.gamme"],
  ["Y a-t-il un vinaigrier noir ?", "vinaigrier+coloris.gamme"],
  ["Le trou de mon vinaigrier fait 28 mm", "trou-bouchon+vinaigrier.dimension"],
  ["Diamètre du trou du vinaigrier", "trou-bouchon+vinaigrier.dimension"],
  // Bondes, goulots, bonbonnes
  ["Quel bouchon pour une dame-jeanne de 5 litres ?", "bonde.choix"],
  ["Bonde pour bonbonne de 34 L", "bonde+contenant.gamme"],
  ["Bouchon pour bocal à col large", "bonde.definition"],
  ["Mon bidon a un col de 38 mm, quelle bonde ?", "trou-bouchon.dimension"],
  ["J'ai un goulot de 30 mm, quel bouchon ?", "trou-bouchon.dimension"],
  ["Quel bouchon pour une marie-jeanne ?", "bonde.choix"],
  ["Bouchon pour un trou de 20 mm", "trou-bouchon.dimension"],
  ["Quel bouchon pour un trou de 40 mm ?", "trou-bouchon.dimension"],
  // Fermentation, macération, distillation
  ["Puis-je faire fermenter du vin dans une dame-jeanne ?", "contenant.condition"],
  ["À quoi sert un barboteur ?", "barboteur.definition"],
  ["Combien de temps laisser le barboteur ?", "barboteur.duree"],
  ["Faut-il un barboteur pour faire du cidre ?", "cidre+barboteur.procedure"],
  ["Mon barboteur ne bulle plus", "barboteur-silencieux.definition"],
  ["Comment faire une liqueur de fruits ?", "maceration-fruits.procedure"],
  ["Je veux faire macérer des cerises dans de l'eau-de-vie", "maceration-fruits.procedure"],
  ["Je veux distiller", "distillation.gamme"],
  ["Vendez-vous des alambics ?", "distillation.gamme"],
  ["Comment faire de la gnôle ?", "distillation.condition"],
  ["Puis-je faire macérer des fruits dans une dame-jeanne ?", "maceration-fruits.procedure"],
  // Casiers et mesures
  ["Dimensions du casier 60 bouteilles", "casier.dimension"],
  ["Taille du casier 24 bouteilles", "casier.dimension"],
  ["Poids d'un casier", "poids-produit.dimension"],
  ["Quel est le filetage du robinet ?", "filetage.dimension"],
];

describe("les questions réelles des clients et leurs voisines", () => {
  for (const [question, attendu] of QUESTIONS_CLIENTS) {
    it(`« ${question.length > 90 ? `${question.slice(0, 87)}…` : question} » → ${attendu}`, () => {
      const reponse = assistant.repondre(question);
      expect(reponse.nature).toBe("reponse");
      expect(reponse.trace.faits[0]).toBe(attendu);
    });
  }
});

describe("la mise en garde sur la distillation", () => {
  const SCHNAPS =
    "Bonjour j’aimerai faire du schnaps à partir de raison et j’aimerai faire macérer les fruits dans du verre. Puis je utiliser des marie jeanne pour cela? En mettant le barboteur dessus (faut-il le laisser toute la durée de la macération)?";

  it("accompagne une réponse sur la macération quand le client parle de schnaps", () => {
    const reponse = assistant.repondre(SCHNAPS);
    expect(reponse.trace.faits[0]).toMatch(/^maceration-fruits\./);
    expect(reponse.trace.faits).toContain("distillation.condition");
    expect(reponse.texte).toMatch(/distillation à domicile est interdite sans autorisation/);
  });

  it("n'est dite qu'une fois quand la réponse parle déjà de distillation", () => {
    for (const question of ["Je veux distiller", "Vendez-vous des alambics ?", "Comment faire de la gnôle ?"]) {
      const reponse = assistant.repondre(question);
      expect(reponse.texte.match(/interdite/g) ?? [], question).toHaveLength(1);
    }
  });

  it("ne s'ajoute pas à une macération dans de l'alcool déjà acheté", () => {
    const reponse = assistant.repondre("Comment faire macérer des cerises dans de l'eau-de-vie ?");
    expect(reponse.texte).not.toMatch(/interdite/);
  });
});

describe("les réponses ne se répètent pas", () => {
  it("ne montre jamais deux fois le même énoncé", () => {
    for (const [question] of QUESTIONS_CLIENTS) {
      const paragraphes = assistant
        .repondre(question)
        .texte.split(/\n\s*\n/)
        .map((p) => p.trim())
        .filter((p) => p.length > 60);
      expect(new Set(paragraphes).size, question).toBe(paragraphes.length);
    }
  });
});
