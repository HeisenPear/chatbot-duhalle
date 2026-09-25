// La cave (conserver le vin, ranger les bouteilles) et le service du vin.
import { PAGES } from "./liens";
import { rubrique, SAVOIR_FAIRE } from "./outils";

const r = rubrique(PAGES.casiers.url);
export const caveService = r;

// ─── La cave ───────────────────────────────────────────────────────────────

r.concept("cave", "La cave à vin", ["cave", "caves", "cave a vin", "cellier", "conserver le vin", "conservation du vin", "stocker le vin", "temperature de la cave", "temperature cave", "temperature ideale", "stocker les bouteilles", "stockage du vin", "stockage des bouteilles", "ranger le vin", "organiser sa cave", "vieillir le vin"], {
  famille: "vin",
  lien: PAGES.casiers,
  voirAussi: ["casier", "cave-electrique", "hygrometrie"],
  formules: ["lumiere abime le vin", "lumiere abime t elle le vin", "vibrations nuisent au vieillissement", "vibrations nuisent elles au vieillissement", "vibrations nuisent au vin"],
});

r.fait("cave", "condition", `
  Les conditions idéales pour conserver le vin :
  - une **température stable**, autour de **12 °C** (entre 10 et 14 °C) ;
  - une **humidité de 70 à 80 %**, pour que les bouchons ne sèchent pas ;
  - l'**obscurité** : la lumière abîme le vin ;
  - **ni vibrations, ni odeurs fortes** ;
  - des bouteilles **couchées**, pour que le bouchon reste au contact du vin.`, { source: SAVOIR_FAIRE });

r.fait("cave", "procedure", `
  Pour organiser votre cave, rangez les bouteilles **couchées**, par type de vin et par date d'apogée : les vins à boire en premier à portée de main, les vins de garde en bas ou au fond, là où il fait le plus frais. Tenez un petit inventaire pour savoir quoi ouvrir et quand.`, { source: SAVOIR_FAIRE, liens: [PAGES.articleCave] });

r.concept("position-bouteilles", "Position des bouteilles en cave", ["position des bouteilles", "orientation des bouteilles en cave"], {
  famille: "cave",
  formules: ["conserver les bouteilles couchees ou debout", "bouteilles couchees ou debout"],
});

r.fait("position-bouteilles", "entretien", `
  Après les **24 à 48 heures debout** qui suivent le bouchage, conservez couchées les bouteilles fermées par un bouchon en liège et destinées à la garde. Une bouteille déjà ouverte, une fermeture différente ou la notice d'un produit peuvent demander une autre position.`, { source: SAVOIR_FAIRE });

r.fait("position-bouteilles", "choix", `
  **Debout juste après le bouchage**, pendant 24 à 48 heures, puis **couchée pour la garde** si la bouteille est fermée par un bouchon en liège. Une bouteille ouverte ou un autre système de fermeture peut demander une position différente.`, { source: SAVOIR_FAIRE });

r.fait("cave", "gamme", `
  Pour ranger vos bouteilles, Duhallé propose des **casiers** en acier plastifié (24 à 144 places), en polystyrène (12 et 16 places), en bois (12 bouteilles), un casier transportable, un petit casier modulable 3 bouteilles, et une **cave à vin électrique** double zone de 40 bouteilles.`, { liens: [PAGES.casiers, PAGES.caveElectrique] });

r.concept("hygrometrie", "Humidité de la cave", ["humidite", "hygrometrie", "hygrometre", "cave trop seche", "cave humide", "cave trop humide", "taux d humidite", "moisissure", "etiquettes moisies"], {
  famille: "cave",
});

r.fait("hygrometrie", "condition", `
  Une humidité de **70 à 80 %** est idéale : en dessous, les bouchons sèchent et laissent passer l'air ; au-dessus, les étiquettes moisissent. Un hygromètre permet de la surveiller. Dans une cave trop sèche, un bac de sable ou de gravier humide aide à remonter le taux ; dans une cave trop humide, aérez.`, { source: SAVOIR_FAIRE });

