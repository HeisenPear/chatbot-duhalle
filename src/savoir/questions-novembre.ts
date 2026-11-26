// La tournée du 12 novembre : questions réelles des clients (base D1, 26 octobre au 12 novembre)
// dont la réponse était à côté ou muette. Quand la base ne connaît pas la cote ou la règle demandée,
// la réponse le dit et renvoie vers la fiche ou le service client plutôt que de répondre à côté.
import { EMAIL, TELEPHONE } from "./coordonnees";
import { PAGES } from "./liens";
import { rubrique, SAVOIR_FAIRE } from "./outils";

const r = rubrique(PAGES.contact.url);
export const questionsNovembre = r;

const TOUS_LES_ASPECTS = ["definition", "usage", "gamme", "choix", "dimension", "condition", "raison", "procedure", "prix", "lieu"] as const;
const CONTACT = `au **${TELEPHONE}** ou à **${EMAIL}**`;
// Flux produits de la boutique (Google Shopping) : la source des cotes et des gammes relevées le 25/11/2026.
const FLUX_PRODUITS = "https://www.duhalle-boutique.fr/Data/GoogleShopping/fr/Oxatis-fr-duhalle-40947.xml";

// « Information sur la soude » : « soude » était pris pour le soudage du carbure de calcium.
r.concept("soude", "Soude caustique en droguerie", ["hydroxyde de sodium"], {
  famille: "catalogue",
  exclusif: true,
  // « soude » et « soudage » ont la même racine : la soude n'est reconnue que mot pour mot.
  formules: ["soude", "la soude", "de la soude", "soude caustique", "soude en paillettes", "soude en perles", "cristaux de soude"],
});
for (const aspect of TOUS_LES_ASPECTS) {
  r.fait("soude", aspect, `
    Oui, Duhallé vend de la **soude caustique**, dans la rubrique **Droguerie**. Je n'ai pas sa fiche détaillée dans ma base (conditionnement, pureté, usages précis, prix) : regardez la fiche du produit sur la boutique, ou demandez au service client ${CONTACT}.

    C'est un produit **corrosif** : portez des **gants et des lunettes**, versez toujours la soude **dans l'eau** (jamais l'inverse), évitez l'**aluminium**, et gardez-la fermée, au sec, **hors de portée des enfants**. Pour la fiche de sécurité du produit, demandez-la au service client.`, { liens: [PAGES.droguerie, PAGES.contact], ...(aspect === "condition" || aspect === "usage" ? { avertissement: true } : {}) });
}

// « Besoin de la fiche de sécurité sur l'huile de paraffine » : ce n'est pas une question de paiement.
r.concept("fiche-securite", "Fiche de sécurité ou fiche technique", ["fiche de securite", "fiches de securite", "fiche securite", "fiche de securiter", "fiche securiter", "securiter", "fds", "fiche technique", "fiches techniques", "fiche de donnees de securite", "notice de securite", "certificat"], {
  famille: "catalogue",
  exclusif: true,
});
for (const aspect of TOUS_LES_ASPECTS) {
  r.fait("fiche-securite", aspect, `
    Je n'ai pas de **fiche de sécurité** ni de fiche technique à vous transmettre : elles ne font pas partie de ma base. Pour en obtenir une (huile de paraffine, huile de cade, carbure de calcium, produits d'entretien…), demandez-la au service client ${CONTACT} en précisant le **produit** concerné.`, { liens: [PAGES.contact] });
}
r.fait(["fiche-securite", "huile-paraffine"], "procedure", `
  Je n'ai pas la **fiche de sécurité** de l'**huile de paraffine** : demandez-la au service client ${CONTACT}, en précisant la contenance (1 L ou 5 L) et, si possible, votre numéro de commande. La fiche du produit sur la boutique décrit ses usages (huile minérale de qualité pharmaceutique et « Codex » alimentaire).`, { liens: [PAGES.huileParaffine, PAGES.contact] });
for (const aspect of ["definition", "usage", "gamme", "choix", "dimension", "condition", "raison", "prix", "lieu"] as const) {
  r.fait(["fiche-securite", "huile-paraffine"], aspect, `
    Je n'ai pas la **fiche de sécurité** de l'**huile de paraffine** : demandez-la au service client ${CONTACT}, en précisant la contenance (1 L ou 5 L) et, si possible, votre numéro de commande. La fiche du produit sur la boutique décrit ses usages (huile minérale de qualité pharmaceutique et « Codex » alimentaire).`, { liens: [PAGES.huileParaffine, PAGES.contact] });
}

