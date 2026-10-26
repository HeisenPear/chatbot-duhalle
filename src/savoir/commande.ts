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
  formules: ["quantite acheter pour mon nombre de bouteilles", "nombre de bouchons a acheter"],
});

r.fait("quantite-commande", "dimension", `
  Partez du nombre de bouteilles, ajoutez une petite marge pour les **essais, réglages et rebuts**, puis arrondissez au conditionnement réellement vendu sur la fiche produit. Pour la cire ou un consommable dont le rendement varie, faites d'abord un test sur quelques bouteilles avant de commander le reste.`);

r.fait("quantite-commande", "procedure", `
  Pour calculer les bouchons à commander, comptez une unité par bouteille, ajoutez une marge pour les essais, réglages et bouchons écartés, puis arrondissez au lot vendu. Vérifiez avant tout que la référence est compatible avec le goulot, la boucheuse et la durée de garde.`, { liens: [PAGES.bouchonsVin] });

r.concept("materiel-depart", "Matériel minimum pour commencer", ["materiel minimum", "materiel de depart", "liste de materiel", "kit pour commencer", "equipement pour debuter", "indispensables pour commencer"], {
  famille: "catalogue",
  lien: PAGES.accueil,
});

r.fait("materiel-depart", "gamme", `
  Le minimum dépend du projet, mais la liste suit toujours le même ordre : **contenant adapté**, matériel de nettoyage, transfert ou remplissage, fermeture compatible, outil de contrôle, puis rangement. Pour le vin : bouteilles, goupillon/rince-bouteille, siphon, bouchons et boucheuse ; pour le cidre, ajoutez des bouteilles prévues pour la pression et la fermeture correspondante.`, { liens: [PAGES.accueil] });

r.concept("piece-rechange", "Pièces de rechange", ["piece de rechange", "pieces de rechange", "piece d usure", "tete de rechange", "remplacer une piece", "remplacer une tete", "piece detachee", "pieces detachees", "piece de remplacement", "pieces de remplacement", "piece separee", "pieces separees", "poignee", "poignees"], {
  famille: "commande",
  lien: PAGES.contact,
  formules: ["bonne piece de rechange pour mon appareil", "retrouver la bonne piece de rechange", "au detail", "vendez vous au detail", "vendre au detail", "vendu au detail", "vendus au detail", "vendus separement", "vendu separement", "vendues separement", "vendue separement", "vendez vous separement", "acheter separement", "acheter a part", "vendu a part", "vendus a part", "acheter uniquement", "acheter seulement", "acheter seul", "acheter seule", "robinet seul", "un robinet seul", "le robinet seul", "bouchon seul", "vendu seul", "vendue seule", "vendus seuls", "en piece detachee", "acheter le robinet", "acheter un robinet", "acheter des robinets", "commander un robinet", "commander des robinets", "acheter la poignee", "acheter une poignee"],
});

r.fait("piece-rechange", "gamme", `
  Certaines pièces se vendent à part : les **bondes en liège**, le **bouchon de rechange du vinaigrier**, les **robinets** (en bois pour les vinaigriers et les fûts en bois, en plastique pour les fûts alimentaires blancs), les **couvercles** de fûts, les **pattes de fixation** des casiers, les **grilles** de hachoir, les **rondelles en polyéthylène** des bouchons mécaniques, le tire-bouchon des bouchons Pratic… mais pas toutes. Pour une pièce précise (poignée, joint, tête…), indiquez le **modèle de l'appareil ou du produit** et la **pièce recherchée** au service client, au **${TELEPHONE}** ou à **${EMAIL}** : il vous dira si elle est disponible séparément.`, { liens: [PAGES.contact, PAGES.bondes] });

// ─── Envoyer une photo ─────────────────────────────────────────────────────

r.concept("envoi-photo", "Envoyer une photo ou un fichier", ["envoyer une photo", "envoyer des photos", "envoyer une image", "envoyer des images", "envoyer un fichier", "joindre une photo", "joindre une image", "joindre un fichier", "piece jointe", "pieces jointes"], {
  exclusif: true,
  famille: "boutique-en-ligne",
  formules: ["envoyer la photo", "envoyer les photos", "envoyer une capture", "envoyer un document", "joindre un document", "telecharger une image", "telecharger une photo", "televerser", "ajouter une photo", "ajouter une image", "vous envoyer une photo", "vous envoyer une image", "vous envoyer des photos", "vous envoyer un fichier"],
});

const ENVOYER_UNE_PHOTO = `
  Je ne peux pas recevoir d'images ni de fichiers dans cette discussion. Pour nous montrer un produit, un colis abîmé ou une pièce à identifier, envoyez vos **photos par e-mail** à **${EMAIL}** en indiquant votre numéro de commande et le produit concerné : l'équipe vous répondra. Vous pouvez aussi appeler le **${TELEPHONE}**.`;

for (const aspect of ["definition", "procedure", "condition", "lieu"] as const) {
  r.fait("envoi-photo", aspect, ENVOYER_UNE_PHOTO, { liens: [PAGES.contact] });
}

// La même réponse pour qui écrit en anglais : sans concept à part, la phrase anglaise ne citerait rien.
// Sans famille : une suggestion « Voir aussi » ne doit jamais proposer un libellé anglais à un client français.
r.concept("envoi-photo-en", "Sending a photo or a file", [], {
  formules: ["upload an image", "upload a picture", "upload a photo", "upload image", "upload photo", "upload a file", "upload files", "upload pictures", "upload photos", "send an image", "send a picture", "send a photo", "send you a picture", "send you a photo", "send you an image", "send pictures", "send photos", "send images", "attach a file", "attach a photo", "attach an image", "attach a picture"],
});

const SEND_A_PHOTO = `
  I cannot receive images or files in this chat. Please send your photos by e-mail to **${EMAIL}**, with your order number and the product concerned: our team will answer you. You can also call **${TELEPHONE}**. (Je ne peux pas recevoir d'images dans cette discussion : écrivez-nous par e-mail.)`;

for (const aspect of ["definition", "procedure", "condition", "lieu"] as const) {
  r.fait("envoi-photo-en", aspect, SEND_A_PHOTO, { liens: [PAGES.contact] });
}

