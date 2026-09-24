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

r.concept("mere-vinaigre", "La mère de vinaigre", ["mere de vinaigre", "mere du vinaigre", "mere", "voile", "peau gelatineuse", "bacteries acetiques", "acetobacter"], {
  famille: "vinaigre",
});

r.fait("mere-vinaigre", "definition", `
  La **mère de vinaigre** est un voile gélatineux formé par des bactéries acétiques : elle transforme l'alcool du vin en acide acétique. Elle se forme d'elle-même dans un vinaigre non pasteurisé, et on peut en prélever un morceau pour lancer un nouveau vinaigrier.`, { source: SAVOIR_FAIRE });

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

r.concept("robinet-vinaigrier", "Robinet du vinaigrier", ["robinet", "robinet en bois", "robinet qui fuit", "le robinet coule", "robinet vinaigrier"], {
  famille: "vinaigrier",
});

r.fait("robinet-vinaigrier", "condition", `
  Un **robinet en bois** qui fuit un peu au début est normal : le bois doit gonfler. Faites-le tremper dans l'eau quelques heures avant de le remettre en place. Si la fuite persiste, contactez le service client.`, { source: SAVOIR_FAIRE, liens: [PAGES.contact] });

r.concept("bouchon-vinaigrier", "Bouchon de vinaigrier", ["bouchon de vinaigrier", "bouchon vinaigrier", "bouchon de rechange", "bouchon pour vinaigrier", "32 28"], {
  famille: "vinaigrier",
  lien: PAGES.bouchonVinaigrier,
});

r.fait("bouchon-vinaigrier", "definition", `
  Duhallé propose un **bouchon en liège conique de rechange pour vinaigrier**, de 32 x 28 mm.`, { source: PAGES.bondes.url, liens: [PAGES.bouchonVinaigrier] });
