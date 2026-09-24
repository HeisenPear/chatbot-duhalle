// Le Comptoir de la Conserve : stérilisation, bocaux, confitures, fumage.
import { PAGES } from "./liens";
import { rubrique, SAVOIR_FAIRE } from "./outils";

const r = rubrique(PAGES.conserve.url);
export const conserves = r;

r.concept("conserve", "Les conserves maison", ["conserve", "conserves", "conserverie", "conserves maison", "faire ses conserves", "faire des conserves", "comptoir de la conserve", "le comptoir de la conserve", "sterilisation", "steriliser", "appertisation", "mettre en bocaux", "mise en bocaux", "fait maison"], {
  famille: "catalogue",
  lien: PAGES.conserve,
  voirAussi: ["sterilisateur", "bocal", "confiture"],
});

r.fait("conserve", "gamme", `
  **Le Comptoir de la Conserve** réunit le matériel du fait-maison : stérilisateur électrique inox de 27 L, thermomètre de stérilisation, bocaux en verre à joints, pince à bocaux, pince ouvre-bocal, entonnoir à confiture, capsules à vis de rechange, mais aussi fumoir électrique, réchaud à gaz et hachoirs.`, { liens: [PAGES.conserve, PAGES.sterilisateurs, PAGES.transformation] });

r.fait("conserve", "procedure", `
  Les étapes d'une conserve maison :
  1. Préparez des **bocaux propres** et des **joints neufs**.
  2. Remplissez les bocaux en laissant un espace sous le couvercle, essuyez les bords et fermez.
  3. Placez-les dans le **stérilisateur**, recouverts d'eau.
  4. Stérilisez à la **température et pendant la durée indiquées par votre recette**.
  5. Laissez refroidir, vérifiez la fermeture, puis étiquetez et datez.`, { source: SAVOIR_FAIRE, liens: [PAGES.sterilisateur, PAGES.bocaux] });

r.fait("conserve", "condition", `
  Pour des conserves sûres, suivez toujours une **recette fiable** pour la durée et la température de stérilisation, en particulier pour les légumes, viandes et poissons : une stérilisation insuffisante expose au **botulisme**. Ne consommez jamais un bocal dont le couvercle est bombé, qui s'est ouvert tout seul ou qui sent mauvais.`, { source: SAVOIR_FAIRE });

r.concept("sterilisateur", "Stérilisateur", ["sterilisateur", "sterilisateurs", "steriliseur", "bouilleur", "sterilisateur electrique", "cuve de sterilisation", "27 litres", "thermometre", "thermometre de sterilisation", "thermometre bouilleur"], {
  famille: "conserve",
  lien: PAGES.sterilisateur,
});

r.fait("sterilisateur", "definition", `
  Le **stérilisateur électrique ABC en inox de 27 litres** est équipé d'un **thermostat**, d'un **minuteur** et d'un **robinet de vidange** : il chauffe l'eau et la maintient à la bonne température pendant toute la stérilisation. Un **thermomètre pour bouilleur** permet aussi de contrôler la température de l'eau.`, { source: PAGES.sterilisateurs.url, liens: [PAGES.sterilisateur, PAGES.thermometreBouilleur] });

r.fait("sterilisateur", "dimension", `
  Le stérilisateur électrique ABC en inox a une contenance de **27 litres**, avec thermostat, minuteur et robinet de vidange.`, { source: PAGES.sterilisateurs.url, liens: [PAGES.sterilisateur] });

r.concept("bocal", "Bocaux et couvercles", ["bocal", "bocaux", "pot", "pots", "pot en verre", "bocaux en verre", "joint", "joints", "joint caoutchouc", "couvercle", "couvercles", "capsule a vis", "capsules a vis", "pots a confiture", "verrine", "1,5 l", "bocal 1,5 litre"], {
  famille: "conserve",
  lien: PAGES.bocaux,
});

r.fait("bocal", "gamme", `
  Lot de **6 bocaux en verre Luminarc de 1,5 L** avec joints hermétiques, et **capsules à vis de rechange de 70 mm** (lot de 2).`, { source: PAGES.transformation.url, liens: [PAGES.bocaux] });

r.fait("bocal", "condition", `
  Les bocaux en verre se réutilisent, mais **changez les joints en caoutchouc** à chaque stérilisation : un joint déjà utilisé n'assure plus l'étanchéité. Vérifiez aussi que le bord du bocal n'est pas ébréché.`, { source: SAVOIR_FAIRE });

