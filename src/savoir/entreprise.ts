// L'entreprise Duhallé, sa boutique et son service client.
import { EMAIL, HORAIRES, TELEPHONE } from "./coordonnees";
import { PAGES } from "./liens";
import { rubrique, SAVOIR_FAIRE } from "./outils";

const r = rubrique(PAGES.societe.url);
export const entreprise = r;

// ─── Le catalogue : la racine de toutes les familles de produits ───────────

r.concept("catalogue", "Le catalogue Duhallé", ["catalogue", "votre gamme", "liste des produits", "rayons", "rubriques"], {
  lien: PAGES.accueil,
  formules: ["que vendez vous", "qu est ce que vous vendez", "vous vendez quoi"],
});

r.fait("catalogue", "gamme", `
  La boutique Duhallé couvre tout le parcours du vin et du cidre faits maison, et bien plus :
  - **mise en bouteille** : bouteilles, nettoyage, soutirage, outils de mesure ;
  - **bouchage** : bouchons et bondes en liège, boucheuses, capsules et capsuleuses ;
  - **cire à cacheter** pour les goulots ;
  - **service du vin** et **casiers** de rangement ;
  - matériel pour **faire son cidre** ;
  - **vinaigriers** en grès ;
  - **Le Comptoir de la Conserve** : stérilisation, confitures, fumage ;
  - **droguerie**.`, { source: PAGES.planDuSite.url });

r.fait("catalogue", "prix", `
  Les prix, toujours à jour, sont affichés sur chaque fiche produit de la boutique. Je préfère vous y renvoyer plutôt que de vous donner un chiffre qui aurait pu changer.`);

r.fait("catalogue", "dimension", `
  Les **dimensions** et le **poids** de chaque produit sont indiqués sur sa **fiche** (description et caractéristiques). Dites-moi de quel produit il s'agit (bouchon, bonde, casier, vinaigrier, fût, dame-jeanne…) et je vous donnerai ce que je sais ; sinon, le service client vous répond au **${TELEPHONE}** ou à **${EMAIL}**.`, { liens: [PAGES.contact] });

r.fait("catalogue", "lieu", `
  Tous nos produits sont en vente sur la boutique en ligne **duhalle-boutique.fr**, avec livraison en France.`);

// ─── L'entreprise ──────────────────────────────────────────────────────────

r.concept("duhalle", "La société Duhallé", ["duhalle", "votre societe", "votre entreprise", "votre histoire", "societe", "entreprise", "fabricant", "marque duhalle"], {
  lien: PAGES.societe,
  formules: ["qui etes vous", "presentez vous", "vous etes qui", "c est qui duhalle", "depuis quand existez vous"],
  voirAussi: ["service-client", "avis-clients", "conseils-recettes"],
});

r.fait("duhalle", "definition", `
  **Duhallé** est une entreprise française à taille humaine, spécialisée depuis près de 40 ans dans le matériel de bouchage et de mise en bouteille du vin et du cidre.

  Créée à l'origine pour proposer des bouchons en liège du Portugal, elle a élargi son catalogue au fil des années : service et rangement du vin, fabrication du cidre, vinaigriers en grès et, plus récemment, petit matériel de conserverie avec Le Comptoir de la Conserve.`);

r.fait("duhalle", "raison", `
  Ce qui fait la différence chez Duhallé :
  - des bouchons en **liège naturel**, matière recyclable et compostable, le bouchage préféré des viticulteurs ;
  - une **cire à cacheter fabriquée dans le Sud-Ouest de la France** ;
  - des **vinaigriers en grès** façonnés au Portugal par un atelier à taille humaine ;
  - un **service client gratuit** qui vous conseille ;
  - des **avis clients garantis**.`);

r.fait("duhalle", "lieu", `
  Duhallé vend en ligne sur **duhalle-boutique.fr**. Certains produits de la marque se trouvent aussi chez des revendeurs, mais le catalogue complet et les conseils de l'équipe sont sur la boutique en ligne.`);

// ─── Le service client ─────────────────────────────────────────────────────

r.concept("service-client", "Contacter le service client", ["service client", "contact", "contacter", "telephone", "numero de telephone", "numero", "joindre", "appeler", "email", "e mail", "mail", "adresse mail", "courriel", "sav", "service apres vente", "horaires", "heures d ouverture", "jours d ouverture", "standard", "ecrire"], {
  lien: PAGES.contact,
  formules: ["vous joindre", "vous contacter", "vous appeler", "vous ecrire", "vous telephoner", "etes vous ouvert", "etes vous ouverts", "vous etes ouvert", "vous etes ouverts", "ouvert le samedi", "ouverts le samedi", "ouvert le week end", "ouverts le week end"],
});

