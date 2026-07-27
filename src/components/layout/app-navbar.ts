import type { SiteData } from '../../types/siteData';
import { applyScopedStyles } from '../../utils/style';

const css = `
:host {
  position: fixed;
  inset: 0 0 auto 0;
  z-index: 100;
  display: block;
}

/* ── Outer wrapper: centers & adds top margin ── */
.nav-wrapper {
  width: var(--container);
  margin: 0.9rem auto 0;
  position: relative;
}

/* ── Main pill ── */
header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding: 0.5rem 0.5rem 0.5rem 1.1rem;
  border: 1px solid rgba(255,255,255,0.1);
  border-radius: 999px;
  background: rgba(6,10,26,0.78);
  backdrop-filter: blur(18px);
  -webkit-backdrop-filter: blur(18px);
  box-shadow: 0 8px 32px rgba(0,0,0,0.35), 0 0 0 1px rgba(255,255,255,0.05) inset;
  transition: border-color 350ms, box-shadow 350ms;
}
header:hover {
  border-color: rgba(255,255,255,0.16);
  box-shadow: 0 12px 44px rgba(0,0,0,0.45), 0 0 0 1px rgba(255,255,255,0.07) inset;
}

/* ── Brand ── */
.brand {
  font-family: var(--font-display);
  font-size: 0.94rem;
  font-weight: 700;
  letter-spacing: 0.01em;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  white-space: nowrap;
  flex-shrink: 0;
}
.brand span {
  background: var(--accent-grad);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

/* ── Center nav ── */
nav {
  display: flex;
  align-items: center;
  gap: 0.1rem;
  flex: 1;
  justify-content: center;
}

/* Single nav button */
.nav-link {
  position: relative;
  border: none;
  border-radius: 999px;
  background: transparent;
  color: rgba(200,210,230,0.65);
  font-size: 0.85rem;
  font-weight: 500;
  padding: 0.45rem 0.85rem;
  cursor: pointer;
  transition: color 200ms;
  white-space: nowrap;
  letter-spacing: 0.01em;
}
.nav-link:hover { color: var(--text); }

/* Active state */
.nav-link.active {
  color: var(--text);
  font-weight: 600;
}

/* Pill bg on active */
.nav-link.active::before {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: 999px;
  background: rgba(59,130,246,0.15);
  border: 1px solid rgba(59,130,246,0.3);
}

/* Animated glow dot at bottom */
.nav-link.active::after {
  content: '';
  position: absolute;
  bottom: -1px;
  left: 50%;
  transform: translateX(-50%);
  width: 18px;
  height: 2px;
  border-radius: 999px;
  background: linear-gradient(90deg, var(--accent-1), var(--accent-2));
  box-shadow: 0 0 8px rgba(59,130,246,0.8);
  animation: glow-pulse 2s ease-in-out infinite;
}
@keyframes glow-pulse {
  0%, 100% { opacity: 1; }
  50%       { opacity: 0.45; }
}

/* Hover underline for inactive */
.nav-link:not(.active):hover::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 10px;
  height: 1.5px;
  border-radius: 999px;
  background: rgba(255,255,255,0.25);
}

/* ── Actions area ── */
.actions {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex-shrink: 0;
}

/* ── WhatsApp CTA button (styled here, not base-button) ── */
.cta-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  padding: 0.52rem 1.1rem;
  border-radius: 999px;
  background: linear-gradient(135deg, #25d366 0%, #128c7e 100%);
  border: none;
  color: #fff;
  font-size: 0.83rem;
  font-weight: 700;
  cursor: pointer;
  letter-spacing: 0.01em;
  transition: transform 250ms var(--ease-out), box-shadow 250ms, filter 250ms;
  box-shadow: 0 4px 16px rgba(37,211,102,0.25);
  white-space: nowrap;
}
.cta-btn:hover {
  transform: scale(1.04) translateY(-1px);
  box-shadow: 0 8px 24px rgba(37,211,102,0.4);
  filter: brightness(1.07);
}
.cta-btn:active { transform: scale(0.97); }

/* ── Mobile menu btn ── */
.menu-btn {
  width: 2.4rem;
  height: 2.4rem;
  border-radius: 50%;
  border: 1px solid rgba(255,255,255,0.15);
  background: rgba(255,255,255,0.04);
  color: var(--text);
  display: none;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background 200ms, border-color 200ms;
}
.menu-btn:hover { background: rgba(255,255,255,0.08); border-color: rgba(255,255,255,0.25); }

@media (max-width: 960px) {
  nav { display: none; }
  .menu-btn { display: inline-flex; }
}
@media (max-width: 640px) {
  .nav-wrapper { margin: 0.6rem 0.75rem 0; width: auto; }
  header { padding: 0.45rem 0.45rem 0.45rem 1rem; }
}
`;

