// La mise en bouteille du vin : préparation, soutirage, remplissage,
// finitions, et le matériel correspondant.
import { EMAIL, TELEPHONE } from "./coordonnees";
import { PAGES } from "./liens";
import { rubrique, SAVOIR_FAIRE } from "./outils";

const r = rubrique(PAGES.miseEnBouteille.url);
export const miseEnBouteille = r;

r.concept("vin", "Le vin fait maison", ["vin", "vins", "vin maison", "vin fait maison", "vinification", "faire son vin", "faire du vin", "vigne", "raisin", "vendanges"], {
  famille: "catalogue",
  lien: PAGES.miseEnBouteille,
  voirAussi: ["mise-en-bouteille", "bouchon", "boucheuse"],
});

r.fait("vin", "gamme", `
  Pour le vin fait maison, Duhallé propose tout le matériel de l'après-vinification :
  - **mise en bouteille** : bouteilles, nettoyage, soutirage, filtration ;
  - **bouchage** : bouchons en liège, boucheuses, capsules de surbouchage ;
  - **œnologie** : outils de mesure, rince-fûts, mèches soufrées, fûts et dames-jeannes ;
  - **finitions** : cire à cacheter, étiquettes ;
  - **service et cave** : tire-bouchons, casiers.`);

// ─── La mise en bouteille ──────────────────────────────────────────────────

r.concept("mise-en-bouteille", "La mise en bouteille", ["mise en bouteille", "mettre en bouteille", "mettre son vin en bouteille", "mise en bouteilles", "mis en bouteille", "met en bouteille", "embouteillage", "embouteiller", "tirage du vin", "tirer le vin", "conditionner le vin"], {
  famille: "vin",
  lien: PAGES.miseEnBouteille,
  voirAussi: ["soutirage", "boucheuse", "nettoyage-bouteilles"],
});

r.fait("mise-en-bouteille", "procedure", `
  Les grandes étapes de la mise en bouteille :
  1. **Préparer les bouteilles** : lavez-les au goupillon, rincez-les et laissez-les égoutter tête en bas.
  2. **Soutirer le vin** sans l'agiter ni l'aérer, en laissant le dépôt (la lie) au fond de la cuve.
  3. **Remplir** en laissant environ 1 à 2 cm entre le vin et le futur bouchon.
  4. **Boucher** avec une boucheuse et des bouchons en liège adaptés à la durée de garde.
  5. **Laisser reposer les bouteilles debout** 24 à 48 heures, puis les coucher.
  6. **Finir** : capsule de surbouchage ou cire à cacheter, puis étiquette.`, { source: SAVOIR_FAIRE, liens: [PAGES.miseEnBouteille, PAGES.bouchonsVin] });

r.fait("mise-en-bouteille", "gamme", `
  Pour la mise en bouteille, Duhallé propose :
  - des **bouteilles vides** de 75 cl (bordelaise, bourgogne) ;
  - du matériel de **nettoyage** : goupillons, rince-bouteille, lave-bouteille, égouttoirs ;
  - du matériel de **soutirage** : soutireuse à siphon, kit tireuse, remplisseuse 3 becs, pompe, tuyaux, entonnoirs et filtres ;
  - des **bouchons** en liège et des **boucheuses** manuelles ;
  - des **capsules de surbouchage** et des **étiquettes**.`);

r.fait("mise-en-bouteille", "moment", `
  Mettez votre vin en bouteille quand il est **terminé et stable** : fermentations achevées, mesures ou analyses cohérentes, vin clair après les soutirages et sans dépôt en suspension. L'absence de bulles ne suffit pas à garantir la stabilité ; pour un vin sucré, pétillant ou incertain, demandez l'avis d'un œnologue avant la mise.`, { source: SAVOIR_FAIRE });

r.fait("mise-en-bouteille", "erreur", `
  Les erreurs les plus courantes :
  - des bouteilles mal lavées ou encore humides ;
  - un vin brassé ou trop aéré pendant le soutirage, qui s'oxyde ;
  - des bouteilles trop remplies, où le bouchon comprime le vin ;
  - coucher les bouteilles juste après le bouchage ;
  - des bouchons trop courts pour un vin que l'on veut garder longtemps.`, { source: SAVOIR_FAIRE });

r.fait("mise-en-bouteille", "condition", `
  Travaillez avec du matériel propre et bien rincé, dans un endroit frais et sans odeurs fortes : le vin et le liège prennent facilement les odeurs. Préparez tout le matériel avant de commencer, pour ne pas laisser le vin au contact de l'air. La température doit rester modérée et stable ; corrigez le niveau de remplissage selon la température réelle et évitez de mettre un vin très froid ou très chaud en bouteille sans protocole adapté.`, { source: SAVOIR_FAIRE });

r.fait("mise-en-bouteille", "dimension", `
  Il n'existe pas une température universelle de mise en bouteille. Travaillez à une température **modérée et stable**, cohérente avec le stockage futur et le réglage du niveau, car le liquide se dilate lorsqu'il se réchauffe. Pour un vin sensible ou un procédé professionnel, suivez le protocole œnologique du lot.`, { source: SAVOIR_FAIRE });

r.concept("organisation-mise", "Organisation de la mise en bouteille", ["chaine de mise en bouteille", "organisation a deux", "mise en bouteille a deux personnes", "organiser l embouteillage"], {
  famille: "mise-en-bouteille",
});

r.fait("organisation-mise", "procedure", `
  À deux personnes, organisez un flux sans croisement : bouteilles propres et contrôlées, remplissage, contrôle du niveau, bouchage, contrôle final puis mise debout. Une personne remplit pendant que l'autre bouche et contrôle ; arrêtez la chaîne dès qu'un niveau ou un bouchage devient irrégulier.`, { source: SAVOIR_FAIRE });

r.concept("bouteille-temoin", "Bouteille témoin après la mise", ["bouteille temoin", "echantillon apres mise", "controler un lot embouteille"], {
  famille: "mise-en-bouteille",
});

r.fait("bouteille-temoin", "procedure", `
  Identifiez une ou plusieurs bouteilles témoins représentatives du début, du milieu et de la fin du lot. Notez la date, le contenant, le bouchon et les mesures utiles, puis contrôlez à intervalles définis le niveau, les fuites, la limpidité, la pression éventuelle et l'odeur.`, { source: SAVOIR_FAIRE });

r.concept("niveau-remplissage", "Le niveau de remplissage", ["niveau de remplissage", "remplir la bouteille", "remplissage", "jusqu ou remplir", "espace vide", "vide sous le bouchon", "hauteur de vin", "trop rempli", "trop pleine", "place entre le vin et le bouchon", "espace entre le vin et le bouchon", "distance entre le vin et le bouchon"], {
  famille: "mise-en-bouteille",
  formules: ["niveau de remplissage laisser sous le bouchon", "quel niveau de remplissage laisser sous le bouchon", "remplissage sous le bouchon"],
});

r.fait("niveau-remplissage", "dimension", `
  Avec une bouteille standard, **1 à 2 cm sous le futur bouchon** est un repère courant. Respectez toutefois le niveau prévu par la bouteille et le système de remplissage, à la température de mise : trop pleine, la dilatation peut faire ressortir le bouchon ou provoquer une fuite ; trop peu remplie, l'espace d'air augmente.`, { source: SAVOIR_FAIRE });

r.concept("rendement-bouteilles", "Calcul du nombre de bouteilles", ["nombre de bouteilles", "calculer le nombre de bouteilles", "bouteilles avec 10 litres", "bouteilles avec 20 litres", "bouteilles avec 50 litres"], {
  famille: "mise-en-bouteille",
  formules: ["combien de bouteilles avec 10 litres", "combien de bouteilles avec 20 litres", "combien de bouteilles avec 50 litres", "bouteilles de 75 cl remplit on", "10 20 ou 50 litres"],
});

r.fait("rendement-bouteilles", "dimension", `
  Pour des bouteilles de **75 cl**, divisez le volume disponible par **0,75** : 10 L donnent 13 bouteilles pleines, 20 L en donnent 26 et 50 L en donnent 66, avec un reste. Ce sont des maxima théoriques : prévoyez un peu moins pour le dépôt, l'amorçage du siphon et les pertes de manipulation.`, { source: SAVOIR_FAIRE });

// ─── Les bouteilles ────────────────────────────────────────────────────────

r.concept("bouteille", "Bouteilles vides", ["bouteille", "bouteilles", "bouteille vide", "bouteilles vides", "bouteille en verre", "bordelaise", "bourgogne", "75 cl", "bouteille 75 cl", "flacon"], {
  famille: "mise-en-bouteille",
  lien: PAGES.miseEnBouteille,
  formules: ["bouchon compatible avec ma bouteille", "bouchon est il compatible avec ma bouteille", "compatibilite bouchon bouteille"],
});

r.fait("bouteille", "gamme", `
  Duhallé propose des **bouteilles de vin vides en verre de 75 cl** : bordelaise verte, bordelaise transparente et bourgogne transparente.`, {
  liens: [PAGES.bouteilleBordelaiseVerte, PAGES.bouteilleBordelaiseBlanche, PAGES.bouteilleBourgogne],
});

