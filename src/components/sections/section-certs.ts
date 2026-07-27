import type { SiteData } from '../../types/siteData';
import { prefersReducedMotion } from '../../utils/motion';
import { setupReveal } from '../../utils/reveal';
import { applyScopedStyles } from '../../utils/style';

/* Accent colors per issuer */
const certAccents: Record<string, { color: string; accent2: string; rgb: string; textLight: string }> = {
  GitHub: {
    color: '#22c55e',
    accent2: '#10b981',
    rgb: '34, 197, 94',
    textLight: '#4ade80',
  },
  AWS: {
    color: '#f59e0b',
    accent2: '#f97316',
    rgb: '245, 158, 11',
    textLight: '#fbbf24',
  },
  'AWS Academy': {
    color: '#f59e0b',
    accent2: '#f97316',
    rgb: '245, 158, 11',
    textLight: '#fbbf24',
  },
};

const css = `
:host { display: block; }
.section {
  width: var(--container);
  margin: 0 auto;
}

/* ── Grid ── */
.grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 1.1rem;
}

/* ── Card ── */
.cert-card {
  position: relative;
  overflow: hidden;
  border: 1px solid rgba(255,255,255,0.09);
  border-radius: var(--r-xl);
  background: var(--card);
  backdrop-filter: blur(16px);
  padding: 2rem 1.75rem 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1.1rem;
  cursor: pointer;
  transition: transform 350ms var(--ease-out), border-color 350ms, box-shadow 350ms;
}

.cert-card:hover {
  transform: translateY(-5px);
  border-color: rgba(var(--c-rgb), 0.35);
  box-shadow: 0 28px 60px rgba(0,0,0,0.4), 0 0 0 1px rgba(var(--c-rgb), 0.12);
}

/* Ambient glow */
.cert-card::before {
  content: '';
  position: absolute;
  bottom: -40px; right: -40px;
  width: 180px; height: 180px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(var(--c-rgb), 0.12) 0%, transparent 70%);
  filter: blur(20px);
  opacity: 0;
  transition: opacity 400ms;
  pointer-events: none;
}
.cert-card:hover::before { opacity: 1; }

/* Top shine line */
.cert-card::after {
  content: '';
  position: absolute;
  top: 0; left: 0; right: 0;
  height: 2px;
  background: linear-gradient(90deg, transparent, var(--c-color), var(--c-accent2), transparent);
  opacity: 0;
  transition: opacity 350ms;
}
.cert-card:hover::after { opacity: 1; }

/* ── Badge area ── */
.badge-wrap {
  position: relative;
  width: 220px;
  height: 220px;
  flex-shrink: 0;
  margin: 0 auto;
}

/* Glow behind badge */
.badge-glow {
  position: absolute;
  inset: 4px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(var(--c-rgb), 0.18) 0%, transparent 70%);
  opacity: 0;
  transition: opacity 350ms;
}
.cert-card:hover .badge-glow { opacity: 1; }

.badge-img {
  position: relative;
  width: 220px;
  height: 220px;
  object-fit: contain;
  transition: transform 350ms var(--ease-out);
  z-index: 1;
}
.cert-card:hover .badge-img { transform: scale(1.07) rotate(-2deg); }

/* ── Body ── */
.cert-body { display: flex; flex-direction: column; gap: 0.4rem; flex: 1; }

.cert-issuer {
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--c-color);
  opacity: 0.85;
}

.cert-title {
  margin: 0;
  font-family: var(--font-display);
  font-size: 1.05rem;
  font-weight: 700;
  line-height: 1.3;
  color: var(--text);
}

/* ── Status chip ── */
.status {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  padding: 0.28rem 0.7rem;
  border-radius: 999px;
  background: rgba(var(--c-rgb), 0.1);
  border: 1px solid rgba(var(--c-rgb), 0.25);
  width: fit-content;
  margin-top: 0.2rem;
}
.status-dot {
  width: 6px; height: 6px;
  border-radius: 50%;
  background: var(--c-color);
  animation: blink 2s ease-in-out infinite;
}
@keyframes blink {
  0%, 100% { opacity: 1; }
  50%       { opacity: 0.3; }
}
.status-text {
  font-size: 0.7rem;
  font-weight: 600;
  color: var(--c-text-light);
  letter-spacing: 0.04em;
}

/* ── CTA link ── */
.cert-link {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.52rem 1.1rem;
  border-radius: 999px;
  border: 1px solid rgba(var(--c-rgb), 0.3);
  background: rgba(var(--c-rgb), 0.08);
  color: var(--c-text-light);
  font-size: 0.8rem;
  font-weight: 600;
  cursor: pointer;
  text-decoration: none;
  width: fit-content;
  transition: background 220ms, border-color 220ms, transform 220ms;
}
.cert-link:hover {
  background: rgba(var(--c-rgb), 0.16);
  border-color: rgba(var(--c-rgb), 0.5);
  transform: scale(1.03);
}

/* ── Stars decoration ── */
.stars {
  position: absolute;
  top: 1rem; right: 1rem;
  display: flex;
  gap: 0.2rem;
  opacity: 0.2;
  transition: opacity 350ms;
}
.cert-card:hover .stars { opacity: 0.55; }
.star {
  width: 4px; height: 4px;
  border-radius: 50%;
  background: var(--c-color);
}
.star:nth-child(2) { width: 6px; height: 6px; opacity: 0.7; }
.star:nth-child(3) { width: 3px; height: 3px; opacity: 0.5; }

@media (max-width: 980px) {
  .grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
}
@media (max-width: 640px) {
  .grid { grid-template-columns: 1fr; }
}
@media (prefers-reduced-motion: reduce) {
  .cert-card { transition: none; }
  .status-dot { animation: none; }
}
`;

