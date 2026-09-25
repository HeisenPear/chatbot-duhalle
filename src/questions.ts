/** Durée de conservation des questions qui n'ont pas été retenues. */
const RETENTION_JOURS = 90;
/** Même borne que l'API : aucune question stockée ne peut la dépasser. */
const LONGUEUR_MAX = 500;

/**
 * Retire les principaux identifiants qu'un client pourrait saisir librement.
 * La valeur brute n'est ensuite ni conservée ni journalisée.
 */
export function anonymiser(question: string): string {
  return question
    .replace(/\bhttps?:\/\/[^\s]+|\bwww\.[^\s]+/giu, "[lien]")
    .replace(/[^\s@]+@[^\s@]+/giu, "[e-mail]")
    .replace(/\b(?:\d{1,3}\.){3}\d{1,3}\b/g, "[adresse IP]")
    .replace(/\bFR\d{2}(?:[\s-]?[A-Z0-9]){23}\b/giu, "[IBAN]")
    .replace(
      /\b((?:commande|colis|dossier|client|facture|r[eé]f(?:[eé]rence)?))\s*(?:n[°o]\s*)?[:#-]?\s*(?=[a-z0-9._\/-]*\d)[a-z0-9][a-z0-9._\/-]{3,}\b/giu,
      "$1 [référence]",
    )
    .replace(
      /\b\d{1,4}\s*(?:bis|ter)?\s+(?:rue|avenue|av\.?|boulevard|bd\.?|chemin|route|impasse|all[eé]e|place|quai)(?:\s+[\p{L}\p{M}'’.-]+){1,6}/giu,
      "[adresse]",
    )
    .replace(/\b(?:0[1-9]|[1-8]\d|9[0-8])\d{3}\b/g, "[code postal]")
    .replace(
      /\b(je m['’]appelle|mon nom est|moi(?:,|\s)+c['’]est)\s+[\p{L}\p{M}'’-]+(?:\s+[\p{L}\p{M}'’-]+)?/giu,
      "$1 [nom]",
    )
    // Six chiffres ou plus : un format de bouchon (« 45 x 24 ») reste lisible.
    .replace(/\+?\d[\d\s.\-/]*\d/g, (n) => (n.replace(/\D/g, "").length >= 6 ? "[numéro]" : n))
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, LONGUEUR_MAX);
}

/**
 * Insère une question anonymisée ou incrémente son compteur. Une seule
 * écriture par question : la purge des anciennes passe par une tâche
 * planifiée quotidienne (voir purgerQuestions).
 */
export async function enregistrerQuestion(
  db: D1Database,
  question: string,
  nature: string,
  maintenant = new Date(),
): Promise<void> {
  const questionAnonyme = anonymiser(question);
  if (!questionAnonyme) return;

  const jour = maintenant.toISOString().slice(0, 10);
  await db
    .prepare(
      `INSERT INTO questions_chatbot
        (question, premier_jour, dernier_jour, occurrences, nature_derniere, statut)
       VALUES (?, ?, ?, 1, ?, 'a_revoir')
       ON CONFLICT(question) DO UPDATE SET
         dernier_jour = excluded.dernier_jour,
         occurrences = questions_chatbot.occurrences + 1,
         nature_derniere = excluded.nature_derniere`,
    )
    .bind(questionAnonyme, jour, jour, nature)
    .run();
}

/**
 * Supprime les questions encore à trier ou ignorées, vues pour la dernière
 * fois il y a plus de RETENTION_JOURS jours. Les questions retenues ou
 * intégrées sont gardées. Lancée une fois par jour (tâche planifiée) : faite
 * à chaque question, elle relirait toute la table à chaque fois.
 */
export async function purgerQuestions(db: D1Database): Promise<number> {
  const resultat = await db
    .prepare(
      `DELETE FROM questions_chatbot
       WHERE dernier_jour < date('now', '-${RETENTION_JOURS} days')
         AND statut IN ('a_revoir', 'ignoree')`,
    )
    .run();
  return resultat.meta.changes ?? 0;
}
