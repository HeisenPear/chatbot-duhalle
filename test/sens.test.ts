// LA RECONNAISSANCE PAR LE SENS (étape 2) : un mot que la base ne connaît pas est rapproché d'un mot des alias par les
// vecteurs de mots. Elle doit aider sans nuire : substitutions attendues, faux amis refusés, mots trop courants
// interdits, poids moindre qu'un alias exact, trace lisible, temps de calcul borné.
import { describe, expect, it } from "vitest";
import { Assistant } from "../src/moteur/assistant";
import { DetecteurDeConcepts } from "../src/moteur/concepts";
import { ConstructeurDeReponse } from "../src/moteur/reponse";
import { MOTS_TROP_COURANTS, REGLAGES_DU_SENS, similariteDeMots, VoisinageParLeSens } from "../src/moteur/sens";
import { MOTS } from "../src/moteur/vecteurs";
import { REGLAGES } from "../src/savoir/coordonnees";
import { BASE } from "../src/savoir/index";

const assistant = new Assistant(BASE, REGLAGES);

describe("les substitutions attendues", () => {
  it.each([
    ["une fiole", "fiole → bouteille (sens, 0,76)", "bouteille.choix"],
    ["quel prix pour un doseur", "doseur → verseur (sens, 0,8)", "catalogue.prix"],
  ])("« %s » : %s", (question, substitution, premierFait) => {
    const reponse = assistant.repondre(question);
    expect(reponse.trace.substitutions).toEqual([substitution]);
    expect(reponse.trace.faits[0]).toBe(premierFait);
  });

  it("rapproche « amphore » de « jarre » au niveau de la détection", () => {
    const { substitutions } = new DetecteurDeConcepts(BASE).detecterEnDetail("une amphore");
    expect(substitutions.map((s) => `${s.mot} → ${s.cible}`)).toEqual(["amphore → jarre"]);
  });

  it("dit dans la trace chaque mot reconnu par le sens, avec sa similarité", () => {
    expect(assistant.repondre("une fiole").trace.substitutions[0]).toMatch(/^fiole → bouteille \(sens, 0,\d+\)$/);
    expect(assistant.repondre("quel bouchon pour un vin de garde ?").trace.substitutions).toEqual([]);
  });
});

describe("les faux amis sont refusés", () => {
  it.each(["jambon", "recipient", "obturateur", "capuchon", "fioles"])("« %s » ne devient pas un mot des alias", (mot) => {
    const detecteur = new DetecteurDeConcepts(BASE);
    expect(detecteur.detecterEnDetail(`un ${mot}`).substitutions).toEqual([]);
  });

  it("ne rapproche jamais un mot de tous les jours : « dernière » n'est pas « première », « belge » n'est pas « suisse »", () => {
    const detecteur = new DetecteurDeConcepts(BASE);
    for (const mot of ["derniere", "belge", "minutes", "matin", "largeur", "national"]) {
      expect(detecteur.detecterEnDetail(`un ${mot}`).substitutions, mot).toEqual([]);
    }
  });

  it("ne touche pas à une question qui cite déjà un concept", () => {
    const reponse = assistant.repondre("j'ai besoin d'une facture pour ma dernière commande");
    expect(reponse.trace.substitutions).toEqual([]);
    expect(reponse.trace.faits[0]).toBe("facture+commande.procedure");
  });

  it("n'invente pas un sujet pour une question hors base", () => {
    for (const question of ["une plaque chauffante avec un câble", "est-ce adapté à la découpe d'un jambon de dix kilos"]) {
      expect(assistant.repondre(question).nature, question).toBe("inconnu");
    }
  });
});

describe("les mots trop courants ne servent pas de cible", () => {
  const surfaces = new Map<string, Set<string>>([
    ["maison", new Set(["maison"])],
    ["couleur", new Set(["couleur"])],
    ["vin", new Set(["vin"])],
    ["bouteill", new Set(["bouteille"])],
  ]);

  it("garde la liste du README : maison, couleur, fruits, produit, vin, temps", () => {
    for (const mot of ["maison", "couleur", "fruit", "produit", "vin", "temps"]) expect(MOTS_TROP_COURANTS.has(mot), mot).toBe(true);
  });

  it("n'accepte jamais « maison », « couleur » ni « vin » comme cible, même très proches par le sens", () => {
    const voisinage = new VoisinageParLeSens(surfaces);
    expect(similariteDeMots("maisonnette", "maison")).toBeGreaterThan(0.8);
    expect(similariteDeMots("whisky", "vin")).toBeGreaterThan(0.8);
    expect(similariteDeMots("pigmentation", "couleur")).toBeGreaterThan(0.6);
    for (const mot of ["maisonnette", "whisky", "pigmentation"]) expect(voisinage.chercher(mot, 0)?.racine, mot).not.toMatch(/maison|vin|couleur/);
    expect(voisinage.taille).toBe(1);
  });

  it("garde un mot de la base qui n'est pas trop courant", () => {
    const voisinage = new VoisinageParLeSens(surfaces);
    expect(voisinage.chercher("fiole", 0)?.racine).toBe("bouteill");
  });
});

describe("un concept reconnu par le sens pèse moins qu'un alias exact", () => {
  it("multiplie le poids du concept par sa confiance", () => {
    const detecteur = new DetecteurDeConcepts(BASE);
    const constructeur = new ConstructeurDeReponse(BASE.faits, detecteur);
    const exact = constructeur.poids(["bouteille", "cidre"]);
    const parLeSens = constructeur.poids(["bouteille", "cidre"], new Map([["bouteille", 0.6]]));
    expect(exact.get("bouteille")).toBe(1);
    expect(parLeSens.get("bouteille")).toBeCloseTo(0.6);
    expect(parLeSens.get("cidre")).toBe(exact.get("cidre"));
  });

  it("marque la confiance du concept reconnu par le sens", () => {
    const detecteur = new DetecteurDeConcepts(BASE);
    const { cites } = detecteur.detecterEnDetail("une fiole");
    expect(cites.map((c) => [c.concept.id, c.confiance])).toEqual([["bouteille", 0.6]]);
    expect(detecteur.detecter("une bouteille").map((c) => c.confiance)).toEqual([1]);
  });
});

describe("le temps de calcul reste borné", () => {
  const dejaVus = new Set(new DetecteurDeConcepts(BASE).vocabulaireDesAlias);
  const inconnus = MOTS.split(" ").filter((m) => m.length >= 5 && !dejaVus.has(m));

  it("ne cherche le sens que d'un nombre limité de mots par question", () => {
    const detecteur = new DetecteurDeConcepts(BASE);
    const message = inconnus.slice(0, 60).join(" ");
    const { substitutions } = detecteur.detecterEnDetail(message);
    expect(substitutions.length).toBeLessThanOrEqual(REGLAGES_DU_SENS.essaisMax);
  });

  it("répond vite à un message plein de mots inconnus du français", () => {
    let pire = 0;
    for (let i = 0; i < 20; i++) {
      const message = inconnus.slice(i * 40, i * 40 + 40).join(" ");
      const debut = performance.now();
      const reponse = assistant.repondre(message);
      pire = Math.max(pire, performance.now() - debut);
      expect(reponse.texte.length).toBeGreaterThan(0);
    }
    // Cloudflare coupe à 10 ms de calcul sur l'offre gratuite ; marge large pour une machine de test lente.
    expect(pire).toBeLessThan(40);
  });
});
