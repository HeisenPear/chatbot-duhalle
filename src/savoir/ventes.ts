// ═══════════════════════════════════════════════════════════════════════════
// LES SUGGESTIONS DU CHATBOT : ce que les boutons proposent, et pourquoi.
//
// Les clients cliquent beaucoup plus sur les boutons qu'ils ne tapent de
// questions : dans la base (2 au 12 octobre 2026), les trois questions les plus
// posées sont des boutons (88, 82 et 80 fois sur 607 questions). Les boutons sont
// donc la meilleure place pour la VENTE ADDITIONNELLE : après chaque réponse, on
// propose les questions les plus utiles, même quand elles ne portent pas sur
// ce que le client vient de demander, car il s'intéresse peut-être aussi à un
// autre produit.
//
// Un seul endroit à modifier. Chaque question est rangée avec le concept dont
// sa réponse parle : les tests vérifient que le chatbot répond bien à chacune.
//
// Une réponse affiche au plus 4 boutons, dans cet ordre :
//   1. le sujet (« voir aussi » et déclinaisons du concept) : 2 au plus ;
//   2. les COMPLÉMENTS du sujet : ce qu'on achète avec lui ;
//   3. la VITRINE : les questions les plus fréquentes et les plus utiles.
// Le widget affiche 5 boutons au plus.
// ═══════════════════════════════════════════════════════════════════════════
import type { QuestionProposee } from "../moteur/assistant";

const q = (question: string, concept: string): QuestionProposee => ({ question, concept });

// ─── À l'ouverture du chat ─────────────────────────────────────────────────
//
// Les cinq boutons de départ : trois portes d'entrée vers les produits (le
// bouchon, le plus cliqué de tous, puis le vinaigre et le cidre) et les deux
// questions de service les plus posées. « Comment mettre mon vin en bouteille ? »
// et « Comment contacter le service client ? » restent proposés dans la vitrine
// et dans les réponses.
export const QUESTIONS_DE_DEPART: readonly string[] = [
  "Quel bouchon choisir pour mon vin ?",
  "Comment faire du vinaigre ?",
  "Comment faire son cidre ?",
  "Suivre ma commande",
  "Quels sont les frais de livraison ?",
];

// ─── La vitrine ────────────────────────────────────────────────────────────
//
// Les questions proposées en fin de réponse quand le sujet n'a pas de
// compléments : d'abord les plus fréquentes (le bouchon, le vinaigre, le
// cidre), puis les rubriques qui font vendre du matériel en plus.
export const VITRINE: readonly QuestionProposee[] = [
  q("Quel bouchon choisir pour mon vin ?", "bouchon"),
  q("Quelle boucheuse choisir ?", "boucheuse"),
  q("Comment faire du vinaigre ?", "vinaigre"),
  q("Comment faire son cidre ?", "cidre"),
  q("Comment mettre mon vin en bouteille ?", "mise-en-bouteille"),
  q("Quel casier choisir pour mes bouteilles ?", "casier"),
  q("Comment cacheter mes bouteilles à la cire ?", "cire"),
  q("Comment faire des conserves maison ?", "conserve"),
];

