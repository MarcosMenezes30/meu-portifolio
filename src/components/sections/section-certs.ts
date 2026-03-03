import type { SiteData } from '../../types/siteData';
import { formatMonthYear } from '../../utils/format';
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
`;

export class SectionCerts extends HTMLElement {
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
        eyebrow="Certificações"
        title="Credenciais verificáveis"
        highlight="verificáveis"
        subtitle="Certificações que validam atuação prática em cloud, plataforma e engenharia de software."
        data-reveal
      ></section-title>
      <div class="grid">
        ${this.data.certifications
          .map(
            (cert) => `
              <div data-reveal>
                <base-card interactive breath>
                  <article class="item">
                    <img class="badge" src="${cert.badgeUrl}" alt="Badge ${cert.title}" loading="lazy" />
                    <h3>${cert.title}</h3>
                    <p>${cert.issuer}</p>
                    <div class="meta">
                      <span>${formatMonthYear(cert.date)}</span>
                      <base-button variant="outline" href="${cert.verifyUrl}" target="_blank" rel="noopener noreferrer" aria-label="Abrir certificação ${cert.title}">
                        Abrir <icon-svg name="link" size="14"></icon-svg>
                      </base-button>
                    </div>
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

customElements.define('section-certs', SectionCerts);
