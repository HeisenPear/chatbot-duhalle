// ═══════════════════════════════════════════════════════════════════════════
// LE WIDGET DU CHATBOT DUHALLÉ — le script chargé par le site Oxatis.
//
//   <script src="https://…workers.dev/widget.js" integrity="sha384-…" crossorigin="anonymous" defer></script>
//
// Il affiche une bulle en bas de page ; au clic, une fenêtre de discussion.
// Après quelques secondes, une petite carte au-dessus de la bulle invite le
// client à poser sa question, avec un message adapté à la page (invitations.ts).
// Tout le visuel vit dans un Shadow DOM : le thème du site ne le déforme pas,
// et il ne déforme pas le thème. La conversation est gardée pendant la
// visite (sessionStorage), pour suivre le client de page en page.
//
// Réglages facultatifs, en attributs de la balise <script> :
//   data-titre      titre de la fenêtre            (défaut : « Conseiller Duhallé »)
//   data-couleur    couleur principale             (défaut : vert Duhallé #20342C)
//   data-position   « droite » ou « gauche »       (défaut : droite)
//   data-decalage   distance au bas de l'écran, en pixels (défaut : 84, au-dessus
//                   de la pastille des cookies)
//   data-telephone  numéro affiché en cas de panne
//
// Il expose aussi window.DuhalleChat.ouvrir(), .fermer() et .poser("question"),
// utilisés par le bloc « bouton conseiller » à placer dans les pages.
//
// Sécurité : rien de ce qui vient du réseau ou du stockage n'est inséré comme
// HTML. Les textes passent par textContent, les liens ne mènent qu'au site
// Duhallé en https, et tout ce qui est relu est vérifié avant usage.
// ═══════════════════════════════════════════════════════════════════════════

import { choisirInvitation } from "./invitations";

interface Lien {
  libelle: string;
  url: string;
}

interface ReponseApi {
  nature: string;
  texte: string;
  liens: Lien[];
  suggestions: string[];
  /** Renvoyé tel quel avec la question suivante ; le Worker le vérifie. */
  contexte: unknown;
}

interface Message {
  de: "client" | "assistant";
  texte: string;
  liens?: Lien[];
}

interface Etat {
  messages: Message[];
  suggestions: string[];
  contexte: unknown;
  ouvert: boolean;
  /** Le visiteur a déjà ouvert le conseiller pendant cette visite. */
  engage: boolean;
  /** Nombre de pages où l'invitation est apparue pendant cette visite. */
  invitations: number;
  /** Le visiteur a fermé l'invitation : on ne la remontre plus. */
  inviteFermee: boolean;
}

declare global {
  interface Window {
    DuhalleChat?: { ouvrir: () => void; fermer: () => void; poser: (question: string) => void };
  }
}

