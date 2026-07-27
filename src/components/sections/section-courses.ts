import type { SiteData } from '../../types/siteData';
import { formatMonthYear, sumHours } from '../../utils/format';
import { prefersReducedMotion } from '../../utils/motion';
import { setupReveal } from '../../utils/reveal';
import { applyScopedStyles } from '../../utils/style';

/* Platform accent colors */
const platformAccent: Record<string, { color: string; rgb: string }> = {
  'AWS Community': { color: '#f97316', rgb: '249,115,22' },
  'AWS Academy':   { color: '#f59e0b', rgb: '245,158,11' },
  'Cisco Academy': { color: '#1d6fe8', rgb: '29,111,232' },
  'Infinity School':{ color: '#7c3aed', rgb: '124,58,237' },
};

const css = `
:host { display: block; }
.section {
  width: var(--container);
  margin: 0 auto;
}

/* ── Stats row ── */
.stats {
  display: flex;
  gap: 1rem;
  margin-bottom: 1.6rem;
}
.stat {
  display: flex;
  align-items: center;
  gap: 0.85rem;
  padding: 0.9rem 1.3rem;
  border: 1px solid var(--border);
  border-radius: var(--r-lg);
  background: var(--card);
  backdrop-filter: blur(12px);
}
.stat-num {
  font-family: var(--font-display);
  font-size: 2rem;
  font-weight: 800;
  letter-spacing: -0.03em;
  background: var(--accent-grad);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  line-height: 1;
}
.stat-label {
  font-size: 0.78rem;
  color: var(--muted);
  font-weight: 500;
  line-height: 1.3;
}
.stat-divider {
  width: 1px;
  height: 36px;
  background: var(--border);
  margin: 0 0.4rem;
}

/* ── Course list ── */
.list {
  display: grid;
  gap: 0.75rem;
}

/* ── Course card ── */
.course-card {
  position: relative;
  display: grid;
  grid-template-columns: 80px 1fr auto;
  align-items: center;
  gap: 1rem;
  padding: 0.9rem 1.1rem;
  border: 1px solid var(--border);
  border-radius: var(--r-lg);
  background: var(--card);
  backdrop-filter: blur(14px);
  overflow: hidden;
  transition: transform 300ms var(--ease-out), border-color 300ms, box-shadow 300ms;
}
.course-card:hover {
  transform: translateX(5px);
  box-shadow: var(--shadow-1);
}

/* Left accent bar */
.course-card::before {
  content: '';
  position: absolute;
  left: 0; top: 0; bottom: 0;
  width: 3px;
  background: var(--c-accent, var(--accent-1));
  border-radius: 0 3px 3px 0;
  opacity: 0;
  transition: opacity 300ms;
}
.course-card:hover::before { opacity: 1; }

/* Subtle glow on hover */
.course-card::after {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: inherit;
  background: radial-gradient(ellipse at 0% 50%, var(--c-glow, rgba(59,130,246,0.06)) 0%, transparent 70%);
  opacity: 0;
  transition: opacity 300ms;
  pointer-events: none;
}
.course-card:hover::after { opacity: 1; }

.course-img-wrap {
  width: 80px;
  height: 60px;
  border-radius: 10px;
  overflow: hidden;
  border: 1px solid rgba(255,255,255,0.1);
  flex-shrink: 0;
  background: rgba(255,255,255,0.03);
}
.course-img-wrap img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 350ms var(--ease-out);
}
.course-card:hover .course-img-wrap img { transform: scale(1.08); }

.course-info { display: flex; flex-direction: column; gap: 0.2rem; }
.course-title {
  margin: 0;
  font-size: 0.96rem;
  font-weight: 600;
  line-height: 1.3;
  color: var(--text);
}
.course-platform {
  font-size: 0.76rem;
  font-weight: 600;
  color: var(--c-accent, var(--muted));
  letter-spacing: 0.03em;
}
.course-meta {
  font-size: 0.74rem;
  color: var(--muted);
  opacity: 0.75;
}

.cert-link {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  font-size: 0.76rem;
  font-weight: 600;
  padding: 0.4rem 0.85rem;
  border-radius: 999px;
  border: 1px solid rgba(255,255,255,0.14);
  background: rgba(255,255,255,0.04);
  color: var(--muted);
  cursor: pointer;
  white-space: nowrap;
  text-decoration: none;
  transition: background 220ms, border-color 220ms, color 220ms;
  flex-shrink: 0;
}
.cert-link:hover {
  background: rgba(255,255,255,0.09);
  border-color: rgba(255,255,255,0.25);
  color: var(--text);
}

@media (max-width: 720px) {
  .course-card { grid-template-columns: 60px 1fr; }
  .cert-link { display: none; }
  .stats { flex-wrap: wrap; }
}
`;

export class SectionCourses extends HTMLElement {
  private readonly shadowRootRef = this.attachShadow({ mode: 'open' });
  private data: SiteData | null = null;
  private cleanupReveal: (() => void) | null = null;

  set siteData(value: SiteData) { this.data = value; this.render(); }
  connectedCallback(): void { this.render(); }
  disconnectedCallback(): void { this.cleanupReveal?.(); }

  private render(): void {
    if (!this.data) return;

    this.cleanupReveal?.();
    const { courses } = this.data;
    const totalCourses = courses.length;
    const totalHours = sumHours(courses.map((c) => c.hours));

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

      <div class="stats" data-reveal>
        <div class="stat">
          <span class="stat-num">${totalCourses}</span>
          <span class="stat-label">Cursos<br>Concluídos</span>
        </div>
        <div class="stat-divider"></div>
        <div class="stat">
          <span class="stat-num">${totalHours}h</span>
          <span class="stat-label">Horas de<br>Estudo</span>
        </div>
      </div>

      <div class="list">
        ${courses
          .map((course) => {
            const accent = platformAccent[course.platform] ?? { color: '#3b82f6', rgb: '59,130,246' };
            return `
              <div data-reveal>
                <div class="course-card"
                  style="--c-accent:${accent.color};--c-glow:rgba(${accent.rgb},0.08);"
                >
                  <div class="course-img-wrap">
                    <img src="${course.coverUrl ?? '/assets/courses/default.svg'}"
                         alt="${course.title}" loading="lazy" />
                  </div>
                  <div class="course-info">
                    <h3 class="course-title">${course.title}</h3>
                    <span class="course-platform">${course.platform}</span>
                    <span class="course-meta">${formatMonthYear(course.date)}${course.hours > 0 ? ` · ${course.hours}h` : ''}</span>
                  </div>
                  ${course.certificateUrl
                    ? `<a class="cert-link" href="${course.certificateUrl}" target="_blank" rel="noopener noreferrer" aria-label="Ver certificado ${course.title}">
                        <icon-svg name="link" size="13"></icon-svg> Certificado
                       </a>`
                    : '<span></span>'}
                </div>
              </div>`;
          })
          .join('')}
      </div>
    `;

    this.shadowRootRef.append(section);
    this.cleanupReveal = setupReveal(this.shadowRootRef, { reducedMotion: prefersReducedMotion() });
  }
}

customElements.define('section-courses', SectionCourses);
