import type { SiteData } from '../../types/siteData';
import { applyScopedStyles } from '../../utils/style';

const css = `
:host {
  position: fixed;
  inset: 0 0 auto 0;
  z-index: 100;
  display: block;
}
header {
  width: var(--container);
  margin: 0.8rem auto 0;
  border: 1px solid rgba(255, 255, 255, 0.12);
  background: rgba(8, 13, 30, 0.72);
  backdrop-filter: blur(12px);
  border-radius: 18px;
  box-shadow: 0 10px 32px rgba(0, 0, 0, 0.22);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding: 0.55rem 0.75rem 0.55rem 1rem;
}
.brand {
  font-family: var(--font-display);
  font-size: 0.95rem;
  letter-spacing: 0.02em;
  font-weight: 600;
}
.brand strong {
  background: var(--accent-grad);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}
nav {
  display: flex;
  align-items: center;
  gap: 0.35rem;
}
.nav-link {
  border: 1px solid transparent;
  border-radius: 999px;
  background: transparent;
  color: var(--text);
  font-size: 0.89rem;
  padding: 0.48rem 0.75rem;
  cursor: pointer;
  transition: all var(--dur-1) var(--ease-out);
}
.nav-link.active {
  border-color: rgba(59, 130, 246, 0.45);
  background: rgba(59, 130, 246, 0.17);
}
.actions {
  display: flex;
  align-items: center;
  gap: 0.65rem;
}
.menu-btn {
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  background: rgba(255, 255, 255, 0.03);
  color: var(--text);
  display: none;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}
@media (max-width: 960px) {
  nav {
    display: none;
  }
  .menu-btn {
    display: inline-flex;
  }
}
`;

export class AppNavbar extends HTMLElement {
  private readonly shadowRootRef = this.attachShadow({ mode: 'open' });

  private navData: SiteData['nav'] | null = null;

  private profile: SiteData['profile'] | null = null;

  private activeId = 'sobre';

  private drawerOpen = false;

  set data(value: SiteData['nav']) {
    this.navData = value;
    this.render();
  }

  set profileData(value: SiteData['profile']) {
    this.profile = value;
    this.render();
  }

  set active(value: string) {
    this.activeId = value;
    this.render();
  }

  connectedCallback(): void {
    this.render();
  }

  private onNavigate(targetId: string): void {
    this.dispatchEvent(
      new CustomEvent('navigate', {
        detail: { targetId },
        bubbles: true,
        composed: true,
      }),
    );
  }

  private toggleDrawer(): void {
    this.drawerOpen = !this.drawerOpen;
    this.render();
  }

  private openWhatsapp(): void {
    if (!this.profile?.whatsapp.number) return;
    const message = encodeURIComponent(this.profile.whatsapp.message ?? 'Olá!');
    const url = `https://wa.me/${this.profile.whatsapp.number}?text=${message}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  }

  private render(): void {
    if (!this.navData) return;

    this.shadowRootRef.innerHTML = '';
    applyScopedStyles(this.shadowRootRef, css);

    const header = document.createElement('header');

    const brand = document.createElement('button');
    brand.className = 'brand nav-link';
    brand.innerHTML = `<strong>${this.profile?.name ?? 'Seu Nome'}</strong>`;
    brand.addEventListener('click', () => this.onNavigate('hero'));

    const nav = document.createElement('nav');

    this.navData.items.forEach((item) => {
      const link = document.createElement('button');
      link.className = `nav-link ${item.id === this.activeId ? 'active' : ''}`;
      link.textContent = item.label;
      link.setAttribute('type', 'button');
      link.addEventListener('click', () => this.onNavigate(item.id));
      nav.append(link);
    });

    const actions = document.createElement('div');
    actions.className = 'actions';

    const cta = document.createElement('base-button');
    cta.setAttribute('variant', 'primary');
    cta.setAttribute('aria-label', 'Abrir conversa no WhatsApp');
    cta.textContent = this.navData.cta.label;
    cta.addEventListener('click', () => this.openWhatsapp());

    const menu = document.createElement('button');
    menu.className = 'menu-btn';
    menu.setAttribute('type', 'button');
    menu.setAttribute('aria-label', 'Abrir menu');
    menu.innerHTML = '<icon-svg name="menu" size="20"></icon-svg>';
    menu.addEventListener('click', () => this.toggleDrawer());

    actions.append(cta, menu);
    header.append(brand, nav, actions);

    const drawer = document.createElement('nav-drawer');
    if (this.drawerOpen) drawer.setAttribute('open', '');
    (drawer as any).navItems = this.navData.items;
    (drawer as any).active = this.activeId;

    drawer.addEventListener('drawer-close', () => {
      this.drawerOpen = false;
      this.render();
    });

    drawer.addEventListener('navigate', (event) => {
      const custom = event as CustomEvent<{ targetId: string }>;
      this.drawerOpen = false;
      this.onNavigate(custom.detail.targetId);
      this.render();
    });

    this.shadowRootRef.append(header, drawer);
  }
}

customElements.define('app-navbar', AppNavbar);