// « Inscription newsletter » : ce n'est pas une question de compte client.
// « lettre d'information » est une formule : « information » est un mot courant, l'alias se réduisait à « lettre »
// et « j'ai respecté le protocole à la lettre » parlait de newsletter (tournée du 25 novembre).
r.concept("newsletter", "Newsletter", ["infolettre"], {
  famille: "boutique-en-ligne",
  exclusif: true,
  formules: ["lettre d information", "lettres d information", "newsletter", "newsletters", "newletter", "la newsletter", "inscription newsletter", "inscription newletter"],
});
for (const aspect of TOUS_LES_ASPECTS) {
  r.fait("newsletter", aspect, `
    Je n'ai pas la marche à suivre pour **s'inscrire à la newsletter** (ni pour s'en désinscrire). Regardez en bas de page de la boutique ou dans votre compte client ; sinon, écrivez au service client ${CONTACT} : l'équipe vous inscrira ou vous désinscrira.`, { liens: [PAGES.contact] });
}

// « Quelle taille font les étiquettes personnalisées ? » répondait par la température de mise en bouteille.
r.fait("etiquettes", "dimension", `
  Les **étiquettes adhésives** à personnaliser (lot de 20) mesurent **100 x 75 mm**. Je n'ai pas trouvé d'autre format dans la base, notamment pas de 120 x 70 mm : pour un format précis, ou une étiquette soluble, regardez la fiche du produit ou demandez au service client ${CONTACT}.`, { source: PAGES.etiquettesAdhesives.url, liens: [PAGES.etiquettesAdhesives, PAGES.contact] });

// « Dimension de la dame-jeanne de 25 L » : seul le col est connu.
r.fait("contenant", "dimension", `
  Pour les **dames-jeannes**, je ne connais que le **col** : environ **3,9 cm** pour les modèles de 15, 20 et 25 L à col fin, 3,5 cm pour la 10 L, 2,8 cm pour la 5 L, 11,7 cm pour les cols larges, et un col à vis de 22 mm pour la 2 L. La **hauteur** et le **diamètre du corps** ne sont pas indiqués dans ma base : regardez la fiche du modèle ou demandez au service client ${CONTACT}. Pour les **fûts** de macération bleus de 60 L, la base donne 62 cm de haut sur 36 cm de diamètre.`, { source: PAGES.futs.url, liens: [PAGES.futs, PAGES.contact] });

// « Y a-t-il un thermostat au fumoir ? » : seule la puissance est connue.
r.fait("fumoir", "condition", `
  Pour le **fumoir électrique** de 1200 W, la fiche indique seulement sa **puissance**. Je n'ai pas trouvé d'information sur un **thermostat**, un réglage de la température, ses dimensions ou ce qu'il peut contenir (par exemple un jambon entier) : regardez la fiche du produit ou demandez au service client ${CONTACT}.`, { source: PAGES.fumoir.url, liens: [PAGES.fumoir, PAGES.contact] });

// « Contenance du pot à olives en grès émaillé » : posée plusieurs fois, la contenance n'est pas connue.
r.concept("pot-olives", "Pot à olives en grès émaillé", ["pot a olives", "pots a olives", "pot a olive", "pot olives", "pot d olives"], {
  famille: "vinaigrier",
  exclusif: true,
});
for (const aspect of TOUS_LES_ASPECTS) {
  r.fait("pot-olives", aspect, `
    Le **pot à olives en grès émaillé** est vendu avec sa **cuillère** et son **couvercle en bois**. Sa **contenance** (et ses autres cotes) ne figure pas dans ma base : regardez la fiche du produit ou demandez-la au service client ${CONTACT}.`, { liens: [PAGES.vinaigriers, PAGES.contact] });
}

// « Longueur de la pince à bocaux » et « brosse de rechange » : cotes absentes de la base.
r.fait("ustensiles-conserve", "dimension", `
  La **longueur de la pince à bocaux** (et celle de la pince ouvre-bocal) n'est pas indiquée dans ma base. Seul l'**entonnoir à confiture** est coté (12 cm de diamètre). Regardez la fiche du produit ou demandez au service client ${CONTACT}.`, { source: PAGES.pinceBocaux.url, liens: [PAGES.pinceBocaux, PAGES.pinceOuvreBocal, PAGES.contact] });

r.fait("nettoyage-bouteilles", "dimension", `
  Pour le nettoyage, je connais les **goupillons** (standard de **47 cm**, grand modèle de **49 x 7 cm**, tige inox, poils nylon) et le rince-bouteille manuel pour goulots de **15 mm**. Le **diamètre de fixation d'une brosse de rechange**, le **pas de vis** (mâle ou femelle) et la hauteur d'une brosse ne sont pas indiqués dans ma base : regardez la fiche de l'article ou demandez au service client ${CONTACT}.`, { source: SAVOIR_FAIRE, liens: [PAGES.contact] });

