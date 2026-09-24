// Le cidre maison : pommes, broyage, pressage, fermentation, bouchage.
import { PAGES } from "./liens";
import { rubrique, SAVOIR_FAIRE } from "./outils";

const r = rubrique(PAGES.cidre.url);
export const cidre = r;

r.concept("cidre", "Le cidre maison", ["cidre", "cidres", "cidre maison", "faire son cidre", "faire du cidre", "fabriquer du cidre", "fabrication du cidre", "cidrerie", "poire", "poiré"], {
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
  Un cidre mis en bouteille avant la fin de sa fermentation devient **pétillant** : le gaz s'accumule dans la bouteille. Utilisez donc **uniquement des bouteilles champenoises**, conçues pour résister à la pression, jamais des bouteilles de vin tranquille, et n'ajoutez pas trop de sucre : les bouteilles pourraient éclater.`, { source: SAVOIR_FAIRE });

r.fait(["bouchage", "cidre"], "choix", `
  Pour boucher le cidre :
  - **capsule couronne 29 mm** sur bouteille champenoise : la solution la plus courante, avec **opercule** pour une meilleure étanchéité ;
  - **capsule 26 mm** pour les petites bouteilles type bière ;
  - **bouchon plastique à tête crantée** ;
  - pour un cidre tranquille (non pétillant), un bouchon liège **38 x 24 mm colmaté catégorie 5**.

  Les capsules se posent avec une **capsuleuse**.`, { liens: [PAGES.capsules29Or, PAGES.capsulesOpercule, PAGES.bouchonsPlastiqueCidre] });

r.concept("pomme", "Les pommes à cidre", ["pomme", "pommes", "pommes a cidre", "variete de pomme", "varietes de pommes", "quelles pommes", "pommes douces", "pommes ameres", "pommes acides", "fruits"], {
  famille: "cidre",
});

r.fait("pomme", "choix", `
  Un bon cidre naît d'un **assemblage** : des pommes **douces** pour le sucre, **acidulées** pour la fraîcheur et **amères** pour la structure et la couleur. À défaut de pommes à cidre, un mélange de pommes de table bien mûres donne déjà un cidre agréable. Écartez les fruits pourris.`, { source: SAVOIR_FAIRE });

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
  Choisissez la taille selon vos quantités : les pressoirs de **6 et 11 litres** conviennent à quelques cagettes de fruits, ceux de **20 et 28 litres** à une vraie production de cidre ou de jus. La contenance correspond au volume de pulpe que la cage peut recevoir à chaque pressée.`, { source: SAVOIR_FAIRE, liens: [PAGES.broyerPresser] });

r.fait("pressoir", "procedure", `
  Remplissez la cage de pulpe broyée (idéalement dans une toile de pressage), posez les demi-lunes et les cales en bois, puis serrez la vis **progressivement**. Laissez le jus s'écouler entre deux serrages : un pressage lent donne plus de jus.`, { source: SAVOIR_FAIRE });

r.concept("jus", "Jus de pomme et de fruits", ["jus", "jus de pomme", "jus de pommes", "jus de fruits", "pur jus", "jus maison", "jus de raisin"], {
  famille: "cidre",
});

r.fait("jus", "usage", `
  Le broyeur et le pressoir servent aussi à faire du **jus de pomme** ou de fruits maison. Non traité, le jus commence à fermenter en quelques jours : pour le garder plusieurs mois, il doit être **pasteurisé** en bouteilles, par exemple dans un stérilisateur.`, { source: SAVOIR_FAIRE, liens: [PAGES.broyerPresser, PAGES.sterilisateur] });

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
  Pour le cidre et les boissons pétillantes, utilisez des **bouteilles champenoises**, au verre épais conçu pour résister à la pression, fermées par une **capsule couronne de 29 mm**. Une bouteille de vin tranquille n'est pas faite pour contenir du gaz et risque d'éclater.`, { source: SAVOIR_FAIRE, liens: [PAGES.capsules29Or] });
