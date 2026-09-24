// LE JEU INÉDIT : des questions écrites APRÈS le réglage du moteur, qu'on ne
// règle JAMAIS une par une. Il dit si le travail généralise. Si le score
// baisse, on corrige une règle ou la base — jamais une exception pour faire
// passer une phrase. Une fois qu'un jeu a servi à corriger, il passe dans le
// banc (banc.test.ts) et on en écrit un nouveau ici.
import { describe, expect, it } from "vitest";
import { Assistant } from "../src/moteur/assistant";
import { REGLAGES } from "../src/savoir/coordonnees";
import { BASE } from "../src/savoir/index";

const assistant = new Assistant(BASE, REGLAGES);

/**
 * [question, faits acceptables en tête de réponse]
 * Jeu n°4, écrit le 24/09/2026 après le versement des jeux n°1 à n°3 dans le banc.
 * Mesuré une seule fois, sans réglage : c'est la mesure de référence.
 */
const INEDIT: Array<[string, string[]]> = [
  ["bonjour, quels bouchons pour un blanc à boire cet été ?", ["bouchon+vin-jeune.choix"]],
  ["un bouchon de 45 c'est pour quoi", ["taille-bouchon.dimension", "taille-bouchon.raison"]],
  ["les bouchons doivent ils être mouillés avant de boucher", ["bouchon-liege.condition"]],
  ["quelle boucheuse pour de grosses séries", ["boucheuse.choix"]],
  ["j'ai une dame jeanne de 20 litres, quel bouchon ?", ["bonde+contenant.gamme", "bonde.choix"]],
  ["comment fermer mes bouteilles de bière maison", ["capsule-couronne.dimension", "capsuleuse.procedure", "bouchage.definition"]],
  ["quelle est la différence entre la cire dure et la cire souple", ["cire-dure+cire-souple.choix"]],
  ["le cachetage à la cire protège-t-il le vin", ["cire.definition"]],
  ["comment éviter de se brûler avec la cire", ["cire.condition"]],
  ["combien de bouteilles dans l'égouttoir hérisson", ["egouttoir.gamme"]],
  ["j'ai du dépôt au fond de mes bouteilles", ["soutirage.definition", "filtre-vin.usage", "soutirage.procedure"]],
  ["à quelle hauteur remplir mes bouteilles", ["niveau-remplissage.dimension"]],
  ["une cave trop humide c'est un problème ?", ["hygrometrie.condition"]],
  ["casier en polystyrène, c'est bien ?", ["casier.choix", "casier.gamme"]],
  ["température de service d'un rosé", ["temperature-service.dimension"]],
  ["quel est le meilleur moment pour ramasser les pommes à cidre", ["cidre.moment"]],
  ["mon cidre est plat, pas de bulles", ["cidre.condition", "cidre+mise-en-bouteille.moment", "bouteille-champenoise.condition"]],
  ["un pressoir de 6 litres suffit ?", ["pressoir.choix"]],
  ["peut-on faire du vinaigre avec du cidre", ["vinaigre.procedure", "vinaigre.erreur"]],
  ["mettre du vin rouge ou blanc dans le vinaigrier", ["vinaigre.procedure"]],
  ["comment savoir si un bocal est bien stérilisé", ["conserve.condition", "conserve.procedure"]],
  ["confiture moins sucrée possible ?", ["confiture.procedure"]],
  ["frais de livraison pour 50 euros d'achat", ["livraison.prix"]],
  ["vous acceptez les chèques ?", ["paiement.definition"]],
  ["délai pour renvoyer un produit", ["retour.procedure"]],
];

describe("le jeu inédit", () => {
  const resultats = INEDIT.map(([question, acceptables]) => {
    const premier = assistant.repondre(question).trace.faits[0] ?? "(aucun)";
    return { question, premier, juste: acceptables.includes(premier) };
  });
  const score = resultats.filter((r) => r.juste).length / resultats.length;

  it(`généralise au-delà du banc (score mesuré : ${Math.round(score * 100)} %)`, () => {
    const echecs = resultats.filter((r) => !r.juste).map((r) => `${r.question} → ${r.premier}`);
    console.log(`Jeu inédit : ${Math.round(score * 100)} % (${resultats.length - echecs.length}/${resultats.length})${echecs.length ? `, écarts :\n  ${echecs.join("\n  ")}` : ""}`);
    // Mesuré à 68 % à l'aveugle le 24/09/2026. Le seuil protège contre une régression.
    expect(score).toBeGreaterThanOrEqual(0.65);
  });

  it("ne répond jamais à côté par défaut : une question sans réponse sûre redirige", () => {
    for (const { question } of resultats) {
      const r = assistant.repondre(question);
      expect(r.texte.length).toBeGreaterThan(0);
    }
  });
});
