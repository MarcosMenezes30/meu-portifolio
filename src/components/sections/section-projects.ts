import type { ProjectItem, SiteData } from '../../types/siteData';
import { prefersReducedMotion } from '../../utils/motion';
import { setupReveal } from '../../utils/reveal';
import { applyScopedStyles } from '../../utils/style';

const css = `
:host { display: block; }

.section {
  width: var(--container);
  margin: 0 auto;
}

/* ── Filters ── */
.filters {
  display: flex;
  flex-wrap: wrap;
  gap: 0.55rem;
  margin-bottom: 1.4rem;
}
.filter {
  border: 1px solid rgba(255,255,255,0.13);
  border-radius: 999px;
  background: rgba(255,255,255,0.02);
  color: var(--text);
  padding: 0.44rem 0.9rem;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.85rem;
  font-weight: 500;
  transition: border-color 220ms, background 220ms, color 220ms;
}
.filter:hover {
  border-color: rgba(255,255,255,0.25);
  background: rgba(255,255,255,0.05);
}
.filter.active {
  border-color: rgba(59,130,246,0.55);
  background: rgba(59,130,246,0.14);
  color: #93c5fd;
}
.count {
  font-size: 0.74rem;
  opacity: 0.6;
}

/* ── Carousel shell ── */
.carousel {
  border-radius: var(--r-xl);
  border: 1px solid rgba(255,255,255,0.08);
  background: rgba(10,14,32,0.5);
  padding: 1rem;
}
.viewport { overflow: hidden; border-radius: calc(var(--r-xl) - 6px); }
.track {
  display: flex;
  transition: transform var(--dur-2) var(--ease-inout);
}
.page {
  flex: 0 0 100%;
  display: grid;
  gap: 1.1rem;
}
.page.cols-3 { grid-template-columns: repeat(3,minmax(0,1fr)); }
.page.cols-2 { grid-template-columns: repeat(2,minmax(0,1fr)); }
.page.cols-1 { grid-template-columns: 1fr; }

/* ── Project card ── */
.proj-card {
  position: relative;
  border-radius: var(--r-lg);
  overflow: hidden;
  border: 1px solid rgba(255,255,255,0.09);
  background: var(--bg-1);
  cursor: pointer;
  aspect-ratio: 16 / 10;
  transition: border-color 350ms, box-shadow 350ms, transform 350ms var(--ease-out);
}
.proj-card:hover {
  border-color: rgba(59,130,246,0.38);
  box-shadow: 0 24px 60px rgba(0,0,0,0.5), 0 0 0 1px rgba(59,130,246,0.15);
  transform: translateY(-4px);
}

/* Shine line at top on hover */
.proj-card::after {
  content: '';
  position: absolute;
  top: 0; left: 0; right: 0;
  height: 2px;
  background: linear-gradient(90deg, transparent, var(--accent-1), var(--accent-2), transparent);
  opacity: 0;
  transition: opacity 350ms;
  z-index: 5;
}
.proj-card:hover::after { opacity: 1; }

/* Landscape Image */
.proj-img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: top center;
  transition: transform 600ms var(--ease-out), filter 400ms;
  will-change: transform;
}
.proj-card:hover .proj-img {
  transform: scale(1.06);
  filter: brightness(0.35);
}

/* Base gradient at bottom */
.proj-base-grad {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to top,
    rgba(5,8,22,0.95) 0%,
    rgba(5,8,22,0.55) 45%,
    transparent 100%
  );
  pointer-events: none;
  transition: opacity 300ms;
  z-index: 1;
}
.proj-card:hover .proj-base-grad { opacity: 0; }

/* Category badge top-right */
.proj-badge {
  position: absolute;
  top: 0.85rem;
  right: 0.85rem;
  font-size: 0.68rem;
  font-weight: 700;
  letter-spacing: 0.07em;
  text-transform: uppercase;
  padding: 0.28rem 0.65rem;
  border-radius: 999px;
  background: rgba(10,14,36,0.85);
  border: 1px solid rgba(255,255,255,0.18);
  backdrop-filter: blur(8px);
  color: #93c5fd;
  z-index: 3;
}

/* Title visible at rest */
.proj-static-info {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 1.25rem 1.1rem;
  z-index: 2;
  transition: opacity 250ms var(--ease-out), transform 250ms var(--ease-out);
}
.proj-static-title {
  margin: 0;
  font-family: var(--font-display);
  font-size: 1.05rem;
  font-weight: 700;
  line-height: 1.3;
  color: var(--text);
  text-shadow: 0 2px 8px rgba(0,0,0,0.8);
}
.proj-card:hover .proj-static-info {
  opacity: 0;
  transform: translateY(8px);
  pointer-events: none;
}

/* Hover reveal overlay */
.proj-overlay {
  position: absolute;
  inset: 0;
  z-index: 4;
  background: rgba(6,10,26,0.92);
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);
  padding: 1.2rem 1.15rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 0.6rem;
  opacity: 0;
  transform: translateY(12px);
  transition: opacity 320ms var(--ease-out), transform 320ms var(--ease-out);
  pointer-events: none;
}
.proj-card:hover .proj-overlay {
  opacity: 1;
  transform: translateY(0);
  pointer-events: auto;
}

.proj-title {
  margin: 0;
  font-family: var(--font-display);
  font-size: 1.05rem;
  font-weight: 700;
  line-height: 1.3;
  color: #93c5fd;
}

.proj-desc {
  margin: 0;
  font-size: 0.82rem;
  color: rgba(200,212,240,0.9);
  line-height: 1.55;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.proj-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.35rem;
}
.proj-tag {
  font-size: 0.68rem;
  font-weight: 600;
  padding: 0.18rem 0.55rem;
  border-radius: 999px;
  background: rgba(59,130,246,0.12);
  border: 1px solid rgba(59,130,246,0.25);
  color: rgba(147,197,253,0.95);
  letter-spacing: 0.02em;
}

.proj-actions {
  display: flex;
  gap: 0.5rem;
}
.proj-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  font-size: 0.78rem;
  font-weight: 600;
  padding: 0.44rem 0.95rem;
  border-radius: 999px;
  border: 1px solid rgba(255,255,255,0.18);
  background: rgba(255,255,255,0.06);
  color: var(--text);
  cursor: pointer;
  transition: background 200ms, border-color 200ms, transform 200ms;
  letter-spacing: 0.02em;
}
.proj-btn:hover {
  background: rgba(255,255,255,0.12);
  border-color: rgba(255,255,255,0.3);
  transform: scale(1.03);
}
.proj-btn.primary {
  background: rgba(59,130,246,0.22);
  border-color: rgba(59,130,246,0.45);
  color: #93c5fd;
}
.proj-btn.primary:hover {
  background: rgba(59,130,246,0.35);
  border-color: rgba(59,130,246,0.65);
}

/* ── Controls ── */
.controls {
  margin-top: 0.95rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;
}
.arrows { display: flex; gap: 0.5rem; }
.arrow {
  width: 2.4rem; height: 2.4rem;
  border-radius: 999px;
  border: 1px solid rgba(255,255,255,0.18);
  background: rgba(255,255,255,0.03);
  color: var(--text);
  display: grid;
  place-items: center;
  cursor: pointer;
  transition: background 200ms, border-color 200ms;
}
.arrow:hover { background: rgba(255,255,255,0.08); border-color: rgba(255,255,255,0.3); }
.arrow:disabled { opacity: 0.35; cursor: not-allowed; }
.page-label { font-size: 0.85rem; color: var(--muted); }
.dots { display: inline-flex; gap: 0.4rem; }
.dot {
  width: 0.55rem; height: 0.55rem;
  border-radius: 999px; border: 0;
  background: rgba(255,255,255,0.22);
  cursor: pointer;
  transition: background 250ms, transform 250ms;
}
.dot.active {
  background: linear-gradient(140deg, var(--accent-1), var(--accent-2));
  transform: scale(1.3);
}

/* ── Reduced motion ── */
@media (prefers-reduced-motion: reduce) {
  .proj-card { transition: none; }
  .proj-img { transition: none; }
  .proj-overlay { opacity: 1; transform: none; }
}
`;

