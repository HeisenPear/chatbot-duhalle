// LE CLASSIFIEUR DE TYPES ET LES QUESTIONS DE CLARIFICATION (étape 4). Les motifs de types-de-question.ts restent prioritaires ;
// sans motif, un type appris n'est retenu que s'il est sûr ; quand deux types hésitent, ou que deux familles de faits sont à égalité,
// le moteur pose une question avec des boutons.
import { afterEach, describe, expect, it } from "vitest";
import { Assistant, type Contexte } from "../src/moteur/assistant";
import { fonctionsDeLaQuestion } from "../src/moteur/classifieur-outils";
import { CLASSES, COLONNES, POIDS } from "../src/moteur/classifieur";
import { normaliser } from "../src/moteur/texte";
import { classerLaQuestion, MOTS_MIN, questionDuType, REGLAGES_DU_TYPE, typesProches, type Classement } from "../src/moteur/types-appris";
import { lireTypeDeQuestion } from "../src/moteur/types-de-question";
import { REGLAGES } from "../src/savoir/coordonnees";
import { BASE } from "../src/savoir/index";
import { TYPES_DE_QUESTION, type BaseDeSavoir } from "../src/savoir/types";

const assistant = new Assistant(BASE, REGLAGES);
const reglagesInitiaux = { ...REGLAGES_DU_TYPE };
afterEach(() => Object.assign(REGLAGES_DU_TYPE, reglagesInitiaux));

describe("les caractéristiques", () => {
  it("sont des morceaux de mots de 2 à 5 lettres, repliés sur les colonnes, de norme 1", () => {
    const colonnes = fonctionsDeLaQuestion("combien de temps", COLONNES, 2, 5);
    expect(colonnes.length).toBeGreaterThan(20);
    for (const [colonne] of colonnes) expect(colonne).toBeLessThan(COLONNES);
    expect(Math.sqrt(colonnes.reduce((s, [, v]) => s + v * v, 0))).toBeCloseTo(1);
  });

  it("sont les mêmes à chaque appel", () => {
    expect(fonctionsDeLaQuestion("quel bouchon", COLONNES, 2, 5)).toEqual(fonctionsDeLaQuestion("quel bouchon", COLONNES, 2, 5));
  });
});

describe("les poids exportés", () => {
  it("couvrent les 14 types et « aucun », avec un poids par classe", () => {
    expect([...CLASSES]).toEqual([...TYPES_DE_QUESTION, "aucun"]);
    for (const [colonne, poids] of Object.entries(POIDS)) {
      expect(Number(colonne)).toBeLessThan(COLONNES);
      expect(poids).toHaveLength(CLASSES.length);
    }
  });
});

describe("le classement", () => {
  it.each([
    ["combien coute la livraison", "prix"],
    ["comment mettre mon vin en bouteille", "procedure"],
    ["quel pressoir choisir pour mes pommes", "choix"],
    ["pourquoi mon cidre est plat", "raison"],
    ["ou acheter vos bouchons", "lieu"],
  ])("« %s » → %s", (question, type) => {
    const classement = classerLaQuestion(normaliser(question));
    expect(classement.type).toBe(type);
    expect(classement.probabilite).toBeGreaterThan(0.7);
  });

  it("ne classe pas un mot ou deux : un type se lit dans une phrase", () => {
    expect(MOTS_MIN).toBe(3);
    expect(classerLaQuestion("livraison")).toEqual({ type: null, probabilite: 0, second: null, probabiliteSecond: 0 });
    expect(classerLaQuestion("bouchon conique").type).toBeNull();
  });
});

describe("les motifs restent prioritaires", () => {
  it("ne consulte pas le classifieur quand un motif s'applique", () => {
    const reponse = assistant.repondre("combien coûte la livraison ?");
    expect(reponse.trace.type).toBe("prix");
    expect(reponse.trace.classifieur).toBeNull();
    expect(reponse.trace.signal).toMatch(/un prix/);
  });

  it("n'applique un type appris que s'il atteint le seuil, et le dit dans la trace", () => {
    const question = "livraison dans les DOM";
    expect(lireTypeDeQuestion(normaliser(question))).toBeNull();
    const classement = classerLaQuestion(normaliser(question));
    expect(classement.type).toBe("prix");
    REGLAGES_DU_TYPE.seuil = 0.99;
    expect(assistant.repondre(question).trace.classifieur).toBeNull();
    REGLAGES_DU_TYPE.seuil = 0.5;
    const reponse = assistant.repondre(question);
    expect(reponse.trace.classifieur).toEqual({ type: "prix", probabilite: classement.probabilite });
    expect(reponse.trace.type).toBe("prix");
    expect(reponse.trace.signal).toMatch(/^un type appris : « prix »/);
  });

  it("ne change pas la lecture d'une question courte sans sujet : seuls les motifs la rattachent à la réponse précédente", () => {
    const precedent: Contexte = { concepts: ["boucheuse"], type: "choix" };
    REGLAGES_DU_TYPE.seuil = 0;
    expect(assistant.repondre("ça marche ?", precedent).trace.relance).toBe(assistant.repondre("ça marche ?", precedent).trace.relance);
    expect(assistant.repondre("et alors ?", null).nature).not.toBe("reponse");
  });
});

