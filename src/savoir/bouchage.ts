// Le bouchage : bouchons et bondes en liège, boucheuses, capsules couronne
// et capsuleuses. Le cœur de métier de Duhallé.
import { PAGES } from "./liens";
import { rubrique, SAVOIR_FAIRE } from "./outils";

const r = rubrique(PAGES.bouchonsVin.url);
export const bouchage = r;

r.concept("bouchage", "Le bouchage", ["bouchage", "boucher", "boucher une bouteille", "boucher les bouteilles", "boucher le vin", "fermer une bouteille", "fermer les bouteilles", "obturer", "reboucher", "enfoncer le bouchon", "mettre un bouchon"], {
  famille: "catalogue",
  lien: PAGES.bouchonsVin,
  voirAussi: ["bouchon", "boucheuse", "capsule-couronne"],
});

r.fait("bouchage", "definition", `
  Le **bouchage** ferme hermétiquement la bouteille après le remplissage, pour protéger la boisson de l'air et permettre sa conservation. Pour le vin, on utilise surtout des **bouchons en liège**, posés avec une boucheuse ; pour le cidre et la bière, des **capsules couronne**, posées avec une capsuleuse.`, { source: SAVOIR_FAIRE });

r.fait("bouchage", "erreur", `
  Si les bouchons s'enfoncent mal : un bouchon droit de 24 mm ne s'enfonce qu'avec une **boucheuse**, qui le comprime d'abord. Utilisez des bouchons **secs** et adaptés aux bouteilles standard de 75 cl, posez la bouteille d'aplomb et abaissez le levier d'un **geste franc et continu**. Si la bouteille est trop remplie, le vin fait obstacle au bouchon.`, { source: SAVOIR_FAIRE, liens: [PAGES.boucheuses] });

r.fait("bouchage", "procedure", `
  Pour boucher une bouteille de vin avec une boucheuse manuelle :
  1. Placez la bouteille remplie sous la boucheuse, bien d'aplomb.
  2. Insérez un bouchon en liège **sec** dans la mâchoire de la boucheuse.
  3. Abaissez le ou les leviers d'un **geste franc et continu** : la boucheuse comprime le bouchon et l'enfonce dans le goulot.
  4. Vérifiez que le bouchon affleure le haut du col.
  5. Laissez les bouteilles **debout 24 à 48 heures** avant de les coucher.`, { source: SAVOIR_FAIRE, liens: [PAGES.boucheuses, PAGES.bouchonsVin] });

r.fait("bouchage", "gamme", `
  Pour le bouchage, Duhallé propose des **bouchons en liège** pour le vin, des **bondes** pour fûts et bonbonnes, des **boucheuses manuelles**, des **capsules couronne** et des **capsuleuses** pour le cidre et la bière, et des **bouchons plastique** pour le cidre.`);

r.concept("repos-bouchage", "Après le bouchage", ["apres le bouchage", "apres bouchage", "bouteilles debout", "laisser debout", "coucher les bouteilles", "coucher", "reposer", "repos", "garder debout", "stocker debout", "vin qui perle", "bouchon qui remonte", "bouchon qui ressort", "bouteille qui fuit", "bouteilles qui fuient", "bouchon qui fuit", "fuite au bouchon"], {
  famille: "bouchage",
});

r.fait("repos-bouchage", "duree", `
  Après le bouchage, laissez les bouteilles **debout pendant 24 à 48 heures**, puis couchez-les. Le liège comprimé a besoin de ce temps pour reprendre sa forme et assurer l'étanchéité.`, { source: SAVOIR_FAIRE });

r.fait("repos-bouchage", "raison", `
  Juste après le bouchage, le liège est encore comprimé et l'air emprisonné sous le bouchon est sous pression. Couchées trop tôt, les bouteilles risquent de laisser perler du vin ou de voir le bouchon remonter. Debout 24 à 48 heures, le bouchon reprend sa forme, la pression s'équilibre et l'étanchéité est assurée. Ensuite, couchées, le bouchon reste au contact du vin et ne sèche pas.`, { source: SAVOIR_FAIRE });

