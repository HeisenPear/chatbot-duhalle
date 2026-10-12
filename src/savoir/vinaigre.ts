// Le vinaigre maison et les vinaigriers en grès fabriqués au Portugal.
import { EMAIL, TELEPHONE } from "./coordonnees";
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

const COULEURS = ["noir", "noire", "blanc", "blanche", "rouge", "bleu", "bleue", "vert", "verte", "gris", "grise", "jaune", "rose", "marron", "beige", "orange", "violet", "violette", "marine"];
/** « existe en noir », « disponible en rouge » : une demande de coloris. */
const demandesDeCouleur = COULEURS.flatMap((c) => [`existe en ${c}`, `existe t il en ${c}`, `existe t elle en ${c}`, `disponible en ${c}`, `en ${c} aussi`, `vinaigrier ${c}`, `vinaigriers ${c}`]);

r.concept("vinaigrier", "Vinaigriers", ["vinaigrier", "vinaigriers", "vinaigrier en gres", "vinaigrier gres", "jarre a vinaigre", "pot a vinaigre", "tonneau a vinaigre", "vinaigrier chene", "vinaigrier en chene", "gres", "ustensiles en gres", "poterie"], {
  famille: "vinaigre",
  lien: PAGES.vinaigriers,
});

r.concept("coloris", "Couleurs et coloris", ["coloris"], {
  famille: "catalogue",
  formules: demandesDeCouleur,
});

r.fait("coloris", "gamme", `
  Les coloris et finitions disponibles sont indiqués sur la **fiche de chaque produit**. Si la couleur que vous cherchez n'y figure pas, le service client peut vous confirmer si elle existe : **${TELEPHONE}** ou **${EMAIL}**.`, { liens: [PAGES.contact] });

r.fait(["vinaigrier", "coloris"], "gamme", `
  Dans la gamme actuelle, les vinaigriers en grès existent en **rouge** (2,5 L), **gris anthracite** (3,5 L), **grès naturel**, **bleu Provence**, **jaune safran** ou « **à l'ancienne** » (4 L), et **grès naturel** ou **bleu nuit** (5 L, en forme de tonneau). Le vinaigrier en **chêne** (3 L) a la teinte du bois. Il n'y a pas de modèle noir : le plus sombre est le **gris anthracite**. Pour une demande particulière, contactez le service client au **${TELEPHONE}** ou à **${EMAIL}**.`, { liens: [PAGES.vinaigriers, PAGES.contact] });

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
  Avant la première utilisation, rincez le vinaigrier à l'eau claire, **sans produit vaisselle**. Faites tremper le **robinet en bois** dans l'eau quelques heures pour qu'il gonfle et devienne étanche, et son **bouchon en liège** pendant 24 heures (selon la fiche du robinet). Pour le nettoyer, videz-le, rincez à l'eau chaude puis au vinaigre, et relancez-le avec une partie de la mère.`, { source: SAVOIR_FAIRE });

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

r.concept("robinet-vinaigrier", "Robinet du vinaigrier", ["robinet", "robinets", "robinet en bois", "robinets en bois", "robinet qui fuit", "le robinet coule", "robinet vinaigrier", "changer le robinet", "remplacer le robinet"], {
  famille: "vinaigrier",
});

r.fait("robinet-vinaigrier", "condition", `
  Si le robinet ne fonctionne pas :
  - **il ne coule pas** : ouvrez-le en grand et vérifiez que le vinaigrier est posé assez haut (sur son tabouret) ; un dépôt ou un morceau de mère peut obstruer l'intérieur, retirez le robinet et rincez-le à l'eau claire ;
  - **il est dur ou bloqué** : ne forcez pas sur le grès, humidifiez le bois et tournez doucement.

  Si le problème persiste, contactez le service client au **${TELEPHONE}** ou à **${EMAIL}**.`, { source: SAVOIR_FAIRE, liens: [PAGES.contact] });

// Concept à part : sinon un fait « choix » capterait « le robinet goutte », l'aspect choix passant avant la condition dans le plan par défaut.
r.concept("choix-robinet", "Robinet de remplacement ou de rechange", [], {
  famille: "robinet-vinaigrier",
  formules: ["taille du robinet", "taille de robinet", "taille de mon robinet", "diametre du robinet", "diametre de robinet", "dimension du robinet", "dimensions du robinet", "choisir son robinet", "choisir le robinet", "choisir un robinet", "quel robinet", "quels robinets", "bon robinet", "robinet adapte", "robinet compatible", "robinet de rechange", "robinets de rechange", "robinet de remplacement", "robinets de remplacement"],
});

r.fait("choix-robinet", "choix", `
  Pour remplacer le robinet de votre vinaigrier, Duhallé propose un **robinet en bois de 3 pouces (8 cm)**, en frêne du Jura. Un robinet en bois, comme celui livré avec les vinaigriers, convient très bien : il est naturel, ne rouille pas et gonfle pour devenir étanche. Évitez les robinets en métal non adapté, car l'acidité du vinaigre attaque les métaux. Le point décisif est la **taille** : la partie du robinet qui s'engage doit correspondre au trou du vinaigrier, d'où l'intérêt de mesurer ce trou avant de commander. Selon la fiche du robinet, son **bouchon en liège** doit tremper **24 heures dans l'eau** avant utilisation, pour assurer l'étanchéité. En cas de doute, indiquez le modèle de votre vinaigrier au service client, au **${TELEPHONE}** ou à **${EMAIL}**.`, { source: SAVOIR_FAIRE, liens: [PAGES.contact] });

// Concept à part, comme « choix-robinet » : sinon les faits de panne du robinet captent « est-il vendu avec son robinet ? ».
r.concept("robinet-fourni", "Robinet livré avec le vinaigrier", [], {
  famille: "robinet-vinaigrier",
  exclusif: true,
  formules: ["robinet est il fourni", "robinet est il inclus", "robinet fourni", "robinet inclus", "robinet livre", "livre avec un robinet", "livre avec son robinet", "vendu avec son robinet", "vendu avec le robinet", "vendu avec un robinet", "robinet avec le vinaigrier", "robinet avec vinaigrier", "robinet avec la jarre", "avec robinet bois", "fut vendu avec un robinet", "fut vendu avec son robinet", "fut fourni avec un robinet", "fut fourni avec son robinet", "fut robinet inclus", "fut robinet fourni"],
});

const ROBINET_FOURNI = `
  Oui : les vinaigriers Duhallé en grès sont livrés avec leur **robinet en bois** et leur **bouchon en liège** ; certains modèles ont aussi leur **tabouret en bois**. Si le robinet est abîmé ou perdu, il se rachète à part : Duhallé propose un **robinet en bois de 3 pouces (8 cm)**, en frêne du Jura, pour les vinaigriers.`;

for (const aspect of ["definition", "condition", "gamme"] as const) {
  r.fait("robinet-fourni", aspect, ROBINET_FOURNI, { source: PAGES.vinaigriers.url, liens: [PAGES.vinaigriers] });
}

r.fait("robinet-vinaigrier", "condition", `
  Un **robinet en bois** qui fuit un peu au début est normal : le bois doit gonfler. Faites-le tremper dans l'eau quelques heures avant de le remettre en place. Si la fuite persiste, contactez le service client.`, { source: SAVOIR_FAIRE, liens: [PAGES.contact] });