r.fait("bouteille", "choix", `
  La **bordelaise**, aux épaules marquées, est la forme classique des vins de Bordeaux et de nombreux rouges ; la **bourgogne**, aux épaules tombantes, est traditionnelle pour les vins de Bourgogne et du Rhône. Le **verre teinté** protège mieux le vin de la lumière : un atout pour les vins de garde.`, { source: SAVOIR_FAIRE });

r.fait("bouteille", "dimension", `
  Les bouteilles de vin standard de 75 cl se bouchent avec des bouchons de **24 mm de diamètre** (38 ou 45 mm de long selon la garde). Les bouteilles champenoises se ferment avec des capsules couronne de **29 mm**, les petites bouteilles type bière avec des capsules de **26 mm**.`, { source: SAVOIR_FAIRE });

r.fait("bouteille", "condition", `
  Vous pouvez **réutiliser des bouteilles** de vin si le verre et le goulot ne sont ni ébréchés ni fissurés, qu'aucune odeur ne persiste et que l'intérieur peut être parfaitement nettoyé et contrôlé. Évitez les chocs thermiques : rapprochez progressivement la température du verre de celle de l'eau ou du liquide. Écartez toute bouteille d'origine inconnue pour une boisson sous pression.`, { source: SAVOIR_FAIRE });

r.concept("bouteille-humide", "Bouteille humide avant remplissage", ["bouteille encore humide", "bouteilles humides", "remplir une bouteille mouillee", "eau dans la bouteille"], {
  famille: "bouteille",
  formules: ["remplir des bouteilles encore humides", "mettre en bouteille quand les bouteilles sont humides"],
});

r.fait("bouteille-humide", "condition", `
  Remplissez de préférence des bouteilles **propres, parfaitement égouttées et protégées de la poussière**. Une eau résiduelle ou un produit mal rincé peut diluer ou contaminer le contenu ; si le procédé autorise un assainissement sans rinçage, respectez exactement sa notice et son temps d'égouttage.`, { source: SAVOIR_FAIRE });

r.concept("inertage-bouteilles", "Inertage avant remplissage", ["inertiser les bouteilles", "inertage", "gaz inerte", "azote avant remplissage", "co2 avant remplissage"], {
  famille: "mise-en-bouteille",
});

r.fait("inertage-bouteilles", "condition", `
  L'inertage peut réduire l'oxygène pour un vin sensible, mais il n'est pas systématique et ne remplace ni un soutirage doux ni un niveau de remplissage correct. Le gaz, la dose et le matériel doivent être adaptés au vin et utilisés selon un protocole œnologique ; en cas de doute, faites valider la méthode.`, { source: SAVOIR_FAIRE });

// ─── Nettoyage ─────────────────────────────────────────────────────────────

r.concept("nettoyage-bouteilles", "Nettoyage des bouteilles", ["nettoyage", "nettoyer", "nettoyer les bouteilles", "laver", "laver les bouteilles", "lavage", "rincer", "rincage", "goupillon", "goupillons", "brosse", "brosse a bouteille", "secher les bouteilles", "sterliser les bouteilles", "desinfecter"], {
  famille: "mise-en-bouteille",
  lien: PAGES.nettoyage,
});

r.fait("nettoyage-bouteilles", "procedure", `
  Pour nettoyer vos bouteilles :
  1. Faites-les tremper si elles sont très sales, et retirez les anciennes étiquettes.
  2. Brossez l'intérieur au **goupillon**, ou utilisez un **lave-bouteille à turbine** qui se branche sur l'arrivée d'eau.
  3. Rincez abondamment, par exemple avec un **rince-bouteille**.
  4. Laissez égoutter tête en bas sur un **égouttoir** jusqu'au remplissage.`, { source: SAVOIR_FAIRE, liens: [PAGES.nettoyage] });

r.fait("nettoyage-bouteilles", "moment", `
  Lavez les bouteilles assez tôt pour qu'elles soient contrôlées et égouttées, mais gardez-les ensuite **tête en bas ou protégées de la poussière**. Si elles ont attendu dans un lieu non protégé, rincez ou assainissez-les de nouveau selon le protocole avant la mise.`, { source: SAVOIR_FAIRE, liens: [PAGES.nettoyage] });

r.fait("nettoyage-bouteilles", "duree", `
  Il n'y a pas de délai universel entre lavage et remplissage : une bouteille reste prête seulement tant qu'elle demeure propre, égouttée et protégée. Plus l'attente s'allonge ou l'environnement est exposé, plus un nouveau rinçage ou assainissement selon le protocole devient nécessaire.`, { source: SAVOIR_FAIRE });

r.fait("nettoyage-bouteilles", "condition", `
  N'utilisez pas d'eau de Javel par habitude : vérifiez qu'un produit chloré est autorisé pour l'usage, la concentration, le temps de contact et le rinçage prévus. Ne le mélangez jamais à un acide ou à un autre nettoyant, et préférez un produit alimentaire documenté lorsque la notice du matériel le recommande.`, { source: SAVOIR_FAIRE });

r.concept("sechage-bouteilles", "Séchage hygiénique des bouteilles", ["secher les bouteilles sans recontaminer", "sechage hygienique", "bouteilles apres lavage", "proteger les bouteilles propres"], {
  famille: "nettoyage-bouteilles",
  formules: ["secher les bouteilles sans les recontaminer"],
});

r.fait("sechage-bouteilles", "procedure", `
  Égouttez les bouteilles tête en bas sur un support **propre, lavable et réservé à cet usage**, sans essuyer l'intérieur avec un torchon. Placez-les à l'abri des poussières, éclaboussures et insectes, puis remplissez-les dès que possible.`, { source: SAVOIR_FAIRE, liens: [PAGES.egouttoirHerisson] });

r.concept("etiquettes-anciennes", "Retirer les anciennes étiquettes", ["retirer les anciennes etiquettes", "enlever les etiquettes", "retirer la colle", "enlever la colle des bouteilles"], {
  famille: "nettoyage-bouteilles",
});

r.fait("etiquettes-anciennes", "procedure", `
  Faites tremper l'étiquette dans de l'eau tiède avec un produit compatible avec le verre, retirez le papier avec un grattoir non coupant puis traitez la colle résiduelle avec la méthode indiquée pour l'adhésif. Terminez par un lavage et un rinçage complets ; n'introduisez pas de solvant dans la bouteille.`, { source: SAVOIR_FAIRE });

r.concept("eau-javel-bouteilles", "Eau de Javel pour les bouteilles", ["eau de javel bouteilles", "javel pour nettoyer", "produit chlore bouteilles"], {
  famille: "nettoyage-bouteilles",
  formules: ["utiliser de l eau de javel pour les bouteilles"],
});

r.fait("eau-javel-bouteilles", "condition", `
  N'utilisez un produit chloré que si sa notice l'autorise pour le contact alimentaire, avec la concentration, le temps de contact et le rinçage prescrits. Ne mélangez jamais la Javel à un acide ou à un autre nettoyant et n'improvisez pas son dosage.`, { source: SAVOIR_FAIRE });

r.concept("nettoyage-col-etroit", "Nettoyer un contenant à col étroit", ["nettoyer une dame jeanne", "dame jeanne col etroit", "nettoyer une bonbonne", "nettoyage col etroit"], {
  famille: "nettoyage-bouteilles",
});

r.fait("nettoyage-col-etroit", "procedure", `
  Rincez immédiatement, faites tremper avec un produit compatible puis utilisez une brosse, une chaîne ou un dispositif de nettoyage explicitement prévu pour le contenant, sans choc contre le verre. Rincez complètement, inspectez à la lumière et écartez un récipient impossible à contrôler.`, { source: SAVOIR_FAIRE });

r.concept("hygiene-materiel", "Nettoyer, désinfecter et stériliser", ["nettoyer desinfecter steriliser", "nettoyage desinfection sterilisation", "difference nettoyer desinfecter", "difference desinfecter steriliser", "assainissement du materiel"], {
  famille: "nettoyage-bouteilles",
  lien: PAGES.nettoyage,
});

r.fait("hygiene-materiel", "choix", `
  **Nettoyer** retire les salissures ; **désinfecter** réduit les micro-organismes sur un matériel déjà propre ; **stériliser** correspond à un procédé validé visant leur élimination. Pour les bouteilles et accessoires, employez le terme et le produit réellement prévus par le fabricant : un rinçage visuellement propre n'est pas une stérilisation.`, { source: SAVOIR_FAIRE, liens: [PAGES.nettoyage] });

r.concept("depot-sec-bouteille", "Dépôt sec dans une bouteille", ["depot sec", "depot colle", "salete seche au fond", "bouteille tres sale", "bouteille impossible a nettoyer"], {
  famille: "nettoyage-bouteilles",
  lien: PAGES.nettoyage,
});

r.fait("depot-sec-bouteille", "procedure", `
  Pour un dépôt sec, faites tremper avec un **produit compatible avec le contact alimentaire**, puis utilisez un goupillon ou un lave-bouteille adapté. Rincez selon la notice et inspectez le fond à la lumière. Si le dépôt, une odeur ou une zone inaccessible persiste, écartez la bouteille plutôt que de risquer de contaminer le lot.`, { source: SAVOIR_FAIRE, liens: [PAGES.nettoyage] });

