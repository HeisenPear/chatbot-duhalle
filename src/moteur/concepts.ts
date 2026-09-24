// ═══════════════════════════════════════════════════════════════════════════
// LES CONCEPTS CITÉS DANS UNE QUESTION, ET LEUR LIGNÉE.
//
// Chaque alias est réduit à ses racines (« bouchons en liège » → bouchon,
// lieg). Un alias est reconnu quand toutes ses racines sont dans la question,
// dans n'importe quel ordre, à peu près côte à côte. Les fautes de frappe sont
// corrigées contre le vocabulaire des alias.
//
// ⚠️ L'ALIAS LE PLUS LONG D'ABORD. « bouchon pour cidre » n'est pas
// « bouchon » suivi de « cidre » : lue mot à mot, la question citerait deux
// concepts. Une fois ses mots attribués, un alias plus court ne les relit que
// s'il apporte un mot nouveau.
// ═══════════════════════════════════════════════════════════════════════════
import type { BaseDeSavoir, Concept } from "../savoir/types";
import { corriger, normaliser, racines, racinesDeLaQuestion } from "./texte";

interface AliasIndexe {
  readonly concept: Concept;
  readonly racines: readonly string[];
  readonly longueur: number;
}

/** Tolérance : un alias de n mots peut s'étaler sur n + ECART positions. */
const ECART = 2;

export interface ConceptCite {
  readonly concept: Concept;
  /** Position du premier mot reconnu : les concepts sortent dans l'ordre de la phrase. */
  readonly position: number;
}

export class DetecteurDeConcepts {
  private readonly alias: AliasIndexe[] = [];
  private readonly vocabulaire = new Set<string>();
  private readonly parId = new Map<string, Concept>();
  private readonly formules: Array<{ concept: Concept; formule: string }> = [];

  constructor(base: BaseDeSavoir) {
    for (const concept of base.concepts) {
      this.parId.set(concept.id, concept);
      for (const f of concept.formules ?? []) this.formules.push({ concept, formule: ` ${normaliser(f)} ` });
      // Deux alias du même concept aux mêmes racines n'en font qu'un : on garde le plus long.
      const parCle = new Map<string, AliasIndexe>();
      for (const texte of [concept.libelle, ...concept.alias]) {
        const r = racines(texte);
        const cle = [...r].sort().join(" ");
        if (r.length === 0) continue;
        r.forEach((x) => this.vocabulaire.add(x));
        const deja = parCle.get(cle);
        if (!deja || texte.length > deja.longueur) parCle.set(cle, { concept, racines: r, longueur: texte.length });
      }
      this.alias.push(...parCle.values());
    }
  }

  get vocabulaireDesAlias(): ReadonlySet<string> {
    return this.vocabulaire;
  }

  concept(id: string): Concept | undefined {
    return this.parId.get(id);
  }

  /** Les racines de la question (mots niés exclus), corrigées quand un mot est inconnu. */
  racinesCorrigees(texte: string): string[] {
    return racinesDeLaQuestion(texte).map((r) => corriger(r, this.vocabulaire) ?? r);
  }