r.concept("entretien-robinet-vinaigrier", "Installer et nettoyer le robinet du vinaigrier", ["entretien du robinet de vinaigrier", "montage du robinet en bois"], {
  famille: "robinet-vinaigrier",
  formules: ["nettoyer le robinet en bois", "laver le robinet en bois", "installer la bonde et le robinet", "preparer le robinet", "preparer le robinet du vinaigrier", "preparer le robinet en bois", "premiere utilisation du robinet", "avant d utiliser le robinet", "mise en service du robinet", "faut il tremper le robinet", "tremper le robinet", "monter le robinet", "poser le robinet", "installer le robinet"],
});

r.fait("entretien-robinet-vinaigrier", "procedure", `
  Avant la première utilisation, faites tremper le **robinet en bois** quelques heures et son **bouchon en liège** 24 heures dans l'eau (selon la fiche du robinet) : le bois et le liège gonflent et deviennent étanches. Pour installer ou nettoyer le robinet, travaillez vinaigrier vide et soutenu, humidifiez le bois comme indiqué par la notice puis engagez-le **dans l'axe sans coup sec ni levier sur le grès**. Rincez le robinet à l'eau claire et au vinaigre, sans produit parfumé, et laissez-le sécher avant remontage.`, { source: SAVOIR_FAIRE, liens: [PAGES.contact] });

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

r.concept("bouchon-vinaigrier", "Bouchon de vinaigrier", ["bouchon de vinaigrier", "bouchon vinaigrier", "bouchon de rechange", "bouchon pour vinaigrier", "32 28", "bouchon perce", "bouchons perces", "bouchon perce conique", "bouchon conique pour vinaigrier"], {
  famille: "vinaigrier",
  lien: PAGES.bouchonVinaigrier,
});

r.fait("bouchon-vinaigrier", "definition", `
  Duhallé propose un **bouchon en liège conique de rechange pour vinaigrier**, de 32 x 28 mm.`, { source: PAGES.bondes.url, liens: [PAGES.bouchonVinaigrier] });

r.fait("bouchon-vinaigrier", "dimension", `
  Le **bouchon percé en liège, de forme conique**, de rechange pour vinaigrier mesure **32 x 28 mm** (grand diamètre 32 mm, petit diamètre 28 mm) : il convient à un trou de **28 à 32 mm**. Pour un trou plus petit ou plus grand, mesurez-le et comparez avec les tailles de bondes coniques (28/24, 30/26, 35/31, 38/34 mm…), ou demandez conseil au service client au **${TELEPHONE}**.`, { source: PAGES.bondes.url, liens: [PAGES.bouchonVinaigrier, PAGES.bondes, PAGES.contact] });