r.concept("produit-nettoyage-bouteilles", "Produits de nettoyage des bouteilles", ["produit pour laver les bouteilles", "produit de nettoyage bouteille", "produit sans odeur", "desinfectant bouteille", "produit contact alimentaire"], {
  famille: "nettoyage-bouteilles",
  lien: PAGES.nettoyage,
  formules: ["rincer apres un desinfectant", "rincer apres le desinfectant", "rincer apres un produit desinfectant", "sans rincage"],
});

r.fait("produit-nettoyage-bouteilles", "choix", `
  Choisissez un produit explicitement prévu pour le **contact alimentaire** et pour la salissure à retirer. Respectez le dosage, la température et le temps de contact inscrits sur l'étiquette ; évitez les produits parfumés ou improvisés, qui peuvent laisser une odeur dans le verre.`, { source: SAVOIR_FAIRE, liens: [PAGES.nettoyage] });

r.fait("produit-nettoyage-bouteilles", "condition", `
  Le rinçage après désinfection dépend du produit et de sa concentration. Suivez exactement la mention **« avec rinçage » ou « sans rinçage »** de l'étiquette : n'improvisez jamais un non-rinçage et ne mélangez pas plusieurs produits.`, { source: SAVOIR_FAIRE });

r.fait("nettoyage-bouteilles", "gamme", `
  Matériel de nettoyage Duhallé :
  - **goupillons** : modèle standard (tige inox, poils nylon) et grand modèle de 49 x 7 cm ;
  - **rince-bouteille** manuel pour goulots de 15 mm, pour laver, rincer, assainir ou aviner les bouteilles ;
  - **lave-bouteille à turbine** fonctionnant avec la pression de l'eau, et sa brosse inox de rechange ;
  - **égouttoirs** : colonne 80 places pour bordelaises de 75 cl, et hérisson métal 100 bouteilles.`, {
  source: PAGES.nettoyage.url,
  liens: [PAGES.goupillon, PAGES.rinceBouteille, PAGES.egouttoirHerisson],
});

r.fait("rince-bouteille", "procedure", `
  Pour **aviner** une bouteille : versez-y un peu du vin que vous allez embouteiller, agitez pour en imprégner les parois, videz, puis remplissez aussitôt. Le rince-bouteille permet de le faire rapidement : on remplit sa cuve de vin et on appuie chaque bouteille sur le jet.`, { source: SAVOIR_FAIRE, liens: [PAGES.rinceBouteille] });

r.concept("egouttoir", "Égouttoir à bouteilles", ["egouttoir", "egouttoirs", "egoutter", "herisson", "egouttoir herisson", "egouttoir colonne", "arbre a bouteilles", "sechoir a bouteilles"], {
  famille: "nettoyage-bouteilles",
  lien: PAGES.egouttoirHerisson,
});

r.fait("egouttoir", "gamme", `
  Deux égouttoirs pour sécher les bouteilles tête en bas après lavage : l'**égouttoir hérisson** en métal pour 100 bouteilles, et l'**égouttoir colonne** 80 places pour bordelaises de 75 cl.`, {
  source: PAGES.nettoyage.url,
  liens: [PAGES.egouttoirHerisson, PAGES.egouttoirColonne],
});

r.fait("egouttoir", "entretien", `
  Nettoyez régulièrement l'égouttoir avant d'y poser des bouteilles propres : retirez les dépôts, lavez avec un produit compatible, rincez et laissez sécher. Écartez une tige rouillée, écaillée ou difficile à nettoyer.`, { source: SAVOIR_FAIRE });

r.concept("rince-bouteille", "Rince-bouteille", ["rince bouteille", "rince bouteilles", "rinceur", "aviner", "avinage", "laveuse", "lave bouteille a turbine", "turbine"], {
  famille: "nettoyage-bouteilles",
  lien: PAGES.rinceBouteille,
});

r.fait("rince-bouteille", "usage", `
  Le **rince-bouteille** manuel s'adapte aux goulots de 15 mm : en appuyant la bouteille dessus, un jet lave l'intérieur. Il sert à rincer, assainir ou **aviner** les bouteilles (les rincer avec un peu de vin avant de les remplir). Pour les bouteilles très sales, le **lave-bouteille à turbine** brosse l'intérieur grâce à la pression de l'eau.`, {
  source: PAGES.nettoyage.url,
  liens: [PAGES.rinceBouteille, PAGES.laveBouteille],
});

r.fait("rince-bouteille", "entretien", `
  Après usage, videz et rincez la cuve, actionnez le mécanisme avec de l'eau propre puis laissez sécher démonté si la notice le permet. Contrôlez le ressort, le joint et la buse ; remplacez toute pièce fissurée ou encrassée.`, { source: SAVOIR_FAIRE, liens: [PAGES.rinceBouteille] });

r.fait(["egouttoir", "rince-bouteille"], "choix", `
  Nettoyez les deux avant d'y remettre des bouteilles propres : l'égouttoir se lave, se rince et sèche complètement ; le rince-bouteille se vide, se rince puis s'actionne à l'eau propre. Contrôlez corrosion, dépôts, buse, ressort et joints avant réutilisation.`, { source: SAVOIR_FAIRE, liens: [PAGES.egouttoirHerisson, PAGES.rinceBouteille] });

r.concept("goupillon-usure", "Usure du goupillon", ["remplacer un goupillon", "goupillon use", "goupillon sale", "changer de goupillon"], {
  famille: "nettoyage-bouteilles",
});

r.fait("goupillon-usure", "moment", `
  Remplacez le goupillon lorsque les poils sont écrasés ou manquants, que la tige rouille, qu'une odeur ou un dépôt persiste après nettoyage, ou qu'il n'atteint plus correctement les parois. Rincez-le et faites-le sécher après chaque série.`, { source: SAVOIR_FAIRE, liens: [PAGES.goupillon] });

// ─── Soutirage ─────────────────────────────────────────────────────────────

r.concept("soutirage", "Le soutirage", ["soutirage", "soutirer", "soutireuse", "siphon", "siphonner", "transvaser", "tireuse", "tireuse a vin", "pompe a vin", "tuyau", "tuyau de soutirage", "entonnoir", "remplisseuse", "canne de soutirage", "robinet de soutirage"], {
  famille: "mise-en-bouteille",
  lien: PAGES.soutirage,
  voirAussi: ["filtre-vin"],
});

r.fait("soutirage", "definition", `
  **Transvaser** signifie déplacer un liquide. Le **soutirage** est un transvasement contrôlé qui laisse le dépôt au fond et limite l'air ; la **mise en bouteille** est l'étape finale de remplissage des bouteilles avant fermeture.`, { source: SAVOIR_FAIRE });

r.concept("operations-transfert", "Soutirage, transvasement et mise en bouteille", ["soutirage transvasement mise en bouteille", "difference entre soutirage et transvasement", "transvaser ou soutirer"], {
  famille: "mise-en-bouteille",
});

r.fait("operations-transfert", "choix", `
  **Transvaser** est le terme général pour déplacer un liquide. **Soutirer** ajoute l'objectif de laisser le dépôt et de limiter l'air. **Mettre en bouteille** remplit le contenant final au niveau prévu, juste avant la fermeture.`, { source: SAVOIR_FAIRE });

r.fait("soutirage", "gamme", `
  Matériel de soutirage Duhallé :
  - **soutireuse à siphon automatique** (tuyau de 130 cm) pour remplir les bouteilles depuis un fût ou une dame-jeanne ;
  - **kit tireuse pistolet** réglable avec tuyau de 2 m ;
  - **remplisseuse manuelle 3 becs** inox, qui remplit par gravité en limitant l'oxydation ;
  - **pompe à vin manuelle** à amorçage automatique, pour vins, jus, cidres et sirops ;
  - **tuyaux** silicone de 2 et 3 m ;
  - **entonnoir à arrêt automatique** avec filtre, et **filtres** papier.`, {
  source: PAGES.soutirage.url,
  liens: [PAGES.soutireuseSiphon, PAGES.kitTireuse, PAGES.remplisseuse3Becs],
});

r.fait("soutirage", "choix", `
  Pour quelques dizaines de bouteilles, une **soutireuse à siphon automatique** ou un **kit tireuse pistolet** suffisent. Pour des volumes plus importants, la **remplisseuse 3 becs** remplit trois bouteilles à la fois par gravité. La **pompe manuelle** sert à transvaser d'un contenant à l'autre. L'**entonnoir à arrêt automatique** évite les débordements, mais il est réservé aux vins tranquilles et boissons plates.`, {
  source: PAGES.soutirage.url,
  liens: [PAGES.soutireuseSiphon, PAGES.remplisseuse3Becs, PAGES.pompeSoufflet],
});

r.fait("soutirage", "procedure", `
  Pour soutirer sans aérer le vin :
  1. Placez le contenant plein **en hauteur** et les bouteilles plus bas.
  2. Plongez le tuyau dans le vin **sans toucher la lie** au fond.
  3. Amorcez avec une **poire, un siphon automatique ou une pompe alimentaire** : n'aspirez jamais à la bouche.
  4. Remplissez en gardant l'extrémité du tuyau **au fond de la bouteille**, pour éviter les éclaboussures et l'oxydation.`, { source: SAVOIR_FAIRE });

