// La cire à cacheter, fabriquée dans le Sud-Ouest de la France.
import { PAGES, } from "./liens";
import { page, rubrique, SAVOIR_FAIRE } from "./outils";

const r = rubrique(PAGES.cire.url);
export const cire = r;

const VIDEO_CIRE = page("/PBCPPlayer.asp?ID=2394532", "Vidéo : faire fondre la cire");

r.concept("cire", "Cire à cacheter", ["cire", "cires", "cire a cacheter", "cacheter", "cachetage", "cachet de cire", "cacheter une bouteille", "cacheter les bouteilles", "sceller", "sceau", "cire bouteille", "cirer", "cirer le goulot", "tremper le goulot"], {
  famille: "catalogue",
  lien: PAGES.cire,
  voirAussi: ["cire-dure", "cire-souple", "chauffe-cire"],
});

r.fait("cire", "definition", `
  La **cire à cacheter** habille et protège le goulot après le bouchage : elle ajoute une barrière contre l'air, l'humidité et les bactéries, et donne une finition artisanale à vos bouteilles. La cire Duhallé est **fabriquée dans le Sud-Ouest de la France**, en version **dure** ou **souple**, en 12 couleurs et en teintes métallisées.`);

r.fait("cire", "procedure", `
  Pour cacheter une bouteille :
  1. Faites fondre la cire dans un récipient réservé à cet usage, au bain-marie ou dans un **chauffe-cire**, jusqu'à ce qu'elle soit bien liquide.
  2. Bouchez la bouteille et vérifiez que le goulot est **propre et sec**.
  3. Retournez-la et trempez le goulot dans la cire **une à deux secondes**, jusqu'à la hauteur voulue.
  4. Ressortez-la en la tournant doucement pour laisser s'égoutter l'excédent.
  5. Laissez durcir tête en haut ; vous pouvez tremper une seconde fois pour une couche plus épaisse.`, { source: SAVOIR_FAIRE, liens: [VIDEO_CIRE, PAGES.cire] });

r.fait("cire", "condition", `
  Ne laissez **jamais** la cire chauffer sans surveillance, évitez la flamme directe sous le récipient et gardez les enfants à distance : la cire chaude brûle. Un **chauffe-cire à thermostat** maintient une température constante en toute sécurité.`, { source: SAVOIR_FAIRE, liens: [PAGES.chauffeCire] });

r.fait("cire", "gamme", `
  Cire à cacheter Duhallé :
  - **cire dure** en 250 g et 500 g : rouge, verte, noire, blanc cassé, orange… ;
  - **cire souple** en 1 kg : orange, or, lie de vin, crème… ;
  - un **chauffe-cire** inox de 1,3 L à thermostat.

  Des couleurs personnalisées sont possibles sur demande.`, { liens: [PAGES.cireDure, PAGES.cireSouple, PAGES.chauffeCire] });

r.fait("cire", "dimension", `
  La quantité de cire utilisée par bouteille dépend de la hauteur de goulot trempée et du nombre de couches. Pour estimer la quantité nécessaire à votre projet, le service client vous conseille volontiers.`, { source: SAVOIR_FAIRE, liens: [PAGES.contact] });

r.concept("cire-dure", "Cire dure", ["cire dure", "cire traditionnelle", "cire rigide"], {
  famille: "cire",
  lien: PAGES.cireDure,
});

r.fait("cire-dure", "definition", `
  La **cire dure** est la cire à cacheter traditionnelle : elle forme une coque rigide qui se brise à l'ouverture de la bouteille. Elle existe en 250 g et 500 g, dans de nombreuses couleurs.`, { liens: [PAGES.cireDure, PAGES.cireDureRouge500] });

r.concept("cire-souple", "Cire souple", ["cire souple", "cire flexible", "cire qui ne casse pas", "cire incassable", "cire sans eclats", "cire elastique", "cire qui ne s ecaille pas"], {
  famille: "cire",
  lien: PAGES.cireSouple,
});

r.fait("cire-souple", "definition", `
  La **cire souple** reste légèrement élastique : elle **ne casse pas et ne s'écaille pas** à l'ouverture de la bouteille, pour un débouchage propre. Elle est vendue en 1 kg, dans plusieurs couleurs.`, { liens: [PAGES.cireSouple, PAGES.cireSoupleOr] });

r.fait(["cire-dure", "cire-souple"], "choix", `
  **Dure ou souple ?** La **cire dure** donne l'aspect d'un cachet traditionnel, qui se brise à l'ouverture. La **cire souple** ne casse pas et ne fait pas d'éclats : plus pratique pour ouvrir la bouteille à table, et idéale pour les bouteilles à offrir.`, { liens: [PAGES.cireDure, PAGES.cireSouple] });

r.concept("chauffe-cire", "Chauffe-cire", ["chauffe cire", "pot chauffant", "fondoir", "faire fondre la cire", "fondre la cire", "fondre", "fusion de la cire", "temperature de la cire"], {
  famille: "cire",
  lien: PAGES.chauffeCire,
});

r.fait("chauffe-cire", "definition", `
  Le **chauffe-cire** Duhallé est un pot chauffant en **acier inoxydable de 1,3 L** avec **thermostat réglable de 0 à 100 °C** : il garde la cire à température constante pendant tout le cachetage.`, { liens: [PAGES.chauffeCire, VIDEO_CIRE] });

r.fait("chauffe-cire", "dimension", `
  Chauffez la cire juste assez pour qu'elle soit **bien liquide** et nappe le goulot, sans la faire bouillir : le chauffe-cire, réglable de 0 à 100 °C, la maintient à cette température constante. Suivez aussi les indications portées sur l'emballage de la cire.`, { source: SAVOIR_FAIRE, liens: [PAGES.chauffeCire] });

r.fait(["surbouchage", "cire"], "choix", `
  **Capsule ou cire ?** La **capsule thermorétractable** se pose vite et donne une finition nette. La **cire à cacheter** offre un rendu artisanal et une protection supplémentaire contre l'air et l'humidité, appréciée pour les vins de garde et les bouteilles à offrir.`, { source: SAVOIR_FAIRE, liens: [PAGES.surbouchage, PAGES.cire] });
