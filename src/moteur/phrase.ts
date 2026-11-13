// ═══════════════════════════════════════════════════════════════════════════
// LIRE LA STRUCTURE DE LA PHRASE.
//
// Jusqu'ici, une question était une liste de mots, et le premier concept cité en devenait le sujet. Ici, la
// phrase est découpée en GROUPES, et chaque mot reçoit un RÔLE :
//
//   - l'OBJET demandé : ce dont on parle (« quel BOUCHON pour un vin de garde ? ») ;
//   - la DESTINATION : à quoi il sert, introduite par « pour », « avec », « sur », « dans », « contre »
//     (« quel bouchon pour un VIN DE GARDE ? ») ;
//   - une CONTRAINTE : une matière ou une couleur (« un bouchon en LIÈGE »), un nombre et son unité
//     (« 24 MM », « 75 CL »), un prix maximum (« moins de 50 EUROS ») ;
//   - une NÉGATION, qui porte sur tout son groupe : « pas de bouchon en liège » nie le bouchon ET le liège.
//     Un mot nié n'est pas effacé : il reste lu, comme contrainte d'exclusion (« un vin sans SULFITES » parle
//     bien des sulfites), mais il ne peut pas devenir l'objet de la réponse.
//
// Le découpage ne regarde que la forme de la phrase : la ponctuation, les mots-outils (« pour », « sans », « quel »)
// et la nature des mots (lexique.ts). Aucun mot de métier : ajouter un produit à la base ne change pas la lecture
// d'une phrase. Les listes ci-dessous (unités, couleurs, matières) disent des choses vraies de tout le français.
//
// Une phrase qui contient PLUSIEURS DEMANDES (« combien coûte la livraison ? et comment suivre mon colis ? ») est aussi
// découpée : `decouperLesDemandes` rend une partie par demande.
// ═══════════════════════════════════════════════════════════════════════════
import { estMotVide, MOTS_MAX, natureDuMot, normaliser, raciner, type NatureDeMot } from "./texte";

export type RoleDuMot = "objet" | "destination" | "contrainte";

/** Un mot porteur de sens de la question, avec son rôle dans la phrase. */
export interface MotDeLaPhrase {
  readonly mot: string;
  readonly racine: string;
  readonly nature: NatureDeMot | undefined;
  readonly role: RoleDuMot;
  /** Le mot est dans la portée d'une négation (« sans », « pas de », « aucun », « ni »). */
  readonly nie: boolean;
}

export interface Structure {
  readonly mots: readonly MotDeLaPhrase[];
  /** Les nombres de la question (« 24 », « 1p5 »), sans leur unité : ils départagent les faits qui les contiennent. */
  readonly nombres: readonly string[];
  /** Les contraintes en clair, pour la trace : « 24 mm », « en liège », « prix au plus 50 euros ». */
  readonly contraintes: readonly string[];
}

/** « pour », « avec », « sur »… : ce qui suit est la destination de l'objet. */
const DESTINATIONS = new Set(["pour", "avec", "sur", "dans", "contre"]);
/** Ce qui ouvre une négation sur le groupe qui suit. « pas » ne nie que suivi de « de » ou « d ». */
const NEGATIONS = new Set(["sans", "ni", "aucun", "aucune"]);
/** Ce qui ferme la portée d'une négation. */
const FRONTIERES = new Set(["et", "ou", "mais", "donc", "car", "que", "qui", "quand", "si", "comme", ...DESTINATIONS]);
/** Les mots qui désignent l'objet demandé quand la phrase commence par sa destination (« pour boucher, quelle boucheuse ? »). */
const INTERROGATIFS = new Set(["quel", "quelle", "quels", "quelles", "lequel", "laquelle", "lesquels", "lesquelles", "combien", "comment"]);
const UNITES = new Set(["mm", "cm", "dm", "m", "km", "l", "litre", "litres", "cl", "ml", "kg", "g", "mg", "w", "watt", "watts", "v", "euro", "euros", "eur", "jour", "jours", "heure", "heures", "mois", "an", "ans", "bouteille", "bouteilles", "place", "places"]);
const UNITES_DE_PRIX = new Set(["euro", "euros", "eur"]);
const MAXIMUM = new Set(["moins", "maximum", "max", "jusqu", "budget"]);
const COULEURS = new Set(["rouge", "bleu", "bleue", "vert", "verte", "jaune", "orange", "noir", "noire", "blanc", "blanche", "gris", "grise", "rose", "violet", "violette", "marron", "beige", "transparent", "transparente", "translucide", "dore", "doree", "argente", "argentee", "ivoire", "turquoise", "bordeaux"]);
const MATIERES = new Set(["liege", "bois", "inox", "acier", "fer", "fonte", "verre", "plastique", "caoutchouc", "gres", "chene", "cuivre", "aluminium", "alu", "polystyrene", "polyethylene", "silicone", "coton", "lin", "papier", "carton", "metal", "porcelaine", "ceramique", "frene", "chataignier"]);

/** Un nombre : « 24 », « 1p5 » (la virgule est déjà devenue « p » par la normalisation). */
const NOMBRE = /^\d+(?:p\d+)?$/;

/**
 * Les propositions d'un texte : la ponctuation qui sépare (« , ; : . ! ? ( ) ») coupe, sauf la virgule ou le point d'un
 * nombre décimal (« 1,5 l »).
 */