// « Peut-on mettre un robinet en inox ? » et « quelles dimensions pour le robinet en bois 2 pouces ? »
r.concept("robinet-inox", "Robinet en inox ou en métal", ["robinet inox", "robinet en inox", "robinet metal", "robinet en metal", "robinet acier", "robinet en acier", "robinet laiton", "robinet en laiton", "robinet plastique pour vinaigrier"], {
  famille: "robinet-vinaigrier",
  exclusif: true,
});
for (const aspect of TOUS_LES_ASPECTS) {
  r.fait("robinet-inox", aspect, `
    Duhallé propose pour ses vinaigriers des **robinets en bois**, naturels : le bois gonfle et devient étanche, alors qu'un robinet en métal n'a pas cette souplesse, et l'acidité du vinaigre peut abîmer un métal non adapté. Je n'ai pas d'information sur un robinet en inox adapté à votre vinaigrier : demandez conseil au service client ${CONTACT}.`, { liens: [PAGES.vinaigriers, PAGES.contact] });
}
// « Quelles sont les dimensions du robinet en bois 2 pouces, embout Ø 8 mm ? »
r.concept("robinet-2-pouces", "Robinet en bois 2 pouces, embout Ø 8 mm", [], {
  famille: "robinet-vinaigrier",
  exclusif: true,
  formules: ["2 pouces", "deux pouces", "embout o8", "embout o 8", "embout 8 mm", "embout de 8 mm", "robinet 2 pouces"],
});
for (const aspect of TOUS_LES_ASPECTS) {
  r.fait("robinet-2-pouces", aspect, `
    Le **robinet en bois pour vinaigrier « 2 pouces, embout Ø 8 mm »** est l'un des deux modèles du catalogue ; l'autre mesure **3 pouces (8 cm)** et est en frêne du Jura. Je n'ai pas d'autre cote (longueur exacte, pas ou diamètre de l'ouverture à laquelle il convient) : mesurez le **diamètre du trou** de votre vinaigrier, qui n'est pas celui de l'embout du robinet, et demandez conseil au service client ${CONTACT} avec la mesure relevée avant de commander.`, { liens: [PAGES.vinaigriers, PAGES.contact] });
}

// « Sous combien de temps sont expédiées les commandes ? » : l'expédition n'est pas la livraison.
r.concept("delai-expedition", "Temps avant le départ du colis", [], {
  famille: "boutique-en-ligne",
  exclusif: true,
  formules: ["combien de temps pour expedier", "temps pour expedier ma commande", "sous combien de temps expediez", "sous combien de temps sont expedie", "sous combien de temps est expedie", "sous combien de temps vous expediez", "sous combien de temps ma commande est expediee", "sous combien de temps ma commande sera expediee", "en combien de temps expediez", "en combien de temps vous l expedier", "pas de la livraison mais de l expedition", "ne parle pas de la livraison"],
});
for (const aspect of ["definition", "duree", "moment", "condition", "procedure", "raison", "choix", "dimension"] as const) {
  r.fait("delai-expedition", aspect, `
    Je n'ai pas de **délai de préparation** précis (le temps entre la commande et le départ du colis) dans ma base. Ensuite, la **livraison** prend en général **2 à 5 jours ouvrés**, davantage en période de forte activité. Pour connaître le délai d'expédition de votre commande, ou si elle tarde à partir, contactez le service client ${CONTACT} avec votre numéro de commande.`, { liens: [PAGES.contact] });
}

// « On me dit que la livraison n'est pas possible pour mon adresse » : message du panier, à signaler.
r.concept("livraison-impossible", "Livraison impossible à une adresse", ["livraison impossible"], {
  famille: "boutique-en-ligne",
  exclusif: true,
  formules: ["livraison n est pas possible", "livraison est impossible", "livraison pas possible", "livraison impossible", "ne livrez pas", "ne livre pas", "pas de livraison possible", "pas livrable", "adresse non livrable", "adresse n est pas livrable", "livraison refusee a mon adresse"],
});
for (const aspect of ["definition", "condition", "procedure", "raison", "lieu", "duree", "choix"] as const) {
  r.fait("livraison-impossible", aspect, `
    Duhallé livre en **France continentale** avec **DPD**, **Colissimo** et **Geodis** ; la Corse, les DOM-TOM et l'étranger font l'objet de conditions particulières, et les produits lourds partent avec Geodis. Si le panier affiche que la livraison est **impossible pour votre adresse**, notez le **message exact** (une capture d'écran aide), vérifiez l'adresse et le code postal, et essayez un autre transporteur s'il est proposé. Si le blocage persiste, contactez le service client ${CONTACT} avec l'adresse concernée : l'équipe cherchera une solution.`, { liens: [PAGES.contact] });
}

// « Où apparaissent les 10 % de remise ? » et « Réduction avec une grosse commande ? »
r.concept("remise-commande", "Remise selon le montant de la commande", [], {
  famille: "promotions",
  exclusif: true,
  formules: ["10 de remise", "10 pour cent de remise", "remise de 10", "grosse commande", "gros achat", "remise sur le montant", "remise a partir de", "promesse 100", "reduction avec grosse commande", "remise sur commande", "remise quantite", "remise sur quantite", "remise pour quantite", "tarif degressif", "prix degressif"],
});
for (const aspect of TOUS_LES_ASPECTS) {
  r.fait("remise-commande", aspect, `
    Je n'ai pas le détail d'une **remise liée au montant de la commande** (par exemple « 10 % dès 100 € ») : elle doit apparaître dans le **récapitulatif du panier** ou se saisir avec un **code promo** au moment de valider. Si vous ne la voyez pas, ou pour une **grosse commande**, contactez le service client ${CONTACT} avec le contenu de votre panier : l'équipe vous répondra.`, { liens: [PAGES.contact] });
}