r.fait("soutirage", "erreur", `
  Un siphon s'arrête si le récipient d'arrivée n'est plus assez bas, si de l'air entre par un raccord, si le tuyau est pincé ou si la canne aspire la lie. Vérifiez le dénivelé, réamorcez avec un dispositif hygiénique et ne compensez jamais en aspirant à la bouche.`, { source: SAVOIR_FAIRE });

r.concept("nettoyage-tuyau", "Nettoyer un tuyau de soutirage", ["nettoyer un tuyau", "nettoyer l interieur du tuyau", "laver un tuyau de soutirage", "laver le siphon", "nettoyer apres soutirage", "laver le materiel apres soutirage"], {
  famille: "soutirage",
});

r.fait("nettoyage-tuyau", "procedure", `
  Juste après usage, faites circuler de l'eau puis le produit compatible prévu par sa notice dans toute la longueur du tuyau, respectez le temps de contact, rincez si nécessaire et suspendez-le pour l'égoutter. Remplacez-le s'il reste opaque, collant, craquelé ou odorant.`, { source: SAVOIR_FAIRE });

r.concept("arret-remplissage", "Arrêt automatique du remplissage", ["arret automatique du remplissage", "arreter au bon niveau", "entonnoir a arret automatique", "remplissage automatique niveau"], {
  famille: "soutirage",
  lien: PAGES.entonnoirArret,
  // « le niveau se règle tout seul ? » : « régler » est aussi le mot du paiement ; ici, il s'agit du niveau.
  exclusif: true,
  formules: ["niveau se fait tout seul", "niveau se fait seul", "niveau se regle tout seul", "niveau se regle seul", "regle le niveau tout seul", "se met au niveau", "niveau automatique", "s arrete tout seul", "s arrete automatiquement", "s arrete de lui meme", "remplit tout seul", "arret automatique"],
});

const NIVEAU_AUTOMATIQUE = `
  Cela dépend de l'appareil. Avec un **entonnoir à arrêt automatique** ou une **remplisseuse**, le remplissage s'arrête de lui-même au niveau réglé : le liquide cesse de couler quand il atteint l'embout. Avec un simple tuyau ou un siphon sans arrêt, c'est à vous de fermer au bon moment. Vérifiez sur la fiche de l'appareil que l'arrêt est automatique, réglez-le avec la bouteille exacte de la série et faites un essai avant de lancer le lot.`;

for (const aspect of ["definition", "condition", "choix", "raison", "usage", "gamme"] as const) {
  r.fait("arret-remplissage", aspect, NIVEAU_AUTOMATIQUE, { source: SAVOIR_FAIRE, liens: [PAGES.entonnoirArret, PAGES.remplisseuse3Becs] });
}

r.fait("arret-remplissage", "procedure", `
  Utilisez un entonnoir à arrêt automatique ou une remplisseuse réglée au niveau voulu, puis faites un essai avec la bouteille exacte. Gardez l'appareil vertical, vérifiez l'absence de mousse et contrôlez régulièrement le niveau pendant la série.`, { source: SAVOIR_FAIRE, liens: [PAGES.entonnoirArret, PAGES.remplisseuse3Becs] });

r.concept("pertes-soutirage", "Pertes pendant le soutirage", ["pertes au soutirage", "marge de perte", "fond de cuve", "limiter les pertes", "reste dans la cuve"], {
  famille: "soutirage",
});

r.fait("pertes-soutirage", "dimension", `
  Il n'existe pas de pourcentage de perte universel : il dépend du dépôt, de la forme de la cuve et du matériel. Mesurez le volume avant et après un premier soutirage, puis utilisez cette perte réelle pour prévoir les bouteilles du lot suivant. N'aspirez pas la lie pour gagner les derniers centilitres.`, { source: SAVOIR_FAIRE });

r.fait("pertes-soutirage", "procedure", `
  Laissez le dépôt se tasser, inclinez très progressivement le contenant seulement si cela ne remet pas la lie en suspension, et placez la prise juste au-dessus du dépôt. Arrêtez dès que le liquide se trouble.`, { source: SAVOIR_FAIRE });

r.concept("tuyau-alimentaire", "Tuyau alimentaire de soutirage", ["tuyau alimentaire", "choix du tuyau alimentaire", "diametre du tuyau", "longueur du tuyau", "tuyau pour le vin", "tuyau silicone", "tuyau de transfert"], {
  famille: "soutirage",
  lien: PAGES.soutirage,
});

r.fait("tuyau-alimentaire", "choix", `
  Choisissez un tuyau déclaré apte au **contact alimentaire**, de diamètre compatible avec la canne, la pompe et les raccords. Sa longueur doit permettre le dénivelé sans boucle ni pincement ; vérifiez aussi sa résistance au produit de nettoyage et remplacez-le s'il devient craquelé, opaque ou odorant.`, { source: SAVOIR_FAIRE, liens: [PAGES.soutirage] });

r.concept("filtre-vin", "Filtration du vin", ["filtre", "filtres", "filtrer", "filtrer le vin", "filtration", "filtre papier", "vin trouble", "clarifier"], {
  famille: "soutirage",
  lien: PAGES.filtres,
});

r.fait("filtre-vin", "dimension", `
  Les **filtres à vin** Duhallé sont des filtres papier plissés de **40 cm de diamètre** (épaisseur 190 micromètres, filtration de 4 à 7 microns), vendus par 10. Ils s'adaptent aux entonnoirs.`, { source: PAGES.soutirage.url, liens: [PAGES.filtres, PAGES.entonnoirArret] });

// « Les filtres pour vin sont-ils lavables ? » : des filtres papier plissés, donc à usage unique. Un concept à part et un fait
// croisé : sur le filtre seul, ce fait volerait la réponse à « faut-il filtrer son vin ? ».
r.concept("lavabilite", "Lavable ou réutilisable", ["lavable", "lavables", "reutilisable", "reutilisables", "reutiliser", "usage unique", "jetable", "jetables"], {
  famille: "catalogue",
});

const FILTRES_A_USAGE_UNIQUE = `
  Les **filtres à vin** Duhallé sont des **filtres papier plissés** (40 cm de diamètre, vendus par 10) : en papier, ils sont **à usage unique**. Chargé de particules, un filtre se colmate et un lavage le déchire ou le rend moins efficace ; prévoyez un filtre neuf pour chaque filtration, ou dès que l'écoulement ralentit nettement.`;

for (const aspect of ["condition", "entretien", "raison", "choix", "definition", "usage", "procedure"] as const) {
  r.fait(["filtre-vin", "lavabilite"], aspect, FILTRES_A_USAGE_UNIQUE, { source: PAGES.soutirage.url, liens: [PAGES.filtres, PAGES.entonnoirArret] });
}

r.fait("filtre-vin", "usage", `
  Filtrer permet de retirer les dernières particules en suspension avant la mise en bouteille. Un vin bien soutiré, limpide et stable n'a pas toujours besoin d'être filtré ; un vin trouble ou microbiologiquement incertain demande d'abord un diagnostic, car la filtration et sa finesse dépendent du style et de la stabilité recherchés.`, { source: SAVOIR_FAIRE });

r.concept("depot-bouteille", "Dépôt après la mise en bouteille", ["depot apres mise en bouteille", "depot apres embouteillage", "depot dans le vin", "depot dans mes bouteilles", "cristaux dans la bouteille", "lie dans la bouteille", "bouteille trouble apres remplissage"], {
  famille: "mise-en-bouteille",
  voirAussi: ["filtre-vin", "soutirage"],
});

r.fait("depot-bouteille", "raison", `
  Un dépôt peut être une lie naturelle, des **cristaux tartriques** ou le signe d'un trouble en évolution. Observez sa forme, la limpidité, l'odeur, le goût et le moment d'apparition : si le vin devient gazeux, trouble ou présente une odeur anormale, ne concluez pas à un simple dépôt et demandez un avis œnologique.`, { source: SAVOIR_FAIRE });

r.concept("refermentation-bouteille", "Reprise de fermentation en bouteille", ["reprise de fermentation", "refermentation", "fermentation en bouteille", "vin qui refermente", "eviter la fermentation en bouteille", "vin qui devient gazeux", "vin qui petille apres embouteillage"], {
  famille: "mise-en-bouteille",
});

r.fait("refermentation-bouteille", "condition", `
  Pour éviter une reprise de fermentation, mettez en bouteille seulement un vin dont les fermentations sont **terminées et la stabilité vérifiée** par les mesures ou analyses adaptées. L'absence de bulles ne suffit pas ; sucre résiduel, levures actives ou température plus élevée peuvent relancer la fermentation. En cas de doute, faites valider le lot par un œnologue.`, { source: SAVOIR_FAIRE });

// ─── Œnologie : fûts, soufre, mesure ───────────────────────────────────────

