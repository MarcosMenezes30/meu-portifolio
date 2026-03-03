import type { SiteData } from '../../types/siteData';
import { formatMonthYear, sumHours } from '../../utils/format';
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
.metrics {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 0.8rem;
  margin-bottom: 1rem;
}
.metric {
  display: grid;
  gap: 0.2rem;
}
.metric strong {
  font-size: 1.35rem;
}
.list {
  display: grid;
  gap: 0.8rem;
}
.course {
  display: grid;
  grid-template-columns: 110px 1fr auto;
  align-items: center;
  gap: 0.85rem;
}
.cover {
  width: 110px;
  aspect-ratio: 4/3;
  object-fit: cover;
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.12);
}
h3 {
  margin: 0;
  font-size: 1rem;
}
p {
  margin: 0.2rem 0;
  color: var(--muted);
}
.meta {
  font-size: 0.82rem;
}
@media (max-width: 840px) {
  .course {
    grid-template-columns: 1fr;
  }
  .cover {
    width: 100%;
  }
  .metrics {
    grid-template-columns: 1fr;
  }
}
`;

export class SectionCourses extends HTMLElement {
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

    const totalCourses = this.data.courses.length;
    const totalHours = sumHours(this.data.courses.map((course) => course.hours));

    this.shadowRootRef.innerHTML = '';
    applyScopedStyles(this.shadowRootRef, css);

    const section = document.createElement('section');
    section.className = 'section';

    section.innerHTML = `
      <section-title
        eyebrow="Cursos"
        title="Formação contínua e atualização"
        highlight="contínua"
        subtitle="Registros reais de estudos para evolução técnica constante e aplicação prática no dia a dia."
        data-reveal
      ></section-title>
      <div class="metrics">
        <div data-reveal><base-card><div class="metric"><strong>${totalCourses}</strong><span>Total de cursos</span></div></base-card></div>
        <div data-reveal><base-card><div class="metric"><strong>${totalHours}h</strong><span>Total de horas</span></div></base-card></div>
      </div>
      <div class="list">
        ${this.data.courses
          .map(
            (course) => `
              <div data-reveal>
                <base-card>
                  <article class="course">
                    <img class="cover" src="${course.coverUrl ?? '/assets/courses/default.svg'}" alt="Capa do curso ${course.title}" loading="lazy" />
                    <div>
                      <h3>${course.title}</h3>
                      <p>${course.platform}</p>
                      <span class="meta">${formatMonthYear(course.date)} • ${course.hours} horas</span>
                    </div>
                    ${course.certificateUrl ? `<base-button variant="outline" href="${course.certificateUrl}" target="_blank" rel="noopener noreferrer">Certificado</base-button>` : '<span></span>'}
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

customElements.define('section-courses', SectionCourses);