// « Capsules twist-off 48 mm » : pas de capsule twist-off au catalogue.
r.concept("twist-off", "Capsules twist-off", ["twist off", "twist-off", "twistoff", "capsule twist", "capsules twist"], {
  famille: "catalogue",
  exclusif: true,
});
for (const aspect of TOUS_LES_ASPECTS) {
  r.fait("twist-off", aspect, `
    Je n'ai pas trouvé de **capsules twist-off de 48 mm** dans la base. Duhallé propose des **capsules à vis de rechange de 70 mm** (lot de 2) pour ses bocaux, et des **capsules couronne** de **26 mm** et **29 mm** pour bouteilles. Pour un autre diamètre, demandez au service client ${CONTACT}.`, { liens: [PAGES.bocaux, PAGES.contact] });
}


// ─── La tournée du 16 novembre : questions du 12 au 16 novembre (base D1) ─────────────────────────────────────

// « Robinet 4 pouces » : le flux produits du 25/11/2026 contient un robinet de 4 pouces (11 cm) pour fût ou vinaigrier.
r.concept("robinet-4-pouces", "Robinet de 4 pouces et plus", [], {
  famille: "robinet-vinaigrier",
  exclusif: true,
  formules: ["4 pouces", "quatre pouces", "5 pouces", "cinq pouces", "6 pouces", "six pouces", "robinet 4 pouces", "robinet de 4 pouces"],
});
for (const aspect of TOUS_LES_ASPECTS) {
  r.fait("robinet-4-pouces", aspect, `
    Oui : Duhallé propose un **robinet en bois de 4 pouces (11 cm)** pour fût ou vinaigrier, en frêne français tourné dans le Jura, avec une clé conique en bois de charme et un joint en liège. Pour les vinaigriers, il existe aussi le robinet de **3 pouces (8 cm)** ; les robinets plus longs, de **5,5 à 10 pouces**, sont prévus pour les **fûts**. Avant de commander, mesurez le **diamètre du trou** de votre vinaigrier ou de votre fût, et demandez conseil au service client ${CONTACT} en cas de doute.`, { source: FLUX_PRODUITS, liens: [PAGES.vinaigriers, PAGES.contact] });
}

// « Vendez-vous des bouteilles champenoises ? » : la gamme connue ne cite que des bouteilles de vin de 75 cl.
r.fait("bouteille-champenoise", "gamme", `
  Dans la gamme que je connais, les bouteilles vides sont des **bouteilles de vin de 75 cl** (bordelaise verte, bordelaise transparente, bourgogne transparente), au goulot de 19 mm. Je n'ai pas de **bouteille champenoise** vide dans ma base : pour du cidre ou un vin pétillant, demandez au service client ${CONTACT} si un modèle convient.`, { source: PAGES.futs.url, liens: [PAGES.contact] });

// « Je cherche une dame-jeanne en verre opaque » : les dames-jeannes sont en verre transparent légèrement bleuté (précisé par l'équipe Duhallé le 16/11/2026).
r.concept("verre-opaque", "Verre opaque ou teinté", [], {
  famille: "contenant",
  exclusif: true,
  formules: ["verre opaque", "verre teinte", "verre fume", "verre colore", "verre noir", "verre fonce", "verre brun", "dame jeanne opaque", "dame jeanne teintee", "bonbonne opaque", "bonbonne teintee", "dame jeanne noire", "dame jeanne foncee"],
});
for (const aspect of TOUS_LES_ASPECTS) {
  r.fait("verre-opaque", aspect, `
    Les **dames-jeannes** Duhallé sont en **verre transparent légèrement bleuté**, avec un entourage plastique : elles ne sont pas opaques. Je n'ai pas de modèle en verre opaque ou plus foncé dans ma base. Pour protéger un contenu de la lumière, rangez-le à l'abri, ou demandez au service client ${CONTACT} si un autre modèle existe.`, { liens: [PAGES.futs, PAGES.contact] });
}

// « Quel bouchon pour une carafe de 3,5 de diamètre ? » : une carafe se ferme avec une bonde choisie sur le diamètre du col.
r.concept("bouchon-carafe", "Bouchon pour une carafe", [], {
  famille: "trou-bouchon",
  exclusif: true,
  formules: ["bouchon pour carafe", "bouchon pour une carafe", "bouchon pour la carafe", "bouchon de carafe", "bouchon de la carafe", "bouchon carafe", "bonde pour carafe", "bonde pour une carafe", "bonde de carafe", "bonde carafe", "col de la carafe", "col de carafe", "goulot de la carafe", "goulot de carafe", "fermer une carafe", "boucher une carafe"],
});
for (const aspect of ["definition", "usage", "choix", "dimension", "procedure", "condition", "gamme"] as const) {
  r.fait("bouchon-carafe", aspect, `
    Pour fermer une **carafe**, mesurez le **diamètre intérieur du col** au pied à coulisse : une **bonde conique en liège** convient si son petit diamètre est inférieur à celui du col et son grand diamètre supérieur. Par exemple, pour un col de **3,4 à 3,5 cm** (34 à 35 mm), la bonde **35/31 mm** convient aux cols de 31 à 35 mm et la **38/34 mm** à ceux de 34 à 38 mm ; entre deux tailles, ou en cas de doute, demandez conseil au service client ${CONTACT}.`, { source: PAGES.bondes.url, liens: [PAGES.bondes, PAGES.contact] });
}


