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

// « Information sur la soude » : « soude » était pris pour le soudage du carbure de calcium.
r.concept("soude", "Soude", ["hydroxyde de sodium"], {
  famille: "catalogue",
  exclusif: true,
  // « soude » et « soudage » ont la même racine : la soude n'est reconnue que mot pour mot.
  formules: ["soude", "la soude", "de la soude", "soude caustique", "soude en paillettes", "soude en perles", "cristaux de soude"],
});
for (const aspect of TOUS_LES_ASPECTS) {
  r.fait("soude", aspect, `
    Je n'ai pas trouvé de **soude** dans la base du catalogue. La rubrique **Droguerie** propose de l'huile de cade, de l'huile de paraffine et du carbure de calcium. Pour un renseignement sur une soude précise, regardez la fiche du produit ou contactez le service client ${CONTACT}.`, { liens: [PAGES.droguerie, PAGES.contact] });
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
r.concept("newsletter", "Newsletter", ["lettre d information", "infolettre"], {
  famille: "boutique-en-ligne",
  exclusif: true,
  formules: ["newsletter", "newsletters", "newletter", "la newsletter", "inscription newsletter", "inscription newletter"],
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
  formules: ["sous combien de temps expediez", "sous combien de temps sont expedie", "sous combien de temps est expedie", "sous combien de temps vous expediez", "sous combien de temps ma commande est expediee", "sous combien de temps ma commande sera expediee", "en combien de temps expediez", "en combien de temps vous l expedier", "pas de la livraison mais de l expedition", "ne parle pas de la livraison"],
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
