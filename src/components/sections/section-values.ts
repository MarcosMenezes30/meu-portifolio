import type { SiteData } from '../../types/siteData';
import { prefersReducedMotion } from '../../utils/motion';
import { setupReveal } from '../../utils/reveal';
import { applyScopedStyles } from '../../utils/style';

/* Accent palette per icon */
const accentMap: Record<string, { color: string; rgb: string; grad: string }> = {
  book:   { color: '#3b82f6', rgb: '59,130,246',  grad: 'linear-gradient(135deg,#1d4ed8,#3b82f6)' },
  shield: { color: '#7c3aed', rgb: '124,58,237',  grad: 'linear-gradient(135deg,#5b21b6,#7c3aed)' },
  spark:  { color: '#f59e0b', rgb: '245,158,11',  grad: 'linear-gradient(135deg,#b45309,#f59e0b)' },
  users:  { color: '#22c55e', rgb: '34,197,94',   grad: 'linear-gradient(135deg,#15803d,#22c55e)' },
  bolt:   { color: '#f97316', rgb: '249,115,22',  grad: 'linear-gradient(135deg,#c2410c,#f97316)' },
  target: { color: '#ec4899', rgb: '236,72,153',  grad: 'linear-gradient(135deg,#9d174d,#ec4899)' },
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

/* ── Flip scene ── */
.flip-scene {
  perspective: 900px;
  min-height: 210px;
}

.flip-inner {
  position: relative;
  width: 100%;
  height: 100%;
  min-height: 210px;
  transform-style: preserve-3d;
  transition: transform 560ms cubic-bezier(0.45, 0.05, 0.22, 1.0);
  cursor: pointer;
  border-radius: var(--r-xl);
}

/* Hover OR click flips the card */
.flip-scene:hover .flip-inner,
.flip-scene.flipped .flip-inner {
  transform: rotateY(180deg);
}

/* ── Shared face styles ── */
.face {
  position: absolute;
  inset: 0;
  border-radius: var(--r-xl);
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
  border: 1px solid var(--border);
  background: var(--card);
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);
  overflow: hidden;
}

/* ── Front face ── */
.front {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-end;
  padding: 1.5rem;
  gap: 0.6rem;
}

.front::before {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: inherit;
  background: var(--face-grad, transparent);
  opacity: 0.07;
  pointer-events: none;
}

/* Large watermark icon */
.front-watermark {
  position: absolute;
  top: -12px;
  right: -8px;
  opacity: 0.07;
  transition: opacity 400ms, transform 400ms var(--ease-out);
  transform: scale(1) rotate(-8deg);
  pointer-events: none;
}
.flip-scene:hover .front-watermark {
  opacity: 0.12;
  transform: scale(1.08) rotate(-4deg);
}

.icon-wrap {
  width: 44px;
  height: 44px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--face-bg, rgba(255,255,255,0.08));
  border: 1px solid var(--face-border, rgba(255,255,255,0.12));
  flex-shrink: 0;
  transition: transform 350ms var(--ease-out), box-shadow 350ms;
}
.flip-scene:hover .icon-wrap {
  transform: scale(1.1) translateY(-2px);
  box-shadow: 0 0 20px var(--face-glow, rgba(255,255,255,0.15));
}

.front-title {
  margin: 0;
  font-family: var(--font-display);
  font-size: 1.05rem;
  font-weight: 700;
  color: var(--text);
  line-height: 1.25;
}

.hint {
  font-size: 0.68rem;
  color: var(--muted);
  opacity: 0.6;
  letter-spacing: 0.04em;
  display: flex;
  align-items: center;
  gap: 0.3rem;
}

/* Animated corner glow */
.front::after {
  content: '';
  position: absolute;
  bottom: -30px;
  right: -30px;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background: var(--face-color, transparent);
  opacity: 0;
  filter: blur(28px);
  transition: opacity 400ms var(--ease-out);
  pointer-events: none;
}
.flip-scene:hover .front::after { opacity: 0.18; }

/* ── Back face ── */
.back {
  transform: rotateY(180deg);
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  padding: 1.5rem;
  gap: 0.75rem;
}

.back::before {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: inherit;
  background: var(--face-grad, transparent);
  opacity: 0.10;
  pointer-events: none;
}

.back-title {
  margin: 0;
  font-family: var(--font-display);
  font-size: 0.85rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--face-color, var(--muted));
}

