// LE BANC : des questions telles que les clients les posent, et le fait qui
// doit ouvrir la réponse. Quand on modifie le moteur ou la base, ce banc dit
// ce qui a changé. Ajoutez-y chaque question réelle mal comprise, une fois
// corrigée.
import { describe, expect, it } from "vitest";
import { Assistant, type Nature } from "../src/moteur/assistant";
import { REGLAGES } from "../src/savoir/coordonnees";
import { BASE } from "../src/savoir/index";

const assistant = new Assistant(BASE, REGLAGES);

/** [question, id du premier fait attendu] */
const QUESTIONS: Array<[string, string]> = [
  // Bouchage
  ["Quel bouchon pour un vin de garde ?", "bouchon+vin-de-garde.choix"],
  ["quels bouchons pour vins de garde", "bouchon+vin-de-garde.choix"],
  ["Quel bouchon choisir pour mon vin ?", "bouchon.choix"],
  ["bouchon pour vin jeune", "bouchon+vin-jeune.choix"],
  ["quels bouchons vendez-vous ?", "bouchon.gamme"],
  ["c'est quoi un bouchon colmaté", "bouchon-colmate.definition"],
  ["bouchon naturel ou colmaté ?", "bouchon-naturel+bouchon-colmate.choix"],
  ["quelle taille de bouchon pour une bouteille de 75cl", "taille-bouchon.dimension"],
  ["pourquoi un bouchon long pour le vin de garde", "taille-bouchon.raison"],
  ["faut-il faire tremper les bouchons ?", "bouchon-liege.condition"],
  ["comment conserver mes bouchons", "bouchon-liege.entretien"],
  ["que veut dire cat 3 sur les bouchons", "categorie-bouchon.definition"],
  ["c'est quoi les lenticelles", "lenticelles.definition"],
  ["avez-vous des bondes pour dame-jeanne ?", "bonde+contenant.gamme"],
  ["quelles tailles de bondes", "bonde.dimension"],
  ["bouchon conique", "bouchon-conique.definition"],
  ["comment boucher une bouteille de vin", "bouchage.procedure"],
  ["combien de temps laisser les bouteilles debout après bouchage", "repos-bouchage.duree"],
  ["pourquoi laisser les bouteilles debout", "repos-bouchage.raison"],
  ["quelle boucheuse choisir ?", "boucheuse.choix"],
  ["boucheusse manuel", "boucheuse.definition"],
  ["boucheuse 2 leviers ou machoires ?", "boucheuse.choix"],
  ["c'est quoi une boucheuse à mâchoires", "boucheuse-machoires.definition"],
  ["vendez-vous des capsules ?", "capsule-couronne.gamme"],
  ["quelle capsule pour le cidre ?", "bouchage+cidre.choix"],
  ["capsule 26 ou 29 mm ?", "capsule-couronne.dimension"],
  ["comment utiliser une capsuleuse", "capsuleuse.procedure"],
  // Mise en bouteille
  ["Comment mettre mon vin en bouteille ?", "mise-en-bouteille.procedure"],
  ["quand faire la mise en bouteille", "mise-en-bouteille.moment"],
  ["jusqu'où remplir la bouteille", "niveau-remplissage.dimension"],
  ["peut-on réutiliser des bouteilles de vin ?", "bouteille.condition"],
  ["vous vendez des bouteilles vides ?", "bouteille.gamme"],
  ["comment nettoyer les bouteilles", "nettoyage-bouteilles.procedure"],
  ["comment soutirer le vin", "soutirage.procedure"],
  ["quelle tireuse choisir", "soutirage.choix"],
  ["comment utiliser un vinomètre", "vinometre.procedure"],
  ["comment poser une capsule de surbouchage", "surbouchage.procedure"],
  ["dosage du soufre", "oenologie.condition"],
  // Cire
  ["comment cacheter une bouteille à la cire", "cire.procedure"],
  ["cire dure ou souple", "cire-dure+cire-souple.choix"],
  ["cire qui ne casse pas", "cire-souple.definition"],
  ["comment faire fondre la cire", "cire.procedure"],
  ["capsule ou cire ?", "surbouchage+cire.choix"],
  // Cave et service
  ["quelle température pour une cave", "cave.condition"],
  ["quel casier choisir", "casier.choix"],
  ["à quelle température servir un vin rouge", "temperature-service.dimension"],
  ["quel tire bouchon pour un vieux vin", "tire-bouchon.choix"],
  ["combien de temps se garde une bouteille ouverte", "bouteille-ouverte.duree"],
  // Cidre, vinaigre, conserves
  ["comment faire son cidre", "cidre.procedure"],
  ["quand faire son cidre", "cidre.moment"],
  ["quel pressoir choisir", "pressoir.choix"],
  ["quelles pommes pour le cidre", "pomme.choix"],
  ["je peux mettre mon cidre dans des bouteilles de vin ?", "cidre+mise-en-bouteille.procedure"],
  ["comment faire du vinaigre", "vinaigre.procedure"],
  ["combien de temps pour faire du vinaigre", "vinaigre.duree"],
  ["mon robinet de vinaigrier fuit", "robinet-vinaigrier.condition"],
  ["quels vinaigriers proposez-vous", "vinaigrier.gamme"],
  ["comment stériliser des bocaux", "conserve.procedure"],
  ["comment faire de la confiture", "confiture.procedure"],
  // Commande et entreprise
  ["combien coûte la livraison ?", "livraison.prix"],
  ["livraison gratuite ?", "livraison.prix"],
  ["vous livrez en belgique ?", "zone-livraison.condition"],
  ["quels sont les moyens de paiement", "paiement.definition"],
  ["paiement en 4 fois ?", "paiement-4x.definition"],
  ["comment retourner un produit", "retour.procedure"],
  ["mon colis est arrivé cassé", "produit-abime.procedure"],
  ["où en est ma commande ?", "suivi-commande.procedure"],
  ["comment vous contacter", "service-client.definition"],
  ["qui êtes-vous ?", "duhalle.definition"],
  ["combien coûte la boucheuse à deux leviers", "catalogue.prix"],
  ["c'est cher ?", "catalogue.prix"],
  ["vous faites des bouchons personnalisés pour un mariage ?", "personnalisation.definition"],
  ["une idée de cadeau pour un amateur de vin", "cadeau.gamme"],
];