// ─── La tournée du 25 novembre : questions du 16 au 25 novembre (base D1) ─────────────────────────────────────
// Les cotes et les gammes ajoutées viennent du flux produits de la boutique (FLUX_PRODUITS, export du 25/11/2026).

// « je viens de vous acheter 2 vinaigriers avec tabouret, j'aimerais un tabouret seul » répondait par les étapes de commande.
r.concept("tabouret-vinaigrier", "Tabouret de vinaigrier", ["tabouret de vinaigrier", "tabourets de vinaigrier", "tabouret pour vinaigrier", "tabourets pour vinaigrier", "tabouret en bois", "tabourets en bois"], {
  famille: "vinaigrier",
  exclusif: true,
  formules: ["tabouret seul", "un tabouret", "le tabouret", "des tabourets", "tabouret", "tabourets", "tabuoret"],
});
for (const aspect of TOUS_LES_ASPECTS) {
  r.fait("tabouret-vinaigrier", aspect, `
    Le **tabouret en bois** est livré **avec** les vinaigriers en grès qui le mentionnent (2,5 L, 3,5 L et 4 L) : il surélève le vinaigrier pour laisser passer un verre ou une bouteille sous le robinet. Je n'ai pas de **tabouret vendu seul** dans ma base : demandez au service client ${CONTACT} s'il peut vous en fournir un.`, { source: FLUX_PRODUITS, liens: [PAGES.vinaigriers, PAGES.contact] });
}

// « Quel est le diamètre du bouchon livré avec le robinet ? » répondait par les bouteilles vendues sans bouchon,
// « quel diamètre le bouchon du robinet » par les bouchons de bouteille de 24 mm.
r.concept("bouchon-du-robinet", "Bouchon percé qui tient le robinet", [], {
  famille: "robinet-vinaigrier",
  exclusif: true,
  formules: ["bouchon du robinet", "bouchon de robinet", "bouchon livre avec le robinet", "bouchon fourni avec le robinet", "bouchon avec le robinet", "bouchon pour le robinet", "bouchon pour robinet", "vinaigrier est fourni avec le bouchon", "vinaigrier fourni avec le bouchon", "vinaigrier est livre avec le bouchon", "vinaigrier avec le bouchon"],
});
for (const aspect of TOUS_LES_ASPECTS) {
  r.fait("bouchon-du-robinet", aspect, `
    Les vinaigriers en grès sont livrés avec leur **robinet en bois** monté dans un **bouchon percé en liège**. Le diamètre de ce bouchon n'est pas indiqué sur les fiches : il dépend du trou du vinaigrier. Pour le remplacer, **mesurez le diamètre du trou** : Duhallé vend un **bouchon percé conique de 32/28 mm** (hauteur 33 mm, robinet non fourni) et un **lot de 4 bouchons percés** de **23/19, 28/23, 32/28 et 35/30 mm**. En cas de doute, demandez conseil au service client ${CONTACT}.`, { source: FLUX_PRODUITS, liens: [PAGES.bouchonVinaigrier, PAGES.vinaigriers, PAGES.contact] });
}

// « Je n'ai plus accès à la boîte mail de mon inscription, comment la changer ? » répondait par un produit abîmé.
r.concept("changer-email", "Changer l'adresse e-mail du compte", [], {
  famille: "compte-client",
  exclusif: true,
  formules: ["changer mon adresse mail", "changer mon adresse email", "changer mon adresse e mail", "changer mon mail", "changer d adresse mail", "changer l adresse mail", "modifier mon adresse mail", "modifier mon adresse email", "modifier mon mail", "plus acces a ma boite mail", "plus acces a la boite mail", "plus du tout acces a la boite mail", "acces a la boite mail", "acces a ma boite mail", "boite mail que j avais", "adresse mail de mon compte", "nouvelle adresse mail", "nouvelle adresse email"],
});
for (const aspect of TOUS_LES_ASPECTS) {
  r.fait("changer-email", aspect, `
    Je n'ai pas accès aux comptes clients. Si vous pouvez encore vous connecter, modifiez votre adresse e-mail dans l'espace **« Mon compte »** de la boutique. Si vous n'avez plus accès à l'ancienne boîte mail (pour vous connecter ou recevoir un nouveau mot de passe), contactez le service client par téléphone au **${TELEPHONE}**, ou écrivez à **${EMAIL}** depuis votre nouvelle adresse en indiquant vos nom, prénom et adresse postale : l'équipe mettra votre compte à jour.`, { liens: [PAGES.contact] });
}

