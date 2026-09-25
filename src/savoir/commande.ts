// Commander sur la boutique : livraison, paiement, retours, suivi.
// Le chatbot n'a accès à aucune commande ni aucun compte : il explique et
// renvoie vers le site ou le service client.
import { EMAIL, LIVRAISON_OFFERTE, TELEPHONE } from "./coordonnees";
import { PAGES } from "./liens";
import { rubrique } from "./outils";

const r = rubrique(PAGES.accueil.url);
export const commande = r;

r.concept("boutique-en-ligne", "La boutique en ligne", ["boutique en ligne", "site internet", "site web", "votre site", "boutique"], {
  famille: "catalogue",
  lien: PAGES.accueil,
});

r.concept("commande", "Passer commande", ["commande", "commander", "passer commande", "passer une commande", "acheter", "achat", "acheter en ligne", "panier", "valider mon panier"], {
  famille: "boutique-en-ligne",
  voirAussi: ["livraison", "paiement", "suivi-commande"],
});

r.fait("commande", "procedure", `
  Pour commander sur la boutique :
  1. Ajoutez les produits à votre panier depuis leur fiche.
  2. Validez votre panier et choisissez votre mode de livraison.
  3. Réglez en ligne : carte bancaire, PayPal, virement ou paiement en 4 fois sans frais.

  Vous recevez ensuite un e-mail de confirmation. Une question avant de commander ? Le service client vous répond au **${TELEPHONE}**.`);

r.concept("quantite-commande", "Calculer la quantité à commander", ["quantite a commander", "calcul de quantite a commander", "nombre a commander", "combien de bouchons commander", "combien de capsules commander", "marge de bouchons", "marge de capsules"], {
  famille: "commande",
});

r.fait("quantite-commande", "dimension", `
  Partez du nombre de bouteilles, ajoutez une petite marge pour les **essais, réglages et rebuts**, puis arrondissez au conditionnement réellement vendu sur la fiche produit. Pour la cire ou un consommable dont le rendement varie, faites d'abord un test sur quelques bouteilles avant de commander le reste.`);

r.concept("materiel-depart", "Matériel minimum pour commencer", ["materiel minimum", "materiel de depart", "liste de materiel", "kit pour commencer", "equipement pour debuter", "indispensables pour commencer"], {
  famille: "catalogue",
  lien: PAGES.accueil,
});

r.fait("materiel-depart", "gamme", `
  Le minimum dépend du projet, mais la liste suit toujours le même ordre : **contenant adapté**, matériel de nettoyage, transfert ou remplissage, fermeture compatible, outil de contrôle, puis rangement. Pour le vin : bouteilles, goupillon/rince-bouteille, siphon, bouchons et boucheuse ; pour le cidre, ajoutez des bouteilles prévues pour la pression et la fermeture correspondante.`, { liens: [PAGES.accueil] });

r.concept("suivi-commande", "Suivre ma commande", ["suivi", "suivi de commande", "suivre ma commande", "suivre mon colis", "numero de suivi", "etat de ma commande", "statut de ma commande", "colis pas recu", "colis non recu", "retard", "retard de livraison", "numero de commande", "commande pas arrivee", "commande pas recue", "commande en retard"], {
  famille: "commande",
  formules: ["ou en est ma commande", "ou en est mon colis", "je n ai pas recu", "pas recu", "toujours pas recu", "pas encore recu", "jamais recu", "quand vais je recevoir", "quand vais je etre livre"],
});

r.fait("suivi-commande", "procedure", `
  Je n'ai pas accès aux commandes. Pour suivre la vôtre, connectez-vous à votre compte client sur la boutique, ou contactez le service client au **${TELEPHONE}** ou à **${EMAIL}** en indiquant votre numéro de commande : l'équipe vous renseignera.`, { liens: [PAGES.contact] });

r.concept("modifier-commande", "Modifier ou annuler une commande", ["modifier ma commande", "annuler ma commande", "annulation", "annuler", "changer ma commande", "erreur de commande", "trompe commande", "trompe dans ma commande", "changer d adresse", "ajouter un article a ma commande", "oubli"], {
  famille: "commande",
});