/**
 * Le premier jeu « inédit », écrit après le premier réglage : mesuré à 57 %,
 * il a révélé des défauts de RÈGLES (correction des fautes trop hardie, alias
 * réduits à un mot générique, « quand on ouvre » lu comme un moment…). Une
 * fois ces règles corrigées, il a rejoint le banc : plusieurs réponses justes
 * sont acceptées pour chaque question.
 */
const QUESTIONS_ORALES: Array<[string, string[]]> = [
  ["Bonsoir, je voudrais savoir quels bouchons utiliser pour un rouge que je compte garder 10 ans", ["bouchon+vin-de-garde.choix"]],
  ["bouchons 45 mm ou 38 mm, quelle différence ?", ["taille-bouchon.dimension", "taille-bouchon.raison", "bouchon.choix"]],
  ["j'ai du mal a enfoncer mes bouchons, que faire ?", ["bouchage.erreur", "boucheuse.erreur", "bouchon-liege.condition"]],
  ["est ce que les bouchons colmatés sont de bonne qualité", ["bouchon-colmate.definition", "bouchon-naturel+bouchon-colmate.choix", "categorie-bouchon.definition"]],
  ["ou acheter des bouchons en liege", ["bouchon-liege.definition", "bouchon.gamme", "catalogue.lieu"]],
  ["le liège c'est écologique ?", ["bouchon-liege.definition"]],
  ["il me faut quoi comme matos pour embouteiller mon vin", ["mise-en-bouteille.gamme", "mise-en-bouteille.procedure"]],
  ["on laisse combien de place entre le vin et le bouchon", ["niveau-remplissage.dimension"]],
  ["mes bouteilles fuient après le bouchage", ["repos-bouchage.raison", "repos-bouchage.duree", "boucheuse.erreur"]],
  ["comment bien laver des bouteilles de récup", ["nettoyage-bouteilles.procedure", "bouteille.condition"]],
  ["à quoi sert un égouttoir", ["egouttoir.gamme", "nettoyage-bouteilles.procedure"]],
  ["comment éviter l'oxydation pendant le soutirage", ["soutirage.procedure", "mise-en-bouteille.erreur", "soutirage.definition"]],
  ["faut il filtrer son vin avant de le mettre en bouteille", ["filtre-vin.usage"]],
  ["mesurer le degré d'alcool de mon vin", ["mesure.gamme", "vinometre.procedure"]],
  ["la cire souple se casse t elle quand on ouvre", ["cire-souple.definition"]],
  ["à quelle température faire fondre la cire", ["chauffe-cire.dimension", "chauffe-cire.definition", "cire.procedure"]],
  ["vous avez de la cire noire ?", ["cire.gamme", "cire-dure.definition"]],
  ["comment bien ranger mes bouteilles en cave", ["cave.procedure", "cave.condition"]],
  ["ma cave est trop sèche, c'est grave ?", ["hygrometrie.condition"]],
  ["un casier pour 60 bouteilles ?", ["casier.gamme"]],
  ["quel couteau de sommelier me conseillez-vous", ["tire-bouchon.choix"]],
  ["le bouchon s'effrite quand j'ouvre mes vieilles bouteilles", ["bilame.usage"]],
  ["comment garder un vin ouvert plusieurs jours", ["bouteille-ouverte.duree", "bouteille-ouverte.choix"]],
  ["quelle variété de pommes pour un bon cidre", ["pomme.choix"]],
  ["faut il broyer les pommes avant de les presser", ["broyeur.raison", "broyeur.definition"]],
  ["quelle taille de pressoir pour 100 kg de pommes", ["pressoir.choix", "pressoir.gamme"]],
  ["mes bouteilles de cidre peuvent-elles exploser ?", ["cidre.condition", "bouteille-champenoise.condition"]],
  ["capsules pour bouteilles de bière", ["capsule-couronne.dimension", "capsule-couronne.gamme"]],
  ["c'est quoi la mère du vinaigre", ["mere-vinaigre.definition"]],
  ["quel vinaigrier pour une petite famille", ["vinaigrier.choix"]],
  ["comment entretenir un vinaigrier en grès", ["vinaigrier.entretien"]],
  ["risque de botulisme avec les conserves maison ?", ["conserve.condition"]],
  ["faut-il changer les joints des bocaux", ["bocal.condition"]],
  ["vous vendez un stérilisateur ?", ["sterilisateur.definition", "conserve.gamme"]],
  ["frais de port pour la Corse", ["zone-livraison.prix", "zone-livraison.condition"]],
  ["je peux payer avec paypal ?", ["paiement.definition"]],
  ["combien de jours pour être livré", ["livraison.duree"]],
  ["je me suis trompé dans ma commande", ["modifier-commande.procedure"]],
  ["j'ai reçu un produit défectueux", ["produit-abime.procedure"]],
  ["je voudrais une facture", ["facture.procedure"]],
  ["est-ce que Duhallé fabrique ses produits ?", ["duhalle.definition", "duhalle.raison"]],
  ["vous avez un magasin où je peux venir ?", ["magasin.lieu"]],
  ["je suis vigneron et j'ai besoin de 5000 bouchons", ["professionnels.definition"]],
  ["avez vous un code promo", ["promotions.definition"]],
];

