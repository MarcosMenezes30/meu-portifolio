import type { ProjectItem, SiteData } from '../../types/siteData';
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
.filters {
  display: flex;
  flex-wrap: wrap;
  gap: 0.55rem;
  margin-bottom: 1.1rem;
}
.filter {
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.02);
  color: var(--text);
  padding: 0.46rem 0.82rem;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
}
.filter.active {
  border-color: rgba(59, 130, 246, 0.45);
  background: rgba(59, 130, 246, 0.16);
}
.count {
  font-size: 0.78rem;
  color: var(--muted);
}
.carousel {
  border-radius: var(--r-xl);
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(12, 18, 40, 0.4);
  padding: 1rem;
}
.viewport {
  overflow: hidden;
  border-radius: calc(var(--r-xl) - 6px);
}
.track {
  display: flex;
  transition: transform var(--dur-2) var(--ease-inout), opacity 240ms var(--ease-out);
}
.page {
  flex: 0 0 100%;
  display: grid;
  gap: 0.8rem;
}
.page.cols-3 {
  grid-template-columns: repeat(3, minmax(0, 1fr));
}
.page.cols-2 {
  grid-template-columns: repeat(2, minmax(0, 1fr));
}
.page.cols-1 {
  grid-template-columns: 1fr;
}
article {
  display: grid;
  gap: 0.74rem;
}
figure {
  margin: 0;
  border-radius: 14px;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.1);
}
figure img {
  aspect-ratio: 16 / 9;
  object-fit: cover;
  width: 100%;
}
h3 {
  margin: 0;
  font-size: 1.04rem;
}
p {
  margin: 0;
  color: var(--muted);
}
.tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.42rem;
}
.tag {
  padding: 0.2rem 0.54rem;
  border-radius: 999px;
  border: 1px solid rgba(255, 255, 255, 0.13);
  font-size: 0.75rem;
}
.btn-group {
  display: flex;
  gap: 10px;
  width: 100%;
}
.btn-group base-button {
  flex: 0;
}
.controls {
  margin-top: 0.95rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;
}
.arrows {
  display: flex;
  gap: 0.5rem;
}
.arrow {
  width: 2.4rem;
  height: 2.4rem;
  border-radius: 999px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  background: rgba(255, 255, 255, 0.02);
  color: var(--text);
  display: grid;
  place-items: center;
  cursor: pointer;
}
.arrow:disabled {
  opacity: 0.45;
  cursor: not-allowed;
}
.dots {
  display: inline-flex;
  gap: 0.4rem;
}
.dot {
  width: 0.6rem;
  height: 0.6rem;
  border-radius: 999px;
  border: 0;
  background: rgba(255, 255, 255, 0.28);
  cursor: pointer;
}
.dot.active {
  background: linear-gradient(140deg, var(--accent-1), var(--accent-2));
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

  set siteData(value: SiteData) {
    this.data = value;
    this.render();
  }

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
    const width = window.innerWidth;
    if (width < 720) {
      this.itemsPerView = 1;
    } else if (width < 1060) {
      this.itemsPerView = 2;
    } else {
      this.itemsPerView = 3;
    }
  }

  private get filteredProjects(): ProjectItem[] {
    const items = this.data?.projects.items ?? [];
    if (this.activeCategory === 'all') return items;
    return items.filter((project) => project.categoryIds.includes(this.activeCategory));
  }

  private get pages(): ProjectItem[][] {
    const source = this.filteredProjects;
    const chunks: ProjectItem[][] = [];

    for (let index = 0; index < source.length; index += this.itemsPerView) {
      chunks.push(source.slice(index, index + this.itemsPerView));
    }

    return chunks.length ? chunks : [[]];
  }

  private countByCategory(categoryId: string): number {
    const projects = this.data?.projects.items ?? [];
    if (categoryId === 'all') return projects.length;
    return projects.filter((project) => project.categoryIds.includes(categoryId)).length;
  }

  private setCategory(categoryId: string): void {
    this.activeCategory = categoryId;
    this.currentPage = 0;
    this.render();
  }

  private openRepo(url: string): void {
    window.open(url, '_blank', 'noopener,noreferrer');
    this.dispatchEvent(
      new CustomEvent('openRepo', {
        detail: { url },
        bubbles: true,
        composed: true,
      }),
    );
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
        subtitle="Seleção de implementações com foco em escala, confiabilidade e experiência premium."
        data-reveal
      ></section-title>
      <div class="filters" data-reveal>
        ${this.data.projects.categories
          .map(
            (category) => `
              <button type="button" class="filter ${category.id === this.activeCategory ? 'active' : ''}" data-category="${category.id}">
                <span>${category.label}</span>
                <span class="count">${this.countByCategory(category.id)}</span>
              </button>
            `,
          )
          .join('')}
      </div>
      <div class="carousel" data-reveal>
        <div class="viewport">
          <div class="track" style="transform: translateX(-${this.currentPage * 100}%);">
            ${pages
              .map(
                (page) => `
                  <div class="page cols-${this.itemsPerView}">
                    ${page
                      .map(
                        (project) => `
                          <base-card>
                            <article>
                              <figure>
                                <img src="${project.imageUrl}" alt="Projeto ${project.title}" loading="lazy" />
                              </figure>
                              <h3>${project.title}</h3>
                              <p>${project.description}</p>
                              <div class="tags">
                                ${project.techTags.map((tag) => `<span class="tag">${tag}</span>`).join('')}
                              </div>
                              <div class="btn-group">
                                <base-button variant="outline" data-repo="${project.repoUrl}">Código</base-button>
                                ${project.liveUrl ? `<base-button variant="outline" data-live="${project.liveUrl}">Resultado</base-button>` : ''}
                              </div>
                            </article>
                          </base-card>
                        `,
                      )
                      .join('')}
                  </div>
                `,
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
          <div>${Math.min(this.currentPage + 1, pages.length)} / ${pages.length}</div>
          <div class="dots">
            ${pages
              .map(
                (_, index) =>
                  `<button class="dot ${index === this.currentPage ? 'active' : ''}" aria-label="Ir para página ${index + 1}" data-dot="${index}"></button>`,
              )
              .join('')}
          </div>
        </div>
      </div>
    `;

    this.shadowRootRef.append(section);

    this.shadowRootRef.querySelectorAll<HTMLButtonElement>('.filter').forEach((button) => {
      button.addEventListener('click', () => {
        const category = button.dataset.category;
        if (!category) return;
        this.setCategory(category);
      });
    });

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

    this.shadowRootRef.querySelectorAll<HTMLElement>('base-button[data-repo]').forEach((button) => {
      button.addEventListener('click', () => {
        const url = button.getAttribute('data-repo');
        if (url) this.openRepo(url);
      });
    });

    this.shadowRootRef.querySelectorAll<HTMLElement>('base-button[data-live]').forEach((button) => {
      button.addEventListener('click', () => {
        const url = button.getAttribute('data-live');
        if (url) this.openRepo(url);
      });
    });

    this.cleanupReveal = setupReveal(this.shadowRootRef, { reducedMotion: prefersReducedMotion() });
  }
}

customElements.define('section-projects', SectionProjects);
