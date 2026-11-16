// Les informations commerciales qui peuvent changer : un seul endroit à
// mettre à jour. Relevées le 24/09/2026 sur les extraits du site ; à faire
// valider par Duhallé avant la mise en ligne (voir README).
import type { Reglages } from "../moteur/assistant";
import { PAGES } from "./liens";
import { COMPLEMENTS, QUESTIONS_DE_DEPART, SANS_VENTE, VITRINE } from "./ventes";

export const TELEPHONE = "02 47 53 00 26";
export const EMAIL = "contact@duhalle-boutique.fr";

/**
 * La boutique de la Bouchonnerie Jocondienne, dont Duhallé fait partie : adresse, téléphone et horaires de la fiche Google de
 * l'établissement, communiqués par l'équipe Duhallé le 16/11/2026. (Le registre du commerce donne « 7B » pour le siège ; la fiche
 * Google, « 7 ».) Le retrait sur place reste à définir avec le service client.
 */
export const BOUTIQUE = {
  adresse: "7 rue des Artisans, 37300 Joué-lès-Tours",
  telephone: "02 47 87 53 44",
  horaires: "du lundi au vendredi de 9h à 12h et de 14h à 18h, fermée le samedi et le dimanche",
} as const;

/** Horaires du service client, relevés le 28/09/2026 sur la page Contact et le pied de page du site. */
export const HORAIRES = {
  lundiJeudi: "9h à 12h et de 14h à 18h",
  vendredi: "9h à 12h et de 14h à 16h",
} as const;

/**
 * Seuils de livraison offerte en France continentale, par transporteur. Confirmés par l'équipe Duhallé le
 * 12/10/2026 : 69 € (DPD) et 79 € (Colissimo) hors articles lourds et volumineux ; 150 € (Geodis) pour tous
 * les produits, sauf les pressoirs, exclus de la livraison offerte.
 */
export const LIVRAISON_OFFERTE = {
  dpd: "69 €",
  colissimo: "79 €",
  geodis: "150 €",
} as const;

export const REGLAGES: Reglages = {
  telephone: TELEPHONE,
  email: EMAIL,
  contact: PAGES.contact,
  questionsDeDepart: QUESTIONS_DE_DEPART,
  vitrine: VITRINE,
  complements: COMPLEMENTS,
  sansVente: SANS_VENTE,
  conceptRacine: "catalogue",
};