// « Je ne suis pas allé chercher mon colis assez vite, comment faire ? » répondait par la livraison en Corse et à l'étranger.
r.concept("colis-non-retire", "Colis non retiré à temps", [], {
  famille: "suivi-commande",
  exclusif: true,
  formules: ["pas alle chercher mon colis", "pas ete chercher mon colis", "pas recupere mon colis", "pas retire mon colis", "colis non retire", "colis pas retire", "colis retourne", "colis renvoye", "colis est reparti", "colis reparti", "delai de retrait depasse", "chercher mon colis assez vite", "retirer mon colis a temps", "colis en retour"],
});
for (const aspect of TOUS_LES_ASPECTS) {
  r.fait("colis-non-retire", aspect, `
    Un colis qui n'est pas retiré dans le délai du point relais ou du bureau de poste est **renvoyé à l'expéditeur**. Contactez le service client ${CONTACT} avec votre **numéro de commande** : l'équipe vous dira où en est le colis et comment vous le faire parvenir à nouveau.`, { liens: [PAGES.contact] });
}

// « Pourquoi ne puis-je pas augmenter le nombre de bouchons dans mon panier ? », « je ne parviens pas à mettre le carbure
// de calcium dans le panier », « je n'arrive pas à passer commande avec l'ordinateur » répondaient par les étapes de commande.
r.concept("panier-bloque", "Article ou quantité impossible à ajouter au panier", [], {
  famille: "boutique-en-ligne",
  exclusif: true,
  formules: ["augmenter le nombre", "augmenter la quantite", "modifier la quantite", "changer la quantite", "ajouter une quantite", "quantite dans mon panier", "quantite dans le panier", "mettre dans le panier", "mettre dans mon panier", "le mettre dans le panier", "la mettre dans le panier", "ajouter au panier", "ajouter dans le panier", "ajouter a mon panier", "ajouter dans mon panier", "n arrive pas a passer commande", "n arrive pas a passer ma commande", "ne parviens pas a passer commande", "impossible de passer commande", "ne peux pas passer commande", "arrive pas a ajouter", "parviens pas a ajouter", "parviens pas a le mettre", "parviens pas a la mettre", "arrive pas a le mettre", "arrive pas a la mettre"],
});
for (const aspect of TOUS_LES_ASPECTS) {
  r.fait("panier-bloque", aspect, `
    Si un article ne s'ajoute pas au panier, ou si sa quantité ne peut pas être augmentée, la quantité commandable est peut-être limitée par le **stock disponible** (regardez la disponibilité sur la fiche du produit). Sinon, rechargez la page, videz le panier et recommencez, ou essayez un **autre navigateur** ou un autre appareil. Si cela bloque toujours, contactez le service client ${CONTACT} en indiquant l'**article**, la **quantité** souhaitée et le message affiché (une capture d'écran aide) : l'équipe vous aidera à passer votre commande.`, { liens: [PAGES.contact] });
}

// « Dimensions du panier vert à légumes » : le panier est un produit, pas le panier de la commande.
r.concept("panier-recolte", "Panier de récolte fruits et légumes", ["panier de recolte", "panier a legumes", "panier a legume", "panier de cueillette", "panier vert", "panier a fruits", "corbeille ajouree"], {
  famille: "cidre",
  exclusif: true,
  formules: ["dimensions du panier", "dimension du panier", "taille du panier", "contenance du panier", "panier vert a legumes", "panier potager"],
});
for (const aspect of TOUS_LES_ASPECTS) {
  r.fait("panier-recolte", aspect, `
    Le **panier de récolte fruits et légumes** est une corbeille ajourée de **12 litres** en plastique rigide **vert**, avec une **anse mobile** noire : **diamètre supérieur 30,5 cm**, **diamètre inférieur 21 cm**, **hauteur 24 cm**. Il est empilable, se lave facilement et est **fabriqué en France** ; il convient aux pommes, agrumes, pommes de terre, tomates ou haricots.`, { source: FLUX_PRODUITS, liens: [PAGES.cidre] });
}

// « Dénoyauteur prunes et mirabelles semi-automatique » restait sans réponse.
r.concept("denoyauteur", "Dénoyauteurs", ["denoyauteur", "denoyauteurs", "denoyauter", "retirer les noyaux", "enlever les noyaux"], {
  famille: "conserve",
  exclusif: true,
});
for (const aspect of TOUS_LES_ASPECTS) {
  r.fait("denoyauteur", aspect, `
    Le Comptoir de la Conserve propose deux **dénoyauteurs** : un **dénoyauteur semi-automatique pour prunes et mirabelles**, à lame inox, qui se fixe au plan de travail par une **ventouse**, et un **dénoyauteur pour cerises et petites olives**. Ils sont dans la rubrique « Faire de la confiture ».`, { source: FLUX_PRODUITS, liens: [PAGES.confiture] });
}