export class SectionProjects extends HTMLElement {
  private readonly shadowRootRef = this.attachShadow({ mode: 'open' });
  private data: SiteData | null = null;
  private activeCategory = 'all';
  private currentPage = 0;
  private itemsPerView = 3;
  private cleanupReveal: (() => void) | null = null;
  private resizeRaf = 0;

  set siteData(value: SiteData) { this.data = value; this.render(); }

  connectedCallback(): void {
    window.addEventListener('resize', this.onResize, { passive: true });
    this.updateItemsPerView();
    this.render();
  }

  disconnectedCallback(): void {
    window.removeEventListener('resize', this.onResize);
    this.cleanupReveal?.();
    cancelAnimationFrame(this.resizeRaf);
  }

  private onResize = (): void => {
    if (this.resizeRaf) return;
    this.resizeRaf = requestAnimationFrame(() => {
      this.updateItemsPerView();
      this.currentPage = 0;
      this.render();
      this.resizeRaf = 0;
    });
  };

  private updateItemsPerView(): void {
    const w = window.innerWidth;
    this.itemsPerView = w < 720 ? 1 : w < 1060 ? 2 : 3;
  }

  private get filteredProjects(): ProjectItem[] {
    const items = this.data?.projects.items ?? [];
    if (this.activeCategory === 'all') return items;
    return items.filter((p) => p.categoryIds.includes(this.activeCategory));
  }

