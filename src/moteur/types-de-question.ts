// ═══════════════════════════════════════════════════════════════════════════
// CE QUE LA QUESTION DEMANDE.
//
// Le type se lit dans la FORME de la phrase (« comment », « combien de temps »,
// « lequel », « où acheter »), jamais dans son vocabulaire métier : ajouter un
// produit à la base ne change pas la façon dont on lit une question.
//
// ⚠️ LA PREMIÈRE MARQUE QUI S'APPLIQUE GAGNE, ET L'ORDRE EST UNE DÉCISION.
// « combien coûte » est un PRIX avant d'être une valeur ; « combien de temps »
// une DURÉE avant d'être une valeur ; « quelle température pour une cave »
// une VALEUR avant d'être un choix ; « comment choisir » un CHOIX avant d'être
// une procédure. L'ordre vit dans la table — une donnée qu'on lit et qu'un
// test épingle —, jamais dans une cascade de `if`.
//
// ⚠️ UNE QUESTION SANS MARQUE N'A PAS DE TYPE (« bouchon vin de garde ») : on
// rend `null` et la réponse suit le plan par défaut, une présentation générale.
// ═══════════════════════════════════════════════════════════════════════════
import type { TypeDeQuestion } from "../savoir/types";

export interface MarqueDeType {
  readonly type: TypeDeQuestion;
  /** Lu sur la forme normalisée encadrée d'espaces : minuscules, sans accents. */
  readonly motif: RegExp;
  /** Ce qui la signale, en clair — montré dans la trace. */
  readonly signal: string;
}

