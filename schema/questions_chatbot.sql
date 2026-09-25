-- Table D1 des questions posées au chatbot (base « chatbot-duhalle », binding QUESTIONS_DB).
-- Déjà créée en production ; ce fichier la décrit et permet de la recréer :
--   npx wrangler d1 execute chatbot-duhalle --remote --file schema/questions_chatbot.sql
--
-- Une ligne par question anonymisée (src/questions.ts), avec son nombre d'occurrences.
-- statut : a_revoir (nouvelle), retenue (à ajouter à la base), ignoree, integree (ajoutée).
-- Les questions a_revoir et ignoree sont purgées 90 jours après leur dernière apparition
-- (tâche planifiée quotidienne du Worker).
CREATE TABLE IF NOT EXISTS questions_chatbot (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  question TEXT NOT NULL UNIQUE,
  premier_jour TEXT NOT NULL,
  dernier_jour TEXT NOT NULL,
  occurrences INTEGER NOT NULL DEFAULT 1
    CHECK (occurrences >= 1),
  nature_derniere TEXT,
  statut TEXT NOT NULL DEFAULT 'a_revoir'
    CHECK (statut IN ('a_revoir', 'retenue', 'ignoree', 'integree')),
  reponse_validee TEXT
);
CREATE INDEX IF NOT EXISTS idx_questions_chatbot_statut ON questions_chatbot (statut);
CREATE INDEX IF NOT EXISTS idx_questions_chatbot_occurrences ON questions_chatbot (occurrences DESC);

-- Les questions les plus fréquentes restées sans réponse, à traiter en priorité :
--   SELECT question, occurrences, dernier_jour FROM questions_chatbot
--   WHERE statut = 'a_revoir' AND nature_derniere IN ('inconnu', 'recherche')
--   ORDER BY occurrences DESC LIMIT 50;