r.fait("service-client", "definition", `
  Notre service client est **gratuit** et répond à toutes vos questions sur les produits et les commandes :
  - par téléphone au **${TELEPHONE}**, du **lundi au jeudi** de ${HORAIRES.lundiJeudi}, et le **vendredi** de ${HORAIRES.vendredi} ;
  - par e-mail à **${EMAIL}**, y compris en dehors de ces horaires.`, { liens: [PAGES.contact] });

// ─── Avis, fidélité, promotions ────────────────────────────────────────────

r.concept("avis-clients", "Les avis clients", ["avis", "avis clients", "avis garantis", "avis negatifs", "mauvais avis", "commentaires", "commentaires des clients", "notes", "note des clients", "temoignages", "satisfaction", "serieux", "fiable", "confiance", "arnaque"], {
  famille: "duhalle",
});

r.fait("avis-clients", "definition", `
  Duhallé publie des **avis clients garantis**, recueillis auprès d'acheteurs réels par un organisme indépendant. Vous pouvez les consulter sur la boutique, notamment sur les fiches produits.`);

r.concept("fidelite", "Parrainage et fidélité", ["fidelite", "programme de fidelite", "carte de fidelite", "parrainage", "parrainer", "filleul", "parrain", "points fidelite", "avantages clients", "nos avantages"], {
  lien: PAGES.avantages,
  famille: "duhalle",
});

r.fait("fidelite", "definition", `
  Duhallé récompense ses clients avec un programme **Parrainage et Fidélité**. Le fonctionnement et les avantages sont détaillés sur la page « Nos avantages » de la boutique.`, { source: PAGES.avantages.url });

r.concept("promotions", "Promotions et codes promo", ["promotion", "promotions", "promo", "code promo", "code de reduction", "reduction", "remise", "soldes", "bon de reduction", "coupon", "bon plan", "reduc"], {
  famille: "catalogue",
  voirAussi: ["fidelite"],
});

r.fait("promotions", "definition", `
  Les offres du moment sont mises en avant sur la boutique. Si vous avez un code promo, saisissez-le au moment de valider votre panier. Pensez aussi au programme Parrainage et Fidélité.`, { liens: [PAGES.avantages] });

// ─── Professionnels, personnalisation, cadeaux, points de vente ────────────

r.concept("professionnels", "Professionnels et grandes quantités", ["professionnel", "professionnels", "pro", "viticulteur", "vigneron", "domaine viticole", "caviste", "grossiste", "grande quantite", "grandes quantites", "gros volume", "en gros", "tarif professionnel", "entreprise cliente", "comite d entreprise", "collectivite"], {
  famille: "duhalle",
  formules: ["je suis revendeur", "devenir revendeur", "pour revendre", "je suis professionnel", "je suis viticulteur", "je suis vigneron"],
});

r.fait("professionnels", "definition", `
  Vous êtes viticulteur, caviste, revendeur, ou vous avez besoin de grandes quantités ? Contactez le service client au **${TELEPHONE}** ou à **${EMAIL}** : l'équipe étudiera votre demande. Certains articles existent déjà en grands conditionnements, comme les capsules couronne par 1000.`, { liens: [PAGES.contact] });

// Devis, remise, prix pour une grosse commande : le prix d'un article est sur sa fiche, le reste passe par l'équipe.
const QUANTITES = [20, 24, 30, 36, 40, 50, 60, 72, 80, 100, 120, 144, 150, 180, 200, 250, 300, 360, 400, 500, 600, 800, 1000, 2000, 5000];

r.concept("devis", "Devis et prix par quantité", ["devis", "demande de devis", "demande de prix", "meilleur prix", "prix degressif", "prix degressifs", "tarif degressif", "remise quantite", "grosse quantite", "grosses quantites"], {
  famille: "professionnels",
  formules: [
    "remise pour grosse quantite", "remise pour une grosse quantite", "remise pour grande quantite", "remise pour gros volume", "remise sur grosse quantite", "remise sur une grosse quantite",
    "souhaite un prix", "souhaiterais un prix", "voudrais un prix", "avoir un prix", "un prix pour", "un tarif pour", "demander un prix", "demander un tarif", "faire une remise", "une remise", "des remises", "meilleur tarif", "prix de gros", "tarif de gros", "prix pour une quantite", "prix pour une grande quantite", "prix pour une grosse quantite", "prix au lot", "prix par lot", "tarif au lot", "tarif par lot", "prix du lot", "prix en lot", "prix par quantite", "prix selon la quantite", "prix si j en prends", "prix si j en achete", "prix si j en commande", "tarif par quantite", "remise au lot", "remise a partir de", "remise si j en prends", "remise si j en achete", "reduction par quantite", "reduction pour quantite",
    ...QUANTITES.flatMap((n) => [`prix pour ${n}`, `tarif pour ${n}`]),
  ],
});