// ─── Les bouchons ──────────────────────────────────────────────────────────

r.concept("bouchon", "Les bouchons", ["bouchon", "bouchons", "bouchon de bouteille"], {
  famille: "bouchage",
  lien: PAGES.bouchonsVin,
  voirAussi: ["bouchon-naturel", "bouchon-colmate", "bonde"],
});

r.fait("bouchon", "gamme", `
  Les bouchons Duhallé :
  - **bouchons en liège pour le vin**, naturels ou colmatés, en 38 x 24 mm et 45 x 24 mm ;
  - **bouchons coniques** 33 x 23 x 19 mm, qui s'enfoncent à la main ;
  - **bouchons à tête** plastique pour refermer les bouteilles entamées ;
  - **bondes en liège** coniques pour fûts, dames-jeannes et bocaux ;
  - **bouchons plastique** à tête crantée et **capsules couronne** pour le cidre.`, { liens: [PAGES.bouchonsVin, PAGES.bondes, PAGES.bouchonsCidre] });

r.fait("bouchon", "choix", `
  Choisissez votre bouchon selon la **durée de garde** du vin :
  - **vin de garde** : 45 x 24 mm en **liège naturel** (catégorie 1) ;
  - **vin de qualité à garder quelques années** : 45 x 24 ou 38 x 24 mm **colmaté catégorie 3** ;
  - **vin de pays** : 38 x 24 mm colmaté catégorie 4 ;
  - **vin jeune ou cidre** : 38 x 24 mm colmaté catégorie 5 ;
  - **consommation rapide** : 38 x 24 mm colmaté catégorie 6, ou bouchon conique.

  Le diamètre de 24 mm convient aux bouteilles de vin standard de 75 cl.`, { liens: [PAGES.bouchon45Naturel, PAGES.bouchon38Cat3, PAGES.bouchonsVin] });

r.concept("bouchon-liege", "Bouchons en liège", ["bouchon en liege", "bouchons en liege", "bouchon liege", "bouchons liege", "bouchon de liege", "liege", "liege du portugal", "chene liege", "conserver les bouchons", "stocker les bouchons", "garder les bouchons", "ranger les bouchons", "tremper les bouchons", "trempage"], {
  famille: "bouchon",
  lien: PAGES.bouchonsVin,
  voirAussi: ["bouchon-naturel", "bouchon-colmate", "taille-bouchon"],
});

r.fait("bouchon-liege", "definition", `
  Le **liège** est l'écorce du chêne-liège, récoltée sans abattre l'arbre. Matière **naturelle, recyclable et compostable**, il est souple et élastique : comprimé dans le goulot, il reprend sa forme et assure l'étanchéité, tout en laissant le vin évoluer lentement. C'est le bouchage préféré des viticulteurs. Les bouchons Duhallé sont en **liège du Portugal**.`, { liens: [PAGES.articleFabricationLiege, PAGES.articleIdeesRecuesLiege] });

r.fait("bouchon-liege", "condition", `
  Les bouchons en liège Duhallé s'utilisent **à sec** : inutile de les faire tremper avant le bouchage. Les bouchons colmatés sont traités « super-glisse » pour glisser facilement dans la boucheuse et le goulot.`);

r.fait("bouchon-liege", "entretien", `
  Conservez les bouchons non utilisés dans leur **sachet fermé**, dans un endroit **sec, propre et sans odeurs** (produits ménagers, fioul, peinture) : le liège absorbe les odeurs. Utilisez-les de préférence dans les mois qui suivent l'achat.`, { source: SAVOIR_FAIRE });

r.fait("bouchon-liege", "duree", `
  La durée de conservation d'un vin bouché dépend surtout de la **qualité** et de la **longueur** du bouchon : un 45 mm en liège naturel est fait pour les vins de garde, un 38 mm colmaté de catégorie 5 ou 6 pour les vins à boire jeunes. Une bonne cave (fraîche, humide, bouteilles couchées) fait le reste.`, { source: SAVOIR_FAIRE });