r.concept("contenant", "Fûts et dames-jeannes", ["fut", "futs", "tonneau", "tonneaux", "barrique", "bonbonne", "bonbonnes", "dame jeanne", "dames jeannes", "damejeanne", "marie jeanne", "maries jeannes", "mariejeanne", "cuve", "fut plastique", "fut alimentaire", "futaille"], {
  famille: "vin",
  lien: PAGES.futs,
  voirAussi: ["bonde", "oenologie"],
  // « une dame de 20 L », « besoin des dames », « dame Jane » : le nom est souvent raccourci ou écorché.
  // Pas « la dame » ni « une dame » : « la dame au téléphone » parle d'une personne.
  formules: ["des dames", "les dames", "mes dames", "ces dames", "dame jane", "dames jane", "dame jeane", "dame de 5 l", "dame de 10 l", "dame de 15 l", "dame de 20 l", "dame de 25 l",
    // « bouchon de dame-jeanne » est un alias de la bonde, qui avalerait la dame-jeanne : le contenant reste cité.
    ...["dame jeanne", "bonbonne", "marie jeanne"].flatMap((c) => ["bouchon pour", "bouchon de", "bouchon pour la", "bouchon pour une", "bonde pour"].map((d) => `${d} ${c}`))],
});

r.fait("contenant", "gamme", `
  Pour stocker et faire fermenter :
  - des **dames-jeannes** (bonbonnes) en verre transparent à entourage plastique, de 2 à 25 L : 5, 10, 15, 20 et 25 L à col fin, 5, 10, 15 et 20 L à col large, et une dame-jeanne de 2 L à col à vis ;
  - des **fûts alimentaires blancs translucides** de 5 à 100 L, fabriqués en Italie, livrés avec leur robinet et leur couvercle ;
  - des **fûts de macération bleus** à large ouverture (30, 120 et 220 L).

  Pour fermer une dame-jeanne à la main, choisissez une **bonde en liège** adaptée au diamètre du col.`, {
  source: PAGES.futs.url,
  liens: [PAGES.bonbonne20, PAGES.futs, PAGES.bondes],
});

r.fait("contenant", "entretien", `
  Pour entretenir un fût : le **rince-fût** assainit, rénove et dérougit la futaille (dose pour un fût de 110 L), et le **suiffeur**, un mastic d'étanchéité blanc de 400 g, colmate les fuites des fûts et tonneaux. Entre deux utilisations, un fût vide se conserve propre, sec et assaini (par exemple avec une mèche soufrée).`, {
  source: PAGES.oenologie.url,
  liens: [PAGES.rinceFut, PAGES.suiffeur],
});

// ─── Les cols des dames-jeannes ────────────────────────────────────────────

r.concept("col-dame-jeanne", "Col des dames-jeannes", ["col de la dame jeanne", "goulot de la dame jeanne", "col de la bonbonne", "goulot de la bonbonne", "diametre du col de la dame jeanne", "col des dames jeannes"], {
  famille: "contenant",
  voirAussi: ["bonde", "barboteur"],
});

/** Relevé le 12/10/2026 sur les fiches des dames-jeannes du site : à faire valider par Duhallé (voir README). */
const BONDE_DE_DAME_JEANNE = `
  Une bonde doit s'enfoncer sans forcer : son petit diamètre doit être inférieur au diamètre intérieur du col, son grand diamètre supérieur. Mesurez donc le diamètre intérieur réel au pied à coulisse (les bondes vont de 28/24 à 120/115 mm).

  Pour les dames-jeannes Duhallé (verre transparent, entourage plastique), l'ouverture mesure environ **3,9 cm** pour les modèles de 15, 20 et 25 L à col fin, **3,5 cm** pour la 10 L, **2,8 cm** pour la 5 L et **11,7 cm** pour les modèles à col large (bonde **120/115 mm**). La dame-jeanne de **2 L** a un col à vis de 22 mm : elle se ferme avec son bouchon à vis, car la plus petite bonde (28/24 mm) est trop large. Pour un col annoncé à 3,9 cm, la bonde **38/34 mm** convient aux cols de 34 à 38 mm, la **45/40 mm** à ceux de 40 à 45 mm ; entre les deux, ou en cas de doute, demandez conseil au service client au **${TELEPHONE}**.`;

for (const aspect of ["definition", "dimension", "choix"] as const) {
  r.fait("col-dame-jeanne", aspect, BONDE_DE_DAME_JEANNE, { source: PAGES.futs.url, liens: [PAGES.futs, PAGES.bondes, PAGES.contact] });
}

// « Quelle bonde pour ma dame-jeanne de 20 L ? » cite la bonde ET le contenant : ce fait croisé passe devant les faits généraux de la bonde.
for (const aspect of ["choix", "dimension"] as const) {
  r.fait(["bonde", "contenant"], aspect, BONDE_DE_DAME_JEANNE, { source: PAGES.futs.url, liens: [PAGES.futs, PAGES.bondes, PAGES.contact] });
}

// ─── Robinets de fûts ──────────────────────────────────────────────────────

r.concept("robinet-fut", "Robinet de fût alimentaire", ["robinet plastique", "robinets plastique", "robinet de fut", "robinets de fut", "robinet pour fut", "robinet du fut", "robinet fut", "robinet fut plastique", "robinet fut alimentaire"], {
  famille: "contenant",
  lien: PAGES.futs,
});

const FUT_AVEC_SON_ROBINET = `
  Oui : les **fûts alimentaires blancs** Duhallé (de 5 à 100 L) sont livrés avec leur **robinet de soutirage**, placé à la base du fût, et avec leur couvercle. Le robinet se dévisse pour être nettoyé ; en cas de perte ou de casse, un robinet plastique de rechange se vend à part.`;

// « Le fût de 50 litres est-il vendu avec un robinet ? » cite le robinet livré ET le fût : ce fait croisé passe devant la réponse sur le vinaigrier.
for (const aspect of ["definition", "condition", "gamme"] as const) {
  r.fait(["robinet-fourni", "contenant"], aspect, FUT_AVEC_SON_ROBINET, { source: PAGES.futs.url, liens: [PAGES.futs] });
  r.fait(["robinet-fourni", "robinet-fut"], aspect, FUT_AVEC_SON_ROBINET, { source: PAGES.futs.url, liens: [PAGES.futs] });
}

r.concept("couvercle-fut", "Couvercle de fût alimentaire", ["couvercle de fut", "couvercle pour fut", "couvercle du fut", "couvercles de futs", "couvercle fut"], {
  famille: "contenant",
  exclusif: true,
  lien: PAGES.futs,
});

/** Fiches relevées le 12/10/2026 : les volumes compatibles de certaines fiches se contredisent, la réponse le dit. */
const COUVERCLE_DE_FUT = `
  Les couvercles des **fûts alimentaires blancs** se rachètent à part, avec leur bouchon : un modèle pour les fûts de **5 à 25 L** (environ 12 cm de diamètre) et un autre pour les fûts de **25, 50 et 100 L** (environ 20 cm). Les fiches ne sont pas d'accord entre elles sur les volumes compatibles : vérifiez avant de commander, ou demandez au service client au **${TELEPHONE}** ou à **${EMAIL}**. Il existe aussi un couvercle pour le fût de macération bleu de 30 L.`;

for (const aspect of ["definition", "gamme", "dimension", "choix", "condition"] as const) {
  r.fait("couvercle-fut", aspect, COUVERCLE_DE_FUT, { source: PAGES.futs.url, liens: [PAGES.futs, PAGES.contact] });
}

const ROBINET_DE_FUT = `
  Pour les **fûts alimentaires blancs** Duhallé, le robinet plastique se rachète à part (pièce détachée) : un modèle pour les fûts de **5, 10, 15 et 20 L**, un autre pour les fûts de **25 et 50 L** (la fiche de ce dernier annonce aussi le 100 L : vérifiez avant de commander). Les fûts de 5 à 100 L sont déjà livrés avec leur robinet.

  Pour les **fûts de macération**, le robinet existe en deux tailles : le **petit robinet** mesure **4,2 cm** de diamètre et le **grand robinet 4,8 cm** (cotes données par l'équipe Duhallé le 12/10/2026). Le modèle adapté à chaque fût est indiqué sur sa fiche ; en cas de doute, précisez la référence au service client, au **${TELEPHONE}** ou à **${EMAIL}**. Pour les fûts en bois, Duhallé propose aussi des robinets en bois de frêne (6 pouces et 7½ pouces), dont le diamètre est indiqué sur la fiche de chaque robinet.`;

// Pas d'aspect « choix » : il ferait revenir, sur une question de diamètre, le choix du robinet de vinaigrier.
for (const aspect of ["gamme", "dimension", "condition", "definition"] as const) {
  r.fait("robinet-fut", aspect, ROBINET_DE_FUT, { source: PAGES.futs.url, liens: [PAGES.futs, PAGES.contact] });
}

// « Robinet de rechange pour mon fût » cite aussi le choix du robinet de vinaigrier (« rechange ») : ce fait croisé passe devant.
for (const aspect of ["choix", "gamme", "definition"] as const) {
  r.fait(["choix-robinet", "robinet-fut"], aspect, ROBINET_DE_FUT, { source: PAGES.futs.url, liens: [PAGES.futs, PAGES.contact] });
}

