// ═══════════════════════════════════════════════════════════════════════════
// LES MESURES DES FICHES PRODUITS.
//
// « Quelle est la hauteur de l'éprouvette graduée 250 ml ? », « dimensions du
// casier ? » : une question sur cinq demande une mesure d'un article précis
// (bilan d'octobre-novembre 2026). Les faits de la base disent comment choisir,
// pas les cotes de chacun des 360 articles. Les fiches (src/savoir/fiches-produits.ts,
// tirées du flux produits d'Oxatis) les donnent : on reconnaît l'article cité
// par les mots de son nom, et on répond avec les lignes de sa fiche qui donnent
// une mesure.
//
// Reconnaître l'article : chaque mot de la question présent dans des noms
// d'articles pèse selon sa rareté parmi ces noms (« éprouvette » pèse lourd,
// « bouteille » peu). Un article n'est retenu que s'il partage avec la question
// assez de mots rares, et nettement plus que le suivant ; à quasi-égalité, on
// cite les articles en tête (trois au plus) avec leurs mesures.
// ═══════════════════════════════════════════════════════════════════════════
import type { FicheProduit } from "../savoir/types";
import { normaliser, racines, racinesDeLaQuestion } from "./texte";

/** Les mots de la question qui disent QUELLE mesure, pas QUEL article : ils ne servent pas à reconnaître l'article. */
const MOTS_DE_MESURE = new Set(
  racines(
    "hauteur largeur longueur profondeur diametre dimension dimensions taille tailles contenance capacite epaisseur poids volume mesure mesures cote cotes format grand grande petit petite modele article produit fiche quelle quel combien fait mesure exactement environ",
  ),
);

/** Ce qui précède le mot de tête dans un nom : le conditionnement ou un adjectif (« Lot de 10 », « Sachet de 40 », « Grand »). */
const MOTS_D_EMBALLAGE = new Set(racines("lot sachet set kit coffret pack paquet boite carton rouleau grand grande petit petite gros grosse mini nouveau nouvelle"));

export interface ArticleTrouve {
  readonly fiche: FicheProduit;
  readonly score: number;
  /** Les mots de la question retrouvés dans le nom de l'article. */
  readonly mots: readonly string[];
}

export interface ArticlesReconnus {
  /** Un article nettement en tête, ou bien les articles à quasi-égalité (trois au plus). */
  readonly articles: readonly ArticleTrouve[];
  readonly certain: boolean;
  /** Le mot de tête (en racine) des articles retenus : « grill », « dam », « vinaigri ». */
  readonly tete?: string;
}

/** Sous ce score (somme des raretés des mots partagés), aucun article n'est assez cité. */
const SCORE_MIN = 3.2;
/** Le suivant doit rester sous cette part du premier pour que le premier soit retenu seul. */
const MARGE = 0.8;
const MAX_ARTICLES = 3;

export class FichesProduits {
  private readonly nomsEnRacines: ReadonlyArray<ReadonlySet<string>>;
  /** Le mot de tête de chaque nom (« Grille » dans « Grille pour Hachoir… », « Bouchon » dans « Lot de 10 Bouchons… »). */
  private readonly tetes: ReadonlyArray<string | undefined>;
  private readonly idf = new Map<string, number>();

  constructor(private readonly fiches: readonly FicheProduit[]) {
    this.nomsEnRacines = fiches.map((f) => new Set(racines(f.nom)));
    this.tetes = fiches.map((f) => racines(f.nom).find((r) => !/\d/.test(r) && !MOTS_D_EMBALLAGE.has(r)));
    const df = new Map<string, number>();
    for (const mots of this.nomsEnRacines) for (const m of mots) df.set(m, (df.get(m) ?? 0) + 1);
    const n = fiches.length;
    for (const [m, d] of df) this.idf.set(m, Math.log(1 + n / d));
  }

  /**
   * Les mots qui ne sont cités que comme destination d'un autre article (« un bouchon pour une bouteille », « un robinet pour mon
   * vinaigrier ») : la question porte sur cet autre article. « Quelle hauteur pour le seau ? » n'a pas d'autre article : le seau
   * reste l'article demandé.
   */
  private destinationsDe(question: string): Set<string> {
    const mots = normaliser(question).split(" ").filter(Boolean);
    const apresPour = new Set<string>();
    const ailleurs = new Set<string>();
    for (let i = 0; i < mots.length; i++) {
      const r = racines(mots[i]!)[0];
      if (!r) continue;
      let j = i - 1;
      while (j >= 0 && ARTICLES.has(mots[j]!)) j--;
      let k = j - 1;
      while (k >= 0 && ARTICLES.has(mots[k]!)) k--;
      const avant = k >= 0 ? racines(mots[k]!)[0] : undefined;
      const destination = j >= 0 && mots[j] === "pour" && !!avant && this.idf.has(avant) && !MOTS_DE_MESURE.has(avant);
      (destination ? apresPour : ailleurs).add(r);
    }
    return new Set([...apresPour].filter((r) => !ailleurs.has(r)));
  }