describe("les types proches", () => {
  const classement = (p1: number, p2: number): Classement => ({ type: "procedure", probabilite: p1, second: "conseil", probabiliteSecond: p2 });

  it("hésitent quand deux types ont chacun une probabilité d'au moins 0,3 et sont à moins de 0,05 l'un de l'autre", () => {
    expect(typesProches(classement(0.36, 0.34))).toEqual(["procedure", "conseil"]);
    expect(typesProches(classement(0.5, 0.34))).toBeNull();
    expect(typesProches(classement(0.28, 0.27))).toBeNull();
    expect(typesProches({ type: null, probabilite: 0.4, second: "conseil", probabiliteSecond: 0.39 })).toBeNull();
  });

  it("posent une question avec un bouton par type, et chaque bouton redonne le type voulu", () => {
    for (const type of TYPES_DE_QUESTION) {
      expect(lireTypeDeQuestion(normaliser(questionDuType(type, "la boucheuse")))?.type, type).toBe(type);
    }
    REGLAGES_DU_TYPE.hesitationMin = 0.01;
    REGLAGES_DU_TYPE.ecartDeHesitation = 1;
    const reponse = assistant.repondre("pouvez-vous me parler de la boucheuse manuelle ?");
    expect(reponse.nature).toBe("clarification");
    expect(reponse.trace.clarification).toBe("types-proches");
    expect(reponse.suggestions).toHaveLength(2);
    expect(reponse.texte).toMatch(/Que souhaitez-vous \?/);
    for (const bouton of reponse.suggestions) {
      Object.assign(REGLAGES_DU_TYPE, reglagesInitiaux);
      const suite = assistant.repondre(bouton);
      expect(suite.nature, bouton).toBe("reponse");
    }
  });

  it("ne pose pas de question à un groupe nominal sans verbe ni point d'interrogation (un bouton, un libellé)", () => {
    REGLAGES_DU_TYPE.hesitationMin = 0.01;
    REGLAGES_DU_TYPE.ecartDeHesitation = 1;
    expect(assistant.repondre("Remise selon le montant de la commande").nature).toBe("reponse");
  });

  it("ne pose pas de question quand la précédente donne le contexte", () => {
    REGLAGES_DU_TYPE.hesitationMin = 0.01;
    REGLAGES_DU_TYPE.ecartDeHesitation = 1;
    const precedent: Contexte = { concepts: ["boucheuse"], type: null };
    expect(assistant.repondre("pouvez-vous me parler de la boucheuse manuelle ?", precedent).nature).not.toBe("clarification");
  });
});

describe("deux familles de faits à égalité", () => {
  // Une petite base : la famille « boite » a deux membres, qui répondent chacun à « quelle boîte ? » ; aucun fait ne parle de la famille.
  const base: BaseDeSavoir = {
    concepts: [
      { id: "catalogue", libelle: "Catalogue", alias: ["catalogue"] },
      { id: "boite", libelle: "Boîte", alias: ["boite", "boites"], famille: "catalogue" },
      { id: "boite-ronde", libelle: "Boîte ronde", alias: ["boite ronde"], famille: "boite" },
      { id: "boite-carree", libelle: "Boîte carrée", alias: ["boite carree"], famille: "boite" },
    ],
    faits: [
      { id: "boite-ronde.choix", concepts: ["boite-ronde"], aspect: "choix", enonce: "La boîte ronde convient aux petits objets.", source: "test", verifieLe: "2026-11-13" },
      { id: "boite-carree.choix", concepts: ["boite-carree"], aspect: "choix", enonce: "La boîte carrée convient aux grands objets.", source: "test", verifieLe: "2026-11-13" },
    ],
  };
  const petit = new Assistant(base, REGLAGES);

  it("demande laquelle, avec un bouton par membre", () => {
    const reponse = petit.repondre("quelle boîte choisir ?");
    expect(reponse.nature).toBe("clarification");
    expect(reponse.trace.clarification).toBe("familles-a-egalite");
    expect(reponse.texte).toMatch(/Cela dépend de \*\*boîte\*\* : lequel vous intéresse \?/);
    expect(reponse.suggestions).toEqual(["Lequel choisir : boîte ronde ?", "Lequel choisir : boîte carrée ?"]);
  });

  it("répond au bouton cliqué par le fait du membre choisi", () => {
    expect(petit.repondre("Lequel choisir : boîte carrée ?").trace.faits[0]).toBe("boite-carree.choix");
    expect(petit.repondre("Lequel choisir : boîte ronde ?").trace.faits[0]).toBe("boite-ronde.choix");
  });

  it("ne demande rien quand le client a déjà choisi un membre", () => {
    const reponse = petit.repondre("quelle boîte ronde choisir ?");
    expect(reponse.nature).toBe("reponse");
    expect(reponse.trace.faits[0]).toBe("boite-ronde.choix");
  });

  it("ne demande rien quand un seul fait compare lui-même les membres (« quelle cire ? »)", () => {
    const reponse = assistant.repondre("quelle cire ?");
    expect(reponse.nature).toBe("reponse");
    expect(reponse.trace.faits[0]).toBe("cire-dure+cire-souple.choix");
  });
});

describe("le temps de calcul reste borné", () => {
  it("répond vite à des messages que le classifieur doit lire en entier", () => {
    let pire = 0;
    for (let i = 0; i < 40; i++) {
      const message = `${"quel bouchon choisir pour mon vin de garde ".repeat(10)}${i}`.slice(0, 500);
      const debut = performance.now();
      assistant.repondre(message);
      pire = Math.max(pire, performance.now() - debut);
    }
    expect(pire).toBeLessThan(40);
  });
});
