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

r.concept("controle-bouchage", "Contrôler le bouchage", ["controle du bouchage", "controler le bouchage", "verifier le bouchage", "bouchon affleurant", "bouchon affleure", "bouchon centre"], {
  famille: "bouchage",
  lien: PAGES.boucheuses,
  formules: ["bouchons ne sont pas enfonces a la meme profondeur", "bouchons enfonces a des profondeurs differentes", "bouchons ne sont pas tous enfonces a la meme hauteur", "bouchons ne sont ils pas tous enfonces a la meme hauteur"],
});

r.fait("controle-bouchage", "procedure", `
  Pour contrôler le bouchage, vérifiez sur plusieurs bouteilles en début de série que le bouchon est **centré et affleure le haut du col**, sans fissure, copeau ni marque profonde. Laissez ensuite les bouteilles debout et surveillez toute **fuite** ou remontée du bouchon avant de les coucher.`, { source: SAVOIR_FAIRE, liens: [PAGES.boucheuses] });

r.fait("controle-bouchage", "erreur", `
  Des bouchons enfoncés à des hauteurs différentes indiquent un réglage qui bouge, une bouteille mal centrée, des cols hétérogènes ou une cadence irrégulière. Arrêtez la série, contrôlez le serrage et la butée puis refaites plusieurs essais avec des bouteilles identiques.`, { source: SAVOIR_FAIRE, liens: [PAGES.boucheuses] });

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
  formules: ["bouchon compatible avec ma bouteille", "bouchon est il compatible avec ma bouteille", "compatibilite bouchon bouteille"],
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

r.fait(["bouchon", "bouteille"], "condition", `
  La compatibilité ne se déduit pas du seul volume de la bouteille. Avant de choisir, vérifiez le **profil intérieur et le diamètre du goulot**, le type de boisson (tranquille ou sous pression), la durée de garde visée et la plage acceptée par la boucheuse. En cas de bouteille ancienne, récupérée ou sans référence, faites un essai sur un petit lot ou demandez confirmation au service client.`, { source: SAVOIR_FAIRE, liens: [PAGES.bouchonsVin, PAGES.contact] });

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
  Conservez les bouchons non utilisés dans leur **sachet fermé**, dans un endroit **sec, propre et sans odeurs** (produits ménagers, fioul, peinture) : le liège absorbe les odeurs. Refermez soigneusement un sachet entamé et suivez la durée indiquée par le fournisseur ; sans fiche du lot, ne promettez pas une durée précise.`, { source: SAVOIR_FAIRE });

r.concept("etat-bouchon", "État d’un bouchon en liège", ["bouchon trop sec", "bouchon fissure", "bouchon friable", "reconnaitre un mauvais bouchon"], {
  famille: "bouchon-liege",
  formules: ["reconnaitre un bouchon trop sec ou endommage", "bouchon sec ou endommage"],
});

r.fait("etat-bouchon", "condition", `
  Écartez un bouchon fissuré, déformé, friable, taché, très dur ou porteur d'une odeur étrangère. Un bouchon sain reste propre, souple et régulier ; ne tentez pas de restaurer un bouchon trop sec par trempage ou ébullition.`, { source: SAVOIR_FAIRE });

r.fait("etat-bouchon", "choix", `
  Retenez seulement des bouchons propres, souples, réguliers et sans odeur. Écartez ceux qui sont très durs, fissurés, déformés, friables ou tachés : un bouchon trop sec ou endommagé ne doit pas être « récupéré » par trempage.`, { source: SAVOIR_FAIRE });

r.concept("preparation-bouchon", "Préparer les bouchons avant la mise", ["preparer les bouchons", "bouchons prets a l emploi", "bouchons traites", "bouchons prepares"], {
  famille: "bouchon-liege",
  formules: ["faut il acheter des bouchons traites ou prepares", "acheter des bouchons deja traites"],
});

