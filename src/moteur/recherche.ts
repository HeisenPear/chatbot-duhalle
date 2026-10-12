// ═══════════════════════════════════════════════════════════════════════════
// LE FILET : UNE RECHERCHE PLEIN TEXTE DANS LES FAITS.
//
// Quand la question ne cite aucun concept (« c'est quoi les lenticelles ? »),
// on cherche les faits dont le texte contient ses mots. Score BM25 pour le
// classement ; la CONFIANCE est la part des mots de la question retrouvés,
// pondérée par leur rareté. Sous le seuil, on ne répond pas au hasard : on
// renvoie vers le service client.
// ═══════════════════════════════════════════════════════════════════════════
import type { BaseDeSavoir, Fait } from "../savoir/types";
import { corriger, MOTS_MAX, racines } from "./texte";

export interface FaitTrouve {
  readonly fait: Fait;
  /** Entre 0 et 1 : part (pondérée) des mots de la question présents dans le fait. */
  readonly confiance: number;
  readonly score: number;
}

interface Document {
  readonly fait: Fait;
  readonly tf: Map<string, number>;
  readonly longueur: number;
}

const POIDS_ALIAS = 2;
const K1 = 1.2;
const B = 0.6;

export class RechercheDansLesFaits {
  private readonly documents: Document[] = [];
  /** Pour chaque racine, les documents qui la contiennent : on ne lit que ceux-là, pas toute la base. */
  private readonly postings = new Map<string, Array<{ doc: number; tf: number }>>();
  private readonly df = new Map<string, number>();
  private readonly vocabulaire: Set<string>;
  private readonly longueurMoyenne: number;

  constructor(base: BaseDeSavoir) {
    const aliasParConcept = new Map(base.concepts.map((c) => [c.id, [c.libelle, ...c.alias].join(" ")]));
    for (const fait of base.faits) {
      const tf = new Map<string, number>();
      const ajouter = (texte: string, poids: number) => {
        for (const r of racines(texte)) tf.set(r, (tf.get(r) ?? 0) + poids);
      };
      ajouter(fait.enonce, 1);
      for (const id of fait.concepts) ajouter(aliasParConcept.get(id) ?? "", POIDS_ALIAS);
      let longueur = 0;
      const numero = this.documents.length;
      for (const [r, n] of tf) {
        longueur += n;
        this.df.set(r, (this.df.get(r) ?? 0) + 1);
        const liste = this.postings.get(r);
        if (liste) liste.push({ doc: numero, tf: n });
        else this.postings.set(r, [{ doc: numero, tf: n }]);
      }
      this.documents.push({ fait, tf, longueur });
    }
    this.vocabulaire = new Set(this.df.keys());
    this.longueurMoyenne = this.documents.reduce((s, d) => s + d.longueur, 0) / Math.max(1, this.documents.length);
  }

  private idf(racine: string): number {
    const n = this.documents.length;
    const df = this.df.get(racine) ?? 0;
    return Math.log(1 + (n - df + 0.5) / (df + 0.5));
  }

  chercher(texte: string, limite = 3): FaitTrouve[] {
    const mots = [...new Set(racines(texte).slice(0, MOTS_MAX).map((r) => corriger(r, this.vocabulaire) ?? r))];
    if (mots.length === 0) return [];
    // Un mot inconnu de toute la base pèse lourd : une question sur les
    // lasagnes ne doit pas ressortir sur la seule foi du mot « recette ».
    const poids = mots.map((m) => ({ m, idf: this.df.has(m) ? this.idf(m) : this.idf("\u0000") }));
    const masse = poids.reduce((s, p) => s + p.idf, 0);

    // Les mêmes sommes qu'en lisant toute la base, mais seuls les documents qui contiennent
    // au moins un mot de la question sont lus (une question de mots inventés n'en lit aucun).
    const scores = new Map<number, { score: number; retrouve: number }>();
    for (const { m, idf } of poids) {
      for (const { doc: numero, tf } of this.postings.get(m) ?? []) {
        const doc = this.documents[numero]!;
        const cumul = scores.get(numero) ?? { score: 0, retrouve: 0 };
        cumul.retrouve += idf;
        cumul.score += idf * ((tf * (K1 + 1)) / (tf + K1 * (1 - B + (B * doc.longueur) / this.longueurMoyenne)));
        scores.set(numero, cumul);
      }
    }
    // Dans l'ordre de la base : à confiance et score égaux, le premier fait reste devant.
    const resultats: FaitTrouve[] = [...scores.keys()]
      .sort((a, b) => a - b)
      .map((numero) => ({ fait: this.documents[numero]!.fait, confiance: scores.get(numero)!.retrouve / masse, score: scores.get(numero)!.score }))
      .filter((r) => r.score > 0);
    resultats.sort((a, b) => b.confiance - a.confiance || b.score - a.score);
    return resultats.slice(0, limite);
  }
}
