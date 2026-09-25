// Le Comptoir de la Conserve : stérilisation, bocaux, confitures, fumage.
import { PAGES } from "./liens";
import { rubrique, SAVOIR_FAIRE } from "./outils";

const r = rubrique(PAGES.conserve.url);
export const conserves = r;

const MINISTERE_BOTULISME = "https://agriculture.gouv.fr/le-botulisme";
const NCHFP = "https://nchfp.uga.edu/resources/category/usda-guide";

r.concept("conserve", "Les conserves maison", ["conserve", "conserves", "conserverie", "conserves maison", "faire ses conserves", "faire des conserves", "comptoir de la conserve", "le comptoir de la conserve", "sterilisation", "steriliser", "appertisation", "mettre en bocaux", "mise en bocaux", "fait maison"], {
  famille: "catalogue",
  lien: PAGES.conserve,
  voirAussi: ["sterilisateur", "bocal", "confiture"],
});

r.fait("conserve", "gamme", `
  **Le Comptoir de la Conserve** réunit le matériel du fait-maison : stérilisateur électrique inox de 27 L, thermomètre de stérilisation, bocaux en verre à joints, pince à bocaux, pince ouvre-bocal, entonnoir à confiture, capsules à vis de rechange, mais aussi fumoir électrique, réchaud à gaz et hachoirs.`, { liens: [PAGES.conserve, PAGES.sterilisateurs, PAGES.transformation] });

r.fait("conserve", "procedure", `
  Les étapes d'une conserve maison :
  1. Préparez des **bocaux propres** et des **joints neufs**.
  2. Remplissez les bocaux en laissant un espace sous le couvercle, essuyez les bords et fermez.
  3. Appliquez le procédé prévu par une **recette testée** : bain d'eau bouillante pour certains aliments acides, ou appareil sous pression lorsque la recette l'exige.
  4. Respectez exactement la température ou la pression, la durée, le format du bocal et l'éventuelle correction d'altitude.
  5. Laissez refroidir, vérifiez la fermeture, puis étiquetez et datez.`, { source: SAVOIR_FAIRE, liens: [PAGES.sterilisateur, PAGES.bocaux] });

r.fait("conserve", "condition", `
  Pour des conserves sûres, suivez toujours une **recette testée** et son barème complet. L'acidité, la densité, le format du bocal, la température ou la pression, la durée et l'altitude peuvent tous modifier la sécurité du procédé. Une conserve insuffisamment traitée peut exposer au **botulisme** : ne goûtez jamais un bocal bombé, fuyant, descellé ou d'odeur anormale.`, { source: MINISTERE_BOTULISME });

r.concept("traitement-thermique-conserve", "Pasteurisation et stérilisation", ["pasteurisation ou sterilisation", "difference pasteurisation sterilisation", "pasteuriser ou steriliser", "traitement thermique"], {
  famille: "conserve",
});

r.fait("traitement-thermique-conserve", "choix", `
  La **pasteurisation** applique un traitement plus modéré et ne détruit pas tous les micro-organismes ou spores ; la **stérilisation/appertisation** vise une stabilité à température ambiante avec un procédé validé. Un simple bain d'eau ne convient pas à tous les aliments : le choix dépend surtout de l'acidité et de la recette testée.`, { source: NCHFP });

r.concept("bain-marie-conserve", "Conserves au bain-marie", ["bain marie", "bain d eau bouillante", "aliments au bain marie", "conserve a l eau bouillante", "traiter au bain marie"], {
  famille: "conserve",
});

r.fait("bain-marie-conserve", "condition", `
  Le bain d'eau bouillante est réservé aux **recettes testées pour aliments suffisamment acides**, comme certaines préparations de fruits, confitures ou pickles. Ne décidez pas d'après le goût ou l'apparence : utilisez la recette, le format de bocal, le temps et la correction d'altitude qu'elle indique.`, { source: NCHFP });

r.concept("aliment-peu-acide", "Aliments peu acides en conserve", ["aliment peu acide", "aliments peu acides", "legumes en conserve", "viande en conserve", "poisson en conserve", "conserve sous pression", "autoclave", "sterilisateur sous pression"], {
  famille: "conserve",
  formules: ["legumes et viandes sous pression", "legumes et viandes demandent un procede sous pression", "pourquoi les legumes et viandes demandent ils un procede sous pression"],
});