r.concept("casier", "Casiers range-bouteilles", ["casier", "casiers", "range bouteille", "range bouteilles", "casier a bouteilles", "casier a vin", "rangement bouteilles", "etagere a bouteilles", "porte bouteilles", "rack", "support bouteilles", "casier bois", "casier metal", "casier polystyrene", "weinbox", "brindo"], {
  famille: "cave",
  lien: PAGES.casiers,
});

r.fait("casier", "gamme", `
  Les casiers Duhallé :
  - **acier plastifié noir**, fabriqués en Italie : 30 places (5 rangées de 6), 60 places (10 rangées de 6) et 144 places, légèrement inclinés vers l'avant, avec pattes de fixation murale en option ;
  - **effet chromé** : 24 places (4 rangées de 6) et 48 places avec pattes de fixation murale ;
  - **polystyrène** : 16 places réversible effet béton ciré, et 12 places en matière d'origine écologique, empilables ;
  - **bois** : 12 bouteilles (H 39 x L 34 x P 18 cm), livré monté ;
  - **Weinbox** transportable 12 bouteilles, et petit casier **Brindo** 3 bouteilles, modulable.`, { liens: [PAGES.casier30, PAGES.casier60, PAGES.casierPolystyrene16] });

r.fait("casier", "choix", `
  Choisissez d'abord selon le **nombre de bouteilles, leur diamètre, leur longueur et leur poids**, puis selon la place disponible et la fixation. Les casiers en acier plastifié offrent le plus de capacité ; le polystyrène isole davantage ; le bois privilégie l'esthétique. Vérifiez spécialement le diamètre des bouteilles champenoises : elles sont souvent plus larges et lourdes qu'une bordelaise de 75 cl.`, { liens: [PAGES.casier60, PAGES.casierPolystyrene16, PAGES.casierBois12] });

r.fait("casier", "condition", `
  Une bouteille de champagne peut être stockée dans un casier uniquement si ses **diamètre, longueur et poids** sont compatibles avec chaque logement et si le casier est stable ou fixé comme prévu. Ne forcez pas une bouteille plus large dans une alvéole conçue pour une bordelaise.`, { source: SAVOIR_FAIRE });

r.concept("carafage-vin", "Carafer ou décanter un vin", ["carafer", "carafage", "decanter", "decantation", "mettre en carafe", "vin en carafe"], {
  famille: "service-vin",
});

r.fait("carafage-vin", "moment", `
  **Carafer** un vin jeune peut l'aérer avant le service ; **décanter** un vieux vin sert surtout à séparer le dépôt, avec très peu d'aération. Relevez la bouteille plusieurs heures avant, ouvrez-la sans la secouer et versez lentement en arrêtant lorsque le dépôt approche du col.`, { source: SAVOIR_FAIRE });

r.concept("service-vieux-vin", "Servir un vieux vin", ["servir un vieux vin", "depot vieux vin", "sans remettre le depot", "transport vieux vin"], {
  famille: "service-vin",
});

r.fait("service-vieux-vin", "procedure", `
  Transportez et laissez reposer le vieux vin **debout** assez longtemps pour que le dépôt redescende, puis ouvrez-le sans secousse avec un bilame si le bouchon est fragile. Versez lentement ou décantez sous une bonne lumière et arrêtez dès que le dépôt atteint l'épaule.`, { source: SAVOIR_FAIRE, liens: [PAGES.tireBouchonBilame] });

r.concept("garage-vin", "Stocker du vin dans un garage", ["vin dans un garage", "stocker dans le garage", "bouteilles au garage"], {
  famille: "cave",
});

r.fait("garage-vin", "condition", `
  Un garage ne convient que s'il reste **frais, sombre, sans gel ni forte chaleur**, avec peu de variations, de vibrations et d'odeurs de carburant ou de solvants. Mesurez température et humidité sur plusieurs semaines avant d'y confier des bouteilles de garde.`, { source: SAVOIR_FAIRE });