.back-text {
  margin: 0;
  color: var(--text);
  font-size: 0.93rem;
  line-height: 1.7;
}

.back-close {
  font-size: 0.68rem;
  color: var(--muted);
  opacity: 0.6;
  letter-spacing: 0.04em;
  display: flex;
  align-items: center;
  gap: 0.3rem;
  margin-top: auto;
}

/* ── Reduced motion fallback ── */
@media (prefers-reduced-motion: reduce) {
  .flip-inner {
    transition: none;
  }
  .flip-scene:hover .flip-inner,
  .flip-scene.flipped .flip-inner {
    transform: none;
  }
  .back {
    transform: none;
    position: static;
    border-radius: 0 0 var(--r-xl) var(--r-xl);
    border-top: 1px solid var(--border);
  }
  .front {
    border-radius: var(--r-xl) var(--r-xl) 0 0;
    position: static;
  }
  .flip-scene {
    min-height: unset;
    perspective: none;
  }
  .flip-inner {
    min-height: unset;
    transform-style: flat;
    display: flex;
    flex-direction: column;
  }
  .face { position: static; }
}

@media (max-width: 980px) {
  .grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
}
@media (max-width: 640px) {
  .grid { grid-template-columns: 1fr; }
  .flip-scene { min-height: 190px; }
  .flip-inner { min-height: 190px; }
}
`;

export class SectionValues extends HTMLElement {
  private readonly shadowRootRef = this.attachShadow({ mode: 'open' });

  private data: SiteData | null = null;

  private cleanupReveal: (() => void) | null = null;

  set siteData(value: SiteData) {
    this.data = value;
    this.render();
  }

  connectedCallback(): void {
    this.render();
  }

  disconnectedCallback(): void {
    this.cleanupReveal?.();
  }

  private render(): void {
    if (!this.data) return;

    this.cleanupReveal?.();
    this.shadowRootRef.innerHTML = '';
    applyScopedStyles(this.shadowRootRef, css);

    const reduced = prefersReducedMotion();

    const section = document.createElement('section');
    section.className = 'section';

    section.innerHTML = `
      <section-title
        eyebrow="Princípios"
        title="O que me move na engenharia"
        highlight="move na engenharia"
        subtitle="Passe o mouse sobre cada card para descobrir o que move cada princípio."
        data-reveal
      ></section-title>
      <div class="grid">
        ${this.data.values
          .map((item) => {
            const accent = accentMap[item.icon] ?? { color: '#3b82f6', rgb: '59,130,246', grad: 'linear-gradient(135deg,#1d4ed8,#3b82f6)' };
            return `
              <div data-reveal>
                <div class="flip-scene" tabindex="0" role="button" aria-label="${item.title}: ${item.text}">
                  <div class="flip-inner"
                    style="
                      --face-color:${accent.color};
                      --face-glow:rgba(${accent.rgb},0.45);
                      --face-grad:${accent.grad};
                      --face-bg:rgba(${accent.rgb},0.10);
                      --face-border:rgba(${accent.rgb},0.22);
                    "
                  >
                    <!-- Front -->
                    <div class="face front">
                      <icon-svg class="front-watermark" name="${item.icon}" size="90"></icon-svg>
                      <div class="icon-wrap">
                        <icon-svg name="${item.icon}" size="22"></icon-svg>
                      </div>
                      <h3 class="front-title">${item.title}</h3>
                      <span class="hint">◈ Passe o mouse para saber mais</span>
                    </div>
                    <!-- Back -->
                    <div class="face back">
                      <span class="back-title">${item.title}</span>
                      <p class="back-text">${item.text}</p>
                      <span class="back-close">◈ Passe o mouse para voltar</span>
                    </div>
                  </div>
                </div>
              </div>
            `;
          })
          .join('')}
      </div>
    `;

    this.shadowRootRef.append(section);

    // Click / keyboard toggle for mobile (no hover)
    if (!reduced) {
      this.shadowRootRef.querySelectorAll<HTMLElement>('.flip-scene').forEach((scene) => {
        scene.addEventListener('click', () => scene.classList.toggle('flipped'));
        scene.addEventListener('keydown', (e: KeyboardEvent) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            scene.classList.toggle('flipped');
          }
        });
      });
    }

    this.cleanupReveal = setupReveal(this.shadowRootRef, { reducedMotion: reduced });
  }
}

customElements.define('section-values', SectionValues);
