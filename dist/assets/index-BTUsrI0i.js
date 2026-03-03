(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))a(r);new MutationObserver(r=>{for(const o of r)if(o.type==="childList")for(const n of o.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&a(n)}).observe(document,{childList:!0,subtree:!0});function t(r){const o={};return r.integrity&&(o.integrity=r.integrity),r.referrerPolicy&&(o.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?o.credentials="include":r.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function a(r){if(r.ep)return;r.ep=!0;const o=t(r);fetch(r.href,o)}})();const g={user:{viewBox:"0 0 24 24",path:"M12 12a5 5 0 1 0-5-5 5 5 0 0 0 5 5zm0 2c-4.42 0-8 2.24-8 5v1h16v-1c0-2.76-3.58-5-8-5z"},briefcase:{viewBox:"0 0 24 24",path:"M9 6V4h6v2h5v14H4V6h5zm2 0h2V5h-2v1zm9 6H4v6h16v-6z"},cpu:{viewBox:"0 0 24 24",path:"M9 3h6v2h2.5A2.5 2.5 0 0 1 20 7.5V10h2v4h-2v2.5a2.5 2.5 0 0 1-2.5 2.5H15v2h-6v-2H6.5A2.5 2.5 0 0 1 4 16.5V14H2v-4h2V7.5A2.5 2.5 0 0 1 6.5 5H9V3zm-2.5 4v10h11V7h-11zm2.5 2h6v6H9V9z"},badge:{viewBox:"0 0 24 24",path:"M12 2l3 2h4v7c0 5-3.4 9.6-7 11-3.6-1.4-7-6-7-11V4h4l3-2zm0 4.3L10 7.7l-2.5.4 1.8 1.8-.4 2.5L12 11l2.1 1.4-.4-2.5 1.8-1.8-2.5-.4L12 6.3z"},graduation:{viewBox:"0 0 24 24",path:"M12 3 1 9l11 6 9-4.91V17h2V9L12 3zm0 14L5 13.2V17l7 4 7-4v-3.8L12 17z"},clock:{viewBox:"0 0 24 24",path:"M12 1.75A10.25 10.25 0 1 0 22.25 12 10.26 10.26 0 0 0 12 1.75zm.75 5.5v4.44l3.52 2.1-.76 1.28-4.26-2.56V7.25h1.5z"},code:{viewBox:"0 0 24 24",path:"M8.7 16.3 4.4 12l4.3-4.3 1.4 1.4L7.2 12l2.9 2.9-1.4 1.4zm6.6 0-1.4-1.4 2.9-2.9-2.9-2.9 1.4-1.4 4.3 4.3-4.3 4.3z"},award:{viewBox:"0 0 24 24",path:"M12 2a6 6 0 0 1 6 6c0 2.5-1.5 4.7-3.7 5.6L16 22l-4-2-4 2 1.7-8.4A6 6 0 1 1 12 2zm0 2a4 4 0 1 0 0 8 4 4 0 0 0 0-8z"},rocket:{viewBox:"0 0 24 24",path:"M14 2s5 2 7 8c-1 0-3 .2-4 1.2l-3.2 3.2L9.6 10C10.6 9 10.8 7 10.8 6c6-2 8-4 8-4zm-5.9 9.9 4 4-4.8 1.2L6 21l3.9-1.1 1.2-4.8zM5 11c1.4-2.7 4-3 5-3-.2 1-.6 3.6-3 5L5 11z"},history:{viewBox:"0 0 24 24",path:"M13 3a9 9 0 1 1-8.95 10H2l3.2 3.2L8.4 13H6.05A7 7 0 1 0 13 5v3l4-4-4-4v3zm-1 4h2v6h-2V7z"},settings:{viewBox:"0 0 24 24",path:"M19.4 13a7.7 7.7 0 0 0 .05-1 7.7 7.7 0 0 0-.05-1l2.1-1.65-2-3.46-2.5 1a7.6 7.6 0 0 0-1.75-1L15 3h-4l-.25 2.89c-.62.25-1.2.58-1.75 1l-2.5-1-2 3.46L6.6 11a7.7 7.7 0 0 0-.05 1c0 .34.02.67.05 1L4.5 14.65l2 3.46 2.5-1c.54.42 1.13.75 1.75 1L11 21h4l.25-2.89c.62-.25 1.2-.58 1.75-1l2.5 1 2-3.46L19.4 13zM13 15h-2v-2h2v2zm0-4h-2V7h2v4z"},book:{viewBox:"0 0 24 24",path:"M5 3h12a3 3 0 0 1 3 3v13H8a3 3 0 0 0-3 3V3zm3 4v2h8V7H8zm0 4v2h8v-2H8z"},shield:{viewBox:"0 0 24 24",path:"M12 2 4 5v6c0 5.2 3.4 9.9 8 11 4.6-1.1 8-5.8 8-11V5l-8-3zm-1 13-3-3 1.4-1.4L11 12.2l3.6-3.6L16 10l-5 5z"},spark:{viewBox:"0 0 24 24",path:"m13 2 2 5 5 2-5 2-2 5-2-5-5-2 5-2 2-5zm-6 13 1.2 3L11 19l-2.8 1L7 23l-1.2-3L3 19l2.8-1L7 15zm12 1 1 2.5L23 20l-3 1.5L19 24l-1-2.5L15 20l3-1.5L19 16z"},users:{viewBox:"0 0 24 24",path:"M16 11a4 4 0 1 0-4-4 4 4 0 0 0 4 4zM8 11a3 3 0 1 0-3-3 3 3 0 0 0 3 3zm0 2c-2.76 0-5 1.79-5 4v1h8v-1a5 5 0 0 1 1.53-3.58A7.8 7.8 0 0 0 8 13zm8 0c-2.76 0-5 1.79-5 4v1h10v-1c0-2.21-2.24-4-5-4z"},bolt:{viewBox:"0 0 24 24",path:"M11 21h-1l1-7H7l6-11h1l-1 7h4l-6 11z"},target:{viewBox:"0 0 24 24",path:"M12 2a10 10 0 1 0 10 10h-2a8 8 0 1 1-8-8V2zm0 5a5 5 0 1 0 5 5h2a7 7 0 1 1-7-7V7zm0 3a2 2 0 1 0 2 2h2a4 4 0 1 1-4-4v2zm0 0V2l6 2-6 6z"},mail:{viewBox:"0 0 24 24",path:"M3 5h18a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2zm0 3.2V17h18V8.2l-9 5.6-9-5.6zm9 3.3 8.7-5.3H3.3L12 11.5z"},phone:{viewBox:"0 0 24 24",path:"M6.6 10.8a15.5 15.5 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.24c1.08.36 2.24.56 3.46.56a1 1 0 0 1 1 1V21a1 1 0 0 1-1 1C10.85 22 2 13.15 2 2.2a1 1 0 0 1 1-1H7.5a1 1 0 0 1 1 1c0 1.22.2 2.38.56 3.46a1 1 0 0 1-.24 1l-2.2 2.14z"},location:{viewBox:"0 0 24 24",path:"M12 2a7 7 0 0 1 7 7c0 4.2-4.5 9.2-7 12-2.5-2.8-7-7.8-7-12a7 7 0 0 1 7-7zm0 9.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z"},whatsapp:{viewBox:"0 0 24 24",path:"M20 4A10 10 0 0 0 4.4 16.2L3 21l4.9-1.3A10 10 0 1 0 20 4zm-8 16a8 8 0 0 1-4.1-1.1l-.3-.2-2.9.8.8-2.8-.2-.3A8 8 0 1 1 12 20zm4.5-6c-.24-.12-1.4-.7-1.62-.78-.22-.08-.38-.12-.54.12-.16.24-.62.78-.76.94-.14.16-.28.18-.52.06-.24-.12-1-.36-1.9-1.14-.7-.63-1.16-1.4-1.3-1.64-.14-.24-.02-.37.1-.49.1-.1.24-.26.36-.38.12-.12.16-.2.24-.34.08-.14.04-.26-.02-.38-.06-.12-.54-1.3-.74-1.78-.2-.48-.4-.42-.54-.42h-.46c-.16 0-.42.06-.64.3-.22.24-.84.82-.84 2s.86 2.32.98 2.48c.12.16 1.7 2.58 4.1 3.62.58.25 1.04.4 1.4.52.58.18 1.1.16 1.52.1.46-.06 1.4-.58 1.6-1.14.2-.56.2-1.04.14-1.14-.06-.1-.22-.16-.46-.28z"},link:{viewBox:"0 0 24 24",path:"M10.6 13.4a1 1 0 0 1 0-1.4l3.2-3.2a3 3 0 1 1 4.2 4.2l-1.8 1.8-1.4-1.4 1.8-1.8a1 1 0 1 0-1.4-1.4L12 13.4a1 1 0 0 1-1.4 0zm2.8-2.8a1 1 0 0 1 0 1.4l-3.2 3.2a3 3 0 0 1-4.2-4.2l1.8-1.8 1.4 1.4-1.8 1.8a1 1 0 0 0 1.4 1.4l3.2-3.2a1 1 0 0 1 1.4 0z"},chevronLeft:{viewBox:"0 0 24 24",path:"M15.4 5.4 8.8 12l6.6 6.6-1.4 1.4L6 12l8-8 1.4 1.4z"},chevronRight:{viewBox:"0 0 24 24",path:"M8.6 18.6 15.2 12 8.6 5.4 10 4l8 8-8 8-1.4-1.4z"},menu:{viewBox:"0 0 24 24",path:"M3 6h18v2H3V6zm0 5h18v2H3v-2zm0 5h18v2H3v-2z"},close:{viewBox:"0 0 24 24",path:"m18.3 5.7-1.4-1.4L12 9.2 7.1 4.3 5.7 5.7 10.6 10.6l-4.9 4.9 1.4 1.4 4.9-4.9 4.9 4.9 1.4-1.4-4.9-4.9 4.9-4.9z"},arrowUp:{viewBox:"0 0 24 24",path:"m12 4 8 8-1.4 1.4-5.6-5.6V20h-2V7.8l-5.6 5.6L4 12l8-8z"}},y="adoptedStyleSheets"in Document.prototype&&"replaceSync"in CSSStyleSheet.prototype;function l(i,e){if(y){const a=new CSSStyleSheet;return a.replaceSync(e),i.adoptedStyleSheets=[...i.adoptedStyleSheets,a],null}const t=document.createElement("style");return t.textContent=e,i.append(t),t}const R=`
:host {
  display: inline-flex;
  width: var(--icon-size, 1.1rem);
  height: var(--icon-size, 1.1rem);
  color: currentColor;
}
svg {
  width: 100%;
  height: 100%;
  fill: currentColor;
}
`;class E extends HTMLElement{static get observedAttributes(){return["name","size"]}shadowRootRef=this.attachShadow({mode:"open"});connectedCallback(){this.render()}attributeChangedCallback(){this.render()}render(){const e=this.getAttribute("name")??"spark",t=g[e]??g.spark,a=this.getAttribute("size");this.shadowRootRef.innerHTML="",l(this.shadowRootRef,R),a&&this.style.setProperty("--icon-size",a.endsWith("px")?a:`${a}px`);const r=document.createElementNS("http://www.w3.org/2000/svg","svg");r.setAttribute("viewBox",t.viewBox),r.setAttribute("aria-hidden","true");const o=document.createElementNS("http://www.w3.org/2000/svg","path");o.setAttribute("d",t.path),r.append(o),this.shadowRootRef.append(r)}}customElements.define("icon-svg",E);const k=`
:host {
  display: block;
}
.shell {
  position: relative;
  border-radius: var(--r-xl);
}
.card {
  position: relative;
  height: 100%;
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: inherit;
  background: linear-gradient(145deg, rgba(14, 22, 46, 0.84), rgba(17, 26, 55, 0.65));
  box-shadow: var(--shadow-1);
  backdrop-filter: blur(10px);
  padding: var(--card-pad, 1.25rem);
  transition:
    border-color var(--dur-2) var(--ease-out),
    box-shadow var(--dur-2) var(--ease-out),
    transform var(--dur-2) var(--ease-out);
}
:host([interactive]) .card {
  cursor: pointer;
}
:host([interactive]):hover .card,
:host([interactive]):focus-within .card {
  border-color: rgba(59, 130, 246, 0.38);
  box-shadow:
    0 0 0 1px rgba(59, 130, 246, 0.2),
    var(--shadow-2);
}
:host([breath]):hover .breathe,
:host([breath]):focus-within .breathe {
  transform: scale(1.02);
  animation: breath 2.2s ease-in-out infinite;
}
@keyframes breath {
  0% { transform: scale(1.02); }
  50% { transform: scale(1.028); }
  100% { transform: scale(1.02); }
}
`;class L extends HTMLElement{shadowRootRef=this.attachShadow({mode:"open"});connectedCallback(){this.render()}render(){this.shadowRootRef.innerHTML="",l(this.shadowRootRef,k);const e=document.createElement("div");e.className="shell";const t=document.createElement("div");t.className="card breathe";const a=document.createElement("slot");t.append(a),e.append(t),this.shadowRootRef.append(e)}}customElements.define("base-card",L);const $=`
:host {
  display: inline-flex;
}
button,
a {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  min-height: 2.9rem;
  padding: 0.65rem 1.15rem;
  border-radius: 999px;
  border: 1px solid transparent;
  font-weight: 600;
  letter-spacing: 0.01em;
  color: var(--text);
  text-decoration: none;
  cursor: pointer;
  transition:
    transform var(--dur-2) var(--ease-out),
    box-shadow var(--dur-2) var(--ease-out),
    border-color var(--dur-2) var(--ease-out),
    background var(--dur-2) var(--ease-out);
}
button.primary,
a.primary {
  background: linear-gradient(120deg, rgba(59, 130, 246, 0.95), rgba(66, 133, 244, 0.84));
  box-shadow: 0 12px 22px rgba(30, 86, 196, 0.28);
}
button.outline,
a.outline {
  border-color: rgba(255, 255, 255, 0.2);
  background: rgba(255, 255, 255, 0.02);
}
button:hover,
button:focus-visible,
a:hover,
a:focus-visible {
  transform: scale(1.02);
  box-shadow:
    0 0 0 1px rgba(59, 130, 246, 0.35),
    0 12px 24px rgba(30, 86, 196, 0.34);
  animation: breath 2.2s ease-in-out infinite;
}
@keyframes breath {
  0% { transform: scale(1.02); }
  50% { transform: scale(1.028); }
  100% { transform: scale(1.02); }
}
`;class z extends HTMLElement{static get observedAttributes(){return["variant","href","target","rel","type","aria-label"]}shadowRootRef=this.attachShadow({mode:"open"});connectedCallback(){this.render()}attributeChangedCallback(){this.render()}render(){const e=this.getAttribute("variant")??"primary",t=this.getAttribute("href");this.shadowRootRef.innerHTML="",l(this.shadowRootRef,$);const a=t?document.createElement("a"):document.createElement("button");a.className=e,t&&a instanceof HTMLAnchorElement&&(a.href=t,a.target=this.getAttribute("target")??"_self",a.rel=this.getAttribute("rel")??"noopener noreferrer"),!t&&a instanceof HTMLButtonElement&&(a.type=this.getAttribute("type")??"button");const r=this.getAttribute("aria-label");r&&a.setAttribute("aria-label",r);const o=document.createElement("slot");a.append(o),this.shadowRootRef.append(a)}}customElements.define("base-button",z);const M=`
:host {
  display: inline-flex;
}
span {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.45rem 0.78rem;
  border-radius: 999px;
  border: 1px solid rgba(255, 255, 255, 0.14);
  background: rgba(255, 255, 255, 0.03);
  font-size: 0.82rem;
  color: color-mix(in oklab, var(--text), white 5%);
  letter-spacing: 0.02em;
}
:host([accent]) span {
  border-color: rgba(59, 130, 246, 0.38);
  background: rgba(59, 130, 246, 0.12);
}
`;class C extends HTMLElement{shadowRootRef=this.attachShadow({mode:"open"});connectedCallback(){this.render()}render(){this.shadowRootRef.innerHTML="",l(this.shadowRootRef,M);const e=document.createElement("span");e.append(document.createElement("slot")),this.shadowRootRef.append(e)}}customElements.define("pill-badge",C);const A=`
:host {
  display: block;
  margin-bottom: clamp(1.8rem, 2.8vw, 2.6rem);
}
.eyebrow {
  display: inline-flex;
  margin-bottom: 0.8rem;
  font-size: 0.78rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--muted);
  border: 1px solid rgba(255, 255, 255, 0.13);
  border-radius: 999px;
  padding: 0.35rem 0.7rem;
}
h2 {
  margin: 0;
  font-family: var(--font-display);
  font-size: var(--h2);
  line-height: 1.1;
  letter-spacing: -0.02em;
}
.highlight {
  background: var(--accent-grad);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}
p {
  margin: 0.85rem 0 0;
  max-width: 64ch;
  color: var(--muted);
}
`;class T extends HTMLElement{static get observedAttributes(){return["eyebrow","title","highlight","subtitle"]}shadowRootRef=this.attachShadow({mode:"open"});connectedCallback(){this.render()}attributeChangedCallback(){this.render()}render(){const e=this.getAttribute("eyebrow")??"",t=this.getAttribute("title")??"",a=this.getAttribute("highlight")??"",r=this.getAttribute("subtitle")??"";if(this.shadowRootRef.innerHTML="",l(this.shadowRootRef,A),e){const n=document.createElement("span");n.className="eyebrow",n.textContent=e,this.shadowRootRef.append(n)}const o=document.createElement("h2");if(a&&t.includes(a)){const[n,s]=t.split(a);o.append(n);const c=document.createElement("span");c.className="highlight",c.textContent=a,o.append(c,s)}else o.textContent=t;if(this.shadowRootRef.append(o),r){const n=document.createElement("p");n.textContent=r,this.shadowRootRef.append(n)}}}customElements.define("section-title",T);const H=`
:host {
  position: fixed;
  right: 1rem;
  bottom: 1rem;
  z-index: 120;
  display: grid;
  gap: 0.6rem;
  width: min(360px, calc(100vw - 2rem));
}
.toast {
  border-radius: 14px;
  border: 1px solid rgba(255, 255, 255, 0.12);
  background: rgba(11, 16, 38, 0.93);
  color: var(--text);
  padding: 0.8rem 0.95rem;
  box-shadow: var(--shadow-2);
  opacity: 0;
  transform: translateY(8px);
  animation: show 240ms var(--ease-out) forwards;
}
.toast.success {
  border-color: rgba(52, 211, 153, 0.4);
}
.toast.error {
  border-color: rgba(251, 113, 133, 0.4);
}
@keyframes show {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
`;class S extends HTMLElement{shadowRootRef=this.attachShadow({mode:"open"});toasts=[];onToast=e=>{const t=e;if(!t.detail?.message)return;const a={id:crypto.randomUUID(),message:t.detail.message,type:t.detail.type??"info"};this.toasts=[...this.toasts,a],this.render(),window.setTimeout(()=>{this.toasts=this.toasts.filter(r=>r.id!==a.id),this.render()},3200)};connectedCallback(){window.addEventListener("show-toast",this.onToast),this.render()}disconnectedCallback(){window.removeEventListener("show-toast",this.onToast)}render(){this.shadowRootRef.innerHTML="",l(this.shadowRootRef,H),this.toasts.forEach(e=>{const t=document.createElement("div");t.className=`toast ${e.type??"info"}`,t.textContent=e.message,t.setAttribute("role","status"),t.setAttribute("aria-live","polite"),this.shadowRootRef.append(t)})}}customElements.define("toast-stack",S);const D=["a[href]","button:not([disabled])","input:not([disabled])","textarea:not([disabled])","select:not([disabled])",'[tabindex]:not([tabindex="-1"])'].join(",");function N(i){const e=t=>{if(t.key!=="Tab")return;const a=Array.from(i.querySelectorAll(D)).filter(s=>!s.hasAttribute("hidden")&&s.offsetParent!==null);if(!a.length){t.preventDefault();return}const r=a[0],o=a[a.length-1],n=document.activeElement;t.shiftKey&&n===r?(t.preventDefault(),o.focus()):!t.shiftKey&&n===o&&(t.preventDefault(),r.focus())};return i.addEventListener("keydown",e),()=>i.removeEventListener("keydown",e)}const I=`
:host {
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 110;
}
.backdrop {
  position: absolute;
  inset: 0;
  background: rgba(3, 6, 18, 0.62);
  opacity: 0;
  transition: opacity var(--dur-2) var(--ease-out);
}
.panel {
  position: absolute;
  right: 0;
  top: 0;
  height: 100%;
  width: min(86vw, 360px);
  background: rgba(10, 15, 34, 0.95);
  border-left: 1px solid rgba(255, 255, 255, 0.12);
  transform: translateX(100%);
  transition: transform var(--dur-2) var(--ease-out);
  box-shadow: var(--shadow-2);
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
:host([open]) {
  pointer-events: auto;
}
:host([open]) .backdrop {
  opacity: 1;
}
:host([open]) .panel {
  transform: translateX(0);
}
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.title {
  margin: 0;
  font-size: 1rem;
  color: var(--muted);
}
.close {
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 12px;
  background: transparent;
  color: var(--text);
  width: 2.5rem;
  height: 2.5rem;
  display: grid;
  place-items: center;
  cursor: pointer;
}
nav {
  display: grid;
  gap: 0.42rem;
}
button.link {
  width: 100%;
  display: flex;
  align-items: center;
  gap: 0.7rem;
  text-align: left;
  border: 1px solid transparent;
  background: rgba(255, 255, 255, 0.03);
  color: var(--text);
  border-radius: 14px;
  padding: 0.75rem 0.85rem;
  cursor: pointer;
}
button.link.active {
  border-color: rgba(59, 130, 246, 0.44);
  background: rgba(59, 130, 246, 0.15);
}
`;class j extends HTMLElement{shadowRootRef=this.attachShadow({mode:"open"});items=[];activeId="";cleanupFocusTrap=null;set navItems(e){this.items=e,this.render()}set active(e){this.activeId=e,this.render()}static get observedAttributes(){return["open"]}connectedCallback(){this.render(),document.addEventListener("keydown",this.onKeyDown)}disconnectedCallback(){document.removeEventListener("keydown",this.onKeyDown),this.cleanupFocusTrap?.()}attributeChangedCallback(){this.render()}onKeyDown=e=>{e.key==="Escape"&&this.hasAttribute("open")&&this.close()};close(){this.removeAttribute("open"),this.dispatchEvent(new CustomEvent("drawer-close",{bubbles:!0,composed:!0}))}navigate(e){this.dispatchEvent(new CustomEvent("navigate",{detail:{targetId:e},bubbles:!0,composed:!0})),this.close()}render(){this.shadowRootRef.innerHTML="",l(this.shadowRootRef,I);const e=this.hasAttribute("open"),t=document.createElement("button");t.className="backdrop",t.setAttribute("aria-label","Fechar menu ao clicar fora"),t.addEventListener("click",()=>this.close());const a=document.createElement("aside");a.className="panel",a.setAttribute("role","dialog"),a.setAttribute("aria-modal","true"),a.setAttribute("aria-label","Menu de navegação");const r=document.createElement("div");r.className="header";const o=document.createElement("p");o.className="title",o.textContent="Navegação";const n=document.createElement("button");n.className="close",n.setAttribute("aria-label","Fechar menu"),n.innerHTML='<icon-svg name="close"></icon-svg>',n.addEventListener("click",()=>this.close()),r.append(o,n);const s=document.createElement("nav");this.items.forEach(c=>{const d=document.createElement("button");d.className=`link ${c.id===this.activeId?"active":""}`,d.setAttribute("type","button"),d.setAttribute("aria-label",`Ir para seção ${c.label}`),d.innerHTML=`<icon-svg name="${c.icon}" size="18"></icon-svg><span>${c.label}</span>`,d.addEventListener("click",()=>this.navigate(c.id)),s.append(d)}),a.append(r,s),this.shadowRootRef.append(t,a),this.cleanupFocusTrap?.(),e&&(this.cleanupFocusTrap=N(a),window.setTimeout(()=>{n.focus()},0))}}customElements.define("nav-drawer",j);const P=`
:host {
  position: fixed;
  inset: 0 0 auto 0;
  z-index: 100;
  display: block;
}
header {
  width: var(--container);
  margin: 0.8rem auto 0;
  border: 1px solid rgba(255, 255, 255, 0.12);
  background: rgba(8, 13, 30, 0.72);
  backdrop-filter: blur(12px);
  border-radius: 18px;
  box-shadow: 0 10px 32px rgba(0, 0, 0, 0.22);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding: 0.55rem 0.75rem 0.55rem 1rem;
}
.brand {
  font-family: var(--font-display);
  font-size: 0.95rem;
  letter-spacing: 0.02em;
  font-weight: 600;
}
.brand strong {
  background: var(--accent-grad);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}
nav {
  display: flex;
  align-items: center;
  gap: 0.35rem;
}
.nav-link {
  border: 1px solid transparent;
  border-radius: 999px;
  background: transparent;
  color: var(--text);
  font-size: 0.89rem;
  padding: 0.48rem 0.75rem;
  cursor: pointer;
  transition: all var(--dur-1) var(--ease-out);
}
.nav-link.active {
  border-color: rgba(59, 130, 246, 0.45);
  background: rgba(59, 130, 246, 0.17);
}
.actions {
  display: flex;
  align-items: center;
  gap: 0.65rem;
}
.menu-btn {
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  background: rgba(255, 255, 255, 0.03);
  color: var(--text);
  display: none;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}
@media (max-width: 960px) {
  nav {
    display: none;
  }
  .menu-btn {
    display: inline-flex;
  }
}
`;class B extends HTMLElement{shadowRootRef=this.attachShadow({mode:"open"});navData=null;profile=null;activeId="sobre";drawerOpen=!1;set data(e){this.navData=e,this.render()}set profileData(e){this.profile=e,this.render()}set active(e){this.activeId=e,this.render()}connectedCallback(){this.render()}onNavigate(e){this.dispatchEvent(new CustomEvent("navigate",{detail:{targetId:e},bubbles:!0,composed:!0}))}toggleDrawer(){this.drawerOpen=!this.drawerOpen,this.render()}openWhatsapp(){if(!this.profile?.whatsapp.number)return;const e=encodeURIComponent(this.profile.whatsapp.message??"Olá!"),t=`https://wa.me/${this.profile.whatsapp.number}?text=${e}`;window.open(t,"_blank","noopener,noreferrer")}render(){if(!this.navData)return;this.shadowRootRef.innerHTML="",l(this.shadowRootRef,P);const e=document.createElement("header"),t=document.createElement("button");t.className="brand nav-link",t.innerHTML=`<strong>${this.profile?.name??"Seu Nome"}</strong>`,t.addEventListener("click",()=>this.onNavigate("hero"));const a=document.createElement("nav");this.navData.items.forEach(c=>{const d=document.createElement("button");d.className=`nav-link ${c.id===this.activeId?"active":""}`,d.textContent=c.label,d.setAttribute("type","button"),d.addEventListener("click",()=>this.onNavigate(c.id)),a.append(d)});const r=document.createElement("div");r.className="actions";const o=document.createElement("base-button");o.setAttribute("variant","primary"),o.setAttribute("aria-label","Abrir conversa no WhatsApp"),o.textContent=this.navData.cta.label,o.addEventListener("click",()=>this.openWhatsapp());const n=document.createElement("button");n.className="menu-btn",n.setAttribute("type","button"),n.setAttribute("aria-label","Abrir menu"),n.innerHTML='<icon-svg name="menu" size="20"></icon-svg>',n.addEventListener("click",()=>this.toggleDrawer()),r.append(o,n),e.append(t,a,r);const s=document.createElement("nav-drawer");this.drawerOpen&&s.setAttribute("open",""),s.navItems=this.navData.items,s.active=this.activeId,s.addEventListener("drawer-close",()=>{this.drawerOpen=!1,this.render()}),s.addEventListener("navigate",c=>{const d=c;this.drawerOpen=!1,this.onNavigate(d.detail.targetId),this.render()}),this.shadowRootRef.append(e,s)}}customElements.define("app-navbar",B);const V=`
:host {
  position: fixed;
  right: 1.1rem;
  bottom: 1.1rem;
  z-index: 95;
}
button {
  width: 3rem;
  height: 3rem;
  border-radius: 999px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  background: linear-gradient(140deg, rgba(59, 130, 246, 0.9), rgba(124, 58, 237, 0.78));
  color: white;
  display: grid;
  place-items: center;
  cursor: pointer;
  opacity: 0;
  transform: translateY(10px);
  pointer-events: none;
  transition: all var(--dur-2) var(--ease-out);
  box-shadow: var(--shadow-2);
}
button.visible {
  opacity: 1;
  transform: translateY(0);
  pointer-events: auto;
}
`;class F extends HTMLElement{shadowRootRef=this.attachShadow({mode:"open"});visible=!1;ticking=!1;connectedCallback(){this.render(),window.addEventListener("scroll",this.onScroll,{passive:!0})}disconnectedCallback(){window.removeEventListener("scroll",this.onScroll)}onScroll=()=>{this.ticking||(this.ticking=!0,requestAnimationFrame(()=>{this.visible=window.scrollY>500,this.render(),this.ticking=!1}))};render(){this.shadowRootRef.innerHTML="",l(this.shadowRootRef,V);const e=document.createElement("button");e.className=this.visible?"visible":"",e.setAttribute("aria-label","Voltar ao topo"),e.innerHTML='<icon-svg name="arrowUp" size="20"></icon-svg>',e.addEventListener("click",()=>{window.scrollTo({top:0,behavior:"smooth"})}),this.shadowRootRef.append(e)}}customElements.define("back-to-top",F);const q=`
:host {
  display: block;
  padding: 2rem 0 2.5rem;
}
.footer {
  width: var(--container);
  margin: 0 auto;
  border-radius: var(--r-xl);
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: linear-gradient(180deg, rgba(9, 14, 32, 0.8), rgba(8, 12, 28, 0.95));
  padding: 1.6rem;
}
.grid {
  display: grid;
  grid-template-columns: 1.5fr 1fr 1fr 1fr;
  gap: 1.3rem;
}
h4 {
  margin: 0 0 0.65rem;
  font-size: 0.92rem;
}
p,
a,button {
  color: var(--muted);
  font-size: 0.9rem;
}
.links {
  display: grid;
  gap: 0.45rem;
}
.link-btn {
  border: 0;
  text-align: left;
  background: transparent;
  padding: 0;
  cursor: pointer;
}
.bottom {
  margin-top: 1.25rem;
  padding-top: 1rem;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  flex-wrap: wrap;
  color: var(--muted);
  font-size: 0.82rem;
}
@media (max-width: 960px) {
  .grid {
    grid-template-columns: 1fr 1fr;
  }
}
@media (max-width: 640px) {
  .grid {
    grid-template-columns: 1fr;
  }
}
`;class O extends HTMLElement{shadowRootRef=this.attachShadow({mode:"open"});siteData=null;set data(e){this.siteData=e,this.render()}connectedCallback(){this.render()}navigate(e){this.dispatchEvent(new CustomEvent("navigate",{detail:{targetId:e},bubbles:!0,composed:!0}))}openWhatsapp(){const e=this.siteData?.profile.whatsapp;if(!e)return;const t=encodeURIComponent(e.message);window.open(`https://wa.me/${e.number}?text=${t}`,"_blank","noopener,noreferrer")}render(){if(!this.siteData)return;this.shadowRootRef.innerHTML="",l(this.shadowRootRef,q);const e=document.createElement("footer");e.className="footer";const t=document.createElement("div");t.className="grid";const a=document.createElement("div");a.innerHTML=`<h4>${this.siteData.profile.name}</h4><p>${this.siteData.footer.shortBio}</p>`;const r=document.createElement("div"),o=document.createElement("div");o.className="links",r.innerHTML="<h4>Navegação</h4>",this.siteData.nav.items.forEach(v=>{const m=document.createElement("button");m.className="link-btn",m.textContent=v.label,m.addEventListener("click",()=>this.navigate(v.id)),o.append(m)}),r.append(o);const n=document.createElement("div");n.innerHTML=`<h4>Contato</h4><div class="links"><a href="mailto:${this.siteData.contact.email}">${this.siteData.contact.email}</a><a href="tel:${this.siteData.contact.phone}">${this.siteData.contact.phone}</a><p>${this.siteData.contact.location}</p></div>`;const s=document.createElement("div");s.innerHTML="<h4>Vamos conversar?</h4><p>Aberto para novos desafios e consultorias.</p>";const c=document.createElement("base-button");c.setAttribute("variant","outline"),c.textContent="Chamar no WhatsApp",c.addEventListener("click",()=>this.openWhatsapp()),s.append(c),t.append(a,r,n,s);const d=document.createElement("div");d.className="bottom";const u=new Date().getFullYear();d.innerHTML=`<span>© ${u} ${this.siteData.profile.name}. Todos os direitos reservados.</span><span>${this.siteData.footer.credits}</span>`,e.append(t,d),this.shadowRootRef.append(e)}}customElements.define("app-footer",O);function U(i){return i*(2-i)}function Y(i){const e=performance.now(),t=i.duration??1200,a=r=>{const o=Math.min((r-e)/t,1),n=U(o),s=Math.round(i.value*n);i.element.textContent=`${s}${i.suffix??""}`,o<1&&requestAnimationFrame(a)};requestAnimationFrame(a)}function W(i,e={}){if(!i.length)return()=>{};if((e.reducedMotion??!1)||typeof IntersectionObserver>"u")return i.forEach(o=>{o.element.textContent=`${o.value}${o.suffix??""}`}),()=>{};const a=new WeakSet,r=new IntersectionObserver(o=>{o.forEach(n=>{if(!n.isIntersecting)return;const s=n.target;if(a.has(s))return;const c=i.find(d=>d.element===s);c&&(a.add(s),Y(c),r.unobserve(s))})},{threshold:e.threshold??.35});return i.forEach(o=>{o.element.textContent=`0${o.suffix??""}`,r.observe(o.element)}),()=>r.disconnect()}function h(){return typeof window>"u"||typeof window.matchMedia!="function"?!1:window.matchMedia("(prefers-reduced-motion: reduce)").matches}function X(i){i.style.opacity="0",i.style.transform="translateY(18px)",i.style.transition="opacity 650ms var(--ease-out), transform 650ms var(--ease-out)",i.style.willChange="opacity, transform"}function b(i){i.style.opacity="1",i.style.transform="translateY(0)",i.style.willChange="auto"}function p(i,e={}){const t=e.selector??"[data-reveal]",a=e.threshold??.15,r=e.reducedMotion??!1,o=Array.from(i.querySelectorAll(t));if(o.length===0)return()=>{};if(r||typeof IntersectionObserver>"u")return o.forEach(s=>{s.classList.add("revealed"),b(s),s.style.transition="none"}),()=>{};const n=new IntersectionObserver(s=>{s.forEach(c=>{if(!c.isIntersecting)return;const d=c.target;d.classList.add("revealed"),b(d),n.unobserve(d)})},{threshold:a});return o.forEach(s=>{s.classList.add("reveal"),X(s),n.observe(s)}),()=>n.disconnect()}const _=`
:host {
  display: block;
  padding-top: clamp(7.2rem, 10vw, 8.8rem);
}
.wrap {
  width: var(--container);
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1.15fr 0.85fr;
  align-items: center;
  gap: clamp(1.5rem, 3.2vw, 3.2rem);
}
.badge {
  margin-bottom: 1rem;
}
.role {
  margin: 0 0 0.45rem;
  color: var(--muted);
  letter-spacing: 0.04em;
  text-transform: uppercase;
  font-size: 0.8rem;
}
h1 {
  margin: 0;
  font-family: var(--font-display);
  font-size: var(--h1);
  line-height: 1.03;
  letter-spacing: -0.03em;
}
.accent {
  background: var(--accent-grad);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}
.description {
  max-width: 58ch;
  color: var(--muted);
  margin: 1rem 0 1.2rem;
}
.tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.55rem;
}
.actions {
  margin-top: 1.4rem;
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
}
.metrics {
  margin-top: 1.35rem;
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 0.8rem;
}
.metric {
  display: flex;
  align-items: center;
  gap: 0.7rem;
}
.metric .value {
  font-size: 1.3rem;
  font-weight: 700;
}
.hero-visual {
  position: relative;
  display: grid;
  place-items: center;
  min-height: 430px;
  transform: translate3d(var(--orb-x, 0px), var(--orb-y, 0px), 0);
}
.photo-wrap {
  position: relative;
  z-index: 2;
  width: clamp(220px, 34vw, 310px);
  aspect-ratio: 1;
  border-radius: 50%;
  border: 1px solid rgba(255, 255, 255, 0.2);
  overflow: hidden;
  box-shadow: var(--shadow-2);
  transform: translate3d(var(--photo-x, 0px), var(--photo-y, 0px), 0);
}
.photo-wrap img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.ring {
  position: absolute;
  width: clamp(310px, 42vw, 410px);
  aspect-ratio: 1;
  border-radius: 50%;
  border: 1px dashed rgba(255, 255, 255, 0.16);
  animation: spin 24s linear infinite;
  will-change: transform;
}
.orb {
  position: absolute;
  width: 2.35rem;
  height: 2.35rem;
  border-radius: 999px;
  border: 1px solid rgba(255, 255, 255, 0.22);
  background: rgba(10, 16, 38, 0.82);
  display: grid;
  place-items: center;
  box-shadow: 0 0 0 1px rgba(59, 130, 246, 0.18), 0 10px 18px rgba(0, 0, 0, 0.28);
}
.orb:nth-child(1) { left: 50%; top: -1.1rem; transform: translateX(-50%); }
.orb:nth-child(2) { right: -1rem; top: 50%; transform: translateY(-50%); }
.orb:nth-child(3) { left: 50%; bottom: -1.1rem; transform: translateX(-50%); }
.orb:nth-child(4) { left: -1rem; top: 50%; transform: translateY(-50%); }
.socials {
  margin-top: 1rem;
  display: flex;
  justify-content: center;
  gap: 0.65rem;
}
.socials a {
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 999px;
  border: 1px solid rgba(255, 255, 255, 0.18);
  display: grid;
  place-items: center;
  background: rgba(255, 255, 255, 0.02);
}
.socials a:hover {
  animation: breath 2.2s ease-in-out infinite;
}
@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
@keyframes breath {
  0% { transform: scale(1.02); }
  50% { transform: scale(1.028); }
  100% { transform: scale(1.02); }
}
@media (max-width: 980px) {
  .wrap {
    grid-template-columns: 1fr;
  }
  .hero-visual {
    order: -1;
    min-height: 360px;
  }
}
@media (prefers-reduced-motion: reduce) {
  .ring {
    animation: none;
  }
  .hero-visual,
  .photo-wrap {
    transform: none !important;
  }
}
`;class K extends HTMLElement{shadowRootRef=this.attachShadow({mode:"open"});data=null;cleanupReveal=null;cleanupCounter=null;rafId=0;pointerX=0;pointerY=0;reduced=!1;set siteData(e){this.data=e,this.render()}connectedCallback(){this.render()}disconnectedCallback(){this.cleanupReveal?.(),this.cleanupCounter?.(),cancelAnimationFrame(this.rafId),this.removeEventListener("mousemove",this.onMouseMove),this.removeEventListener("mouseleave",this.onMouseLeave)}onMouseMove=e=>{if(this.reduced)return;const t=this.getBoundingClientRect(),a=(e.clientX-t.left)/t.width-.5,r=(e.clientY-t.top)/t.height-.5;this.pointerX=a,this.pointerY=r,this.rafId||(this.rafId=requestAnimationFrame(()=>{this.style.setProperty("--photo-x",`${(this.pointerX*12).toFixed(2)}px`),this.style.setProperty("--photo-y",`${(this.pointerY*12).toFixed(2)}px`),this.style.setProperty("--orb-x",`${(this.pointerX*18).toFixed(2)}px`),this.style.setProperty("--orb-y",`${(this.pointerY*18).toFixed(2)}px`),this.rafId=0}))};onMouseLeave=()=>{this.reduced||(this.style.setProperty("--photo-x","0px"),this.style.setProperty("--photo-y","0px"),this.style.setProperty("--orb-x","0px"),this.style.setProperty("--orb-y","0px"))};openWhatsapp(){const e=this.data?.profile.whatsapp;if(!e)return;const t=encodeURIComponent(e.message);window.open(`https://wa.me/${e.number}?text=${t}`,"_blank","noopener,noreferrer")}navigate(e){this.dispatchEvent(new CustomEvent("navigate",{detail:{targetId:e},bubbles:!0,composed:!0}))}render(){if(!this.data)return;this.reduced=h(),this.cleanupReveal?.(),this.cleanupCounter?.();const{profile:e,metricsHero:t}=this.data;this.shadowRootRef.innerHTML="",l(this.shadowRootRef,_);const a=document.createElement("section");a.className="wrap";const r=document.createElement("div");r.innerHTML=`
      ${e.availability.enabled?`<pill-badge class="badge" accent>${e.availability.text}</pill-badge>`:""}
      <p class="role" data-reveal>${e.role} • ${e.tagline}</p>
      <h1 data-reveal>Olá, eu sou <span class="accent">${e.name}</span></h1>
      <p class="description" data-reveal>${e.heroDescription}</p>
      <div class="tags" data-reveal>
        ${e.heroTags.map(s=>`<pill-badge>${s}</pill-badge>`).join("")}
      </div>
      <div class="actions" data-reveal>
        <base-button variant="primary" id="btn-contact">Entre em Contato</base-button>
        <base-button variant="outline" id="btn-projects">Ver Projetos</base-button>
      </div>
      <div class="metrics" data-reveal>
        ${t.map(s=>`
              <base-card>
                <div class="metric">
                  <icon-svg name="${s.icon}" size="20"></icon-svg>
                  <div>
                    <div class="value" data-counter="${s.value}" data-suffix="${s.suffix}">0${s.suffix}</div>
                    <small>${s.label}</small>
                  </div>
                </div>
              </base-card>
            `).join("")}
      </div>
    `;const o=document.createElement("div");o.className="hero-visual",o.setAttribute("data-reveal",""),o.innerHTML=`
      <div class="ring" aria-hidden="true">
        <span class="orb"><icon-svg name="cpu" size="17"></icon-svg></span>
        <span class="orb"><icon-svg name="code" size="17"></icon-svg></span>
        <span class="orb"><icon-svg name="rocket" size="17"></icon-svg></span>
        <span class="orb"><icon-svg name="settings" size="17"></icon-svg></span>
      </div>
      <figure class="photo-wrap">
        <img src="${e.photoUrl}" alt="Foto de ${e.name}" />
      </figure>
      <div class="socials">
        <a href="${e.social.github}" target="_blank" rel="noopener noreferrer" aria-label="GitHub"><icon-svg name="code" size="16"></icon-svg></a>
        <a href="${e.social.linkedin}" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><icon-svg name="users" size="16"></icon-svg></a>
        <a href="${e.social.email}" aria-label="Enviar e-mail"><icon-svg name="mail" size="16"></icon-svg></a>
        <a href="#" id="hero-wa" aria-label="WhatsApp"><icon-svg name="whatsapp" size="16"></icon-svg></a>
      </div>
    `,a.append(r,o),this.shadowRootRef.append(a),this.shadowRootRef.getElementById("btn-contact")?.addEventListener("click",()=>this.navigate("contato")),this.shadowRootRef.getElementById("btn-projects")?.addEventListener("click",()=>this.navigate("projetos")),this.shadowRootRef.getElementById("hero-wa")?.addEventListener("click",s=>{s.preventDefault(),this.openWhatsapp()});const n=Array.from(this.shadowRootRef.querySelectorAll("[data-counter]"));this.cleanupCounter=W(n.map(s=>({element:s,value:Number(s.dataset.counter??0),suffix:s.dataset.suffix??""})),{reducedMotion:this.reduced}),this.cleanupReveal=p(this.shadowRootRef,{reducedMotion:this.reduced}),this.removeEventListener("mousemove",this.onMouseMove),this.removeEventListener("mouseleave",this.onMouseLeave),this.addEventListener("mousemove",this.onMouseMove),this.addEventListener("mouseleave",this.onMouseLeave)}}customElements.define("section-hero",K);const G=`
:host {
  display: block;
}
.section {
  width: var(--container);
  margin: 0 auto;
}
.grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 1rem;
}
.card {
  display: grid;
  gap: 0.55rem;
}
h3 {
  margin: 0;
  font-family: var(--font-display);
  font-size: 1.13rem;
}
p {
  margin: 0;
  color: var(--muted);
}
@media (max-width: 980px) {
  .grid {
    grid-template-columns: 1fr;
  }
}
`;class J extends HTMLElement{shadowRootRef=this.attachShadow({mode:"open"});data=null;cleanupReveal=null;set siteData(e){this.data=e,this.render()}connectedCallback(){this.render()}disconnectedCallback(){this.cleanupReveal?.()}render(){if(!this.data)return;this.cleanupReveal?.(),this.shadowRootRef.innerHTML="",l(this.shadowRootRef,G);const e=document.createElement("section");e.className="section",e.innerHTML=`
      <section-title
        eyebrow="Sobre mim"
        title="Minha jornada e evolução"
        highlight="jornada"
        subtitle="Da infraestrutura à engenharia de produto: visão ponta a ponta para entregar software com propósito."
        data-reveal
      ></section-title>
      <div class="grid">
        ${this.data.aboutCards.map(t=>`
              <div data-reveal>
                <base-card interactive breath>
                  <article class="card">
                    <icon-svg name="${t.icon}" size="22"></icon-svg>
                    <h3>${t.title}</h3>
                    <p>${t.text}</p>
                  </article>
                </base-card>
              </div>
            `).join("")}
      </div>
    `,this.shadowRootRef.append(e),this.cleanupReveal=p(this.shadowRootRef,{reducedMotion:h()})}}customElements.define("section-about",J);const Q=`
:host {
  display: block;
}
.section {
  width: var(--container);
  margin: 0 auto;
}
.grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 0.95rem;
}
.card {
  display: grid;
  gap: 0.6rem;
  min-height: 180px;
}
h3 {
  margin: 0;
  font-family: var(--font-display);
}
p {
  margin: 0;
  color: var(--muted);
}
@media (max-width: 980px) {
  .grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}
@media (max-width: 640px) {
  .grid {
    grid-template-columns: 1fr;
  }
}
`;class Z extends HTMLElement{shadowRootRef=this.attachShadow({mode:"open"});data=null;cleanupReveal=null;set siteData(e){this.data=e,this.render()}connectedCallback(){this.render()}disconnectedCallback(){this.cleanupReveal?.()}render(){if(!this.data)return;this.cleanupReveal?.(),this.shadowRootRef.innerHTML="",l(this.shadowRootRef,Q);const e=document.createElement("section");e.className="section",e.innerHTML=`
      <section-title
        eyebrow="Princípios"
        title="O que me move na engenharia"
        highlight="move"
        subtitle="Critérios que guiam decisões técnicas, produto e colaboração em cada entrega."
        data-reveal
      ></section-title>
      <div class="grid">
        ${this.data.values.map(t=>`
              <div data-reveal>
                <base-card interactive breath>
                  <article class="card">
                    <icon-svg name="${t.icon}" size="22"></icon-svg>
                    <h3>${t.title}</h3>
                    <p>${t.text}</p>
                  </article>
                </base-card>
              </div>
            `).join("")}
      </div>
    `,this.shadowRootRef.append(e),this.cleanupReveal=p(this.shadowRootRef,{reducedMotion:h()})}}customElements.define("section-values",Z);const ee=`
:host {
  display: block;
}
.section {
  width: var(--container);
  margin: 0 auto;
}
.filters {
  display: flex;
  flex-wrap: wrap;
  gap: 0.55rem;
  margin-bottom: 1.1rem;
}
.filter {
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.02);
  color: var(--text);
  padding: 0.46rem 0.82rem;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
}
.filter.active {
  border-color: rgba(59, 130, 246, 0.45);
  background: rgba(59, 130, 246, 0.16);
}
.count {
  font-size: 0.78rem;
  color: var(--muted);
}
.carousel {
  border-radius: var(--r-xl);
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(12, 18, 40, 0.4);
  padding: 1rem;
}
.viewport {
  overflow: hidden;
  border-radius: calc(var(--r-xl) - 6px);
}
.track {
  display: flex;
  transition: transform var(--dur-2) var(--ease-inout), opacity 240ms var(--ease-out);
}
.page {
  flex: 0 0 100%;
  display: grid;
  gap: 0.8rem;
}
.page.cols-3 {
  grid-template-columns: repeat(3, minmax(0, 1fr));
}
.page.cols-2 {
  grid-template-columns: repeat(2, minmax(0, 1fr));
}
.page.cols-1 {
  grid-template-columns: 1fr;
}
article {
  display: grid;
  gap: 0.74rem;
}
figure {
  margin: 0;
  border-radius: 14px;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.1);
}
figure img {
  aspect-ratio: 16 / 9;
  object-fit: cover;
  width: 100%;
}
h3 {
  margin: 0;
  font-size: 1.04rem;
}
p {
  margin: 0;
  color: var(--muted);
}
.tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.42rem;
}
.tag {
  padding: 0.2rem 0.54rem;
  border-radius: 999px;
  border: 1px solid rgba(255, 255, 255, 0.13);
  font-size: 0.75rem;
}
.controls {
  margin-top: 0.95rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;
}
.arrows {
  display: flex;
  gap: 0.5rem;
}
.arrow {
  width: 2.4rem;
  height: 2.4rem;
  border-radius: 999px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  background: rgba(255, 255, 255, 0.02);
  color: var(--text);
  display: grid;
  place-items: center;
  cursor: pointer;
}
.arrow:disabled {
  opacity: 0.45;
  cursor: not-allowed;
}
.dots {
  display: inline-flex;
  gap: 0.4rem;
}
.dot {
  width: 0.6rem;
  height: 0.6rem;
  border-radius: 999px;
  border: 0;
  background: rgba(255, 255, 255, 0.28);
  cursor: pointer;
}
.dot.active {
  background: linear-gradient(140deg, var(--accent-1), var(--accent-2));
}
`;class te extends HTMLElement{shadowRootRef=this.attachShadow({mode:"open"});data=null;activeCategory="all";currentPage=0;itemsPerView=3;cleanupReveal=null;resizeRaf=0;set siteData(e){this.data=e,this.render()}connectedCallback(){window.addEventListener("resize",this.onResize,{passive:!0}),this.updateItemsPerView(),this.render()}disconnectedCallback(){window.removeEventListener("resize",this.onResize),this.cleanupReveal?.(),cancelAnimationFrame(this.resizeRaf)}onResize=()=>{this.resizeRaf||(this.resizeRaf=requestAnimationFrame(()=>{this.updateItemsPerView(),this.currentPage=0,this.render(),this.resizeRaf=0}))};updateItemsPerView(){const e=window.innerWidth;e<720?this.itemsPerView=1:e<1060?this.itemsPerView=2:this.itemsPerView=3}get filteredProjects(){const e=this.data?.projects.items??[];return this.activeCategory==="all"?e:e.filter(t=>t.categoryIds.includes(this.activeCategory))}get pages(){const e=this.filteredProjects,t=[];for(let a=0;a<e.length;a+=this.itemsPerView)t.push(e.slice(a,a+this.itemsPerView));return t.length?t:[[]]}countByCategory(e){const t=this.data?.projects.items??[];return e==="all"?t.length:t.filter(a=>a.categoryIds.includes(e)).length}setCategory(e){this.activeCategory=e,this.currentPage=0,this.render()}openRepo(e){window.open(e,"_blank","noopener,noreferrer"),this.dispatchEvent(new CustomEvent("openRepo",{detail:{url:e},bubbles:!0,composed:!0}))}render(){if(!this.data)return;this.cleanupReveal?.();const e=this.pages;this.currentPage=Math.min(this.currentPage,Math.max(e.length-1,0)),this.shadowRootRef.innerHTML="",l(this.shadowRootRef,ee);const t=document.createElement("section");t.className="section",t.innerHTML=`
      <section-title
        eyebrow="Projetos"
        title="Projetos em destaque"
        highlight="Projetos"
        subtitle="Seleção de implementações com foco em escala, confiabilidade e experiência premium."
        data-reveal
      ></section-title>
      <div class="filters" data-reveal>
        ${this.data.projects.categories.map(a=>`
              <button type="button" class="filter ${a.id===this.activeCategory?"active":""}" data-category="${a.id}">
                <span>${a.label}</span>
                <span class="count">${this.countByCategory(a.id)}</span>
              </button>
            `).join("")}
      </div>
      <div class="carousel" data-reveal>
        <div class="viewport">
          <div class="track" style="transform: translateX(-${this.currentPage*100}%);">
            ${e.map(a=>`
                  <div class="page cols-${this.itemsPerView}">
                    ${a.map(r=>`
                          <base-card interactive breath>
                            <article>
                              <figure>
                                <img src="${r.imageUrl}" alt="Projeto ${r.title}" loading="lazy" />
                              </figure>
                              <h3>${r.title}</h3>
                              <p>${r.description}</p>
                              <div class="tags">
                                ${r.techTags.map(o=>`<span class="tag">${o}</span>`).join("")}
                              </div>
                              <base-button variant="outline" data-repo="${r.repoUrl}">Código</base-button>
                            </article>
                          </base-card>
                        `).join("")}
                  </div>
                `).join("")}
          </div>
        </div>
        <div class="controls">
          <div class="arrows">
            <button class="arrow" id="prev" aria-label="Anterior" ${this.currentPage===0?"disabled":""}>
              <icon-svg name="chevronLeft" size="18"></icon-svg>
            </button>
            <button class="arrow" id="next" aria-label="Próximo" ${this.currentPage>=e.length-1?"disabled":""}>
              <icon-svg name="chevronRight" size="18"></icon-svg>
            </button>
          </div>
          <div>${Math.min(this.currentPage+1,e.length)} / ${e.length}</div>
          <div class="dots">
            ${e.map((a,r)=>`<button class="dot ${r===this.currentPage?"active":""}" aria-label="Ir para página ${r+1}" data-dot="${r}"></button>`).join("")}
          </div>
        </div>
      </div>
    `,this.shadowRootRef.append(t),this.shadowRootRef.querySelectorAll(".filter").forEach(a=>{a.addEventListener("click",()=>{const r=a.dataset.category;r&&this.setCategory(r)})}),this.shadowRootRef.getElementById("prev")?.addEventListener("click",()=>{this.currentPage=Math.max(this.currentPage-1,0),this.render()}),this.shadowRootRef.getElementById("next")?.addEventListener("click",()=>{this.currentPage=Math.min(this.currentPage+1,e.length-1),this.render()}),this.shadowRootRef.querySelectorAll("[data-dot]").forEach(a=>{a.addEventListener("click",()=>{this.currentPage=Number(a.dataset.dot??0),this.render()})}),this.shadowRootRef.querySelectorAll("base-button[data-repo]").forEach(a=>{a.addEventListener("click",()=>{const r=a.getAttribute("data-repo");r&&this.openRepo(r)})}),this.cleanupReveal=p(this.shadowRootRef,{reducedMotion:h()})}}customElements.define("section-projects",te);const ae=`
:host {
  display: block;
}
.section {
  width: var(--container);
  margin: 0 auto;
}
.marquee {
  overflow: hidden;
  border-radius: var(--r-xl);
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(12, 19, 44, 0.45);
  padding: 0.8rem 0;
}
.track {
  width: max-content;
  display: flex;
  gap: 0.8rem;
  padding-inline: 0.8rem;
  animation: marquee 26s linear infinite;
}
.marquee:hover .track {
  animation-play-state: paused;
}
.card {
  min-width: 230px;
}
.skill-content {
  display: flex;
  align-items: center;
  gap: 0.72rem;
}
.skill-content img {
  width: 2rem;
  height: 2rem;
  object-fit: contain;
}
.skill-content h3 {
  margin: 0;
  font-size: 0.96rem;
}
.skill-content p {
  margin: 0.2rem 0 0;
  color: var(--muted);
  font-size: 0.84rem;
}
.grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 0.8rem;
}
@keyframes marquee {
  from { transform: translateX(0); }
  to { transform: translateX(-50%); }
}
@media (max-width: 980px) {
  .grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}
@media (max-width: 640px) {
  .grid {
    grid-template-columns: 1fr;
  }
}
`;class re extends HTMLElement{shadowRootRef=this.attachShadow({mode:"open"});data=null;cleanupReveal=null;set siteData(e){this.data=e,this.render()}connectedCallback(){this.render()}disconnectedCallback(){this.cleanupReveal?.()}renderCard(e,t,a){return`
      <div class="card">
        <base-card interactive breath>
          <article class="skill-content">
            <img src="${t}" alt="${e}" loading="lazy" />
            <div>
              <h3>${e}</h3>
              <p>${a}</p>
            </div>
          </article>
        </base-card>
      </div>
    `}render(){if(!this.data)return;this.cleanupReveal?.();const e=h(),t=this.data.skills;this.shadowRootRef.innerHTML="",l(this.shadowRootRef,ae);const a=document.createElement("section");a.className="section";const r=e?`
      <div class="grid" data-reveal>
        ${t.map(o=>this.renderCard(o.name,o.iconUrl,o.description)).join("")}
      </div>`:`
      <div class="marquee" data-reveal>
        <div class="track">
          ${[...t,...t].map(o=>this.renderCard(o.name,o.iconUrl,o.description)).join("")}
        </div>
      </div>`;a.innerHTML=`
      <section-title
        eyebrow="Skills"
        title="Stack técnica em movimento"
        highlight="movimento"
        subtitle="Ferramentas e tecnologias utilizadas para construir soluções confiáveis de ponta a ponta."
        data-reveal
      ></section-title>
      ${r}
    `,this.shadowRootRef.append(a),this.cleanupReveal=p(this.shadowRootRef,{reducedMotion:e})}}customElements.define("section-skills",re);function f(i){const[e,t]=i.split("-").map(Number);if(!e||!t)return i;const a=new Date(Date.UTC(e,t-1,1));return new Intl.DateTimeFormat("pt-BR",{month:"short",year:"numeric"}).format(a)}function oe(i){return i.reduce((e,t)=>e+t,0)}const ie=`
:host {
  display: block;
}
.section {
  width: var(--container);
  margin: 0 auto;
}
.grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 0.9rem;
}
.item {
  display: grid;
  gap: 0.7rem;
}
.badge {
  width: 72px;
  height: 72px;
  border-radius: 18px;
  object-fit: cover;
  border: 1px solid rgba(255, 255, 255, 0.12);
}
h3 {
  margin: 0;
  font-size: 1.03rem;
}
p {
  margin: 0;
  color: var(--muted);
}
.meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
}
@media (max-width: 860px) {
  .grid {
    grid-template-columns: 1fr;
  }
}
`;class se extends HTMLElement{shadowRootRef=this.attachShadow({mode:"open"});data=null;cleanupReveal=null;set siteData(e){this.data=e,this.render()}connectedCallback(){this.render()}disconnectedCallback(){this.cleanupReveal?.()}render(){if(!this.data)return;this.cleanupReveal?.(),this.shadowRootRef.innerHTML="",l(this.shadowRootRef,ie);const e=document.createElement("section");e.className="section",e.innerHTML=`
      <section-title
        eyebrow="Certificações"
        title="Credenciais verificáveis"
        highlight="verificáveis"
        subtitle="Certificações que validam atuação prática em cloud, plataforma e engenharia de software."
        data-reveal
      ></section-title>
      <div class="grid">
        ${this.data.certifications.map(t=>`
              <div data-reveal>
                <base-card interactive breath>
                  <article class="item">
                    <img class="badge" src="${t.badgeUrl}" alt="Badge ${t.title}" loading="lazy" />
                    <h3>${t.title}</h3>
                    <p>${t.issuer}</p>
                    <div class="meta">
                      <span>${f(t.date)}</span>
                      <base-button variant="outline" href="${t.verifyUrl}" target="_blank" rel="noopener noreferrer" aria-label="Abrir certificação ${t.title}">
                        Abrir <icon-svg name="link" size="14"></icon-svg>
                      </base-button>
                    </div>
                  </article>
                </base-card>
              </div>
            `).join("")}
      </div>
    `,this.shadowRootRef.append(e),this.cleanupReveal=p(this.shadowRootRef,{reducedMotion:h()})}}customElements.define("section-certs",se);const ne=`
:host {
  display: block;
}
.section {
  width: var(--container);
  margin: 0 auto;
}
.metrics {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 0.8rem;
  margin-bottom: 1rem;
}
.metric {
  display: grid;
  gap: 0.2rem;
}
.metric strong {
  font-size: 1.35rem;
}
.list {
  display: grid;
  gap: 0.8rem;
}
.course {
  display: grid;
  grid-template-columns: 110px 1fr auto;
  align-items: center;
  gap: 0.85rem;
}
.cover {
  width: 110px;
  aspect-ratio: 4/3;
  object-fit: cover;
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.12);
}
h3 {
  margin: 0;
  font-size: 1rem;
}
p {
  margin: 0.2rem 0;
  color: var(--muted);
}
.meta {
  font-size: 0.82rem;
}
@media (max-width: 840px) {
  .course {
    grid-template-columns: 1fr;
  }
  .cover {
    width: 100%;
  }
  .metrics {
    grid-template-columns: 1fr;
  }
}
`;class ce extends HTMLElement{shadowRootRef=this.attachShadow({mode:"open"});data=null;cleanupReveal=null;set siteData(e){this.data=e,this.render()}connectedCallback(){this.render()}disconnectedCallback(){this.cleanupReveal?.()}render(){if(!this.data)return;this.cleanupReveal?.();const e=this.data.courses.length,t=oe(this.data.courses.map(r=>r.hours));this.shadowRootRef.innerHTML="",l(this.shadowRootRef,ne);const a=document.createElement("section");a.className="section",a.innerHTML=`
      <section-title
        eyebrow="Cursos"
        title="Formação contínua e atualização"
        highlight="contínua"
        subtitle="Registros reais de estudos para evolução técnica constante e aplicação prática no dia a dia."
        data-reveal
      ></section-title>
      <div class="metrics">
        <div data-reveal><base-card><div class="metric"><strong>${e}</strong><span>Total de cursos</span></div></base-card></div>
        <div data-reveal><base-card><div class="metric"><strong>${t}h</strong><span>Total de horas</span></div></base-card></div>
      </div>
      <div class="list">
        ${this.data.courses.map(r=>`
              <div data-reveal>
                <base-card>
                  <article class="course">
                    <img class="cover" src="${r.coverUrl??"/assets/courses/default.svg"}" alt="Capa do curso ${r.title}" loading="lazy" />
                    <div>
                      <h3>${r.title}</h3>
                      <p>${r.platform}</p>
                      <span class="meta">${f(r.date)} • ${r.hours} horas</span>
                    </div>
                    ${r.certificateUrl?`<base-button variant="outline" href="${r.certificateUrl}" target="_blank" rel="noopener noreferrer">Certificado</base-button>`:"<span></span>"}
                  </article>
                </base-card>
              </div>
            `).join("")}
      </div>
    `,this.shadowRootRef.append(a),this.cleanupReveal=p(this.shadowRootRef,{reducedMotion:h()})}}customElements.define("section-courses",ce);const de=`
:host {
  display: block;
}
.section {
  width: var(--container);
  margin: 0 auto;
}
.grid {
  display: grid;
  grid-template-columns: 1.2fr 0.8fr;
  gap: 1rem;
}
form {
  display: grid;
  gap: 0.72rem;
}
label {
  display: grid;
  gap: 0.3rem;
  font-size: 0.88rem;
}
input,
textarea {
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.17);
  background: rgba(255, 255, 255, 0.03);
  color: var(--text);
  padding: 0.7rem 0.8rem;
}
textarea {
  min-height: 130px;
  resize: vertical;
}
.infos {
  display: grid;
  gap: 0.72rem;
}
.info {
  display: flex;
  align-items: center;
  gap: 0.65rem;
}
@media (max-width: 920px) {
  .grid {
    grid-template-columns: 1fr;
  }
}
`;class le extends HTMLElement{shadowRootRef=this.attachShadow({mode:"open"});data=null;cleanupReveal=null;set siteData(e){this.data=e,this.render()}connectedCallback(){this.render()}disconnectedCallback(){this.cleanupReveal?.()}toast(e,t="info"){window.dispatchEvent(new CustomEvent("show-toast",{detail:{message:e,type:t}}))}openWhatsapp(){const e=this.data?.profile.whatsapp;if(!e)return;const t=encodeURIComponent(e.message);window.open(`https://wa.me/${e.number}?text=${t}`,"_blank","noopener,noreferrer")}async submitForm(e){if(!this.data)return;const t=new FormData(e),a=String(t.get("name")??"").trim(),r=String(t.get("email")??"").trim(),o=String(t.get("subject")??"").trim(),n=String(t.get("message")??"").trim();if(!a||!r||!o||!n){this.toast("Preencha todos os campos obrigatórios.","error");return}if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(r)){this.toast("Informe um e-mail válido.","error");return}const s=this.data.contact.formEndpoint;if(s)try{if((await fetch(s,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({name:a,email:r,subject:o,message:n})})).ok){this.toast("Mensagem enviada com sucesso.","success"),e.reset();return}}catch{this.toast("Endpoint indisponível, abrindo fallback por e-mail.","info")}const c=`mailto:${this.data.contact.email}?subject=${encodeURIComponent(o)}&body=${encodeURIComponent(`Nome: ${a}
E-mail: ${r}

${n}`)}`;window.location.href=c,this.toast("Abrindo seu app de email...","info")}render(){if(!this.data)return;this.cleanupReveal?.(),this.shadowRootRef.innerHTML="",l(this.shadowRootRef,de);const e=document.createElement("section");e.className="section",e.innerHTML=`
      <section-title
        eyebrow="Contato"
        title="Interessado em trabalhar comigo"
        highlight="trabalhar"
        subtitle="Envie sua ideia, desafio ou proposta. Retorno rápido com próximos passos e estimativas."
        data-reveal
      ></section-title>
      <div class="grid">
        <div data-reveal>
          <base-card>
            <form id="contact-form" novalidate>
              <label>Nome<input name="name" required autocomplete="name" /></label>
              <label>E-mail<input name="email" type="email" required autocomplete="email" /></label>
              <label>Assunto<input name="subject" required /></label>
              <label>Mensagem<textarea name="message" required></textarea></label>
              <base-button variant="primary" type="submit">Enviar Mensagem</base-button>
            </form>
          </base-card>
        </div>
        <div class="infos">
          <div data-reveal><base-card interactive breath><div class="info"><icon-svg name="mail" size="18"></icon-svg><a href="mailto:${this.data.contact.email}">${this.data.contact.email}</a></div></base-card></div>
          <div data-reveal><base-card interactive breath><div class="info"><icon-svg name="phone" size="18"></icon-svg><a href="tel:${this.data.contact.phone}">${this.data.contact.phone}</a></div></base-card></div>
          <div data-reveal><base-card interactive breath><div class="info"><icon-svg name="location" size="18"></icon-svg><span>${this.data.contact.location}</span></div></base-card></div>
          <div data-reveal><base-card interactive breath><div class="info"><icon-svg name="whatsapp" size="18"></icon-svg><button id="wa-contact" type="button">Conversar no WhatsApp</button></div></base-card></div>
        </div>
      </div>
    `,this.shadowRootRef.append(e),this.shadowRootRef.getElementById("wa-contact")?.addEventListener("click",()=>this.openWhatsapp());const t=this.shadowRootRef.getElementById("contact-form");t?.addEventListener("submit",a=>{a.preventDefault(),this.submitForm(t)}),this.cleanupReveal=p(this.shadowRootRef,{reducedMotion:h()})}}customElements.define("section-contact",le);function he(){if(typeof window>"u")return()=>{};let i=!1;const e=()=>{const a=Math.max(document.body.scrollHeight-window.innerHeight,1),r=window.scrollY/a,o=Math.min(Math.max(r*100,0),100);document.documentElement.style.setProperty("--bg-shift",`${o.toFixed(2)}%`),i=!1},t=()=>{i||(i=!0,requestAnimationFrame(e))};return e(),window.addEventListener("scroll",t,{passive:!0}),window.addEventListener("resize",t,{passive:!0}),()=>{window.removeEventListener("scroll",t),window.removeEventListener("resize",t)}}function pe(i,e){if(!i.length||typeof IntersectionObserver>"u")return()=>{};const t=new Map,a=new IntersectionObserver(r=>{r.forEach(s=>{const c=s.target.id;t.set(c,s.intersectionRatio)});let o=i[0]?.id??"",n=-1;i.forEach(s=>{const c=t.get(s.id)??0;c>n&&(n=c,o=s.id)}),o&&n>=e.threshold/2&&e.onChange(o)},{threshold:[.15,.35,.55,.75],rootMargin:"-10% 0px -45% 0px"});return i.forEach(r=>a.observe(r)),()=>a.disconnect()}class me extends HTMLElement{data=null;activeId="sobre";cleanupSpy=null;cleanupGradient=null;set siteData(e){this.data=e,this.render()}connectedCallback(){this.cleanupGradient=he(),this.render(),this.addEventListener("navigate",this.onNavigate)}disconnectedCallback(){this.cleanupSpy?.(),this.cleanupGradient?.(),this.removeEventListener("navigate",this.onNavigate)}onNavigate=e=>{const a=e.detail?.targetId;if(!a)return;const r=this.querySelector(`#${a}`);r&&r.scrollIntoView({behavior:"smooth",block:"start"})};updateNavbarActive(){const e=this.querySelector("app-navbar");e&&(e.active=this.activeId)}render(){if(!this.data)return;this.cleanupSpy?.(),this.innerHTML="";const e=document.createElement("app-navbar");e.data=this.data.nav,e.profileData=this.data.profile,e.active=this.activeId;const t=document.createElement("section-hero");t.id="hero",t.className="section",t.siteData=this.data;const a=document.createElement("section-about");a.id="sobre",a.className="section",a.siteData=this.data;const r=document.createElement("section-values");r.id="valores",r.className="section",r.siteData=this.data;const o=document.createElement("section-projects");o.id="projetos",o.className="section",o.siteData=this.data;const n=document.createElement("section-skills");n.id="skills",n.className="section",n.siteData=this.data;const s=document.createElement("section-certs");s.id="certificacoes",s.className="section",s.siteData=this.data;const c=document.createElement("section-courses");c.id="cursos",c.className="section",c.siteData=this.data;const d=document.createElement("section-contact");d.id="contato",d.className="section",d.siteData=this.data;const u=document.createElement("app-footer");u.data=this.data;const v=document.createElement("toast-stack"),m=document.createElement("back-to-top");this.append(e,t,a,r,o,n,s,c,d,u,v,m);const w=[a,r,o,n,s,c,d];this.cleanupSpy=pe(w,{threshold:.55,onChange:x=>{this.activeId=x,this.updateNavbarActive()}})}}customElements.define("app-root",me);function ue(i){return typeof i=="object"&&i!==null}function ve(i){return ue(i)?["profile","nav","metricsHero","aboutCards","values","projects","skills","certifications","courses","contact","footer"].every(t=>t in i):!1}async function ge(){const i=new URL("/assets/siteData-CMoLZ6ly.json",import.meta.url),e=await fetch(i.href,{cache:"no-cache"});if(!e.ok)throw new Error(`Falha ao carregar siteData.json: HTTP ${e.status}`);const t=await e.json();if(!ve(t))throw new Error("siteData.json inválido: estrutura mínima não encontrada.");return t}async function be(){const i=document.querySelector("app-root");if(i)try{const e=await ge();i.siteData=e}catch(e){const t=e instanceof Error?e.message:"Erro desconhecido ao carregar dados do site.";i.innerHTML=`
      <main class="container" style="padding-top: 7rem; padding-bottom: 4rem;">
        <base-card>
          <h1 style="margin-top:0;">Falha ao iniciar o site</h1>
          <p>${t}</p>
        </base-card>
      </main>
    `,console.error(e)}}be();
