// L'entreprise Duhallé, sa boutique et son service client.
import { EMAIL, TELEPHONE } from "./coordonnees";
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

r.concept("service-client", "Contacter le service client", ["service client", "contact", "contacter", "telephone", "numero de telephone", "numero", "joindre", "appeler", "email", "e mail", "mail", "adresse mail", "courriel", "sav", "service apres vente", "horaires", "standard", "ecrire"], {
  lien: PAGES.contact,
  formules: ["vous joindre", "vous contacter", "vous appeler", "vous ecrire", "vous telephoner"],
});

r.fait("service-client", "definition", `
  Notre service client est **gratuit** et répond à toutes vos questions sur les produits et les commandes :
  - par téléphone au **${TELEPHONE}** ;
  - par e-mail à **${EMAIL}**.

  Les horaires d'ouverture sont indiqués sur la page Contact du site.`, { liens: [PAGES.contact] });

// ─── Avis, fidélité, promotions ────────────────────────────────────────────

r.concept("avis-clients", "Les avis clients", ["avis", "avis clients", "avis garantis", "notes", "note des clients", "temoignages", "satisfaction", "serieux", "fiable", "confiance", "arnaque"], {
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

r.concept("professionnels", "Professionnels et grandes quantités", ["professionnel", "professionnels", "pro", "viticulteur", "vigneron", "domaine viticole", "caviste", "grossiste", "grande quantite", "grandes quantites", "gros volume", "en gros", "devis", "tarif professionnel", "entreprise cliente", "comite d entreprise", "collectivite"], {
  famille: "duhalle",
  formules: ["je suis revendeur", "devenir revendeur", "pour revendre", "je suis professionnel", "je suis viticulteur", "je suis vigneron"],
});

r.fait("professionnels", "definition", `
  Vous êtes viticulteur, caviste, revendeur, ou vous avez besoin de grandes quantités ? Contactez le service client au **${TELEPHONE}** ou à **${EMAIL}** : l'équipe étudiera votre demande. Certains articles existent déjà en grands conditionnements, comme les capsules couronne par 1000.`, { liens: [PAGES.contact] });

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
});

r.fait("magasin", "lieu", `
  Duhallé est avant tout une **boutique en ligne** : l'ensemble du catalogue est sur duhalle-boutique.fr, avec livraison en France. Certains produits de la marque sont aussi distribués par des enseignes de bricolage et de jardinage. Pour toute question sur un retrait de commande, contactez le service client au **${TELEPHONE}**.`);

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