// ─── Les compléments ───────────────────────────────────────────────────────
//
// Ce qu'on achète avec le produit dont le client parle. La clé est un concept :
// ses membres héritent de ses compléments, et le plus spécifique passe en premier
// (un conseil sur les bondes de dame-jeanne propose un barboteur, pas une boucheuse).
// Une question dont le concept est celui du sujet, ou l'un de ses parents, n'est
// jamais proposée : elle n'apprendrait rien au client.
export const COMPLEMENTS: Readonly<Record<string, readonly QuestionProposee[]>> = {
  // Le vin, du bouchon à la cave
  vin: [q("Quel bouchon choisir pour mon vin ?", "bouchon"), q("Quelle boucheuse choisir ?", "boucheuse"), q("Quel casier choisir pour mes bouteilles ?", "casier")],
  "mise-en-bouteille": [q("Quel bouchon choisir pour mon vin ?", "bouchon"), q("Quelle boucheuse choisir ?", "boucheuse"), q("Comment cacheter mes bouteilles à la cire ?", "cire")],
  bouteille: [q("Quel bouchon choisir pour mon vin ?", "bouchon"), q("Quelle boucheuse choisir ?", "boucheuse"), q("Quel rince-bouteille choisir ?", "rince-bouteille")],
  "nettoyage-bouteilles": [q("Quel égouttoir à bouteilles choisir ?", "egouttoir"), q("Quel bouchon choisir pour mon vin ?", "bouchon"), q("Quelle boucheuse choisir ?", "boucheuse")],
  bouchon: [q("Quelle boucheuse choisir ?", "boucheuse"), q("Comment cacheter mes bouteilles à la cire ?", "cire"), q("Quelles bouteilles vides proposez-vous ?", "bouteille")],
  bonde: [q("Quel barboteur choisir ?", "barboteur"), q("Quelle dame-jeanne ou quel fût choisir ?", "contenant")],
  boucheuse: [q("Quel bouchon choisir pour mon vin ?", "bouchon"), q("Quelles bouteilles vides proposez-vous ?", "bouteille"), q("Comment cacheter mes bouteilles à la cire ?", "cire")],
  "capsule-couronne": [q("Quelle capsuleuse choisir ?", "capsuleuse"), q("Quelles bouteilles champenoises proposez-vous ?", "bouteille-champenoise"), q("Quel pressoir choisir ?", "pressoir")],
  capsuleuse: [q("Quelles capsules couronne pour mes bouteilles de cidre ?", "capsule-couronne"), q("Quelles bouteilles champenoises proposez-vous ?", "bouteille-champenoise"), q("Quel pressoir choisir ?", "pressoir")],
  cire: [q("Quel bouchon choisir pour mon vin ?", "bouchon"), q("Quelles étiquettes proposez-vous ?", "etiquettes"), q("Quelle boucheuse choisir ?", "boucheuse")],
  "chauffe-cire": [q("Cire dure ou souple ?", "cire-dure"), q("Quel bouchon choisir pour mon vin ?", "bouchon")],

  // La fermentation et l'œnologie
  contenant: [q("Quel barboteur choisir ?", "barboteur"), q("Quelle bonde choisir pour ma dame-jeanne ?", "bonde"), q("Comment utiliser les mèches soufrées ?", "meche-soufree"), q("À quoi sert un mustimètre ?", "mustimetre")],
  barboteur: [q("Quelle dame-jeanne ou quel fût choisir ?", "contenant"), q("Quelle bonde choisir pour ma dame-jeanne ?", "bonde"), q("À quoi sert un mustimètre ?", "mustimetre")],
  mustimetre: [q("Quelle éprouvette graduée choisir ?", "eprouvette"), q("Quelle dame-jeanne ou quel fût choisir ?", "contenant"), q("Comment utiliser les mèches soufrées ?", "meche-soufree")],
  eprouvette: [q("À quoi sert un mustimètre ?", "mustimetre"), q("Quelle dame-jeanne ou quel fût choisir ?", "contenant")],
  "meche-soufree": [q("Quelle dame-jeanne ou quel fût choisir ?", "contenant"), q("Quel barboteur choisir ?", "barboteur")],

  // Le vinaigre
  vinaigre: [q("Quel vinaigrier choisir ?", "vinaigrier"), q("Où trouver une mère de vinaigre ?", "demarrer-vinaigre"), q("Quel vin utiliser pour faire du vinaigre ?", "vin-pour-vinaigre")],
  vinaigrier: [q("Quel robinet pour mon vinaigrier ?", "choix-robinet"), q("Où trouver une mère de vinaigre ?", "demarrer-vinaigre"), q("Quel bouchon pour mon vinaigrier ?", "bouchon-vinaigrier")],
  "robinet-vinaigrier": [q("Où trouver une mère de vinaigre ?", "demarrer-vinaigre"), q("Quel bouchon pour mon vinaigrier ?", "bouchon-vinaigrier")],
  "bouchon-vinaigrier": [q("Quel robinet pour mon vinaigrier ?", "choix-robinet"), q("Où trouver une mère de vinaigre ?", "demarrer-vinaigre")],
  "mere-vinaigre": [q("Quel vinaigrier choisir ?", "vinaigrier"), q("Quel vin utiliser pour faire du vinaigre ?", "vin-pour-vinaigre")],

  // Le cidre
  cidre: [q("Quel pressoir choisir ?", "pressoir"), q("Quel broyeur à pommes choisir ?", "broyeur"), q("Quelles capsules couronne pour mes bouteilles de cidre ?", "capsule-couronne"), q("Quelles bouteilles champenoises proposez-vous ?", "bouteille-champenoise")],
  pressoir: [q("Quel broyeur à pommes choisir ?", "broyeur"), q("Quelles capsules couronne pour mes bouteilles de cidre ?", "capsule-couronne"), q("Quelles bouteilles champenoises proposez-vous ?", "bouteille-champenoise")],
  broyeur: [q("Quel pressoir choisir ?", "pressoir"), q("Quelles capsules couronne pour mes bouteilles de cidre ?", "capsule-couronne"), q("Quelles bouteilles champenoises proposez-vous ?", "bouteille-champenoise")],

  // Les conserves
  conserve: [q("Quel stérilisateur choisir ?", "sterilisateur"), q("Quels bocaux choisir ?", "bocal"), q("Quels ustensiles de conserverie proposez-vous ?", "ustensiles-conserve")],
  sterilisateur: [q("Quels bocaux choisir ?", "bocal"), q("Quels ustensiles de conserverie proposez-vous ?", "ustensiles-conserve")],
  bocal: [q("Quel stérilisateur choisir ?", "sterilisateur"), q("Quels ustensiles de conserverie proposez-vous ?", "ustensiles-conserve")],
  confiture: [q("Quelle cuillère pour pot à confiture ?", "cuillere-confiture"), q("Quels bocaux choisir ?", "bocal"), q("Quel stérilisateur choisir ?", "sterilisateur")],

  // La cave et le service du vin
  cave: [q("Quel casier choisir pour mes bouteilles ?", "casier"), q("Comment choisir un hygromètre de cave ?", "hygrometrie"), q("Quels bouchons Pratic proposez-vous ?", "bouchon-pratic")],
  casier: [q("Comment choisir un hygromètre de cave ?", "hygrometrie"), q("Quel bouchon pour un vin de garde ?", "vin-de-garde"), q("Quels bouchons Pratic proposez-vous ?", "bouchon-pratic")],
  "service-vin": [q("Quels bouchons Pratic proposez-vous ?", "bouchon-pratic"), q("Quel casier choisir pour mes bouteilles ?", "casier")],
  "tire-bouchon": [q("Quels bouchons Pratic proposez-vous ?", "bouchon-pratic"), q("Quel casier choisir pour mes bouteilles ?", "casier")],

  // Les cadeaux et les professionnels
  cadeau: [q("Peut-on personnaliser des bouchons ?", "personnalisation"), q("Comment cacheter mes bouteilles à la cire ?", "cire"), q("Quel casier choisir pour mes bouteilles ?", "casier")],
};

// ─── Quand on ne vend pas ──────────────────────────────────────────────────
//
// Un client dont le colis est abîmé, le paiement refusé ou la commande bloquée
// n'a pas la tête à acheter : après ces sujets, aucun produit n'est proposé,
// seulement les questions de service liées au sujet.
export const SANS_VENTE: readonly string[] = [
  "produit-abime",
  "retour",
  "colis-introuvable",
  "confirmation-commande",
  "commande-en-attente",
  "paiement-refuse",
  "facture-incorrecte",
  "livraison-offerte-absente",
];
