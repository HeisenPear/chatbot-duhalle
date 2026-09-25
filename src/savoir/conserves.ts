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

r.concept("remplissage-bocal", "Espace de tête des conserves", ["temperature de remplissage des conserves", "espace de tete bocal", "vide sous le couvercle", "niveau de remplissage bocal"], {
  famille: "conserve",
  formules: ["remplir les bocaux a chaud ou a froid", "faut il remplir les bocaux a chaud ou a froid"],
});

r.fait("remplissage-bocal", "choix", `
  Le remplissage à chaud ou à froid dépend de la **recette testée** : suivez sa température de préparation, son ordre de remplissage et son procédé. Ne changez pas de méthode parce que le bocal paraît identique.`, { source: NCHFP });

r.fait("remplissage-bocal", "dimension", `
  L'espace de tête n'est pas universel : il dépend de l'aliment, du format du bocal et du procédé. Utilisez exactement la valeur de la recette testée ; trop peu d'espace favorise les débordements, trop d'espace peut gêner la formation du vide.`, { source: NCHFP });

r.concept("incident-traitement-conserve", "Incident pendant le traitement des conserves", ["liquide sort des bocaux", "bocal ne prend pas le vide", "temps non respecte", "temperature non respectee", "traitement interrompu", "bocal sans vide"], {
  famille: "conserve",
});

r.fait("incident-traitement-conserve", "raison", `
  Une perte de liquide ou un défaut de vide peut venir d'un espace de tête incorrect, d'air emprisonné, d'une fermeture sale ou mal posée, d'un refroidissement trop rapide ou d'un traitement inadapté. Un couvercle fermé ne prouve pas que le contenu est sûr.`, { source: NCHFP });

r.fait("incident-traitement-conserve", "condition", `
  Si le temps, la température, la pression ou une étape du barème n'a pas été respecté, considérez le traitement comme non validé. N'improvisez pas une reprise : suivez immédiatement les instructions de la recette ou de l'autorité sanitaire pour retraiter, réfrigérer ou jeter.`, { source: MINISTERE_BOTULISME });

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

r.fait("bareme-conserve", "procedure", `
  Pour l'altitude, utilisez uniquement la correction indiquée par la recette testée pour le **procédé exact** : elle peut modifier le temps au bain d'eau ou la pression requise. N'appliquez pas une règle d'altitude trouvée pour un autre aliment ou appareil.`, { source: NCHFP });

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

r.fait("stockage-conserves", "procedure", `
  Étiquetez chaque bocal avec le contenu, la date, la recette ou le lot et les informations de traitement utiles. Rangez par catégorie et date, les plus anciens devant, sans masquer les couvercles afin de pouvoir contrôler toute fuite ou perte de vide.`, { source: NCHFP });

r.concept("alteration-conserve", "Changement de couleur ou texture d’une conserve", ["couleur change au stockage", "texture change au stockage", "conserve change de couleur", "conserve ramollie"], {
  famille: "conserve",
});

r.fait("alteration-conserve", "raison", `
  La couleur ou la texture peut évoluer avec la chaleur, l'oxygène, la lumière, l'acidité ou le temps, mais l'apparence seule ne permet pas de conclure à la sécurité. Contrôlez le sceau, la recette et le stockage ; au moindre signe suspect, jetez sans goûter.`, { source: NCHFP });

r.concept("conserve-au-four", "Conserves traitées au four", ["steriliser des bocaux au four", "conserve au four", "bocaux dans le four"], {
  famille: "conserve",
});

r.fait("conserve-au-four", "condition", `
  Ne remplacez pas un procédé validé par un traitement au four : la chaleur sèche ne reproduit ni un bain d'eau ni un traitement sous pression, et les bocaux peuvent se casser. Utilisez seulement la méthode prévue par la recette testée et le fabricant des bocaux.`, { source: NCHFP });

r.concept("empilage-bocaux", "Empiler des bocaux dans le stérilisateur", ["empiler les bocaux", "deux couches de bocaux", "bocaux superposes sterilisateur"], {
  famille: "sterilisateur",
});

r.fait("empilage-bocaux", "condition", `
  N'empilez les bocaux que si la notice de l'appareil et la méthode testée l'autorisent, avec un support assurant la circulation de l'eau et sans contact instable entre couvercles. Le niveau d'eau et la charge doivent rester conformes à la notice.`, { source: NCHFP, liens: [PAGES.sterilisateur] });

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

r.fait("sterilisateur", "entretien", `
  Appareil débranché et froid, vidangez-le, retirez le tartre selon la notice, nettoyez la cuve, le robinet et les supports puis rincez. Avant une nouvelle saison, contrôlez câble, thermostat, minuteur, robinet et thermomètre ; n'utilisez pas l'appareil s'il fuit ou régule mal.`, { source: SAVOIR_FAIRE, liens: [PAGES.sterilisateur] });

r.fait("sterilisateur", "procedure", `
  Avant la saison, appareil froid et débranché : nettoyez et rincez la cuve, le robinet et les supports, détartrez selon la notice, puis contrôlez câble, thermostat, minuteur, robinet et thermomètre. Faites l'essai prévu par le fabricant ; n'utilisez pas l'appareil s'il fuit ou régule mal.`, { source: SAVOIR_FAIRE, liens: [PAGES.sterilisateur] });

