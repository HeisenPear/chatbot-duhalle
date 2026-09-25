// Le vinaigre maison et les vinaigriers en grès fabriqués au Portugal.
import { PAGES } from "./liens";
import { rubrique, SAVOIR_FAIRE } from "./outils";

const r = rubrique(PAGES.vinaigriers.url);
export const vinaigre = r;

r.concept("vinaigre", "Le vinaigre maison", ["vinaigre", "vinaigres", "vinaigre maison", "vinaigre de vin", "faire son vinaigre", "faire du vinaigre", "fabriquer du vinaigre", "vinaigrerie", "acetification"], {
  famille: "catalogue",
  lien: PAGES.vinaigriers,
  voirAussi: ["vinaigrier", "mere-vinaigre"],
});

r.fait("vinaigre", "procedure", `
  Pour faire votre vinaigre maison :
  1. Placez une **mère de vinaigre** (ou un peu de vinaigre non pasteurisé) dans un vinaigrier propre.
  2. Ajoutez du **vin**, par exemple vos fins de bouteilles, sans remplir le vinaigrier à ras bord : la transformation a besoin d'air.
  3. Laissez-le dans une pièce **tempérée (20 à 30 °C)**, à l'abri de la lumière, fermé par un bouchon qui laisse passer l'air.
  4. Après quelques semaines, goûtez : quand le vinaigre est prêt, tirez-le par le **robinet**.
  5. Complétez ensuite régulièrement avec un peu de vin.`, { source: SAVOIR_FAIRE, liens: [PAGES.vinaigriers] });

r.fait("vinaigre", "duree", `
  Comptez généralement **quelques semaines, souvent 1 à 2 mois**, pour obtenir un premier vinaigre, selon la température et la vigueur de la mère. Ensuite, en ajoutant régulièrement un peu de vin, vous tirez du vinaigre au fil de vos besoins.`, { source: SAVOIR_FAIRE });

r.fait("vinaigre", "raison", `
  Un vinaigre qui ne se forme pas manque souvent d'une de ces conditions : une **mère** vivante (ou un vinaigre non pasteurisé pour démarrer), assez d'**air** (vinaigrier pas trop rempli, bouchon non hermétique), une **température** suffisante (20 à 30 °C) et un vin **peu soufré**. Soyez aussi patient : il faut souvent 1 à 2 mois.`, { source: SAVOIR_FAIRE });

r.fait("vinaigre", "erreur", `
  À éviter :
  - un vin très soufré, car les sulfites freinent la mère ;
  - un vinaigrier rempli à ras bord ou fermé hermétiquement ;
  - une pièce trop froide ;
  - les récipients métalliques, qui réagissent avec l'acidité ;
  - remuer la mère sans nécessité.`, { source: SAVOIR_FAIRE });

r.fait(["vinaigre", "cidre"], "condition", `
  Oui, un cidre contenant encore de l'alcool peut servir à produire un **vinaigre de cidre**. Utilisez un cidre sain, peu ou pas sulfité, laissez l'air nécessaire aux bactéries acétiques et démarrez avec une mère adaptée ou un vinaigre de cidre non pasteurisé actif.`, { source: SAVOIR_FAIRE });

r.concept("mere-vinaigre", "La mère de vinaigre", ["mere de vinaigre", "mere du vinaigre", "mere", "voile", "peau gelatineuse", "bacteries acetiques", "acetobacter", "pellicule sur le vinaigre"], {
  famille: "vinaigre",
  formules: ["pellicule se forme a la surface"],
});

r.fait("mere-vinaigre", "definition", `
  La **mère de vinaigre** est un voile gélatineux formé par des bactéries acétiques : elle accompagne la transformation de l'alcool en acide acétique. Une mère visible n'est pas strictement obligatoire si l'on ensemence avec un vinaigre non pasteurisé actif ; elle peut ensuite se former d'elle-même.`, { source: SAVOIR_FAIRE });

