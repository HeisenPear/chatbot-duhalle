// LE LEXIQUE DES FORMES (étape 1) : les verbes conjugués retombent sur leur infinitif, les suffixes d'agent
// restent, un mot inconnu passe par la racinisation par suffixes, et la nature des mots est exposée.
import { describe, expect, it } from "vitest";
import { Assistant } from "../src/moteur/assistant";
import { lireLesMots, natureDuMot, raciner, racinerParSuffixes } from "../src/moteur/texte";
import { REGLAGES } from "../src/savoir/coordonnees";
import { BASE } from "../src/savoir/index";

const assistant = new Assistant(BASE, REGLAGES);

describe("les formes conjuguées retombent sur leur infinitif", () => {
  it.each([
    ["bouchais", "boucher"],
    ["boucherions", "boucher"],
    ["bouchaient", "boucher"],
    ["mettront", "mettre"],
    ["mettions", "mettre"],
    ["conserverai", "conserver"],
    ["conserveraient", "conserver"],
    ["tremperai", "tremper"],
    ["rincerai", "rincer"],
    ["sertissions", "sertir"],
  ])("« %s » et « %s » ont la même racine", (forme, infinitif) => {
    expect(raciner(forme)).toBe(raciner(infinitif));
  });

  it("rapproche aussi le verbe de son nom, comme avant", () => {
    expect(raciner("bouchage")).toBe(raciner("boucher"));
    expect(raciner("conservation")).toBe(raciner("conserver"));
    expect(raciner("bouchons")).toBe(raciner("bouchon"));
  });

  it("n'a pas d'effet sur les mots que le repli par suffixes traitait déjà bien", () => {
    for (const mot of ["bouteilles", "capsules", "casiers", "cire", "bonde"]) expect(raciner(mot)).toBe(racinerParSuffixes(mot));
  });
});

describe("les suffixes d'agent ne sont pas retirés", () => {
  it("une boucheuse n'est pas le bouchage, un vinaigrier n'est pas le vinaigre", () => {
    expect(raciner("boucheuse")).not.toBe(raciner("bouchage"));
    expect(raciner("boucheuse")).not.toBe(raciner("boucher"));
    expect(raciner("boucheuses")).toBe(raciner("boucheuse"));
    expect(raciner("vinaigrier")).not.toBe(raciner("vinaigre"));
    expect(raciner("vinaigriers")).toBe(raciner("vinaigrier"));
    expect(raciner("capsuleuse")).not.toBe(raciner("capsule"));
  });
});

describe("le repli et les cas particuliers", () => {
  it("un mot inconnu du lexique passe par la racinisation par suffixes", () => {
    for (const mot of ["zorglubs", "lasagnes", "xyloglobines"]) {
      expect(natureDuMot(mot)).toBeUndefined();
      expect(raciner(mot)).toBe(racinerParSuffixes(mot));
    }
  });

  it("garde les nombres tels quels", () => {
    expect(raciner("45")).toBe("45");
    expect(raciner("1p5")).toBe("1p5");
  });

  it("laisse les verbes de toute phrase sur la racine du repli : « je viens de commander » ne parle pas du point de vente", () => {
    expect(raciner("viens")).toBe(racinerParSuffixes("viens"));
    expect(natureDuMot("viens")).toBe("verbe");
    const reponse = assistant.repondre("Je viens de passer une commande et je ne la vois pas ?");
    expect(reponse.trace.concepts).not.toContain("magasin");
  });
});

describe("la nature des mots", () => {
  it("donne le nom, le verbe, l'adjectif et l'adverbe", () => {
    expect(natureDuMot("bouchon")).toBe("nom");
    expect(natureDuMot("bouchons")).toBe("nom");
    expect(natureDuMot("bouchais")).toBe("verbe");
    expect(natureDuMot("hermetique")).toBe("adjectif");
    expect(natureDuMot("rapidement")).toBe("adverbe");
  });

  it("lit les mots d'une phrase avec leur racine et leur nature", () => {
    const mots = lireLesMots("Mes bouchons se déformaient");
    expect(mots.map((m) => m.mot)).toEqual(["bouchons", "deformaient"]);
    expect(mots.map((m) => m.nature)).toEqual(["nom", "verbe"]);
    expect(mots[1]!.racine).toBe(raciner("deformer"));
  });
});

describe("les questions écrites avec un verbe conjugué", () => {
  it.each([
    ["comment bouchais-je mes bouteilles de cidre", "bouchage.procedure"],
    ["je conserverai mes bocaux combien de temps", "stockage-conserves.duree"],
    ["je tremperai mon bouchon combien de temps", "bouchon-liege.duree"],
    ["je rincerai les bouteilles comment", "rince-bouteille.procedure"],
    ["mes bouchons se déformaient après insertion", "deformation-bouchon.condition"],
  ])("« %s » → %s", (question, attendu) => {
    expect(assistant.repondre(question).trace.faits[0]).toBe(attendu);
  });
});
