// Petits outils pour écrire la base sans répéter la plomberie : chaque fichier
// de rubrique crée ses concepts et ses faits avec `rubrique()`.
import type { Aspect, Concept, Fait, Lien } from "./types";

export const SITE = "https://www.duhalle-boutique.fr";

/** Un lien vers une page du site Duhallé. */
export function page(chemin: string, libelle: string): Lien {
  return { libelle, url: `${SITE}${chemin}` };
}

/** Source des faits de savoir-faire général (et non propres à Duhallé). */
export const SAVOIR_FAIRE = "Savoir-faire général (vinification, cidrerie et conserverie amateur)";

/** Date de la dernière relecture des faits de la base. */
export const VERIFIE_LE = "2026-09-24";

interface OptionsDeConcept {
  famille?: string;
  formules?: string[];
  lien?: Lien;
  voirAussi?: string[];
}

interface OptionsDeFait {
  liens?: Lien[];
  /** Par défaut, la source de la rubrique. */
  source?: string;
}

export interface Rubrique {
  readonly concepts: Concept[];
  readonly faits: Fait[];
  concept(id: string, libelle: string, alias: string[], options?: OptionsDeConcept): void;
  fait(concepts: string | string[], aspect: Aspect, enonce: string, options?: OptionsDeFait): void;
}

/**
 * Crée une rubrique de la base.
 * @param sourceParDefaut la source des faits qui n'en précisent pas
 */
export function rubrique(sourceParDefaut: string): Rubrique {
  const concepts: Concept[] = [];
  const faits: Fait[] = [];
  const compteurs = new Map<string, number>();
  return {
    concepts,
    faits,
    concept(id, libelle, alias, options = {}) {
      concepts.push({ id, libelle, alias, ...options });
    },
    fait(ids, aspect, enonce, options = {}) {
      const liste = typeof ids === "string" ? [ids] : ids;
      const cle = `${liste.join("+")}.${aspect}`;
      const n = (compteurs.get(cle) ?? 0) + 1;
      compteurs.set(cle, n);
      faits.push({
        id: n === 1 ? cle : `${cle}.${n}`,
        concepts: liste,
        aspect,
        enonce: enonce.trim().replace(/\n[ \t]+/g, "\n"),
        ...(options.liens ? { liens: options.liens } : {}),
        source: options.source ?? sourceParDefaut,
        verifieLe: VERIFIE_LE,
      });
    },
  };
}
