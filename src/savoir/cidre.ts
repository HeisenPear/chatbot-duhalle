// Le cidre maison : pommes, broyage, pressage, fermentation, bouchage.
import { PAGES } from "./liens";
import { rubrique, SAVOIR_FAIRE } from "./outils";

const r = rubrique(PAGES.cidre.url);
export const cidre = r;

const IFPC = "https://www.ifpc.eu/wp-content/uploads/2024/12/GBPH-cidre_modifie-180228.pdf";

r.concept("cidre", "Le cidre maison", ["cidre", "cidres", "cidre maison", "faire son cidre", "faire du cidre", "fabriquer du cidre", "fabrication du cidre", "cidrerie", "poire", "poiré", "recolter les pommes a cidre", "ramasser les pommes a cidre"], {
  famille: "catalogue",
  lien: PAGES.cidre,
  voirAussi: ["broyeur", "pressoir", "capsule-couronne"],
});

r.fait("cidre", "procedure", `
  Les grandes étapes du cidre maison :
  1. **Récolter** des pommes bien mûres, idéalement un mélange de variétés douces, acidulées et amères, et les laisser mûrir encore quelques jours.
  2. **Broyer** les pommes en pulpe avec un broyeur.
  3. **Presser** la pulpe au pressoir pour en extraire le jus.
  4. **Fermenter** : laissez le jus fermenter au frais, en fût ou en dame-jeanne, pendant plusieurs semaines.
  5. **Soutirer** pour séparer le cidre de son dépôt.
  6. **Mettre en bouteille** dans des bouteilles champenoises, fermées par une capsule couronne de 29 mm.`, { source: SAVOIR_FAIRE, liens: [PAGES.articleCidre, PAGES.cidre] });

r.fait("cidre", "gamme", `
  Pour faire son cidre, Duhallé propose : un **broyeur à pommes** manuel en inox, des **pressoirs** en bois de 6, 11, 20 et 28 litres, des **capsules couronne** 26 et 29 mm (dont des capsules à opercule), des **bouchons plastique** à tête crantée et des **capsuleuses**.`, { liens: [PAGES.broyerPresser, PAGES.bouchonsCidre] });

r.fait("cidre", "moment", `
  Le cidre se prépare à **l'automne**, avec les pommes de fin de saison (d'octobre à décembre selon les variétés). Après plusieurs semaines de fermentation au frais, la mise en bouteille se fait généralement en **fin d'hiver ou au printemps**.`, { source: SAVOIR_FAIRE, liens: [PAGES.articleCidre] });

r.fait(["cidre", "mise-en-bouteille"], "moment", `
  Le cidre se met en bouteille en **fin d'hiver ou au printemps**, après plusieurs semaines de fermentation au frais, quand elle a nettement ralenti et que le cidre s'est éclairci. Plus il reste de sucre à ce moment-là, plus le cidre sera pétillant : utilisez des bouteilles champenoises.`, { source: SAVOIR_FAIRE, liens: [PAGES.articleCidre] });

r.fait(["cidre", "mise-en-bouteille"], "procedure", `
  Pour mettre le cidre en bouteille : soutirez-le sans remuer le dépôt, remplissez des **bouteilles champenoises** propres en laissant quelques centimètres de vide, puis fermez-les avec une **capsule couronne de 29 mm** (avec opercule de préférence) posée à la capsuleuse. N'utilisez pas de bouteilles de vin tranquille : elles ne résistent pas à la pression du cidre. Stockez ensuite les bouteilles au frais.`, { source: SAVOIR_FAIRE, liens: [PAGES.capsules29Or, PAGES.capsuleuse] });

r.fait("cidre", "condition", `
  Un cidre mis en bouteille avec des sucres encore fermentescibles produit du gaz : la pression peut devenir dangereuse. Utilisez uniquement des bouteilles et fermetures prévues pour la pression visée, mesurez l'évolution de la fermentation et ne dosez jamais le sucre « au jugé ». Si un lot devient anormalement dur, fuyant ou très gazeux, isolez-le, refroidissez-le et évitez les manipulations sans protection.`, { source: IFPC });