r.fait("piece-rechange", "procedure", `
  Pour identifier une pièce de rechange, relevez la **marque, le modèle exact, les dimensions de la pièce, son mode de fixation** et, si possible, le numéro de série. Envoyez ces éléments avec des photos de l'appareil et de la pièce au service client ; une ressemblance visuelle seule ne garantit pas la compatibilité.`, { liens: [PAGES.contact] });

r.concept("compatibilite-produit", "Vérifier la compatibilité d’un produit", ["compatibilite produit", "references proches", "deux references", "comparer deux references", "choisir entre deux references"], {
  famille: "commande",
  lien: PAGES.contact,
});

r.fait("compatibilite-produit", "choix", `
  Entre deux références proches, comparez l'**usage prévu**, les dimensions utiles, les raccords ou fixations, les matériaux, la cadence et les consommables compatibles. Si une seule mesure ou référence manque, ne concluez pas d'après la photo : demandez une confirmation écrite au service client.`, { liens: [PAGES.contact] });

r.concept("mesures-commande", "Mesures à relever avant commande", ["mesures avant commande", "mesurer avant de commander", "dimensions avant commande", "cotes avant commande"], {
  famille: "commande",
  formules: ["que faut il mesurer avant de commander", "que faut il mesurer avant d acheter"],
});

r.fait("mesures-commande", "procedure", `
  Avant de commander, relevez les mesures qui font interface : **diamètre intérieur et profil du goulot**, diamètre de bague, longueur et diamètre du bouchon, diamètre intérieur/extérieur du tuyau, dimensions de fixation ou volume utile selon le produit. Notez aussi la marque et le modèle de l'appareil existant.`, { liens: [PAGES.contact] });

r.concept("filetage", "Diamètre de filetage", ["filetage", "filetages", "filete", "filetee", "pas de vis", "pas du filetage", "diametre du filetage", "taraudage"], {
  famille: "mesures-commande",
  lien: PAGES.contact,
});

r.fait("filetage", "dimension", `
  Le **diamètre du filetage** n'est pas le même d'un article à l'autre : il figure dans la description de la fiche produit lorsqu'il compte (robinet, raccord, bouchon à vis…). Précisez de **quel article** il s'agit, ou contactez le service client au **${TELEPHONE}** ou à **${EMAIL}** avec la référence. Pour une pièce que vous possédez déjà, mesurez le diamètre extérieur du filetage avec un pied à coulisse.`, { liens: [PAGES.contact] });

r.concept("contact-alimentaire", "Aptitude au contact alimentaire", ["contact alimentaire", "apte au contact alimentaire", "alimentaire ou non", "convient aux aliments", "convient aux boissons"], {
  famille: "catalogue",
  formules: ["produit convient il au contact alimentaire", "produit est il adapte au contact alimentaire"],
});

r.fait("contact-alimentaire", "condition", `
  N'utilisez un produit au contact d'un aliment ou d'une boisson que si sa **fiche, son emballage ou sa déclaration de conformité** l'indique pour cet usage et pour les températures prévues. L'aspect, la mention « inox » ou « plastique » et l'absence d'odeur ne suffisent pas à le prouver.`, { liens: [PAGES.contact] });

r.fait("contact-alimentaire", "choix", `
  Pour choisir un produit en contact avec un aliment, exigez la mention d'aptitude ou la déclaration de conformité correspondant à l'usage, au liquide et à la température. En l'absence de document, demandez confirmation avant achat plutôt que de vous fier au matériau apparent.`, { liens: [PAGES.contact] });

// Défini avant le suivi : « je n'ai pas reçu ma facture » parle de facture, pas de colis.
r.concept("facture", "Facture", ["facture", "factures", "facturation", "tva", "justificatif", "note de frais", "duplicata"], {
  famille: "boutique-en-ligne",
  formules: ["pas de facture", "facture manquante", "facture pas editee", "facture n a pas ete editee", "facture n est pas editee", "creer la facture", "editer la facture", "etablir la facture", "recevoir ma facture", "pas recu ma facture", "demande de facture", "facture pour mon entreprise", "facture entreprise", "facture au nom de", "facture a mon nom", "numero de tva", "duplicata de facture", "envoyer la facture", "envoyer ma facture", "envoyer une facture", "copie de la facture", "copie de facture", "copie facture", "telecharger ma facture", "telecharger la facture"],
});

r.concept("facture-incorrecte", "Facture incorrecte", ["facture incorrecte", "facture erronee", "erreur sur la facture", "erreur de facture", "corriger la facture", "modifier la facture", "adresse de facturation"], {
  famille: "facture",
  formules: ["facture est incorrecte", "facture est fausse", "facture n est pas bonne", "changer l adresse de facturation", "mauvaise adresse de facturation", "nom sur la facture", "numero de tva sur la facture"],
});

r.fait("facture-incorrecte", "procedure", `
  Si votre facture comporte une erreur (nom, adresse de facturation, numéro de TVA, montant), écrivez au service client à **${EMAIL}** (ou appelez le **${TELEPHONE}**) avec votre **numéro de commande** et les informations à corriger : il vous renverra une facture corrigée.`, { liens: [PAGES.contact] });

r.concept("suivi-commande", "Suivre ma commande", ["suivi", "suivi de commande", "suivre ma commande", "suivre mon colis", "numero de suivi", "etat de ma commande", "statut de ma commande", "colis pas recu", "colis non recu", "retard", "retard de livraison", "numero de commande", "commande pas arrivee", "commande pas recue", "commande en retard"], {
  famille: "commande",
  formules: ["ou en est ma commande", "ou en est mon colis", "je n ai pas recu", "pas recu", "toujours pas recu", "pas encore recu", "jamais recu", "quand vais je recevoir", "quand vais je etre livre", "en retard",
    // Un numéro de commande seul (« N° 1234567 ») : le client demande où elle en est.
    "n reference", "numero reference", "commande n reference",
    "ou est ma commande", "ou est mon colis", "mon colis n est pas arrive", "ma commande n est pas arrivee",
    // « quand je recevrai ma commande ? » : la date d'une commande précise, que seul le service client connaît.
    "quand je recevrai", "quand je recevrais", "quand je vais recevoir", "quand puis je recevoir", "quand pourrai je recevoir", "quand recevrai je", "quand je serai livre", "quand je serais livre", "quand serai je livre", "quand arrive ma commande", "quand arrivera ma commande", "quand arrive mon colis", "quand arrivera mon colis", "quand vais je avoir ma commande",
    // Le numéro seul, une fois masqué ou saisi : « commande 123456 » demande où en est la commande.
    "commande reference", "ma commande reference", "commande n reference", "commande numero reference", "commande numero n reference"],
});

