import type { SiteData } from '../../types/siteData';
import { prefersReducedMotion } from '../../utils/motion';
import { applyScopedStyles } from '../../utils/style';

const css = `
:host {
  display: block;
}

.section {
  width: var(--container);
  margin: 0 auto;
}

/* ── Timeline wrapper ── */
.timeline {
  position: relative;
  padding: 0.5rem 0 2rem;
}

/* Vertical line */
.timeline::before {
  content: '';
  position: absolute;
  left: 50%;
  top: 0;
  bottom: 0;
  width: 2px;
  transform: translateX(-50%);
  background: linear-gradient(
    180deg,
    transparent 0%,
    var(--accent-1) 8%,
    var(--accent-2) 50%,
    #22c55e 85%,
    transparent 100%
  );
  opacity: 0.35;
}



/* ── Individual step ── */
.step {
  display: flex;
  align-items: flex-start;
  gap: 2.5rem;
  position: relative;
  margin-bottom: 5rem;
  opacity: 0;
  transform: translateY(32px);
  transition: opacity 700ms var(--ease-out), transform 700ms var(--ease-out);
}

.step.visible {
  opacity: 1;
  transform: translateY(0);
}

/* Alternate sides */
.step:nth-child(odd) {
  flex-direction: row;
}
.step:nth-child(even) {
  flex-direction: row-reverse;
}

/* Card side takes half width */
.step-card-wrap {
  flex: 1;
  display: flex;
  justify-content: flex-end;
}
.step:nth-child(even) .step-card-wrap {
  justify-content: flex-start;
}

/* Center column: dot */
.step-center {
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-shrink: 0;
  width: 56px;
  position: relative;
  z-index: 2;
}

.dot {
  width: 52px;
  height: 52px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid var(--border);
  background: var(--bg-1);
  position: relative;
  flex-shrink: 0;
  transition: transform 350ms var(--ease-out), box-shadow 350ms var(--ease-out);
}

.dot::after {
  content: '';
  position: absolute;
  inset: -4px;
  border-radius: 50%;
  opacity: 0;
  transition: opacity 350ms var(--ease-out);
}

.dot:hover {
  transform: scale(1.12);
}

/* Accent colors for dot glow */
.dot[data-accent="blue"] {
  border-color: rgba(59, 130, 246, 0.5);
  box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.12), 0 0 24px rgba(59, 130, 246, 0.2);
}
.dot[data-accent="blue"]:hover {
  box-shadow: 0 0 0 6px rgba(59, 130, 246, 0.2), 0 0 36px rgba(59, 130, 246, 0.35);
}

.dot[data-accent="purple"] {
  border-color: rgba(124, 58, 237, 0.5);
  box-shadow: 0 0 0 4px rgba(124, 58, 237, 0.12), 0 0 24px rgba(124, 58, 237, 0.2);
}
.dot[data-accent="purple"]:hover {
  box-shadow: 0 0 0 6px rgba(124, 58, 237, 0.2), 0 0 36px rgba(124, 58, 237, 0.35);
}

.dot[data-accent="orange"] {
  border-color: rgba(249, 115, 22, 0.5);
  box-shadow: 0 0 0 4px rgba(249, 115, 22, 0.12), 0 0 24px rgba(249, 115, 22, 0.2);
}
.dot[data-accent="orange"]:hover {
  box-shadow: 0 0 0 6px rgba(249, 115, 22, 0.2), 0 0 36px rgba(249, 115, 22, 0.35);
}

.dot[data-accent="green"] {
  border-color: rgba(34, 197, 94, 0.5);
  box-shadow: 0 0 0 4px rgba(34, 197, 94, 0.12), 0 0 24px rgba(34, 197, 94, 0.2);
}
.dot[data-accent="green"]:hover {
  box-shadow: 0 0 0 6px rgba(34, 197, 94, 0.2), 0 0 36px rgba(34, 197, 94, 0.35);
}

/* Icon tint inside dot */
.dot[data-accent="blue"] icon-svg { color: #3b82f6; }
.dot[data-accent="purple"] icon-svg { color: #7c3aed; }
.dot[data-accent="orange"] icon-svg { color: #f97316; }
.dot[data-accent="green"] icon-svg { color: #22c55e; }

/* Spacer below */
.step-spacer { display: none; }

/* ── Card ── */
.card {
  max-width: 480px;
  padding: 1.5rem 1.75rem;
  background: var(--card);
  border: 1px solid var(--border);
  border-radius: var(--r-xl);
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);
  box-shadow: var(--shadow-1);
  position: relative;
  overflow: hidden;
  transition: transform 350ms var(--ease-out), box-shadow 350ms var(--ease-out), border-color 350ms;
}

.card::before {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: inherit;
  opacity: 0;
  transition: opacity 350ms var(--ease-out);
  pointer-events: none;
}

.card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-2);
}

.card[data-accent="blue"]::before {
  background: radial-gradient(ellipse at 0% 0%, rgba(59,130,246,0.10) 0%, transparent 70%);
}
.card[data-accent="blue"]:hover {
  border-color: rgba(59,130,246,0.30);
}
.card[data-accent="blue"]:hover::before { opacity: 1; }

.card[data-accent="purple"]::before {
  background: radial-gradient(ellipse at 0% 0%, rgba(124,58,237,0.10) 0%, transparent 70%);
}
.card[data-accent="purple"]:hover {
  border-color: rgba(124,58,237,0.30);
}
.card[data-accent="purple"]:hover::before { opacity: 1; }

.card[data-accent="orange"]::before {
  background: radial-gradient(ellipse at 0% 0%, rgba(249,115,22,0.10) 0%, transparent 70%);
}
.card[data-accent="orange"]:hover {
  border-color: rgba(249,115,22,0.30);
}
.card[data-accent="orange"]:hover::before { opacity: 1; }

.card[data-accent="green"]::before {
  background: radial-gradient(ellipse at 0% 0%, rgba(34,197,94,0.10) 0%, transparent 70%);
}
.card[data-accent="green"]:hover {
  border-color: rgba(34,197,94,0.30);
}
.card[data-accent="green"]:hover::before { opacity: 1; }

/* Card pointer toward center */
.card::after {
  content: '';
  position: absolute;
  top: 28px;
  width: 0;
  height: 0;
  border-style: solid;
}

.step:nth-child(odd) .card::after {
  right: -11px;
  border-width: 10px 0 10px 11px;
  border-color: transparent transparent transparent var(--border);
}
.step:nth-child(even) .card::after {
  left: -11px;
  border-width: 10px 11px 10px 0;
  border-color: transparent var(--border) transparent transparent;
}

.card-header {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  margin-bottom: 0.75rem;
}

.card-period {
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--muted);
}

.card[data-accent="blue"] .card-period { color: #3b82f6; }
.card[data-accent="purple"] .card-period { color: #7c3aed; }
.card[data-accent="orange"] .card-period { color: #f97316; }
.card[data-accent="green"] .card-period { color: #22c55e; }

.card-title {
  margin: 0;
  font-family: var(--font-display);
  font-size: 1.15rem;
  font-weight: 700;
  color: var(--text);
  line-height: 1.3;
}

.card-desc {
  margin: 0 0 1rem;
  color: var(--muted);
  font-size: 0.93rem;
  line-height: 1.7;
}

.tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
}

.tag {
  font-size: 0.72rem;
  font-weight: 600;
  padding: 0.2rem 0.6rem;
  border-radius: 999px;
  background: rgba(255,255,255,0.05);
  border: 1px solid var(--border);
  color: var(--muted);
  letter-spacing: 0.03em;
}

.card[data-accent="blue"] .tag { border-color: rgba(59,130,246,0.25); color: rgba(147,197,253,0.9); }
.card[data-accent="purple"] .tag { border-color: rgba(124,58,237,0.25); color: rgba(196,181,253,0.9); }
.card[data-accent="orange"] .tag { border-color: rgba(249,115,22,0.25); color: rgba(253,186,116,0.9); }
.card[data-accent="green"] .tag { border-color: rgba(34,197,94,0.25); color: rgba(134,239,172,0.9); }

/* ── Section title spacer ── */
section-title {
  display: block;
  margin-bottom: 4rem;
}

/* ── Mobile: single column ── */
@media (max-width: 768px) {
  .timeline::before {
    left: 28px;
  }

  .step,
  .step:nth-child(odd),
  .step:nth-child(even) {
    flex-direction: row;
    align-items: flex-start;
    gap: 1rem;
    margin-bottom: 3rem;
  }

  .step-card-wrap,
  .step:nth-child(even) .step-card-wrap {
    justify-content: flex-start;
  }

  .step-center {
    width: 56px;
    flex-shrink: 0;
  }

  .card {
    max-width: 100%;
  }

  .card::after,
  .step:nth-child(odd) .card::after,
  .step:nth-child(even) .card::after {
    left: -11px;
    right: auto;
    border-width: 10px 11px 10px 0;
    border-color: transparent var(--border) transparent transparent;
  }
}

@media (prefers-reduced-motion: reduce) {
  .step {
    opacity: 1;
    transform: none;
    transition: none;
  }
}
`;

