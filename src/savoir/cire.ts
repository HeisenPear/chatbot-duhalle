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
  La **cire à cacheter** habille et protège extérieurement le goulot après le bouchage. Elle ne remplace jamais la fermeture étanche adaptée à la bouteille et à la pression. La cire Duhallé est **fabriquée dans le Sud-Ouest de la France**, en version **dure** ou **souple**, en 12 couleurs et en teintes métallisées.`);

r.fait("cire", "procedure", `
  Pour cacheter une bouteille :
  1. Faites fondre la cire dans un récipient réservé à cet usage, au bain-marie ou dans un **chauffe-cire**, jusqu'à ce qu'elle soit bien liquide.
  2. Bouchez la bouteille et vérifiez que le goulot est **propre et sec**.
  3. Retournez-la et trempez le goulot dans la cire **une à deux secondes**, jusqu'à la hauteur voulue.
  4. Ressortez-la en la tournant doucement pour laisser s'égoutter l'excédent.
  5. Laissez durcir tête en haut ; vous pouvez tremper une seconde fois pour une couche plus épaisse.`, { source: SAVOIR_FAIRE, liens: [VIDEO_CIRE, PAGES.cire] });

r.fait("cire", "condition", `
  Ne laissez **jamais** la cire chauffer sans surveillance, évitez la flamme directe sous le récipient et gardez les enfants à distance : la cire chaude brûle. Un **chauffe-cire à thermostat** maintient une température constante en toute sécurité.`, { source: SAVOIR_FAIRE, liens: [PAGES.chauffeCire] });

r.fait("cire", "erreur", `
  Bulles, coulures et fissures viennent souvent d'un goulot humide ou froid, d'une cire trop chaude ou trop visqueuse, d'un trempage irrégulier ou d'un refroidissement brusque. Travaillez sur un goulot **propre, sec et tempéré**, stabilisez la température, gardez le même geste et testez d'abord quelques bouteilles.`, { source: SAVOIR_FAIRE });

r.concept("ouverture-cire", "Ouvrir une bouteille cirée", ["ouvrir une bouteille ciree", "retirer la cire du bouchon", "enlever la cire du goulot", "ouvrir sans eclats"], {
  famille: "cire",
});

r.fait("ouverture-cire", "procedure", `
  Avec une cire souple, incisez proprement autour du haut du goulot puis retirez la partie qui couvre le bouchon. Avec une cire dure, protégez la table, cassez seulement la zone nécessaire avec précaution et essuyez les fragments avant d'introduire le tire-bouchon.`, { source: SAVOIR_FAIRE });

r.concept("support-cire", "Support sous la cire", ["cire sur capsule", "cire sur bouchon synthetique", "cirer une capsule", "cirer un bouchon synthetique"], {
  famille: "cire",
  formules: ["cire remplace t elle le bouchon ou la capsule", "cire remplace le bouchon"],
});

r.fait("support-cire", "condition", `
  La cire peut recouvrir une capsule ou une fermeture seulement si le support est **sec, stable et résiste à la température d'application**. Faites un essai d'adhérence et d'ouverture : la cire reste décorative et ne corrige jamais une capsule mal sertie ni un bouchon incompatible.`, { source: SAVOIR_FAIRE });

r.fait("support-cire", "choix", `
  La cire est un **surbouchage décoratif** : elle se pose au-dessus d'un bouchon ou d'une capsule déjà compatible et étanche. Elle ne remplace ni le bouchon, ni la capsule, ni le muselet requis par la bouteille et la pression.`, { source: SAVOIR_FAIRE });

r.concept("defauts-cire", "Défauts d’application de la cire", ["bulles dans la cire", "coulures de cire", "fissures dans la cire", "cire fissuree"], {
  famille: "cire",
  formules: ["eviter les bulles coulures ou fissures dans la cire"],
});