// « Le Comptoir de la Conserve » répondait par la mise en garde sur les conserves.
r.concept("comptoir-conserve", "La gamme du Comptoir de la Conserve", [], {
  famille: "conserve",
  exclusif: true,
  formules: ["comptoir de la conserve", "le comptoir de la conserve", "comptoir conserve"],
});
for (const aspect of TOUS_LES_ASPECTS) {
  r.fait("comptoir-conserve", aspect, `
    **Le Comptoir de la Conserve** est la gamme Duhallé pour la cuisine et les conserves maison :
    - **faire de la confiture** : bocaux et joints, dénoyauteurs, étiquettes pour bocaux, balance, minuteur… ;
    - **transformation alimentaire** : pinces à bocaux, ouvre-bocal, tablier… ;
    - **hachoirs**, trancheuse et presse-tomates ;
    - **extracteurs de jus**, déshydrateurs et moulins à légumes ;
    - **fumoirs, stérilisateurs et réchauds**.`, { source: FLUX_PRODUITS, liens: [PAGES.conserve, PAGES.confiture, PAGES.sterilisateurs] });
}

// « Quelle est la différence entre le jaune en 1 kg et le jaune en 333 grammes ? » restait sans réponse.
r.concept("format-cire", "Formats de la cire souple", [], {
  famille: "cire-souple",
  exclusif: true,
  formules: ["333 g", "333 grammes", "333 gramme", "333g", "333gramme", "333grammes", "pain de 333", "1kg et", "1 kg et", "en 1kg", "en 1 kg"],
});
for (const aspect of TOUS_LES_ASPECTS) {
  r.fait("format-cire", aspect, `
    La **cire souple** se vend en **pain de 333 g** (noire, rouge, blanche, lie de vin, crème, verte, orange, jaune) et en **1 kg** (jaune, or, orange, lie de vin, crème…). Pour une même couleur, c'est la **même cire souple** : seule la **quantité** change. Le pain de 333 g suffit pour un petit nombre de bouteilles ; le kilo convient aux grandes séries. Comparez le prix au kilo sur les fiches ; pour de gros volumes, demandez un devis au service client ${CONTACT}.`, { source: FLUX_PRODUITS, liens: [PAGES.cireSouple, PAGES.contact] });
}

// « Faites-vous des remises pour le Black Friday ? » répondait par les devis.
r.concept("black-friday", "Black Friday et offres saisonnières", [], {
  famille: "promotions",
  exclusif: true,
  formules: ["black friday", "blackfriday", "black fridays", "cyber monday", "french days", "offres de noel", "promotions de noel"],
});
for (const aspect of TOUS_LES_ASPECTS) {
  r.fait("black-friday", aspect, `
    Je n'ai pas le détail des offres du **Black Friday** ni des autres opérations saisonnières. Les offres du moment sont mises en avant sur la boutique ; si vous avez un **code promo**, saisissez-le au moment de valider votre panier. Pour savoir si une remise est prévue, contactez le service client ${CONTACT}. Pensez aussi au programme **Parrainage et Fidélité**.`, { liens: [PAGES.avantages, PAGES.contact] });
}

// « Faut-il garder le bouchon rouge du barboteur lors de sa mise en service ? » répondait par la conservation des bouchons en liège.
r.concept("capuchon-barboteur", "Capuchon du barboteur", [], {
  famille: "barboteur",
  exclusif: true,
  formules: ["bouchon rouge du barboteur", "bouchon rouge", "capuchon du barboteur", "capuchon rouge", "bouchon du barboteur", "couvercle du barboteur", "mise en service du barboteur", "barboteur lors de sa mise en service"],
});
for (const aspect of TOUS_LES_ASPECTS) {
  r.fait("capuchon-barboteur", aspect, `
    Je n'ai pas la **notice** du barboteur dans ma base, ni le rôle exact de son **capuchon** : suivez la notice livrée avec le produit, ou demandez au service client ${CONTACT}. Retenez le principe : le barboteur, rempli d'eau jusqu'au trait, doit laisser **sortir le gaz carbonique** sans laisser entrer l'air ; un capuchon ne doit donc jamais le **fermer hermétiquement** pendant la fermentation.`, { liens: [PAGES.contact] });
}