const AVOIR_UN_DEVIS = `
  Le prix de chaque article est affiché sur sa **fiche produit**. Pour un **devis**, une remise sur une **grande quantité** ou une livraison à une date précise, contactez le service client au **${TELEPHONE}** ou à **${EMAIL}** en indiquant les **produits**, les **quantités**, votre **adresse de livraison** (code postal) et la **date souhaitée** : l'équipe vous fera une proposition. Certains articles existent déjà en grands conditionnements, comme les capsules couronne par 1000.`;

for (const aspect of ["definition", "prix", "condition", "procedure"] as const) {
  r.fait("devis", aspect, AVOIR_UN_DEVIS, { liens: [PAGES.contact] });
}
// « Les prix indiqués sont-ils des prix pro ? » : les prix du site sont ceux de chaque fiche ; des tarifs professionnels sont à
// l'étude mais rien n'est en place (équipe Duhallé, 20/10/2026).
const PRIX_PRO = `
  Les prix affichés sur le site sont ceux de chaque **fiche produit**. Des **tarifs professionnels** sont à l'étude, mais rien n'est encore en place : je n'ai donc pas de grille distincte à vous annoncer. Si vous êtes viticulteur, caviste ou revendeur, ou si vous avez besoin de grandes quantités, contactez le service client au **${TELEPHONE}** ou à **${EMAIL}** : l'équipe étudiera votre demande et pourra vous faire une proposition (**devis**) en indiquant les **produits**, les **quantités**, votre **adresse de livraison** et la **date souhaitée**.`;

// « tarif professionnel » : le prix, pour un professionnel, passe aussi par l'équipe.
for (const aspect of ["prix", "condition"] as const) {
  r.fait("professionnels", aspect, PRIX_PRO, { liens: [PAGES.contact] });
}

r.concept("personnalisation", "Bouchons personnalisés", ["personnalisation", "personnaliser", "personnalise", "personnalises", "marquage", "marquer", "gravure", "logo", "mariage", "prenoms", "initiales", "bouchon personnalise", "evenement", "bapteme"], {
  famille: "duhalle",
  lien: PAGES.articleMariage,
});

r.fait("personnalisation", "definition", `
  Duhallé peut **marquer des bouchons en liège** selon vos souhaits : dates, prénoms, photos, logos ou symboles, par exemple pour un mariage ou un événement. Pour les quantités, les délais et les tarifs, contactez le service client au **${TELEPHONE}**. Des couleurs de cire à cacheter personnalisées sont aussi possibles sur demande.`, { source: PAGES.articleMariage.url, liens: [PAGES.articleMariage, PAGES.contact] });

r.concept("cadeau", "Idées cadeaux", ["cadeau", "cadeaux", "idee cadeau", "offrir", "coffret", "noel", "fete des peres", "fete des meres", "anniversaire", "cadeau amateur de vin", "cadeau oenologie"], {
  famille: "catalogue",
});

r.fait("cadeau", "gamme", `
  Quelques idées de cadeaux pour les amateurs de vin et de fait-maison :
  - un **tire-bouchon à levier en coffret** ou le **couteau de sommelier Coutale Prestige** ;
  - un **vinaigrier en grès** coloré, avec son tabouret en bois ;
  - de la **cire à cacheter** et des bouchons pour habiller des bouteilles faites maison ;
  - une **pompe vide-air** ou un **bouchon verseur** pour les bouteilles entamées ;
  - un **pressoir en bois** pour les amateurs de cidre et de jus.`, {
  source: SAVOIR_FAIRE,
  liens: [PAGES.serviceDuVin, PAGES.vinaigriers, PAGES.cire],
});