r.fait("cidre", "erreur", `
  Un cidre **plat** peut venir d'une fermeture non étanche, d'une fermentation en bouteille insuffisante, d'une température trop basse ou de levures inactives. Ne rajoutez pas de sucre au hasard : mesurez d'abord la densité et vérifiez le protocole, car une correction excessive peut créer une surpression.`, { source: IFPC });

r.fait(["bouchage", "cidre"], "choix", `
  Pour boucher le cidre :
  - **capsule couronne 29 mm** sur bouteille champenoise : la solution la plus courante ;
  - **capsule 26 mm** pour les petites bouteilles type bière ;
  - **bouchon mécanique** seulement avec une bouteille et un joint compatibles avec la pression ;
  - **bouchon liège ou plastique avec muselet** lorsque le système complet bouteille-bouchon-muselet le prévoit ;
  - pour un cidre tranquille, un bouchon liège **38 x 24 mm colmaté catégorie 5**.

  Le choix dépend d'abord de la **bague du goulot**, de la pression attendue et de la durée de conservation. Les capsules se posent avec une capsuleuse compatible.`, { liens: [PAGES.capsules29Or, PAGES.capsulesOpercule, PAGES.bouchonsPlastiqueCidre] });

r.concept("pomme", "Les pommes à cidre", ["pomme", "pommes", "pommes a cidre", "variete de pomme", "varietes de pommes", "quelles pommes", "pommes douces", "pommes ameres", "pommes acides", "fruits"], {
  famille: "cidre",
  formules: ["laver les pommes avant de les broyer", "laver les pommes avant broyage", "garder les pommes avant pressage", "conserver les pommes avant de les presser"],
});

r.fait("pomme", "choix", `
  Un bon cidre naît d'un **assemblage** : des pommes **douces** pour le sucre, **acidulées** pour la fraîcheur et **amères** pour la structure et la couleur. À défaut de pommes à cidre, un mélange de pommes de table bien mûres donne déjà un cidre agréable. Écartez les fruits pourris.`, { source: SAVOIR_FAIRE });

r.fait("pomme", "condition", `
  Avant le broyage, triez les pommes et retirez fruits pourris, terre, feuilles, cailloux et autres corps étrangers. Lavez-les avec une eau propre lorsqu'elles sont sales, puis laissez-les s'égoutter : la fermentation ne remplace pas l'hygiène des fruits et du matériel.`, { source: IFPC });

r.fait("pomme", "duree", `
  La durée d'attente avant pressage dépend de la variété, de la maturité et de l'état sanitaire : stockez les pommes en couche aérée, au frais et à l'abri, contrôlez-les souvent et éliminez tout fruit pourri. Pressez dès que la maturité recherchée est atteinte plutôt que d'appliquer un nombre de jours universel.`, { source: IFPC });

r.concept("broyeur", "Broyeur à pommes", ["broyeur", "broyeurs", "broyeur a pommes", "broyer", "broyer les pommes", "broyage", "raper les pommes", "moulin a pommes", "concasseur"], {
  famille: "cidre",
  lien: PAGES.broyeurPommes,
});

r.fait("broyeur", "definition", `
  Le **broyeur à pommes manuel** Duhallé, en **inox**, fonctionne à la manivelle : ses rouleaux et ses lames réduisent les fruits en pulpe avant le pressage, pour le cidre comme pour le jus de pomme.`, { source: PAGES.broyerPresser.url, liens: [PAGES.broyeurPommes] });

r.fait("broyeur", "raison", `
  Broyer avant de presser est indispensable : des pommes entières ou simplement coupées rendent très peu de jus. Une pulpe fine libère beaucoup plus de jus au pressoir.`, { source: SAVOIR_FAIRE });