export class AppNavbar extends HTMLElement {
  private readonly shadowRootRef = this.attachShadow({ mode: 'open' });
  private navData: SiteData['nav'] | null = null;
  private profile: SiteData['profile'] | null = null;
  private activeId = 'sobre';
  private drawerOpen = false;

  set data(value: SiteData['nav'])          { this.navData = value; this.render(); }
  set profileData(value: SiteData['profile']) { this.profile = value; this.render(); }
  set active(value: string)                  { this.activeId = value; this.render(); }

  connectedCallback(): void { this.render(); }

  private onNavigate(targetId: string): void {
    this.dispatchEvent(
      new CustomEvent('navigate', { detail: { targetId }, bubbles: true, composed: true }),
    );
  }

  private toggleDrawer(): void {
    this.drawerOpen = !this.drawerOpen;
    this.render();
  }

  private openWhatsapp(): void {
    const wa = this.profile?.whatsapp;
    if (!wa?.number) return;
    const msg = encodeURIComponent(wa.message ?? 'Olá!');
    window.open(`https://wa.me/${wa.number}?text=${msg}`, '_blank', 'noopener,noreferrer');
  }

  private render(): void {
    if (!this.navData) return;

    this.shadowRootRef.innerHTML = '';
    applyScopedStyles(this.shadowRootRef, css);

    /* Wrapper */
    const wrapper = document.createElement('div');
    wrapper.className = 'nav-wrapper';

    /* Header pill */
    const header = document.createElement('header');
    header.setAttribute('role', 'banner');

    /* Brand */
    const brand = document.createElement('button');
    brand.className = 'brand';
    brand.type = 'button';
    brand.setAttribute('aria-label', 'Ir para o início');
    brand.innerHTML = `<span>${this.profile?.name ?? 'Marcos Menezes'}</span>`;
    brand.addEventListener('click', () => this.onNavigate('hero'));

    /* Nav links */
    const nav = document.createElement('nav');
    nav.setAttribute('aria-label', 'Navegação principal');

    this.navData.items.forEach((item) => {
      const link = document.createElement('button');
      link.type = 'button';
      link.className = `nav-link${item.id === this.activeId ? ' active' : ''}`;
      link.textContent = item.label;
      link.setAttribute('aria-current', item.id === this.activeId ? 'page' : 'false');
      link.addEventListener('click', () => this.onNavigate(item.id));
      nav.append(link);
    });

    /* Actions */
    const actions = document.createElement('div');
    actions.className = 'actions';

    /* WhatsApp CTA */
    const cta = document.createElement('button');
    cta.type = 'button';
    cta.className = 'cta-btn';
    cta.setAttribute('aria-label', 'Conversar no WhatsApp');
    cta.innerHTML = `
      <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
      </svg>
      ${this.navData.cta.label}
    `;
    cta.addEventListener('click', () => this.openWhatsapp());

    /* Mobile menu */
    const menuBtn = document.createElement('button');
    menuBtn.type = 'button';
    menuBtn.className = 'menu-btn';
    menuBtn.setAttribute('aria-label', 'Abrir menu');
    menuBtn.innerHTML = '<icon-svg name="menu" size="20"></icon-svg>';
    menuBtn.addEventListener('click', () => this.toggleDrawer());

    actions.append(cta, menuBtn);
    header.append(brand, nav, actions);
    wrapper.append(header);

    /* Drawer */
    const drawer = document.createElement('nav-drawer');
    if (this.drawerOpen) drawer.setAttribute('open', '');
    (drawer as any).navItems = this.navData.items;
    (drawer as any).active = this.activeId;

    drawer.addEventListener('drawer-close', () => { this.drawerOpen = false; this.render(); });
    drawer.addEventListener('navigate', (event) => {
      const custom = event as CustomEvent<{ targetId: string }>;
      this.drawerOpen = false;
      this.onNavigate(custom.detail.targetId);
      this.render();
    });

    this.shadowRootRef.append(wrapper, drawer);
  }
}

customElements.define('app-navbar', AppNavbar);
