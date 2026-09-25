// Le Worker, appelé comme Cloudflare l'appelle : une Request, un env.
import { describe, expect, it, vi } from "vitest";
import worker, { anonymiser, type Env } from "../src/index";

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
    const vide = await worker.fetch(new Request(`${URL_WORKER}/api/chat`, { method: "POST", headers: { Origin: SITE } }), env);
    expect(vide.status).toBe(400);
  });

  it("refuse un corps trop long, qu'il annonce sa taille ou non", async () => {
    expect((await post(null, SITE, JSON.stringify({ message: "x".repeat(5000) }))).status).toBe(413);
    // Envoi en flux, sans Content-Length : coupé dès que la limite est franchie.
    const morceau = new TextEncoder().encode("x".repeat(1000));
    let envoyes = 0;
    const flux = new ReadableStream<Uint8Array>({
      pull(c) {
        envoyes++;
        if (envoyes > 1000) c.close();
        else c.enqueue(morceau);
      },
    });
    const res = await worker.fetch(
      new Request(`${URL_WORKER}/api/chat`, { method: "POST", headers: { Origin: SITE }, body: flux, duplex: "half" } as RequestInit),
      env,
    );
    expect(res.status).toBe(413);
    expect(envoyes).toBeLessThan(10);
  });

  it("tronque une question trop longue au lieu d'échouer", async () => {
    const res = await post({ message: `${"bouchon ".repeat(70)}` });
    expect(res.status).toBe(200);
  });
});

describe("sécurité", () => {
  it("pose les en-têtes de sécurité sur les réponses de l'API", async () => {
    const res = await post({ message: "bonjour" });
    expect(res.headers.get("X-Content-Type-Options")).toBe("nosniff");
    expect(res.headers.get("Content-Security-Policy")).toContain("default-src 'none'");
    expect(res.headers.get("Cache-Control")).toBe("no-store");
  });

  it("fait patienter un visiteur qui dépasse la limite de questions", async () => {
    const vus: string[] = [];
    const LIMITEUR = {
      limit: async ({ key }: { key: string }) => {
        vus.push(key);
        return { success: vus.length <= 2 };
      },
    } as unknown as RateLimit;
    const envLimite: Env = { ...env, LIMITEUR };
    const demande = () =>
      worker.fetch(
        new Request(`${URL_WORKER}/api/chat`, {
          method: "POST",
          headers: { Origin: SITE, "CF-Connecting-IP": "203.0.113.7" },
          body: JSON.stringify({ message: "bonjour" }),
        }),
        envLimite,
      );
    expect((await demande()).status).toBe(200);
    expect((await demande()).status).toBe(200);
    const bloquee = await demande();
    expect(bloquee.status).toBe(429);
    expect(bloquee.headers.get("Retry-After")).toBe("60");
    // Le widget du site doit pouvoir lire ce refus : les en-têtes CORS y sont.
    expect(bloquee.headers.get("Access-Control-Allow-Origin")).toBe(SITE);
    expect(vus).toEqual(["203.0.113.7", "203.0.113.7", "203.0.113.7"]);
  });

  it("enregistre la question anonymisée dans D1 sans ralentir la réponse", async () => {
    type Requete = { sql: string; params: unknown[] };
    const requetes: Requete[] = [];
    const db = {
      prepare(sql: string) {
        const requete: Requete = { sql, params: [] };
        requetes.push(requete);
        const statement = {
          bind(...params: unknown[]) {
            requete.params = params;
            return statement;
          },
        };
        return statement;
      },
      batch: vi.fn(async () => []),
    } as unknown as D1Database;
    const taches: Promise<unknown>[] = [];
    const ctx = {
      waitUntil(tache: Promise<unknown>) {
        taches.push(tache);
      },
    } as unknown as ExecutionContext;
    const envD1: Env = { ...env, QUESTIONS_DB: db };

    const res = await worker.fetch(
      new Request(`${URL_WORKER}/api/chat`, {
        method: "POST",
        headers: { Origin: SITE },
        body: JSON.stringify({
          message: "Je m'appelle Jean Dupont, commande CMD-123456, jean.dupont@exemple.fr, 06 12 34 56 78",
        }),
      }),
      envD1,
      ctx,
    );

    expect(res.status).toBe(200);
    expect(taches).toHaveLength(1);
    await Promise.all(taches);
    expect(requetes[0]?.sql).toContain("INSERT INTO questions_chatbot");
    expect(requetes[0]?.params[0]).toBe("Je m'appelle [nom], commande [référence], [e-mail] [numéro]");
    expect(requetes[0]?.params[1]).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    expect(requetes[1]?.sql).toContain("DELETE FROM questions_chatbot");
  });

  it("masque les identifiants mais garde les formats de bouchons", () => {
    expect(anonymiser("mon mail : a.b@c.fr")).toBe("mon mail : [e-mail]");
    expect(anonymiser("appelez le +33 6 12 34 56 78 svp")).toBe("appelez le [numéro] svp");
    expect(anonymiser("commande 2026-004512")).toBe("commande [référence]");
    expect(anonymiser("je m'appelle Jean Dupont")).toBe("je m'appelle [nom]");
    expect(anonymiser("livrez au 12 rue des Lilas à Rouen")).toBe("livrez au [adresse]");
    expect(anonymiser("site https://example.com/client/42")).toBe("site [lien]");
    expect(anonymiser("bouchon 45 x 24 ou 38 x 24")).toBe("bouchon 45 x 24 ou 38 x 24");
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