r.concept("etiquetage-conserves", "Étiqueter et ranger les conserves", ["etiqueter les conserves", "organiser ses conserves", "ranger les conserves", "etiquette de conserve"], {
  famille: "conserve",
  formules: ["etiqueter et organiser ses conserves"],
});

r.fait("etiquetage-conserves", "procedure", `
  Une fois les bocaux froids et leur fermeture contrôlée, indiquez sur chacun le **contenu**, la **date de fabrication** et, si utile, le numéro de lot ou la recette. Rangez les plus anciens devant, dans un lieu frais, sec et sombre, et tenez un inventaire simple pour appliquer « premier entré, premier sorti ».`, { source: SAVOIR_FAIRE });

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

r.concept("stockage-confiture", "Conserver une confiture maison", ["conserver une confiture maison", "duree confiture maison", "moisissure sur confiture", "confiture moisie"], {
  famille: "confiture",
});

r.fait("stockage-confiture", "duree", `
  La durée dépend de la recette, du traitement et du stockage : datez les pots et suivez la durée de la recette testée. Après ouverture, conservez au réfrigérateur ; si de la moisissure apparaît, jetez tout le pot sans simplement retirer la surface.`, { source: NCHFP });

r.fait("stockage-confiture", "condition", `
  Pour limiter les moisissures, utilisez des fruits sains, des pots propres, le niveau de sucre et le traitement de la recette, puis vérifiez la fermeture et stockez au frais, au sec et dans l'obscurité. Un pot mal fermé ou moisi doit être jeté sans goûter.`, { source: NCHFP });

r.concept("extracteur-jus", "Extracteur de jus", ["extracteur de jus", "extracteur vapeur", "choisir un extracteur", "presse ou extracteur"], {
  famille: "conserve",
});

r.fait("extracteur-jus", "choix", `
  Choisissez selon le résultat recherché : broyeur et pressoir pour extraire un jus cru à partir de fruits broyés ; extracteur pour séparer le jus par son procédé propre, souvent avec chauffage sur un modèle vapeur. Vérifiez capacité, source de chaleur, matériau alimentaire, nettoyage et méthode de conservation du jus obtenu.`, { source: SAVOIR_FAIRE });

r.concept("deshydrateur", "Déshydrateur alimentaire", ["deshydrateur", "deshydrater", "aliment assez sec", "sechage des aliments"], {
  famille: "conserve",
});

r.fait("deshydrateur", "choix", `
  Choisissez un déshydrateur selon la surface de plateaux, la circulation d'air, la plage de température, la minuterie et le nettoyage. La fin du séchage dépend de l'aliment et de la recette : contrôlez la texture et, pour une conservation longue, appliquez la méthode validée plutôt qu'un temps générique.`, { source: SAVOIR_FAIRE });

r.fait("deshydrateur", "condition", `
  Un aliment peut sembler sec en surface tout en restant humide à cœur. Laissez-le refroidir avant évaluation, conditionnez-le seulement selon la recette et surveillez condensation, ramollissement ou moisissure.`, { source: SAVOIR_FAIRE });

r.concept("presse-tomates", "Presse-tomates", ["presse tomates", "presse tomate", "choisir un presse tomates", "hachoir ou presse tomates"], {
  famille: "conserve",
});

r.fait(["hachoir", "presse-tomates"], "choix", `
  Le hachoir coupe ou broie viande et préparations selon sa grille ; le presse-tomates sépare pulpe, peau et pépins pour coulis. Choisissez l'outil selon l'aliment, le résultat voulu, la cadence, les matériaux en contact et la facilité de démontage.`, { source: SAVOIR_FAIRE });

r.fait("presse-tomates", "choix", `
  Pour un coulis, prenez un **presse-tomates**, qui sépare pulpe, peau et pépins. Le **hachoir** sert à couper ou broyer avec une grille et ne donne pas le même résultat. Comparez aussi cadence, matériaux alimentaires et facilité de démontage.`, { source: SAVOIR_FAIRE });

r.concept("huile-aromatisee", "Huile aromatisée maison", ["huile aromatisee", "huile a l ail", "huile aux herbes", "conserver de l huile en bocal"], {
  famille: "conserve",
});

r.fait("huile-aromatisee", "condition", `
  Ne conservez pas à température ambiante une huile maison contenant ail, herbes ou autres ingrédients humides sans recette testée : le milieu sans oxygène peut présenter un risque de botulisme. Utilisez une méthode sanitaire validée et, à défaut, ne préparez pas ce produit pour une conservation longue.`, { source: MINISTERE_BOTULISME });

r.concept("viande-en-conserve", "Viande et pâté en conserve", ["pate en conserve", "terrine en bocal", "charcuterie en bocal"], {
  famille: "aliment-peu-acide",
  formules: ["viande en conserve a la maison", "mettre du pate ou de la viande en conserve"],
});

r.fait("viande-en-conserve", "condition", `
  Viandes, pâtés et terrines sont des aliments peu acides : utilisez uniquement une recette testée prévoyant un **traitement sous pression** avec l'appareil, la pression, le temps, le format et l'altitude indiqués. Le stérilisateur à bain d'eau Duhallé ne remplace pas cet appareil.`, { source: MINISTERE_BOTULISME });

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