r.fait("suivi-commande", "procedure", `
  Je n'ai pas accès aux commandes. Pour suivre la vôtre, connectez-vous à votre compte client sur la boutique, ou contactez le service client au **${TELEPHONE}** ou à **${EMAIL}** en indiquant votre numéro de commande : l'équipe vous renseignera.`, { liens: [PAGES.contact] });

r.concept("confirmation-commande", "Commande passée mais introuvable", ["confirmation de commande", "mail de confirmation", "e mail de confirmation", "email de confirmation", "commande introuvable"], {
  famille: "suivi-commande",
  voirAussi: ["suivi-commande", "paiement"],
  formules: ["je ne la vois pas", "ne la vois pas", "ne la trouve pas", "n apparait pas dans mon compte", "n apparait pas dans mes commandes", "pas de confirmation", "rien recu par mail", "pas recu de mail", "pas recu d e mail", "pas de mail", "pas d e mail", "pas recu de courriel", "pas de courriel", "pas de mail de confirmation", "pas recu de mail de confirmation", "pas recu d e mail de confirmation", "pas recu de confirmation", "aucune confirmation", "aucun mail",
    // « Avez-vous reçu le paiement ? », « commande valide » : le client veut savoir si c'est bien passé.
    "recu le paiement", "recu mon paiement", "recu notre paiement", "recu le reglement", "recu mon reglement", "recu mon virement", "recu le virement", "paiement bien recu", "paiement est bien passe", "paiement est il bien passe", "paiement a bien ete", "paiement valide", "paiement accepte", "paiement pris en compte", "virement bien recu",
    "commande valide", "commande validee", "commande bien validee", "commande enregistree", "commande bien enregistree", "commande est elle enregistree", "commande est elle bien enregistree", "commande est elle validee", "commande est elle bien validee", "commande a t elle ete enregistree", "commande a t elle bien ete enregistree", "virement est il bien arrive", "virement bien arrive", "virement est il arrive", "paiement est il bien arrive", "paiement est bien arrive", "paiement est il passe", "mon paiement est passe", "paiement bien passe", "paiement a t il ete accepte", "paiement a ete accepte", "commande bien passee", "commande est bien passee", "commande est elle bien passee", "commande a bien ete passee", "commande a bien ete prise en compte", "commande prise en compte", "commande confirmee", "etre sur que ma commande", "etre sur que la commande", "comment savoir si ma commande", "comment savoir si la commande"],
});

const CONFIRMER_UNE_COMMANDE = `
  Je n'ai pas accès aux paiements ni aux commandes : je ne peux donc pas voir si un règlement est arrivé. Après le paiement, vous recevez normalement un **e-mail de confirmation** (pensez à vérifier vos courriers indésirables). Si vous avez un compte client, votre commande y apparaît ; **sans compte client**, c'est l'e-mail de confirmation qui fait foi. Si vous ne voyez ni l'un ni l'autre, vérifiez que le paiement a bien été débité sur votre relevé, puis contactez le service client au **${TELEPHONE}** ou à **${EMAIL}** en indiquant l'adresse e-mail utilisée pour commander.`;

r.fait("confirmation-commande", "procedure", CONFIRMER_UNE_COMMANDE, { liens: [PAGES.contact] });

// Même texte, rattaché aussi à « commande » : quand la question cite les deux, il passe devant la procédure pour commander.
r.fait(["confirmation-commande", "commande"], "procedure", CONFIRMER_UNE_COMMANDE, { liens: [PAGES.contact] });

// Défini après la confirmation : « j'ai commandé sans compte, comment être sûr que c'est passé ? » parle de confirmation.
// Des formules : sans leurs mots courants (« sans », « de »), ces expressions seraient celles du compte client.
r.concept("commande-sans-compte", "Commander sans créer de compte", [], {
  famille: "compte-client",
  formules: ["commander sans compte", "commande sans compte", "commander sans creer de compte", "sans creer de compte", "sans compte client", "sans inscription", "sans m inscrire", "sans vous inscrire", "compte obligatoire", "compte client obligatoire", "obligatoire de creer un compte", "obligee de creer un compte"],
});

const COMMANDER_SANS_COMPTE = `
  Oui, des clients passent commande **sans créer de compte client**. Dans ce cas, c'est l'**e-mail de confirmation** qui fait foi : conservez-le, et indiquez l'adresse e-mail utilisée si vous contactez le service client au **${TELEPHONE}** ou à **${EMAIL}**. Un compte client permet en plus de retrouver ses commandes et ses factures en ligne.`;

for (const aspect of ["condition", "procedure", "definition"] as const) {
  r.fait("commande-sans-compte", aspect, COMMANDER_SANS_COMPTE, { liens: [PAGES.contact] });
}

r.concept("colis-introuvable", "Colis annoncé livré mais introuvable", ["colis perdu", "colis egare", "colis introuvable", "livreur", "lien de suivi"], {
  famille: "suivi-commande",
  voirAussi: ["suivi-commande", "livraison", "produit-abime"],
  formules: ["annonce livre", "annonces livres", "annonce comme livre", "marque comme livre", "indique livre", "indiquee livree", "livre mais", "suivi de mon colis ne fonctionne pas", "suivi de ma commande ne fonctionne pas", "suivi du colis ne fonctionne pas", "suivi de la commande ne fonctionne pas", "suivi de mon colis ne marche pas", "suivi de ma commande ne marche pas", "suivi du colis ne marche pas", "suivi de la commande ne marche pas", "suivi colis ne fonctionne pas", "suivi commande ne fonctionne pas", "lien de suivi ne marche pas", "aucun colis", "colis non disponible", "colis pas disponible", "pas de lien", "lien pour suivre", "lien fonctionnel", "lien ne fonctionne pas", "suivi ne fonctionne pas", "suivi ne marche pas", "colis bloque", "colis coince", "colis en retard"],
});