/** Le jeu inédit n°2 : mesuré à 57 %, puis versé au banc après correction des règles. */
const QUESTIONS_ORALES_2: Array<[string, string[]]> = [
  ["Bonjour, je débute, par quoi commencer pour embouteiller mon premier vin ?", ["mise-en-bouteille.procedure", "mise-en-bouteille.gamme"]],
  ["quelle est la différence entre un bouchon naturel et un colmaté", ["bouchon-naturel+bouchon-colmate.choix"]],
  ["je cherche des bouchons pour du vin que je vais boire dans l'année", ["bouchon+vin-jeune.choix"]],
  ["mes bouchons remontent tout seuls après bouchage", ["repos-bouchage.raison", "repos-bouchage.duree", "boucheuse.erreur", "bouchage.erreur"]],
  ["quel diamètre de bouchon pour une bouteille bordelaise", ["taille-bouchon.dimension", "bouteille.dimension"]],
  ["une boucheuse pour 50 bouteilles par an, laquelle ?", ["boucheuse.choix"]],
  ["on peut boucher sans boucheuse ?", ["bouchon-conique.definition", "boucheuse.definition", "bouchage.erreur"]],
  ["bonde pour tonneau", ["bonde.definition", "bonde.dimension", "bonde+contenant.gamme"]],
  ["différence capsule 26 et 29", ["capsule-couronne.dimension"]],
  ["avec quoi on pose les capsules couronne", ["capsuleuse.gamme", "capsuleuse.procedure"]],
  ["je veux cacheter mes bouteilles pour un cadeau, quelle cire ?", ["cire-dure+cire-souple.choix"]],
  ["le chauffe cire monte à combien de degrés", ["chauffe-cire.definition", "chauffe-cire.dimension"]],
  ["comment mettre une capsule thermo sur le goulot", ["surbouchage.procedure"]],
  ["étiquettes pour mes bouteilles de vin maison", ["etiquettes.gamme", "etiquettes.usage"]],
  ["la bouteille bourgogne c'est pour quel vin", ["bouteille.choix"]],
  ["comment aviner une bouteille", ["rince-bouteille.procedure", "rince-bouteille.usage"]],
  ["température idéale d'une cave à vin", ["cave.condition"]],
  ["un casier qui se fixe au mur", ["casier.gamme", "casier.choix"]],
  ["à quoi sert une cave double zone", ["cave-electrique.definition"]],
  ["servir un champagne à quelle température", ["temperature-service.dimension"]],
  ["combien de litres fait le plus grand pressoir", ["pressoir.gamme", "pressoir.choix"]],
  ["peut-on faire du jus de pomme avec le pressoir", ["jus.usage", "pressoir.gamme"]],
  ["mon vinaigre ne se fait pas, pourquoi ?", ["vinaigre.raison", "vinaigre.erreur", "vinaigre.duree"]],
  ["le vinaigrier en chêne ou en grès ?", ["vinaigrier.choix"]],
  ["bocaux de 1,5 litre", ["bocal.gamme"]],
  ["le fumoir c'est quelle puissance", ["fumoir.dimension", "fumoir.definition"]],
  ["livraison offerte à partir de combien ?", ["livraison.prix"]],
  ["j'aimerais échanger un article", ["retour.procedure"]],
  ["quels transporteurs utilisez-vous", ["livraison.definition"]],
  ["depuis combien de temps existe Duhallé", ["duhalle.definition"]],
];