export const MARQUES_DE_TYPE: readonly MarqueDeType[] = [
  {
    type: "prix",
    motif:
      / (?:prix|tarifs?|combien (?:coute|coutent|ca coute|ca fait|vaut|valent|ca vaut)|coute|coutent|cout|couts|cher|chere|chers|onereux|frais (?:de port|de livraison|d envoi|d expedition|de transport)|gratuit|gratuite|gratuits|offerte?s?|payant|payante|euros?) /,
    signal: "un prix : « combien coûte », « prix », « frais », « gratuit »",
  },
  {
    type: "lieu",
    motif:
      / (?:ou (?:acheter|trouver|commander|se procurer|me procurer|puis je (?:acheter|trouver|commander)|est ce que je peux (?:acheter|trouver))|chez qui|a qui (?:m|s) adresser|qui (?:appeler|contacter)|magasins?|boutiques? physiques?|revendeurs?|points? de vente) /,
    signal: "un lieu : « où acheter », « où trouver », « magasin »",
  },
  {
    type: "duree",
    motif:
      / (?:combien de temps|pendant combien|quelle duree|en combien de|combien de? (?:heures?|jours?|semaines?|mois|annees?|ans)|delais?|duree|se conserve|se garde|tient combien|garder combien|combien d annees) /,
    signal: "une durée : « combien de temps », « délai », « se conserve »",
  },
  {
    type: "valeur",
    motif:
      / (?:quelle (?:taille|dimension|longueur|hauteur|temperature|contenance|capacite|quantite|humidite|dose|cadence)|quel (?:niveau|diametre|format|volume|poids|calibre|taux|degre|nombre|dosage)|combien de|combien en faut|dimensions?|diametres?|tailles?|mesures?|mm|cm|contenance|capacite|doses?|dosages?|temperatures?|humidite|cadence|puissance|watts?|quelle puissance|combien de litres|combien de places) /,
    signal: "une valeur : « quelle taille », « quel diamètre », « combien de »",
  },
  {
    // « quels bouchons pour un vin de garde » demande un CHOIX, pas la gamme :
    // la destination (« pour », « avec ») fait la différence.
    type: "choix",
    motif: / (?:quels?|quelles?) (?:[a-z0-9]+ ){1,4}(?:pour|avec|adaptes?|adaptees?) /,
    signal: "un choix pour un usage : « quel… pour… »",
  },
  {
    type: "gamme",
    motif:
      / (?:vendez vous|vendez|avez vous|vous avez|proposez vous|vous proposez|proposez|faites vous|vous faites|existe t il|y a t il|quels (?:sont les |types? de |modeles? de |sortes? de )?|quelles (?:sont les |sortes? de )?|gamme|catalogue|la liste|quoi comme|que vendez) /,
    signal: "une gamme : « vendez-vous », « avez-vous », « quels… », « quelles… »",
  },
  {
    type: "permission",
    motif:
      / (?:(?:je|j|on) (?:peux|peut|pourrais|pourrait)|peut on|peut il|peut elle|puis je|est ce (?:que je peux|qu on peut|possible)|c est possible|est il possible|a t on le droit) /,
    signal: "une permission : « je peux », « peut-on », « est-ce possible »",
  },
  {
    type: "moment",
        // « quand on ouvre », « quand je bouche » : une circonstance, pas une date demandée.
    motif:
      / (?:quand(?! meme| bien meme| (?:on|je|j|il|elle|ils|elles|vous|nous|tu|l on|c est) )|a quel moment|quelle (?:periode|saison|epoque|lune)|quel mois|en quelle saison) /,
    signal: "un moment : « quand », « à quel moment », « quelle période »",
  },
  {
    type: "raison",
    motif: / (?:pourquoi|pour quelle raison|a quoi c est du|comment ca se fait|c est grave) /,
    signal: "une raison : « pourquoi »",
  },
  {
    // « Que faire de X ou Y ? » reste une demande de conseil : le « ou »
    // énumère parfois des symptômes, il ne demande pas toujours un choix.
    type: "conseil",
    motif:
      / (?:que faire|je fais quoi|comment eviter|eviter|astuces?|erreurs?|probleme|souci|rate|fuit|fuite|ne (?:se )?(?:fait|forme|prend|marche|fonctionne) pas|n arrive pas|j arrive pas|arrive pas a|impossible de|du mal a|difficile de|difficilement) /,
    signal: "un conseil : « que faire », « comment éviter », « erreur »",
  },
  {
    type: "choix",
    motif:
      / (?:quel|quelle|lequel|laquelle|choisir|choix|difference|differences|different|differents|mieux|meilleur|meilleure|plutot|conseillez|recommandez|preconisez|ou bien|versus|vs|comparer|comparaison|adapte|adaptee|convient)(?: |$)| [a-z0-9]+ ou (?:[a-z0-9]+ ){1,3}$/,
    signal: "un choix : « quel », « lequel », « quelle différence », « ceci ou cela ? »",
  },
  {
    type: "entretien",
    motif:
      / (?:entretenir|entretien|conserver|conservez|garder|gardez) /,
    signal: "un entretien : « conserver », « garder », « entretenir »",
  },
  {
    type: "procedure",
    motif:
      / (?:comment|etapes?|methode|mode d emploi|marche a suivre|tuto|tutoriel|procede|faire son|faire sa|faire ses|faire du|faire de la|fabriquer|utiliser|utilise|s utilise|fonctionne|par quoi commencer|par ou commencer|je debute|debutant|debutante|premiere fois|pour commencer) /,
    signal: "une procédure : « comment », « étapes », « faire son… »",
  },
  {
    type: "explication",
    motif: / (?:c est quoi|qu est ce que|qu est ce qu|definition|ca veut dire|signifie|a quoi sert|a quoi servent|ca sert|sert a|servent a|kesako) /,
    signal: "une explication : « c'est quoi », « à quoi sert »",
  },
  {
    type: "fait",
    motif:
      / (?:est ce que|est ce qu|faut il|dois je|doit on|est il|est elle|sont ils|sont elles|necessaire|obligatoire|indispensable|utile|[a-z]+ t (?:il|elle|ils|elles|on)|(?:peut|peuvent|doit|doivent|est|sont|faut) (?:il|elle|ils|elles|on)) /,
    signal: "une question fermée : « est-ce que », « faut-il », une inversion (« casse-t-elle »)",
  },
];

/** Le type de la question — la première marque qui s'applique, ou `null`. */
export function lireTypeDeQuestion(forme: string, marques = MARQUES_DE_TYPE): MarqueDeType | null {
  const cadre = ` ${forme.trim()} `;
  return marques.find((m) => m.motif.test(cadre)) ?? null;
}