r.fait("mere-vinaigre", "raison", `
  Une pellicule lisse et gélatineuse à la surface peut être une nouvelle mère, ce qui est normal. En revanche, des taches duveteuses, colorées ou une odeur anormale évoquent une contamination : ne confondez pas les deux et écartez le lot en cas de doute.`, { source: SAVOIR_FAIRE });

r.concept("vinaigrier", "Vinaigriers", ["vinaigrier", "vinaigriers", "vinaigrier en gres", "vinaigrier gres", "jarre a vinaigre", "pot a vinaigre", "tonneau a vinaigre", "vinaigrier chene", "vinaigrier en chene", "gres", "ustensiles en gres", "poterie"], {
  famille: "vinaigre",
  lien: PAGES.vinaigriers,
});

r.fait("vinaigrier", "definition", `
  Les vinaigriers Duhallé sont en **grès**, fabriqués artisanalement au **Portugal** par une entreprise à taille humaine. Le grès protège le vinaigre de la lumière et des écarts de température. Ils sont équipés d'un **robinet en bois** et d'un **bouchon en liège**, et certains modèles sont livrés avec leur **tabouret en bois**.`, { liens: [PAGES.vinaigriers] });

r.fait("vinaigrier", "gamme", `
  Les vinaigriers Duhallé, de 2,5 à 5 litres :
  - **2,5 L** rouge ;
  - **3,5 L** gris anthracite ;
  - **4 L** grès naturel, bleu Provence, jaune safran ou « à l'ancienne », avec tabouret en bois selon le modèle ;
  - **5 L** en forme de tonneau, grès naturel ou bleu nuit, avec tabouret ;
  - et un **vinaigrier en chêne de 3 L**, de fabrication française.`, { liens: [PAGES.vinaigriers, PAGES.vinaigrier4L, PAGES.vinaigrierChene] });

r.fait("vinaigrier", "choix", `
  Choisissez la contenance selon votre consommation : **2,5 à 3,5 L** pour un usage familial, **4 à 5 L** si vous utilisez beaucoup de vinaigre ou avez souvent des restes de vin. Le **grès** est le plus facile à entretenir ; le **chêne** apporte des notes boisées au vinaigre.`, { source: SAVOIR_FAIRE, liens: [PAGES.vinaigriers] });

r.fait("vinaigrier", "entretien", `
  Avant la première utilisation, rincez le vinaigrier à l'eau claire, **sans produit vaisselle**. Faites tremper le **robinet en bois** dans l'eau quelques heures pour qu'il gonfle et devienne étanche. Pour le nettoyer, videz-le, rincez à l'eau chaude puis au vinaigre, et relancez-le avec une partie de la mère.`, { source: SAVOIR_FAIRE });

r.fait("vinaigrier", "condition", `
  Pendant l'acétification, ne fermez pas le vinaigrier **hermétiquement** : les bactéries ont besoin d'oxygène. Protégez plutôt l'ouverture avec une toile fine, propre et respirante, solidement fixée, afin de laisser passer l'air tout en bloquant les insectes.`, { source: SAVOIR_FAIRE });

r.fait(["vinaigrier", "vin"], "procedure", `
  Vous pouvez alimenter le vinaigrier avec du vin rouge ou blanc **sain**, sans défaut majeur. Ajoutez-le progressivement pour ne pas noyer la mère ; un vin très soufré peut ralentir l'acétification.`, { source: SAVOIR_FAIRE });

r.concept("vin-pour-vinaigre", "Choisir le vin de départ", ["vin rouge ou blanc vinaigre"], {
  famille: "vinaigre",
  formules: ["quel vin utiliser pour faire du vinaigre", "quel vin pour le vinaigre"],
});

r.fait("vin-pour-vinaigre", "choix", `
  Utilisez un vin rouge ou blanc **sain**, sans défaut majeur et pas excessivement soufré. Évitez un vin moisi, contaminé ou très altéré : la transformation en vinaigre ne corrige pas un produit impropre. Ajoutez-le progressivement à une culture active.`, { source: SAVOIR_FAIRE });

