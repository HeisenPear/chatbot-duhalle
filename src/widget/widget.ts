// ═══════════════════════════════════════════════════════════════════════════
// LE WIDGET DU CHATBOT DUHALLÉ — le script chargé par le site Oxatis.
//
//   <script src="https://…workers.dev/widget.js" defer></script>
//
// Il affiche une bulle en bas de page ; au clic, une fenêtre de discussion.
// Tout le visuel vit dans un Shadow DOM : le thème du site ne le déforme pas,
// et il ne déforme pas le thème. La conversation est gardée pendant la
// visite (sessionStorage), pour suivre le client de page en page.
//
// Réglages facultatifs, en attributs de la balise <script> :
//   data-titre      titre de la fenêtre         (défaut : « Conseiller Duhallé »)
//   data-couleur    couleur principale          (défaut : bordeaux #6B2737)
//   data-position   « droite » ou « gauche »    (défaut : droite)
//   data-telephone  numéro affiché en cas de panne
//
// Il expose aussi window.DuhalleChat.ouvrir(), .fermer() et .poser("question"),
// utilisés par le bloc « bouton conseiller » à placer dans les pages.
// ═══════════════════════════════════════════════════════════════════════════

interface Lien {
  libelle: string;
  url: string;
}

interface Contexte {
  concepts: string[];
  type: string | null;
}

interface ReponseApi {
  nature: string;
  texte: string;
  liens: Lien[];
  suggestions: string[];
  contexte: Contexte;
}

interface Message {
  de: "client" | "assistant";
  texte: string;
  liens?: Lien[];
}

interface Etat {
  messages: Message[];
  suggestions: string[];
  contexte: Contexte | null;
  ouvert: boolean;
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
  const TITRE = reglage("titre") ?? "Conseiller Duhallé";
  const COULEUR = /^#[0-9a-f]{3,8}$/i.test(reglage("couleur") ?? "") ? reglage("couleur")! : "#6B2737";
  const A_GAUCHE = reglage("position") === "gauche";
  const TELEPHONE = reglage("telephone") ?? "02 47 53 00 26";
  const CLE = "duhalle-chatbot";
  const LONGUEUR_MAX = 500;
  /** Vitesse d'écriture du conseiller, en caractères par seconde… */
  const VITESSE_FRAPPE = 60;
  /** …sans qu'une longue réponse mette plus de ce temps à s'écrire (ms). */
  const DUREE_FRAPPE_MAX = 7000;
  /** Les points « le conseiller écrit » restent visibles au moins ce temps (ms). */
  const ATTENTE_MIN = 450;
  const MOUVEMENT_REDUIT = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;

  // ─── État, gardé pendant la visite ─────────────────────────────────────────