r.fait("colis-introuvable", "procedure", `
  Un colis annoncé comme livré que vous ne trouvez pas :
  1. Vérifiez auprès de vos voisins, du gardien ou à l'endroit de dépôt indiqué par le transporteur.
  2. S'il s'agit d'un point relais, retournez-y avec votre numéro de suivi et demandez une vérification sur place.
  3. Sans résultat, contactez le service client **sans attendre** au **${TELEPHONE}** ou à **${EMAIL}** avec votre numéro de commande et, si vous l'avez, le numéro de suivi : l'équipe pourra interroger le transporteur.

  Si le lien de suivi ne fonctionne pas, le service client peut aussi vous communiquer l'état de l'envoi.`, { liens: [PAGES.contact] });

r.concept("modifier-commande", "Modifier ou annuler une commande", ["modifier ma commande", "annuler ma commande", "annulation", "annuler", "changer ma commande", "erreur de commande", "trompe commande", "trompe dans ma commande", "changer d adresse", "ajouter un article a ma commande", "oubli"], {
  famille: "commande",
  formules: ["ajouter a ma commande", "ajouter a la commande", "ajouter un produit", "ajouter un article", "annuler et refaire", "annuler la commande et refaire", "refaire la commande", "refaire ma commande", "commander en plus", "commande en plus", "completer ma commande", "completer la commande", "complement de commande"],
});

r.fait("modifier-commande", "procedure", `
  Pour modifier ou annuler une commande, contactez le service client **le plus tôt possible** au **${TELEPHONE}** ou à **${EMAIL}**, avec votre numéro de commande. Si le colis n'est pas encore parti, l'équipe pourra plus facilement faire le changement.`, { liens: [PAGES.contact] });

r.concept("regrouper-commandes", "Regrouper deux commandes en un seul envoi", ["regrouper les commandes", "grouper les commandes", "fusionner les commandes", "regrouper les colis", "envoi groupe", "un seul envoi", "un seul colis"], {
  famille: "commande",
  voirAussi: ["suivi-commande", "modifier-commande", "livraison"],
  formules: ["un seul et meme envoi", "un seul et meme colis", "le meme envoi", "le meme colis", "commandes ensemble", "expedier ensemble", "expedies ensemble", "envoyer ensemble", "envoyes ensemble", "1 envoi au lieu de 2", "un envoi au lieu de deux", "un seul envoi au lieu de deux", "deux envois", "2 envois", "deux colis", "2 colis", "deux fois les frais", "deux fois les frais de port"],
});

r.fait("regrouper-commandes", "procedure", `
  Le regroupement de deux commandes en un seul envoi se fait par le service client : contactez-le **au plus vite** au **${TELEPHONE}** ou à **${EMAIL}**, en indiquant **les deux numéros de commande**. Tant que la première n'est pas encore expédiée, l'équipe peut voir s'il est possible de réunir les articles dans un même colis ; une commande déjà partie ne peut plus être regroupée.`, { liens: [PAGES.contact] });

r.fait(["modifier-commande", "regrouper-commandes"], "procedure", `
  Vous avez oublié un article ? **Avant d'annuler et de repasser commande**, contactez le service client au **${TELEPHONE}** ou à **${EMAIL}** avec votre numéro de commande. Tant que le colis n'est pas parti, l'équipe regardera s'il est possible d'ajouter l'article à la commande en cours ou de réunir les deux commandes dans **un seul envoi**.`, { liens: [PAGES.contact] });

// Défini après le regroupement : à formules égales, le concept défini en premier ouvre la réponse,
// et « ma commande n'est toujours pas expédiée, puis-je tout regrouper ? » parle d'abord de regroupement.
r.concept("commande-en-attente", "Commande en attente de préparation ou d'expédition", ["delai de preparation", "delai d expedition"], {
  famille: "suivi-commande",
  voirAussi: ["suivi-commande", "livraison"],
  formules: ["en preparation", "preparation de ma commande", "preparation de la commande", "preparer ma commande", "preparer la commande", "prepare ma commande", "prepare la commande", "en attente de preparation", "toujours en attente", "en cours de preparation", "pas encore expedie", "pas encore expediee", "pas ete expedie", "pas ete expediee", "toujours pas expedie", "toujours pas expediee", "quand sera t elle expediee", "quand sera t il expedie",
    // « quand ma commande sera envoyée ? » : la date de départ d'une commande précise.
    // « Pourquoi ma commande ne bouge pas ? » : le statut reste le même.
    "commande ne bouge pas", "commande ne bouge plus", "commande n avance pas", "commande n avance plus", "commande stagne", "commande est toujours au meme statut", "toujours le meme statut", "statut ne change pas", "statut ne bouge pas", "statut n evolue pas", "commande ne change pas de statut", "commande reste bloquee", "commande est restee bloquee",
    "quand ma commande sera envoyee", "quand ma commande sera expediee", "quand ma commande sera t elle expediee", "quand ma commande est elle expediee", "quand ma commande va t elle partir", "quand sera envoyee ma commande", "quand sera expediee ma commande", "quand ma commande part", "quand ma commande partira", "quand mon colis part", "quand mon colis partira", "quand sera envoye mon colis", "quand va partir ma commande", "quand sera t elle envoyee", "quand ma commande sera t elle envoyee"],
});

const COMMANDE_EN_ATTENTE = `
  Je n'ai pas accès aux commandes : je ne peux donc pas vous donner la date d'expédition ou de livraison d'une commande précise. La livraison prend en général **2 à 5 jours ouvrés** (davantage en période de forte activité). Si la vôtre reste « en attente de préparation » plus longtemps que prévu, contactez le service client au **${TELEPHONE}** ou à **${EMAIL}** avec votre numéro de commande : l'équipe vous dira où elle en est et quand elle partira.`;

// Le même énoncé pour les deux aspects : il ne s'affiche qu'une fois.
r.fait("commande-en-attente", "moment", COMMANDE_EN_ATTENTE, { liens: [PAGES.contact] });
r.fait("commande-en-attente", "duree", COMMANDE_EN_ATTENTE, { liens: [PAGES.contact] });

// ─── Livraison ─────────────────────────────────────────────────────────────