  /**
   * Les concepts cités, dans l'ordre de la phrase.
   *
   * À chaque tour, on retient la MEILLEURE correspondance restante : le plus
   * de mots d'abord, puis la plus compacte (« bouteilles debout » avant
   * « boucher les bouteilles » quand les mots sont éloignés), puis l'alias le
   * plus long. Un alias peut réutiliser un mot déjà attribué à un concept
   * PARENT (même famille, ou l'un dans la lignée de l'autre), s'il apporte au
   * moins un mot nouveau : dans « cire dure ou
   * souple », « cire » sert aux deux cires. Mais dans « tire-bouchon pour vieux
   * vin », le « bouchon » du tire-bouchon ne resservira pas à « bouchon vin ».
   */
  detecter(texte: string): ConceptCite[] {
    const mots = this.racinesCorrigees(texte);
    /** Le concept à qui chaque mot a été attribué. */
    const pris = new Array<Concept | undefined>(mots.length).fill(undefined);
    const trouves = new Map<string, ConceptCite>();

    // Les formules d'abord, mot pour mot sur la phrase normalisée.
    const forme = ` ${normaliser(texte)} `;
    for (const { concept, formule } of this.formules) {
      if (forme.includes(formule) && !trouves.has(concept.id)) trouves.set(concept.id, { concept, position: -1 });
    }

    // Seuls les alias dont tous les mots sont dans la question peuvent correspondre.
    const presents = new Set(mots);
    const possibles = this.alias.filter((alias) => alias.racines.every((r) => presents.has(r)));

    const utilises = new Set<AliasIndexe>();
    for (;;) {
      let meilleur: { alias: AliasIndexe; positions: number[]; etendue: number } | null = null;
      for (const alias of possibles) {
        if (utilises.has(alias) || trouves.has(alias.concept.id)) continue;
        const positions = this.trouver(alias, mots, pris);
        if (!positions) continue;
        const etendue = Math.max(...positions) - Math.min(...positions);
        if (
          !meilleur ||
          alias.racines.length > meilleur.alias.racines.length ||
          (alias.racines.length === meilleur.alias.racines.length &&
            (etendue < meilleur.etendue || (etendue === meilleur.etendue && alias.longueur > meilleur.alias.longueur)))
        ) {
          meilleur = { alias, positions, etendue };
        }
      }
      if (!meilleur) break;
      utilises.add(meilleur.alias);
      for (const p of meilleur.positions) pris[p] ??= meilleur.alias.concept;
      trouves.set(meilleur.alias.concept.id, { concept: meilleur.alias.concept, position: Math.min(...meilleur.positions) });
    }
    return [...trouves.values()].sort((a, b) => a.position - b.position);
  }

  /**
   * Cherche toutes les racines de l'alias dans une fenêtre de mots. Un mot
   * déjà attribué n'est utilisable que s'il appartient à un concept parent ;
   * il faut au moins un mot libre.
   */
  private trouver(alias: AliasIndexe, mots: readonly string[], pris: ReadonlyArray<Concept | undefined>): number[] | null {
    const utilisable = (i: number) => !pris[i] || this.parents(pris[i]!, alias.concept);
    const largeur = alias.racines.length + ECART;
    let meilleur: number[] | null = null;
    for (let debut = 0; debut < mots.length; debut++) {
      if (!alias.racines.includes(mots[debut]!)) continue;
      const positions: number[] = [];
      for (const racine of alias.racines) {
        let trouve = -1;
        for (let i = debut; i < Math.min(mots.length, debut + largeur); i++) {
          if (mots[i] !== racine || positions.includes(i) || !utilisable(i)) continue;
          if (trouve < 0 || (pris[trouve] && !pris[i])) trouve = i;
        }
        if (trouve < 0) break;
        positions.push(trouve);
      }
      if (positions.length !== alias.racines.length || positions.every((p) => pris[p])) continue;
      const etendue = Math.max(...positions) - Math.min(...positions);
      if (!meilleur || etendue < Math.max(...meilleur) - Math.min(...meilleur)) meilleur = positions;
    }
    return meilleur;
  }

  /** Même famille, ou l'un dans la lignée de l'autre (« bilame » et « tire-bouchon »). */
  private parents(a: Concept, b: Concept): boolean {
    if (a.famille !== undefined && a.famille === b.famille) return true;
    return this.lignee(a.id).some((c) => c.id === b.id) || this.lignee(b.id).some((c) => c.id === a.id);
  }

  /**
   * LA LIGNÉE d'un concept : lui, sa famille, la famille de sa famille…, du
   * plus spécifique au plus général. Un cycle ne boucle pas : on s'arrête au
   * premier concept déjà vu.
   */
  lignee(id: string): Concept[] {
    const out: Concept[] = [];
    const vus = new Set<string>();
    let courant = this.parId.get(id);
    while (courant && !vus.has(courant.id)) {
      out.push(courant);
      vus.add(courant.id);
      courant = courant.famille ? this.parId.get(courant.famille) : undefined;
    }
    return out;
  }

  /** Les concepts dont `id` est la famille directe. */
  enfants(id: string): Concept[] {
    return [...this.parId.values()].filter((c) => c.famille === id);
  }
}