r.concept("pressoir", "Pressoirs", ["pressoir", "pressoirs", "pressoir a pommes", "pressoir en bois", "pressoir a fruits", "presse", "presse fruits", "presser", "presser les pommes", "pressage", "cage", "6 litres", "11 litres", "20 litres", "28 litres"], {
  famille: "cidre",
  lien: PAGES.broyerPresser,
});

r.fait("pressoir", "gamme", `
  Pressoirs à cage en bois de **6, 11, 20 et 28 litres**, pour le cidre, le jus de pomme ou de fruits, et même le vin ou les fruits à confiture.`, { source: PAGES.broyerPresser.url, liens: [PAGES.pressoir20, PAGES.broyerPresser] });

r.fait("pressoir", "choix", `
  Choisissez la taille selon le volume de pulpe par cycle, le nombre de cycles acceptable, l'effort, l'encombrement et le débit du broyeur : les pressoirs de **6 et 11 litres** conviennent à quelques cagettes, ceux de **20 et 28 litres** à une production plus soutenue. La contenance est celle de la cage, pas le nombre de litres de jus obtenu.`, { source: SAVOIR_FAIRE, liens: [PAGES.broyerPresser] });

r.concept("rendement-jus", "Rendement des pommes en jus", ["rendement en jus", "rendement des pommes", "jus avec 10 kg de pommes", "10 kg de pommes", "litres de jus par kilo", "quantite de jus"], {
  famille: "cidre",
  lien: PAGES.broyerPresser,
});

r.fait("rendement-jus", "dimension", `
  À titre d'ordre de grandeur, **10 kg de pommes donnent souvent environ 5 à 7 L de jus**. Le résultat varie fortement avec la variété, la maturité, la finesse du broyage, le remplissage de la cage et la pression : pesez un premier lot et mesurez son jus pour dimensionner la suite.`, { source: SAVOIR_FAIRE, liens: [PAGES.broyerPresser] });

r.concept("fermentation-cidre", "Fin de fermentation du cidre", ["fermentation du cidre", "fermentation terminee", "fermentation finie", "fin de fermentation", "densite du cidre", "densimetre a cidre", "cidre pret a embouteiller", "cidre pret a mettre en bouteille"], {
  famille: "cidre",
  lien: PAGES.cidre,
});

r.fait("fermentation-cidre", "moment", `
  Ne jugez pas la fin de fermentation aux bulles seules. Mesurez la **densité à plusieurs jours d'intervalle** et vérifiez qu'elle est stable, puis tenez compte du sucre résiduel, du style souhaité et du procédé de prise de mousse avant d'embouteiller.`, { source: IFPC });

r.fait("fermentation-cidre", "dimension", `
  Il n'existe pas une densité universelle de mise en bouteille valable pour tous les cidres : elle dépend du sucre résiduel, du degré, du gaz recherché, de la température et de la résistance du contenant. Sans protocole cidricole validé, je préfère ne pas donner de seuil chiffré pouvant créer une surpression.`, { source: IFPC });

r.fait("fermentation-cidre", "condition", `
  Avant la mise, exigez des mesures cohérentes et stables et un protocole adapté au type de cidre. Toute addition de sucre doit tenir compte du sucre déjà présent et de la pression admissible de la bouteille et de la fermeture.`, { source: IFPC });

r.fait("pressoir", "procedure", `
  Remplissez la cage de pulpe broyée (idéalement dans une toile de pressage), posez les demi-lunes et les cales en bois, puis serrez la vis **progressivement**. Laissez le jus s'écouler entre deux serrages : un pressage lent donne plus de jus.`, { source: SAVOIR_FAIRE });

r.concept("nettoyage-materiel-cidre", "Nettoyer broyeur et pressoir", ["nettoyer le broyeur", "nettoyer le pressoir", "laver le broyeur", "laver le pressoir", "broyeur apres usage", "pressoir apres usage", "fruits colorants pressoir"], {
  famille: "cidre",
  lien: PAGES.broyerPresser,
  formules: ["presser apres des fruits tres colorants", "nettoyer le pressoir apres des fruits colorants"],
});