r.fait("modifier-commande", "procedure", `
  Pour modifier ou annuler une commande, contactez le service client **le plus tôt possible** au **${TELEPHONE}** ou à **${EMAIL}**, avec votre numéro de commande. Si le colis n'est pas encore parti, l'équipe pourra plus facilement faire le changement.`, { liens: [PAGES.contact] });

// ─── Livraison ─────────────────────────────────────────────────────────────

r.concept("livraison", "Livraison", ["livraison", "livrer", "livre", "expedition", "expedier", "envoi", "envoyer", "frais de port", "frais de livraison", "frais d envoi", "transporteur", "transporteurs", "colis", "dpd", "colissimo", "geodis", "livraison gratuite", "livraison offerte", "franco de port", "port offert", "port gratuit"], {
  famille: "boutique-en-ligne",
  voirAussi: ["suivi-commande", "paiement"],
});

r.fait("livraison", "prix", `
  La livraison est **offerte** en France continentale à partir de :
  - **${LIVRAISON_OFFERTE.dpd}** d'achat avec DPD ;
  - **${LIVRAISON_OFFERTE.colissimo}** d'achat avec Colissimo ;
  - **${LIVRAISON_OFFERTE.geodis}** d'achat avec Geodis.

  En dessous de ces montants, les frais de port sont calculés dans votre panier selon le transporteur choisi. La livraison offerte ne s'applique pas à certains articles lourds ou volumineux.`);

r.fait("livraison", "definition", `
  Duhallé expédie ses commandes avec **DPD**, **Colissimo** et **Geodis** (pour les colis lourds ou volumineux). Vous choisissez le transporteur au moment de valider votre panier, et la livraison est offerte au-delà d'un certain montant d'achat.`);

r.fait("livraison", "condition", `
  La livraison offerte est valable en **France continentale**. Pour la Corse et les DOM-TOM, les frais dépendent du poids du colis : contactez le service client au **${TELEPHONE}** ou à **${EMAIL}** pour obtenir un devis. Pour une livraison à l'étranger, contactez également le service client.`);

r.fait("livraison", "duree", `
  Les délais de livraison dépendent du transporteur choisi ; ils vous sont indiqués au moment de valider votre commande. Pour une commande urgente ou pour savoir où en est un envoi, contactez le service client au **${TELEPHONE}**.`);

r.concept("zone-livraison", "Livraison hors France continentale", ["corse", "dom tom", "dom", "tom", "outre mer", "martinique", "guadeloupe", "reunion", "guyane", "etranger", "international", "belgique", "suisse", "luxembourg", "europe", "espagne", "allemagne", "italie", "angleterre"], {
  famille: "livraison",
});

r.fait("zone-livraison", "prix", `
  Pour la Corse, les DOM-TOM et l'étranger, les frais de port dépendent du **poids du colis** et de la destination, et la livraison offerte ne s'applique pas : contactez le service client au **${TELEPHONE}** ou à **${EMAIL}** pour obtenir un devis.`);

r.fait("zone-livraison", "condition", `
  Pour une livraison en Corse, dans les DOM-TOM ou à l'étranger, les frais dépendent du poids du colis et de la destination : contactez le service client au **${TELEPHONE}** ou à **${EMAIL}** pour un devis.`);

// ─── Paiement ──────────────────────────────────────────────────────────────

r.concept("paiement", "Paiement", ["paiement", "payer", "regler", "reglement", "moyen de paiement", "moyens de paiement", "carte bancaire", "carte bleue", "cb", "visa", "mastercard", "paypal", "virement", "cheque", "securise", "paiement securise"], {
  famille: "boutique-en-ligne",
  voirAussi: ["paiement-4x", "livraison"],
});

r.fait("paiement", "definition", `
  Vous pouvez régler votre commande par :
  - **carte bancaire** ;
  - **PayPal** ;
  - **virement bancaire** ;
  - **paiement en 4 fois sans frais**.

  Le paiement se fait en ligne, au moment de valider votre panier.`);

