// ═══════════════════════════════════════════════════════════════════════════
// L'INVITATION DU CONSEILLER : la petite carte qui apparaît au-dessus de la
// bulle pour engager la conversation, avec un message adapté à la page.
//
// La page est reconnue à son adresse, qui sur Oxatis décrit la catégorie ou
// le produit (« /boucheuse-2-leviers-c2x… »). Le titre n'est pas lu : il
// porte souvent le slogan du site (« vins et cidres »). La première règle qui
// s'applique gagne : les plus précises d'abord (« tire-bouchon » avant
// « bouchon »). Chaque question proposée obtient une vraie réponse de la
// base : un test le vérifie.
// ═══════════════════════════════════════════════════════════════════════════

export interface Invitation {
  /** Le message de la carte. */
  texte: string;
  /** La question cliquable proposée sous le message. */
  question: string;
}

interface Regle extends Invitation {
  motif: RegExp;
}

const REGLES: Regle[] = [
  {
    motif: /cidre|pommes?\b|pressoir|broyeur/,
    texte: "Vous préparez votre cidre ? Je vous guide pas à pas.",
    question: "Comment faire son cidre ?",
  },
  {
    motif: /\bcires?\b|cachet/,
    texte: "Vous hésitez entre cire dure et cire souple ? Je vous aide à choisir.",
    question: "Cire dure ou souple ?",
  },
  {
    motif: /vinaigr/,
    texte: "Envie de faire votre propre vinaigre ? Je vous explique tout.",
    question: "Comment faire du vinaigre ?",
  },
  {
    motif: /\bconserves?\b|bocal|bocaux|steril|terrine|confiture/,
    texte: "Une question sur vos conserves maison ? Je vous réponds tout de suite.",
    question: "Comment stériliser des bocaux ?",
  },
  {
    motif: /tire.?bouchon|sommelier|degust|carafe|service.du.vin/,
    texte: "Besoin d'un conseil pour ouvrir ou servir votre vin ?",
    question: "Quel tire-bouchon choisir ?",
  },
  {
    motif: /\bcave\b|range.?bouteille|casier|porte.?bouteille/,
    texte: "Une question sur le rangement ou la conservation du vin ?",
    question: "Comment conserver une bouteille de vin ?",
  },
  {
    motif: /bouchon|bouchage|boucheuse|liege/,
    texte: "Le bon bouchon dépend de la garde de votre vin. Je vous conseille en quelques secondes.",
    question: "Quel bouchon choisir pour mon vin ?",
  },
  {
    motif: /bouteille|embouteill|capsul|tireuse|remplis/,
    texte: "Besoin d'aide pour votre mise en bouteille ? Je vous réponds tout de suite.",
    question: "Comment mettre mon vin en bouteille ?",
  },
];

export const INVITATION_GENERALE: Invitation = {
  texte: "Une question sur nos produits ou sur la mise en bouteille ? Je vous réponds tout de suite.",
  question: "Quel bouchon choisir pour mon vin ?",
};

/** Panier, commande, paiement, compte : on ne dérange pas le client. */
const PAGES_SANS_INVITATION = /panier|cart|basket|checkout|commande|order|paiement|payment|login|connexion|compte|account/;

function normaliser(texte: string): string {
  return texte
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "");
}

/**
 * L'invitation à montrer sur une page, ou null s'il ne faut rien montrer.
 * `adresse` est le chemin de la page, avec sa requête.
 */
export function choisirInvitation(adresse: string): Invitation | null {
  const chemin = normaliser(adresse);
  if (PAGES_SANS_INVITATION.test(chemin)) return null;
  const regle = REGLES.find((r) => r.motif.test(chemin));
  return regle ? { texte: regle.texte, question: regle.question } : INVITATION_GENERALE;
}

/** Toutes les invitations possibles, pour les tests. */
export const TOUTES_LES_INVITATIONS: Invitation[] = [...REGLES.map(({ texte, question }) => ({ texte, question })), INVITATION_GENERALE];
