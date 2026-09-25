/* Chatbot Duhallé — widget compilé depuis src/widget/widget.ts (npm run build). Ne pas modifier à la main. */
"use strict";(()=>{var ke=[{motif:/cidre|pommes?\b|pressoir|broyeur/,texte:"Vous pr\xE9parez votre cidre ? Je vous guide pas \xE0 pas.",question:"Comment faire son cidre ?"},{motif:/\bcires?\b|cachet/,texte:"Vous h\xE9sitez entre cire dure et cire souple ? Je vous aide \xE0 choisir.",question:"Cire dure ou souple ?"},{motif:/vinaigr/,texte:"Envie de faire votre propre vinaigre ? Je vous explique tout.",question:"Comment faire du vinaigre ?"},{motif:/\bconserves?\b|bocal|bocaux|steril|terrine|confiture/,texte:"Une question sur vos conserves maison ? Je vous r\xE9ponds tout de suite.",question:"Comment st\xE9riliser des bocaux ?"},{motif:/tire.?bouchon|sommelier|degust|carafe|service.du.vin/,texte:"Besoin d'un conseil pour ouvrir ou servir votre vin ?",question:"Quel tire-bouchon choisir ?"},{motif:/\bcave\b|range.?bouteille|casier|porte.?bouteille/,texte:"Une question sur le rangement ou la conservation du vin ?",question:"Comment conserver une bouteille de vin ?"},{motif:/bouchon|bouchage|boucheuse|liege/,texte:"Le bon bouchon d\xE9pend de la garde de votre vin. Je vous conseille en quelques secondes.",question:"Quel bouchon choisir pour mon vin ?"},{motif:/bouteille|embouteill|capsul|tireuse|remplis/,texte:"Besoin d'aide pour votre mise en bouteille ? Je vous r\xE9ponds tout de suite.",question:"Comment mettre mon vin en bouteille ?"}],Me={texte:"Une question sur nos produits ou sur la mise en bouteille ? Je vous r\xE9ponds tout de suite.",question:"Quel bouchon choisir pour mon vin ?"},Ze=/panier|cart|basket|checkout|commande|order|paiement|payment|login|connexion|compte|account/;function et(p){return p.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g,"")}function Ae(p){let f=et(p);if(Ze.test(f))return null;let A=ke.find(R=>R.motif.test(f));return A?{texte:A.texte,question:A.question}:Me}var tt=[...ke.map(({texte:p,question:f})=>({texte:p,question:f})),Me];(function(){var ge,he,xe,ve,be,Ee,we,ye;if(window.DuhalleChat)return;let p=document.currentScript,f=e=>{var t;return(t=p==null?void 0:p.getAttribute(`data-${e}`))!=null?t:void 0},A=p!=null&&p.src?new URL(p.src).origin:"",R=((ge=f("titre"))!=null?ge:"Conseiller Duhall\xE9").slice(0,60),qe=/^#[0-9a-f]{3,8}$/i.test((he=f("couleur"))!=null?he:"")?f("couleur"):"#20342C",y=f("position")==="gauche"?"left":"right",q=/^\d{1,3}$/.test((xe=f("decalage"))!=null?xe:"")?Math.min(Number(f("decalage")),400):84,Q=((ve=f("telephone"))!=null?ve:"02 47 53 00 26").slice(0,30),W="duhalle-chatbot",K=500,Z=4e3,Ie=["www.duhalle-boutique.fr","duhalle-boutique.fr"],Ne=60,Ce=7e3,He=450,Se=6e3,Re=2,$e=25e3,B=(Ee=(be=window.matchMedia)==null?void 0:be.call(window,"(prefers-reduced-motion: reduce)").matches)!=null?Ee:!1,Oe=(ye=(we=window.matchMedia)==null?void 0:we.call(window,"(pointer: coarse)").matches)!=null?ye:!1;function ze(e){try{let t=new URL(e);return t.protocol==="https:"&&Ie.includes(t.hostname)}catch{return!1}}function U(e){if(!Array.isArray(e))return[];let t=[];for(let n of e){if(!n||typeof n!="object")continue;let{libelle:i,url:o}=n;typeof i=="string"&&typeof o=="string"&&ze(o)&&t.push({libelle:i.slice(0,80),url:o})}return t.slice(0,6)}function ee(e){return Array.isArray(e)?e.filter(t=>typeof t=="string"&&t.trim()!=="").map(t=>t.slice(0,120)).slice(0,5):[]}function _e(e){if(!e||typeof e!="object")return null;let{de:t,texte:n,liens:i}=e;return t!=="client"&&t!=="assistant"||typeof n!="string"?null:{de:t,texte:n.slice(0,Z),liens:U(i)}}function De(e){if(!e||typeof e!="object")return null;let t=e;return typeof t.texte!="string"||!t.texte.trim()?null:{nature:typeof t.nature=="string"?t.nature:"reponse",texte:t.texte.slice(0,Z),liens:U(t.liens),suggestions:ee(t.suggestions),contexte:t.contexte&&typeof t.contexte=="object"?t.contexte:null}}function Be(){var e;try{let t=JSON.parse((e=sessionStorage.getItem(W))!=null?e:"null");if(t&&Array.isArray(t.messages))return{messages:t.messages.map(_e).filter(n=>n!==null).slice(-40),suggestions:ee(t.suggestions),contexte:t.contexte&&typeof t.contexte=="object"?t.contexte:null,ouvert:t.ouvert===!0,engage:t.engage===!0||t.ouvert===!0||t.messages.length>0,invitations:typeof t.invitations=="number"?Math.min(Math.max(Math.floor(t.invitations),0),99):0,inviteFermee:t.inviteFermee===!0}}catch{}return{messages:[],suggestions:[],contexte:null,ouvert:!1,engage:!1,invitations:0,inviteFermee:!1}}let r=Be();function L(){try{r.messages=r.messages.slice(-40),sessionStorage.setItem(W,JSON.stringify(r))}catch{}}let te=document.createElement("duhalle-chatbot"),ne=te.attachShadow({mode:"open"}),ie=document.createElement("style");ie.textContent=`
    :host { all: initial !important; }
    * { box-sizing: border-box; }
    .dh {
      --dh-couleur: ${qe};
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
      position: fixed; bottom: ${q}px; ${y}: 20px; z-index: 2147483000;
      display: flex; align-items: center; gap: 10px; height: 56px; padding: 0 22px 0 18px;
      border: 0; border-radius: 28px; background: var(--dh-couleur); color: #fff; cursor: pointer;
      font-weight: 600; white-space: nowrap; box-shadow: 0 6px 20px rgba(20, 30, 25, .28);
      transition: transform .15s ease, box-shadow .15s ease;
    }
    .bulle.appel { animation: dh-appel 1.1s ease-out; }
    .pastille-bulle {
      position: absolute; top: -5px; ${y}: -3px; display: none; place-items: center;
      min-width: 22px; height: 22px; padding: 0 6px; border: 2px solid #fff; border-radius: 11px;
      background: var(--dh-ocre); color: #fff; font-size: 11.5px; font-weight: 700; line-height: 1;
    }
    .bulle.signalee .pastille-bulle { display: grid; animation: dh-pastille .4s cubic-bezier(.2, .9, .3, 1.4); }
    .invite {
      position: fixed; bottom: ${q+70}px; ${y}: 20px; z-index: 2147483000;
      width: 300px; max-width: calc(100vw - 40px); padding: 14px 16px 16px;
      background: #fff; border: 1px solid var(--dh-bord); border-radius: 14px;
      box-shadow: 0 14px 36px rgba(20, 30, 25, .24);
      transform-origin: bottom ${y}; animation: dh-invite .4s cubic-bezier(.2, .8, .2, 1);
    }
    .invite[hidden], .dh.ouvert .invite { display: none; }
    .invite::after {
      content: ""; position: absolute; bottom: -7px; ${y}: 24px; width: 12px; height: 12px; background: #fff;
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
      position: fixed; bottom: ${q}px; ${y}: 20px; z-index: 2147483647;
      width: 380px; max-width: calc(100vw - 32px);
      height: 600px; max-height: calc(100vh - ${q+24}px); max-height: calc(100dvh - ${q+24}px);
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
      /* \xC0 droite, la place de la pastille des cookies, qui reste par-dessus. */
      .mention { padding-right: 72px; padding-bottom: calc(10px + env(safe-area-inset-bottom, 0px)); }
    }
    @media (max-width: 480px) {
      .bulle { width: 56px; padding: 0; justify-content: center; }
      .bulle .libelle { display: none; }
    }
  `;let Ue='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 12a8 8 0 0 1-11.6 7.1L4 20l1-4.6A8 8 0 1 1 21 12z"/></svg>',oe='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg>',Fe='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>',w=document.createElement("div");w.className="dh",w.innerHTML=`
    <div class="invite" role="complementary" aria-label="Invitation du conseiller" hidden>
      <p class="invite-entete"><span class="enligne" aria-hidden="true"></span><span class="invite-nom"></span></p>
      <button class="invite-message" type="button"></button>
      <button class="invite-question" type="button"></button>
      <button class="invite-fermer" type="button" aria-label="Masquer l'invitation">${oe}</button>
    </div>
    <button class="bulle" type="button" aria-label="Une question ? Ouvrir le conseiller" aria-haspopup="dialog" aria-expanded="false" aria-controls="dh-fenetre">
      ${Ue}<span class="libelle" aria-hidden="true">Une question ?</span><span class="pastille-bulle" aria-hidden="true">1</span>
    </button>
    <section class="fenetre" id="dh-fenetre" role="dialog" aria-modal="false" aria-labelledby="dh-titre" hidden>
      <header class="entete">
        <div class="textes">
          <p class="titre" id="dh-titre"></p>
          <p class="sous-titre">R\xE9ponse imm\xE9diate sur nos produits et nos conseils</p>
        </div>
        <button class="fermer" type="button" aria-label="Fermer la discussion">${oe}</button>
      </header>
      <div class="fil" role="log" aria-live="off"></div>
      <p class="annonce cache" role="status" aria-live="polite"></p>
      <form class="saisie">
        <label class="cache" for="dh-question">Votre question</label>
        <textarea id="dh-question" rows="1" maxlength="${K}" placeholder="Posez votre question\u2026"></textarea>
        <button type="submit" aria-label="Envoyer la question">${Fe}</button>
      </form>
      <p class="mention"></p>
    </section>
  `,ne.append(ie,w);let s=e=>w.querySelector(e),g=s(".bulle"),I=s(".fenetre"),m=s(".fil"),Ve=s(".annonce"),re=s(".saisie"),h=s("textarea"),se=s(".saisie button"),F=s(".invite");s(".titre").textContent=R,s(".invite-nom").textContent=R,s(".mention").textContent=`Assistant automatique. Vos questions sont enregistr\xE9es anonymement pour l'am\xE9liorer : n'y indiquez pas d'informations personnelles. Commande : ${Q}.`;function ae(e,t){t.split(/(\*\*[^*]+\*\*)/g).forEach(n=>{if(/^\*\*[^*]+\*\*$/.test(n)){let i=document.createElement("strong");i.textContent=n.slice(2,-2),e.append(i)}else n&&e.append(document.createTextNode(n))})}function Pe(e,t){for(let n of t.split(/\n\s*\n/)){let i=n.split(`
`).filter(d=>d.trim()),o=null,l=null;for(let d of i){let a=/^\s*(?:-|\d+\.)\s+(.*)$/.exec(d);if(a){let S=/^\s*\d+\./.test(d);(!o||o.tagName==="OL"!==S)&&(o=document.createElement(S?"ol":"ul"),e.append(o));let k=document.createElement("li");ae(k,a[1]),o.append(k),l=null}else o=null,l?l.append(document.createElement("br")):(l=document.createElement("p"),e.append(l)),ae(l,d.trim())}}}function je(e){let t=U(e);if(!t.length)return null;let n=document.createElement("div");n.className="liens";for(let i of t){let o=document.createElement("a");o.href=i.url,o.textContent=i.libelle,new URL(i.url).hostname!==location.hostname&&(o.target="_blank",o.rel="noopener noreferrer"),n.append(o)}return n}let N=()=>{m.scrollTop=m.scrollHeight};function Ye(e){m.scrollTop=Math.min(Math.max(0,e.offsetTop-12),m.scrollHeight-m.clientHeight)}function V(e,t=!1,n){let i=document.createElement("div");if(i.className=`msg ${e.de}`,m.append(i),e.de==="client"){i.textContent=e.texte,N(),n==null||n();return}let o=document.createElement("div");Pe(o,e.texte),i.append(o);let l=je(e.liens),d=()=>{l&&i.append(l),n==null||n()};t&&!B?Je(i,o,a=>{d(),a&&N()}):(d(),Ye(i))}let x=null;function Je(e,t,n){x==null||x();let i=e.getBoundingClientRect().width;i>0&&(e.style.width=`${i}px`);let o=[],l=document.createTreeWalker(t,NodeFilter.SHOW_TEXT);for(let u=l.nextNode();u;u=l.nextNode()){let c=u;o.push({noeud:c,texte:c.data}),c.data=""}let d=Array.from(t.querySelectorAll("p, ul, ol, li"));d.forEach(u=>u.hidden=!0);let a=null,S=u=>{var b,M;for(let E=u.parentElement;E&&E!==t;E=E.parentElement)E.hidden=!1;let c=(M=(b=u.parentElement)==null?void 0:b.closest("p, li"))!=null?M:null;c!==a&&(a==null||a.classList.remove("ecrit"),c==null||c.classList.add("ecrit"),a=c)},k=o.reduce((u,c)=>u+c.texte.length,0),We=Math.max(Ne/1e3,k/Ce),Ke=performance.now(),v=0,_=0;e.classList.add("frappe"),e.setAttribute("aria-hidden","true");let G=!0,Le=()=>{G=m.scrollHeight-m.scrollTop-m.clientHeight<40};m.addEventListener("scroll",Le,{passive:!0});let X=0,D=()=>{for(cancelAnimationFrame(X);v<o.length;v++)S(o[v].noeud),o[v].noeud.data=o[v].texte;d.forEach(u=>u.hidden=!1),a==null||a.classList.remove("ecrit"),e.classList.remove("frappe"),e.style.width="",e.removeAttribute("aria-hidden"),e.removeEventListener("click",D),m.removeEventListener("scroll",Le),x=null,n(G)},Te=u=>{let c=Math.min(k,Math.floor((u-Ke)*We));for(;_<c&&v<o.length;){let{noeud:b,texte:M}=o[v];S(b);let E=Math.min(c-_,M.length-b.data.length);b.data=M.slice(0,b.data.length+E),_+=E,b.data.length>=M.length&&v++}G&&N(),_>=k?D():X=requestAnimationFrame(Te)};e.addEventListener("click",D),x=D,X=requestAnimationFrame(Te)}let C=null;function P(e){if(C==null||C.remove(),C=null,!e.length)return;let t=document.createElement("div");t.className="suggestions",t.setAttribute("role","group"),t.setAttribute("aria-label","Questions sugg\xE9r\xE9es");for(let n of e){let i=document.createElement("button");i.type="button",i.textContent=n,i.addEventListener("click",()=>{$(n)}),t.append(i)}m.append(t),C=t}function Ge(){let e=document.createElement("div");e.className="msg assistant",e.setAttribute("role","img"),e.setAttribute("aria-label","Le conseiller \xE9crit");let t=document.createElement("span");return t.className="attente",t.append(document.createElement("span"),document.createElement("span"),document.createElement("span")),e.append(t),m.append(e),N(),e}let le=e=>({nature:"erreur",texte:e,liens:[],suggestions:[],contexte:null}),j=le(`Le service est momentan\xE9ment indisponible. Notre \xE9quipe vous r\xE9pond au **${Q}**.`),Xe=le("Vous avez pos\xE9 beaucoup de questions en peu de temps. Merci de patienter une minute avant la suivante.");async function de(e,t){var n;try{let i=await fetch(`${A}${e}`,{method:t?"POST":"GET",headers:t?{"Content-Type":"text/plain;charset=UTF-8"}:void 0,body:t?JSON.stringify(t):void 0,credentials:"omit",referrerPolicy:"no-referrer"});return i.status===429?Xe:i.ok&&(n=De(await i.json()))!=null?n:j}catch{return j}}function ue(e,t=!0){let n={de:"assistant",texte:e.texte,liens:e.liens};r.messages.push(n),r.suggestions=e.suggestions,e.nature!=="erreur"&&(r.contexte=e.contexte),L(),Ve.textContent=n.texte.replace(/\*\*/g,""),V(n,t,()=>P(r.suggestions))}let Y=!1;async function $(e){let t=String(e).trim().slice(0,K);if(!t||Y)return;H({accueil:!1}),x==null||x(),Y=!0,se.disabled=!0,P([]);let n={de:"client",texte:t};r.messages.push(n),V(n),L();let i=Ge(),o=Date.now(),l=await de("/api/chat",{message:t,contexte:r.contexte}),d=B?0:He-(Date.now()-o);d>0&&await new Promise(a=>setTimeout(a,d)),i.remove(),ue(l),Y=!1,se.disabled=!1}let ce=!1,T=Ae(location.pathname+location.search),O,pe=()=>T!==null&&!r.engage&&!r.inviteFermee&&r.invitations<Re;function z(e=!1){window.clearTimeout(O),O=void 0,F.hidden=!0,e&&(r.inviteFermee=!0,g.classList.remove("signalee"),L())}function Qe(){!pe()||!I.hidden||(r.invitations++,L(),F.hidden=!1,g.classList.add("signalee"),B||g.classList.add("appel"),O=window.setTimeout(()=>z(),$e))}function me(){pe()&&(O=window.setTimeout(()=>{document.hidden?document.addEventListener("visibilitychange",me,{once:!0}):Qe()},Se))}T&&(s(".invite-message").textContent=T.texte,s(".invite-question").textContent=T.question,s(".invite-message").addEventListener("click",()=>H()),s(".invite-question").addEventListener("click",()=>{$(T.question)})),s(".invite-fermer").addEventListener("click",()=>{z(!0),g.focus()}),g.addEventListener("animationend",()=>g.classList.remove("appel"));function H({accueil:e=!0,focus:t=!0}={}){I.hidden&&(z(),g.classList.remove("signalee","appel"),r.engage=!0,I.hidden=!1,w.classList.add("ouvert"),g.setAttribute("aria-expanded","true"),r.ouvert=!0,L(),x||N(),e&&r.messages.length===0&&!ce&&(ce=!0,de("/api/accueil").then(n=>{r.messages.length===0&&ue(n,!1)})),t&&!Oe&&setTimeout(()=>h.focus(),50))}function J(){if(I.hidden)return;let e=ne.activeElement!==null;I.hidden=!0,w.classList.remove("ouvert"),g.setAttribute("aria-expanded","false"),r.ouvert=!1,L(),e&&g.focus()}g.addEventListener("click",()=>H()),s(".fermer").addEventListener("click",J),w.addEventListener("keydown",e=>{e.key==="Escape"&&(F.hidden||z(!0),J())}),re.addEventListener("submit",e=>{e.preventDefault();let t=h.value;h.value="",h.style.height="",$(t)}),h.addEventListener("keydown",e=>{e.key==="Enter"&&!e.shiftKey&&!e.isComposing&&(e.preventDefault(),re.requestSubmit())}),h.addEventListener("input",()=>{h.style.height="",h.style.height=`${Math.min(h.scrollHeight+2,120)}px`}),r.messages.forEach(e=>V(e)),P(r.suggestions);function fe(){if(document.body.append(te),r.ouvert){H({focus:!1});return}T&&!r.engage&&!r.inviteFermee&&r.invitations>0&&g.classList.add("signalee"),me()}document.body?fe():document.addEventListener("DOMContentLoaded",fe),window.DuhalleChat=Object.freeze({ouvrir:()=>H(),fermer:J,poser:e=>{$(e)}})})();})();