r.concept("lenticelles", "Les lenticelles du liège", ["lenticelle", "lenticelles", "pores du liege", "trous dans le bouchon", "petits trous", "porosite"], {
  famille: "bouchon-liege",
  lien: PAGES.articleIdeesRecuesLiege,
});

r.fait("lenticelles", "definition", `
  Les **lenticelles** sont les pores naturels du liège, visibles sous forme de petits trous sur le bouchon. Moins un bouchon en présente, plus il est homogène et de catégorie élevée. Dans un bouchon **colmaté**, elles sont comblées avec de la poudre de liège.`, { source: SAVOIR_FAIRE, liens: [PAGES.articleIdeesRecuesLiege] });

r.concept("categorie-bouchon", "Catégories de bouchons", ["categorie", "categories", "cat 1", "cat 3", "cat 4", "cat 5", "cat 6", "categorie 1", "categorie 3", "categorie 4", "categorie 5", "categorie 6", "qualite du liege", "qualite de bouchon", "classe de bouchon", "grade"], {
  famille: "bouchon-liege",
});

r.fait("categorie-bouchon", "definition", `
  La **catégorie** indique la qualité du liège, de la catégorie 1 (la plus belle, très peu de lenticelles) à la catégorie 6. Chez Duhallé :
  - **cat. 1** : liège naturel, pour les vins de garde ;
  - **cat. 3** : colmaté, pour les vins supérieurs ;
  - **cat. 4** : colmaté, pour les vins de pays ;
  - **cat. 5** : colmaté, pour les vins jeunes et le cidre ;
  - **cat. 6** : colmaté, pour une courte conservation.`);

r.concept("bouchon-naturel", "Bouchons en liège naturel", ["liege naturel", "bouchon naturel", "bouchons naturels", "bouchon liege naturel", "naturel superieur", "bouchon haut de gamme", "bouchon premium", "bouchon d une piece"], {
  famille: "bouchon-liege",
  lien: PAGES.bouchon45Naturel,
});

r.fait("bouchon-naturel", "definition", `
  Le **bouchon en liège naturel** est taillé d'une seule pièce dans l'écorce du chêne-liège. C'est le bouchon des **vins de garde**. Duhallé le propose en **45 x 24 mm** : lot de 100 en catégorie 1, et lot de 40 en qualité « naturel supérieur ».`, { liens: [PAGES.bouchon45Naturel, PAGES.bouchon45NaturelSuperieur] });

r.concept("bouchon-colmate", "Bouchons en liège colmaté", ["colmate", "colmates", "bouchon colmate", "bouchons colmates", "liege colmate", "colmatage", "super glisse"], {
  famille: "bouchon-liege",
  lien: PAGES.bouchon38Cat3,
});

r.fait("bouchon-colmate", "definition", `
  Un **bouchon colmaté** est un bouchon en liège naturel dont les pores (lenticelles) sont comblés avec de la poudre de liège : il est plus régulier, bien étanche et plus économique. Duhallé propose des colmatés **38 x 24 mm** (catégories 3, 4, 5 et 6) et **45 x 24 mm** (catégorie 3), traités « super-glisse ».`, { liens: [PAGES.bouchon38Cat3, PAGES.bouchon45Colmate] });

r.fait(["bouchon-naturel", "bouchon-colmate"], "choix", `
  **Naturel ou colmaté ?** Le liège **naturel** (catégorie 1, 45 x 24 mm) est le choix des grands vins de garde. Le **colmaté** convient à la grande majorité des vins faits maison : catégorie 3 pour les vins supérieurs, 4 pour les vins de pays, 5 pour les vins jeunes et le cidre, 6 pour une courte conservation.`, { liens: [PAGES.bouchon45Naturel, PAGES.bouchon38Cat3] });