r.concept("livraison", "Livraison", ["livraison", "delivraison", "livrer", "livre", "expedition", "expedier", "envoi", "envoyer", "frais de port", "frais de livraison", "frais d envoi", "transporteur", "transporteurs", "colis", "dpd", "colissimo", "geodis", "livraison gratuite", "livraison offerte", "franco de port", "port offert", "port gratuit"], {
  famille: "boutique-en-ligne",
  voirAussi: ["suivi-commande", "paiement"],
  // « De combien sont les frais ? » : dans une boutique en ligne, ce sont les frais de port.
  formules: ["en commandant aujourd hui", "si je commande aujourd hui", "si je commande maintenant", "si je commande ce soir", "en commandant maintenant", "en commandant ce soir", "je recois ma commande quand", "je recevrai ma commande quand", "combien de temps pour recevoir", "combien de temps pour etre livre", "combien de temps pour etre livree", "sous combien de temps", "dans combien de temps je recois", "dans combien de temps je serai livre", "delai pour recevoir", "delai de reception", "delai d acheminement", "sont les frais", "combien en payant", "et en payant", "combien si je paie", "combien si je paye", "quel est le montant des frais", "les frais supplementaires", "frais en plus", "frais en sus",
    // « Combien me coûte le transport avant de passer commande ? » : les frais de port, pas le prix d'un produit.
    "combien me coute le transport", "combien coute le transport", "combien me coute la livraison", "combien coute la livraison", "combien me coute l envoi", "combien coute l envoi", "combien me coute l expedition", "combien coute l expedition", "cout du transport", "cout de la livraison", "cout de l envoi", "cout de l expedition", "prix du transport", "prix de la livraison", "prix de l envoi", "prix de l expedition", "tarif du transport", "tarif de livraison", "tarif d envoi", "tarif d expedition", "montant du transport", "montant de la livraison", "montant de l envoi", "ce que coute la livraison", "ce que coute le transport"],
});

r.fait("livraison", "prix", `
  La livraison est **offerte** en France continentale à partir de :
  - **${LIVRAISON_OFFERTE.dpd}** d'achat avec DPD et **${LIVRAISON_OFFERTE.colissimo}** avec Colissimo, pour les articles qui ne sont ni lourds ni volumineux ;
  - **${LIVRAISON_OFFERTE.geodis}** d'achat avec Geodis, pour tous les produits, à l'exception des pressoirs, qui sont exclus de la livraison offerte.

  En dessous de ces montants, les frais de port sont calculés dans votre panier selon le transporteur choisi.`);

r.fait("livraison", "definition", `
  Duhallé expédie ses commandes avec **DPD**, **Colissimo** et **Geodis** (pour les colis lourds ou volumineux). Vous choisissez le transporteur au moment de valider votre panier, et la livraison est offerte au-delà d'un certain montant d'achat : de **${LIVRAISON_OFFERTE.dpd}** à **${LIVRAISON_OFFERTE.geodis}** selon le transporteur et les produits.`);

r.fait("livraison", "condition", `
  Pour la Corse, les DOM-TOM, la Belgique, la Suisse ou un autre pays, les frais et la possibilité de livrer dépendent du poids du colis et de la destination : contactez le service client au **${TELEPHONE}** ou à **${EMAIL}**. La livraison offerte, elle, est valable en **France continentale**.`);

// Délai donné par l'équipe Duhallé le 12/10/2026.
const DELAI_DE_LIVRAISON = `
  La livraison prend en général **2 à 5 jours ouvrés**. En période de forte activité, les délais peuvent être **allongés**. Pour une commande urgente ou pour savoir où en est un envoi, contactez le service client au **${TELEPHONE}**.`;

r.fait("livraison", "duree", DELAI_DE_LIVRAISON);

// « Les pressoirs sont-ils livrés gratuitement ? » cite le pressoir ET la livraison : ce fait croisé passe devant les faits du pressoir.
// Les pressoirs sont exclus de la livraison offerte (équipe Duhallé, 12/10/2026).
const PRESSOIRS_ET_LIVRAISON_OFFERTE = `
  Les **pressoirs** sont **exclus de la livraison offerte**, quel que soit le montant de votre panier : leurs frais de port sont calculés dans votre panier selon le transporteur choisi. Pour connaître le coût pour votre adresse, ajoutez le pressoir à votre panier, ou contactez le service client au **${TELEPHONE}** ou à **${EMAIL}**.`;

for (const aspect of ["prix", "condition", "definition", "raison"] as const) {
  r.fait(["pressoir", "livraison"], aspect, PRESSOIRS_ET_LIVRAISON_OFFERTE, { liens: [PAGES.contact] });
}

// Défini après la livraison : « le transport gratuit n'apparaît pas » parle des modes proposés, pas des délais.
// Des formules et non des alias : les mots courants (« pas de livraison gratuite ») disparaissent des alias,
// qui deviendraient « livraison gratuite » tout court.
r.concept("livraison-offerte-absente", "Livraison offerte non proposée", ["option payante", "options payantes"], {
  famille: "livraison",
  formules: ["transport gratuit", "cocher option payante", "cocher l option payante", "oblige de cocher", "seule option payante", "uniquement des options payantes", "livraison gratuite n apparait pas", "livraison offerte n apparait pas", "port offert n apparait pas", "pas de livraison gratuite", "pas de livraison offerte", "pas de port offert", "je paie la livraison", "je dois payer la livraison", "pourquoi payer la livraison", "pourquoi je paie la livraison", "pourquoi je paye la livraison", "je ne vois pas la livraison gratuite", "je ne vois pas la livraison offerte", "pk je dois payer", "pourquoi je dois payer les frais", "pourquoi je dois payer la livraison", "pourquoi des frais de livraison", "pourquoi les frais de livraison", "je dois payer les frais de livraison", "me fait payer la livraison", "fait payer la livraison", "on me fait payer la livraison", "payer la livraison alors", "livraison payante alors", "ne propose pas la livraison gratuite", "ne propose pas la livraison offerte"],
});

const LIVRAISON_OFFERTE_ABSENTE = `
  La livraison offerte apparaît parmi les modes de livraison quand votre panier atteint le montant du transporteur (**${LIVRAISON_OFFERTE.dpd}** avec DPD et **${LIVRAISON_OFFERTE.colissimo}** avec Colissimo, hors articles lourds et volumineux ; **${LIVRAISON_OFFERTE.geodis}** avec Geodis, pour tous les produits sauf les pressoirs) pour une adresse en France continentale. Si seule une option payante est proposée, vérifiez le **montant de votre panier** (sans les frais de port), le **transporteur** et l'**adresse** de livraison : les articles lourds ou volumineux relèvent du seuil Geodis, et les pressoirs sont exclus de la livraison offerte. Si tout est en règle et que l'option offerte n'apparaît pas, contactez le service client au **${TELEPHONE}** ou à **${EMAIL}** avec une capture de votre panier.`;