export class SectionAbout extends HTMLElement {
  private readonly shadowRootRef = this.attachShadow({ mode: 'open' });

  private data: SiteData | null = null;

  private cleanupFn: (() => void) | null = null;

  set siteData(value: SiteData) {
    this.data = value;
    this.render();
  }

  connectedCallback(): void {
    this.render();
  }

  disconnectedCallback(): void {
    this.cleanupFn?.();
  }

  private render(): void {
    if (!this.data) return;

    this.cleanupFn?.();
    this.shadowRootRef.innerHTML = '';
    applyScopedStyles(this.shadowRootRef, css);

    const section = document.createElement('section');
    section.className = 'section';

    section.innerHTML = `
      <section-title
        eyebrow="Sobre mim"
        title="Minha jornada e evolução"
        highlight="jornada e evolução"
        subtitle="Cada etapa moldou quem sou hoje como engenheiro, pesquisador e líder de comunidade."
        data-reveal
      ></section-title>
      <div class="timeline">
        ${this.data.journey
          .map(
            (item, idx) => `
          <div class="step" data-step="${idx}">
            <div class="step-card-wrap">
              <div class="card" data-accent="${item.accent}">
                <div class="card-header">
                  <span class="card-period">${item.period}</span>
                  <h3 class="card-title">${item.title}</h3>
                </div>
                <p class="card-desc">${item.description}</p>
                <div class="tags">
                  ${item.tags.map((t) => `<span class="tag">${t}</span>`).join('')}
                </div>
              </div>
            </div>
            <div class="step-center">
              <div class="dot" data-accent="${item.accent}">
                <icon-svg name="${item.icon}" size="22"></icon-svg>
              </div>
            </div>
            <div class="step-card-wrap" style="visibility:hidden;pointer-events:none" aria-hidden="true"></div>
          </div>
        `,
          )
          .join('')}
      </div>
    `;

    this.shadowRootRef.append(section);
    this.cleanupFn = this.setupTimeline();
  }

  private setupTimeline(): () => void {
    const reduced = prefersReducedMotion();

    const steps = Array.from(
      this.shadowRootRef.querySelectorAll<HTMLElement>('.step'),
    );

    if (reduced) {
      steps.forEach((s) => s.classList.add('visible'));
      return () => undefined;
    }

    // Staggered step reveal
    const stepObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, i) => {
          if (!entry.isIntersecting) return;
          const el = entry.target as HTMLElement;
          const delay = parseInt(el.dataset['step'] ?? '0', 10) * 120;
          setTimeout(() => el.classList.add('visible'), delay);
          stepObserver.unobserve(el);
        });
      },
      { threshold: 0.25, rootMargin: '0px 0px -60px 0px' },
    );

    steps.forEach((s) => stepObserver.observe(s));

    return () => {
      stepObserver.disconnect();
    };
  }
}

customElements.define('section-about', SectionAbout);