r.concept("vin-de-garde", "Vin de garde", ["vin de garde", "vins de garde", "longue garde", "garder longtemps", "garder plusieurs annees", "garder des annees", "garder ans", "conserver ans", "conserver des annees", "vieillir", "vieillissement", "grand vin", "millesime"], {
  famille: "vin",
});

r.fait(["bouchon", "vin-de-garde"], "choix", `
  Pour un **vin de garde**, choisissez un bouchon **45 x 24 mm en liège naturel** (catégorie 1, ou qualité « naturel supérieur ») : plus le bouchon est long et le liège homogène, meilleure est l'étanchéité sur la durée. Pour un vin à garder quelques années seulement, le 45 x 24 mm colmaté catégorie 3 est un bon compromis.`, { liens: [PAGES.bouchon45Naturel, PAGES.bouchon45NaturelSuperieur, PAGES.bouchon45Colmate] });

r.concept("vin-jeune", "Vin jeune ou à boire rapidement", ["vin jeune", "vins jeunes", "vin de pays", "vins de pays", "vin de l annee", "vin a boire", "vin de table", "vin primeur", "courte conservation", "boire rapidement", "boire vite", "consommer rapidement", "vin ordinaire"], {
  famille: "vin",
});

r.fait("vin-de-garde", "duree", `
  Un vin de garde peut vieillir de nombreuses années en bouteille : cela dépend avant tout du vin lui-même. Pour qu'il tienne, bouchez-le avec un bouchon **45 x 24 mm en liège naturel** et conservez-le dans une cave fraîche, humide et sombre, bouteilles couchées.`, { source: SAVOIR_FAIRE, liens: [PAGES.bouchon45Naturel] });

r.fait(["bouchon", "vin-jeune"], "choix", `
  Pour un vin à boire dans les premières années, un bouchon **38 x 24 mm colmaté** suffit : catégorie 4 pour un vin de pays, catégorie 5 pour un vin jeune (et le cidre), catégorie 6 pour une consommation rapide. Pour quelques mois seulement, le bouchon **conique** 33 x 23 x 19 mm s'enfonce même à la main.`, { liens: [PAGES.bouchon38Cat4, PAGES.bouchon38Cat5, PAGES.bouchon38Cat6] });

r.concept("taille-bouchon", "Taille des bouchons", ["taille des bouchons", "taille de bouchon", "dimension des bouchons", "diametre du bouchon", "longueur du bouchon", "38 24", "45 24", "38 mm", "45 mm", "24 mm", "44 mm", "49 mm", "54 mm", "bouchon long", "bouchon court"], {
  famille: "bouchon-liege",
});

r.fait("taille-bouchon", "dimension", `
  Les bouchons se désignent par **longueur x diamètre**, en millimètres. Pour une bouteille de vin standard de 75 cl, le diamètre est de **24 mm** : le bouchon est comprimé par la boucheuse pour entrer dans le col. La **longueur** dépend de la garde : **38 mm** pour les vins à boire dans les premières années, **45 mm** pour les vins de garde. Le bouchon **conique** 33 x 23 x 19 mm sert à reboucher à la main.`, { source: SAVOIR_FAIRE, liens: [PAGES.bouchonsVin] });

r.fait("taille-bouchon", "raison", `
  Plus un bouchon est **long**, plus sa surface de contact avec le col est grande : l'étanchéité est meilleure sur la durée. C'est pourquoi les vins de garde se bouchent en 45 mm, alors que 38 mm suffisent pour les vins à boire jeunes.`, { source: SAVOIR_FAIRE });

r.concept("bouchon-conique", "Bouchons coniques", ["bouchon conique", "bouchons coniques", "33 23 19", "bouchon a la main", "boucher a la main", "bouchon pour reboucher"], {
  famille: "bouchon",
  lien: PAGES.bouchonConique,
  formules: ["sans boucheuse", "pas de boucheuse", "sans machine"],
});

