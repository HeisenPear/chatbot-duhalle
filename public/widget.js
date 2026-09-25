/* Chatbot Duhallé — widget compilé depuis src/widget/widget.ts (npm run build). Ne pas modifier à la main. */
"use strict";(()=>{(function(){var ce,ue,pe,fe,me,ge,he,xe;if(window.DuhalleChat)return;let b=document.currentScript,v=e=>{var t;return(t=b==null?void 0:b.getAttribute(`data-${e}`))!=null?t:void 0},Ee=b!=null&&b.src?new URL(b.src).origin:"",we=((ce=v("titre"))!=null?ce:"Conseiller Duhall\xE9").slice(0,60),ye=/^#[0-9a-f]{3,8}$/i.test((ue=v("couleur"))!=null?ue:"")?v("couleur"):"#20342C",Y=v("position")==="gauche"?"left":"right",R=/^\d{1,3}$/.test((pe=v("decalage"))!=null?pe:"")?Math.min(Number(v("decalage")),400):84,V=((fe=v("telephone"))!=null?fe:"02 47 53 00 26").slice(0,30),X="duhalle-chatbot",G=500,J=4e3,Le=["www.duhalle-boutique.fr","duhalle-boutique.fr"],Te=60,ke=7e3,Me=450,Ae=5e3,Ne=1e4,Re=3,$=1500,D=(ge=(me=window.matchMedia)==null?void 0:me.call(window,"(prefers-reduced-motion: reduce)").matches)!=null?ge:!1,He=(xe=(he=window.matchMedia)==null?void 0:he.call(window,"(pointer: coarse)").matches)!=null?xe:!1;function Ce(e){try{let t=new URL(e);return t.protocol==="https:"&&Le.includes(t.hostname)}catch{return!1}}function _(e){if(!Array.isArray(e))return[];let t=[];for(let n of e){if(!n||typeof n!="object")continue;let{libelle:o,url:r}=n;typeof o=="string"&&typeof r=="string"&&Ce(r)&&t.push({libelle:o.slice(0,80),url:r})}return t.slice(0,6)}function W(e){return Array.isArray(e)?e.filter(t=>typeof t=="string"&&t.trim()!=="").map(t=>t.slice(0,120)).slice(0,5):[]}function Se(e){if(!e||typeof e!="object")return null;let{de:t,texte:n,liens:o}=e;return t!=="client"&&t!=="assistant"||typeof n!="string"?null:{de:t,texte:n.slice(0,J),liens:_(o)}}function Pe(e){if(!e||typeof e!="object")return null;let t=e;return typeof t.texte!="string"||!t.texte.trim()?null:{nature:typeof t.nature=="string"?t.nature:"reponse",texte:t.texte.slice(0,J),liens:_(t.liens),suggestions:W(t.suggestions),contexte:t.contexte&&typeof t.contexte=="object"?t.contexte:null}}function $e(){var e;try{let t=JSON.parse((e=sessionStorage.getItem(X))!=null?e:"null");if(t&&Array.isArray(t.messages))return{messages:t.messages.map(Se).filter(n=>n!==null).slice(-40),suggestions:W(t.suggestions),contexte:t.contexte&&typeof t.contexte=="object"?t.contexte:null,ouvert:t.ouvert===!0,engage:t.engage===!0||t.ouvert===!0||t.messages.length>0}}catch{}return{messages:[],suggestions:[],contexte:null,ouvert:!1,engage:!1}}let s=$e();function H(){try{s.messages=s.messages.slice(-40),sessionStorage.setItem(X,JSON.stringify(s))}catch{}}let K=document.createElement("duhalle-chatbot"),Q=K.attachShadow({mode:"open"}),Z=document.createElement("style");Z.textContent=`
    :host { all: initial !important; }
    * { box-sizing: border-box; }
    .dh {
      --dh-couleur: ${ye};
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
      position: fixed; bottom: ${R}px; ${Y}: 20px; z-index: 2147483000;
      display: flex; align-items: center; gap: 10px; height: 56px; padding: 0 22px 0 18px;
      border: 0; border-radius: 28px; background: var(--dh-couleur); color: #fff; cursor: pointer;
      font-weight: 600; white-space: nowrap; box-shadow: 0 6px 20px rgba(20, 30, 25, .28);
      transition: transform .15s ease, box-shadow .15s ease;
    }
    .bulle::before {
      content: ""; position: absolute; inset: -6px; border: 2px solid var(--dh-ocre);
      border-radius: inherit; opacity: 0; pointer-events: none;
    }
    .bulle.appel { animation: dh-appel ${$}ms ease-out; }
    .bulle.appel::before { animation: dh-halo ${$}ms ease-out; }
    .bulle:hover { transform: translateY(-2px); box-shadow: 0 10px 24px rgba(20, 30, 25, .32); }
    .dh.ouvert .bulle { display: none; }
    .bulle:focus-visible, button:focus-visible, a:focus-visible {
      outline: 3px solid var(--dh-ocre); outline-offset: 2px;
    }
    .bulle svg { width: 24px; height: 24px; flex: none; }
    .fenetre {
      position: fixed; bottom: ${R}px; ${Y}: 20px; z-index: 2147483647;
      width: 380px; max-width: calc(100vw - 32px);
      height: 600px; max-height: calc(100vh - ${R+24}px); max-height: calc(100dvh - ${R+24}px);
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
    @keyframes dh-halo {
      0%, 28% { opacity: 0; transform: scale(.9); }
      45% { opacity: .8; }
      80%, 100% { opacity: 0; transform: scale(1.16); }
    }
    .cache { position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0 0 0 0); white-space: nowrap; }
    @media (prefers-reduced-motion: reduce) {
      .bulle, .msg, .suggestions, .attente span { transition: none; animation: none; }
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
  `;let De='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 12a8 8 0 0 1-11.6 7.1L4 20l1-4.6A8 8 0 1 1 21 12z"/></svg>',_e='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg>',qe='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>',E=document.createElement("div");E.className="dh",E.innerHTML=`
    <button class="bulle" type="button" aria-haspopup="dialog" aria-expanded="false" aria-controls="dh-fenetre">
      ${De}<span class="libelle">Une question ?</span>
    </button>
    <section class="fenetre" id="dh-fenetre" role="dialog" aria-modal="false" aria-labelledby="dh-titre" hidden>
      <header class="entete">
        <div class="textes">
          <p class="titre" id="dh-titre"></p>
          <p class="sous-titre">R\xE9ponse imm\xE9diate sur nos produits et nos conseils</p>
        </div>
        <button class="fermer" type="button" aria-label="Fermer la discussion">${_e}</button>
      </header>
      <div class="fil" role="log" aria-live="off"></div>
      <p class="annonce cache" role="status" aria-live="polite"></p>
      <form class="saisie">
        <label class="cache" for="dh-question">Votre question</label>
        <textarea id="dh-question" rows="1" maxlength="${G}" placeholder="Posez votre question\u2026"></textarea>
        <button type="submit" aria-label="Envoyer la question">${qe}</button>
      </form>
      <p class="mention"></p>
    </section>
  `,Q.append(Z,E);let p=e=>E.querySelector(e),w=p(".bulle"),k=p(".fenetre"),u=p(".fil"),Oe=p(".annonce"),ee=p(".saisie"),f=p("textarea"),te=p(".saisie button");p(".titre").textContent=we,p(".mention").textContent=`Assistant automatique Duhall\xE9. Pour une question sur votre commande : ${V}.`;function ne(e,t){t.split(/(\*\*[^*]+\*\*)/g).forEach(n=>{if(/^\*\*[^*]+\*\*$/.test(n)){let o=document.createElement("strong");o.textContent=n.slice(2,-2),e.append(o)}else n&&e.append(document.createTextNode(n))})}function Ie(e,t){for(let n of t.split(/\n\s*\n/)){let o=n.split(`
`).filter(l=>l.trim()),r=null,a=null;for(let l of o){let i=/^\s*(?:-|\d+\.)\s+(.*)$/.exec(l);if(i){let N=/^\s*\d+\./.test(l);(!r||r.tagName==="OL"!==N)&&(r=document.createElement(N?"ol":"ul"),e.append(r));let L=document.createElement("li");ne(L,i[1]),r.append(L),a=null}else r=null,a?a.append(document.createElement("br")):(a=document.createElement("p"),e.append(a)),ne(a,l.trim())}}}function Ue(e){let t=_(e);if(!t.length)return null;let n=document.createElement("div");n.className="liens";for(let o of t){let r=document.createElement("a");r.href=o.url,r.textContent=o.libelle,new URL(o.url).hostname!==location.hostname&&(r.target="_blank",r.rel="noopener noreferrer"),n.append(r)}return n}let M=()=>{u.scrollTop=u.scrollHeight};function ze(e){u.scrollTop=Math.min(Math.max(0,e.offsetTop-12),u.scrollHeight-u.clientHeight)}function q(e,t=!1,n){let o=document.createElement("div");if(o.className=`msg ${e.de}`,u.append(o),e.de==="client"){o.textContent=e.texte,M(),n==null||n();return}let r=document.createElement("div");Ie(r,e.texte),o.append(r);let a=Ue(e.liens),l=()=>{a&&o.append(a),n==null||n()};t&&!D?Be(o,r,i=>{l(),i&&M()}):(l(),ze(o))}let m=null;function Be(e,t,n){m==null||m();let o=e.getBoundingClientRect().width;o>0&&(e.style.width=`${o}px`);let r=[],a=document.createTreeWalker(t,NodeFilter.SHOW_TEXT);for(let d=a.nextNode();d;d=a.nextNode()){let c=d;r.push({noeud:c,texte:c.data}),c.data=""}let l=Array.from(t.querySelectorAll("p, ul, ol, li"));l.forEach(d=>d.hidden=!0);let i=null,N=d=>{var h,T;for(let x=d.parentElement;x&&x!==t;x=x.parentElement)x.hidden=!1;let c=(T=(h=d.parentElement)==null?void 0:h.closest("p, li"))!=null?T:null;c!==i&&(i==null||i.classList.remove("ecrit"),c==null||c.classList.add("ecrit"),i=c)},L=r.reduce((d,c)=>d+c.texte.length,0),Ve=Math.max(Te/1e3,L/ke),Xe=performance.now(),g=0,S=0;e.classList.add("frappe"),e.setAttribute("aria-hidden","true");let F=!0,be=()=>{F=u.scrollHeight-u.scrollTop-u.clientHeight<40};u.addEventListener("scroll",be,{passive:!0});let j=0,P=()=>{for(cancelAnimationFrame(j);g<r.length;g++)N(r[g].noeud),r[g].noeud.data=r[g].texte;l.forEach(d=>d.hidden=!1),i==null||i.classList.remove("ecrit"),e.classList.remove("frappe"),e.style.width="",e.removeAttribute("aria-hidden"),e.removeEventListener("click",P),u.removeEventListener("scroll",be),m=null,n(F)},ve=d=>{let c=Math.min(L,Math.floor((d-Xe)*Ve));for(;S<c&&g<r.length;){let{noeud:h,texte:T}=r[g];N(h);let x=Math.min(c-S,T.length-h.data.length);h.data=T.slice(0,h.data.length+x),S+=x,h.data.length>=T.length&&g++}F&&M(),S>=L?P():j=requestAnimationFrame(ve)};e.addEventListener("click",P),m=P,j=requestAnimationFrame(ve)}let A=null;function O(e){if(A==null||A.remove(),A=null,!e.length)return;let t=document.createElement("div");t.className="suggestions",t.setAttribute("role","group"),t.setAttribute("aria-label","Questions sugg\xE9r\xE9es");for(let n of e){let o=document.createElement("button");o.type="button",o.textContent=n,o.addEventListener("click",()=>{z(n)}),t.append(o)}u.append(t),A=t}function Fe(){let e=document.createElement("div");e.className="msg assistant",e.setAttribute("role","img"),e.setAttribute("aria-label","Le conseiller \xE9crit");let t=document.createElement("span");return t.className="attente",t.append(document.createElement("span"),document.createElement("span"),document.createElement("span")),e.append(t),u.append(e),M(),e}let oe=e=>({nature:"erreur",texte:e,liens:[],suggestions:[],contexte:null}),I=oe(`Le service est momentan\xE9ment indisponible. Notre \xE9quipe vous r\xE9pond au **${V}**.`),je=oe("Vous avez pos\xE9 beaucoup de questions en peu de temps. Merci de patienter une minute avant la suivante.");async function re(e,t){var n;try{let o=await fetch(`${Ee}${e}`,{method:t?"POST":"GET",headers:t?{"Content-Type":"text/plain;charset=UTF-8"}:void 0,body:t?JSON.stringify(t):void 0,credentials:"omit",referrerPolicy:"no-referrer"});return o.status===429?je:o.ok&&(n=Pe(await o.json()))!=null?n:I}catch{return I}}function se(e,t=!0){let n={de:"assistant",texte:e.texte,liens:e.liens};s.messages.push(n),s.suggestions=e.suggestions,e.nature!=="erreur"&&(s.contexte=e.contexte),H(),Oe.textContent=n.texte.replace(/\*\*/g,""),q(n,t,()=>O(s.suggestions))}let U=!1;async function z(e){let t=String(e).trim().slice(0,G);if(!t||U)return;C({accueil:!1}),m==null||m(),U=!0,te.disabled=!0,O([]);let n={de:"client",texte:t};s.messages.push(n),q(n),H();let o=Fe(),r=Date.now(),a=await re("/api/chat",{message:t,contexte:s.contexte}),l=D?0:Me-(Date.now()-r);l>0&&await new Promise(i=>setTimeout(i,l)),o.remove(),se(a),U=!1,te.disabled=!1}let ie=!1,ae=0,y;function Ye(){y!==void 0&&window.clearTimeout(y),y=void 0,w.classList.remove("appel")}function le(e){D||s.engage||ae>=Re||(y=window.setTimeout(()=>{y=void 0,!(s.engage||!k.hidden||document.hidden)&&(ae++,w.classList.add("appel"),y=window.setTimeout(()=>{y=void 0,w.classList.remove("appel"),le(Ne)},$))},e))}function C({accueil:e=!0,focus:t=!0}={}){k.hidden&&(Ye(),s.engage=!0,k.hidden=!1,E.classList.add("ouvert"),w.setAttribute("aria-expanded","true"),s.ouvert=!0,H(),m||M(),e&&s.messages.length===0&&!ie&&(ie=!0,re("/api/accueil").then(n=>{s.messages.length===0&&se(n,!1)})),t&&!He&&setTimeout(()=>f.focus(),50))}function B(){if(k.hidden)return;let e=Q.activeElement!==null;k.hidden=!0,E.classList.remove("ouvert"),w.setAttribute("aria-expanded","false"),s.ouvert=!1,H(),e&&w.focus()}w.addEventListener("click",()=>C()),p(".fermer").addEventListener("click",B),E.addEventListener("keydown",e=>{e.key==="Escape"&&B()}),ee.addEventListener("submit",e=>{e.preventDefault();let t=f.value;f.value="",f.style.height="",z(t)}),f.addEventListener("keydown",e=>{e.key==="Enter"&&!e.shiftKey&&!e.isComposing&&(e.preventDefault(),ee.requestSubmit())}),f.addEventListener("input",()=>{f.style.height="",f.style.height=`${Math.min(f.scrollHeight+2,120)}px`}),s.messages.forEach(e=>q(e)),O(s.suggestions);function de(){document.body.append(K),s.ouvert?C({focus:!1}):le(Ae)}document.body?de():document.addEventListener("DOMContentLoaded",de),window.DuhalleChat=Object.freeze({ouvrir:()=>C(),fermer:B,poser:e=>{z(e)}})})();})();
