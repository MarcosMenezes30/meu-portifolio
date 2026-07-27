import type { SiteData } from '../../types/siteData';
import { prefersReducedMotion } from '../../utils/motion';
import { setupReveal } from '../../utils/reveal';
import { applyScopedStyles } from '../../utils/style';

const css = `
:host { display: block; }
.section {
  width: var(--container);
  margin: 0 auto;
}

/* ── Hero contact card ── */
.contact-hero {
  position: relative;
  overflow: hidden;
  border: 1px solid rgba(255,255,255,0.1);
  border-radius: var(--r-xl);
  background: var(--card);
  backdrop-filter: blur(20px);
  padding: clamp(2.5rem, 5vw, 4rem) clamp(1.5rem, 4vw, 3.5rem);
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 2rem;
}

/* Animated gradient orbs in background */
.contact-hero::before {
  content: '';
  position: absolute;
  top: -40%;
  left: -10%;
  width: 55%;
  aspect-ratio: 1;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(59,130,246,0.18) 0%, transparent 70%);
  filter: blur(40px);
  pointer-events: none;
  animation: orb-drift 8s ease-in-out infinite alternate;
}
.contact-hero::after {
  content: '';
  position: absolute;
  bottom: -30%;
  right: -5%;
  width: 45%;
  aspect-ratio: 1;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(124,58,237,0.15) 0%, transparent 70%);
  filter: blur(36px);
  pointer-events: none;
  animation: orb-drift 10s ease-in-out infinite alternate-reverse;
}
@keyframes orb-drift {
  from { transform: translate(0, 0) scale(1); }
  to   { transform: translate(3%, 5%) scale(1.06); }
}

.contact-icon-ring {
  position: relative;
  width: 80px;
  height: 80px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, rgba(59,130,246,0.15), rgba(124,58,237,0.15));
  border: 1px solid rgba(255,255,255,0.14);
  z-index: 1;
}
.contact-icon-ring::before {
  content: '';
  position: absolute;
  inset: -8px;
  border-radius: 50%;
  border: 1px dashed rgba(255,255,255,0.12);
  animation: spin-slow 18s linear infinite;
}
@keyframes spin-slow {
  to { transform: rotate(360deg); }
}

.contact-body { z-index: 1; display: flex; flex-direction: column; align-items: center; gap: 0.75rem; max-width: 520px; }

.contact-eyebrow {
  font-size: 0.73rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--muted);
  opacity: 0.7;
}

.contact-title {
  margin: 0;
  font-family: var(--font-display);
  font-size: clamp(1.6rem, 3vw, 2.4rem);
  font-weight: 800;
  letter-spacing: -0.03em;
  line-height: 1.1;
  color: var(--text);
}

.contact-title .hi { background: var(--accent-grad); -webkit-background-clip: text; background-clip: text; color: transparent; }

.contact-sub {
  margin: 0;
  color: var(--muted);
  font-size: 0.95rem;
  line-height: 1.65;
  max-width: 44ch;
}

/* ── WhatsApp CTA ── */
.wa-btn {
  z-index: 1;
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.9rem 2rem;
  border-radius: 999px;
  background: linear-gradient(135deg, #25d366 0%, #128c7e 100%);
  color: #fff;
  font-weight: 700;
  font-size: 1rem;
  letter-spacing: 0.01em;
  border: none;
  cursor: pointer;
  transition: transform 280ms var(--ease-out), box-shadow 280ms, filter 280ms;
  box-shadow: 0 8px 30px rgba(37,211,102,0.30);
}
.wa-btn:hover {
  transform: scale(1.04) translateY(-2px);
  box-shadow: 0 16px 40px rgba(37,211,102,0.45);
  filter: brightness(1.07);
}
.wa-btn:active { transform: scale(0.98); }

.wa-btn .wa-pulse {
  position: absolute;
  inset: 0;
  border-radius: 999px;
  background: rgba(37,211,102,0.3);
  animation: pulse-ring 2.2s ease-out infinite;
  pointer-events: none;
}
@keyframes pulse-ring {
  0%   { transform: scale(1); opacity: 0.6; }
  100% { transform: scale(1.25); opacity: 0; }
}

/* ── Social links row ── */
.socials {
  z-index: 1;
  display: flex;
  align-items: center;
  gap: 0.65rem;
  flex-wrap: wrap;
  justify-content: center;
}
.social-pill {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.38rem 0.85rem;
  border-radius: 999px;
  border: 1px solid rgba(255,255,255,0.12);
  background: rgba(255,255,255,0.04);
  color: var(--muted);
  font-size: 0.78rem;
  font-weight: 500;
  text-decoration: none;
  cursor: pointer;
  transition: border-color 220ms, background 220ms, color 220ms, transform 220ms;
}
.social-pill:hover {
  border-color: rgba(255,255,255,0.25);
  background: rgba(255,255,255,0.08);
  color: var(--text);
  transform: translateY(-2px);
}

/* ── Info chips at bottom ── */
.info-chips {
  z-index: 1;
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  justify-content: center;
}
.chip {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.78rem;
  color: var(--muted);
  opacity: 0.7;
}

@media (prefers-reduced-motion: reduce) {
  .contact-hero::before, .contact-hero::after { animation: none; }
  .contact-icon-ring::before { animation: none; }
  .wa-btn .wa-pulse { animation: none; }
}

@media (max-width: 600px) {
  .wa-btn { padding: 0.8rem 1.4rem; font-size: 0.92rem; }
}
`;