  function lireEtat(): Etat {
    try {
      const brut = sessionStorage.getItem(CLE);
      if (brut) {
        const e = JSON.parse(brut) as Etat;
        if (Array.isArray(e.messages)) return e;
      }
    } catch {
      /* stockage indisponible : on repart de zéro */
    }
    return { messages: [], suggestions: [], contexte: null, ouvert: false };
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

  const hote = document.createElement("div");
  hote.id = "duhalle-chatbot";
  const racine = hote.attachShadow({ mode: "open" });

  const style = document.createElement("style");
  style.textContent = `
    :host { all: initial; }
    * { box-sizing: border-box; }
    .dh {
      --dh-couleur: ${COULEUR};
      --dh-liege: #B5835A;
      --dh-creme: #F5EFE6;
      --dh-vert: #3E4E3A;
      --dh-texte: #2B2B2B;
      --dh-bord: #E4D9C8;
      font: 15px/1.5 -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      color: var(--dh-texte);
    }
    .bulle {
      position: fixed; bottom: 20px; ${A_GAUCHE ? "left" : "right"}: 20px; z-index: 2147483000;
      display: flex; align-items: center; gap: 10px;
      min-height: 56px; padding: 0 20px 0 16px; border: 0; border-radius: 28px;
      background: var(--dh-couleur); color: #fff; cursor: pointer;
      font: inherit; font-weight: 600; box-shadow: 0 6px 20px rgba(43, 43, 43, .25);
      transition: transform .15s ease, box-shadow .15s ease;
    }
    .bulle:hover { transform: translateY(-2px); box-shadow: 0 10px 24px rgba(43, 43, 43, .3); }
    .bulle:focus-visible, button:focus-visible, a:focus-visible, textarea:focus-visible {
      outline: 3px solid var(--dh-liege); outline-offset: 2px;
    }
    .bulle svg { width: 24px; height: 24px; flex: none; }
    .fenetre {
      position: fixed; bottom: 88px; ${A_GAUCHE ? "left" : "right"}: 20px; z-index: 2147483000;
      width: 380px; max-width: calc(100vw - 32px); height: 600px; max-height: calc(100vh - 110px);
      display: flex; flex-direction: column; overflow: hidden;
      background: #fff; border-radius: 12px; box-shadow: 0 12px 40px rgba(43, 43, 43, .28);
    }
    .fenetre[hidden] { display: none; }
    .entete {
      display: flex; align-items: center; gap: 12px; padding: 14px 16px;
      background: var(--dh-couleur); color: #fff;
    }
    .entete .titre { margin: 0; font: 600 18px/1.2 Georgia, "Times New Roman", serif; }
    .entete .sous-titre { margin: 2px 0 0; font-size: 12.5px; opacity: .85; }
    .entete .textes { flex: 1; min-width: 0; }
    .fermer {
      width: 44px; height: 44px; border: 0; border-radius: 50%; background: transparent; color: #fff;
      cursor: pointer; display: grid; place-items: center;
    }
    .fermer:hover { background: rgba(255, 255, 255, .15); }
    .fermer svg { width: 20px; height: 20px; }
    .fil { position: relative; flex: 1; overflow-y: auto; padding: 16px; background: var(--dh-creme); }
    .msg { max-width: 88%; margin: 0 0 12px; padding: 10px 14px; border-radius: 12px; overflow-wrap: anywhere; }
    .msg p { margin: 0 0 8px; } .msg p:last-child { margin-bottom: 0; }
    .msg ul, .msg ol { margin: 4px 0 8px; padding-left: 20px; } .msg li { margin: 2px 0; }
    .msg.assistant { background: #fff; border: 1px solid var(--dh-bord); border-bottom-left-radius: 4px; }
    .msg.client { margin-left: auto; background: var(--dh-couleur); color: #fff; border-bottom-right-radius: 4px; white-space: pre-wrap; }
    .liens { display: flex; flex-wrap: wrap; gap: 6px; margin-top: 10px; }
    .liens a {
      display: inline-flex; align-items: center; min-height: 36px; padding: 6px 12px;
      border-radius: 18px; background: var(--dh-creme); color: var(--dh-couleur);
      font-size: 13.5px; font-weight: 600; text-decoration: none; border: 1px solid var(--dh-bord);
    }
    .liens a:hover { background: var(--dh-bord); }
    .suggestions { display: flex; flex-wrap: wrap; gap: 8px; padding: 0 16px 12px; background: var(--dh-creme); }
    .suggestions:empty { display: none; }
    .suggestions button {
      min-height: 36px; padding: 6px 12px; border-radius: 18px; cursor: pointer;
      border: 1px solid var(--dh-couleur); background: #fff; color: var(--dh-couleur);
      font: inherit; font-size: 13.5px; text-align: left;
    }
    .suggestions button:hover { background: var(--dh-couleur); color: #fff; }
    .saisie { display: flex; gap: 8px; padding: 12px; border-top: 1px solid var(--dh-bord); background: #fff; }
    .saisie textarea {
      flex: 1; min-height: 44px; max-height: 120px; resize: none; padding: 11px 12px;
      border: 1px solid var(--dh-bord); border-radius: 10px; font: inherit; color: var(--dh-texte); background: #fff;
    }
    .saisie button {
      width: 44px; height: 44px; flex: none; align-self: flex-end; border: 0; border-radius: 10px; cursor: pointer;
      background: var(--dh-couleur); color: #fff; display: grid; place-items: center;
    }
    .saisie button:disabled { opacity: .5; cursor: default; }
    .saisie svg { width: 20px; height: 20px; }
    .mention { margin: 0; padding: 0 12px 10px; font-size: 11.5px; color: #6b6b6b; background: #fff; }
    .attente { display: inline-flex; gap: 4px; }
    .attente span { width: 7px; height: 7px; border-radius: 50%; background: var(--dh-liege); animation: dh-rebond 1s infinite ease-in-out; }
    .attente span:nth-child(2) { animation-delay: .15s; } .attente span:nth-child(3) { animation-delay: .3s; }
    @keyframes dh-rebond { 0%, 80%, 100% { opacity: .3; transform: translateY(0); } 40% { opacity: 1; transform: translateY(-3px); } }
    .msg.frappe { cursor: pointer; }
    .msg.frappe .ecrit::after { content: ""; display: inline-block; width: 2px; height: 1em; margin-left: 2px; vertical-align: -2px; background: var(--dh-liege); animation: dh-curseur .8s steps(1) infinite; }
    @keyframes dh-curseur { 50% { opacity: 0; } }
    .annonce { position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0 0 0 0); white-space: nowrap; }
    @media (prefers-reduced-motion: reduce) { .bulle, .attente span { transition: none; animation: none; } }
    @media (max-width: 480px) {
      .fenetre { inset: 0; width: 100%; max-width: none; height: 100%; max-height: none; border-radius: 0; }
      .bulle .libelle { display: none; }
      .bulle { padding: 0 16px; }
    }
  `;

  const ICONE_BULLE =
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 12a8 8 0 0 1-11.6 7.1L4 20l1-4.6A8 8 0 1 1 21 12z"/></svg>';
  const ICONE_FERMER =
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg>';
  const ICONE_ENVOYER =
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>';

  const conteneur = document.createElement("div");
  conteneur.className = "dh";
  conteneur.innerHTML = `
    <button class="bulle" type="button" aria-haspopup="dialog" aria-expanded="false" aria-controls="dh-fenetre">
      ${ICONE_BULLE}<span class="libelle">Une question ?</span>
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
      <p class="annonce" role="status" aria-live="polite"></p>
      <div class="suggestions" aria-label="Questions suggérées"></div>
      <form class="saisie">
        <label for="dh-question" style="position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0)">Votre question</label>
        <textarea id="dh-question" rows="1" maxlength="${LONGUEUR_MAX}" placeholder="Posez votre question…"></textarea>
        <button type="submit" aria-label="Envoyer la question">${ICONE_ENVOYER}</button>
      </form>
      <p class="mention">Assistant automatique Duhallé. Pour une question sur votre commande : ${echapper(TELEPHONE)}.</p>
    </section>
  `;
  racine.append(style, conteneur);

  const $ = <T extends Element>(selecteur: string) => conteneur.querySelector(selecteur) as T;
  const bulle = $<HTMLButtonElement>(".bulle");
  const fenetre = $<HTMLElement>(".fenetre");
  const fil = $<HTMLDivElement>(".fil");
  const zoneSuggestions = $<HTMLDivElement>(".suggestions");
  const annonce = $<HTMLParagraphElement>(".annonce");
  const formulaire = $<HTMLFormElement>(".saisie");
  const champ = $<HTMLTextAreaElement>("textarea");
  const envoyer = $<HTMLButtonElement>(".saisie button");
  $<HTMLParagraphElement>(".titre").textContent = TITRE;

  function echapper(texte: string): string {
    return texte.replace(/[&<>"']/g, (c) => `&#${c.charCodeAt(0)};`);
  }

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
    const valides = (liens ?? []).filter((l) => /^https:\/\//.test(l.url));
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
        a.rel = "noopener";
      }
      zone.append(a);
    }
    return zone;
  }

  /** Cale le fil sur un message : sa fin si elle tient à l'écran, sinon son début. */
  function caler(bloc: HTMLElement) {
    fil.scrollTop = Math.min(Math.max(0, bloc.offsetTop - 12), fil.scrollHeight - fil.clientHeight);
  }

  /**
   * Affiche un message. Une réponse du conseiller peut s'écrire lettre à
   * lettre (`ecrire`) ; `fin` est appelé quand elle est entièrement affichée.
   */
  function afficher(message: Message, ecrire = false, fin?: () => void) {
    const bloc = document.createElement("div");
    bloc.className = `msg ${message.de}`;
    fil.append(bloc);
    if (message.de === "client") {
      bloc.textContent = message.texte;
      fil.scrollTop = fil.scrollHeight;
      fin?.();
      return;
    }
    const contenu = document.createElement("div");
    contenu.className = "contenu";
    mettreEnForme(contenu, message.texte);
    bloc.append(contenu);
    const liens = creerLiens(message.liens);
    const terminer = () => {
      if (liens) bloc.append(liens);
      caler(bloc);
      fin?.();
    };
    if (ecrire && !MOUVEMENT_REDUIT) taper(bloc, contenu, terminer);
    else terminer();
  }

  // ─── L'écriture lettre à lettre ────────────────────────────────────────────

  /** Termine immédiatement l'écriture en cours, s'il y en a une. */
  let finirFrappe: (() => void) | null = null;

  function taper(bloc: HTMLElement, contenu: HTMLElement, fin: () => void) {
    finirFrappe?.();
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
    let suivre = true;
    let indice = 0;
    let ecrits = 0;
    bloc.classList.add("frappe");
    bloc.setAttribute("aria-hidden", "true");

    const arreterDeSuivre = () => (suivre = false);
    fil.addEventListener("wheel", arreterDeSuivre, { passive: true });
    fil.addEventListener("touchmove", arreterDeSuivre, { passive: true });

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
      bloc.removeAttribute("aria-hidden");
      bloc.removeEventListener("click", terminer);
      fil.removeEventListener("wheel", arreterDeSuivre);
      fil.removeEventListener("touchmove", arreterDeSuivre);
      finirFrappe = null;
      fin();
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
      if (suivre) caler(bloc);
      if (ecrits >= total) terminer();
      else image = requestAnimationFrame(avancer);
    };

    // Un clic sur le message l'affiche en entier.
    bloc.addEventListener("click", terminer);
    finirFrappe = terminer;
    image = requestAnimationFrame(avancer);
  }