r.fait("bouchon-conique", "definition", `
  Le **bouchon conique** en liège colmaté (33 x 23 x 19 mm) s'enfonce **à la main, sans boucheuse** : idéal pour reboucher une bouteille ou pour un vin à consommer rapidement. Il est vendu par lots de 40 ou de 10.`, { liens: [PAGES.bouchonConique] });

r.concept("bouchon-tete", "Bouchons à tête", ["bouchon a tete", "bouchons a tete", "tete plastique", "bouchon tete plastique", "bouchon de couleur", "bouchon reutilisable", "bouchon amovible"], {
  famille: "bouchon",
  lien: PAGES.bouchonTete,
});

r.fait("bouchon-tete", "definition", `
  Les **bouchons en liège à tête plastique** de couleur (lot de 100) se retirent et se remettent à la main : parfaits pour conserver une bouteille déjà ouverte.`, { liens: [PAGES.bouchonTete] });

// ─── Les bondes ────────────────────────────────────────────────────────────

r.concept("bonde", "Bondes en liège", ["bonde", "bondes", "bonde en liege", "bonde conique", "bouchon de fut", "bouchon de tonneau", "bouchon de dame jeanne", "bouchon de bonbonne", "bouchon de bocal", "gros bouchon", "grand bouchon", "bouchon grand diametre", "bouchon col large", "bouchon large"], {
  famille: "bouchon",
  lien: PAGES.bondes,
});

r.fait("bonde", "definition", `
  La **bonde** est un gros bouchon en liège de forme **conique**, qui ferme à la main un fût, une dame-jeanne, une bonbonne, un bocal ou une bouteille à col large. Les bondes Duhallé, en liège du Portugal, mesurent **33 mm de haut**.`, { source: PAGES.bondes.url });

r.fait("bonde", "dimension", `
  Bondes coniques (grand diamètre / petit diamètre, hauteur 33 mm) : **28/24**, **30/26**, **32/28**, **35/31**, **38/34**, **55/50**, **100/95** et **120/115 mm** (bonbonnes à col large). Elles sont vendues à l'unité, ou en **lot de 3** (30, 35 et 38 mm).`, { source: PAGES.bondes.url, liens: [PAGES.bondes, PAGES.bondesLot3] });

r.fait("bonde", "choix", `
  Pour choisir une bonde, mesurez le **diamètre intérieur** du col : il doit être compris entre le petit diamètre (en bas) et le grand diamètre (en haut) de la bonde, pour qu'elle s'enfonce sans forcer et tienne fermement. En cas d'hésitation, le lot de 3 bondes (30, 35 et 38 mm) couvre les cols les plus courants.`, { source: SAVOIR_FAIRE, liens: [PAGES.bondes, PAGES.bondesLot3] });

r.fait(["bonde", "contenant"], "gamme", `
  Oui : pour fermer une **dame-jeanne**, une **bonbonne** ou un **fût**, Duhallé propose des bondes coniques en liège, de **28/24 mm** pour les petits cols jusqu'à **120/115 mm** pour les bonbonnes à col large. Mesurez le diamètre intérieur du col : il doit se situer entre le petit et le grand diamètre de la bonde.`, { liens: [PAGES.bondes, PAGES.bondesLot3] });

// ─── Les boucheuses ────────────────────────────────────────────────────────

r.concept("boucheuse", "Boucheuses manuelles", ["boucheuse", "boucheuses", "bouchonneuse", "bouchonneuses", "boucheuse manuelle", "machine a boucher", "appareil a boucher", "bouchonner", "boucheuse a vin"], {
  famille: "bouchage",
  lien: PAGES.boucheuses,
  voirAussi: ["boucheuse-2-leviers", "boucheuse-machoires", "bouchon-liege"],
});

r.fait("boucheuse", "definition", `
  La **boucheuse** comprime le bouchon en liège pour le faire entrer dans le goulot, puis l'enfonce d'un seul geste. Sans elle, impossible d'enfoncer un bouchon droit de 24 mm dans un col standard.`, { source: SAVOIR_FAIRE });