export class SectionContact extends HTMLElement {
  private readonly shadowRootRef = this.attachShadow({ mode: 'open' });
  private data: SiteData | null = null;
  private cleanupReveal: (() => void) | null = null;

  set siteData(value: SiteData) { this.data = value; this.render(); }
  connectedCallback(): void { this.render(); }
  disconnectedCallback(): void { this.cleanupReveal?.(); }

  private openWhatsapp(): void {
    const wa = this.data?.profile.whatsapp;
    if (!wa) return;
    const text = encodeURIComponent(wa.message);
    window.open(`https://wa.me/${wa.number}?text=${text}`, '_blank', 'noopener,noreferrer');
  }

  private openUrl(url: string): void {
    window.open(url, '_blank', 'noopener,noreferrer');
  }

  private render(): void {
    if (!this.data) return;

    this.cleanupReveal?.();
    const { profile, contact } = this.data;

    this.shadowRootRef.innerHTML = '';
    applyScopedStyles(this.shadowRootRef, css);

    const section = document.createElement('section');
    section.className = 'section';

    section.innerHTML = `
      <div class="contact-hero" data-reveal>
        <!-- Icon ring -->
        <div class="contact-icon-ring">
          <icon-svg name="whatsapp" size="32"></icon-svg>
        </div>

        <!-- Body copy -->
        <div class="contact-body">
          <span class="contact-eyebrow">Contato</span>
          <h2 class="contact-title">Vamos <span class="hi">trabalhar juntos?</span></h2>
          <p class="contact-sub">
            Tenho uma ideia, projeto ou proposta para você. Me chame pelo WhatsApp e retorno rapidamente com os próximos passos.
          </p>
        </div>

        <!-- WhatsApp CTA -->
        <button class="wa-btn" id="wa-cta" type="button" aria-label="Conversar no WhatsApp">
          <span class="wa-pulse" aria-hidden="true"></span>
          <icon-svg name="whatsapp" size="22"></icon-svg>
          Conversar no WhatsApp
        </button>

        <!-- Social pills -->
        <div class="socials">
          <a class="social-pill" href="mailto:${contact.email}" aria-label="E-mail">
            <icon-svg name="mail" size="14"></icon-svg>
            ${contact.email}
          </a>
          <a class="social-pill" href="${profile.social.github}" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
            <icon-svg name="github" size="14"></icon-svg>
            GitHub
          </a>
          <a class="social-pill" href="${profile.social.linkedin}" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
            <icon-svg name="linkedin" size="14"></icon-svg>
            LinkedIn
          </a>
        </div>

        <!-- Info chips -->
        <div class="info-chips">
          <span class="chip">
            <icon-svg name="location" size="13"></icon-svg>
            ${contact.location}
          </span>
          <span class="chip">
            <icon-svg name="clock" size="13"></icon-svg>
            Resposta em até 24h
          </span>
        </div>
      </div>
    `;

    this.shadowRootRef.append(section);

    this.shadowRootRef.getElementById('wa-cta')?.addEventListener('click', () => this.openWhatsapp());

    this.cleanupReveal = setupReveal(this.shadowRootRef, { reducedMotion: prefersReducedMotion() });
  }
}

customElements.define('section-contact', SectionContact);