const CHOIX_DU_BOUCHON_DE_VINAIGRIER = `
  Pour choisir le bouchon de votre vinaigrier, **mesurez le diamètre du trou** à l'endroit où le bouchon vient se coincer : il doit se situer entre le petit et le grand diamètre du bouchon conique. Le bouchon percé de rechange (**32 x 28 mm**) convient à un trou de 28 à 32 mm. Un trou de **25 mm** est trop petit pour lui : une bonde conique **28/24 mm** le ferme, mais elle n'est pas percée ; si le bouchon doit laisser passer le robinet, indiquez le modèle de votre vinaigrier au service client, au **${TELEPHONE}** ou à **${EMAIL}**.`;

r.fait("bouchon-vinaigrier", "choix", CHOIX_DU_BOUCHON_DE_VINAIGRIER, { source: SAVOIR_FAIRE, liens: [PAGES.bouchonVinaigrier, PAGES.bondes, PAGES.contact] });

// Même texte pour « le trou de mon vinaigrier fait 30 mm » : croisé avec le trou à boucher, il passe devant les faits généraux.
r.fait(["trou-bouchon", "vinaigrier"], "choix", CHOIX_DU_BOUCHON_DE_VINAIGRIER, { source: SAVOIR_FAIRE, liens: [PAGES.bouchonVinaigrier, PAGES.bondes, PAGES.contact] });
r.fait(["trou-bouchon", "vinaigrier"], "dimension", CHOIX_DU_BOUCHON_DE_VINAIGRIER, { source: SAVOIR_FAIRE, liens: [PAGES.bouchonVinaigrier, PAGES.bondes, PAGES.contact] });

r.fait("bouchon-vinaigrier", "procedure", `
  Pour remplacer le bouchon du vinaigrier : retirez l'ancien en le tournant doucement, nettoyez et séchez le trou, faites tremper le nouveau bouchon dans l'eau pendant **24 heures** (selon la fiche du robinet), puis enfoncez-le **à la main, sans forcer ni frapper**, jusqu'à ce qu'il tienne fermement. Le bouchon percé de rechange mesure **32 x 28 mm** : il convient à un trou de 28 à 32 mm. Pour un autre diamètre, mesurez le trou et choisissez une bonde conique adaptée, ou demandez conseil au service client au **${TELEPHONE}**.`, { source: SAVOIR_FAIRE, liens: [PAGES.bouchonVinaigrier, PAGES.bondes, PAGES.contact] });

const TREMPER_LE_BOUCHON_DU_VINAIGRIER = `
  Oui. Selon la fiche du robinet, le **bouchon en liège du vinaigrier** doit tremper **24 heures dans l'eau** avant la première utilisation : il gonfle et assure l'étanchéité. Le robinet en bois peut aussi tremper quelques heures. Enfoncez ensuite le bouchon à la main, sans forcer ni frapper. (Les bouchons en liège pour bouteilles de vin, eux, s'utilisent à sec.)`;

for (const aspect of ["condition", "raison", "entretien"] as const) {
  r.fait("bouchon-vinaigrier", aspect, TREMPER_LE_BOUCHON_DU_VINAIGRIER, { source: PAGES.bouchonVinaigrier.url, liens: [PAGES.bouchonVinaigrier] });
}

// ─── Démarrer le vinaigre ──────────────────────────────────────────────────

r.concept("demarrer-vinaigre", "Démarrer son vinaigre avec une mère", ["mere de depart", "mere pour demarrer", "acheter une mere", "vendre une mere", "premiere mere"], {
  famille: "mere-vinaigre",
  formules: ["ou trouver une mere", "ou acheter une mere", "vendez vous une mere", "vendez vous des meres", "vendez vous de la mere", "mere de vinaigre a vendre", "vendez vous de la mere de vinaigre"],
});

const DEMARRER_LE_VINAIGRE = `
  Pour démarrer un vinaigre, il faut une **mère de vinaigre**. Je n'ai pas trace d'une mère vendue à part par la boutique ; pour savoir si l'on peut s'en procurer, demandez au service client au **${TELEPHONE}** ou à **${EMAIL}**. Vous pouvez aussi en demander un morceau à un proche qui fait son vinaigre, ou verser dans le vinaigrier un fond de **vinaigre de vin non pasteurisé** (« vivant ») avec du vin sain, peu soufré : une mère se forme alors d'elle-même, en trois semaines environ d'après la fiche d'un de nos vinaigriers. Alimentez-la ensuite régulièrement avec des fonds de bouteille de vin.`;

for (const aspect of ["definition", "procedure", "choix", "lieu", "gamme"] as const) {
  r.fait("demarrer-vinaigre", aspect, DEMARRER_LE_VINAIGRE, { source: SAVOIR_FAIRE, liens: [PAGES.vinaigriers, PAGES.contact] });
}