r.concept("paiement-4x", "Paiement en 4 fois", ["paiement fractionne", "paiement echelonne", "echelonner", "facilite de paiement", "facilites de paiement", "credit", "mensualites"], {
  famille: "paiement",
  // Les nombres seuls ne suffisent pas à désigner le paiement : on reconnaît l'expression entière.
  formules: ["4 fois", "quatre fois", "3 fois", "trois fois", "plusieurs fois", "4x", "3x", "en 4 x"],
});

r.fait("paiement-4x", "definition", `
  Duhallé propose le **paiement en 4 fois sans frais**. L'option et ses conditions (montants minimum et maximum) s'affichent au moment du paiement, lors de la validation de votre panier.`);

// ─── Retours, produits abîmés ──────────────────────────────────────────────

r.concept("retour", "Retour et rétractation", ["retour", "retourner", "renvoyer", "rembourser", "remboursement", "retractation", "droit de retractation", "formulaire de retractation", "echanger", "echange", "satisfait ou rembourse", "changer d avis", "ne me convient pas"], {
  famille: "boutique-en-ligne",
});

r.fait("retour", "procedure", `
  Vous disposez du **droit de rétractation** prévu par la loi : **14 jours** à compter de la réception de votre commande pour nous faire part de votre décision, grâce au formulaire de rétractation disponible en bas de page du site, ou en contactant le service client au **${TELEPHONE}** ou à **${EMAIL}**.

  Les modalités de retour (frais, état des produits) sont précisées dans les Conditions générales de vente.`);

r.concept("produit-abime", "Produit abîmé ou non conforme", ["abime", "arrive casse", "recu casse", "endommage", "defectueux", "defaut de fabrication", "en panne", "manquant", "piece manquante", "pas conforme", "non conforme", "mauvais produit", "erreur de produit", "garantie", "colis endommage", "colis arrive casse", "colis casse", "colis abime", "bouteille arrivee cassee", "bouteille cassee dans le colis"], {
  famille: "retour",
});

r.fait("produit-abime", "procedure", `
  Un produit est arrivé abîmé, incomplet, ou ne correspond pas à votre commande ? Contactez le service client **rapidement** au **${TELEPHONE}** ou à **${EMAIL}**, avec votre numéro de commande et, si possible, des photos. L'équipe vous proposera une solution.

  Si le colis est visiblement endommagé à la livraison, signalez-le aussi au transporteur.`, { liens: [PAGES.contact] });

// ─── Compte, facture, disponibilité ────────────────────────────────────────

r.concept("compte-client", "Mon compte client", ["compte client", "espace client", "mot de passe", "identifiant", "connexion", "se connecter", "inscription", "creer un compte", "s inscrire", "desinscription", "newsletter", "donnees personnelles", "rgpd", "supprimer mon compte"], {
  famille: "boutique-en-ligne",
  formules: ["mon compte", "votre compte", "un compte"],
});

r.fait("compte-client", "condition", `
  Je n'ai pas accès aux comptes clients. Pour vous connecter, créer un compte ou changer votre mot de passe, utilisez l'espace « Mon compte » de la boutique. Pour toute autre demande (données personnelles, newsletter), contactez le service client à **${EMAIL}**.`);

r.concept("facture", "Facture", ["facture", "factures", "facturation", "tva", "justificatif", "note de frais", "duplicata"], {
  famille: "boutique-en-ligne",
});

r.fait("facture", "procedure", `
  Pour obtenir une facture ou un duplicata, connectez-vous à votre compte client sur la boutique, ou demandez-la au service client à **${EMAIL}** en indiquant votre numéro de commande.`);

r.concept("disponibilite", "Disponibilité des produits", ["stock", "en stock", "disponible", "disponibles", "disponibilite", "rupture", "rupture de stock", "epuise", "reapprovisionnement", "retour en stock", "bientot disponible", "indisponible"], {
  famille: "catalogue",
});

r.fait("disponibilite", "condition", `
  La disponibilité de chaque article est indiquée sur sa fiche produit. Si un produit est épuisé, le service client peut vous dire quand il sera de retour en stock : **${TELEPHONE}** ou **${EMAIL}**.`);