  function afficherSuggestions(suggestions: string[]) {
    zoneSuggestions.replaceChildren();
    for (const texte of suggestions.slice(0, 5)) {
      const bouton = document.createElement("button");
      bouton.type = "button";
      bouton.textContent = texte;
      bouton.addEventListener("click", () => poser(texte));
      zoneSuggestions.append(bouton);
    }
  }

  function afficherAttente(): HTMLElement {
    const bloc = document.createElement("div");
    bloc.className = "msg assistant";
    bloc.setAttribute("aria-label", "Le conseiller écrit");
    bloc.innerHTML = '<span class="attente"><span></span><span></span><span></span></span>';
    fil.append(bloc);
    fil.scrollTop = fil.scrollHeight;
    return bloc;
  }

  // ─── Échanges avec le Worker ───────────────────────────────────────────────

  const PANNE: ReponseApi = {
    nature: "erreur",
    texte: `Le service est momentanément indisponible. Notre équipe vous répond au **${TELEPHONE}**.`,
    liens: [],
    suggestions: [],
    contexte: { concepts: [], type: null },
  };

  async function appeler(chemin: string, corps?: unknown): Promise<ReponseApi> {
    try {
      const reponse = await fetch(`${API}${chemin}`, {
        method: corps ? "POST" : "GET",
        // text/plain : une requête « simple », sans aller-retour préalable CORS.
        headers: corps ? { "Content-Type": "text/plain;charset=UTF-8" } : undefined,
        body: corps ? JSON.stringify(corps) : undefined,
      });
      if (!reponse.ok) return PANNE;
      return (await reponse.json()) as ReponseApi;
    } catch {
      return PANNE;
    }
  }

