/* Chatbot Duhallé — widget compilé depuis src/widget/widget.ts (npm run build). Ne pas modifier à la main. */
"use strict";(()=>{(function(){var se,ae,le,ce,de,ue,pe,fe;if(window.DuhalleChat)return;let b=document.currentScript,v=e=>{var t;return(t=b==null?void 0:b.getAttribute(`data-${e}`))!=null?t:void 0},ge=b!=null&&b.src?new URL(b.src).origin:"",xe=((se=v("titre"))!=null?se:"Conseiller Duhall\xE9").slice(0,60),be=/^#[0-9a-f]{3,8}$/i.test((ae=v("couleur"))!=null?ae:"")?v("couleur"):"#20342C",B=v("position")==="gauche"?"left":"right",M=/^\d{1,3}$/.test((le=v("decalage"))!=null?le:"")?Math.min(Number(v("decalage")),400):84,F=((ce=v("telephone"))!=null?ce:"02 47 53 00 26").slice(0,30),j="duhalle-chatbot",V=500,X=4e3,ve=["www.duhalle-boutique.fr","duhalle-boutique.fr"],Ee=60,we=7e3,ye=450,Y=(ue=(de=window.matchMedia)==null?void 0:de.call(window,"(prefers-reduced-motion: reduce)").matches)!=null?ue:!1,Le=(fe=(pe=window.matchMedia)==null?void 0:pe.call(window,"(pointer: coarse)").matches)!=null?fe:!1;function ke(e){try{let t=new URL(e);return t.protocol==="https:"&&ve.includes(t.hostname)}catch{return!1}}function $(e){if(!Array.isArray(e))return[];let t=[];for(let n of e){if(!n||typeof n!="object")continue;let{libelle:o,url:r}=n;typeof o=="string"&&typeof r=="string"&&ke(r)&&t.push({libelle:o.slice(0,80),url:r})}return t.slice(0,6)}function G(e){return Array.isArray(e)?e.filter(t=>typeof t=="string"&&t.trim()!=="").map(t=>t.slice(0,120)).slice(0,5):[]}function Te(e){if(!e||typeof e!="object")return null;let{de:t,texte:n,liens:o}=e;return t!=="client"&&t!=="assistant"||typeof n!="string"?null:{de:t,texte:n.slice(0,X),liens:$(o)}}function Me(e){if(!e||typeof e!="object")return null;let t=e;return typeof t.texte!="string"||!t.texte.trim()?null:{nature:typeof t.nature=="string"?t.nature:"reponse",texte:t.texte.slice(0,X),liens:$(t.liens),suggestions:G(t.suggestions),contexte:t.contexte&&typeof t.contexte=="object"?t.contexte:null}}function Ae(){var e;try{let t=JSON.parse((e=sessionStorage.getItem(j))!=null?e:"null");if(t&&Array.isArray(t.messages))return{messages:t.messages.map(Te).filter(n=>n!==null).slice(-40),suggestions:G(t.suggestions),contexte:t.contexte&&typeof t.contexte=="object"?t.contexte:null,ouvert:t.ouvert===!0}}catch{}return{messages:[],suggestions:[],contexte:null,ouvert:!1}}let i=Ae();function A(){try{i.messages=i.messages.slice(-40),sessionStorage.setItem(j,JSON.stringify(i))}catch{}}let J=document.createElement("duhalle-chatbot"),W=J.attachShadow({mode:"open"}),K=document.createElement("style");K.textContent=`
    :host { all: initial !important; }
    * { box-sizing: border-box; }
    .dh {
      --dh-couleur: ${be};
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
      position: fixed; bottom: ${M}px; ${B}: 20px; z-index: 2147483000;
      display: flex; align-items: center; gap: 10px; height: 56px; padding: 0 22px 0 18px;
      border: 0; border-radius: 28px; background: var(--dh-couleur); color: #fff; cursor: pointer;
      font-weight: 600; white-space: nowrap; box-shadow: 0 6px 20px rgba(20, 30, 25, .28);
      transition: transform .15s ease, box-shadow .15s ease;
    }
    .bulle:hover { transform: translateY(-2px); box-shadow: 0 10px 24px rgba(20, 30, 25, .32); }
    .dh.ouvert .bulle { display: none; }
    .bulle:focus-visible, button:focus-visible, a:focus-visible {
      outline: 3px solid var(--dh-ocre); outline-offset: 2px;
    }
    .bulle svg { width: 24px; height: 24px; flex: none; }
    .fenetre {
      position: fixed; bottom: ${M}px; ${B}: 20px; z-index: 2147483647;
      width: 380px; max-width: calc(100vw - 32px);
      height: 600px; max-height: calc(100vh - ${M+24}px); max-height: calc(100dvh - ${M+24}px);
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
  `;let He='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 12a8 8 0 0 1-11.6 7.1L4 20l1-4.6A8 8 0 1 1 21 12z"/></svg>',Ne='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg>',Ce='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>',E=document.createElement("div");E.className="dh",E.innerHTML=`
    <button class="bulle" type="button" aria-haspopup="dialog" aria-expanded="false" aria-controls="dh-fenetre">
      ${He}<span class="libelle">Une question ?</span>
    </button>
    <section class="fenetre" id="dh-fenetre" role="dialog" aria-modal="false" aria-labelledby="dh-titre" hidden>
      <header class="entete">
        <div class="textes">
          <p class="titre" id="dh-titre"></p>
          <p class="sous-titre">R\xE9ponse imm\xE9diate sur nos produits et nos conseils</p>
        </div>
        <button class="fermer" type="button" aria-label="Fermer la discussion">${Ne}</button>
      </header>
      <div class="fil" role="log" aria-live="off"></div>
      <p class="annonce cache" role="status" aria-live="polite"></p>
      <form class="saisie">
        <label class="cache" for="dh-question">Votre question</label>
        <textarea id="dh-question" rows="1" maxlength="${V}" placeholder="Posez votre question\u2026"></textarea>
        <button type="submit" aria-label="Envoyer la question">${Ce}</button>
      </form>
      <p class="mention"></p>
    </section>
  `,W.append(K,E);let p=e=>E.querySelector(e),H=p(".bulle"),N=p(".fenetre"),u=p(".fil"),Re=p(".annonce"),Q=p(".saisie"),f=p("textarea"),Z=p(".saisie button");p(".titre").textContent=xe,p(".mention").textContent=`Assistant automatique Duhall\xE9. Pour une question sur votre commande : ${F}.`;function ee(e,t){t.split(/(\*\*[^*]+\*\*)/g).forEach(n=>{if(/^\*\*[^*]+\*\*$/.test(n)){let o=document.createElement("strong");o.textContent=n.slice(2,-2),e.append(o)}else n&&e.append(document.createTextNode(n))})}function Se(e,t){for(let n of t.split(/\n\s*\n/)){let o=n.split(`
`).filter(l=>l.trim()),r=null,a=null;for(let l of o){let s=/^\s*(?:-|\d+\.)\s+(.*)$/.exec(l);if(s){let T=/^\s*\d+\./.test(l);(!r||r.tagName==="OL"!==T)&&(r=document.createElement(T?"ol":"ul"),e.append(r));let w=document.createElement("li");ee(w,s[1]),r.append(w),a=null}else r=null,a?a.append(document.createElement("br")):(a=document.createElement("p"),e.append(a)),ee(a,l.trim())}}}function $e(e){let t=$(e);if(!t.length)return null;let n=document.createElement("div");n.className="liens";for(let o of t){let r=document.createElement("a");r.href=o.url,r.textContent=o.libelle,new URL(o.url).hostname!==location.hostname&&(r.target="_blank",r.rel="noopener noreferrer"),n.append(r)}return n}let L=()=>{u.scrollTop=u.scrollHeight};function qe(e){u.scrollTop=Math.min(Math.max(0,e.offsetTop-12),u.scrollHeight-u.clientHeight)}function q(e,t=!1,n){let o=document.createElement("div");if(o.className=`msg ${e.de}`,u.append(o),e.de==="client"){o.textContent=e.texte,L(),n==null||n();return}let r=document.createElement("div");Se(r,e.texte),o.append(r);let a=$e(e.liens),l=()=>{a&&o.append(a),n==null||n()};t&&!Y?De(o,r,s=>{l(),s&&L()}):(l(),qe(o))}let m=null;function De(e,t,n){m==null||m();let o=e.getBoundingClientRect().width;o>0&&(e.style.width=`${o}px`);let r=[],a=document.createTreeWalker(t,NodeFilter.SHOW_TEXT);for(let c=a.nextNode();c;c=a.nextNode()){let d=c;r.push({noeud:d,texte:d.data}),d.data=""}let l=Array.from(t.querySelectorAll("p, ul, ol, li"));l.forEach(c=>c.hidden=!0);let s=null,T=c=>{var g,y;for(let x=c.parentElement;x&&x!==t;x=x.parentElement)x.hidden=!1;let d=(y=(g=c.parentElement)==null?void 0:g.closest("p, li"))!=null?y:null;d!==s&&(s==null||s.classList.remove("ecrit"),d==null||d.classList.add("ecrit"),s=d)},w=r.reduce((c,d)=>c+d.texte.length,0),_e=Math.max(Ee/1e3,w/we),ze=performance.now(),h=0,R=0;e.classList.add("frappe"),e.setAttribute("aria-hidden","true");let I=!0,me=()=>{I=u.scrollHeight-u.scrollTop-u.clientHeight<40};u.addEventListener("scroll",me,{passive:!0});let U=0,S=()=>{for(cancelAnimationFrame(U);h<r.length;h++)T(r[h].noeud),r[h].noeud.data=r[h].texte;l.forEach(c=>c.hidden=!1),s==null||s.classList.remove("ecrit"),e.classList.remove("frappe"),e.style.width="",e.removeAttribute("aria-hidden"),e.removeEventListener("click",S),u.removeEventListener("scroll",me),m=null,n(I)},he=c=>{let d=Math.min(w,Math.floor((c-ze)*_e));for(;R<d&&h<r.length;){let{noeud:g,texte:y}=r[h];T(g);let x=Math.min(d-R,y.length-g.data.length);g.data=y.slice(0,g.data.length+x),R+=x,g.data.length>=y.length&&h++}I&&L(),R>=w?S():U=requestAnimationFrame(he)};e.addEventListener("click",S),m=S,U=requestAnimationFrame(he)}let k=null;function D(e){if(k==null||k.remove(),k=null,!e.length)return;let t=document.createElement("div");t.className="suggestions",t.setAttribute("role","group"),t.setAttribute("aria-label","Questions sugg\xE9r\xE9es");for(let n of e){let o=document.createElement("button");o.type="button",o.textContent=n,o.addEventListener("click",()=>{_(n)}),t.append(o)}u.append(t),k=t}function Oe(){let e=document.createElement("div");e.className="msg assistant",e.setAttribute("role","img"),e.setAttribute("aria-label","Le conseiller \xE9crit");let t=document.createElement("span");return t.className="attente",t.append(document.createElement("span"),document.createElement("span"),document.createElement("span")),e.append(t),u.append(e),L(),e}let te=e=>({nature:"erreur",texte:e,liens:[],suggestions:[],contexte:null}),O=te(`Le service est momentan\xE9ment indisponible. Notre \xE9quipe vous r\xE9pond au **${F}**.`),Pe=te("Vous avez pos\xE9 beaucoup de questions en peu de temps. Merci de patienter une minute avant la suivante.");async function ne(e,t){var n;try{let o=await fetch(`${ge}${e}`,{method:t?"POST":"GET",headers:t?{"Content-Type":"text/plain;charset=UTF-8"}:void 0,body:t?JSON.stringify(t):void 0,credentials:"omit",referrerPolicy:"no-referrer"});return o.status===429?Pe:o.ok&&(n=Me(await o.json()))!=null?n:O}catch{return O}}function oe(e,t=!0){let n={de:"assistant",texte:e.texte,liens:e.liens};i.messages.push(n),i.suggestions=e.suggestions,e.nature!=="erreur"&&(i.contexte=e.contexte),A(),Re.textContent=n.texte.replace(/\*\*/g,""),q(n,t,()=>D(i.suggestions))}let P=!1;async function _(e){let t=String(e).trim().slice(0,V);if(!t||P)return;C({accueil:!1}),m==null||m(),P=!0,Z.disabled=!0,D([]);let n={de:"client",texte:t};i.messages.push(n),q(n),A();let o=Oe(),r=Date.now(),a=await ne("/api/chat",{message:t,contexte:i.contexte}),l=Y?0:ye-(Date.now()-r);l>0&&await new Promise(s=>setTimeout(s,l)),o.remove(),oe(a),P=!1,Z.disabled=!1}let re=!1;function C({accueil:e=!0,focus:t=!0}={}){N.hidden&&(N.hidden=!1,E.classList.add("ouvert"),H.setAttribute("aria-expanded","true"),i.ouvert=!0,A(),m||L(),e&&i.messages.length===0&&!re&&(re=!0,ne("/api/accueil").then(n=>{i.messages.length===0&&oe(n,!1)})),t&&!Le&&setTimeout(()=>f.focus(),50))}function z(){if(N.hidden)return;let e=W.activeElement!==null;N.hidden=!0,E.classList.remove("ouvert"),H.setAttribute("aria-expanded","false"),i.ouvert=!1,A(),e&&H.focus()}H.addEventListener("click",()=>C()),p(".fermer").addEventListener("click",z),E.addEventListener("keydown",e=>{e.key==="Escape"&&z()}),Q.addEventListener("submit",e=>{e.preventDefault();let t=f.value;f.value="",f.style.height="",_(t)}),f.addEventListener("keydown",e=>{e.key==="Enter"&&!e.shiftKey&&!e.isComposing&&(e.preventDefault(),Q.requestSubmit())}),f.addEventListener("input",()=>{f.style.height="",f.style.height=`${Math.min(f.scrollHeight+2,120)}px`}),i.messages.forEach(e=>q(e)),D(i.suggestions);function ie(){document.body.append(J),i.ouvert&&C({focus:!1})}document.body?ie():document.addEventListener("DOMContentLoaded",ie),window.DuhalleChat=Object.freeze({ouvrir:()=>C(),fermer:z,poser:e=>{_(e)}})})();})();