r.concept("rotation-bouteilles", "Retourner les bouteilles en cave", ["retourner les bouteilles", "tourner les bouteilles", "faire pivoter les bouteilles"], {
  famille: "cave",
});

r.fait("rotation-bouteilles", "condition", `
  Ne retournez pas régulièrement les bouteilles de vin tranquille : les manipulations remettent le dépôt en suspension et n'améliorent pas la garde. Rangez-les stables, couchées si elles sont fermées par du liège, puis manipulez-les le moins possible.`, { source: SAVOIR_FAIRE });

r.concept("transport-bouteilles", "Transporter les bouteilles avant service", ["transporter les bouteilles", "transport du vin", "bouteille apres transport"], {
  famille: "service-vin",
});

r.fait("transport-bouteilles", "procedure", `
  Transportez les bouteilles calées, protégées de la chaleur et des chocs. À l'arrivée, gardez-les debout et laissez reposer les vins présentant un dépôt avant de les ouvrir ; plus le trajet a remué la bouteille, plus cette précaution est utile.`, { source: SAVOIR_FAIRE });

r.concept("cave-electrique", "Cave à vin électrique", ["cave electrique", "cave a vin electrique", "armoire a vin", "cave refrigeree", "double zone", "cave de service", "frigo a vin", "refrigerateur a vin"], {
  famille: "cave",
  lien: PAGES.caveElectrique,
});

r.fait("cave-electrique", "definition", `
  La **cave à vin électrique professionnelle double zone** accueille **40 bouteilles**, avec deux zones réglables séparément : l'une pour la conservation, l'autre pour garder des vins à température de service.`, { liens: [PAGES.caveElectrique] });

// ─── Le service du vin ─────────────────────────────────────────────────────

r.concept("service-vin", "Le service du vin", ["service du vin", "accessoires vin", "accessoires de sommelier", "sommelier", "sommellerie", "degustation", "deguster", "table", "apero"], {
  famille: "vin",
  lien: PAGES.serviceDuVin,
  voirAussi: ["tire-bouchon", "bouteille-ouverte", "temperature-service"],
});

r.fait("service-vin", "gamme", `
  Pour le service du vin : **tire-bouchons** (à levier en coffret, deux leviers, bilame, Autopull avec coupe-capsule, couteau de sommelier Coutale Prestige, kit décapsuleur bois et métal), **bouchon verseur** Jerry, **bouchons Pratic** et **pompe vide-air** pour conserver les bouteilles entamées.`, { source: PAGES.serviceDuVin.url, liens: [PAGES.serviceDuVin] });

r.concept("temperature-service", "Température de service", ["temperature de service", "temperature du vin", "servir frais", "chambrer", "vin frais", "rafraichir", "servir le vin frais", "servir a quelle temperature", "temperature pour servir", "temperature pour boire"], {
  famille: "service-vin",
});

r.fait("temperature-service", "dimension", `
  Températures de service indicatives :
  - vins **rouges charpentés** : 16 à 18 °C ;
  - **rouges légers** : 13 à 15 °C ;
  - **blancs secs et rosés** : 8 à 12 °C ;
  - vins **liquoreux et effervescents** : 6 à 8 °C.`, { source: SAVOIR_FAIRE });

r.concept("tire-bouchon", "Tire-bouchons", ["tire bouchon", "tire bouchons", "tirebouchon", "ouvrir une bouteille", "ouvrir la bouteille", "deboucher", "debouchage", "limonadier", "couteau de sommelier", "decapsuleur", "ouvre bouteille", "screwpull", "autopull", "coutale"], {
  famille: "service-vin",
  lien: PAGES.serviceDuVin,
  voirAussi: ["bilame"],
});

