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

/* ── Marquee wrapper ── */
.marquee-wrap {
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
  position: relative;
}

/* Fade masks on edges */
.marquee-wrap::before,
.marquee-wrap::after {
  content: '';
  position: absolute;
  top: 0; bottom: 0;
  width: 8rem;
  z-index: 2;
  pointer-events: none;
}
.marquee-wrap::before {
  left: 0;
  background: linear-gradient(to right, var(--bg-0) 0%, transparent 100%);
}
.marquee-wrap::after {
  right: 0;
  background: linear-gradient(to left, var(--bg-0) 0%, transparent 100%);
}

/* Single row */
.marquee-row {
  overflow-x: hidden;
  overflow-y: visible;
  padding-block: 6px;
}

.track {
  width: max-content;
  display: flex;
  gap: 0.8rem;
  padding-inline: 0.4rem;
}

.track.forward  { animation: scroll-fwd 32s linear infinite; }
.track.backward { animation: scroll-bwd 28s linear infinite; }

.marquee-row:hover .track { animation-play-state: paused; }

@keyframes scroll-fwd {
  from { transform: translateX(0); }
  to   { transform: translateX(-50%); }
}
@keyframes scroll-bwd {
  from { transform: translateX(-50%); }
  to   { transform: translateX(0); }
}

/* ── Skill pill ── */
.pill {
  display: inline-flex;
  align-items: center;
  gap: 0.7rem;
  padding: 0.62rem 1rem 0.62rem 0.72rem;
  border-radius: 999px;
  border: 1px solid rgba(255,255,255,0.09);
  background: rgba(14,21,48,0.65);
  backdrop-filter: blur(10px);
  white-space: nowrap;
  cursor: default;
  transition: border-color 280ms, background 280ms, transform 280ms var(--ease-out), box-shadow 280ms;
}
.pill:hover {
  border-color: rgba(59,130,246,0.38);
  background: rgba(59,130,246,0.08);
  transform: scale(1.04) translateY(-2px);
  box-shadow: 0 8px 28px rgba(0,0,0,0.3), 0 0 0 1px rgba(59,130,246,0.15);
}
.pill-icon-wrap {
  width: 34px;
  height: 34px;
  border-radius: 50%;
  background: rgba(255,255,255,0.06);
  border: 1px solid rgba(255,255,255,0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  overflow: hidden;
  transition: transform 280ms var(--ease-out);
}
.pill:hover .pill-icon-wrap { transform: rotate(-8deg) scale(1.1); }
.pill-icon-wrap img {
  width: 20px;
  height: 20px;
  object-fit: contain;
}
.pill-text { display: flex; flex-direction: column; gap: 0.06rem; }
.pill-name {
  font-size: 0.88rem;
  font-weight: 600;
  color: var(--text);
  line-height: 1;
}
.pill-desc {
  font-size: 0.71rem;
  color: var(--muted);
  opacity: 0.8;
}

/* ── Grid fallback (reduced motion) ── */
.grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0,1fr));
  gap: 0.8rem;
}
.skill-card {
  display: flex;
  align-items: center;
  gap: 0.72rem;
  padding: 0.9rem 1rem;
  border: 1px solid var(--border);
  border-radius: var(--r-lg);
  background: var(--card);
}
.skill-card img { width: 2rem; height: 2rem; object-fit: contain; }
.skill-card h3 { margin: 0; font-size: 0.95rem; }
.skill-card p  { margin: 0.15rem 0 0; font-size: 0.8rem; color: var(--muted); }

@media (prefers-reduced-motion: reduce) {
  .track { animation: none !important; }
}
@media (max-width: 760px) {
  .grid { grid-template-columns: 1fr 1fr; }
  .marquee-wrap::before, .marquee-wrap::after { width: 3rem; }
}
`;

export class SectionSkills extends HTMLElement {
  private readonly shadowRootRef = this.attachShadow({ mode: 'open' });
  private data: SiteData | null = null;
  private cleanupReveal: (() => void) | null = null;

  set siteData(value: SiteData) { this.data = value; this.render(); }
  connectedCallback(): void { this.render(); }
  disconnectedCallback(): void { this.cleanupReveal?.(); }

  private pill(name: string, iconUrl: string, description: string): string {
    return `
      <div class="pill">
        <div class="pill-icon-wrap">
          <img src="${iconUrl}" alt="${name}" loading="lazy" />
        </div>
        <div class="pill-text">
          <span class="pill-name">${name}</span>
          <span class="pill-desc">${description}</span>
        </div>
      </div>
    `;
  }

  private render(): void {
    if (!this.data) return;

    this.cleanupReveal?.();
    const reduced = prefersReducedMotion();
    const skills = this.data.skills;

    /* Split into two rows for the double marquee */
    const half = Math.ceil(skills.length / 2);
    const row1 = skills.slice(0, half);
    const row2 = skills.slice(half);

    this.shadowRootRef.innerHTML = '';
    applyScopedStyles(this.shadowRootRef, css);

    const section = document.createElement('section');
    section.className = 'section';

    const marqueeBody = `
      <div class="marquee-wrap" data-reveal>
        <div class="marquee-row">
          <div class="track forward">
            ${[...row1, ...row1].map((s) => this.pill(s.name, s.iconUrl, s.description)).join('')}
          </div>
        </div>
        <div class="marquee-row">
          <div class="track backward">
            ${[...row2, ...row2].map((s) => this.pill(s.name, s.iconUrl, s.description)).join('')}
          </div>
        </div>
      </div>`;

    const gridBody = `
      <div class="grid" data-reveal>
        ${skills.map((s) => `
          <div class="skill-card">
            <img src="${s.iconUrl}" alt="${s.name}" loading="lazy" />
            <div><h3>${s.name}</h3><p>${s.description}</p></div>
          </div>`).join('')}
      </div>`;

    section.innerHTML = `
      <section-title
        eyebrow="Skills"
        title="Stack técnica em movimento"
        highlight="movimento"
        subtitle="Ferramentas e tecnologias que uso para construir soluções confiáveis de ponta a ponta."
        data-reveal
      ></section-title>
      ${reduced ? gridBody : marqueeBody}
    `;

    this.shadowRootRef.append(section);
    this.cleanupReveal = setupReveal(this.shadowRootRef, { reducedMotion: reduced });
  }
}

customElements.define('section-skills', SectionSkills);