r.fait("aliment-peu-acide", "raison", `
  Les légumes, viandes et poissons sont généralement **peu acides** : un bain d'eau bouillante n'atteint pas les conditions exigées par les recettes testées pour maîtriser les spores responsables du botulisme. Utilisez uniquement le procédé sous pression, l'appareil et le barème explicitement prévus par une source compétente.`, { source: MINISTERE_BOTULISME });

r.concept("bareme-conserve", "Barème de traitement des conserves", ["temps de sterilisation", "duree de sterilisation", "temperature de sterilisation", "combien de temps steriliser", "a quelle temperature steriliser", "bareme de sterilisation", "duree pour un bocal"], {
  famille: "conserve",
});

r.fait("bareme-conserve", "duree", `
  Il n'existe pas de durée universelle : le temps dépend de l'aliment, de la recette, de l'acidité, de la taille du bocal, du procédé et de l'altitude. Utilisez uniquement le **barème complet d'une recette testée** ; je préfère ne pas donner un nombre de minutes sans ces éléments.`, { source: MINISTERE_BOTULISME });

r.fait("bareme-conserve", "dimension", `
  La température ou la pression à atteindre dépend du procédé validé. Le bain d'eau bouillante et le traitement sous pression ne sont pas interchangeables : suivez la valeur, la durée et les réglages de la recette testée et de l'appareil.`, { source: NCHFP });

r.concept("recette-conserve", "Recette testée de conserve", ["recette de conserve", "modifier une recette", "inventer une recette", "adapter une recette", "changer le sucre", "changer le vinaigre", "doubler la recette", "recette ancienne"], {
  famille: "conserve",
});

r.fait("recette-conserve", "condition", `
  Ne modifiez pas librement les proportions, l'acidité, l'épaisseur, la taille des morceaux, le format du bocal ou le traitement d'une recette testée : ces changements peuvent empêcher la chaleur de pénétrer comme prévu et invalider le barème.`, { source: NCHFP });

r.concept("bocal-suspect", "Bocal de conserve suspect", ["bocal bombe", "couvercle bombe", "bocal qui fuit", "bocal descelle", "bocal ouvert tout seul", "conserve qui sent mauvais", "odeur anormale", "bocal suspect"], {
  famille: "conserve",
  formules: ["bocal bombe", "bocal fuyant", "bocal qui sent mauvais", "bocal bombe fuyant ou qui sent mauvais", "que faire d un bocal bombe"],
});

r.fait("bocal-suspect", "condition", `
  Ne goûtez pas et ne consommez pas un bocal bombé, fuyant, descellé, mousseux ou d'odeur anormale. Évitez de l'ouvrir ou de le manipuler inutilement ; isolez-le et suivez les recommandations sanitaires d'élimination afin d'éviter toute projection ou contamination.`, { source: MINISTERE_BOTULISME });

r.concept("stockage-conserves", "Conservation des bocaux maison", ["conserver les bocaux", "duree de conservation des bocaux", "combien de temps garder les conserves", "stockage des conserves", "garder un bocal maison"], {
  famille: "conserve",
});

r.fait("stockage-conserves", "duree", `
  Distinguez **sécurité** et qualité : suivez la durée de la recette testée, datez chaque lot et utilisez en priorité les plus anciens. Pour une bonne qualité, stockez les bocaux fermés dans un endroit frais, sec et sombre et contrôlez le sceau avant ouverture ; au moindre signe suspect, jetez sans goûter.`, { source: NCHFP });

r.concept("sterilisateur", "Stérilisateur", ["sterilisateur", "sterilisateurs", "steriliseur", "bouilleur", "sterilisateur electrique", "cuve de sterilisation", "27 litres", "thermometre", "thermometre de sterilisation", "thermometre bouilleur"], {
  famille: "conserve",
  lien: PAGES.sterilisateur,
});