  /** Les articles que la question cite par leur nom. */
  reconnaitre(question: string): ArticlesReconnus {
    const mots = [...new Set(racinesDeLaQuestion(question))].filter((m) => this.idf.has(m) && !MOTS_DE_MESURE.has(m));
    if (mots.length === 0) return { articles: [], certain: false };
    const nombres = mots.filter((m) => /^\d/.test(m));
    const destinations = this.destinationsDe(question);
    const trouves: ArticleTrouve[] = [];
    this.fiches.forEach((fiche, i) => {
      const nom = this.nomsEnRacines[i]!;
      const communs = mots.filter((m) => nom.has(m));
      // L'article doit être cité par son mot de tête : « goulot » ne désigne pas les « Étiquettes de Goulot », ni « 70 mm » la
      // « Bonde Ø 70 mm ».
      const tete = this.tetes[i];
      if (!tete || !communs.includes(tete)) return;
      // « Quelle taille de bouchon pour une bouteille de 75 cl ? » : la bouteille est la destination, pas l'article demandé.
      if (destinations.has(tete)) return;
      // « des bouteilles de 25 cl » ne désigne pas la « Bouteille 75 cl » : un nombre de la question doit se retrouver dans un nom
      // qui en donne.
      if (nombres.length > 0 && [...nom].some((m) => /^\d/.test(m)) && !nombres.some((n) => nom.has(n))) return;
      const score = communs.reduce((s, m) => s + this.idf.get(m)!, 0);
      trouves.push({ fiche, score, mots: communs });
    });
    trouves.sort((a, b) => b.score - a.score || a.fiche.nom.length - b.fiche.nom.length);
    const premier = trouves[0];
    if (!premier || premier.score < SCORE_MIN) return { articles: [], certain: false };
    const proches = trouves.filter((t) => t.score >= premier.score * MARGE);
    const tete = this.tetes[this.fiches.indexOf(premier.fiche)]!;
    if (proches.length === 1) return { articles: [premier], certain: true, tete };
    // Plus de trois articles à égalité (« le robinet en bois » : quinze robinets) : la question ne désigne aucun article.
    if (proches.length > MAX_ARTICLES) return { articles: [], certain: false };
    // À égalité, les articles doivent être de la même sorte (trois dames-jeannes de 25 L, pas un robinet et deux vinaigriers) :
    // sinon la question porte sur l'un en citant l'autre, et la base répond mieux.
    if (proches.some((p) => this.tetes[this.fiches.indexOf(p.fiche)] !== tete)) return { articles: [], certain: false };
    return { articles: proches.slice(0, MAX_ARTICLES), certain: false, tete };
  }
}

const ARTICLES = new Set(["un", "une", "le", "la", "les", "l", "des", "du", "mon", "ma", "mes", "votre", "vos", "ce", "cette", "ces"]);

/** « 5,25 litres », « Ø 29 mm » : un nombre suivi d'une unité, dans un nom d'article. */
export function nomDonneUneMesure(nom: string): boolean {
  return /\d (?:mm|cm|m|ml|cl|l|litres?|kg|g)\b/.test(normaliser(nom)) || /Ø/.test(nom);
}

/**
 * Ce que la question mesure, et comment le reconnaître dans une ligne de fiche. « Dimensions », « taille », « mesures » : toute
 * ligne de mesure convient.
 */
const MESURES_DEMANDEES: ReadonlyArray<{ question: RegExp; fiche: RegExp }> = [
  { question: / (?:hauteurs?|haut) /, fiche: /haut|\(h\)/i },
  { question: / (?:largeurs?|large) /, fiche: /larg|dimension|dim\b|\d\s*x\s*\d/i },
  { question: / (?:longueurs?|long) /, fiche: /long|dimension|dim\b|\d\s*x\s*\d/i },
  { question: / (?:profondeurs?|profond) /, fiche: /profond|dimension|dim\b|\d\s*x\s*\d/i },
  { question: / (?:diametres?|ø) /, fiche: /diam|Ø/i },
  { question: / (?:epaisseurs?|epais) /, fiche: /[ée]paiss/i },
  { question: / (?:contenances?|capacites?|volume|combien de litres) /, fiche: /contenance|capacit|volume|\d\s*(?:l|litres?|cl|ml)\b/i },
  { question: / (?:poids|pese) /, fiche: /poids|\d\s*(?:kg|g)\b/i },
];

/** La fiche donne-t-elle la mesure que la question demande ? (`forme` : la question normalisée.) */
export function ficheDonneLaMesure(fiche: FicheProduit, forme: string): boolean {
  if (fiche.mesures.length === 0) return false;
  const demandees = MESURES_DEMANDEES.filter((m) => m.question.test(` ${forme} `));
  return demandees.length === 0 || demandees.some((m) => fiche.mesures.some((l) => m.fiche.test(l)));
}