r.concept("magasin", "Points de vente", ["magasin", "magasins", "boutique physique", "point de vente", "points de vente", "showroom", "retrait", "retrait sur place", "venir chercher", "revendeurs", "grande surface", "magasin de bricolage", "adresse du magasin"], {
  famille: "duhalle",
  // « Est-il possible de retirer un bidon directement à votre site ? » : le retrait l'emporte sur le produit cité.
  exclusif: true,
  formules: ["retirer un", "retirer une", "retirer ma commande", "retirer mon colis", "retirer directement", "retirer sur place", "retirer a votre site", "retirer sur votre site", "directement a votre site", "directement sur votre site", "directement chez vous", "passer chercher", "passer prendre", "venir recuperer", "recuperer sur place", "enlever sur place", "retrait en magasin", "retrait au depot", "click and collect", "votre depot", "votre entrepot", "votre site de"],
});

// Retrait sur place : à définir avec le service client (équipe Duhallé, 20/10/2026).
const BOUTIQUE_EN_LIGNE = `
  Duhallé est avant tout une **boutique en ligne** : l'ensemble du catalogue est sur duhalle-boutique.fr, avec livraison en France. Certains produits de la marque sont aussi distribués par des enseignes de bricolage et de jardinage. Pour un **retrait sur place**, contactez le service client au **${TELEPHONE}** ou à **${EMAIL}** : l'équipe définira avec vous les possibilités.`;

for (const aspect of ["lieu", "condition", "procedure", "definition", "gamme"] as const) {
  r.fait("magasin", aspect, BOUTIQUE_EN_LIGNE);
}

// « Où sont fabriqués ces pressoirs ? » : l'origine est précisée sur la fiche quand elle est connue.
r.concept("origine-fabrication", "Origine de fabrication des produits", ["origine", "provenance", "pays de fabrication", "lieu de fabrication", "fabriquee en france", "fabrique en france", "made in france", "made in", "origine des produits"], {
  famille: "catalogue",
  exclusif: true,
  formules: ["ou sont fabriques", "ou est fabrique", "ou sont fabriquees", "ou est fabriquee", "ou est ce fabrique", "ou est ce que c est fabrique", "d ou vient", "d ou viennent", "d ou provient", "d ou provient", "fabrique ou", "fabriques ou", "fabrique dans quel pays", "fabrique en quel pays", "de quel pays", "ou sont produits", "ou est produit", "ou sont fabrique", "fabrication francaise", "fabrication artisanale"],
});

const ORIGINE_DE_FABRICATION = `
  L'origine de fabrication est précisée sur la **fiche de chaque produit** quand elle est connue. Parmi les produits dont je la connais : les **vinaigriers en grès** et les **mortiers en grès** sont de fabrication artisanale du **Portugal**, le **vinaigrier en chêne** et le **mustimètre** sont fabriqués en **France**, les **pressoirs en bois**, les **fûts alimentaires blancs** et les **casiers** en acier plastifié en **Italie**, et le **liège** vient du **Portugal**. Pour un autre produit, demandez l'origine au service client au **${TELEPHONE}** ou à **${EMAIL}**.`;

// Donnée de l'équipe Duhallé (20/10/2026) : les pressoirs en bois viennent d'Italie.
const PRESSOIRS_FABRIQUES_EN_ITALIE = `
  Les **pressoirs en bois** Duhallé (6, 11, 20 et 28 litres) sont fabriqués en **Italie**.`;

for (const aspect of ["lieu", "definition", "raison", "condition", "gamme"] as const) {
  r.fait("origine-fabrication", aspect, ORIGINE_DE_FABRICATION, { liens: [PAGES.contact] });
  // « Où sont fabriqués ces pressoirs ? » cite l'origine ET le pressoir : ce fait croisé passe devant la liste générale.
  r.fait(["origine-fabrication", "pressoir"], aspect, PRESSOIRS_FABRIQUES_EN_ITALIE, { liens: [PAGES.pressoir20] });
}

// ─── Les conseils du site ──────────────────────────────────────────────────

r.concept("conseils-recettes", "Conseils et recettes", ["conseils et recettes", "recettes", "recette", "blog", "guide", "guides", "tutoriel", "tuto", "articles de conseils", "fiches conseils", "videos"], {
  lien: PAGES.conseils,
  famille: "duhalle",
});

r.fait("conseils-recettes", "definition", `
  La rubrique **Conseils & Recettes** du site regroupe des guides pratiques : faire son cidre, organiser sa cave à vin, les idées reçues sur le bouchon de liège, personnaliser des bouchons pour un mariage, et des recettes pour vos conserves maison.`, {
  source: PAGES.conseils.url,
  liens: [PAGES.conseils, PAGES.articleCidre, PAGES.articleCave],
});