r.concept("barboteur", "Barboteur de fermentation", ["barboteur", "barboteurs", "bouchon barboteur", "bouchons barboteurs", "bouchon de barboteur", "bouchon avec barboteur", "bouchon pour barboteur", "bulleur", "bonde de fermentation", "bonde a eau", "bonde hydraulique", "sas de fermentation", "fermeture hydraulique", "soupape de fermentation", "airlock"], {
  // Au même niveau que le contenant (et non dessous) : une question sur « la marie-jeanne avec le barboteur » cite les deux.
  famille: "vin",
  voirAussi: ["contenant", "bonde"],
});

r.fait("barboteur", "definition", `
  Le **barboteur** (ou sas de fermentation) est un petit dispositif rempli d'eau qui laisse **sortir le gaz carbonique** produit par la fermentation sans laisser **entrer l'air**. Il se pose sur une dame-jeanne ou un fût, dans une bonde percée prévue pour lui.`, { source: SAVOIR_FAIRE });

const DIAMETRE_DU_BARBOTEUR = `
  Le barboteur n'est pas lié au goulot : c'est la **bonde** qui doit correspondre au col (bondes de 28/24 à 120/115 mm), et le barboteur se monte dans une bonde **percée** à son diamètre. D'après sa fiche, le barboteur Duhallé convient aux contenants de **1 à 50 litres** ; son diamètre est de **9 mm** sans joint et de **1,4 cm** avec joint. Pour une dame-jeanne de 15 à 25 L, dont le col mesure environ 3,9 cm, ou pour un fût, demandez au service client la bonde adaptée : **${TELEPHONE}** ou **${EMAIL}**. Les fûts alimentaires blancs ont leur propre barboteur, qui se loge dans la petite ouverture du couvercle (vendu à part).`;

for (const aspect of ["dimension", "choix"] as const) {
  r.fait("barboteur", aspect, DIAMETRE_DU_BARBOTEUR, { source: SAVOIR_FAIRE, liens: [PAGES.bondes, PAGES.contact] });
}

r.fait("barboteur", "duree", `
  Le barboteur reste en place pendant toute la **fermentation active** : tant que des bulles sortent régulièrement. Quand elles s'espacent puis s'arrêtent pendant plusieurs jours, la fermentation est terminée : vous pouvez alors soutirer, puis fermer le contenant avec une bonde pleine. Gardez de l'eau propre dans le barboteur et contrôlez son niveau.`, { source: SAVOIR_FAIRE });

r.fait("barboteur", "condition", `
  Le barboteur ne sert que pendant une **fermentation**, car il évacue le gaz qu'elle produit. Pour une simple **macération de fruits dans de l'alcool**, il n'y a pas de fermentation : une bonde pleine, ou un couvercle étanche, suffit.`, { source: SAVOIR_FAIRE });

r.fait("contenant", "condition", `
  Oui, une **dame-jeanne** convient pour faire **fermenter** ou **stocker** du vin. Pendant la fermentation, ne la remplissez pas à ras bord (**trois quarts au plus**, pour la mousse) et fermez-la avec une bonde percée équipée d'un **barboteur**, jamais hermétiquement. Une fois la fermentation terminée, remplissez-la à ras pour limiter l'air, puis fermez avec une **bonde pleine**. Le bouchon en plastique livré avec une dame-jeanne n'est pas étanche : ne l'utilisez pas pour la fermentation (risque d'oxydation), préférez une bonde en liège.`, { source: SAVOIR_FAIRE, liens: [PAGES.bonbonne20, PAGES.bondes] });

// « Le col est-il parfaitement droit ? Le bouchon en silicone remonte » : la forme exacte du col n'est pas dans les fiches ;
// la bonde en liège percée tient par serrage, comme pour toute bonde.
r.concept("pose-barboteur", "Poser un barboteur sur une dame-jeanne", ["pose d un barboteur", "pose du barboteur", "bouchon en silicone", "bouchon silicone", "bouchon en sicilone", "col parfaitement droit", "col droit"], {
  famille: "barboteur",
  exclusif: true,
});

const POSE_DU_BARBOTEUR = `
  Les fiches ne précisent pas si le col de chaque dame-jeanne est **parfaitement droit** : je ne peux pas vous le garantir. Un barboteur se pose sur une **bonde en liège percée**, qui tient par serrage : son petit diamètre doit être inférieur au diamètre intérieur du col et son grand diamètre supérieur (**mesurez le col** au pied à coulisse). Un bouchon qui **remonte** est le plus souvent trop petit pour le col, ou poussé par la pression du gaz de la fermentation : prenez une bonde un peu plus large, enfoncez-la franchement et vérifiez qu'elle tient avant de remplir. En cas de doute sur le col de votre dame-jeanne, contactez le service client au **${TELEPHONE}** ou à **${EMAIL}** avec le diamètre mesuré.`;

for (const aspect of ["condition", "procedure", "choix", "dimension", "erreur", "raison", "definition"] as const) {
  r.fait("pose-barboteur", aspect, POSE_DU_BARBOTEUR, { source: SAVOIR_FAIRE, liens: [PAGES.futs, PAGES.bondes, PAGES.contact] });
}

r.concept("barboteur-silencieux", "Barboteur qui ne bulle plus", ["barboteur qui ne bulle plus"], {
  famille: "barboteur",
  formules: ["ne bulle plus", "bulle plus", "ne barbote plus", "plus de bulles", "n a plus de bulles", "arret des bulles", "ne fait plus de bulles"],
});

// « definition » (question sans marque) et « raison » (« pourquoi ») suffisent : un énoncé répété dans d'autres aspects laisserait entrer des faits voisins.
for (const aspect of ["definition", "raison"] as const) {
  r.fait("barboteur-silencieux", aspect, `
    Un barboteur qui **ne bulle plus** signifie le plus souvent que la fermentation est **terminée**. Si vous la croyez inachevée (vin encore sucré, mise en route récente), elle est peut-être **bloquée** : température trop basse, moût trop sucré ou levures épuisées. Vérifiez aussi l'**étanchéité de la bonde** : s'il y a une fuite d'air, le gaz ne passe plus par le barboteur. Contrôlez la densité avant de soutirer.`, { source: SAVOIR_FAIRE });
}

// Rattaché aux aspects « procédure » et « condition » : « faut-il un barboteur pour faire du cidre ? » se lit comme une procédure.
for (const aspect of ["procedure", "condition"] as const) {
  r.fait(["cidre", "barboteur"], aspect, `
  Pour le cidre en dame-jeanne ou en fût, un **barboteur** est utile pendant la fermentation : il laisse sortir le gaz sans laisser entrer l'air. Ne fermez **jamais hermétiquement** un contenant qui fermente : la pression peut le faire éclater. Retirez le barboteur quand les bulles s'arrêtent.`, { source: SAVOIR_FAIRE });
}

r.fait(["contenant", "barboteur"], "condition", `
  Oui, une **dame-jeanne (marie-jeanne) en verre** convient pour faire fermenter ou macérer des fruits. Ne la remplissez pas à ras bord : **trois quarts au plus**, car la mousse et les fruits montent. Pendant la **fermentation**, fermez-la avec une bonde percée équipée d'un **barboteur**, et laissez-le en place jusqu'à l'arrêt des bulles. Pour une simple **macération dans de l'alcool**, aucun barboteur : une bonde pleine suffit.`, { source: SAVOIR_FAIRE, liens: [PAGES.bonbonne20, PAGES.bondes] });

r.concept("maceration-fruits", "Macération de fruits", ["macerer", "macerent", "macere"], {
  famille: "vin",
  voirAussi: ["barboteur", "contenant"],
  formules: ["macerer les fruits", "macerer des fruits", "faire macerer", "maceration de fruits", "maceration des fruits", "fruits dans l alcool", "fruits a l alcool", "fruits dans du verre", "fruits dans une dame jeanne", "liqueur de fruits", "faire une liqueur", "faire de la liqueur", "fruits a l eau de vie", "cerises a l eau de vie", "fruits dans l eau de vie"],
});

r.fait("maceration-fruits", "procedure", `
  Pour faire macérer des fruits dans l'alcool, une **dame-jeanne (marie-jeanne) en verre propre** convient très bien, de préférence à large ouverture. Mettez des fruits **sains, lavés et bien séchés**, entièrement couverts d'alcool, sans remplir à ras bord. Fermez avec une **bonde pleine** ou un couvercle étanche, conservez à l'abri de la lumière et remuez de temps en temps. Il n'y a pas de fermentation : **aucun barboteur** n'est nécessaire. Pour une liqueur, on filtre ensuite la macération et on ajoute un sirop de sucre, selon la recette.`, { source: SAVOIR_FAIRE, liens: [PAGES.bonbonne20, PAGES.bondes] });

r.fait("maceration-fruits", "duree", `
  La durée d'une macération dépend de la **recette** : de quelques semaines à plusieurs mois, le contenant restant fermé. Le **barboteur** n'a d'utilité que si les fruits **fermentent** (avec du sucre et des levures, par exemple) : on le laisse alors jusqu'à l'arrêt des bulles. Pour une macération dans l'alcool, vous n'en avez pas besoin.`, { source: SAVOIR_FAIRE });

