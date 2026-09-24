/* Chatbot Duhallé — widget compilé depuis src/widget/widget.ts (npm run build). Ne pas modifier à la main. */
"use strict";(()=>{(function(){var D,U,F;if(window.DuhalleChat)return;let c=document.currentScript,p=e=>{var t;return(t=c==null?void 0:c.getAttribute(`data-${e}`))!=null?t:void 0},G=c!=null&&c.src?new URL(c.src).origin:"",Y=(D=p("titre"))!=null?D:"Conseiller Duhall\xE9",j=/^#[0-9a-f]{3,8}$/i.test((U=p("couleur"))!=null?U:"")?p("couleur"):"#6B2737",k=p("position")==="gauche",M=(F=p("telephone"))!=null?F:"02 47 53 00 26",T="duhalle-chatbot",C=500;function J(){try{let e=sessionStorage.getItem(T);if(e){let t=JSON.parse(e);if(Array.isArray(t.messages))return t}}catch{}return{messages:[],suggestions:[],contexte:null,ouvert:!1}}let i=J();function h(){try{i.messages=i.messages.slice(-40),sessionStorage.setItem(T,JSON.stringify(i))}catch{}}let v=document.createElement("div");v.id="duhalle-chatbot";let K=v.attachShadow({mode:"open"}),A=document.createElement("style");A.textContent=`
    :host { all: initial; }
    * { box-sizing: border-box; }
    .dh {
      --dh-couleur: ${j};
      --dh-liege: #B5835A;
      --dh-creme: #F5EFE6;
      --dh-vert: #3E4E3A;
      --dh-texte: #2B2B2B;
      --dh-bord: #E4D9C8;
      font: 15px/1.5 -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      color: var(--dh-texte);
    }
    .bulle {
      position: fixed; bottom: 20px; ${k?"left":"right"}: 20px; z-index: 2147483000;
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
      position: fixed; bottom: 88px; ${k?"left":"right"}: 20px; z-index: 2147483000;
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
    @media (prefers-reduced-motion: reduce) { .bulle, .attente span { transition: none; animation: none; } }
    @media (max-width: 480px) {
      .fenetre { inset: 0; width: 100%; max-width: none; height: 100%; max-height: none; border-radius: 0; }
      .bulle .libelle { display: none; }
      .bulle { padding: 0 16px; }
    }
  `;let V='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 12a8 8 0 0 1-11.6 7.1L4 20l1-4.6A8 8 0 1 1 21 12z"/></svg>',Q='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg>',W='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>',f=document.createElement("div");f.className="dh",f.innerHTML=`
    <button class="bulle" type="button" aria-haspopup="dialog" aria-expanded="false" aria-controls="dh-fenetre">
      ${V}<span class="libelle">Une question ?</span>
    </button>
    <section class="fenetre" id="dh-fenetre" role="dialog" aria-modal="false" aria-labelledby="dh-titre" hidden>
      <header class="entete">
        <div class="textes">
          <p class="titre" id="dh-titre"></p>
          <p class="sous-titre">R\xE9ponse imm\xE9diate sur nos produits et nos conseils</p>
        </div>
        <button class="fermer" type="button" aria-label="Fermer la discussion">${Q}</button>
      </header>
      <div class="fil" role="log" aria-live="polite" aria-relevant="additions"></div>
      <div class="suggestions" aria-label="Questions sugg\xE9r\xE9es"></div>
      <form class="saisie">
        <label for="dh-question" style="position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0)">Votre question</label>
        <textarea id="dh-question" rows="1" maxlength="${C}" placeholder="Posez votre question\u2026"></textarea>
        <button type="submit" aria-label="Envoyer la question">${W}</button>
      </form>
      <p class="mention">Assistant automatique Duhall\xE9. Pour une question sur votre commande : ${X(M)}.</p>
    </section>
  `,K.append(A,f);let a=e=>f.querySelector(e),x=a(".bulle"),g=a(".fenetre"),u=a(".fil"),H=a(".suggestions"),N=a(".saisie"),l=a("textarea"),$=a(".saisie button");a(".titre").textContent=Y;function X(e){return e.replace(/[&<>"']/g,t=>`&#${t.charCodeAt(0)};`)}function R(e,t){t.split(/(\*\*[^*]+\*\*)/g).forEach(n=>{if(/^\*\*[^*]+\*\*$/.test(n)){let d=document.createElement("strong");d.textContent=n.slice(2,-2),e.append(d)}else n&&e.append(document.createTextNode(n))})}function Z(e,t){for(let n of t.split(/\n\s*\n/)){let d=n.split(`
`).filter(s=>s.trim()),o=null,r=null;for(let s of d){let I=/^\s*(?:-|\d+\.)\s+(.*)$/.exec(s);if(I){let P=/^\s*\d+\./.test(s);(!o||o.tagName==="OL"!==P)&&(o=document.createElement(P?"ol":"ul"),e.append(o));let _=document.createElement("li");R(_,I[1]),o.append(_),r=null}else o=null,r?r.append(document.createElement("br")):(r=document.createElement("p"),e.append(r)),R(r,s.trim())}}}function E(e){var n;let t=document.createElement("div");if(t.className=`msg ${e.de}`,e.de==="client")t.textContent=e.texte;else{Z(t,e.texte);let d=((n=e.liens)!=null?n:[]).filter(o=>/^https:\/\//.test(o.url));if(d.length){let o=document.createElement("div");o.className="liens";for(let r of d){let s=document.createElement("a");s.href=r.url,s.textContent=r.libelle,new URL(r.url).hostname!==location.hostname&&(s.target="_blank",s.rel="noopener"),o.append(s)}t.append(o)}}u.append(t),u.scrollTop=e.de==="assistant"?Math.max(0,t.offsetTop-12):u.scrollHeight}function y(e){H.replaceChildren();for(let t of e.slice(0,5)){let n=document.createElement("button");n.type="button",n.textContent=t,n.addEventListener("click",()=>L(t)),H.append(n)}}function ee(){let e=document.createElement("div");return e.className="msg assistant",e.setAttribute("aria-label","Le conseiller \xE9crit"),e.innerHTML='<span class="attente"><span></span><span></span><span></span></span>',u.append(e),u.scrollTop=u.scrollHeight,e}let S={nature:"erreur",texte:`Le service est momentan\xE9ment indisponible. Notre \xE9quipe vous r\xE9pond au **${M}**.`,liens:[],suggestions:[],contexte:{concepts:[],type:null}};async function q(e,t){try{let n=await fetch(`${G}${e}`,{method:t?"POST":"GET",headers:t?{"Content-Type":"text/plain;charset=UTF-8"}:void 0,body:t?JSON.stringify(t):void 0});return n.ok?await n.json():S}catch{return S}}function B(e){var n;let t={de:"assistant",texte:e.texte,liens:e.liens};i.messages.push(t),i.suggestions=(n=e.suggestions)!=null?n:[],e.nature!=="erreur"&&(i.contexte=e.contexte),E(t),y(i.suggestions),h()}let w=!1;async function L(e){let t=e.trim().slice(0,C);if(!t||w)return;m(!1),w=!0,$.disabled=!0;let n={de:"client",texte:t};i.messages.push(n),E(n),y([]),h();let d=ee(),o=await q("/api/chat",{message:t,contexte:i.contexte});d.remove(),B(o),w=!1,$.disabled=!1}let O=!1;function m(e=!0){g.hidden&&(g.hidden=!1,x.setAttribute("aria-expanded","true"),i.ouvert=!0,h(),e&&i.messages.length===0&&!O&&(O=!0,q("/api/accueil").then(B)),setTimeout(()=>l.focus(),50))}function b(){g.hidden||(g.hidden=!0,x.setAttribute("aria-expanded","false"),i.ouvert=!1,h(),x.focus())}x.addEventListener("click",()=>g.hidden?m():b()),a(".fermer").addEventListener("click",b),f.addEventListener("keydown",e=>{e.key==="Escape"&&b()}),N.addEventListener("submit",e=>{e.preventDefault();let t=l.value;l.value="",l.style.height="",L(t)}),l.addEventListener("keydown",e=>{e.key==="Enter"&&!e.shiftKey&&(e.preventDefault(),N.requestSubmit())}),l.addEventListener("input",()=>{l.style.height="",l.style.height=`${Math.min(l.scrollHeight,120)}px`}),i.messages.forEach(E),y(i.suggestions);function z(){document.body.append(v),i.ouvert&&m()}document.body?z():document.addEventListener("DOMContentLoaded",z),window.DuhalleChat={ouvrir:()=>m(),fermer:b,poser:e=>{L(e)}}})();})();