r.fait("preparation-bouchon", "choix", `
  Préférez des bouchons neufs dont la fiche confirme qu'ils sont **prêts à l'emploi** pour votre boisson et votre boucheuse. Les bouchons colmatés Duhallé sont traités « super-glisse » et s'utilisent secs : ne les trempez pas et n'improvisez pas de traitement maison.`, { source: SAVOIR_FAIRE, liens: [PAGES.bouchonsVin] });

r.concept("stockage-bouchons", "Stocker des bouchons neufs", ["stockage des bouchons neufs", "stocker des bouchons neufs", "conserver des bouchons neufs"], {
  famille: "bouchon-liege",
});

r.fait("stockage-bouchons", "procedure", `
  Gardez les bouchons neufs dans leur sachet d'origine bien refermé, dans un local sec, propre, tempéré et sans odeurs de peinture, carburant ou produit ménager. Évitez humidité, poussière et soleil ; pour la durée après ouverture, appliquez la fiche du lot plutôt qu'une durée générique.`, { source: SAVOIR_FAIRE });

r.concept("reemploi-bouchon", "Réutiliser un bouchon en liège", ["reutiliser un bouchon", "bouchon en liege reutilise", "remettre un bouchon usage"], {
  famille: "bouchon-liege",
});

r.fait("reemploi-bouchon", "condition", `
  Ne réutilisez pas un bouchon en liège extrait pour une nouvelle mise en bouteille : il est déjà comprimé, percé ou contaminé et son étanchéité n'est plus maîtrisée. Utilisez un bouchon neuf adapté ; un bouchon à tête est préférable pour refermer provisoirement une bouteille ouverte.`, { source: SAVOIR_FAIRE });

r.concept("bouchon-agglomere", "Bouchon aggloméré", ["bouchon agglomere", "bouchons agglomeres", "liege agglomere", "bouchon reconstitue"], {
  famille: "bouchon-liege",
});

r.fait("bouchon-agglomere", "condition", `
  Un bouchon aggloméré peut convenir au vin seulement si sa fiche le prévoit pour la boisson, le goulot et la durée visée. Sa qualité et ses performances varient selon la fabrication : ne transposez pas automatiquement les usages des bouchons naturels ou colmatés Duhallé.`, { source: SAVOIR_FAIRE, liens: [PAGES.contact] });

r.concept("gout-bouchon", "Goût transmis par le bouchon", ["gout de bouchon", "bouchon donne un gout", "odeur de liege dans le vin"], {
  famille: "bouchon-liege",
});

r.fait("gout-bouchon", "condition", `
  Un défaut dit « goût de bouchon » peut donner des odeurs de carton humide ou de moisi, mais toute odeur anormale ne vient pas forcément du liège. Isolez la bouteille, comparez avec une autre du lot et demandez un diagnostic avant de conclure sur toute une série.`, { source: SAVOIR_FAIRE });

r.fait("bouchon-liege", "duree", `
  La durée de conservation d'un vin bouché dépend du **vin**, de la qualité du liège, de la longueur, du goulot, de la pose et de la cave. Un 45 mm en liège naturel est destiné aux vins de garde ; un 38 mm colmaté de catégorie 5 ou 6 aux vins à boire jeunes. Duhallé ne publie pas encore d'**années de garde garanties par référence** : pour un engagement chiffré, demandez la fiche technique du lot au service client.`, { source: SAVOIR_FAIRE, liens: [PAGES.bouchonsVin, PAGES.contact] });

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

r.fait("categorie-bouchon", "duree", `
  Les catégories donnent un **usage cible**, pas une durée universelle : catégorie 3 pour les vins supérieurs et une garde intermédiaire, catégorie 4 pour les vins de pays, catégorie 5 pour les vins jeunes et le cidre, catégorie 6 pour une conservation courte. Les années exactes doivent venir de la **fiche technique de la référence vendue** ; sans elle, je préfère ne pas annoncer un chiffre qui pourrait être trompeur.`, { liens: [PAGES.bouchonsVin, PAGES.contact] });