r.concept("distillation", "Distillation et eaux-de-vie", ["distillation", "distiller", "distillerie", "alambic", "alambics", "schnaps", "gnole", "bouilleur de cru"], {
  famille: "catalogue",
  formules: ["faire de l eau de vie", "faire son eau de vie", "faire mon eau de vie", "fabriquer de l eau de vie", "produire de l eau de vie", "faire de la gnole", "faire sa gnole", "faire de l alcool", "faire son alcool", "produire de l alcool"],
});

// Un seul énoncé, rattaché à « condition » (mise en garde) et à « gamme » (« vendez-vous des alambics ? ») :
// le moteur ne l'affiche qu'une fois.
const SUR_LA_DISTILLATION = `
  En France, la **distillation à domicile est interdite sans autorisation** de l'administration des douanes : je ne peux donc ni vous conseiller sur la distillation, ni vous présenter de matériel pour cela. En revanche, je peux vous renseigner sur la fermentation des fruits, leur macération dans l'alcool, le choix d'un contenant et sa fermeture.`;

r.fait("distillation", "condition", SUR_LA_DISTILLATION, { source: SAVOIR_FAIRE, avertissement: true });
r.fait("distillation", "gamme", SUR_LA_DISTILLATION, { source: SAVOIR_FAIRE });

r.concept("oenologie", "Soufre, mèches et rince-fûts", ["soufre", "souffre", "soufrer", "sulfite", "sulfites", "sulfiter", "sulfitage", "so2", "metabisulfite", "rince fut", "rince futs", "suiffeur", "assainir", "oenologie"], {
  famille: "vin",
  lien: PAGES.oenologie,
});

r.fait("oenologie", "usage", `
  Brûler une **mèche soufrée** dans un fût vide et propre l'assainit et le protège des moisissures entre deux utilisations. Le **rince-fût** nettoie, rénove et dérougit la futaille. Le soufre protège aussi le vin de l'oxydation et des bactéries.`, { source: SAVOIR_FAIRE, liens: [PAGES.oenologie] });

r.fait("oenologie", "condition", `
  Pour les doses de soufre ou de sulfites, suivez toujours la notice du produit et, en cas de doute, demandez conseil à un œnologue : je ne donne pas de dosage. Manipulez les mèches soufrées dans un endroit aéré.`, { source: SAVOIR_FAIRE });

r.concept("mesure", "Outils de mesure", ["mesure", "mesurer", "degre", "degre d alcool", "taux d alcool", "alcool", "mesurer l alcool", "mesurer le degre", "densimetre", "instrument de mesure", "laboratoire"], {
  famille: "vin",
  lien: PAGES.mesure,
});

r.fait("mesure", "gamme", `
  Outils de mesure Duhallé : un **vinomètre** en verre de 0 à 20°, fabriqué en France, pour estimer le degré d'un vin sec, et un **alcoomètre** en verre de 0 à 100 % vol., pour les alcools secs sans sucre ajouté.`, {
  source: PAGES.mesure.url,
  liens: [PAGES.vinometre, PAGES.alcoometre],
});

r.concept("vinometre", "Vinomètre", ["vinometre", "vinometres", "tube capillaire"], { famille: "mesure", lien: PAGES.vinometre });

r.fait("vinometre", "procedure", `
  Pour utiliser le **vinomètre** : remplissez l'entonnoir de vin et laissez-le traverser le tube capillaire jusqu'à ce qu'une goutte perle en bas. Retournez ensuite l'instrument : le vin redescend et se stabilise sur la graduation, qui donne le degré d'alcool.`, { source: SAVOIR_FAIRE });

r.fait("vinometre", "condition", `
  Le vinomètre n'est fiable que pour les **vins secs**, sans sucre résiduel : le sucre fausse la mesure. Il donne une estimation, pas une mesure de laboratoire.`, { source: SAVOIR_FAIRE });

r.concept("alcoometre", "Alcoomètre", ["alcoometre", "alcoometres", "alcoometre a vin"], { famille: "mesure", lien: PAGES.alcoometre });

r.fait("alcoometre", "usage", `
  L'**alcoomètre** en verre (0 à 100 % vol.) mesure le titre d'un alcool **sec et sans sucre ajouté** : on le fait flotter dans une éprouvette remplie du liquide, puis on lit la graduation au niveau de la surface.`, { source: PAGES.mesure.url });

// ─── Mustimètre, éprouvette, mèches soufrées, Larroseptol (fiches relevées le 12/10/2026) ───

r.concept("mustimetre", "Mustimètre", ["mustimetre", "mustimetres", "pese mout", "densimetre a mout", "densite du mout", "oechsle"], {
  formules: ["mesurer le sucre", "sucre du mout", "sucre du raisin", "teneur en sucre du mout", "taux de sucre du mout", "mesurer la densite du mout", "mesurer la densite du jus", "degre potentiel", "richesse en sucre"],
  exclusif: true,
  famille: "mesure",
  lien: PAGES.mustimetre,
});

const MUSTIMETRE = `
  Le **mustimètre** (pèse-moût ou densimètre) de Duhallé est en verre, fabriqué en France. Il mesure la **densité du moût**, d'où l'on déduit sa teneur en sucre : il permet d'estimer le sucre avant la fermentation, de suivre la fermentation, puis de lire le taux d'alcool une fois celle-ci terminée. On le fait flotter dans une **éprouvette graduée de 250 ml** (vendue séparément), qui est le contenant conseillé.

  Pour mesurer : remplissez l'éprouvette du moût à contrôler, plongez-y doucement le mustimètre sans qu'il touche les parois, puis lisez la graduation au niveau de la surface du liquide.`;

/** Échelle donnée par l'équipe Duhallé le 12/10/2026. */
const ECHELLE_DU_MUSTIMETRE = `
  L'**échelle de densité** du mustimètre Duhallé va de **0,98 à 1,30**. Elle couvre aussi bien un moût très sucré (densité élevée) qu'un vin sec en fin de fermentation, dont la densité est proche de 0,990 à 1,000. Pour la lecture, plongez-le dans une éprouvette graduée de 250 ml (vendue séparément).`;

for (const aspect of ["definition", "usage", "gamme", "procedure"] as const) {
  r.fait("mustimetre", aspect, MUSTIMETRE, { source: PAGES.mustimetre.url, liens: [PAGES.mustimetre, PAGES.mesure] });
}
for (const aspect of ["dimension", "condition", "choix"] as const) {
  r.fait("mustimetre", aspect, ECHELLE_DU_MUSTIMETRE, { source: PAGES.mustimetre.url, liens: [PAGES.mustimetre, PAGES.contact] });
}

r.concept("eprouvette", "Éprouvette graduée", ["eprouvette", "eprouvettes", "eprouvette graduee", "eprouvettes graduees", "eprouvette 250 ml"], {
  exclusif: true,
  famille: "mesure",
  lien: PAGES.eprouvette,
});

const EPROUVETTE = `
  L'**éprouvette graduée de 250 ml** de Duhallé est en plastique alimentaire blanc, avec un bec verseur et un pied qui la tient stable. Elle sert à plonger l'alcoomètre, le mustimètre ou le pèse-cidre. Elle mesure **29 cm de hauteur** (cote donnée par l'équipe Duhallé le 12/10/2026).`;

for (const aspect of ["definition", "usage", "dimension", "gamme", "choix"] as const) {
  r.fait("eprouvette", aspect, EPROUVETTE, { source: PAGES.eprouvette.url, liens: [PAGES.eprouvette, PAGES.contact] });
}

r.concept("meche-soufree", "Mèches soufrées", ["meche", "meches", "meche soufree", "meches soufrees", "meche de soufre", "meches de soufre", "soufre en meche", "mechage"], {
  famille: "oenologie",
  lien: PAGES.oenologie,
  formules: ["7 trempages", "sept trempages", "sur coton"],
});

const MECHES_SOUFREES = `
  Une **mèche soufrée** est une bande de toile de coton imprégnée de soufre fondu (plusieurs trempages). On la brûle dans un fût vide et propre pour l'assainir et le protéger des moisissures entre deux utilisations. Manipulez-la dans un endroit aéré. Duhallé propose plusieurs références (mèches sur coton en lots, mèches « La Souveraine » avec végétaux aromatiques, mèches grises) : la disponibilité varie selon la référence, consultez la rubrique « Rince-fûts et mèches soufrées ».`;

const CAPACITE_DES_MECHES = `
  La **capacité de fût** traitée par une mèche, et le nombre de mèches à brûler, sont indiqués sur la fiche et l'emballage de chaque référence : je ne donne pas de dosage. En cas de doute, demandez conseil au service client au **${TELEPHONE}** ou à un œnologue, et manipulez les mèches dans un endroit aéré.`;

for (const aspect of ["definition", "usage", "gamme"] as const) {
  r.fait("meche-soufree", aspect, MECHES_SOUFREES, { source: PAGES.oenologie.url, liens: [PAGES.oenologie] });
}
for (const aspect of ["dimension", "condition", "choix"] as const) {
  r.fait("meche-soufree", aspect, CAPACITE_DES_MECHES, { source: PAGES.oenologie.url, liens: [PAGES.oenologie, PAGES.contact] });
}

