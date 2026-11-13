// Les caractéristiques d'une question pour le classifieur : des morceaux de mots de 2 à 5 lettres, repliés par hachage.
// Partagé entre le script d'entraînement (scripts/entrainer-classifieur.mjs) et le Worker : les deux doivent calculer
// exactement les mêmes colonnes.

/** FNV-1a sur 32 bits. */
function hacher(texte: string): number {
  let h = 0x811c9dc5;
  for (let i = 0; i < texte.length; i++) {
    h ^= texte.charCodeAt(i);
    h = Math.imul(h, 0x01000193) >>> 0;
  }
  return h;
}

/**
 * Les colonnes (et leur valeur) d'une question normalisée : chaque morceau de `nMin` à `nMax` lettres de « _forme_ »
 * est replié sur une colonne ; le vecteur est normalisé en norme 2.
 */
export function fonctionsDeLaQuestion(forme: string, colonnes: number, nMin: number, nMax: number): Array<[number, number]> {
  const texte = `_${forme.replace(/ +/g, "_")}_`;
  const presents = new Set<number>();
  for (let n = nMin; n <= nMax; n++) {
    for (let i = 0; i + n <= texte.length; i++) presents.add(hacher(texte.slice(i, i + n)) % colonnes);
  }
  const valeur = 1 / Math.sqrt(Math.max(1, presents.size));
  return [...presents].sort((a, b) => a - b).map((c) => [c, valeur]);
}