(function () {
  if (window.DuhalleChat) return; // Script inclus deux fois : on ne crée qu'un widget.

  const script = document.currentScript as HTMLScriptElement | null;
  const reglage = (nom: string) => script?.getAttribute(`data-${nom}`) ?? undefined;
  const API = script?.src ? new URL(script.src).origin : "";
  const TITRE = (reglage("titre") ?? "Conseiller Duhallé").slice(0, 60);
  const COULEUR = /^#[0-9a-f]{3,8}$/i.test(reglage("couleur") ?? "") ? reglage("couleur")! : "#20342C";
  const COTE = reglage("position") === "gauche" ? "left" : "right";
  /** Distance au bas de l'écran : la pastille des cookies occupe le coin. */
  const BAS = /^\d{1,3}$/.test(reglage("decalage") ?? "") ? Math.min(Number(reglage("decalage")), 400) : 84;
  const TELEPHONE = (reglage("telephone") ?? "02 47 53 00 26").slice(0, 30);
  const CLE = "duhalle-chatbot";
  const LONGUEUR_MAX = 500;
  /** Au-delà, un texte reçu est coupé : aucune réponse de la base n'approche cette taille. */
  const TEXTE_MAX = 4000;
  /** Les seuls sites vers lesquels un lien de réponse peut mener. */
  const SITES_DES_LIENS = ["www.duhalle-boutique.fr", "duhalle-boutique.fr"];
  /** Vitesse d'écriture du conseiller, en caractères par seconde… */
  const VITESSE_FRAPPE = 60;
  /** …sans qu'une longue réponse mette plus de ce temps à s'écrire (ms). */
  const DUREE_FRAPPE_MAX = 7000;
  /** Les points « le conseiller écrit » restent visibles au moins ce temps (ms). */
  const ATTENTE_MIN = 450;
  /** L'invitation apparaît après ce temps sur la page (ms)… */
  const DELAI_INVITATION = 6000;
  /** …sur deux pages au plus par visite, et se retire d'elle-même après ce temps (ms). */
  const INVITATIONS_MAX = 2;
  const DUREE_INVITATION = 25000;
  const MOUVEMENT_REDUIT = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;
  /** Sur mobile, on n'ouvre pas le clavier d'office : il cacherait la réponse. */
  const ECRAN_TACTILE = window.matchMedia?.("(pointer: coarse)").matches ?? false;

  // ─── Vérification de tout ce qui est relu (réseau, stockage) ───────────────

  function adresseSure(url: string): boolean {
    try {
      const u = new URL(url);
      return u.protocol === "https:" && SITES_DES_LIENS.includes(u.hostname);
    } catch {
      return false;
    }
  }

  function liensValides(brut: unknown): Lien[] {
    if (!Array.isArray(brut)) return [];
    const liens: Lien[] = [];
    for (const l of brut) {
      if (!l || typeof l !== "object") continue;
      const { libelle, url } = l as Record<string, unknown>;
      if (typeof libelle === "string" && typeof url === "string" && adresseSure(url)) {
        liens.push({ libelle: libelle.slice(0, 80), url });
      }
    }
    return liens.slice(0, 6);
  }

  function textesValides(brut: unknown): string[] {
    if (!Array.isArray(brut)) return [];
    return brut
      .filter((t): t is string => typeof t === "string" && t.trim() !== "")
      .map((t) => t.slice(0, 120))
      .slice(0, 5);
  }

  function messageValide(brut: unknown): Message | null {
    if (!brut || typeof brut !== "object") return null;
    const { de, texte, liens } = brut as Record<string, unknown>;
    if ((de !== "client" && de !== "assistant") || typeof texte !== "string") return null;
    return { de, texte: texte.slice(0, TEXTE_MAX), liens: liensValides(liens) };
  }

  function reponseValide(brut: unknown): ReponseApi | null {
    if (!brut || typeof brut !== "object") return null;
    const r = brut as Record<string, unknown>;
    if (typeof r.texte !== "string" || !r.texte.trim()) return null;
    return {
      nature: typeof r.nature === "string" ? r.nature : "reponse",
      texte: r.texte.slice(0, TEXTE_MAX),
      liens: liensValides(r.liens),
      suggestions: textesValides(r.suggestions),
      contexte: r.contexte && typeof r.contexte === "object" ? r.contexte : null,
    };
  }

  // ─── État, gardé pendant la visite ─────────────────────────────────────────

  function lireEtat(): Etat {
    try {
      const brut = JSON.parse(sessionStorage.getItem(CLE) ?? "null") as Record<string, unknown> | null;
      if (brut && Array.isArray(brut.messages)) {
        return {
          messages: brut.messages
            .map(messageValide)
            .filter((m): m is Message => m !== null)
            .slice(-40),
          suggestions: textesValides(brut.suggestions),
          contexte: brut.contexte && typeof brut.contexte === "object" ? brut.contexte : null,
          ouvert: brut.ouvert === true,
          engage: brut.engage === true || brut.ouvert === true || brut.messages.length > 0,
          invitations: typeof brut.invitations === "number" ? Math.min(Math.max(Math.floor(brut.invitations), 0), 99) : 0,
          inviteFermee: brut.inviteFermee === true,
        };
      }
    } catch {
      /* stockage indisponible ou illisible : on repart de zéro */
    }
    return { messages: [], suggestions: [], contexte: null, ouvert: false, engage: false, invitations: 0, inviteFermee: false };
  }

  const etat = lireEtat();

  function sauver() {
    try {
      etat.messages = etat.messages.slice(-40);
      sessionStorage.setItem(CLE, JSON.stringify(etat));
    } catch {
      /* navigation privée ou stockage plein : la conversation ne sera pas gardée */
    }
  }

  // ─── Construction du DOM ───────────────────────────────────────────────────

  // Une balise à nous plutôt qu'un <div> : les règles du thème qui visent les
  // <div> de la page ne la touchent pas.
  const hote = document.createElement("duhalle-chatbot");
  const racine = hote.attachShadow({ mode: "open" });

  const style = document.createElement("style");
  style.textContent = `
    :host { all: initial !important; }
    * { box-sizing: border-box; }
    .dh {
      --dh-couleur: ${COULEUR};
      --dh-ocre: #B07420;
      --dh-creme: #F7F4EE;
      --dh-texte: #26302B;
      --dh-doux: #5E6A63;
      --dh-bord: #E2DDD2;
      font: 15px/1.5 -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      color: var(--dh-texte);
      text-align: left;
      -webkit-font-smoothing: antialiased;
    }
    button, textarea { font: inherit; letter-spacing: normal; text-transform: none; }
    .bulle {
      position: fixed; bottom: ${BAS}px; ${COTE}: 20px; z-index: 2147483000;
      display: flex; align-items: center; gap: 10px; height: 56px; padding: 0 22px 0 18px;
      border: 0; border-radius: 28px; background: var(--dh-couleur); color: #fff; cursor: pointer;
      font-weight: 600; white-space: nowrap; box-shadow: 0 6px 20px rgba(20, 30, 25, .28);
      transition: transform .15s ease, box-shadow .15s ease;
    }
    .bulle.appel { animation: dh-appel 1.1s ease-out; }
    .pastille-bulle {
      position: absolute; top: -5px; ${COTE}: -3px; display: none; place-items: center;
      min-width: 22px; height: 22px; padding: 0 6px; border: 2px solid #fff; border-radius: 11px;
      background: var(--dh-ocre); color: #fff; font-size: 11.5px; font-weight: 700; line-height: 1;
    }
    .bulle.signalee .pastille-bulle { display: grid; animation: dh-pastille .4s cubic-bezier(.2, .9, .3, 1.4); }
    .invite {
      position: fixed; bottom: ${BAS + 70}px; ${COTE}: 20px; z-index: 2147483000;
      width: 300px; max-width: calc(100vw - 40px); padding: 14px 16px 16px;
      background: #fff; border: 1px solid var(--dh-bord); border-radius: 14px;
      box-shadow: 0 14px 36px rgba(20, 30, 25, .24);
      transform-origin: bottom ${COTE}; animation: dh-invite .4s cubic-bezier(.2, .8, .2, 1);
    }
    .invite[hidden], .dh.ouvert .invite { display: none; }
    .invite::after {
      content: ""; position: absolute; bottom: -7px; ${COTE}: 24px; width: 12px; height: 12px; background: #fff;
      border-right: 1px solid var(--dh-bord); border-bottom: 1px solid var(--dh-bord); transform: rotate(45deg);
    }
    .invite-entete { display: flex; align-items: center; gap: 8px; margin: 0 30px 6px 0; font-size: 13px; font-weight: 700; color: var(--dh-couleur); }
    .invite-entete .enligne { width: 8px; height: 8px; flex: none; border-radius: 50%; background: #2E9E5B; box-shadow: 0 0 0 3px rgba(46, 158, 91, .18); }
    .invite-message {
      display: block; width: 100%; margin: 0; padding: 0; border: 0; background: none; cursor: pointer;
      color: var(--dh-texte); font-size: 14.5px; line-height: 1.45; text-align: left;
    }
    .invite-question {
      display: inline-flex; align-items: center; margin-top: 12px; min-height: 36px; padding: 7px 14px;
      border: 1px solid var(--dh-couleur); border-radius: 18px; background: #fff; color: var(--dh-couleur);
      font-size: 13.5px; font-weight: 600; line-height: 1.3; text-align: left; cursor: pointer;
    }
    .invite-question:hover { background: var(--dh-couleur); color: #fff; }
    .invite-fermer {
      position: absolute; top: 6px; right: 6px; width: 32px; height: 32px; border: 0; border-radius: 50%;
      background: transparent; color: var(--dh-doux); cursor: pointer; display: grid; place-items: center;
    }
    .invite-fermer:hover { background: var(--dh-creme); }
    .invite-fermer svg { width: 16px; height: 16px; }
    .bulle:hover { transform: translateY(-2px); box-shadow: 0 10px 24px rgba(20, 30, 25, .32); }
    .dh.ouvert .bulle { display: none; }
    .bulle:focus-visible, button:focus-visible, a:focus-visible {
      outline: 3px solid var(--dh-ocre); outline-offset: 2px;
    }
    .bulle svg { width: 24px; height: 24px; flex: none; }
    .fenetre {
      position: fixed; bottom: ${BAS}px; ${COTE}: 20px; z-index: 2147483647;
      width: 380px; max-width: calc(100vw - 32px);
      height: 600px; max-height: calc(100vh - ${BAS + 24}px); max-height: calc(100dvh - ${BAS + 24}px);
      display: flex; flex-direction: column; overflow: hidden;
      background: #fff; border-radius: 14px; box-shadow: 0 12px 40px rgba(20, 30, 25, .3);
    }
    .fenetre[hidden] { display: none; }
    .entete {
      flex: none; display: flex; align-items: center; gap: 12px; padding: 14px 10px 14px 18px;
      background: var(--dh-couleur); color: #fff;
    }
    .entete .textes { flex: 1; min-width: 0; }
    .entete .titre { margin: 0; font: 600 18px/1.25 Georgia, "Times New Roman", serif; }
    .entete .sous-titre { margin: 2px 0 0; font-size: 12.5px; line-height: 1.35; opacity: .85; }
    .fermer {
      flex: none; width: 44px; height: 44px; border: 0; border-radius: 50%; background: transparent; color: #fff;
      cursor: pointer; display: grid; place-items: center;
    }
    .fermer:hover { background: rgba(255, 255, 255, .15); }
    .fermer svg { width: 20px; height: 20px; }
    .fil {
      position: relative; flex: 1; min-height: 0; overflow-y: auto; overscroll-behavior: contain;
      padding: 16px 14px 6px; background: var(--dh-creme);
    }
    .msg {
      width: fit-content; max-width: 88%; margin: 0 0 10px; padding: 10px 14px;
      border-radius: 14px; overflow-wrap: anywhere; animation: dh-apparition .18s ease-out;
    }
    .msg p { margin: 0 0 8px; } .msg p:last-child { margin-bottom: 0; }
    .msg ul, .msg ol { margin: 4px 0 8px; padding-left: 22px; } .msg ul:last-child, .msg ol:last-child { margin-bottom: 0; }
    .msg li { margin: 3px 0; } .msg li::marker { color: var(--dh-doux); }
    .msg strong { font-weight: 700; }
    .msg.assistant { background: #fff; border: 1px solid var(--dh-bord); border-bottom-left-radius: 4px; }
    .msg.client { margin-left: auto; background: var(--dh-couleur); color: #fff; border-bottom-right-radius: 4px; white-space: pre-wrap; }
    .liens { display: flex; flex-wrap: wrap; gap: 6px; margin-top: 10px; }
    .liens a {
      display: inline-flex; align-items: center; min-height: 34px; padding: 6px 12px;
      border-radius: 17px; background: var(--dh-creme); color: var(--dh-couleur); border: 1px solid var(--dh-bord);
      font-size: 13.5px; font-weight: 600; line-height: 1.3; text-decoration: none;
    }
    .liens a:hover { background: var(--dh-bord); }
    .suggestions { display: flex; flex-wrap: wrap; gap: 8px; margin: 0 0 12px; animation: dh-apparition .18s ease-out; }
    .suggestions button {
      min-height: 36px; padding: 6px 14px; border-radius: 18px; cursor: pointer;
      border: 1px solid var(--dh-couleur); background: #fff; color: var(--dh-couleur);
      font-size: 13.5px; line-height: 1.3; text-align: left;
    }
    .suggestions button:hover { background: var(--dh-couleur); color: #fff; }
    .saisie { flex: none; display: flex; align-items: flex-end; gap: 8px; padding: 12px; border-top: 1px solid var(--dh-bord); background: #fff; }
    .saisie textarea {
      flex: 1; min-width: 0; height: 44px; min-height: 44px; max-height: 120px; resize: none; padding: 10px 12px; margin: 0;
      border: 1px solid var(--dh-bord); border-radius: 10px; color: var(--dh-texte); background: #fff;
      font-size: 16px; line-height: 1.4; /* 16 px : sur iPhone, un champ plus petit fait zoomer la page */
    }
    .saisie textarea:focus { outline: none; border-color: var(--dh-couleur); box-shadow: 0 0 0 1px var(--dh-couleur); }
    .saisie textarea::placeholder { color: #8A938E; }
    .saisie button {
      width: 44px; height: 44px; flex: none; border: 0; border-radius: 10px; cursor: pointer;
      background: var(--dh-couleur); color: #fff; display: grid; place-items: center;
    }
    .saisie button:disabled { opacity: .5; cursor: default; }
    .saisie svg { width: 20px; height: 20px; }
    .mention { flex: none; margin: 0; padding: 0 12px 10px; font-size: 11.5px; line-height: 1.4; color: var(--dh-doux); background: #fff; }
    .attente { display: inline-flex; gap: 4px; padding: 4px 0; }
    .attente span { width: 7px; height: 7px; border-radius: 50%; background: var(--dh-ocre); animation: dh-rebond 1s infinite ease-in-out; }
    .attente span:nth-child(2) { animation-delay: .15s; } .attente span:nth-child(3) { animation-delay: .3s; }
    .msg.frappe { cursor: pointer; }
    .msg.frappe .ecrit::after {
      content: ""; display: inline-block; width: 2px; height: 1em; margin-left: 2px; vertical-align: -2px;
      background: var(--dh-ocre); animation: dh-curseur .8s steps(1) infinite;
    }
    @keyframes dh-rebond { 0%, 80%, 100% { opacity: .3; transform: translateY(0); } 40% { opacity: 1; transform: translateY(-3px); } }
    @keyframes dh-curseur { 50% { opacity: 0; } }
    @keyframes dh-apparition { from { opacity: 0; transform: translateY(4px); } to { opacity: 1; transform: none; } }
    @keyframes dh-appel {
      0%, 100% { transform: translateY(0); }
      18% { transform: translateY(-5px); }
      34% { transform: translateY(0); }
      50% { transform: translateY(-2px); }
      66% { transform: translateY(0); }
    }
    @keyframes dh-invite { from { opacity: 0; transform: translateY(12px) scale(.96); } to { opacity: 1; transform: none; } }
    @keyframes dh-pastille { from { transform: scale(0); } to { transform: scale(1); } }
    .cache { position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0 0 0 0); white-space: nowrap; }
    @media (prefers-reduced-motion: reduce) {
      .bulle, .msg, .suggestions, .attente span, .invite, .pastille-bulle { transition: none; animation: none !important; }
    }
    @media (max-width: 480px), (max-height: 520px) {
      .fenetre { inset: 0; width: 100%; max-width: none; height: 100%; max-height: none; border-radius: 0; }
      /* À droite, la place de la pastille des cookies, qui reste par-dessus. */
      .mention { padding-right: 72px; padding-bottom: calc(10px + env(safe-area-inset-bottom, 0px)); }
    }
    @media (max-width: 480px) {
      .bulle { width: 56px; padding: 0; justify-content: center; }
      .bulle .libelle { display: none; }
    }
  `;

  const ICONE_BULLE =
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 12a8 8 0 0 1-11.6 7.1L4 20l1-4.6A8 8 0 1 1 21 12z"/></svg>';
  const ICONE_FERMER =
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg>';
  const ICONE_ENVOYER =
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>';

  // Gabarit fixe, sans aucune donnée : titre et téléphone sont posés ensuite en texte.
  const conteneur = document.createElement("div");
  conteneur.className = "dh";
  conteneur.innerHTML = `
    <div class="invite" role="complementary" aria-label="Invitation du conseiller" hidden>
      <p class="invite-entete"><span class="enligne" aria-hidden="true"></span><span class="invite-nom"></span></p>
      <button class="invite-message" type="button"></button>
      <button class="invite-question" type="button"></button>
      <button class="invite-fermer" type="button" aria-label="Masquer l'invitation">${ICONE_FERMER}</button>
    </div>
    <button class="bulle" type="button" aria-label="Une question ? Ouvrir le conseiller" aria-haspopup="dialog" aria-expanded="false" aria-controls="dh-fenetre">
      ${ICONE_BULLE}<span class="libelle" aria-hidden="true">Une question ?</span><span class="pastille-bulle" aria-hidden="true">1</span>
    </button>
    <section class="fenetre" id="dh-fenetre" role="dialog" aria-modal="false" aria-labelledby="dh-titre" hidden>
      <header class="entete">
        <div class="textes">
          <p class="titre" id="dh-titre"></p>
          <p class="sous-titre">Réponse immédiate sur nos produits et nos conseils</p>
        </div>
        <button class="fermer" type="button" aria-label="Fermer la discussion">${ICONE_FERMER}</button>
      </header>
      <div class="fil" role="log" aria-live="off"></div>
      <p class="annonce cache" role="status" aria-live="polite"></p>
      <form class="saisie">
        <label class="cache" for="dh-question">Votre question</label>
        <textarea id="dh-question" rows="1" maxlength="${LONGUEUR_MAX}" placeholder="Posez votre question…"></textarea>
        <button type="submit" aria-label="Envoyer la question">${ICONE_ENVOYER}</button>
      </form>
      <p class="mention"></p>
    </section>
  `;
  racine.append(style, conteneur);

  const $ = <T extends Element>(selecteur: string) => conteneur.querySelector(selecteur) as T;
  const bulle = $<HTMLButtonElement>(".bulle");
  const fenetre = $<HTMLElement>(".fenetre");
  const fil = $<HTMLDivElement>(".fil");
  const annonce = $<HTMLParagraphElement>(".annonce");
  const formulaire = $<HTMLFormElement>(".saisie");
  const champ = $<HTMLTextAreaElement>("textarea");
  const envoyer = $<HTMLButtonElement>(".saisie button");
  const invite = $<HTMLDivElement>(".invite");
  $<HTMLParagraphElement>(".titre").textContent = TITRE;
  $<HTMLSpanElement>(".invite-nom").textContent = TITRE;
  // Les questions sont enregistrées (anonymisées) pour enrichir la base : le client en est informé.
  $<HTMLParagraphElement>(".mention").textContent =
    `Assistant automatique. Vos questions sont enregistrées anonymement pour l'améliorer : n'y indiquez pas d'informations personnelles. Commande : ${TELEPHONE}.`;

  // ─── Mise en forme des réponses (sans jamais injecter de HTML reçu) ────────

  /** **gras** dans une ligne, en nœuds texte et <strong>. */
  function enLigne(parent: HTMLElement, texte: string) {
    texte.split(/(\*\*[^*]+\*\*)/g).forEach((morceau) => {
      if (/^\*\*[^*]+\*\*$/.test(morceau)) {
        const fort = document.createElement("strong");
        fort.textContent = morceau.slice(2, -2);
        parent.append(fort);
      } else if (morceau) {
        parent.append(document.createTextNode(morceau));
      }
    });
  }

  /** Paragraphes, listes « - » et « 1. », gras. */
  function mettreEnForme(parent: HTMLElement, texte: string) {
    for (const bloc of texte.split(/\n\s*\n/)) {
      const lignes = bloc.split("\n").filter((l) => l.trim());
      let liste: HTMLElement | null = null;
      let paragraphe: HTMLElement | null = null;
      for (const ligne of lignes) {
        const puce = /^\s*(?:-|\d+\.)\s+(.*)$/.exec(ligne);
        if (puce) {
          const ordonnee = /^\s*\d+\./.test(ligne);
          if (!liste || (liste.tagName === "OL") !== ordonnee) {
            liste = document.createElement(ordonnee ? "ol" : "ul");
            parent.append(liste);
          }
          const item = document.createElement("li");
          enLigne(item, puce[1]!);
          liste.append(item);
          paragraphe = null;
        } else {
          liste = null;
          if (!paragraphe) {
            paragraphe = document.createElement("p");
            parent.append(paragraphe);
          } else {
            paragraphe.append(document.createElement("br"));
          }
          enLigne(paragraphe, ligne.trim());
        }
      }
    }
  }

  function creerLiens(liens: Lien[] | undefined): HTMLElement | null {
    const valides = liensValides(liens);
    if (!valides.length) return null;
    const zone = document.createElement("div");
    zone.className = "liens";
    for (const lien of valides) {
      const a = document.createElement("a");
      a.href = lien.url;
      a.textContent = lien.libelle;
      // Une page du site s'ouvre dans l'onglet : la discussion suit le client.
      if (new URL(lien.url).hostname !== location.hostname) {
        a.target = "_blank";
        a.rel = "noopener noreferrer";
      }
      zone.append(a);
    }
    return zone;
  }

  const versLeBas = () => {
    fil.scrollTop = fil.scrollHeight;
  };

  /** Cale le fil sur un message : sa fin si elle tient à l'écran, sinon son début. */
  function caler(bloc: HTMLElement) {
    fil.scrollTop = Math.min(Math.max(0, bloc.offsetTop - 12), fil.scrollHeight - fil.clientHeight);
  }

  /**
   * Affiche un message. Une réponse du conseiller peut s'écrire lettre à
   * lettre (`ecrire`) ; sinon elle apparaît d'un coup. `fin` est appelé quand
   * elle est entièrement affichée.
   */
  function afficher(message: Message, ecrire = false, fin?: () => void) {
    const bloc = document.createElement("div");
    bloc.className = `msg ${message.de}`;
    fil.append(bloc);
    if (message.de === "client") {
      bloc.textContent = message.texte;
      versLeBas();
      fin?.();
      return;
    }
    const contenu = document.createElement("div");
    mettreEnForme(contenu, message.texte);
    bloc.append(contenu);
    const liens = creerLiens(message.liens);
    const terminer = () => {
      if (liens) bloc.append(liens);
      fin?.();
    };
    if (ecrire && !MOUVEMENT_REDUIT) {
      taper(bloc, contenu, (suivre) => {
        terminer();
        if (suivre) versLeBas();
      });
    } else {
      terminer();
      caler(bloc);
    }
  }

  // ─── L'écriture lettre à lettre ────────────────────────────────────────────

  /** Termine immédiatement l'écriture en cours, s'il y en a une. */
  let finirFrappe: (() => void) | null = null;

  function taper(bloc: HTMLElement, contenu: HTMLElement, fin: (suivre: boolean) => void) {
    finirFrappe?.();
    // La bulle prend d'emblée sa largeur finale : elle ne s'élargit pas au fil des lettres.
    const largeur = bloc.getBoundingClientRect().width;
    if (largeur > 0) bloc.style.width = `${largeur}px`;
    // Le texte est déjà mis en forme ; on vide chaque nœud texte et on le
    // remplit peu à peu. Les paragraphes et puces n'apparaissent qu'au moment
    // où leur texte commence, pour ne pas montrer de puces vides.
    const morceaux: Array<{ noeud: Text; texte: string }> = [];
    const parcours = document.createTreeWalker(contenu, NodeFilter.SHOW_TEXT);
    for (let n = parcours.nextNode(); n; n = parcours.nextNode()) {
      const noeud = n as Text;
      morceaux.push({ noeud, texte: noeud.data });
      noeud.data = "";
    }
    const blocs = Array.from(contenu.querySelectorAll<HTMLElement>("p, ul, ol, li"));
    blocs.forEach((b) => (b.hidden = true));
    // Le curseur clignotant suit le paragraphe ou la puce en cours d'écriture.
    let ligne: Element | null = null;
    const reveler = (noeud: Node) => {
      for (let el = noeud.parentElement; el && el !== contenu; el = el.parentElement) el.hidden = false;
      const courante = noeud.parentElement?.closest("p, li") ?? null;
      if (courante !== ligne) {
        ligne?.classList.remove("ecrit");
        courante?.classList.add("ecrit");
        ligne = courante;
      }
    };

    const total = morceaux.reduce((n, m) => n + m.texte.length, 0);
    const parMs = Math.max(VITESSE_FRAPPE / 1000, total / DUREE_FRAPPE_MAX);
    const debut = performance.now();
    let indice = 0;
    let ecrits = 0;
    bloc.classList.add("frappe");
    bloc.setAttribute("aria-hidden", "true");

    // Le fil suit l'écriture, sauf si le client remonte lire plus haut ; il
    // la suit de nouveau s'il redescend en bas.
    let suivre = true;
    const surDefilement = () => {
      suivre = fil.scrollHeight - fil.scrollTop - fil.clientHeight < 40;
    };
    fil.addEventListener("scroll", surDefilement, { passive: true });

    let image = 0;
    const terminer = () => {
      cancelAnimationFrame(image);
      for (; indice < morceaux.length; indice++) {
        reveler(morceaux[indice]!.noeud);
        morceaux[indice]!.noeud.data = morceaux[indice]!.texte;
      }
      blocs.forEach((b) => (b.hidden = false));
      ligne?.classList.remove("ecrit");
      bloc.classList.remove("frappe");
      bloc.style.width = "";
      bloc.removeAttribute("aria-hidden");
      bloc.removeEventListener("click", terminer);
      fil.removeEventListener("scroll", surDefilement);
      finirFrappe = null;
      fin(suivre);
    };

    const avancer = (maintenant: number) => {
      const cible = Math.min(total, Math.floor((maintenant - debut) * parMs));
      while (ecrits < cible && indice < morceaux.length) {
        const { noeud, texte } = morceaux[indice]!;
        reveler(noeud);
        const ajout = Math.min(cible - ecrits, texte.length - noeud.data.length);
        noeud.data = texte.slice(0, noeud.data.length + ajout);
        ecrits += ajout;
        if (noeud.data.length >= texte.length) indice++;
      }
      if (suivre) versLeBas();
      if (ecrits >= total) terminer();
      else image = requestAnimationFrame(avancer);
    };

    // Un clic sur le message l'affiche en entier.
    bloc.addEventListener("click", terminer);
    finirFrappe = terminer;
    image = requestAnimationFrame(avancer);
  }

  /** Les questions suggérées, placées dans le fil juste sous la dernière réponse. */
  let zoneSuggestions: HTMLElement | null = null;

  function afficherSuggestions(suggestions: string[]) {
    zoneSuggestions?.remove();
    zoneSuggestions = null;
    if (!suggestions.length) return;
    const zone = document.createElement("div");
    zone.className = "suggestions";
    zone.setAttribute("role", "group");
    zone.setAttribute("aria-label", "Questions suggérées");
    for (const texte of suggestions) {
      const bouton = document.createElement("button");
      bouton.type = "button";
      bouton.textContent = texte;
      bouton.addEventListener("click", () => void poser(texte));
      zone.append(bouton);
    }
    fil.append(zone);
    zoneSuggestions = zone;
  }

  function afficherAttente(): HTMLElement {
    const bloc = document.createElement("div");
    bloc.className = "msg assistant";
    bloc.setAttribute("role", "img");
    bloc.setAttribute("aria-label", "Le conseiller écrit");
    const points = document.createElement("span");
    points.className = "attente";
    points.append(document.createElement("span"), document.createElement("span"), document.createElement("span"));
    bloc.append(points);
    fil.append(bloc);
    versLeBas();
    return bloc;
  }

  // ─── Échanges avec le Worker ───────────────────────────────────────────────

  const erreur = (texte: string): ReponseApi => ({ nature: "erreur", texte, liens: [], suggestions: [], contexte: null });
  const PANNE = erreur(`Le service est momentanément indisponible. Notre équipe vous répond au **${TELEPHONE}**.`);
  const TROP_DE_QUESTIONS = erreur(
    "Vous avez posé beaucoup de questions en peu de temps. Merci de patienter une minute avant la suivante.",
  );

  async function appeler(chemin: string, corps?: unknown): Promise<ReponseApi> {
    try {
      const reponse = await fetch(`${API}${chemin}`, {
        method: corps ? "POST" : "GET",
        // text/plain : une requête « simple », sans aller-retour préalable CORS.
        headers: corps ? { "Content-Type": "text/plain;charset=UTF-8" } : undefined,
        body: corps ? JSON.stringify(corps) : undefined,
        credentials: "omit",
        referrerPolicy: "no-referrer",
      });
      if (reponse.status === 429) return TROP_DE_QUESTIONS;
      if (!reponse.ok) return PANNE;
      return reponseValide(await reponse.json()) ?? PANNE;
    } catch {
      return PANNE;
    }
  }

  function recevoir(reponse: ReponseApi, ecrire = true) {
    const message: Message = { de: "assistant", texte: reponse.texte, liens: reponse.liens };
    etat.messages.push(message);
    etat.suggestions = reponse.suggestions;
    if (reponse.nature !== "erreur") etat.contexte = reponse.contexte;
    sauver();
    // Les lecteurs d'écran reçoivent la réponse entière, sans attendre l'écriture.
    annonce.textContent = message.texte.replace(/\*\*/g, "");
    afficher(message, ecrire, () => afficherSuggestions(etat.suggestions));
  }

  let enCours = false;

  async function poser(question: string) {
    const texte = String(question).trim().slice(0, LONGUEUR_MAX);
    if (!texte || enCours) return;
    // Une question posée directement (encart, suggestion) ouvre la discussion
    // sans le message d'accueil, qui arriverait après elle.
    ouvrir({ accueil: false });
    // Une nouvelle question interrompt la réponse en cours d'écriture : on l'affiche en entier.
    finirFrappe?.();
    enCours = true;
    envoyer.disabled = true;
    afficherSuggestions([]);
    const message: Message = { de: "client", texte };
    etat.messages.push(message);
    afficher(message);
    sauver();
    const attente = afficherAttente();
    const debut = Date.now();
    const reponse = await appeler("/api/chat", { message: texte, contexte: etat.contexte });
    // Le conseiller « réfléchit » un court instant, même quand la réponse est immédiate.
    const reste = MOUVEMENT_REDUIT ? 0 : ATTENTE_MIN - (Date.now() - debut);
    if (reste > 0) await new Promise((fini) => setTimeout(fini, reste));
    attente.remove();
    recevoir(reponse);
    enCours = false;
    envoyer.disabled = false;
  }

  // ─── Ouverture, fermeture ──────────────────────────────────────────────────

  let accueilDemande = false;

  // ─── L'invitation : une carte au-dessus de la bulle, adaptée à la page ─────
  // Elle apparaît après quelques secondes, sur deux pages au plus par visite,
  // jamais au panier ni pendant la commande, et plus du tout une fois fermée
  // ou le conseiller ouvert. Une pastille « 1 » reste ensuite sur la bulle.

  const INVITATION = choisirInvitation(location.pathname + location.search);
  let minuterieInvitation: number | undefined;

  const inviter = () =>
    INVITATION !== null && !etat.engage && !etat.inviteFermee && etat.invitations < INVITATIONS_MAX;

  function masquerInvitation(definitivement = false) {
    window.clearTimeout(minuterieInvitation);
    minuterieInvitation = undefined;
    invite.hidden = true;
    if (definitivement) {
      etat.inviteFermee = true;
      bulle.classList.remove("signalee");
      sauver();
    }
  }

  function montrerInvitation() {
    if (!inviter() || !fenetre.hidden) return;
    etat.invitations++;
    sauver();
    invite.hidden = false;
    bulle.classList.add("signalee");
    if (!MOUVEMENT_REDUIT) bulle.classList.add("appel");
    minuterieInvitation = window.setTimeout(() => masquerInvitation(), DUREE_INVITATION);
  }

  function programmerInvitation() {
    if (!inviter()) return;
    minuterieInvitation = window.setTimeout(() => {
      // Onglet en arrière-plan : on attend que le client revienne.
      if (document.hidden) document.addEventListener("visibilitychange", programmerInvitation, { once: true });
      else montrerInvitation();
    }, DELAI_INVITATION);
  }

  if (INVITATION) {
    $<HTMLButtonElement>(".invite-message").textContent = INVITATION.texte;
    $<HTMLButtonElement>(".invite-question").textContent = INVITATION.question;
    $<HTMLButtonElement>(".invite-message").addEventListener("click", () => ouvrir());
    $<HTMLButtonElement>(".invite-question").addEventListener("click", () => void poser(INVITATION.question));
  }
  $<HTMLButtonElement>(".invite-fermer").addEventListener("click", () => {
    masquerInvitation(true);
    bulle.focus();
  });
  bulle.addEventListener("animationend", () => bulle.classList.remove("appel"));

  function ouvrir({ accueil = true, focus = true } = {}) {
    if (!fenetre.hidden) return;
    masquerInvitation();
    bulle.classList.remove("signalee", "appel");
    etat.engage = true;
    fenetre.hidden = false;
    conteneur.classList.add("ouvert");
    bulle.setAttribute("aria-expanded", "true");
    etat.ouvert = true;
    sauver();
    // Le fil était caché : on le reprend à la fin de la conversation.
    if (!finirFrappe) versLeBas();
    if (accueil && etat.messages.length === 0 && !accueilDemande) {
      accueilDemande = true;
      void appeler("/api/accueil").then((reponse) => {
        // Le message d'accueil apparaît d'un coup ; seules les réponses s'écrivent.
        // Si une question a été posée entre-temps, il n'a plus lieu d'être.
        if (etat.messages.length === 0) recevoir(reponse, false);
      });
    }
    if (focus && !ECRAN_TACTILE) setTimeout(() => champ.focus(), 50);
  }

  function fermer() {
    if (fenetre.hidden) return;
    const avaitLeFocus = racine.activeElement !== null;
    fenetre.hidden = true;
    conteneur.classList.remove("ouvert");
    bulle.setAttribute("aria-expanded", "false");
    etat.ouvert = false;
    sauver();
    if (avaitLeFocus) bulle.focus();
  }

  bulle.addEventListener("click", () => ouvrir());
  $<HTMLButtonElement>(".fermer").addEventListener("click", fermer);
  conteneur.addEventListener("keydown", (e) => {
    if ((e as KeyboardEvent).key !== "Escape") return;
    if (!invite.hidden) masquerInvitation(true);
    fermer();
  });
  formulaire.addEventListener("submit", (e) => {
    e.preventDefault();
    const question = champ.value;
    champ.value = "";
    champ.style.height = "";
    void poser(question);
  });
  champ.addEventListener("keydown", (e) => {
    // Entrée envoie, Maj + Entrée passe à la ligne.
    if (e.key === "Enter" && !e.shiftKey && !e.isComposing) {
      e.preventDefault();
      formulaire.requestSubmit();
    }
  });
  champ.addEventListener("input", () => {
    champ.style.height = "";
    champ.style.height = `${Math.min(champ.scrollHeight + 2, 120)}px`;
  });

  // Reprise de la conversation en changeant de page : tout apparaît d'un coup.
  etat.messages.forEach((m) => afficher(m));
  afficherSuggestions(etat.suggestions);

  function demarrer() {
    document.body.append(hote);
    if (etat.ouvert) {
      ouvrir({ focus: false });
      return;
    }
    // Invitation déjà vue sur une page précédente, sans suite : la pastille reste.
    if (INVITATION && !etat.engage && !etat.inviteFermee && etat.invitations > 0) bulle.classList.add("signalee");
    programmerInvitation();
  }
  if (document.body) demarrer();
  else document.addEventListener("DOMContentLoaded", demarrer);

  window.DuhalleChat = Object.freeze({
    ouvrir: () => ouvrir(),
    fermer,
    poser: (question: string) => void poser(question),
  });
})();

export {};