for (const aspect of ["condition", "raison", "prix", "procedure"] as const) {
  r.fait("livraison-offerte-absente", aspect, LIVRAISON_OFFERTE_ABSENTE, { liens: [PAGES.contact] });
}

r.concept("transporteur-propose", "Choix du transporteur", ["choix du transporteur", "changer de transporteur", "autre transporteur", "autres transporteurs", "proposition de transport", "mode de transport"], {
  famille: "livraison",
  formules: ["choisir le transporteur", "choisir mon transporteur", "autre que geodis", "autre que dpd", "autre que colissimo", "pas eu la proposition", "ne permet pas le choix de la livraison", "pas le choix de la livraison", "pas de choix de livraison", "pas de choix du mode de livraison", "choix de la livraison", "choisir la livraison", "choisir le mode de livraison", "pas propose dpd", "pas propose colissimo", "uniquement geodis", "seulement geodis", "que geodis"],
});

const TRANSPORTEUR_PROPOSE = `
  Les transporteurs proposés dépendent du **contenu de votre panier** (poids, dimensions) et de l'**adresse** de livraison : **Geodis** prend en charge les colis lourds ou volumineux, **DPD** et **Colissimo** les autres. Les modes disponibles s'affichent, avec leurs frais, au moment de valider votre panier. Pour demander un transporteur particulier, contactez le service client **avant de commander** au **${TELEPHONE}** ou à **${EMAIL}**.`;

// Pas d'aspect « choix » : pour « quel transporteur utilisez-vous ? », le moteur descend aux concepts membres et ce fait capterait la réponse.
for (const aspect of ["raison", "condition", "procedure"] as const) {
  r.fait("transporteur-propose", aspect, TRANSPORTEUR_PROPOSE, { liens: [PAGES.contact] });
}

r.concept("zone-livraison", "Livraison hors France continentale", ["corse", "dom tom", "dom", "tom", "outre mer", "martinique", "guadeloupe", "reunion", "guyane", "etranger", "international", "luxembourg", "europe", "espagne", "allemagne", "italie", "angleterre"], {
  famille: "livraison",
  voirAussi: ["livraison-belgique", "livraison-suisse"],
});

// Belgique et Suisse ont chacune leur réponse (équipe Duhallé, 12/10/2026) : la Belgique dépend des produits du panier,
// la Suisse ajoute des frais de douane. Les deux renvoient vers le service client.
r.concept("livraison-belgique", "Livraison en Belgique", ["belgique", "bruxelles", "anvers", "namur", "charleroi"], {
  famille: "livraison",
  voirAussi: ["livraison-suisse", "livraison"],
});

const LIVRAISON_EN_BELGIQUE = `
  La livraison en **Belgique** dépend des **produits** de votre panier : selon leur poids et leurs dimensions, elle est proposée ou non, et ses frais varient. Les modes de livraison disponibles pour votre adresse s'affichent au moment de valider votre panier. Si aucune livraison n'est proposée pour votre adresse, contactez le **service client** au **${TELEPHONE}** ou à **${EMAIL}**, en indiquant les produits souhaités et votre adresse : l'équipe cherchera une solution.`;

for (const aspect of ["condition", "prix", "procedure", "duree"] as const) {
  r.fait("livraison-belgique", aspect, LIVRAISON_EN_BELGIQUE, { liens: [PAGES.contact] });
}

r.concept("livraison-suisse", "Livraison en Suisse", ["suisse", "suisses", "geneve", "lausanne", "zurich", "berne", "fribourg", "neuchatel", "lugano"], {
  famille: "livraison",
  voirAussi: ["livraison-belgique", "livraison"],
});

const LIVRAISON_EN_SUISSE = `
  Pour une livraison en **Suisse**, des **frais de douane** s'ajoutent, et la livraison dépend des **produits** de votre panier. Contactez donc **systématiquement le service client** avant de commander, au **${TELEPHONE}** ou à **${EMAIL}**, en indiquant les produits souhaités et votre adresse : l'équipe vous dira si la livraison est possible et à quelles conditions.`;

for (const aspect of ["condition", "prix", "procedure", "duree"] as const) {
  r.fait("livraison-suisse", aspect, LIVRAISON_EN_SUISSE, { liens: [PAGES.contact] });
}

r.fait("zone-livraison", "prix", `
  Pour la Corse, les DOM-TOM et l'étranger, les frais de port dépendent du **poids du colis** et de la destination, et la livraison offerte ne s'applique pas : contactez le service client au **${TELEPHONE}** ou à **${EMAIL}** pour obtenir un devis.`);

r.fait("zone-livraison", "condition", `
  Pour une livraison en Corse, dans les DOM-TOM ou à l'étranger, les frais dépendent du poids du colis et de la destination : contactez le service client au **${TELEPHONE}** ou à **${EMAIL}** pour un devis. Hors Union européenne (la Suisse par exemple), des **frais de douane** s'ajoutent.`);

r.concept("point-relais", "Livraison en point relais", ["point relais", "points relais", "relais colis", "mondial relay", "pickup", "livraison en relais", "retrait en relais"], {
  famille: "livraison",
  voirAussi: ["livraison", "colis-introuvable"],
});

// Pas d'aspect « gamme » ici : pour « quel transporteur ? », le moteur descend aux concepts membres et ce fait capterait la réponse.
for (const aspect of ["condition"] as const) {
  r.fait("point-relais", aspect, `
    Les modes de livraison proposés pour votre adresse, y compris la livraison en **point relais** lorsque le transporteur la propose, s'affichent au moment de valider votre panier, avec leurs frais. Pour une demande particulière, contactez le service client au **${TELEPHONE}** ou à **${EMAIL}** avant de commander.`);
}

r.concept("options-livraison", "Livraison express ou à jour précis", ["livraison express", "livraison rapide", "livraison urgente", "colis express", "livraison le lendemain", "livraison lendemain", "livraison en 24h", "livraison 24h", "livraison 48h"], {
  famille: "livraison",
  voirAussi: ["livraison", "suivi-commande"],
  formules: ["livraison le samedi", "livraison samedi", "livre le samedi", "livre samedi", "livrez vous le samedi", "livrer le samedi", "livrer samedi", "expedition le samedi", "recevoir le samedi", "livraison avant le", "livre avant le", "livraison pour le", "livraison pour noel", "avant noel"],
});

