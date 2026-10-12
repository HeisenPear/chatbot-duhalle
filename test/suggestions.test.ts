// LES BOUTONS DE SUGGESTION ET LA VENTE ADDITIONNELLE.
//
// Les trois questions les plus posées de la base sont des boutons : ils servent
// à guider le client, mais aussi à lui montrer d'autres produits (voir
// src/savoir/ventes.ts). Ces tests vérifient que chaque bouton mène à une vraie
// réponse, que la liste reste courte, qu'elle ne répète pas ce que le client vient
// de demander, et qu'un client mécontent ne reçoit aucune proposition de produit.
import { describe, expect, it } from "vitest";
import { Assistant } from "../src/moteur/assistant";
import { REGLAGES } from "../src/savoir/coordonnees";
import { BASE } from "../src/savoir/index";
import { COMPLEMENTS, QUESTIONS_DE_DEPART, SANS_VENTE, VITRINE } from "../src/savoir/ventes";

const assistant = new Assistant(BASE, REGLAGES);
const ids = new Set(BASE.concepts.map((c) => c.id));

const TOUTES = [...VITRINE, ...Object.values(COMPLEMENTS).flat()];
const QUESTIONS_DE_VENTE = new Set(TOUTES.map((t) => t.question));

describe("la liste des suggestions", () => {
  it("ne cite que des concepts qui existent", () => {
    for (const cle of Object.keys(COMPLEMENTS)) expect(ids.has(cle), `complément de « ${cle} »`).toBe(true);
    for (const id of SANS_VENTE) expect(ids.has(id), `sans vente : ${id}`).toBe(true);
    for (const { question, concept } of TOUTES) expect(ids.has(concept), `${question} → ${concept}`).toBe(true);
  });

  it("propose cinq questions de départ au plus (le widget n'en affiche pas plus)", () => {
    expect(QUESTIONS_DE_DEPART.length).toBeLessThanOrEqual(5);
    expect(new Set(QUESTIONS_DE_DEPART).size).toBe(QUESTIONS_DE_DEPART.length);
    expect(QUESTIONS_DE_DEPART[0]).toBe("Quel bouchon choisir pour mon vin ?");
    expect(QUESTIONS_DE_DEPART).toContain("Suivre ma commande");
    expect(QUESTIONS_DE_DEPART).toContain("Quels sont les frais de livraison ?");
  });

  it("répond à chaque question de départ", () => {
    for (const question of QUESTIONS_DE_DEPART) {
      const reponse = assistant.repondre(question);
      expect(reponse.nature, question).toBe("reponse");
      expect(reponse.trace.faits.length, question).toBeGreaterThan(0);
    }
  });

  it("répond à chaque question de la vitrine et des compléments, sur le concept annoncé", () => {
    for (const { question, concept } of TOUTES) {
      const reponse = assistant.repondre(question);
      expect(reponse.nature, question).toBe("reponse");
      expect(reponse.trace.concepts, question).toContain(concept);
    }
  });

  it("est écrite comme le reste du chatbot : vouvoiement, sans emoji, en français, sans Lafitte", () => {
    const tutoiement = /(?<!\p{L})(?:tu|toi|ton|ta|tes|te|t')(?!\p{L})/iu;
    const emoji = /\p{Extended_Pictographic}/u;
    for (const question of [...QUESTIONS_DE_DEPART, ...QUESTIONS_DE_VENTE]) {
      expect(question, question).not.toMatch(tutoiement);
      expect(question, question).not.toMatch(emoji);
      expect(question, question).not.toMatch(/lafitte|\bsending\b/i);
      expect(question.length, question).toBeLessThanOrEqual(120);
    }
  });
});

describe("les boutons proposés après une réponse", () => {
  const libelles = BASE.concepts.map((c) => c.libelle).filter((l) => !/\bsending\b/i.test(l));

  it("sont au plus quatre, sans doublon, et ne répètent pas la question posée", () => {
    for (const question of [...libelles, ...QUESTIONS_DE_DEPART, ...QUESTIONS_DE_VENTE]) {
      const { suggestions } = assistant.repondre(question);
      expect(suggestions.length, question).toBeLessThanOrEqual(4);
      expect(new Set(suggestions).size, question).toBe(suggestions.length);
      expect(suggestions, question).not.toContain(question);
    }
  });

  it("mènent tous à une vraie réponse", () => {
    for (const question of [...libelles, ...QUESTIONS_DE_DEPART, "azertyuiop", "bonjour", "quels bouchons vendez-vous ?"]) {
      for (const suggestion of assistant.repondre(question).suggestions) {
        expect(assistant.repondre(suggestion).nature, `« ${question} » → « ${suggestion} »`).toBe("reponse");
      }
    }
  });

  it("proposent un autre produit après une question sur un produit", () => {
    const { suggestions } = assistant.repondre("Quel bouchon choisir pour mon vin ?");
    expect(suggestions).toContain("Quelle boucheuse choisir ?");
    expect(suggestions).toContain("Comment cacheter mes bouteilles à la cire ?");
    expect(suggestions).not.toContain("Quel bouchon choisir pour mon vin ?");
  });

  it("choisissent le complément selon le sujet traité, pas selon un mot de la question", () => {
    // « robinet » rappelle le vinaigrier, mais la réponse parle du fût.
    const fut = assistant.repondre("Quel est le diamètre du robinet code D5 pour fut plastique 50 L").suggestions;
    expect(fut).toContain("Quel barboteur choisir ?");
    expect(fut.join(" ")).not.toMatch(/vinaigr/i);
    // Un client du vinaigrier se voit proposer la mère, le bouchon du vinaigrier, le vin de départ.
    const vinaigrier = assistant.repondre("mon robinet de vinaigrier fuit").suggestions.join(" ");
    expect(vinaigrier).toMatch(/mère de vinaigre/);
  });

  it("ne laissent plus une impasse après un produit", () => {
    expect(assistant.repondre("Quel pressoir choisir ?").suggestions.length).toBeGreaterThanOrEqual(3);
    expect(assistant.repondre("Quel stérilisateur choisir ?").suggestions.length).toBeGreaterThanOrEqual(3);
  });

  it("montrent la vitrine après une question de service", () => {
    for (const question of ["Quels sont les frais de livraison ?", "Suivre ma commande", "Comment contacter le service client ?", "moyens de paiement"]) {
      const { suggestions } = assistant.repondre(question);
      expect(
        suggestions.some((s) => QUESTIONS_DE_VENTE.has(s)),
        `${question} → ${suggestions.join(" | ")}`,
      ).toBe(true);
    }
  });

  it("ne proposent aucun produit à un client dont la commande pose problème", () => {
    for (const question of [
      "mon colis est arrivé cassé",
      "ma carte est refusée",
      "ma commande n'est toujours pas expédiée",
      "colis annoncé livré mais introuvable",
      "commande passée mais introuvable",
      "comment retourner un produit",
      "pourquoi la livraison gratuite n'apparait pas",
      "la facture est incorrecte",
    ]) {
      const { suggestions } = assistant.repondre(question);
      expect(
        suggestions.filter((s) => QUESTIONS_DE_VENTE.has(s)),
        `${question} → ${suggestions.join(" | ")}`,
      ).toEqual([]);
    }
  });

  it("restent vides pour un client en colère, et proposent les questions de départ à qui n'est pas compris", () => {
    expect(assistant.repondre("tu nesers à rien").suggestions).toEqual([]);
    expect(assistant.repondre("e").suggestions).toEqual(QUESTIONS_DE_DEPART);
  });

  it("tiennent dans le widget : cinq boutons de 120 caractères au plus", () => {
    for (const question of [...libelles, ...QUESTIONS_DE_DEPART, ...QUESTIONS_DE_VENTE]) {
      const { suggestions } = assistant.repondre(question);
      expect(suggestions.length, question).toBeLessThanOrEqual(5);
      for (const s of suggestions) expect(s.length, s).toBeLessThanOrEqual(120);
    }
  });
});