  private get pages(): ProjectItem[][] {
    const src = this.filteredProjects;
    const chunks: ProjectItem[][] = [];
    for (let i = 0; i < src.length; i += this.itemsPerView) {
      chunks.push(src.slice(i, i + this.itemsPerView));
    }
    return chunks.length ? chunks : [[]];
  }

  private countByCategory(id: string): number {
    const items = this.data?.projects.items ?? [];
    return id === 'all' ? items.length : items.filter((p) => p.categoryIds.includes(id)).length;
  }

  private setCategory(id: string): void {
    this.activeCategory = id;
    this.currentPage = 0;
    this.render();
  }

  private openUrl(url: string): void {
    window.open(url, '_blank', 'noopener,noreferrer');
  }

  private cardHTML(project: ProjectItem): string {
    const catObj = this.data?.projects.categories.find(
      (c) => c.id !== 'all' && project.categoryIds.includes(c.id),
    );
    const badgeText = catObj ? catObj.label : 'Concluído';

    return `
      <div class="proj-card" data-proj-id="${project.id}">
        <img class="proj-img" src="${project.imageUrl}" alt="${project.title}" loading="lazy" />
        <div class="proj-base-grad"></div>
        <span class="proj-badge">${badgeText}</span>
        
        <!-- Rest state title -->
        <div class="proj-static-info">
          <h3 class="proj-static-title">${project.title}</h3>
        </div>

        <!-- Hover reveal overlay -->
        <div class="proj-overlay">
          <h3 class="proj-title">${project.title}</h3>
          <p class="proj-desc">${project.description}</p>
          <div class="proj-tags">
            ${project.techTags.map((t) => `<span class="proj-tag">${t}</span>`).join('')}
          </div>
          <div class="proj-actions">
            <button class="proj-btn" data-repo="${project.repoUrl}">
              <icon-svg name="codeBrackets" size="13"></icon-svg> Código
            </button>
            ${project.liveUrl
              ? `<button class="proj-btn primary" data-live="${project.liveUrl}">
                  <icon-svg name="rocket" size="13"></icon-svg> Resultado
                 </button>`
              : ''}
          </div>
        </div>
      </div>
    `;
  }