r.concept("moucherons-vinaigrier", "Moucherons dans le vinaigrier", ["moucheron", "moucherons", "mouche du vinaigre", "mouches du vinaigre", "insectes dans le vinaigrier", "eviter les moucherons", "proteger le vinaigrier des mouches"], {
  famille: "vinaigrier",
});

r.fait("moucherons-vinaigrier", "condition", `
  Couvrez l'ouverture d'une **toile fine respirante**, nettoyez immédiatement les coulures autour du robinet et éloignez fruits mûrs et déchets. Vérifiez que la protection ne laisse aucun passage, mais ne remplacez pas cette aération par une fermeture hermétique.`, { source: SAVOIR_FAIRE });

r.concept("robinet-vinaigrier", "Robinet du vinaigrier", ["robinet", "robinet en bois", "robinet qui fuit", "le robinet coule", "robinet vinaigrier"], {
  famille: "vinaigrier",
});

r.fait("robinet-vinaigrier", "condition", `
  Un **robinet en bois** qui fuit un peu au début est normal : le bois doit gonfler. Faites-le tremper dans l'eau quelques heures avant de le remettre en place. Si la fuite persiste, contactez le service client.`, { source: SAVOIR_FAIRE, liens: [PAGES.contact] });

r.concept("entretien-robinet-vinaigrier", "Installer et nettoyer le robinet du vinaigrier", ["entretien du robinet de vinaigrier", "montage du robinet en bois"], {
  famille: "robinet-vinaigrier",
  formules: ["nettoyer le robinet en bois", "laver le robinet en bois", "installer la bonde et le robinet"],
});

r.fait("entretien-robinet-vinaigrier", "procedure", `
  Pour installer ou nettoyer le robinet, travaillez vinaigrier vide et soutenu, humidifiez le bois comme indiqué par la notice puis engagez-le **dans l'axe sans coup sec ni levier sur le grès**. Rincez le robinet à l'eau claire et au vinaigre, sans produit parfumé, et laissez-le sécher avant remontage.`, { source: SAVOIR_FAIRE, liens: [PAGES.contact] });

r.concept("aromatisation-vinaigre", "Aromatiser le vinaigre", ["aromatiser le vinaigre", "vinaigre aromatise", "herbes dans le vinaigrier", "epices dans le vinaigrier"], {
  famille: "vinaigre",
});

r.fait("aromatisation-vinaigre", "condition", `
  Pour ne pas perturber la mère ni boucher le robinet, soutirez d'abord le vinaigre puis aromatisez une **petite quantité séparément** avec des ingrédients propres et une recette maîtrisée. Filtrez avant la mise en bouteille et surveillez toute altération.`, { source: SAVOIR_FAIRE });

r.concept("stockage-vinaigre", "Conserver le vinaigre soutiré", ["conserver le vinaigre soutire", "stockage du vinaigre", "vinaigre en bouteille", "garder le vinaigre"], {
  famille: "vinaigre",
});

r.fait("stockage-vinaigre", "entretien", `
  Conservez le vinaigre soutiré dans une bouteille propre, compatible avec l'acidité et bien fermée, à l'abri de la lumière et de la chaleur. Étiquetez la date et les éventuels aromates ; jetez le produit si l'aspect ou l'odeur devient anormal.`, { source: SAVOIR_FAIRE });

r.concept("bouchon-vinaigrier", "Bouchon de vinaigrier", ["bouchon de vinaigrier", "bouchon vinaigrier", "bouchon de rechange", "bouchon pour vinaigrier", "32 28"], {
  famille: "vinaigrier",
  lien: PAGES.bouchonVinaigrier,
});

r.fait("bouchon-vinaigrier", "definition", `
  Duhallé propose un **bouchon en liège conique de rechange pour vinaigrier**, de 32 x 28 mm.`, { source: PAGES.bondes.url, liens: [PAGES.bouchonVinaigrier] });