r.fait("categorie-bouchon", "condition", `
  Une catégorie supérieure améliore la régularité du liège et peut soutenir une garde plus exigeante, mais elle **n'améliore pas le vin lui-même**. Choisissez la catégorie proportionnée au vin, à la durée et au budget plutôt que la plus haute par principe.`, { source: SAVOIR_FAIRE });

r.concept("bouchon-naturel", "Bouchons en liège naturel", ["liege naturel", "bouchon naturel", "bouchons naturels", "bouchon liege naturel", "naturel superieur", "bouchon haut de gamme", "bouchon premium", "bouchon d une piece"], {
  famille: "bouchon-liege",
  lien: PAGES.bouchon45Naturel,
});

r.fait("bouchon-naturel", "definition", `
  Le **bouchon en liège naturel** est taillé d'une seule pièce dans l'écorce du chêne-liège. C'est le bouchon des **vins de garde**. Duhallé le propose en **45 x 24 mm** : lot de 100 en catégorie 1, et lot de 40 en qualité « naturel supérieur ».`, { liens: [PAGES.bouchon45Naturel, PAGES.bouchon45NaturelSuperieur] });

r.fait("bouchon-naturel", "duree", `
  Le bouchon naturel **45 x 24 mm** est la référence Duhallé pour la **garde longue**. Le nombre d'années réellement possible dépend aussi du vin, de la bouteille, du bouchage et de la cave ; faute de durée garantie publiée pour chaque lot, demandez la fiche technique avant de promettre 5, 10 ans ou davantage.`, { liens: [PAGES.bouchon45Naturel, PAGES.contact] });

r.concept("bouchon-colmate", "Bouchons en liège colmaté", ["colmate", "colmates", "bouchon colmate", "bouchons colmates", "liege colmate", "colmatage", "super glisse"], {
  famille: "bouchon-liege",
  lien: PAGES.bouchon38Cat3,
});

r.fait("bouchon-colmate", "definition", `
  Un **bouchon colmaté** est un bouchon en liège naturel dont les pores (lenticelles) sont comblés avec de la poudre de liège : il est plus régulier, bien étanche et plus économique. Duhallé propose des colmatés **38 x 24 mm** (catégories 3, 4, 5 et 6) et **45 x 24 mm** (catégorie 3), traités « super-glisse ».`, { liens: [PAGES.bouchon38Cat3, PAGES.bouchon45Colmate] });

r.fait("bouchon-colmate", "duree", `
  Le colmaté **45 x 24 mm catégorie 3** vise les vins de qualité et une garde intermédiaire ; les 38 x 24 mm vont de la catégorie 3 à la catégorie 6 selon le vin. Duhallé ne publie pas encore de plafond chiffré par référence : utilisez l'horizon indiqué par la fiche technique du lot plutôt qu'une règle générale.`, { liens: [PAGES.bouchon45Colmate, PAGES.bouchonsVin, PAGES.contact] });

r.fait(["bouchon-naturel", "bouchon-colmate"], "choix", `
  **Naturel ou colmaté ?** Le liège **naturel** (catégorie 1, 45 x 24 mm) est le choix des grands vins de garde. Le **colmaté** convient à la grande majorité des vins faits maison : catégorie 3 pour les vins supérieurs, 4 pour les vins de pays, 5 pour les vins jeunes et le cidre, 6 pour une courte conservation.`, { liens: [PAGES.bouchon45Naturel, PAGES.bouchon38Cat3] });

r.concept("vin-de-garde", "Vin de garde", ["vin de garde", "vins de garde", "longue garde", "garder longtemps", "garder plusieurs annees", "garder des annees", "garder ans", "conserver ans", "conserver des annees", "vieillir", "vieillissement", "grand vin", "millesime"], {
  famille: "vin",
});