r.fait("sterilisateur", "definition", `
  Le **stérilisateur électrique ABC en inox de 27 litres** est équipé d'un **thermostat**, d'un **minuteur** et d'un **robinet de vidange** : il chauffe l'eau et la maintient à la bonne température pendant toute la stérilisation. Un **thermomètre pour bouilleur** permet aussi de contrôler la température de l'eau.`, { source: PAGES.sterilisateurs.url, liens: [PAGES.sterilisateur, PAGES.thermometreBouilleur] });

r.fait("sterilisateur", "dimension", `
  Le stérilisateur électrique ABC en inox a une contenance de **27 litres**, avec thermostat, minuteur et robinet de vidange.`, { source: PAGES.sterilisateurs.url, liens: [PAGES.sterilisateur] });

r.fait("sterilisateur", "condition", `
  Ce stérilisateur chauffe un **bain d'eau** ; il ne doit pas être assimilé à un appareil de mise en conserve sous pression. Utilisez-le seulement lorsque la recette testée prévoit ce mode de traitement et respectez ses limites et sa notice.`, { source: NCHFP, liens: [PAGES.sterilisateur] });

r.concept("bocal", "Bocaux et couvercles", ["bocal", "bocaux", "pot", "pots", "pot en verre", "bocaux en verre", "joint", "joints", "joint caoutchouc", "couvercle", "couvercles", "capsule a vis", "capsules a vis", "pots a confiture", "verrine", "1,5 l", "bocal 1,5 litre"], {
  famille: "conserve",
  lien: PAGES.bocaux,
});

r.fait("bocal", "gamme", `
  Lot de **6 bocaux en verre Luminarc de 1,5 L** avec joints hermétiques, et **capsules à vis de rechange de 70 mm** (lot de 2).`, { source: PAGES.transformation.url, liens: [PAGES.bocaux] });

r.fait("bocal", "condition", `
  Les bocaux en verre se réutilisent s'ils ne sont ni fissurés ni ébréchés. Pour les joints, suivez le fabricant : lorsqu'ils sont prévus pour un usage unique, remplacez-les à chaque traitement ; écartez toujours un joint déformé, craquelé, collant ou durci.`, { source: NCHFP });

r.concept("preparation-bocaux", "Préparer les bocaux avant remplissage", ["steriliser les bocaux vides", "ebouillanter les bocaux", "preparer les bocaux", "bocaux avant remplissage", "laver les bocaux vides"], {
  famille: "bocal",
});

r.fait("preparation-bocaux", "condition", `
  Lavez et inspectez toujours les bocaux. La pré-stérilisation des bocaux vides dépend ensuite de la recette et de la durée du traitement final : suivez la méthode testée et la notice du fabricant plutôt qu'une règle unique.`, { source: NCHFP });

r.concept("ustensiles-conserve", "Ustensiles de conserverie", ["pince a bocaux", "pince", "pince ouvre bocal", "ouvre bocal", "ouvrir un bocal", "bocal difficile a ouvrir", "attraper les bocaux", "sortir les bocaux", "entonnoir a confiture", "entonnoir large"], {
  famille: "conserve",
  lien: PAGES.pinceBocaux,
});

r.fait("ustensiles-conserve", "gamme", `
  Ustensiles du Comptoir de la Conserve :
  - **pince à bocaux**, pour sortir les bocaux chauds du stérilisateur sans se brûler ;
  - **pince ouvre-bocal** multifonction, avec décapsuleur ;
  - **entonnoir à confiture** de 12 cm de diamètre, pour remplir les pots proprement.`, { source: PAGES.conserve.url, liens: [PAGES.pinceBocaux, PAGES.pinceOuvreBocal, PAGES.entonnoirConfiture] });

r.concept("confiture", "Confitures", ["confiture", "confitures", "faire de la confiture", "gelee", "gelees", "compote", "compotes", "marmelade", "fruits de saison", "confiturier"], {
  famille: "conserve",
  lien: PAGES.confiture,
});

