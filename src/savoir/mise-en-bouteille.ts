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
  Mettez votre vin en bouteille quand il est **terminé et stable** : fermentations achevées, vin clair après les soutirages, sans dépôt en suspension. Choisissez de préférence un jour de temps sec et de haute pression ; la tradition recommande aussi une période de lune descendante.`, { source: SAVOIR_FAIRE });

r.fait("mise-en-bouteille", "erreur", `
  Les erreurs les plus courantes :
  - des bouteilles mal lavées ou encore humides ;
  - un vin brassé ou trop aéré pendant le soutirage, qui s'oxyde ;
  - des bouteilles trop remplies, où le bouchon comprime le vin ;
  - coucher les bouteilles juste après le bouchage ;
  - des bouchons trop courts pour un vin que l'on veut garder longtemps.`, { source: SAVOIR_FAIRE });

r.fait("mise-en-bouteille", "condition", `
  Travaillez avec du matériel propre et bien rincé, dans un endroit frais et sans odeurs fortes : le vin et le liège prennent facilement les odeurs. Préparez tout le matériel avant de commencer, pour ne pas laisser le vin au contact de l'air.`, { source: SAVOIR_FAIRE });

r.concept("niveau-remplissage", "Le niveau de remplissage", ["niveau de remplissage", "remplir la bouteille", "remplissage", "jusqu ou remplir", "espace vide", "vide sous le bouchon", "hauteur de vin", "trop rempli", "trop pleine", "place entre le vin et le bouchon", "espace entre le vin et le bouchon", "distance entre le vin et le bouchon"], {
  famille: "mise-en-bouteille",
});

r.fait("niveau-remplissage", "dimension", `
  Remplissez la bouteille en laissant **environ 1 à 2 cm** entre le vin et le bas du bouchon. Trop pleine, le bouchon comprime le vin et peut ressortir ou laisser perler du vin ; trop peu remplie, le vin est au contact de trop d'air.`, { source: SAVOIR_FAIRE });

// ─── Les bouteilles ────────────────────────────────────────────────────────

r.concept("bouteille", "Bouteilles vides", ["bouteille", "bouteilles", "bouteille vide", "bouteilles vides", "bouteille en verre", "bordelaise", "bourgogne", "75 cl", "bouteille 75 cl", "flacon"], {
  famille: "mise-en-bouteille",
  lien: PAGES.miseEnBouteille,
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
  Vous pouvez **réutiliser des bouteilles** de vin, à condition de bien les laver, de vérifier que le goulot n'est pas ébréché, et de n'y mettre que des vins tranquilles. Pour le cidre ou un vin pétillant, utilisez **uniquement des bouteilles champenoises**, conçues pour résister à la pression.`, { source: SAVOIR_FAIRE });

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

r.concept("rince-bouteille", "Rince-bouteille", ["rince bouteille", "rince bouteilles", "rinceur", "aviner", "avinage", "laveuse", "lave bouteille a turbine", "turbine"], {
  famille: "nettoyage-bouteilles",
  lien: PAGES.rinceBouteille,
});

r.fait("rince-bouteille", "usage", `
  Le **rince-bouteille** manuel s'adapte aux goulots de 15 mm : en appuyant la bouteille dessus, un jet lave l'intérieur. Il sert à rincer, assainir ou **aviner** les bouteilles (les rincer avec un peu de vin avant de les remplir). Pour les bouteilles très sales, le **lave-bouteille à turbine** brosse l'intérieur grâce à la pression de l'eau.`, {
  source: PAGES.nettoyage.url,
  liens: [PAGES.rinceBouteille, PAGES.laveBouteille],
});

// ─── Soutirage ─────────────────────────────────────────────────────────────

r.concept("soutirage", "Le soutirage", ["soutirage", "soutirer", "soutireuse", "siphon", "siphonner", "transvaser", "tireuse", "tireuse a vin", "pompe a vin", "pompe", "tuyau", "tuyau de soutirage", "entonnoir", "remplisseuse", "canne de soutirage", "robinet de soutirage"], {
  famille: "mise-en-bouteille",
  lien: PAGES.soutirage,
  voirAussi: ["filtre-vin"],
});

r.fait("soutirage", "definition", `
  Le **soutirage** consiste à transvaser le vin d'un contenant à un autre (cuve, fût, bouteille) en laissant le dépôt au fond, et **sans l'aérer**. On soutire pendant l'élevage pour clarifier le vin, puis au moment de la mise en bouteille.`, { source: SAVOIR_FAIRE });

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
  3. Amorcez le siphon (la soutireuse automatique s'amorce toute seule).
  4. Remplissez en gardant l'extrémité du tuyau **au fond de la bouteille**, pour éviter les éclaboussures et l'oxydation.`, { source: SAVOIR_FAIRE });

r.concept("filtre-vin", "Filtration du vin", ["filtre", "filtres", "filtrer", "filtrer le vin", "filtration", "filtre papier", "vin trouble", "clarifier"], {
  famille: "soutirage",
  lien: PAGES.filtres,
});

r.fait("filtre-vin", "dimension", `
  Les **filtres à vin** Duhallé sont des filtres papier plissés de **40 cm de diamètre** (épaisseur 190 micromètres, filtration de 4 à 7 microns), vendus par 10. Ils s'adaptent aux entonnoirs.`, { source: PAGES.soutirage.url, liens: [PAGES.filtres, PAGES.entonnoirArret] });

r.fait("filtre-vin", "usage", `
  Filtrer permet de retirer les dernières particules en suspension avant la mise en bouteille. Un vin bien soutiré et reposé est souvent déjà clair : filtrez surtout si le vin reste trouble.`, { source: SAVOIR_FAIRE });

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