r.fait(["bouchon", "vin-de-garde"], "choix", `
  Pour un **vin de garde**, choisissez un bouchon **45 x 24 mm en liège naturel** (catégorie 1, ou qualité « naturel supérieur ») : plus le bouchon est long et le liège homogène, meilleure est l'étanchéité sur la durée. Pour un vin à garder quelques années seulement, le 45 x 24 mm colmaté catégorie 3 est un bon compromis.`, { liens: [PAGES.bouchon45Naturel, PAGES.bouchon45NaturelSuperieur, PAGES.bouchon45Colmate] });

r.concept("vin-jeune", "Vin jeune ou à boire rapidement", ["vin jeune", "vins jeunes", "vin de pays", "vins de pays", "vin de l annee", "vin a boire", "vin de table", "vin primeur", "courte conservation", "boire rapidement", "boire vite", "consommer rapidement", "vin ordinaire"], {
  famille: "vin",
  formules: ["a boire cet ete", "a boire dans l annee", "a consommer cet ete"],
});

r.fait("vin-de-garde", "duree", `
  Un vin de garde peut vieillir de nombreuses années en bouteille : cela dépend avant tout du vin lui-même. Pour qu'il tienne, bouchez-le avec un bouchon **45 x 24 mm en liège naturel** et conservez-le dans une cave fraîche, humide et sombre, bouteilles couchées.`, { source: SAVOIR_FAIRE, liens: [PAGES.bouchon45Naturel] });

r.fait(["bouchon", "vin-jeune"], "choix", `
  Pour un vin à boire dans les premières années, un bouchon **38 x 24 mm colmaté** suffit : catégorie 4 pour un vin de pays, catégorie 5 pour un vin jeune (et le cidre), catégorie 6 pour une consommation rapide. Pour quelques mois seulement, le bouchon **conique** 33 x 23 x 19 mm s'enfonce même à la main.`, { liens: [PAGES.bouchon38Cat4, PAGES.bouchon38Cat5, PAGES.bouchon38Cat6] });

r.concept("taille-bouchon", "Taille des bouchons", ["taille des bouchons", "taille de bouchon", "dimension des bouchons", "diametre du bouchon", "longueur du bouchon", "38 24", "45 24", "38 mm", "45 mm", "24 mm", "44 mm", "49 mm", "54 mm", "bouchon de 38", "bouchon de 45", "bouchon long", "bouchon court"], {
  famille: "bouchon-liege",
  formules: [
    "bouchon plus long conserve",
    "plus long conserve t il",
    "plus long conserve mieux",
    "diametre du col standard",
    "mesurer le diametre du col",
    "bouchon pour bouteilles anciennes ou recuperees",
    "choisir un bouchon pour des bouteilles anciennes",
    "adapter le bouchon aux bouteilles anciennes ou recuperees",
    "diametre du col de bouteille est il standard",
  ],
});

r.fait("taille-bouchon", "dimension", `
  Les bouchons se désignent par **longueur x diamètre**, en millimètres. Les références Duhallé pour bouteilles de vin standard ont un diamètre de **24 mm** et sont comprimées par la boucheuse. La **longueur** dépend de la garde : **38 mm** pour les vins à boire dans les premières années, **45 mm** pour les vins de garde. Le volume « 75 cl » ne garantit toutefois pas à lui seul le profil du goulot : vérifiez la bouteille, surtout si elle est ancienne ou récupérée.`, { source: SAVOIR_FAIRE, liens: [PAGES.bouchonsVin] });

r.fait("taille-bouchon", "raison", `
  Un bouchon plus long offre davantage de surface de contact, mais il ne conserve pas **forcément** mieux à lui seul. La qualité et l'homogénéité du liège, l'adaptation au goulot, la compression, la pose et les conditions de cave comptent aussi. C'est l'ensemble qui justifie le 45 mm pour la garde et le 38 mm pour les vins à boire jeunes.`, { source: SAVOIR_FAIRE });

r.fait("taille-bouchon", "choix", `
  Un bouchon plus long n'est pas automatiquement meilleur : choisissez **38 ou 45 mm** selon la durée de garde visée, la qualité du liège, le goulot et la boucheuse. Le 45 mm offre plus de surface de contact pour la garde, mais il ne compense ni un liège inadapté ni une mauvaise pose.`, { source: SAVOIR_FAIRE, liens: [PAGES.bouchonsVin] });

