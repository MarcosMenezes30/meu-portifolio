import type { SiteData } from '../types/siteData';
import { setupScrollGradient } from '../utils/scrollGradient';
import { setupScrollSpy } from '../utils/scrollSpy';

export class AppRoot extends HTMLElement {
  private data: SiteData | null = null;

  private activeId = 'sobre';

  private cleanupSpy: (() => void) | null = null;

  private cleanupGradient: (() => void) | null = null;

  set siteData(value: SiteData) {
    this.data = value;
    this.render();
  }

  connectedCallback(): void {
    this.cleanupGradient = setupScrollGradient();
    this.render();
    this.addEventListener('navigate', this.onNavigate as EventListener);
  }

  disconnectedCallback(): void {
    this.cleanupSpy?.();
    this.cleanupGradient?.();
    this.removeEventListener('navigate', this.onNavigate as EventListener);
  }

  private onNavigate = (event: Event): void => {
    const custom = event as CustomEvent<{ targetId: string }>;
    const targetId = custom.detail?.targetId;
    if (!targetId) return;

    const target = this.querySelector<HTMLElement>(`#${targetId}`);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  private updateNavbarActive(): void {
    const navbar = this.querySelector('app-navbar') as any;
    if (navbar) {
      navbar.active = this.activeId;
    }
  }

  private render(): void {
    if (!this.data) return;

    this.cleanupSpy?.();
    this.innerHTML = '';

    const navbar = document.createElement('app-navbar') as any;
    navbar.data = this.data.nav;
    navbar.profileData = this.data.profile;
    navbar.active = this.activeId;

    const hero = document.createElement('section-hero') as any;
    hero.id = 'hero';
    hero.className = 'section';
    hero.siteData = this.data;

    const about = document.createElement('section-about') as any;
    about.id = 'sobre';
    about.className = 'section';
    about.siteData = this.data;

    const values = document.createElement('section-values') as any;
    values.id = 'valores';
    values.className = 'section';
    values.siteData = this.data;

    const projects = document.createElement('section-projects') as any;
    projects.id = 'projetos';
    projects.className = 'section';
    projects.siteData = this.data;

    const skills = document.createElement('section-skills') as any;
    skills.id = 'skills';
    skills.className = 'section';
    skills.siteData = this.data;

    const certs = document.createElement('section-certs') as any;
    certs.id = 'certificacoes';
    certs.className = 'section';
    certs.siteData = this.data;

    const courses = document.createElement('section-courses') as any;
    courses.id = 'cursos';
    courses.className = 'section';
    courses.siteData = this.data;

    const contact = document.createElement('section-contact') as any;
    contact.id = 'contato';
    contact.className = 'section';
    contact.siteData = this.data;

    const footer = document.createElement('app-footer') as any;
    footer.data = this.data;

    const toast = document.createElement('toast-stack');
    const top = document.createElement('back-to-top');

    this.append(navbar, hero, about, values, projects, skills, certs, courses, contact, footer, toast, top);

    const spyTargets = [about, values, projects, skills, certs, courses, contact];
    this.cleanupSpy = setupScrollSpy(spyTargets, {
      threshold: 0.55,
      onChange: (id) => {
        this.activeId = id;
        this.updateNavbarActive();
      },
    });
  }
}

customElements.define('app-root', AppRoot);