export class SectionCerts extends HTMLElement {
  private readonly shadowRootRef = this.attachShadow({ mode: 'open' });
  private data: SiteData | null = null;
  private cleanupReveal: (() => void) | null = null;

  set siteData(value: SiteData) { this.data = value; this.render(); }
  connectedCallback(): void { this.render(); }
  disconnectedCallback(): void { this.cleanupReveal?.(); }

  private openUrl(url: string): void {
    window.open(url, '_blank', 'noopener,noreferrer');
  }

  private render(): void {
    if (!this.data) return;

    this.cleanupReveal?.();
    this.shadowRootRef.innerHTML = '';
    applyScopedStyles(this.shadowRootRef, css);

    const section = document.createElement('section');
    section.className = 'section';

    section.innerHTML = `
      <section-title
        eyebrow="Certificações"
        title="Futuras certificações"
        highlight="Futuras"
        subtitle="Certificações que estou estudando para conquistar em 2026."
        data-reveal
      ></section-title>
      <div class="grid">
        ${this.data.certifications
          .map((cert) => {
            const accent = certAccents[cert.issuer] ?? certAccents['AWS'];
            const style = `--c-color:${accent.color};--c-accent2:${accent.accent2};--c-rgb:${accent.rgb};--c-text-light:${accent.textLight};`;
            return `
              <div data-reveal>
                <div class="cert-card" style="${style}" data-url="${cert.verifyUrl}">
                  <!-- Decoration -->
                  <div class="stars">
                    <span class="star"></span>
                    <span class="star"></span>
                    <span class="star"></span>
                  </div>

                  <!-- Badge -->
                  <div class="badge-wrap">
                    <div class="badge-glow"></div>
                    <img class="badge-img" src="${cert.badgeUrl}" alt="Badge ${cert.title}" loading="lazy" />
                  </div>

                  <!-- Body -->
                  <div class="cert-body">
                    <span class="cert-issuer">${cert.issuer}</span>
                    <h3 class="cert-title">${cert.title}</h3>
                    <div class="status">
                      <span class="status-dot"></span>
                      <span class="status-text">Estudando · Meta 2026</span>
                    </div>
                  </div>

                  <!-- CTA -->
                  <a class="cert-link" data-cert-url="${cert.verifyUrl}" aria-label="Ver certificação ${cert.title}">
                    <icon-svg name="link" size="13"></icon-svg>
                    Ver certificação
                  </a>
                </div>
              </div>`;
          })
          .join('')}
      </div>
    `;

    this.shadowRootRef.append(section);

    this.shadowRootRef.querySelectorAll<HTMLElement>('[data-cert-url]').forEach((el) => {
      el.addEventListener('click', (e) => {
        e.stopPropagation();
        const url = el.dataset.certUrl;
        if (url) this.openUrl(url);
      });
    });

    this.shadowRootRef.querySelectorAll<HTMLElement>('.cert-card').forEach((card) => {
      card.addEventListener('click', () => {
        const url = card.dataset.url;
        if (url) this.openUrl(url);
      });
    });

    this.cleanupReveal = setupReveal(this.shadowRootRef, { reducedMotion: prefersReducedMotion() });
  }
}

customElements.define('section-certs', SectionCerts);