r.fait("taille-bouchon", "condition", `
  Le diamètre intérieur d'un col n'est pas garanti par la seule mention « bouteille de vin » ou « 75 cl ». Pour une bouteille ancienne, récupérée ou sans référence, mesurez le profil du goulot, vérifiez l'absence de défaut et faites un essai avec le bouchon et la boucheuse exacts.`, { source: SAVOIR_FAIRE, liens: [PAGES.contact] });

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

r.concept("boucheuse", "Boucheuses manuelles", ["boucheuse", "boucheuses", "bouchonneuse", "bouchonneuses", "boucheuse manuelle", "machine a boucher", "appareil a boucher", "bouchonner", "boucheuse a vin", "regler la profondeur du bouchon", "profondeur d enfoncement", "bouchon dechire", "bouchon marque", "bouchon coince dans la boucheuse", "boucher seul", "boucher a deux"], {
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

r.fait("boucheuse", "erreur", `
  Un bouchon **marqué, déchiré ou coincé** signale souvent un mauvais centrage, un bouchon hors de la plage admise, des mors sales ou usés, ou une compression/réglage inadapté. Arrêtez le geste, retirez la bouteille sans forcer sur le verre et contrôlez la notice et l'état des mors avant de reprendre. N'ajoutez un lubrifiant que s'il est explicitement prévu par le fabricant.`, { source: SAVOIR_FAIRE, liens: [PAGES.boucheuses] });

r.fait("boucheuse", "procedure", `
  Réglez la **profondeur d'enfoncement** selon la notice de la boucheuse, puis faites quelques essais : le bouchon doit être centré et **affleurer le haut du col**, sans être écrasé ni dépasser. Contrôlez plusieurs bouteilles au début de la série avant de conserver le réglage.`, { source: SAVOIR_FAIRE, liens: [PAGES.boucheuses] });

r.fait("boucheuse", "condition", `
  Une personne peut généralement utiliser seule une boucheuse manuelle correctement installée. Le modèle doit être stable, la bouteille bien centrée et les mains tenues hors des mors et du mécanisme. Pour une longue série, une deuxième personne peut préparer et contrôler les bouteilles, mais elle ne doit pas tenir le goulot pendant l'actionnement.`, { source: SAVOIR_FAIRE });

r.fait("boucheuse", "dimension", `
  La cadence réelle dépend du modèle, de l'opérateur, du réglage, de la préparation des bouteilles et des contrôles. Sans valeur publiée par le fabricant, chronométrez une série d'essai incluant le centrage et le contrôle plutôt que d'annoncer un nombre de bouteilles par heure.`, { source: SAVOIR_FAIRE });

r.fait("boucheuse", "entretien", `
  Dépoussiérez les mors et retirez les fragments de liège après chaque série, appareil hors tension ou hors charge. Contrôlez leur propreté, leur alignement et leur usure ; ne graissez jamais la zone en contact avec le bouchon sauf indication explicite de la notice.`, { source: SAVOIR_FAIRE, liens: [PAGES.boucheuses] });

r.concept("installation-boucheuse", "Installer une boucheuse", ["fixer la boucheuse", "boucheuse sur etabli", "installer une boucheuse", "stabiliser la boucheuse"], {
  famille: "boucheuse",
});

r.fait("installation-boucheuse", "condition", `
  Fixez la boucheuse à un établi si sa notice ou ses perçages le prévoient. Sinon, placez-la sur une surface plane, rigide et antidérapante. Dans tous les cas, elle ne doit ni basculer ni glisser pendant la course du levier.`, { source: SAVOIR_FAIRE, liens: [PAGES.boucheuses] });

r.concept("format-bouteille-boucheuse", "Formats de bouteille acceptés par la boucheuse", ["demi bouteille boucheuse", "petite bouteille boucheuse", "format bouteille boucheuse"], {
  famille: "boucheuse",
  formules: ["meme boucheuse pour demi bouteilles", "boucheuse pour bouteilles de 37 5 cl"],
});

r.fait("format-bouteille-boucheuse", "condition", `
  Une demi-bouteille peut utiliser la même boucheuse seulement si sa **hauteur, son goulot et son bouchon** entrent dans la plage du modèle et si le plateau la maintient correctement. Vérifiez la notice et faites un essai sans forcer.`, { source: SAVOIR_FAIRE, liens: [PAGES.boucheuses] });

r.fait(["bouchage", "format-bouteille-boucheuse"], "condition", `
  Oui, la même boucheuse peut convenir aux demi-bouteilles si leur **hauteur, leur goulot et leur bouchon** entrent dans la plage du modèle et si le plateau les maintient correctement. Contrôlez la notice et faites un essai sans forcer avant la série.`, { source: SAVOIR_FAIRE, liens: [PAGES.boucheuses] });

r.concept("securite-bouchage", "Sécurité pendant le bouchage", ["casser une bouteille au bouchage", "bouteille cassee boucheuse", "eviter la casse au bouchage"], {
  famille: "bouchage",
});

r.fait("securite-bouchage", "condition", `
  Inspectez le goulot, centrez la bouteille, réglez la hauteur sans contrainte latérale et actionnez le levier d'un geste régulier. N'utilisez jamais une bouteille fissurée ou ébréchée, ne forcez pas un bouchon hors format et gardez mains et visage hors de l'axe.`, { source: SAVOIR_FAIRE });

r.concept("bouchon-synthetique", "Bouchon synthétique", ["bouchon synthetique", "bouchons synthetiques", "bouchon plastique pour vin"], {
  famille: "bouchon",
});

r.fait(["boucheuse", "bouchon-synthetique"], "condition", `
  Une boucheuse à vin ne peut poser un bouchon synthétique que si le fabricant l'autorise pour le **matériau, le diamètre et la longueur** concernés. Certains synthétiques demandent une compression ou des mors spécifiques : vérifiez la notice des deux produits avant essai.`, { source: SAVOIR_FAIRE, liens: [PAGES.contact] });

r.fait(["boucheuse", "taille-bouchon"], "choix", `
  Pour des bouchons de **38 ou 45 mm**, vérifiez la longueur et le diamètre admis par la boucheuse, le type de mors, le réglage de hauteur/profondeur et la cadence prévue. Toutes les boucheuses ne couvrent pas automatiquement les mêmes formats : comparez la fiche du modèle au bouchon exact avant de commander.`, { liens: [PAGES.boucheuses, PAGES.bouchonsVin] });

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

r.fait("boucheuse-machoires", "condition", `
  Pour une série proche de **100 bouteilles**, une boucheuse sur pied à mâchoires n'est pas obligatoire, mais elle apporte davantage de stabilité, de régularité et de confort qu'un petit modèle tenu sur le goulot. Vérifiez toujours la capacité annoncée et les formats admis par le modèle choisi.`, { source: PAGES.boucheuses.url, liens: [PAGES.boucheuseMachoires] });

r.concept("boucheuse-universelle", "Capsuleuse boucheuse universelle", ["capsuleuse boucheuse", "boucheuse capsuleuse", "boucheuse universelle", "capsuleuse universelle", "universelle"], {
  famille: "boucheuse",
  lien: PAGES.boucheuseUniverselle,
  formules: ["poser des capsules couronne et des bouchons liege", "capsules couronne et bouchons liege"],
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

r.fait("capsuleuse", "condition", `
  Une capsuleuse n'accepte les capsules de **26 et 29 mm** que si sa fiche prévoit les deux diamètres et que les têtes ou bagues correspondantes sont fournies ou disponibles. Vérifiez aussi la bague de la bouteille : le volume du flacon ne suffit pas à déterminer le diamètre.`, { liens: [PAGES.capsuleuse, PAGES.capsules29Or, PAGES.capsules26Or] });