r.fait("nettoyage-materiel-cidre", "procedure", `
  Nettoyez immédiatement après usage avant que pulpe et jus ne sèchent : démontez seulement les pièces prévues par la notice, retirez les résidus, lavez avec un produit compatible alimentaire, rincez et séchez. Pour des fruits colorants, répétez le lavage sans abrasif agressif et acceptez une coloration résiduelle si la surface reste propre et intacte.`, { source: IFPC, liens: [PAGES.broyerPresser] });

r.fait(["nettoyage-bouteilles", "nettoyage-materiel-cidre"], "procedure", `
  Après des fruits très colorants, nettoyez le pressoir immédiatement : retirez les résidus, lavez les pièces prévues par la notice avec un produit compatible alimentaire, rincez et séchez. Répétez sans abrasif agressif ; une coloration résiduelle est acceptable si la surface reste propre, intacte et sans transfert.`, { source: IFPC, liens: [PAGES.broyerPresser] });

r.concept("sucre-cidre", "Sucre et prise de mousse du cidre", ["sucre pour le cidre", "sucre prise de mousse", "combien de sucre cidre", "cidre trop gazeux", "surpression cidre"], {
  famille: "cidre",
});

r.fait("sucre-cidre", "dimension", `
  Je ne donne pas de dose universelle : le sucre à ajouter dépend du **sucre résiduel déjà mesuré**, du gaz recherché, de la température, des levures et de la pression admissible par la bouteille et la fermeture. Utilisez un protocole cidricole validé et mesurez la densité ; un dosage au jugé peut faire éclater les bouteilles.`, { source: IFPC });

r.fait("sucre-cidre", "raison", `
  Un cidre trop gazeux contient souvent davantage de sucres fermentescibles que prévu, a été embouteillé trop tôt ou a fermenté plus chaud. Refroidissez et isolez prudemment le lot, évitez les manipulations et faites contrôler le protocole avant toute ouverture ou correction.`, { source: IFPC });

r.concept("maturation-cidre", "Maturation du cidre embouteillé", ["boire un cidre embouteille", "attendre avant de boire le cidre", "maturation en bouteille cidre"], {
  famille: "cidre",
});

r.fait("maturation-cidre", "duree", `
  Le délai avant dégustation dépend de la prise de mousse, de la stabilité et du style recherché. Ne fixez pas une date d'ouverture à partir du calendrier seul : suivez le protocole, la densité et l'état des bouteilles, et conservez-les au frais dans un contenant prévu pour la pression.`, { source: IFPC });

r.concept("style-cidre", "Cidre doux ou brut", ["cidre doux", "cidre brut", "cidre demi sec", "obtenir un cidre doux", "sucre residuel cidre"], {
  famille: "cidre",
});

r.fait("style-cidre", "procedure", `
  Le style doux ou brut se pilote par l'assemblage, le suivi de fermentation, le sucre résiduel et la stabilisation, pas par un ajout de sucre au hasard en bouteille. Mesurez la densité et appliquez un protocole cidricole validé avant la mise, car conserver davantage de sucre augmente aussi le risque de pression.`, { source: IFPC });

r.fait("style-cidre", "choix", `
  **Doux ou brut** ne se choisit pas avec une simple dose finale de sucre : le brut fermente plus loin, tandis que le doux conserve davantage de sucre résiduel. Choisissez d'abord le style, puis suivez densité, fermentation et stabilisation avec un protocole cidricole validé avant la mise.`, { source: IFPC });

r.concept("cidre-trouble", "Cidre trouble", ["cidre trouble", "cidre devient trouble", "trouble dans le cidre", "depot dans le cidre"], {
  famille: "cidre",
});

r.fait("cidre-trouble", "raison", `
  Un trouble peut venir de particules, de levures en suspension, d'une reprise de fermentation ou d'une instabilité. Observez la densité, le gaz, l'odeur et l'évolution ; soutirez seulement si le diagnostic le justifie et ne mettez pas en bouteille un cidre instable.`, { source: IFPC });

