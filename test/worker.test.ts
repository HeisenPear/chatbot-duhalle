// Le Worker, appelé comme Cloudflare l'appelle : une Request, un env.
import { describe, expect, it } from "vitest";
import worker, { type Env } from "../src/index";

const SITE = "https://www.duhalle-boutique.fr";
const env: Env = { ALLOWED_ORIGINS: `${SITE},https://duhalle-boutique.fr` };
const URL_WORKER = "https://chatbot-duhalle.exemple.workers.dev";

function post(corps: unknown, origine: string | null = SITE, brut?: string): Promise<Response> {
  const headers: Record<string, string> = { "Content-Type": "text/plain;charset=UTF-8" };
  if (origine) headers.Origin = origine;
  return worker.fetch(new Request(`${URL_WORKER}/api/chat`, { method: "POST", headers, body: brut ?? JSON.stringify(corps) }), env);
}

describe("POST /api/chat", () => {
  it("répond à une question, avec les en-têtes CORS du site Duhallé", async () => {
    const res = await post({ message: "Quel bouchon pour un vin de garde ?" });
    expect(res.status).toBe(200);
    expect(res.headers.get("Access-Control-Allow-Origin")).toBe(SITE);
    const corps = (await res.json()) as { nature: string; texte: string; liens: unknown[]; contexte: { concepts: string[] } };
    expect(corps.nature).toBe("reponse");
    expect(corps.texte).toMatch(/45 x 24/);
    expect(corps.contexte.concepts).toContain("vin-de-garde");
  });

  it("suit une relance grâce au contexte renvoyé par le widget", async () => {
    const premiere = (await (await post({ message: "comment faire du vinaigre" })).json()) as { contexte: unknown };
    const relance = (await (await post({ message: "et combien de temps ?", contexte: premiere.contexte })).json()) as { texte: string };
    expect(relance.texte).toMatch(/semaines/);
  });

  it("refuse un site non autorisé", async () => {
    const res = await post({ message: "bonjour" }, "https://site-inconnu.example");
    expect(res.status).toBe(403);
    expect(res.headers.get("Access-Control-Allow-Origin")).toBeNull();
  });

  it("accepte la page de démonstration du Worker lui-même", async () => {
    const res = await post({ message: "bonjour" }, URL_WORKER);
    expect(res.status).toBe(200);
  });

  it("accepte tous les sites si ALLOWED_ORIGINS vaut *", async () => {
    const res = await worker.fetch(
      new Request(`${URL_WORKER}/api/chat`, { method: "POST", headers: { Origin: "https://autre.example" }, body: JSON.stringify({ message: "bonjour" }) }),
      { ALLOWED_ORIGINS: "*" },
    );
    expect(res.headers.get("Access-Control-Allow-Origin")).toBe("*");
  });

  it("rejette un corps invalide", async () => {
    expect((await post(null, SITE, "pas du json")).status).toBe(400);
    expect((await post({ message: 42 })).status).toBe(400);
    expect((await post(null, SITE, JSON.stringify({ message: "x".repeat(5000) }))).status).toBe(400);
  });

  it("tronque une question trop longue au lieu d'échouer", async () => {
    const res = await post({ message: `${"bouchon ".repeat(70)}` });
    expect(res.status).toBe(200);
  });
});

describe("les autres routes", () => {
  it("répond au pré-vol CORS", async () => {
    const res = await worker.fetch(new Request(`${URL_WORKER}/api/chat`, { method: "OPTIONS", headers: { Origin: SITE } }), env);
    expect(res.status).toBe(204);
    expect(res.headers.get("Access-Control-Allow-Methods")).toContain("POST");
  });

  it("donne l'accueil et les questions de départ", async () => {
    const res = await worker.fetch(new Request(`${URL_WORKER}/api/accueil`, { headers: { Origin: SITE } }), env);
    const corps = (await res.json()) as { nature: string; suggestions: string[] };
    expect(corps.nature).toBe("accueil");
    expect(corps.suggestions.length).toBeGreaterThan(0);
  });

  it("donne l'état de santé et la taille de la base", async () => {
    const res = await worker.fetch(new Request(`${URL_WORKER}/api/sante`), env);
    const corps = (await res.json()) as { ok: boolean; concepts: number; faits: number };
    expect(corps.ok).toBe(true);
    expect(corps.faits).toBeGreaterThan(150);
  });

  it("renvoie 404 sur une route d'API inconnue", async () => {
    expect((await worker.fetch(new Request(`${URL_WORKER}/api/inconnue`), env)).status).toBe(404);
  });
});