/** Le jeu inédit n°3 : mesuré à 77 % à l'aveugle, puis versé au banc. */
const QUESTIONS_ORALES_3: Array<[string, string[]]> = [
  ["salut ! je voudrais faire mon propre vin, vous vendez quoi pour ça ?", ["vin.gamme", "mise-en-bouteille.gamme", "catalogue.gamme"]],
  ["combien de temps un vin de garde peut rester en bouteille", ["vin-de-garde.duree", "bouchon-liege.duree", "bouchon+vin-de-garde.choix"]],
  ["les bouchons en liège, ça se recycle ?", ["bouchon-liege.definition"]],
  ["que signifie un bouchon colmaté super glisse", ["bouchon-colmate.definition", "bouchon-liege.condition"]],
  ["quelle bonde pour une bonbonne à col large", ["bonde+contenant.gamme", "bonde.dimension", "bonde.choix"]],
  ["je n'arrive pas à enfoncer le bouchon avec ma boucheuse à levier", ["bouchage.erreur", "boucheuse.erreur"]],
  ["est-ce que la boucheuse universelle fait les capsules", ["boucheuse-universelle.definition"]],
  ["capsules avec opercule c'est quoi", ["capsule-opercule.definition"]],
  ["comment reconnaître une bouteille qui supporte la pression", ["bouteille-champenoise.condition", "bouteille.condition"]],
  ["filtre à vin de quel diamètre", ["filtre-vin.dimension"]],
  ["mesurer le taux d'alcool d'une eau de vie", ["alcoometre.usage", "mesure.gamme"]],
  ["comment entretenir un fût en bois", ["contenant.entretien"]],
  ["une mèche soufrée ça sert à quoi", ["oenologie.usage"]],
  ["quelle couleur de cire à cacheter avez-vous", ["cire.gamme"]],
  ["la cire à cacheter est fabriquée où", ["cire.definition", "duhalle.raison"]],
  ["ranger 144 bouteilles", ["casier.gamme"]],
  ["quel tire-bouchon est le plus facile", ["tire-bouchon.choix"]],
  ["pompe pour enlever l'air d'une bouteille ouverte", ["bouteille-ouverte.choix"]],
  ["faire du cidre avec des pommes de table", ["pomme.choix", "cidre.procedure"]],
  ["pourquoi broyer les pommes", ["broyeur.raison"]],
  ["quand mettre le cidre en bouteille", ["cidre+mise-en-bouteille.moment", "cidre.moment"]],
  ["quelle contenance pour un vinaigrier", ["vinaigrier.choix", "vinaigrier.gamme"]],
  ["le robinet du vinaigrier goutte", ["robinet-vinaigrier.condition"]],
  ["comment faire une gelée de fruits", ["confiture.procedure"]],
  ["stérilisateur électrique combien de litres", ["sterilisateur.dimension", "sterilisateur.definition"]],
  ["hachoir pour faire des saucisses", ["hachoir.gamme"]],
  ["payer en plusieurs fois", ["paiement-4x.definition"]],
  ["livraison dans les DOM", ["zone-livraison.condition", "zone-livraison.prix"]],
  ["je n'ai toujours pas reçu mon colis", ["suivi-commande.procedure"]],
  ["huile de cade utilisation", ["huile-cade.usage"]],
];

