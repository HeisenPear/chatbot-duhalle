// Les pages Oxatis ne sont pas en UTF-8. Un navigateur qui lit le widget avec l'encodage de la page
// (Windows-1252) transforme chaque octet UTF-8 en autre chose : un accent dans une expression
// régulière fait alors planter tout le script (« Range out of order in character class ») et la
// bulle n'apparaît plus. Cela est arrivé le 2 octobre avec /[̀-ͯ]/ écrit en caractères bruts.
// Le widget compilé ne doit donc contenir que de l'ASCII.
// (En JavaScript : le projet n'embarque pas les types Node, que le contrôle de types réserve au Worker.)
import { createHash } from "node:crypto";
import { readFileSync, readdirSync } from "node:fs";
import { Script } from "node:vm";
import { describe, expect, it } from "vitest";

const VERSIONS = readdirSync("public/v").filter((f) => f.endsWith(".js"));
const BALISE = readFileSync("oxatis/1-script-chatbot.html", "utf8");

describe("le widget compilé", () => {
  it("a au moins une version publiée", () => {
    expect(VERSIONS.length).toBeGreaterThan(0);
  });

  for (const fichier of VERSIONS) {
    describe(fichier, () => {
      const octets = readFileSync(`public/v/${fichier}`);

      it("ne contient que de l'ASCII", () => {
        const fautif = /[^\x00-\x7f]/.exec(octets.toString("latin1"));
        expect(fautif && octets.toString("latin1").slice(Math.max(0, fautif.index - 30), fautif.index + 30)).toBeNull();
      });

      it("se compile aussi lu en Windows-1252 (page Oxatis sans UTF-8)", () => {
        expect(() => new Script(octets.toString("latin1"), { filename: fichier })).not.toThrow();
        // Les deux lectures donnent le même texte : l'encodage de la page n'a plus d'effet.
        expect(octets.toString("latin1")).toBe(octets.toString("utf8"));
      });
    });
  }

  it("est celui que la balise Oxatis appelle, avec la bonne empreinte", () => {
    const adresse = /\/v\/([0-9a-f]+\.js)"/.exec(BALISE)?.[1];
    expect(adresse).toBeDefined();
    const empreinte = `sha384-${createHash("sha384").update(readFileSync(`public/v/${adresse}`)).digest("base64")}`;
    expect(BALISE).toContain(`integrity="${empreinte}"`);
  });

  it("les en-têtes annoncent l'UTF-8 pour les versions du widget", () => {
    const entetes = readFileSync("public/_headers", "utf8");
    expect(entetes).toMatch(/\/v\/\*\n(?:\s+.*\n)*?\s+Content-Type: text\/javascript; charset=utf-8/);
  });
});
