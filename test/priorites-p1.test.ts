// Les 84 questions P1 issues de l'étude éditoriale Duhallé du 25/09/2026.
// Ce banc protège les intentions prioritaires : plusieurs faits peuvent être
// acceptables, mais la réponse doit contenir une connaissance pertinente.
import { describe, expect, it } from "vitest";
import { Assistant } from "../src/moteur/assistant";
import { REGLAGES } from "../src/savoir/coordonnees";
import { BASE } from "../src/savoir/index";

const assistant = new Assistant(BASE, REGLAGES);

type CasP1 = [rang: number, question: string, faitsAcceptables: string[]];

const QUESTIONS_P1: CasP1[] = [
  [1, "Quel bouchon choisir selon le nombre d’années de garde prévu ?", ["bouchon.choix", "bouchon+vin-de-garde.choix", "bouchon-liege.duree"]],
  [2, "Quelle boucheuse choisir pour des bouchons de 38 ou 45 mm ?", ["boucheuse+taille-bouchon.choix", "boucheuse.choix"]],
  [3, "Quand mettre le vin en bouteille ?", ["mise-en-bouteille.moment"]],
  [4, "Comment nettoyer des bouteilles de vin déjà utilisées ?", ["nettoyage-bouteilles.procedure", "bouteille.condition"]],
  [5, "Quelle est la bonne température pour conserver le vin ?", ["cave.condition"]],
  [6, "Quelles pommes choisir pour faire du cidre ?", ["pomme.choix"]],
  [7, "Comment démarrer un vinaigre maison ?", ["vinaigre.procedure"]],
  [8, "Quelle différence entre cire dure et cire souple ?", ["cire-dure+cire-souple.choix"]],
  [9, "Quelle différence entre pasteurisation et stérilisation des conserves ?", ["traitement-thermique-conserve.choix", "conserve.condition"]],
  [10, "Comment savoir si une confiture est assez cuite ?", ["prise-confiture.procedure", "confiture.procedure"]],
  [11, "Ce bouchon est-il compatible avec ma bouteille ?", ["bouchon+bouteille.condition", "taille-bouchon.dimension"]],
  [12, "Combien d’années peut-on garder un vin avec un bouchon naturel 45 × 24 mm ?", ["bouchon-naturel.duree", "bouchon-liege.duree"]],
  [13, "Une boucheuse sur pied est-elle nécessaire pour 100 bouteilles ?", ["boucheuse-machoires.condition", "boucheuse.choix"]],
  [14, "Quel niveau de remplissage laisser sous le bouchon ?", ["niveau-remplissage.dimension"]],
  [15, "Quelle différence entre nettoyer, désinfecter et stériliser ?", ["hygiene-materiel.choix"]],
  [16, "Quel taux d’humidité faut-il dans une cave à vin ?", ["hygrometrie.condition"]],
  [17, "Faut-il laver les pommes avant de les broyer ?", ["pomme.condition"]],
  [18, "Combien de temps faut-il pour faire du vinaigre ?", ["vinaigre.duree"]],
  [19, "À quelle température faire fondre la cire à bouteille ?", ["chauffe-cire.dimension", "cire.procedure"]],
  [20, "Quels aliments peuvent être traités au bain-marie ?", ["bain-marie-conserve.condition"]],
  [21, "Pourquoi ma confiture ne prend-elle pas ?", ["prise-confiture.raison", "prise-confiture.procedure"]],
  [22, "Cette capsuleuse accepte-t-elle les capsules de 26 et 29 mm ?", ["capsuleuse.condition", "capsule-couronne.dimension"]],
  [23, "Combien d’années peut-on garder un vin avec un bouchon colmaté 45 × 24 mm ?", ["bouchon-colmate.duree", "bouchon-liege.duree"]],
  [24, "Comment régler la profondeur d’enfoncement du bouchon ?", ["boucheuse.procedure", "controle-bouchage.procedure"]],
  [25, "Comment soutirer sans oxyder le vin ?", ["soutirage.procedure"]],
  [26, "Comment enlever un dépôt sec au fond d’une bouteille ?", ["depot-sec-bouteille.procedure", "nettoyage-bouteilles.procedure"]],
  [27, "Faut-il conserver les bouteilles couchées ou debout ?", ["position-bouteilles.entretien", "position-bouteilles.choix", "cave.condition", "repos-bouchage.duree"]],
  [28, "Faut-il broyer les pommes avant de les presser ?", ["broyeur.raison"]],
  [29, "Quelle température convient à la fabrication du vinaigre ?", ["vinaigre.procedure", "vinaigre.duree"]],
  [30, "Comment cirer le goulot d’une bouteille proprement ?", ["cire.procedure"]],
  [31, "Pourquoi les légumes et viandes demandent-ils un procédé sous pression ?", ["aliment-peu-acide.raison"]],
  [32, "Comment conserver du jus de pomme maison ?", ["jus.usage", "jus.entretien"]],
  [33, "Quelle quantité commander pour mon nombre de bouteilles ?", ["quantite-commande.dimension"]],
  [34, "Quelle durée de garde pour un bouchon colmaté 38 × 24 mm catégorie 3 ?", ["bouchon-colmate.duree", "categorie-bouchon.duree"]],
  [35, "Pourquoi la boucheuse marque ou déchire les bouchons ?", ["boucheuse.erreur"]],
  [36, "Comment amorcer un siphon sans aspirer à la bouche ?", ["soutirage.procedure"]],
  [37, "Comment savoir si une bouteille récupérée est réutilisable ?", ["bouteille.condition"]],
  [38, "La lumière abîme-t-elle le vin ?", ["cave.condition"]],
  [39, "Quel pressoir choisir selon la quantité de pommes ?", ["pressoir.choix"]],
  [40, "Faut-il fermer hermétiquement un vinaigrier ?", ["vinaigrier.condition"]],
  [41, "Combien de bouteilles peut-on cirer avec 1 kg de cire ?", ["rendement-cire.dimension", "cire.dimension"]],
  [42, "Comment éviter le botulisme dans les conserves maison ?", ["conserve.condition"]],
  [43, "Quel matériel minimum faut-il pour commencer ?", ["materiel-depart.gamme"]],
  [44, "Quelle durée de garde pour un bouchon 38 × 24 mm catégorie 4 ?", ["categorie-bouchon.duree", "bouchon-liege.duree"]],
  [45, "Pourquoi le bouchon reste-t-il coincé dans la boucheuse ?", ["boucheuse.erreur"]],
  [46, "Quel tuyau alimentaire choisir pour le vin ?", ["tuyau-alimentaire.choix"]],
  [47, "Quel produit utiliser pour laver les bouteilles sans laisser d’odeur ?", ["produit-nettoyage-bouteilles.choix"]],
  [48, "Les vibrations nuisent-elles au vieillissement du vin ?", ["cave.condition"]],
  [49, "Quel rendement de jus attendre de 10 kg de pommes ?", ["rendement-jus.dimension"]],
  [50, "Comment éviter les moucherons dans un vinaigrier ?", ["moucherons-vinaigrier.condition"]],
  [51, "Combien de temps stériliser un bocal ?", ["bareme-conserve.duree"]],
  [52, "Quelle durée de garde pour un bouchon 38 × 24 mm catégorie 5 ?", ["categorie-bouchon.duree", "bouchon-liege.duree"]],
  [53, "Peut-on boucher seul ou faut-il être deux ?", ["boucheuse.condition"]],
  [54, "Faut-il filtrer le vin avant la mise en bouteille ?", ["filtre-vin.usage"]],
  [55, "Faut-il rincer après un produit désinfectant ?", ["produit-nettoyage-bouteilles.condition"]],
  [56, "Comment ranger une cave pour retrouver facilement les bouteilles ?", ["cave.procedure"]],
  [57, "Comment savoir quand la fermentation du cidre est terminée ?", ["fermentation-cidre.moment"]],
  [58, "À quelle température stériliser des conserves ?", ["bareme-conserve.dimension"]],
  [59, "Quelle durée de garde pour un bouchon 38 × 24 mm catégorie 6 ?", ["categorie-bouchon.duree", "bouchon-liege.duree"]],
  [60, "Combien de temps attendre avant de coucher une bouteille bouchée ?", ["repos-bouchage.duree"]],
  [61, "Pourquoi du dépôt apparaît-il après la mise en bouteille ?", ["depot-bouteille.raison"]],
  [62, "Combien de temps se garde une bouteille ouverte ?", ["bouteille-ouverte.duree"]],
  [63, "À quelle densité mettre le cidre en bouteille ?", ["fermentation-cidre.dimension", "cidre+mise-en-bouteille.moment"]],
  [64, "Comment savoir si un bocal est bien fermé ?", ["conserve.condition", "bocal.condition"]],
  [65, "Quelle différence entre un bouchon naturel et un bouchon colmaté ?", ["bouchon-naturel+bouchon-colmate.choix"]],
  [66, "Comment vérifier qu’une bouteille est correctement bouchée ?", ["controle-bouchage.procedure"]],
  [67, "Comment éviter une reprise de fermentation en bouteille ?", ["refermentation-bouteille.condition", "mise-en-bouteille.condition"]],
  [68, "À quelle température servir un vin rouge, blanc ou effervescent ?", ["temperature-service.dimension"]],
  [69, "Comment éviter que les bouteilles de cidre explosent ?", ["cidre.condition", "bouteille-champenoise.condition"]],
  [70, "Peut-on réutiliser les joints en caoutchouc ?", ["bocal.condition"]],
  [71, "Faut-il choisir un bouchon de 38 mm ou de 45 mm ?", ["taille-bouchon.dimension", "taille-bouchon.raison"]],
  [72, "Combien de bouteilles de 75 cl remplit-on avec 10, 20 ou 50 litres ?", ["rendement-bouteilles.dimension"]],
  [73, "Quel bouchon choisir pour une bouteille de cidre ?", ["bouchage+cidre.choix", "bouteille+cidre.choix"]],
  [74, "Faut-il stériliser les bocaux vides avant remplissage ?", ["preparation-bocaux.condition"]],
  [75, "Quel diamètre de bouchon faut-il pour une bouteille de vin standard ?", ["taille-bouchon.dimension"]],
  [76, "Capsule 26 mm ou 29 mm : comment choisir ?", ["capsule-couronne.dimension"]],
  [77, "Que faire d’un bocal bombé, fuyant ou qui sent mauvais ?", ["bocal-suspect.condition"]],
  [78, "Un bouchon plus long conserve-t-il forcément mieux le vin ?", ["taille-bouchon.raison", "taille-bouchon.choix"]],
  [79, "Combien de temps conserver des bocaux maison ?", ["stockage-conserves.duree"]],
  [80, "Quel bouchon choisir pour un vin à boire dans moins de deux ans ?", ["bouchon+vin-jeune.choix"]],
  [81, "Peut-on inventer ou modifier une recette de conserve ?", ["recette-conserve.condition"]],
  [82, "Quel bouchon choisir pour un vin à garder de deux à cinq ans ?", ["bouchon.choix", "bouchon+vin-de-garde.choix"]],
  [83, "Quel bouchon choisir pour un vin de garde de plus de dix ans ?", ["bouchon+vin-de-garde.choix", "bouchon-naturel.duree"]],
  [84, "Quel bouchon choisir pour du vin rouge, blanc ou rosé ?", ["bouchon.choix"]],
];

describe("les questions prioritaires P1", () => {
  it("contient exactement les 84 priorités de l’étude", () => {
    expect(QUESTIONS_P1).toHaveLength(84);
    expect(QUESTIONS_P1.map(([rang]) => rang)).toEqual(Array.from({ length: 84 }, (_, index) => index + 1));
  });

  it.each(QUESTIONS_P1)("P1 n°%i — %s", (_rang, question, faitsAcceptables) => {
    const trace = assistant.repondre(question).trace;
    const faits = trace.faits;
    expect(
      faits.some((fait) => faitsAcceptables.includes(fait)),
      `${question} → type=${trace.type ?? "aucun"}; concepts=${trace.concepts.join(", ") || "aucun"}; faits=${faits.join(", ") || "aucun"}`,
    ).toBe(true);
  });
});