  private render(): void {
    if (!this.data) return;

    this.cleanupReveal?.();
    const pages = this.pages;
    this.currentPage = Math.min(this.currentPage, Math.max(pages.length - 1, 0));

    this.shadowRootRef.innerHTML = '';
    applyScopedStyles(this.shadowRootRef, css);

    const section = document.createElement('section');
    section.className = 'section';

    section.innerHTML = `
      <section-title
        eyebrow="Projetos"
        title="Projetos em destaque"
        highlight="Projetos"
        subtitle="Passe o mouse sobre cada card para ver a descrição, tecnologias e acessar o código."
        data-reveal
      ></section-title>
      <div class="filters" data-reveal>
        ${this.data.projects.categories
          .map(
            (cat) => `
              <button type="button" class="filter ${cat.id === this.activeCategory ? 'active' : ''}" data-category="${cat.id}">
                <span>${cat.label}</span>
                <span class="count">${this.countByCategory(cat.id)}</span>
              </button>`,
          )
          .join('')}
      </div>
      <div class="carousel" data-reveal>
        <div class="viewport">
          <div class="track" style="transform:translateX(-${this.currentPage * 100}%)">
            ${pages
              .map(
                (page) => `
                  <div class="page cols-${this.itemsPerView}">
                    ${page.map((p) => this.cardHTML(p)).join('')}
                  </div>`,
              )
              .join('')}
          </div>
        </div>
        <div class="controls">
          <div class="arrows">
            <button class="arrow" id="prev" aria-label="Anterior" ${this.currentPage === 0 ? 'disabled' : ''}>
              <icon-svg name="chevronLeft" size="18"></icon-svg>
            </button>
            <button class="arrow" id="next" aria-label="Próximo" ${this.currentPage >= pages.length - 1 ? 'disabled' : ''}>
              <icon-svg name="chevronRight" size="18"></icon-svg>
            </button>
          </div>
          <span class="page-label">${Math.min(this.currentPage + 1, pages.length)} / ${pages.length}</span>
          <div class="dots">
            ${pages
              .map(
                (_, i) =>
                  `<button class="dot ${i === this.currentPage ? 'active' : ''}" aria-label="Página ${i + 1}" data-dot="${i}"></button>`,
              )
              .join('')}
          </div>
        </div>
      </div>
    `;

    this.shadowRootRef.append(section);

    // Filters
    this.shadowRootRef.querySelectorAll<HTMLButtonElement>('.filter').forEach((btn) => {
      btn.addEventListener('click', () => {
        const cat = btn.dataset.category;
        if (cat) this.setCategory(cat);
      });
    });

    // Carousel nav
    this.shadowRootRef.getElementById('prev')?.addEventListener('click', () => {
      this.currentPage = Math.max(this.currentPage - 1, 0);
      this.render();
    });
    this.shadowRootRef.getElementById('next')?.addEventListener('click', () => {
      this.currentPage = Math.min(this.currentPage + 1, pages.length - 1);
      this.render();
    });
    this.shadowRootRef.querySelectorAll<HTMLButtonElement>('[data-dot]').forEach((dot) => {
      dot.addEventListener('click', () => {
        this.currentPage = Number(dot.dataset.dot ?? 0);
        this.render();
      });
    });

    // Card buttons
    this.shadowRootRef.querySelectorAll<HTMLButtonElement>('[data-repo]').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const url = btn.dataset.repo;
        if (url) this.openUrl(url);
      });
    });
    this.shadowRootRef.querySelectorAll<HTMLButtonElement>('[data-live]').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const url = btn.dataset.live;
        if (url) this.openUrl(url);
      });
    });

    this.cleanupReveal = setupReveal(this.shadowRootRef, { reducedMotion: prefersReducedMotion() });
  }
}

customElements.define('section-projects', SectionProjects);