r.concept("bouchon-mecanique-cidre", "Bouchon mécanique de cidre", ["bouchon mecanique cidre", "bouchon a etrier cidre", "reutiliser bouchon mecanique", "joint bouchon mecanique"], {
  famille: "bouchage",
});

r.fait("bouchon-mecanique-cidre", "condition", `
  Réutilisez le mécanisme seulement s'il est conçu pour plusieurs usages, intact et compatible avec la pression ; remplacez le joint dès qu'il est durci, fissuré ou selon la consigne du fabricant. Contrôlez aussi la bouteille et sa bague : le bouchon seul ne garantit pas la résistance à la pression.`, { source: IFPC });

r.concept("jus", "Jus de pomme et de fruits", ["jus", "jus de pomme", "jus de pommes", "jus de fruits", "pur jus", "jus maison", "jus de raisin"], {
  famille: "cidre",
  formules: ["conserver du jus de pomme maison", "comment conserver du jus de pomme maison", "conservation du jus de pomme"],
});

r.fait("jus", "usage", `
  Le broyeur et le pressoir servent aussi à faire du **jus de pomme** ou de fruits maison. Le jus frais est périssable : conservez-le immédiatement au froid pour une courte durée, congelez-le dans un contenant adapté, ou appliquez une méthode de pasteurisation validée avant conditionnement. Ne laissez pas une bouteille fermée fermenter sans maîtrise de la pression.`, { source: IFPC, liens: [PAGES.broyerPresser, PAGES.sterilisateur] });

r.fait("jus", "entretien", `
  Pour conserver un jus de pomme maison, choisissez immédiatement une méthode maîtrisée : **froid pour une courte durée**, congélation dans un contenant adapté, ou pasteurisation selon un protocole validé. Une bouteille fermée laissée à fermenter peut monter en pression ; ne comptez pas sur le seul bouchage pour stabiliser le jus.`, { source: IFPC, liens: [PAGES.sterilisateur] });

r.concept("bouchon-plastique-cidre", "Bouchons plastique pour cidre", ["bouchon plastique", "bouchons plastique", "bouchons en plastique", "tete crantee", "bouchon champignon"], {
  famille: "bouchon",
  lien: PAGES.bouchonsPlastiqueCidre,
});

r.fait("bouchon-plastique-cidre", "definition", `
  **Bouchons en plastique à tête crantée** pour bouteilles de cidre, en lot de 100. Ils se posent notamment avec la capsuleuse boucheuse universelle.`, { source: PAGES.bouchonsCidre.url, liens: [PAGES.bouchonsPlastiqueCidre, PAGES.boucheuseUniverselle] });

r.concept("bouteille-champenoise", "Bouteilles champenoises", ["bouteille champenoise", "bouteilles champenoises", "bouteille de champagne", "bouteilles de champagne", "bouteille petillant", "petillant", "effervescent", "mousseux", "bulles", "prise de mousse", "pression", "supporte la pression", "resiste a la pression", "bouteille qui explose", "eclater"], {
  famille: "bouteille",
});

r.fait(["bouteille", "cidre"], "choix", `
  Pour le cidre, utilisez des **bouteilles champenoises** : leur verre épais résiste à la pression du cidre pétillant. Fermez-les avec une **capsule couronne de 29 mm**. Les petites bouteilles type bière, fermées par des capsules de 26 mm, conviennent aussi.`, { source: SAVOIR_FAIRE, liens: [PAGES.capsules29Or, PAGES.capsules26Or] });

r.fait("bouteille-champenoise", "condition", `
  Pour le cidre et les boissons pétillantes, utilisez une bouteille explicitement conçue pour la **pression visée**, sans éclat ni fissure, avec une fermeture correspondant exactement à sa bague. Une bouteille de vin tranquille ou une bouteille décorative non certifiée peut éclater. Le format 29 mm est courant sur les bouteilles champenoises, mais vérifiez toujours la bague.`, { source: IFPC, liens: [PAGES.capsules29Or] });
