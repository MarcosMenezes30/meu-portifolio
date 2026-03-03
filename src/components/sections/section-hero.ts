import type { SiteData } from '../../types/siteData';
import { setupCounters } from '../../utils/counter';
import { prefersReducedMotion } from '../../utils/motion';
import { setupReveal } from '../../utils/reveal';
import { applyScopedStyles } from '../../utils/style';

const css = `
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
`;

export class SectionHero extends HTMLElement {
  private readonly shadowRootRef = this.attachShadow({ mode: 'open' });

  private data: SiteData | null = null;

  private cleanupReveal: (() => void) | null = null;

  private cleanupCounter: (() => void) | null = null;

  private rafId = 0;

  private pointerX = 0;

  private pointerY = 0;

  private reduced = false;

  set siteData(value: SiteData) {
    this.data = value;
    this.render();
  }

  connectedCallback(): void {
    this.render();
  }

  disconnectedCallback(): void {
    this.cleanupReveal?.();
    this.cleanupCounter?.();
    cancelAnimationFrame(this.rafId);
    this.removeEventListener('mousemove', this.onMouseMove);
    this.removeEventListener('mouseleave', this.onMouseLeave);
  }

  private onMouseMove = (event: MouseEvent): void => {
    if (this.reduced) return;

    const rect = this.getBoundingClientRect();
    const relX = (event.clientX - rect.left) / rect.width - 0.5;
    const relY = (event.clientY - rect.top) / rect.height - 0.5;

    this.pointerX = relX;
    this.pointerY = relY;

    if (!this.rafId) {
      this.rafId = requestAnimationFrame(() => {
        this.style.setProperty('--photo-x', `${(this.pointerX * 12).toFixed(2)}px`);
        this.style.setProperty('--photo-y', `${(this.pointerY * 12).toFixed(2)}px`);
        this.style.setProperty('--orb-x', `${(this.pointerX * 18).toFixed(2)}px`);
        this.style.setProperty('--orb-y', `${(this.pointerY * 18).toFixed(2)}px`);
        this.rafId = 0;
      });
    }
  };

  private onMouseLeave = (): void => {
    if (this.reduced) return;
    this.style.setProperty('--photo-x', '0px');
    this.style.setProperty('--photo-y', '0px');
    this.style.setProperty('--orb-x', '0px');
    this.style.setProperty('--orb-y', '0px');
  };

  private openWhatsapp(): void {
    const whatsapp = this.data?.profile.whatsapp;
    if (!whatsapp) return;
    const msg = encodeURIComponent(whatsapp.message);
    window.open(`https://wa.me/${whatsapp.number}?text=${msg}`, '_blank', 'noopener,noreferrer');
  }

  private navigate(targetId: string): void {
    this.dispatchEvent(
      new CustomEvent('navigate', {
        detail: { targetId },
        bubbles: true,
        composed: true,
      }),
    );
  }

  private render(): void {
    if (!this.data) return;

    this.reduced = prefersReducedMotion();
    this.cleanupReveal?.();
    this.cleanupCounter?.();

    const { profile, metricsHero } = this.data;

    this.shadowRootRef.innerHTML = '';
    applyScopedStyles(this.shadowRootRef, css);

    const wrap = document.createElement('section');
    wrap.className = 'wrap';

    const left = document.createElement('div');
    left.innerHTML = `
      ${profile.availability.enabled ? `<pill-badge class="badge" accent>${profile.availability.text}</pill-badge>` : ''}
      <p class="role" data-reveal>${profile.role} • ${profile.tagline}</p>
      <h1 data-reveal>Olá, eu sou <span class="accent">${profile.name}</span></h1>
      <p class="description" data-reveal>${profile.heroDescription}</p>
      <div class="tags" data-reveal>
        ${profile.heroTags.map((tag) => `<pill-badge>${tag}</pill-badge>`).join('')}
      </div>
      <div class="actions" data-reveal>
        <base-button variant="primary" id="btn-contact">Entre em Contato</base-button>
        <base-button variant="outline" id="btn-projects">Ver Projetos</base-button>
      </div>
      <div class="metrics" data-reveal>
        ${metricsHero
          .map(
            (metric) => `
              <base-card>
                <div class="metric">
                  <icon-svg name="${metric.icon}" size="20"></icon-svg>
                  <div>
                    <div class="value" data-counter="${metric.value}" data-suffix="${metric.suffix}">0${metric.suffix}</div>
                    <small>${metric.label}</small>
                  </div>
                </div>
              </base-card>
            `,
          )
          .join('')}
      </div>
    `;

    const right = document.createElement('div');
    right.className = 'hero-visual';
    right.setAttribute('data-reveal', '');

    right.innerHTML = `
      <div class="ring" aria-hidden="true">
        <span class="orb"><icon-svg name="cpu" size="17"></icon-svg></span>
        <span class="orb"><icon-svg name="code" size="17"></icon-svg></span>
        <span class="orb"><icon-svg name="rocket" size="17"></icon-svg></span>
        <span class="orb"><icon-svg name="settings" size="17"></icon-svg></span>
      </div>
      <figure class="photo-wrap">
        <img src="${profile.photoUrl}" alt="Foto de ${profile.name}" />
      </figure>
      <div class="socials">
        <a href="${profile.social.github}" target="_blank" rel="noopener noreferrer" aria-label="GitHub"><icon-svg name="code" size="16"></icon-svg></a>
        <a href="${profile.social.linkedin}" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><icon-svg name="users" size="16"></icon-svg></a>
        <a href="${profile.social.email}" aria-label="Enviar e-mail"><icon-svg name="mail" size="16"></icon-svg></a>
        <a href="#" id="hero-wa" aria-label="WhatsApp"><icon-svg name="whatsapp" size="16"></icon-svg></a>
      </div>
    `;

    wrap.append(left, right);
    this.shadowRootRef.append(wrap);

    this.shadowRootRef.getElementById('btn-contact')?.addEventListener('click', () => this.navigate('contato'));
    this.shadowRootRef.getElementById('btn-projects')?.addEventListener('click', () => this.navigate('projetos'));
    this.shadowRootRef.getElementById('hero-wa')?.addEventListener('click', (event) => {
      event.preventDefault();
      this.openWhatsapp();
    });

    const counterElements = Array.from(this.shadowRootRef.querySelectorAll<HTMLElement>('[data-counter]'));
    this.cleanupCounter = setupCounters(
      counterElements.map((element) => ({
        element,
        value: Number(element.dataset.counter ?? 0),
        suffix: element.dataset.suffix ?? '',
      })),
      { reducedMotion: this.reduced },
    );

    this.cleanupReveal = setupReveal(this.shadowRootRef, { reducedMotion: this.reduced });

    this.removeEventListener('mousemove', this.onMouseMove);
    this.removeEventListener('mouseleave', this.onMouseLeave);
    this.addEventListener('mousemove', this.onMouseMove);
    this.addEventListener('mouseleave', this.onMouseLeave);
  }
}

customElements.define('section-hero', SectionHero);