r.fait("boucheuse", "gamme", `
  Les boucheuses manuelles Duhallé, pratiques et peu encombrantes, conviennent à des séries de **20 à 100 bouteilles** par utilisation :
  - **à un levier** : simple et économique, idéale pour les petites séries ;
  - **à deux leviers** : le modèle standard pour boucher ou reboucher vin et cidre ;
  - **à mâchoires sur pied** : réglable et très stable ;
  - **capsuleuse boucheuse universelle** : bouchons liège ou plastique et capsules couronne.`, {
  source: PAGES.boucheuses.url,
  liens: [PAGES.boucheuse1Levier, PAGES.boucheuse2Leviers, PAGES.boucheuseMachoires],
});

r.fait("boucheuse", "choix", `
  Pour quelques bouteilles de temps en temps, la boucheuse **à un levier** suffit. Pour une mise en bouteille régulière, la boucheuse **à deux leviers** est le choix le plus courant. Pour de plus grandes séries et un geste plus confortable, préférez la boucheuse **à mâchoires sur pied**, très stable. Si vous bouchez aussi du cidre ou de la bière avec des capsules, la **capsuleuse boucheuse universelle** fait les deux.`, {
  liens: [PAGES.boucheuse1Levier, PAGES.boucheuse2Leviers, PAGES.boucheuseMachoires],
});

r.fait("boucheuse", "erreur", `
  Pour un bouchage réussi : utilisez des **bouchons secs**, posez la bouteille **bien d'aplomb**, abaissez le levier d'un **geste franc et continu**, et ne remplissez pas trop la bouteille. Un bouchon qui ressort ou laisse perler du vin signale souvent une bouteille trop pleine, ou des bouteilles couchées trop tôt.`, { source: SAVOIR_FAIRE });

r.concept("boucheuse-1-levier", "Boucheuse à un levier", ["boucheuse a un levier", "boucheuse 1 levier", "un levier", "1 levier", "boucheuse simple", "petite boucheuse"], {
  famille: "boucheuse",
  lien: PAGES.boucheuse1Levier,
});

r.fait("boucheuse-1-levier", "definition", `
  La **boucheuse manuelle à un levier** offre un bouchage fiable sans abîmer bouchons ni bouteilles, avec un bon rapport qualité-prix. Elle est idéale pour les **petites séries** de mise en bouteille.`, { source: PAGES.boucheuses.url, liens: [PAGES.boucheuse1Levier] });

r.concept("boucheuse-2-leviers", "Boucheuse à deux leviers", ["boucheuse a deux leviers", "boucheuse 2 leviers", "deux leviers", "2 leviers", "boucheuse standard"], {
  famille: "boucheuse",
  lien: PAGES.boucheuse2Leviers,
});

r.fait("boucheuse-2-leviers", "definition", `
  La **boucheuse standard à deux leviers** est simple à utiliser et peu encombrante : on la pose sur le goulot, puis on abaisse les deux leviers pour enfoncer le bouchon. Elle sert à boucher ou reboucher les bouteilles de vin ou de cidre avec des bouchons en liège.`, { source: PAGES.boucheuses.url, liens: [PAGES.boucheuse2Leviers] });

r.concept("boucheuse-machoires", "Boucheuse à mâchoires sur pied", ["boucheuse a machoires", "boucheuse machoire", "machoires", "boucheuse sur pied", "boucheuse a pied", "boucheuse colonne", "boucheuse trepied", "mors"], {
  famille: "boucheuse",
  lien: PAGES.boucheuseMachoires,
});

r.fait("boucheuse-machoires", "definition", `
  La **boucheuse à mâchoires sur pied** est réglable et offre une grande stabilité : la bouteille est posée sur le socle et un grand levier actionne les mâchoires, qui compriment le bouchon avant de l'enfoncer. Elle s'utilise avec des bouchons en liège **à sec** et convient aux séries plus importantes.`, { source: PAGES.boucheuses.url, liens: [PAGES.boucheuseMachoires] });