r.concept("bonde-aseptique", "Bonde aseptique et recharge Larroseptol", ["larroseptol", "larrosseptol", "bonde aseptique", "bondes aseptiques", "recharge de bonde aseptique", "recharge bonde aseptique"], {
  exclusif: true,
  famille: "oenologie",
  lien: PAGES.oenologie,
});

const LARROSEPTOL = `
  Oui, Duhallé vend la **recharge LARROSEPTOL** (125 ml) pour **bonde aseptique** : une solution de bisulfite de potassium (SO₂) qui aide à garder un fût ou une barrique sains, un flacon correspondant à un fût de 220 L. La recharge se renouvelle régulièrement, plus souvent en été qu'en hiver, selon la notice. Le produit est irritant pour les yeux et les voies respiratoires : manipulez-le avec précaution.`;

for (const aspect of ["definition", "usage", "gamme", "condition", "lieu"] as const) {
  r.fait("bonde-aseptique", aspect, LARROSEPTOL, { source: PAGES.oenologie.url, liens: [PAGES.oenologie] });
}

// ─── Magnum, vins de fruits ────────────────────────────────────────────────

// « Des bouteilles alsaciennes » : la gamme ne comporte ni flûte d'Alsace ni forme rhénane (relevé du 19/10/2026 : aucune fiche).
r.concept("bouteille-alsacienne", "Bouteilles alsaciennes", ["alsacienne", "alsaciennes", "flute d alsace", "flutes d alsace", "bouteille alsacienne", "bouteille rhenane", "flute alsacienne"], {
  famille: "bouteille",
  exclusif: true,
});

const BOUTEILLE_ALSACIENNE = `
  Je n'ai pas trace de **bouteilles alsaciennes** (flûtes d'Alsace) dans la boutique. Les bouteilles vides de 75 cl de Duhallé sont des **bordelaises** (verte ou transparente) et des **bourgogne** transparentes, et il existe aussi des bouteilles **champenoises** pour le cidre. Pour savoir si une autre forme est proposée, contactez le service client au **${TELEPHONE}** ou à **${EMAIL}**.`;

for (const aspect of ["definition", "gamme", "choix", "dimension", "condition", "lieu"] as const) {
  r.fait("bouteille-alsacienne", aspect, BOUTEILLE_ALSACIENNE, { liens: [PAGES.bouteilleBordelaiseVerte, PAGES.bouteilleBordelaiseBlanche, PAGES.bouteilleBourgogne, PAGES.contact] });
}

r.concept("magnum", "Magnums et grands formats", ["magnum", "magnums", "jeroboam", "jeroboams", "double magnum"], {
  famille: "bouteille",
});

const MAGNUM = `
  Un **magnum** (1,5 L) est plus large et plus long qu'une bouteille de 75 cl : son diamètre avoisine **10 cm**. Les casiers Duhallé sont prévus pour des bouteilles de 75 cl : les niches du casier polystyrène 16 places, par exemple, mesurent 9 cm, trop étroites pour un magnum. Avant de commander un casier pour des magnums, demandez au service client le diamètre des alvéoles du modèle, au **${TELEPHONE}** ou à **${EMAIL}**. Pour le boucher, mesurez le diamètre intérieur du goulot plutôt que de supposer qu'il est identique à celui d'une bouteille de 75 cl.`;

for (const aspect of ["definition", "condition", "dimension", "choix"] as const) {
  r.fait("magnum", aspect, MAGNUM, { source: SAVOIR_FAIRE, liens: [PAGES.casiers, PAGES.contact] });
}

const BOISSONS_A_BOUCHER = ["vin de noix", "vin de fruits", "pineau"];
r.concept("vin-de-fruits", "Vin de noix et vins de fruits", ["vin de noix", "vin d orange", "vin de peche", "vin de cerise", "vin de coing", "vin de fruits", "vin aromatise", "ratafia", "pineau", "pineau des charentes"], {
  famille: "vin",
  voirAussi: ["bouchon", "boucheuse", "maceration-fruits"],
  formules: BOISSONS_A_BOUCHER.flatMap((boisson) =>
    ["boucher", "bouchonner", "bouchonne"].flatMap((verbe) => ["mon", "le", "du"].map((det) => `${verbe} ${det} ${boisson}`)),
  ),
});

/** Un vin de noix ou de fruits se boit dans les mois ou les années qui suivent : un colmaté 38 x 24 suffit, le 45 x 24 pour garder plus longtemps. */
const BOUCHER_UN_VIN_DE_FRUITS = `
  Un **vin de noix** (comme un vin d'orange, de pêche ou de cerise) est un vin aromatisé maison, que l'on boit dans les mois ou les années qui suivent. Pour le boucher, un bouchon en liège **colmaté 38 x 24 mm** (catégorie 4 ou 5) posé avec une boucheuse suffit ; pour une garde de plusieurs années, préférez un **45 x 24 mm colmaté catégorie 3**. Laissez les bouteilles debout 24 à 48 heures après le bouchage, puis couchez-les.`;

for (const aspect of ["definition", "choix", "procedure", "gamme", "condition"] as const) {
  r.fait("vin-de-fruits", aspect, BOUCHER_UN_VIN_DE_FRUITS, { source: SAVOIR_FAIRE, liens: [PAGES.bouchonsVin, PAGES.boucheuses] });
}
for (const aspect of ["choix", "procedure", "gamme"] as const) {
  r.fait(["bouchon", "vin-de-fruits"], aspect, BOUCHER_UN_VIN_DE_FRUITS, { source: SAVOIR_FAIRE, liens: [PAGES.bouchonsVin, PAGES.boucheuses] });
}

// ─── Finitions : surbouchage et étiquettes ─────────────────────────────────

r.concept("surbouchage", "Capsules de surbouchage", ["surbouchage", "capsule de surbouchage", "capsules de surbouchage", "capsule pvc", "capsules pvc", "capsule thermoretractable", "capsule thermo", "thermo", "capsule retractable", "capsules retractables", "coiffe", "habiller le goulot", "habillage"], {
  famille: "mise-en-bouteille",
  lien: PAGES.surbouchage,
  voirAussi: ["cire", "etiquettes"],
  formules: ["capsule ou cire", "cire ou capsule", "capsule ou de la cire", "capsules ou cire"],
});

r.fait("surbouchage", "gamme", `
  Capsules de surbouchage en **PVC thermorétractable** pour bouteilles de 75 cl, en lots de 50, **dorées** ou **rouges**. Un **appareil électrique à rétracter** les capsules de surbouchage PVC est aussi proposé.`, {
  source: PAGES.surbouchage.url,
  liens: [PAGES.capsulesPvcOr, PAGES.capsulesPvcRouge, PAGES.appareilARetracter],
});

// « Les capsules PVC sont-elles compatibles avec des bouteilles à bouchon à vis de 31 mm ? » : les capsules sont prévues pour des
// bouteilles de 75 cl bouchées au liège ; leur diamètre n'est pas dans la base.
const SURBOUCHAGE_ET_BOUCHON_A_VIS = `
  Les capsules de surbouchage **PVC thermorétractables** de Duhallé sont prévues pour des **bouteilles de 75 cl bouchées au liège**. Leur diamètre n'est pas dans ma base : pour une bouteille à **bouchon à vis**, de 31 mm par exemple, demandez confirmation au service client avant d'acheter, au **${TELEPHONE}** ou à **${EMAIL}**, en indiquant le diamètre extérieur du goulot et la hauteur à couvrir.`;

for (const aspect of ["dimension", "condition", "choix", "definition"] as const) {
  r.fait(["surbouchage", "filetage"], aspect, SURBOUCHAGE_ET_BOUCHON_A_VIS, { source: PAGES.surbouchage.url, liens: [PAGES.surbouchage, PAGES.contact] });
}

r.fait("surbouchage", "procedure", `
  Posez la capsule sur le goulot bouché, puis chauffez-la pour qu'elle se rétracte et épouse le col : avec un pistolet à air chaud, un sèche-cheveux puissant, ou au-dessus de la vapeur d'une casserole d'eau frémissante. Tournez la bouteille pour chauffer de façon uniforme.`, { source: SAVOIR_FAIRE });

r.concept("etiquettes", "Étiquettes", ["etiquette", "etiquettes", "etiqueter", "etiquetage", "etiquette adhesive", "etiquettes adhesives", "etiquette soluble", "etiquettes solubles", "identifier les bouteilles", "marquer les bouteilles"], {
  famille: "mise-en-bouteille",
  lien: PAGES.surbouchage,
});

r.fait("etiquettes", "gamme", `
  **Étiquettes adhésives** à personnaliser (lot de 20, format 100 x 75 mm) et **étiquettes solubles** (lot de 12) pour identifier vos bouteilles.`, {
  source: PAGES.surbouchage.url,
  liens: [PAGES.etiquettesAdhesives, PAGES.etiquettesSolubles],
});

r.fait("etiquettes", "usage", `
  Les **étiquettes solubles** se retirent simplement à l'eau : pratiques pour noter le contenu et le millésime de bouteilles que vous réutiliserez. Les **étiquettes adhésives** habillent durablement vos bouteilles.`, { source: SAVOIR_FAIRE });