r.fait("defauts-cire", "erreur", `
  Bulles, coulures et fissures viennent souvent d'un goulot humide ou froid, d'une cire trop chaude ou trop visqueuse, d'un trempage irrégulier ou d'un refroidissement brusque. Travaillez sur un goulot propre, sec et tempéré, stabilisez la température et testez d'abord quelques bouteilles.`, { source: SAVOIR_FAIRE });

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
  La température dépend de la **formulation exacte** : cire dure et cire souple ne fondent pas nécessairement dans la même plage. Réglez le chauffe-cire progressivement, sans dépasser sa plage de 0 à 100 °C, et suivez en priorité la température inscrite sur l'emballage de la cire. Si la fiche de la cire exige davantage que l'appareil, ne forcez pas le thermostat et demandez confirmation au service client.`, { source: SAVOIR_FAIRE, liens: [PAGES.chauffeCire, PAGES.contact] });

r.fait("chauffe-cire", "choix", `
  Pour une petite série, un récipient dédié et un contrôle attentif peuvent suffire ; pour une série régulière, le chauffe-cire **1,3 L à thermostat** apporte une température plus stable. Dimensionnez surtout selon le volume de cire à maintenir fondu, la cadence et la compatibilité avec la température prescrite par la cire.`, { source: SAVOIR_FAIRE, liens: [PAGES.chauffeCire] });

r.fait("chauffe-cire", "entretien", `
  Laissez refroidir l'appareil débranché. Retirez la cire solidifiée selon la notice, sans outil qui rayerait la cuve ni eau dans les parties électriques. N'utilisez jamais de solvant non autorisé ; si un nettoyage à chaud est prévu, portez des protections contre les brûlures.`, { source: SAVOIR_FAIRE, liens: [PAGES.chauffeCire] });

r.concept("nettoyage-chauffe-cire", "Nettoyer un chauffe-cire", ["nettoyer le chauffe cire", "nettoyer la cuve du chauffe cire", "laver le chauffe cire", "laver la cuve du chauffe cire"], {
  famille: "chauffe-cire",
  formules: ["nettoyer le chauffe cire et la cuve"],
});

r.fait("nettoyage-chauffe-cire", "procedure", `
  Pour nettoyer le chauffe-cire, débranchez-le, laissez la cire revenir à l'état prévu par la notice pour son retrait, videz ou décollez le résidu sans rayer l'inox, puis essuyez la cuve. Ne plongez jamais l'appareil et n'introduisez pas d'eau dans les composants électriques.`, { source: SAVOIR_FAIRE, liens: [PAGES.chauffeCire] });

r.concept("ordre-etiquette-cire", "Ordre entre étiquetage et cirage", ["etiquette avant cirage", "etiquette apres cirage", "ordre etiquette cire", "etiqueter avant de cirer"], {
  famille: "cire",
});

r.fait("ordre-etiquette-cire", "moment", `
  Posez généralement l'étiquette sur une bouteille **propre, sèche et à température ambiante avant le cirage**, puis protégez-la des gouttes. Si le procédé de cirage salit ou réchauffe la zone d'étiquetage, faites d'abord un essai et inversez l'ordre uniquement si l'adhésif et la finition le permettent.`, { source: SAVOIR_FAIRE, liens: [PAGES.surbouchage] });

r.concept("nettoyage-cire", "Retirer des traces de cire", ["retirer la cire du verre", "enlever la cire du verre", "cire sur le plan de travail", "nettoyer une tache de cire"], {
  famille: "cire",
});

r.fait("nettoyage-cire", "procedure", `
  Laissez la cire refroidir et durcir, décollez-la avec un outil non coupant adapté au support, puis retirez le film restant selon la notice de la cire. Évitez de répandre de la cire chaude ou d'utiliser un solvant inflammable près du chauffe-cire.`, { source: SAVOIR_FAIRE });

r.fait(["cire", "bouchon-liege"], "duree", `
  La cire ne permet pas d'ajouter un nombre d'années garanti à la durée de garde. Elle protège extérieurement le goulot, mais la conservation dépend d'abord du vin, du bouchon, de sa pose, de la bouteille et de la cave.`, { source: SAVOIR_FAIRE });

r.concept("rendement-cire", "Quantité de cire par bouteille", ["bouteilles avec 1 kg de cire", "rendement de la cire", "consommation de cire", "quantite de cire par bouteille", "un kilo de cire"], {
  famille: "cire",
  lien: PAGES.cire,
  formules: ["combien de bouteilles avec 1 kg", "combien de bouteilles avec un kilo de cire"],
});

r.fait("rendement-cire", "dimension", `
  Le nombre de bouteilles par kilo varie avec le diamètre du col, la hauteur trempée, l'épaisseur et le nombre de couches. Pour une estimation fiable, pesez la cire avant et après un **test de 10 bouteilles**, calculez la consommation moyenne, puis ajoutez une marge pour la cire restant dans la cuve. Le service client peut aussi confirmer le rendement de la référence choisie.`, { source: SAVOIR_FAIRE, liens: [PAGES.cire, PAGES.contact] });

r.fait(["surbouchage", "cire"], "choix", `
  **Capsule ou cire ?** La **capsule thermorétractable** se pose vite et donne une finition nette. La **cire à cacheter** offre un rendu artisanal et une protection supplémentaire contre l'air et l'humidité, appréciée pour les vins de garde et les bouteilles à offrir.`, { source: SAVOIR_FAIRE, liens: [PAGES.surbouchage, PAGES.cire] });
