// La mise en bouteille du vin : préparation, soutirage, remplissage,
// finitions, et le matériel correspondant.
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

r.concept("soutirage", "Le soutirage", ["soutirage", "soutirer", "soutireuse", "siphon", "siphonner", "transvaser", "tireuse", "tireuse a vin", "pompe a vin", "pompe", "tuyau", "tuyau de soutirage", "entonnoir", "remplisseuse", "canne de soutirage", "robinet de soutirage"], {
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

r.concept("nettoyage-tuyau", "Nettoyer un tuyau de soutirage", ["nettoyer un tuyau", "nettoyer l interieur du tuyau", "laver le siphon", "nettoyer apres soutirage"], {
  famille: "soutirage",
});

r.fait("nettoyage-tuyau", "procedure", `
  Juste après usage, faites circuler de l'eau puis le produit compatible prévu par sa notice dans toute la longueur du tuyau, respectez le temps de contact, rincez si nécessaire et suspendez-le pour l'égoutter. Remplacez-le s'il reste opaque, collant, craquelé ou odorant.`, { source: SAVOIR_FAIRE });

r.concept("arret-remplissage", "Arrêt automatique du remplissage", ["arret automatique du remplissage", "arreter au bon niveau", "entonnoir a arret automatique", "remplissage automatique niveau"], {
  famille: "soutirage",
  lien: PAGES.entonnoirArret,
});

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

r.fait("filtre-vin", "usage", `
  Filtrer permet de retirer les dernières particules en suspension avant la mise en bouteille. Un vin bien soutiré, limpide et stable n'a pas toujours besoin d'être filtré ; un vin trouble ou microbiologiquement incertain demande d'abord un diagnostic, car la filtration et sa finesse dépendent du style et de la stabilité recherchés.`, { source: SAVOIR_FAIRE });

r.concept("depot-bouteille", "Dépôt après la mise en bouteille", ["depot apres mise en bouteille", "depot dans le vin", "depot dans mes bouteilles", "cristaux dans la bouteille", "lie dans la bouteille", "bouteille trouble apres remplissage"], {
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

r.concept("contenant", "Fûts et dames-jeannes", ["fut", "futs", "tonneau", "tonneaux", "barrique", "bonbonne", "bonbonnes", "dame jeanne", "dames jeannes", "damejeanne", "cuve", "fut plastique", "fut alimentaire", "futaille"], {
  famille: "vin",
  lien: PAGES.futs,
  voirAussi: ["bonde", "oenologie"],
});

r.fait("contenant", "gamme", `
  Pour stocker et faire fermenter : **dame-jeanne (bonbonne) de 20 L** à col large en verre transparent avec entourage plastique, et **fûts alimentaires** en plastique. Pour les fermer à la main, choisissez une **bonde en liège** adaptée au diamètre du col.`, {
  source: PAGES.futs.url,
  liens: [PAGES.bonbonne20, PAGES.futs, PAGES.bondes],
});

r.fait("contenant", "entretien", `
  Pour entretenir un fût : le **rince-fût** assainit, rénove et dérougit la futaille (dose pour un fût de 110 L), et le **suiffeur**, un mastic d'étanchéité blanc de 400 g, colmate les fuites des fûts et tonneaux. Entre deux utilisations, un fût vide se conserve propre, sec et assaini (par exemple avec une mèche soufrée).`, {
  source: PAGES.oenologie.url,
  liens: [PAGES.rinceFut, PAGES.suiffeur],
});

r.concept("oenologie", "Soufre, mèches et rince-fûts", ["soufre", "souffre", "soufrer", "meche", "meches", "meche soufree", "meches soufrees", "mechage", "sulfite", "sulfites", "sulfiter", "sulfitage", "so2", "metabisulfite", "rince fut", "rince futs", "suiffeur", "assainir", "oenologie"], {
  famille: "vin",
  lien: PAGES.oenologie,
});

r.fait("oenologie", "usage", `
  Brûler une **mèche soufrée** dans un fût vide et propre l'assainit et le protège des moisissures entre deux utilisations. Le **rince-fût** nettoie, rénove et dérougit la futaille. Le soufre protège aussi le vin de l'oxydation et des bactéries.`, { source: SAVOIR_FAIRE, liens: [PAGES.oenologie] });

r.fait("oenologie", "condition", `
  Pour les doses de soufre ou de sulfites, suivez toujours la notice du produit et, en cas de doute, demandez conseil à un œnologue : je ne donne pas de dosage. Manipulez les mèches soufrées dans un endroit aéré.`, { source: SAVOIR_FAIRE });

r.concept("mesure", "Outils de mesure", ["mesure", "mesurer", "degre", "degre d alcool", "taux d alcool", "alcool", "mesurer l alcool", "mesurer le degre", "densimetre", "mustimetre", "pese mout", "instrument de mesure", "laboratoire"], {
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

// ─── Finitions : surbouchage et étiquettes ─────────────────────────────────

r.concept("surbouchage", "Capsules de surbouchage", ["surbouchage", "capsule de surbouchage", "capsules de surbouchage", "capsule pvc", "capsules pvc", "capsule thermoretractable", "capsule thermo", "thermo", "capsule retractable", "capsules retractables", "coiffe", "habiller le goulot", "habillage"], {
  famille: "mise-en-bouteille",
  lien: PAGES.surbouchage,
  voirAussi: ["cire", "etiquettes"],
  formules: ["capsule ou cire", "cire ou capsule", "capsule ou de la cire", "capsules ou cire"],
});

r.fait("surbouchage", "gamme", `
  Capsules de surbouchage en **PVC thermorétractable** pour bouteilles de 75 cl, en lots de 50, **dorées** ou **rouges**.`, {
  source: PAGES.surbouchage.url,
  liens: [PAGES.capsulesPvcOr, PAGES.capsulesPvcRouge],
});

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