  function recevoir(reponse: ReponseApi) {
    const message: Message = { de: "assistant", texte: reponse.texte, liens: reponse.liens };
    etat.messages.push(message);
    etat.suggestions = reponse.suggestions ?? [];
    if (reponse.nature !== "erreur") etat.contexte = reponse.contexte;
    sauver();
    // Les lecteurs d'écran reçoivent la réponse entière, sans attendre l'écriture.
    annonce.textContent = message.texte.replace(/\*\*/g, "");
    afficher(message, true, () => afficherSuggestions(etat.suggestions));
  }

  let enCours = false;

  async function poser(question: string) {
    const texte = question.trim().slice(0, LONGUEUR_MAX);
    if (!texte || enCours) return;
    // Une question posée directement (encart, suggestion) ouvre la discussion
    // sans le message d'accueil, qui arriverait après elle.
    ouvrir(false);
    // Une nouvelle question interrompt la réponse en cours d'écriture : on l'affiche en entier.
    finirFrappe?.();
    enCours = true;
    envoyer.disabled = true;
    const message: Message = { de: "client", texte };
    etat.messages.push(message);
    afficher(message);
    afficherSuggestions([]);
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

  function ouvrir(avecAccueil = true) {
    if (!fenetre.hidden) return;
    fenetre.hidden = false;
    bulle.setAttribute("aria-expanded", "true");
    etat.ouvert = true;
    sauver();
    if (avecAccueil && etat.messages.length === 0 && !accueilDemande) {
      accueilDemande = true;
      void appeler("/api/accueil").then(recevoir);
    }
    setTimeout(() => champ.focus(), 50);
  }

  function fermer() {
    if (fenetre.hidden) return;
    fenetre.hidden = true;
    bulle.setAttribute("aria-expanded", "false");
    etat.ouvert = false;
    sauver();
    bulle.focus();
  }

  bulle.addEventListener("click", () => (fenetre.hidden ? ouvrir() : fermer()));
  $<HTMLButtonElement>(".fermer").addEventListener("click", fermer);
  conteneur.addEventListener("keydown", (e) => {
    if ((e as KeyboardEvent).key === "Escape") fermer();
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
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      formulaire.requestSubmit();
    }
  });
  champ.addEventListener("input", () => {
    champ.style.height = "";
    champ.style.height = `${Math.min(champ.scrollHeight, 120)}px`;
  });

  // Reprise de la conversation en changeant de page.
  etat.messages.forEach((m) => afficher(m));
  afficherSuggestions(etat.suggestions);

  function demarrer() {
    document.body.append(hote);
    if (etat.ouvert) ouvrir();
  }
  if (document.body) demarrer();
  else document.addEventListener("DOMContentLoaded", demarrer);

  window.DuhalleChat = { ouvrir: () => ouvrir(), fermer, poser: (q: string) => void poser(q) };
})();

export {};