function propositions(texte: string): string[] {
  return texte
    .split(/(?<!\d)[,;:.!?()\n]+|[,;:.!?()\n]+(?!\d)/)
    .map((p) => p.trim())
    .filter(Boolean);
}

/** Lit la phrase : le rôle de chaque mot, les nombres et les contraintes. */
export function lireLaPhrase(texte: string): Structure {
  const mots: MotDeLaPhrase[] = [];
  const nombres: string[] = [];
  const contraintes: string[] = [];
  for (const proposition of propositions(texte)) {
    if (mots.length >= MOTS_MAX) break;
    const jetons = normaliser(proposition).split(" ").filter(Boolean);
    // La proposition qui COMMENCE par une destination (« pour boucher mes bouteilles quelle boucheuse ») donne son objet
    // après le mot interrogatif.
    let role: RoleDuMot = "objet";
    let commenceParLaDestination = false;
    let nie = false;
    let premierMotDuGroupe = true;
    for (let i = 0; i < jetons.length && mots.length < MOTS_MAX; i++) {
      const jeton = jetons[i]!;
      if (DESTINATIONS.has(jeton)) {
        role = "destination";
        commenceParLaDestination = i === 0;
        nie = false;
        premierMotDuGroupe = true;
        continue;
      }
      if (commenceParLaDestination && INTERROGATIFS.has(jeton)) {
        role = "objet";
        commenceParLaDestination = false;
        premierMotDuGroupe = true;
        continue;
      }
      if (NEGATIONS.has(jeton) || (jeton === "pas" && (jetons[i + 1] === "de" || jetons[i + 1] === "d"))) {
        nie = true;
        premierMotDuGroupe = true;
        continue;
      }
      if (FRONTIERES.has(jeton)) {
        nie = false;
        premierMotDuGroupe = true;
        continue;
      }
      if (NOMBRE.test(jeton)) {
        nombres.push(jeton);
        const unite = jetons[i + 1] !== undefined && UNITES.has(jetons[i + 1]!) ? jetons[i + 1]! : undefined;
        const maximum = jetons.slice(Math.max(0, i - 3), i).some((j) => MAXIMUM.has(j));
        contraintes.push(unite && UNITES_DE_PRIX.has(unite) && maximum ? `prix au plus ${jeton} ${unite}` : unite ? `${jeton} ${unite}` : jeton);
        mots.push({ mot: jeton, racine: jeton, nature: undefined, role: "contrainte", nie });
        continue;
      }
      if (estMotVide(jeton)) continue;
      const matiereOuCouleur = !premierMotDuGroupe && (MATIERES.has(jeton) || COULEURS.has(jeton));
      if (matiereOuCouleur && !nie) contraintes.push(`en ${jeton}`);
      mots.push({ mot: jeton, racine: raciner(jeton), nature: natureDuMot(jeton), role: matiereOuCouleur ? "contrainte" : role, nie });
      premierMotDuGroupe = false;
    }
  }
  return { mots, nombres, contraintes };
}

// ─── Plusieurs demandes dans un même message ─────────────────────────────────────────────────────────────────

/** Ce qui ouvre une demande : « et comment suivre mon colis ? », « puis combien coûte… ». */
const DEBUT_DE_DEMANDE = /^(?:comment|combien|quel|quelle|quels|quelles|lequel|laquelle|ou|quand|pourquoi|est ce|peut on|puis je|avez vous|vendez vous|faut il|y a t il|existe t il)\b/;

/**
 * Les DEMANDES d'un message : les phrases qui finissent par un point d'interrogation, et celles que « et » ou « puis »
 * relie à une nouvelle interrogation (« combien coûte la livraison et comment suivre mon colis »). Une phrase qui n'est
 * pas une demande (« j'ai commandé hier. », « bonjour ») n'en fait pas partie. Au plus `max` demandes sont rendues.
 */
export function decouperLesDemandes(texte: string, max = 3): string[] {
  const demandes: string[] = [];
  // Une phrase : des caractères, ou un point entre deux chiffres (« 1.5 l »), puis sa ponctuation finale.
  const phrases = texte.match(/(?:[^.!?]|(?<=\d)\.(?=\d))+[.!?]*/g) ?? [];
  for (const phrase of phrases) {
    if (demandes.length >= max) break;
    const finit = /\?\s*$/.test(phrase);
    // « …et comment… » : on coupe avant « et » quand une nouvelle interrogation suit.
    const morceaux = phrase.split(/\s+(?:et|puis|ensuite|aussi)\s+(?=(?:comment|combien|quel|quelle|quels|quelles|lequel|laquelle|ou|quand|pourquoi|est-ce|est ce|peut-on|puis-je|avez-vous|vendez-vous|faut-il)\b)/i);
    morceaux.forEach((morceau, i) => {
      if (demandes.length >= max) return;
      const forme = normaliser(morceau);
      const derniere = i === morceaux.length - 1;
      if ((derniere && finit) || (morceaux.length > 1 && i > 0) || (DEBUT_DE_DEMANDE.test(forme) && finit)) {
        const propre = morceau.replace(/[?!.\s]+$/, "").trim();
        if (propre) demandes.push(propre);
      }
    });
  }
  return demandes;
}
