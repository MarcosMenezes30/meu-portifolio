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

    const section = document.createElement('section');
    section.className = 'section';

    section.innerHTML = `
      <section-title
        eyebrow="Princípios"
        title="O que me move na engenharia"
        highlight="move"
        subtitle="Critérios que guiam decisões técnicas, produto e colaboração em cada entrega."
        data-reveal
      ></section-title>
      <div class="grid">
        ${this.data.values
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

customElements.define('section-values', SectionValues);
