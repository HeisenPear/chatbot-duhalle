// ═══════════════════════════════════════════════════════════════════════════
// LE WORKER CLOUDFLARE DU CHATBOT DUHALLÉ.
//
//   POST /api/chat    { message, contexte? }  →  la réponse de l'assistant
//   GET  /api/accueil                          →  le message d'accueil et les questions de départ
//   GET  /api/sante                            →  contrôle de santé (taille de la base)
//   GET  /v/<version>.js, /                    →  fichiers statiques (widget, démonstration)
//
// Aucun appel à un service externe : la base de connaissances est dans le
// code, la réponse est calculée sur place en quelques millisecondes.
//
// Sécurité : l'API ne fait que lire la base (aucune donnée client, aucune
// action sur le site). Elle limite le nombre de questions par visiteur, borne
// la taille des requêtes, n'accepte que les sites autorisés et ne journalise
// pas les coordonnées tapées par les clients.
// ═══════════════════════════════════════════════════════════════════════════
import { Assistant } from "./moteur/assistant";
import { enregistrerQuestion, purgerQuestions } from "./questions";
import { REGLAGES } from "./savoir/coordonnees";
import { BASE } from "./savoir/index";

export { anonymiser } from "./questions";

export interface Env {
  /** Les fichiers statiques (versions du widget, page de démonstration). */
  ASSETS?: Fetcher;
  /** Sites autorisés à appeler l'API, séparés par des virgules ; « * » pour tous. */
  ALLOWED_ORIGINS?: string;
  /** Limite de requêtes par visiteur (binding « ratelimits » de wrangler.jsonc). */
  LIMITEUR?: RateLimit;
  /** Questions anonymisées destinées à l'amélioration du chatbot. */
  QUESTIONS_DB?: D1Database;
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
      // Une réponse de l'API n'est jamais une page : rien à charger, rien à encadrer.
      "Content-Security-Policy": "default-src 'none'; frame-ancestors 'none'",
      "Referrer-Policy": "no-referrer",
      ...entetesCors(origine),
      ...extra,
    },
  });
}

class CorpsInvalide extends Error {}

/**
 * Lit le corps sans jamais en garder plus que CORPS_MAX octets en mémoire :
 * un envoi énorme est coupé dès qu'il dépasse, qu'il annonce sa taille ou non.
 */
async function lireCorps(request: Request): Promise<unknown> {
  const annoncee = Number(request.headers.get("Content-Length") ?? 0);
  if (annoncee > CORPS_MAX) throw new CorpsInvalide();
  if (!request.body) throw new Error("corps vide");
  const lecteur = request.body.getReader();
  const morceaux: Uint8Array[] = [];
  let taille = 0;
  for (;;) {
    const { done, value } = await lecteur.read();
    if (done) break;
    taille += value.byteLength;
    if (taille > CORPS_MAX) {
      await lecteur.cancel();
      throw new CorpsInvalide();
    }
    morceaux.push(value);
  }
  const octets = new Uint8Array(taille);
  let position = 0;
  for (const m of morceaux) {
    octets.set(m, position);
    position += m.byteLength;
  }
  return JSON.parse(new TextDecoder().decode(octets));
}

async function chat(request: Request, env: Env, ctx: ExecutionContext | undefined, origine: string | null): Promise<Response> {
  let corps: unknown;
  try {
    corps = await lireCorps(request);
  } catch (e) {
    if (e instanceof CorpsInvalide) return json({ erreur: "Requête trop longue." }, 413, origine);
    return json({ erreur: "Requête invalide." }, 400, origine);
  }
  const { message, contexte } = (corps ?? {}) as { message?: unknown; contexte?: unknown };
  if (typeof message !== "string") return json({ erreur: "Le champ « message » est obligatoire." }, 400, origine);

  const question = message.slice(0, LONGUEUR_MAX);
  const reponse = assistant.repondre(question, assistant.contexteValide(contexte));

  if (env.QUESTIONS_DB) {
    const enregistrement = enregistrerQuestion(env.QUESTIONS_DB, question, reponse.nature).catch((e: unknown) => {
      // Ne jamais inclure la question dans les journaux, même en cas d'échec D1.
      console.error(
        JSON.stringify({
          evenement: "enregistrement-question-echoue",
          message: e instanceof Error ? e.message : String(e),
        }),
      );
    });
    if (ctx) ctx.waitUntil(enregistrement);
    else await enregistrement;
  }
  return json(reponse, 200, origine);
}

/** Trop de questions d'un même visiteur en une minute : on le fait patienter. */
async function tropDeRequetes(request: Request, env: Env): Promise<boolean> {
  if (!env.LIMITEUR) return false;
  const visiteur = request.headers.get("CF-Connecting-IP") ?? "inconnu";
  const { success } = await env.LIMITEUR.limit({ key: visiteur });
  return !success;
}

async function api(request: Request, env: Env, ctx: ExecutionContext | undefined, url: URL, origine: string | null): Promise<Response> {
  if (request.method === "OPTIONS") return new Response(null, { status: 204, headers: entetesCors(origine) });

  // Une page d'un site non autorisé ne peut pas utiliser le chatbot.
  if (request.headers.get("Origin") && !origine) return json({ erreur: "Origine non autorisée." }, 403, null);

  if (await tropDeRequetes(request, env)) {
    return json({ erreur: "Trop de questions en peu de temps. Merci de patienter une minute." }, 429, origine, { "Retry-After": "60" });
  }

  if (url.pathname === "/api/chat" && request.method === "POST") return chat(request, env, ctx, origine);
  if (url.pathname === "/api/accueil" && request.method === "GET") {
    return json(assistant.repondre("bonjour"), 200, origine, { "Cache-Control": "public, max-age=300" });
  }
  if (url.pathname === "/api/sante" && request.method === "GET") return json({ ok: true, ...assistant.taille }, 200, origine);
  return json({ erreur: "Introuvable." }, 404, origine);
}

export default {
  async fetch(request: Request, env: Env, ctx?: ExecutionContext): Promise<Response> {
    const url = new URL(request.url);

    if (url.pathname.startsWith("/api/")) {
      const origine = origineCors(request, env);
      try {
        return await api(request, env, ctx, url, origine);
      } catch (e) {
        // Jamais de détail technique vers l'extérieur ; l'erreur reste dans les journaux.
        console.error(JSON.stringify({ evenement: "erreur", message: e instanceof Error ? e.message : String(e) }));
        return json({ erreur: "Erreur interne." }, 500, origine);
      }
    }

    if (env.ASSETS) return env.ASSETS.fetch(request);
    return new Response("Introuvable", { status: 404 });
  },

  /** Tâche planifiée quotidienne (wrangler.jsonc, « triggers ») : purge des anciennes questions. */
  async scheduled(_controleur: ScheduledController, env: Env, ctx: ExecutionContext): Promise<void> {
    if (!env.QUESTIONS_DB) return;
    ctx.waitUntil(
      purgerQuestions(env.QUESTIONS_DB).then(
        (supprimees) => console.log(JSON.stringify({ evenement: "purge-questions", supprimees })),
        (e: unknown) => console.error(JSON.stringify({ evenement: "purge-questions-echouee", message: e instanceof Error ? e.message : String(e) })),
      ),
    );
  },
} satisfies ExportedHandler<Env>;
