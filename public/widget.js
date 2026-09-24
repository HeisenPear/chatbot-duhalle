/* Chatbot Duhallé — widget compilé depuis src/widget/widget.ts (npm run build). Ne pas modifier à la main. */
"use strict";(()=>{(function(){var ee,te,ne,oe,re;if(window.DuhalleChat)return;let x=document.currentScript,w=e=>{var t;return(t=x==null?void 0:x.getAttribute(`data-${e}`))!=null?t:void 0},ae=x!=null&&x.src?new URL(x.src).origin:"",le=(ee=w("titre"))!=null?ee:"Conseiller Duhall\xE9",de=/^#[0-9a-f]{3,8}$/i.test((te=w("couleur"))!=null?te:"")?w("couleur"):"#6B2737",U=w("position")==="gauche",B=(ne=w("telephone"))!=null?ne:"02 47 53 00 26",z="duhalle-chatbot",_=500,ce=60,ue=7e3,pe=450,F=(re=(oe=window.matchMedia)==null?void 0:oe.call(window,"(prefers-reduced-motion: reduce)").matches)!=null?re:!1;function fe(){try{let e=sessionStorage.getItem(z);if(e){let t=JSON.parse(e);if(Array.isArray(t.messages))return t}}catch{}return{messages:[],suggestions:[],contexte:null,ouvert:!1}}let i=fe();function T(){try{i.messages=i.messages.slice(-40),sessionStorage.setItem(z,JSON.stringify(i))}catch{}}let S=document.createElement("div");S.id="duhalle-chatbot";let he=S.attachShadow({mode:"open"}),I=document.createElement("style");I.textContent=`
    :host { all: initial; }
    * { box-sizing: border-box; }
    .dh {
      --dh-couleur: ${de};
      --dh-liege: #B5835A;
      --dh-creme: #F5EFE6;
      --dh-vert: #3E4E3A;
      --dh-texte: #2B2B2B;
      --dh-bord: #E4D9C8;
      font: 15px/1.5 -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      color: var(--dh-texte);
    }
    .bulle {
      position: fixed; bottom: 20px; ${U?"left":"right"}: 20px; z-index: 2147483000;
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
      position: fixed; bottom: 88px; ${U?"left":"right"}: 20px; z-index: 2147483000;
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
  `;let ge='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 12a8 8 0 0 1-11.6 7.1L4 20l1-4.6A8 8 0 1 1 21 12z"/></svg>',me='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg>',xe='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>',y=document.createElement("div");y.className="dh",y.innerHTML=`
    <button class="bulle" type="button" aria-haspopup="dialog" aria-expanded="false" aria-controls="dh-fenetre">
      ${ge}<span class="libelle">Une question ?</span>
    </button>
    <section class="fenetre" id="dh-fenetre" role="dialog" aria-modal="false" aria-labelledby="dh-titre" hidden>
      <header class="entete">
        <div class="textes">
          <p class="titre" id="dh-titre"></p>
          <p class="sous-titre">R\xE9ponse imm\xE9diate sur nos produits et nos conseils</p>
        </div>
        <button class="fermer" type="button" aria-label="Fermer la discussion">${me}</button>
      </header>
      <div class="fil" role="log" aria-live="off"></div>
      <p class="annonce" role="status" aria-live="polite"></p>
      <div class="suggestions" aria-label="Questions sugg\xE9r\xE9es"></div>
      <form class="saisie">
        <label for="dh-question" style="position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0)">Votre question</label>
        <textarea id="dh-question" rows="1" maxlength="${_}" placeholder="Posez votre question\u2026"></textarea>
        <button type="submit" aria-label="Envoyer la question">${xe}</button>
      </form>
      <p class="mention">Assistant automatique Duhall\xE9. Pour une question sur votre commande : ${ve(B)}.</p>
    </section>
  `,he.append(I,y);let u=e=>y.querySelector(e),M=u(".bulle"),L=u(".fenetre"),c=u(".fil"),j=u(".suggestions"),be=u(".annonce"),G=u(".saisie"),p=u("textarea"),V=u(".saisie button");u(".titre").textContent=le;function ve(e){return e.replace(/[&<>"']/g,t=>`&#${t.charCodeAt(0)};`)}function Y(e,t){t.split(/(\*\*[^*]+\*\*)/g).forEach(n=>{if(/^\*\*[^*]+\*\*$/.test(n)){let o=document.createElement("strong");o.textContent=n.slice(2,-2),e.append(o)}else n&&e.append(document.createTextNode(n))})}function Ee(e,t){for(let n of t.split(/\n\s*\n/)){let o=n.split(`
`).filter(s=>s.trim()),r=null,a=null;for(let s of o){let b=/^\s*(?:-|\d+\.)\s+(.*)$/.exec(s);if(b){let v=/^\s*\d+\./.test(s);(!r||r.tagName==="OL"!==v)&&(r=document.createElement(v?"ol":"ul"),e.append(r));let H=document.createElement("li");Y(H,b[1]),r.append(H),a=null}else r=null,a?a.append(document.createElement("br")):(a=document.createElement("p"),e.append(a)),Y(a,s.trim())}}}function we(e){let t=(e!=null?e:[]).filter(o=>/^https:\/\//.test(o.url));if(!t.length)return null;let n=document.createElement("div");n.className="liens";for(let o of t){let r=document.createElement("a");r.href=o.url,r.textContent=o.libelle,new URL(o.url).hostname!==location.hostname&&(r.target="_blank",r.rel="noopener"),n.append(r)}return n}function J(e){c.scrollTop=Math.min(Math.max(0,e.offsetTop-12),c.scrollHeight-c.clientHeight)}function $(e,t=!1,n){let o=document.createElement("div");if(o.className=`msg ${e.de}`,c.append(o),e.de==="client"){o.textContent=e.texte,c.scrollTop=c.scrollHeight,n==null||n();return}let r=document.createElement("div");r.className="contenu",Ee(r,e.texte),o.append(r);let a=we(e.liens),s=()=>{a&&o.append(a),J(o),n==null||n()};t&&!F?ye(o,r,s):s()}let f=null;function ye(e,t,n){f==null||f();let o=[],r=document.createTreeWalker(t,NodeFilter.SHOW_TEXT);for(let l=r.nextNode();l;l=r.nextNode()){let d=l;o.push({noeud:d,texte:d.data}),d.data=""}let a=Array.from(t.querySelectorAll("p, ul, ol, li"));a.forEach(l=>l.hidden=!0);let s=null,b=l=>{var g,E;for(let m=l.parentElement;m&&m!==t;m=m.parentElement)m.hidden=!1;let d=(E=(g=l.parentElement)==null?void 0:g.closest("p, li"))!=null?E:null;d!==s&&(s==null||s.classList.remove("ecrit"),d==null||d.classList.add("ecrit"),s=d)},v=o.reduce((l,d)=>l+d.texte.length,0),H=Math.max(ce/1e3,v/ue),Te=performance.now(),se=!0,h=0,C=0;e.classList.add("frappe"),e.setAttribute("aria-hidden","true");let N=()=>se=!1;c.addEventListener("wheel",N,{passive:!0}),c.addEventListener("touchmove",N,{passive:!0});let P=0,R=()=>{for(cancelAnimationFrame(P);h<o.length;h++)b(o[h].noeud),o[h].noeud.data=o[h].texte;a.forEach(l=>l.hidden=!1),s==null||s.classList.remove("ecrit"),e.classList.remove("frappe"),e.removeAttribute("aria-hidden"),e.removeEventListener("click",R),c.removeEventListener("wheel",N),c.removeEventListener("touchmove",N),f=null,n()},ie=l=>{let d=Math.min(v,Math.floor((l-Te)*H));for(;C<d&&h<o.length;){let{noeud:g,texte:E}=o[h];b(g);let m=Math.min(d-C,E.length-g.data.length);g.data=E.slice(0,g.data.length+m),C+=m,g.data.length>=E.length&&h++}se&&J(e),C>=v?R():P=requestAnimationFrame(ie)};e.addEventListener("click",R),f=R,P=requestAnimationFrame(ie)}function D(e){j.replaceChildren();for(let t of e.slice(0,5)){let n=document.createElement("button");n.type="button",n.textContent=t,n.addEventListener("click",()=>O(t)),j.append(n)}}function Le(){let e=document.createElement("div");return e.className="msg assistant",e.setAttribute("aria-label","Le conseiller \xE9crit"),e.innerHTML='<span class="attente"><span></span><span></span><span></span></span>',c.append(e),c.scrollTop=c.scrollHeight,e}let W={nature:"erreur",texte:`Le service est momentan\xE9ment indisponible. Notre \xE9quipe vous r\xE9pond au **${B}**.`,liens:[],suggestions:[],contexte:{concepts:[],type:null}};async function X(e,t){try{let n=await fetch(`${ae}${e}`,{method:t?"POST":"GET",headers:t?{"Content-Type":"text/plain;charset=UTF-8"}:void 0,body:t?JSON.stringify(t):void 0});return n.ok?await n.json():W}catch{return W}}function K(e){var n;let t={de:"assistant",texte:e.texte,liens:e.liens};i.messages.push(t),i.suggestions=(n=e.suggestions)!=null?n:[],e.nature!=="erreur"&&(i.contexte=e.contexte),T(),be.textContent=t.texte.replace(/\*\*/g,""),$(t,!0,()=>D(i.suggestions))}let q=!1;async function O(e){let t=e.trim().slice(0,_);if(!t||q)return;k(!1),f==null||f(),q=!0,V.disabled=!0;let n={de:"client",texte:t};i.messages.push(n),$(n),D([]),T();let o=Le(),r=Date.now(),a=await X("/api/chat",{message:t,contexte:i.contexte}),s=F?0:pe-(Date.now()-r);s>0&&await new Promise(b=>setTimeout(b,s)),o.remove(),K(a),q=!1,V.disabled=!1}let Q=!1;function k(e=!0){L.hidden&&(L.hidden=!1,M.setAttribute("aria-expanded","true"),i.ouvert=!0,T(),e&&i.messages.length===0&&!Q&&(Q=!0,X("/api/accueil").then(K)),setTimeout(()=>p.focus(),50))}function A(){L.hidden||(L.hidden=!0,M.setAttribute("aria-expanded","false"),i.ouvert=!1,T(),M.focus())}M.addEventListener("click",()=>L.hidden?k():A()),u(".fermer").addEventListener("click",A),y.addEventListener("keydown",e=>{e.key==="Escape"&&A()}),G.addEventListener("submit",e=>{e.preventDefault();let t=p.value;p.value="",p.style.height="",O(t)}),p.addEventListener("keydown",e=>{e.key==="Enter"&&!e.shiftKey&&(e.preventDefault(),G.requestSubmit())}),p.addEventListener("input",()=>{p.style.height="",p.style.height=`${Math.min(p.scrollHeight,120)}px`}),i.messages.forEach(e=>$(e)),D(i.suggestions);function Z(){document.body.append(S),i.ouvert&&k()}document.body?Z():document.addEventListener("DOMContentLoaded",Z),window.DuhalleChat={ouvrir:()=>k(),fermer:A,poser:e=>{O(e)}}})();})();