r.concept("boucheuse-universelle", "Capsuleuse boucheuse universelle", ["capsuleuse boucheuse", "boucheuse capsuleuse", "boucheuse universelle", "capsuleuse universelle", "universelle"], {
  famille: "boucheuse",
  lien: PAGES.boucheuseUniverselle,
});

r.fait("boucheuse-universelle", "definition", `
  La **capsuleuse boucheuse universelle** pose aussi bien les **bouchons en liège ou en plastique** que les **capsules couronne** : un seul appareil pour le vin, le cidre et la bière.`, { source: PAGES.boucheuses.url, liens: [PAGES.boucheuseUniverselle] });

// ─── Capsules couronne et capsuleuses ──────────────────────────────────────

r.concept("capsule-couronne", "Capsules couronne", ["capsule", "capsules", "capsule couronne", "capsules couronne", "capsule metal", "capsules metal", "capsule 26", "capsule 29", "capsules 26 mm", "capsules 29 mm", "26 mm", "29 mm", "capsulage"], {
  famille: "bouchage",
  lien: PAGES.bouchonsCidre,
  voirAussi: ["capsuleuse", "capsule-opercule"],
});

r.fait("capsule-couronne", "dimension", `
  Deux diamètres de capsules couronne :
  - **29 mm** pour les bouteilles **champenoises** (cidre, vins effervescents) ;
  - **26 mm** pour les **canettes et petites bouteilles** (bière, cidre en petit format).

  Vérifiez le col de vos bouteilles avant de commander : les deux ne sont pas interchangeables.`, { source: PAGES.bouchonsCidre.url, liens: [PAGES.capsules29Or, PAGES.capsules26Or] });

r.fait("capsule-couronne", "gamme", `
  Capsules couronne en métal : **29 mm** or ou rouge, en sacs de 200 ou 1000 ; **26 mm** or, en sac de 200 ; et capsules **29 mm à opercule incorporé**, or ou rouge, par 150 ou 1000, pour le cidre artisanal.`, { source: PAGES.bouchonsCidre.url, liens: [PAGES.capsules29Or, PAGES.capsules26Or, PAGES.capsulesOpercule] });

r.concept("capsule-opercule", "Capsules à opercule", ["opercule", "capsule a opercule", "capsules a opercule", "opercule incorpore", "capsule avec joint"], {
  famille: "capsule-couronne",
  lien: PAGES.capsulesOpercule,
});

r.fait("capsule-opercule", "definition", `
  La **capsule à opercule incorporé** comporte un joint intérieur qui renforce l'étanchéité : elle est conçue pour le **cidre artisanal**, en 29 mm, pour bouteilles champenoises.`, { source: PAGES.bouchonsCidre.url, liens: [PAGES.capsulesOpercule] });

r.concept("capsuleuse", "Capsuleuses", ["capsuleuse", "capsuleuses", "encapsuleuse", "sertisseuse", "poser les capsules", "capsuleuse super pro", "capsuleuse trepied"], {
  famille: "bouchage",
  lien: PAGES.capsuleuse,
});

r.fait("capsuleuse", "gamme", `
  Capsuleuses pour capsules couronne de 26 et 29 mm :
  - **capsuleuse** standard ;
  - **capsuleuse manuelle Super Pro** à base acier, plateau réglable, livrée avec deux bagues (26 et 29 mm) ;
  - **capsuleuse sur trépied**, actionnée par levier, très stable ;
  - **capsuleuse boucheuse universelle**, qui pose aussi les bouchons liège et plastique.`, {
  source: PAGES.bouchonsCidre.url,
  liens: [PAGES.capsuleuse, PAGES.capsuleuseSuperPro, PAGES.capsuleuseTrepied],
});

r.fait("capsuleuse", "procedure", `
  Pour capsuler : posez la capsule sur le goulot, placez la bouteille sur le plateau réglé à sa hauteur, vérifiez que la bague correspond au diamètre de la capsule (26 ou 29 mm), puis abaissez le levier : la capsule est sertie tout autour du col.`, { source: SAVOIR_FAIRE });
