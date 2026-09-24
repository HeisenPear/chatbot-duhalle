// La base de connaissances complète, assemblée et vérifiée au démarrage.
import type { BaseDeSavoir, Concept, Fait } from "./types";
import { ASPECTS } from "./types";
import { bouchage } from "./bouchage";
import { caveService } from "./cave-service";
import { cidre } from "./cidre";
import { cire } from "./cire";
import { commande } from "./commande";
import { conserves } from "./conserves";
import { droguerie } from "./droguerie";
import { entreprise } from "./entreprise";
import { miseEnBouteille } from "./mise-en-bouteille";
import { vinaigre } from "./vinaigre";

const RUBRIQUES = [entreprise, commande, miseEnBouteille, bouchage, cire, caveService, cidre, vinaigre, conserves, droguerie];

/**
 * Les défauts de la base : ids en double, familles ou concepts inconnus,
 * cycles de familles, liens non https. Une base mal formée ne plante pas :
 * elle répond de travers. Les tests exigent donc une liste vide.
 */
export function defautsDeLaBase(base: BaseDeSavoir): string[] {
  const defauts: string[] = [];
  const ids = new Map<string, Concept>();
  for (const c of base.concepts) {
    if (ids.has(c.id)) defauts.push(`concept en double : ${c.id}`);
    ids.set(c.id, c);
  }
  for (const c of base.concepts) {
    if (c.famille && !ids.has(c.famille)) defauts.push(`famille inconnue « ${c.famille} » pour ${c.id}`);
    for (const v of c.voirAussi ?? []) if (!ids.has(v)) defauts.push(`voirAussi inconnu « ${v} » pour ${c.id}`);
    if (c.lien && !c.lien.url.startsWith("https://")) defauts.push(`lien non https pour ${c.id}`);
    // Une famille qui boucle rendrait la lignée infinie.
    const vus = new Set<string>();
    let courant: Concept | undefined = c;
    while (courant?.famille) {
      if (vus.has(courant.id)) {
        defauts.push(`cycle de familles à partir de ${c.id}`);
        break;
      }
      vus.add(courant.id);
      courant = ids.get(courant.famille);
    }
  }
  const faits = new Set<string>();
  for (const f of base.faits) {
    if (faits.has(f.id)) defauts.push(`fait en double : ${f.id}`);
    faits.add(f.id);
    for (const c of f.concepts) if (!ids.has(c)) defauts.push(`concept inconnu « ${c} » dans le fait ${f.id}`);
    if (!ASPECTS.includes(f.aspect)) defauts.push(`aspect inconnu dans ${f.id}`);
    if (!f.source) defauts.push(`fait sans source : ${f.id}`);
    for (const l of f.liens ?? []) if (!l.url.startsWith("https://")) defauts.push(`lien non https dans ${f.id}`);
  }
  return defauts;
}

const concepts: Concept[] = RUBRIQUES.flatMap((r) => r.concepts);
const faits: Fait[] = RUBRIQUES.flatMap((r) => r.faits);

export const BASE: BaseDeSavoir = { concepts, faits };