r.fait("confiture", "procedure", `
  Les grandes étapes d'une confiture :
  1. Préparez des fruits **mûrs et sains**, et pesez-les avec le sucre (souvent à poids égal, ou moins pour une confiture moins sucrée).
  2. Faites cuire en remuant jusqu'à ce que la confiture **nappe la cuillère** ou se fige sur une assiette froide.
  3. Remplissez à chaud des pots **propres et ébouillantés**, à l'aide d'un entonnoir, jusqu'à 1 cm du bord.
  4. Fermez aussitôt et laissez refroidir.`, { source: SAVOIR_FAIRE, liens: [PAGES.confiture, PAGES.entonnoirConfiture] });

r.concept("prise-confiture", "Cuisson et prise de la confiture", ["confiture assez cuite", "confiture trop liquide", "test de l assiette", "test de prise", "point de gelee", "cuisson de la confiture"], {
  famille: "confiture",
  lien: PAGES.confiture,
  formules: ["ma confiture ne prend pas", "confiture ne prend pas", "confiture ne prend elle pas"],
});

r.fait("prise-confiture", "procedure", `
  Pour vérifier la prise, suivez une **recette testée** et contrôlez le point indiqué par la recette ; le test d'une goutte sur une assiette froide peut compléter ce contrôle. La prise dépend du fruit, de la pectine, de l'acidité, du sucre, de la taille du lot et se confirme en refroidissant.`, { source: NCHFP, liens: [PAGES.confiture] });

r.fait("prise-confiture", "raison", `
  Une confiture reste souvent liquide lorsque l'équilibre **fruit-sucre-pectine-acidité** n'est pas adapté, que le lot est trop grand ou que la cuisson n'a pas atteint le point prévu. Ne la recuisez ou ne la corrigez qu'avec une méthode éprouvée correspondant à cette recette.`, { source: NCHFP });

r.fait("confiture", "gamme", `
  La rubrique **Faire de la confiture** regroupe le matériel pour préparer confitures, gelées et compotes à partir des fruits de saison, comme l'entonnoir à confiture et les pots.`, { source: PAGES.confiture.url, liens: [PAGES.confiture] });

r.concept("fumoir", "Fumoir électrique", ["fumoir", "fumoirs", "fumer", "fumage", "fumaison", "fumer du poisson", "fumer la viande", "saumon fume", "fume"], {
  famille: "conserve",
  lien: PAGES.fumoir,
});

r.fait("fumoir", "definition", `
  Le **fumoir électrique de 1200 W** permet de fumer vos aliments à chaud, pour toutes vos recettes maison.`, { source: PAGES.sterilisateurs.url, liens: [PAGES.fumoir] });

r.fait("fumoir", "dimension", `
  Le fumoir électrique Duhallé a une puissance de **1200 W**.`, { source: PAGES.sterilisateurs.url, liens: [PAGES.fumoir] });

r.concept("rechaud", "Réchaud à gaz", ["rechaud", "rechaud a gaz", "rechauds", "bruleur", "gaz", "butane", "propane", "8500 w", "cuisson exterieure"], {
  famille: "conserve",
  lien: PAGES.rechaud,
});

r.fait("rechaud", "definition", `
  Le **réchaud à gaz de 8500 W**, en fonte, sur 4 pieds, fonctionne au **butane et au propane**. Robuste, il permet de chauffer une grande marmite ou une cuve en extérieur.`, { source: PAGES.sterilisateurs.url, liens: [PAGES.rechaud] });

r.fait("rechaud", "dimension", `
  Le réchaud à gaz Duhallé développe **8500 W** ; il fonctionne au butane comme au propane.`, { source: PAGES.sterilisateurs.url, liens: [PAGES.rechaud] });

r.concept("hachoir", "Hachoirs", ["hachoir", "hachoirs", "hachoir a viande", "hacher", "hachis", "saucisse", "saucisses", "pate", "pates maison", "terrine", "terrines", "hachoir electrique", "hachoir fonte"], {
  famille: "conserve",
  lien: PAGES.hachoirFonte,
});

r.fait("hachoir", "gamme", `
  Deux hachoirs pour vos préparations maison : un **hachoir en fonte n°10** (grille perforée en acier) et un **hachoir à viande électrique n°8** multifonction, pour hachis, saucisses et légumes râpés. Pratiques pour les terrines et pâtés à mettre en conserve.`, { source: PAGES.transformation.url, liens: [PAGES.hachoirFonte, PAGES.hachoirElectrique] });