// « Quel diamètre de grille pour un pâté de campagne ? » répondait par la mise en garde sur les conserves.
// Famille « hachoir » et non « grille-hachoir » : « Grilles de hachoir » seul garde la présentation des grilles.
r.concept("choix-grille-hachoir", "Grille adaptée à la recette", [], {
  famille: "hachoir",
  exclusif: true,
  formules: ["diametre de grille", "diametre de la grille", "diametre pour la grille", "grille pour pate", "grille pour terrine", "grille pour saucisse", "grille pour la viande", "taille de grille", "taille de la grille", "trous de la grille"],
});
r.fait("choix-grille-hachoir", "choix", `
  Les grilles de rechange des hachoirs en fonte n°10 et Reber n°12 ont des trous de **6, 8 ou 10 mm** : plus les trous sont **gros**, plus le hachis est **grossier**. Pour un **pâté de campagne** ou une terrine rustique, on prend en général une grille à **gros trous** (8 ou 10 mm) ; pour une farce fine ou une chair à saucisse fine, la grille de **6 mm**. Vérifiez sur la fiche que la grille correspond au **numéro de votre hachoir**.`, { source: FLUX_PRODUITS, liens: [PAGES.hachoirFonte, PAGES.transformation] });
for (const aspect of ["dimension"] as const) {
  r.fait("choix-grille-hachoir", aspect, `
    Les grilles de rechange des hachoirs en fonte n°10 et Reber n°12 se vendent à part, avec des trous de **6, 8 ou 10 mm** : plus les trous sont gros, plus le hachis est grossier (8 ou 10 mm pour un pâté de campagne, 6 mm pour une farce fine). Le diamètre extérieur et l'épaisseur de chaque grille figurent sur sa fiche ; choisissez la grille du **numéro de votre hachoir**, ou demandez au service client ${CONTACT}.`, { source: FLUX_PRODUITS, liens: [PAGES.hachoirFonte, PAGES.contact] });
}

// « J'ai cassé la partie en plastique du lave-bouteille, se commande-t-elle séparément ? » répondait par l'eau de Javel.
r.concept("piece-lave-bouteille", "Pièce de rechange du lave-bouteille", [], {
  famille: "piece-rechange",
  exclusif: true,
  formules: ["partie en plastique du lave bouteille", "piece du lave bouteille", "pieces du lave bouteille", "pieces detachees d un lave bouteille", "piece detachee d un lave bouteille", "pieces detachees du lave bouteille", "piece detachee du lave bouteille", "lave bouteille casse", "casse la partie", "commande separement", "commander separement", "commandee separement", "commandees separement"],
});
for (const aspect of TOUS_LES_ASPECTS) {
  r.fait("piece-lave-bouteille", aspect, `
    Pour les lave-bouteilles, Duhallé vend à part la **brosse en inox** (pour lave-bouteille hydraulique ou rotatif). Je n'ai pas d'autre pièce détachée vendue seule dans ma base (manche, poignée, pièce en plastique) : contactez le service client ${CONTACT} avec le **modèle** de votre lave-bouteille et une **photo** de la pièce cassée ; l'équipe vous dira si elle peut la fournir.`, { source: FLUX_PRODUITS, liens: [PAGES.nettoyage, PAGES.contact] });
}

// « C quoi collisimo fr » répondait par la livraison en Corse et à l'étranger.
r.concept("colissimo", "Le service Colissimo de La Poste", [], {
  famille: "livraison",
  exclusif: true,
  formules: ["collisimo", "colisimo", "collissimo", "c quoi colissimo", "c est quoi colissimo", "qu est ce que colissimo", "colissimo c est quoi", "colissimo fr", "colissimo.fr"],
});
// Définition seulement : les autres aspects descendraient vers Colissimo depuis une question sur la livraison en général.
for (const aspect of ["definition"] as const) {
  r.fait("colissimo", aspect, `
    **Colissimo** est le service de livraison de colis de **La Poste** (colissimo.fr), l'un des trois transporteurs de Duhallé avec **DPD** et **Geodis**. Vous le choisissez au moment de valider votre panier ; avec Colissimo, la livraison est **offerte à partir de 79 €** d'achat en France continentale, pour les articles qui ne sont ni lourds ni volumineux. Le suivi du colis se fait avec le numéro transmis à l'expédition, sur le site de Colissimo.`, { liens: [PAGES.contact] });
}

// « Différence entre vin de garde et à garder quelques années » répondait par la gamme du vin fait maison.
r.concept("garde-quelques-annees", "Vin de garde ou vin à garder quelques années", [], {
  famille: "bouchon",
  exclusif: true,
  formules: ["garder quelques annees", "garder quelques annee", "a garder quelques annees", "a garder quelques annee", "quelques annees de garde", "garde de quelques annees"],
});
for (const aspect of TOUS_LES_ASPECTS) {
  r.fait("garde-quelques-annees", aspect, `
    La différence tient à la **durée de garde**, et donc au bouchon :
    - un **vin de garde** est fait pour **vieillir longtemps** en cave : il demande le bouchon le plus long et le plus régulier, **45 x 24 mm en liège naturel de catégorie 1** ;
    - un **vin de qualité à garder quelques années** sera bu plus tôt : un bouchon **colmaté de catégorie 3**, en 45 x 24 ou 38 x 24 mm, suffit.

    La **catégorie** indique la qualité du liège, de 1 (la plus belle) à 6.`, { source: PAGES.bouchonsVin.url, liens: [PAGES.bouchon45Naturel, PAGES.bouchon38Cat3, PAGES.bouchonsVin] });
}