for (const aspect of ["condition", "duree", "moment"] as const) {
  r.fait("options-livraison", aspect, `
    La livraison prend en général **2 à 5 jours ouvrés**, davantage en période de forte activité. Les options de livraison (livraison rapide ou express, jour de livraison) dépendent du **transporteur** et s'affichent au moment de valider votre panier. Pour une commande **urgente** ou une livraison à une date précise, contactez le service client **avant de commander** au **${TELEPHONE}** ou à **${EMAIL}**.`, { liens: [PAGES.contact] });
}

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

r.concept("paiement-refuse", "Paiement refusé ou impossible", ["paiement refuse", "paiement echoue", "paiement impossible", "carte refusee", "carte bancaire refusee", "erreur de paiement", "probleme de paiement", "paiement bloque"], {
  exclusif: true,
  famille: "paiement",
  voirAussi: ["paiement", "paiement-4x"],
  // « Valider un paiement » : l'étape que le client ne franchit pas, le plus souvent l'authentification de sa banque.
  formules: ["paiement ne passe pas", "paiement ne fonctionne pas", "paiement a ete refuse", "carte ne passe pas", "carte n est pas acceptee", "ma carte est refusee", "impossible de payer", "je n arrive pas a payer", "n arrive pas a payer",
    "valider un paiement", "valider mon paiement", "valider le paiement", "valider ce paiement", "n arrive pas a valider", "impossible de valider", "ne peux pas valider", "ne parviens pas a valider", "bouton valider ne fonctionne pas", "bouton valider ne marche pas", "bouton payer ne fonctionne pas", "bouton payer ne marche pas",
    // « Quand je clique sur payer par CB, rien ne se passe » : le bouton ne répond pas. Les expressions
    // portent sur le clic de paiement, jamais sur « rien ne se passe » seul (qui dit autre chose ailleurs).
    "clique sur payer", "cliquer sur payer", "clique sur carte bancaire", "cliquer sur carte bancaire", "clique sur paypal", "cliquer sur paypal", "clique sur valider", "cliquer sur valider", "clique sur cb", "cliquer sur cb", "payer par cb rien", "payer par carte rien", "paiement rien ne se passe", "rien ne se passe au paiement", "rien ne se passe quand je paie", "rien ne se passe quand je paye", "ne se passe rien au paiement",
    "impossible de finaliser", "n arrive pas a finaliser", "ne peux pas finaliser", "commande ne passe pas", "n arrive pas a commander", "impossible de commander", "ne peux pas commander", "ne parviens pas a commander", "probleme pour commander", "erreur au paiement", "erreur lors du paiement", "vous bloquez", "ca bloque", "le site bloque", "site bloque", "bloque a la commande", "bloque lors de la commande", "bloque au paiement", "impossible de choisir", "impossible de selectionner", "ne peux pas choisir", "n arrive pas a choisir"],
});

for (const aspect of ["procedure", "condition", "erreur"] as const) {
  r.fait("paiement-refuse", aspect, `
    Si votre paiement est refusé ou ne se valide pas : vérifiez les informations de la carte, son **plafond** et l'**authentification** demandée par votre banque (code reçu par SMS ou validation dans son application) : le paiement n'est validé qu'une fois cette étape terminée. Essayez une autre carte ou un autre moyen de paiement parmi ceux proposés : **carte bancaire**, **PayPal**, **virement** ou **paiement en 4 fois sans frais**. Si le bouton de paiement ne répond pas, rechargez la page, désactivez un éventuel bloqueur de fenêtres, ou essayez un autre navigateur.

    Si c'est la **validation du panier** qui bloque avant le paiement, vérifiez que les champs obligatoires sont remplis (adresse de livraison, téléphone) et qu'un mode de livraison est choisi, puis essayez un autre navigateur. Si le problème persiste, contactez le service client au **${TELEPHONE}** ou à **${EMAIL}** en indiquant le message affiché (une capture d'écran aide) et votre numéro de commande si elle a été enregistrée : l'équipe vous aidera à finaliser votre commande.`, { liens: [PAGES.contact] });
}

// ─── Retours, produits abîmés ──────────────────────────────────────────────

r.concept("retour", "Retour et rétractation", ["retour", "retourner", "renvoyer", "rembourser", "remboursement", "retractation", "droit de retractation", "formulaire de retractation", "echanger", "echange", "satisfait ou rembourse", "changer d avis", "ne me convient pas"], {
  famille: "boutique-en-ligne",
  // « Qui paie les frais de retour ? » : « paie » ne doit pas faire croire à une question sur le paiement.
  formules: ["frais de retour", "frais du retour", "frais de renvoi", "frais pour renvoyer", "frais pour retourner", "payer le retour", "paie le retour", "paye le retour", "payer les frais de retour", "paie les frais de retour", "paye les frais de retour", "retour a ma charge", "retour a la charge", "retour gratuit", "retour payant", "renvoi gratuit", "renvoi payant"],
});

r.fait("retour", "procedure", `
  Vous disposez du **droit de rétractation** prévu par la loi : **14 jours** à compter de la réception de votre commande pour nous faire part de votre décision, grâce au formulaire de rétractation disponible en bas de page du site, ou en contactant le service client au **${TELEPHONE}** ou à **${EMAIL}**.

  En cas de rétractation, les **frais de retour sont à la charge du client** (précision de l'équipe Duhallé, 26/10/2026). Les autres modalités (état des produits, remboursement) sont précisées dans les Conditions générales de vente. Si le produit est arrivé abîmé, incomplet ou non conforme, il ne s'agit pas d'une rétractation : contactez rapidement le service client.`);

r.concept("produit-abime", "Produit abîmé ou non conforme", ["abime", "arrive casse", "recu casse", "endommage", "defectueux", "defaut de fabrication", "en panne", "manquant", "piece manquante", "pas conforme", "non conforme", "mauvais produit", "erreur de produit", "garantie", "colis endommage", "colis arrive casse", "colis casse", "colis abime", "incomplet", "incomplete", "incompletes", "bouteille arrivee cassee", "bouteille cassee dans le colis"], {
  famille: "retour",
  formules: ["probleme a la livraison", "probleme de livraison", "probleme lors de la livraison", "probleme avec la livraison", "casse a la livraison", "casse lors de la livraison", "casse pendant la livraison", "casse pendant le transport", "casse au transport", "commande incomplete", "commande est incomplete", "colis incomplet", "colis est incomplet", "il manque", "manque un produit", "manque un article", "article manquant", "produit manquant", "arrivee brisee", "arrive brise", "bouteille arrivee brisee", "colis ouvert", "colis arrive ouvert", "colis arrive eventre", "colis eventre", "colis ecrase", "colis mouille", "colis humide", "est arrivee cassee", "est arrive casse", "est arrivee abimee", "est arrive abime", "arrive abime", "arrivee abimee", "recu abime", "recue abimee", "arrive endommage", "arrivee endommagee"],
});

