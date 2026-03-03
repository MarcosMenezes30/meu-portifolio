import type { SiteData } from '../../types/siteData';
import { prefersReducedMotion } from '../../utils/motion';
import { setupReveal } from '../../utils/reveal';
import { applyScopedStyles } from '../../utils/style';

const css = `
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
`;

export class SectionSkills extends HTMLElement {
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

  private renderCard(name: string, iconUrl: string, description: string): string {
    return `
      <div class="card">
        <base-card interactive breath>
          <article class="skill-content">
            <img src="${iconUrl}" alt="${name}" loading="lazy" />
            <div>
              <h3>${name}</h3>
              <p>${description}</p>
            </div>
          </article>
        </base-card>
      </div>
    `;
  }

  private render(): void {
    if (!this.data) return;

    this.cleanupReveal?.();

    const reduced = prefersReducedMotion();
    const list = this.data.skills;

    this.shadowRootRef.innerHTML = '';
    applyScopedStyles(this.shadowRootRef, css);

    const section = document.createElement('section');
    section.className = 'section';

    const body = reduced
      ? `
      <div class="grid" data-reveal>
        ${list.map((skill) => this.renderCard(skill.name, skill.iconUrl, skill.description)).join('')}
      </div>`
      : `
      <div class="marquee" data-reveal>
        <div class="track">
          ${[...list, ...list].map((skill) => this.renderCard(skill.name, skill.iconUrl, skill.description)).join('')}
        </div>
      </div>`;

    section.innerHTML = `
      <section-title
        eyebrow="Skills"
        title="Stack técnica em movimento"
        highlight="movimento"
        subtitle="Ferramentas e tecnologias utilizadas para construir soluções confiáveis de ponta a ponta."
        data-reveal
      ></section-title>
      ${body}
    `;

    this.shadowRootRef.append(section);
    this.cleanupReveal = setupReveal(this.shadowRootRef, { reducedMotion: reduced });
  }
}

customElements.define('section-skills', SectionSkills);