r.concept("ustensiles-conserve", "Ustensiles de conserverie", ["pince a bocaux", "pince", "pince ouvre bocal", "ouvre bocal", "ouvrir un bocal", "bocal difficile a ouvrir", "attraper les bocaux", "sortir les bocaux", "entonnoir a confiture", "entonnoir large"], {
  famille: "conserve",
  lien: PAGES.pinceBocaux,
});

r.fait("ustensiles-conserve", "gamme", `
  Ustensiles du Comptoir de la Conserve :
  - **pince à bocaux**, pour sortir les bocaux chauds du stérilisateur sans se brûler ;
  - **pince ouvre-bocal** multifonction, avec décapsuleur ;
  - **entonnoir à confiture** de 12 cm de diamètre, pour remplir les pots proprement.`, { source: PAGES.conserve.url, liens: [PAGES.pinceBocaux, PAGES.pinceOuvreBocal, PAGES.entonnoirConfiture] });

r.concept("confiture", "Confitures", ["confiture", "confitures", "faire de la confiture", "gelee", "gelees", "compote", "compotes", "marmelade", "fruits de saison", "confiturier"], {
  famille: "conserve",
  lien: PAGES.confiture,
});

r.fait("confiture", "procedure", `
  Les grandes étapes d'une confiture :
  1. Préparez des fruits **mûrs et sains**, et pesez-les avec le sucre (souvent à poids égal, ou moins pour une confiture moins sucrée).
  2. Faites cuire en remuant jusqu'à ce que la confiture **nappe la cuillère** ou se fige sur une assiette froide.
  3. Remplissez à chaud des pots **propres et ébouillantés**, à l'aide d'un entonnoir, jusqu'à 1 cm du bord.
  4. Fermez aussitôt et laissez refroidir.`, { source: SAVOIR_FAIRE, liens: [PAGES.confiture, PAGES.entonnoirConfiture] });

r.fait("confiture", "gamme", `
  La rubrique **Faire de la confiture** regroupe le matériel pour préparer confitures, gelées et compotes à partir des fruits de saison, comme l'entonnoir à confiture et les pots.`, { source: PAGES.confiture.url, liens: [PAGES.confiture] });

r.concept("fumoir", "Fumoir électrique", ["fumoir", "fumoirs", "fumer", "fumage", "fumaison", "fumer du poisson", "fumer la viande", "saumon fume", "fume"], {
  famille: "conserve",
  lien: PAGES.fumoir,
});

r.fait("fumoir", "definition", `
  Le **fumoir électrique de 1200 W** permet de fumer vos aliments à chaud, pour toutes vos recettes maison.`, { source: PAGES.sterilisateurs.url, liens: [PAGES.fumoir] });

r.fait("fumoir", "dimension", `
  Le fumoir électrique Duhallé a une puissance de **1200 W**.`, { source: PAGES.sterilisateurs.url, liens: [PAGES.fumoir] });

r.concept("rechaud", "Réchaud à gaz", ["rechaud", "rechaud a gaz", "rechauds", "bruleur", "gaz", "butane", "propane", "8500 w", "cuisson exterieure"], {
  famille: "conserve",
  lien: PAGES.rechaud,
});

r.fait("rechaud", "definition", `
  Le **réchaud à gaz de 8500 W**, en fonte, sur 4 pieds, fonctionne au **butane et au propane**. Robuste, il permet de chauffer une grande marmite ou une cuve en extérieur.`, { source: PAGES.sterilisateurs.url, liens: [PAGES.rechaud] });

r.fait("rechaud", "dimension", `
  Le réchaud à gaz Duhallé développe **8500 W** ; il fonctionne au butane comme au propane.`, { source: PAGES.sterilisateurs.url, liens: [PAGES.rechaud] });

r.concept("hachoir", "Hachoirs", ["hachoir", "hachoirs", "hachoir a viande", "hacher", "hachis", "saucisse", "saucisses", "pate", "pates maison", "terrine", "terrines", "hachoir electrique", "hachoir fonte"], {
  famille: "conserve",
  lien: PAGES.hachoirFonte,
});

r.fait("hachoir", "gamme", `
  Deux hachoirs pour vos préparations maison : un **hachoir en fonte n°10** (grille perforée en acier) et un **hachoir à viande électrique n°8** multifonction, pour hachis, saucisses et légumes râpés. Pratiques pour les terrines et pâtés à mettre en conserve.`, { source: PAGES.transformation.url, liens: [PAGES.hachoirFonte, PAGES.hachoirElectrique] });
