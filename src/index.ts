// ═══════════════════════════════════════════════════════════════════════════
// LE WORKER CLOUDFLARE DU CHATBOT DUHALLÉ.
//
//   POST /api/chat    { message, contexte? }  →  la réponse de l'assistant
//   GET  /api/accueil                          →  le message d'accueil et les questions de départ
//   GET  /api/sante                            →  contrôle de santé (taille de la base)
//   GET  /widget.js, /demo.html                →  fichiers statiques (dossier public/)
//
// Aucun appel à un service externe : la base de connaissances est dans le
// code, la réponse est calculée sur place en quelques millisecondes.
// ═══════════════════════════════════════════════════════════════════════════
import { Assistant } from "./moteur/assistant";
import { REGLAGES } from "./savoir/coordonnees";
import { BASE } from "./savoir/index";

export interface Env {
  /** Les fichiers statiques (widget.js, demo.html). */
  ASSETS?: Fetcher;
  /** Sites autorisés à appeler l'API, séparés par des virgules ; « * » pour tous. */
  ALLOWED_ORIGINS?: string;
}

/** Longueur maximale d'une question : au-delà, on tronque. */
const LONGUEUR_MAX = 500;
/** Taille maximale du corps de requête accepté. */
const CORPS_MAX = 4_000;

// Construit une fois par isolat, puis réutilisé pour toutes les requêtes.
const assistant = new Assistant(BASE, REGLAGES);

function originesAutorisees(env: Env): string[] {
  return (env.ALLOWED_ORIGINS ?? "")
    .split(",")
    .map((o) => o.trim().replace(/\/+$/, ""))
    .filter(Boolean);
}

/** L'origine à renvoyer dans Access-Control-Allow-Origin, ou null si refusée. */
function origineCors(request: Request, env: Env): string | null {
  const origine = request.headers.get("Origin");
  if (!origine) return null;
  const autorisees = originesAutorisees(env);
  if (autorisees.includes("*")) return "*";
  // Le Worker lui-même (page de démonstration) est toujours autorisé.
  if (origine === new URL(request.url).origin) return origine;
  return autorisees.includes(origine) ? origine : null;
}

function entetesCors(origine: string | null): Record<string, string> {
  if (!origine) return {};
  return {
    "Access-Control-Allow-Origin": origine,
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Max-Age": "86400",
    Vary: "Origin",
  };
}

function json(corps: unknown, statut: number, origine: string | null, extra: Record<string, string> = {}): Response {
  return new Response(JSON.stringify(corps), {
    status: statut,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "no-store",
      "X-Content-Type-Options": "nosniff",
      ...entetesCors(origine),
      ...extra,
    },
  });
}

async function lireCorps(request: Request): Promise<unknown> {
  const texte = await request.text();
  if (texte.length > CORPS_MAX) throw new Error("trop long");
  return JSON.parse(texte);
}

async function chat(request: Request, origine: string | null): Promise<Response> {
  let corps: unknown;
  try {
    corps = await lireCorps(request);
  } catch {
    return json({ erreur: "Requête invalide." }, 400, origine);
  }
  const { message, contexte } = (corps ?? {}) as { message?: unknown; contexte?: unknown };
  if (typeof message !== "string") return json({ erreur: "Le champ « message » est obligatoire." }, 400, origine);

  const question = message.slice(0, LONGUEUR_MAX);
  const reponse = assistant.repondre(question, assistant.contexteValide(contexte));

  // Les questions sans réponse sont journalisées (Workers Logs) pour enrichir la base.
  if (reponse.nature === "inconnu") {
    console.log(JSON.stringify({ evenement: "sans-reponse", question: question.slice(0, 200) }));
  }
  return json(reponse, 200, origine);
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);
    const origine = origineCors(request, env);

    if (url.pathname.startsWith("/api/")) {
      if (request.method === "OPTIONS") return new Response(null, { status: 204, headers: entetesCors(origine) });

      // Une page d'un site non autorisé ne peut pas utiliser le chatbot.
      if (request.headers.get("Origin") && !origine) return json({ erreur: "Origine non autorisée." }, 403, null);

      if (url.pathname === "/api/chat" && request.method === "POST") return chat(request, origine);
      if (url.pathname === "/api/accueil" && request.method === "GET") {
        return json(assistant.repondre("bonjour"), 200, origine, { "Cache-Control": "public, max-age=300" });
      }
      if (url.pathname === "/api/sante" && request.method === "GET") return json({ ok: true, ...assistant.taille }, 200, origine);
      return json({ erreur: "Introuvable." }, 404, origine);
    }

    if (env.ASSETS) return env.ASSETS.fetch(request);
    return new Response("Introuvable", { status: 404 });
  },
} satisfies ExportedHandler<Env>;