describe("le banc de questions", () => {
  it.each(QUESTIONS)("« %s » → %s", (question, attendu) => {
    const reponse = assistant.repondre(question);
    expect(reponse.trace.faits[0]).toBe(attendu);
  });

  it.each([...QUESTIONS_ORALES, ...QUESTIONS_ORALES_2, ...QUESTIONS_ORALES_3])("« %s » → %j", (question, acceptables) => {
    expect(acceptables).toContain(assistant.repondre(question).trace.faits[0]);
  });
});

describe("les questions hors sujet", () => {
  it.each([
    "quelle est la capitale de la france",
    "azertyuiop",
    "qui a gagné le match hier",
    "donne moi la météo de demain",
  ])("« %s » ne reçoit pas de réponse inventée", (question) => {
    const reponse = assistant.repondre(question);
    expect<Nature>(reponse.nature).toBe("inconnu");
    expect(reponse.trace.faits).toEqual([]);
  });

  it("renvoie vers le service client quand rien n'est trouvé", () => {
    const reponse = assistant.repondre("azertyuiop");
    expect(reponse.texte).toContain(REGLAGES.telephone);
  });
});

describe("la politesse", () => {
  it("accueille avec les questions de départ", () => {
    const reponse = assistant.repondre("Bonjour !");
    expect(reponse.nature).toBe("accueil");
    expect(reponse.suggestions).toEqual(REGLAGES.questionsDeDepart);
  });

  it("répond à une salutation suivie d'une question par la réponse à la question", () => {
    expect(assistant.repondre("Bonjour, comment faire son cidre ?").trace.faits[0]).toBe("cidre.procedure");
  });

  it("remercie et se présente comme un programme, sans IA générative", () => {
    expect(assistant.repondre("merci beaucoup").nature).toBe("politesse");
    expect(assistant.repondre("tu es un robot ?").texte).toMatch(/programme/);
  });
});

describe("les relances", () => {
  it("« et combien de temps ? » reste sur le même sujet", () => {
    const premiere = assistant.repondre("comment faire du vinaigre");
    const relance = assistant.repondre("et combien de temps ?", premiere.contexte);
    expect(relance.trace.relance).toBe(true);
    expect(relance.trace.faits[0]).toBe("vinaigre.duree");
  });

  it("« et pour le cidre ? » applique la question précédente au nouveau sujet", () => {
    const premiere = assistant.repondre("quel bouchon pour un vin de garde ?");
    const relance = assistant.repondre("et pour le cidre ?", premiere.contexte);
    expect(relance.trace.faits[0]).toBe("bouchage+cidre.choix");
  });

  it("une nouvelle question sans lien ne reprend pas l'ancien sujet", () => {
    const premiere = assistant.repondre("comment faire du vinaigre");
    const suivante = assistant.repondre("quels sont les moyens de paiement", premiere.contexte);
    expect(suivante.trace.relance).toBe(false);
    expect(suivante.trace.faits[0]).toBe("paiement.definition");
  });

  it("ignore un contexte forgé par le navigateur", () => {
    expect(assistant.contexteValide({ concepts: ["inexistant", 42], type: "piratage" })).toBeNull();
    expect(assistant.contexteValide({ concepts: ["cidre"], type: "prix" })).toEqual({ concepts: ["cidre"], type: "prix" });
  });
});

describe("la trace", () => {
  it("explique la réponse : type, concepts et faits", () => {
    const { trace } = assistant.repondre("combien de temps pour faire du vinaigre ?");
    expect(trace.type).toBe("duree");
    expect(trace.signal).toMatch(/durée/);
    expect(trace.concepts).toContain("vinaigre");
    expect(trace.faits.length).toBeGreaterThan(0);
  });
});