const SIGNALER_UN_PRODUIT_ABIME = `
  Un produit est arrivé abîmé, incomplet, ou ne correspond pas à votre commande ? Contactez le service client **rapidement** au **${TELEPHONE}** ou à **${EMAIL}**, avec votre numéro de commande et des **photos** du produit et de son emballage. L'équipe vous proposera une solution.

  Si le colis est abîmé à la livraison, ou si vous entendez du verre brisé, indiquez vos **réserves** par écrit sur le bon du livreur (ou dans l'application du transporteur) et photographiez le colis avant de l'ouvrir : cela facilite le recours auprès du transporteur.`;

r.fait("produit-abime", "procedure", SIGNALER_UN_PRODUIT_ABIME, { liens: [PAGES.contact] });
// « Ma commande est arrivée incomplète » cite aussi la commande : ce fait croisé passe devant les étapes pour commander.
r.fait(["produit-abime", "commande"], "procedure", SIGNALER_UN_PRODUIT_ABIME, { liens: [PAGES.contact] });

// ─── Compte, facture, disponibilité ────────────────────────────────────────

r.concept("compte-client", "Mon compte client", ["compte client", "espace client", "mot de passe", "identifiant", "connexion", "se connecter", "inscription", "creer un compte", "s inscrire", "desinscription", "newsletter", "donnees personnelles", "rgpd", "supprimer mon compte"], {
  famille: "boutique-en-ligne",
  formules: ["mon compte", "votre compte", "un compte"],
});

r.fait("compte-client", "condition", `
  Je n'ai pas accès aux comptes clients. Pour vous connecter, créer un compte ou changer votre mot de passe, utilisez l'espace « Mon compte » de la boutique. Si la création du compte ne fonctionne pas, notez le message d'erreur affiché et contactez le service client à **${EMAIL}** : vous pouvez aussi passer commande sans créer de compte. Pour toute autre demande (données personnelles, newsletter), écrivez à la même adresse.`);

const OBTENIR_UNE_FACTURE = `
  Pour obtenir une facture, connectez-vous à votre compte client sur la boutique, ou demandez-la au service client à **${EMAIL}** (ou au **${TELEPHONE}**) en indiquant votre **numéro de commande**. Si elle n'a pas été éditée, par exemple pour une commande plus ancienne, le service client peut la créer et vous l'envoyer. Pour une facture au nom d'une **entreprise ou d'une association**, précisez sa raison sociale, son adresse et, le cas échéant, son numéro de TVA.`;

r.fait("facture", "procedure", OBTENIR_UNE_FACTURE, { liens: [PAGES.contact] });
r.fait(["facture", "commande"], "procedure", OBTENIR_UNE_FACTURE, { liens: [PAGES.contact] });

r.concept("disponibilite", "Disponibilité des produits", ["disponible", "disponibles", "disponibilite", "rupture", "rupture de stock", "epuise", "reapprovisionnement", "retour en stock", "bientot disponible", "indisponible", "approvisionnement", "approvisionne", "reapprovisionne", "reassort"], {
  famille: "catalogue",
  // Les mèches, l'hygromètre, un bouchon : le produit dit DE QUOI on parle, la disponibilité dit CE QU'ON DEMANDE.
  exclusif: true,
  // « stock » est une formule et non un alias : « stocker », « stockage » ont la même racine et parlaient de cave.
  formules: ["stock", "stocks", "de nouveau disponible", "a nouveau disponible", "de retour en stock", "sera t il disponible", "sera t elle disponible", "seront ils disponibles", "seront elles disponibles",
    "de nouveau commercialise", "de nouveau commercialisee", "de nouveau commercialises", "de nouveau commercialisees", "de nouveau en vente", "de nouveau en stock", "de nouveau propose", "de nouveau proposee", "remis en vente", "remise en vente", "remis en stock", "remise en stock", "reviendra en stock", "reviendront en stock", "revient en stock", "reviendra t il", "reviendra t elle",
    "quand aurez vous", "quand avez vous de nouveau", "quand allez vous avoir", "quand allez vous recevoir", "quand recevrez vous", "quand serez vous reapprovisionne", "quand serez vous approvisionne", "n est plus disponible", "n est plus en stock", "plus en stock", "plus disponible", "en rupture"],
});

r.fait("disponibilite", "condition", `
  La disponibilité de chaque article est indiquée sur sa fiche produit. Si un produit est épuisé, le service client peut vous dire quand il sera de retour en stock : **${TELEPHONE}** ou **${EMAIL}**.`);

// Pas d'alias « poids » seul : « le même poids de sucre que de fruits » parle
// d'une recette, pas d'un article.
r.concept("poids-produit", "Poids des articles", ["poids du produit", "poids de l article", "poids du colis"], {
  famille: "catalogue",
  lien: PAGES.contact,
  voirAussi: ["livraison", "zone-livraison"],
  formules: ["le poids", "quel poids", "son poids", "leur poids", "poids du", "poids d un", "poids d une", "poids de l", "poids de la", "poids de mon", "poids de ma", "poids des", "combien pese", "combien ca pese", "ca pese combien", "il pese combien", "elle pese combien", "pese t il", "pese t elle", "pas tres lourd", "pas trop lourd", "tres lourd", "assez lourd", "trop lourd", "c est lourd", "est ce lourd", "est il lourd", "est elle lourd", "est elle lourde", "est ce que c est lourd"],
});

r.fait("poids-produit", "dimension", `
  Le **poids** de chaque article est indiqué sur sa fiche produit, juste à côté du prix. Pour un article dont la fiche ne l'indique pas, ou pour le poids d'un colis complet, le service client vous renseigne au **${TELEPHONE}** ou à **${EMAIL}**.`);
