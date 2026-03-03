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
`;

export class SectionAbout extends HTMLElement {
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

    const section = document.createElement('section');
    section.className = 'section';

    section.innerHTML = `
      <section-title
        eyebrow="Sobre mim"
        title="Minha jornada e evolução"
        highlight="jornada"
        subtitle="Da infraestrutura à engenharia de produto: visão ponta a ponta para entregar software com propósito."
        data-reveal
      ></section-title>
      <div class="grid">
        ${this.data.aboutCards
          .map(
            (item) => `
              <div data-reveal>
                <base-card interactive breath>
                  <article class="card">
                    <icon-svg name="${item.icon}" size="22"></icon-svg>
                    <h3>${item.title}</h3>
                    <p>${item.text}</p>
                  </article>
                </base-card>
              </div>
            `,
          )
          .join('')}
      </div>
    `;

    this.shadowRootRef.append(section);
    this.cleanupReveal = setupReveal(this.shadowRootRef, { reducedMotion: prefersReducedMotion() });
  }
}

customElements.define('section-about', SectionAbout);