r.fait("tire-bouchon", "gamme", `
  Les tire-bouchons Duhallé :
  - **tire-bouchon à levier** type Screwpull, en coffret ;
  - **tire-bouchon standard à deux leviers**, mèche ronde et tête décapsuleur ;
  - **tire-bouchon bilame** avec étui, pour les vieux bouchons ;
  - **Autopull** avec coupe-capsule Autocut ;
  - **couteau de sommelier Coutale Prestige** ;
  - **kit tire-bouchon décapsuleur** bois et métal noir.`, { source: PAGES.serviceDuVin.url, liens: [PAGES.tireBouchonLevier, PAGES.coutale, PAGES.tireBouchonBilame] });

r.fait("tire-bouchon", "choix", `
  Le **couteau de sommelier** est compact et polyvalent. Le tire-bouchon **à deux leviers** est le plus simple à prendre en main. Les modèles **à levier** (type Screwpull) et l'**Autopull** extraient le bouchon sans effort. Le **bilame** est indispensable pour les vieux bouchons fragiles des vins de garde, qu'il retire sans les percer.`, { source: SAVOIR_FAIRE, liens: [PAGES.coutale, PAGES.tireBouchonLevier, PAGES.tireBouchonBilame] });

r.concept("bilame", "Tire-bouchon bilame", ["bilame", "tire bouchon bilame", "vieux bouchon", "vieux bouchons", "bouchon fragile", "bouchon qui s effrite", "bouchon casse", "bouchon abime", "bouchon tombe dans la bouteille"], {
  famille: "tire-bouchon",
  lien: PAGES.tireBouchonBilame,
});

r.fait("bilame", "usage", `
  Le **tire-bouchon bilame** glisse ses deux lames entre le bouchon et le col, puis extrait le bouchon en tournant, **sans le percer** : c'est l'outil des vieux bouchons fragiles qui risquent de s'effriter ou de tomber dans la bouteille. Il est livré avec son étui.`, { liens: [PAGES.tireBouchonBilame] });

r.concept("choix-tire-bouchon-fragile", "Choisir pour un bouchon long ou fragile", ["tire bouchon pour bouchon long ou fragile"], {
  famille: "tire-bouchon",
  formules: ["quel tire bouchon choisir pour un bouchon long ou fragile"],
});

r.fait("choix-tire-bouchon-fragile", "choix", `
  Choisissez le **bilame** pour un bouchon vieux, long ou fragile : il l'extrait sans le percer et limite le risque d'effritement. Pour un bouchon récent et sain, un couteau de sommelier ou un modèle à levier est plus simple.`, { source: SAVOIR_FAIRE, liens: [PAGES.tireBouchonBilame] });

r.concept("bouteille-ouverte", "Conserver une bouteille entamée", ["bouteille entamee", "bouteilles entamees", "bouteille ouverte", "bouteilles ouvertes", "vin ouvert", "garder un vin ouvert", "garder une bouteille ouverte", "conserver une bouteille ouverte", "reboucher une bouteille ouverte", "vide air", "pompe vide air", "pompe a vide", "enlever l air", "retirer l air", "pompe pour enlever l air", "pompe pour retirer l air", "sous vide", "bouchon verseur", "bouchon pratic", "bouchons pratic", "jerry"], {
  famille: "service-vin",
  lien: PAGES.serviceDuVin,
});

r.fait("bouteille-ouverte", "choix", `
  Pour conserver une bouteille entamée :
  - la **pompe vide-air** et son bouchon retirent l'air de la bouteille pour préserver arômes et bouquet ;
  - le **bouchon verseur Jerry** sert proprement et referme la bouteille ;
  - les **bouchons Pratic** (lot de 40 avec tire-bouchon) et les **bouchons à tête** referment facilement les bouteilles ouvertes.`, { source: PAGES.serviceDuVin.url, liens: [PAGES.videAir, PAGES.bouchonVerseur, PAGES.bouchonsPratic] });

r.fait("bouteille-ouverte", "duree", `
  Une fois ouverte et rebouchée, une bouteille de vin se garde en général **quelques jours** au frais (2 à 5 jours selon le vin). En retirant l'air avec une pompe vide-air, vous prolongez sa fraîcheur.`, { source: SAVOIR_FAIRE, liens: [PAGES.videAir] });
