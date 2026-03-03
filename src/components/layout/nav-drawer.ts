import type { NavItem } from '../../types/siteData';
import { trapFocus } from '../../utils/focusTrap';
import { applyScopedStyles } from '../../utils/style';

const css = `
:host {
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 110;
}
.backdrop {
  position: absolute;
  inset: 0;
  background: rgba(3, 6, 18, 0.62);
  opacity: 0;
  transition: opacity var(--dur-2) var(--ease-out);
}
.panel {
  position: absolute;
  right: 0;
  top: 0;
  height: 100%;
  width: min(86vw, 360px);
  background: rgba(10, 15, 34, 0.95);
  border-left: 1px solid rgba(255, 255, 255, 0.12);
  transform: translateX(100%);
  transition: transform var(--dur-2) var(--ease-out);
  box-shadow: var(--shadow-2);
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
:host([open]) {
  pointer-events: auto;
}
:host([open]) .backdrop {
  opacity: 1;
}
:host([open]) .panel {
  transform: translateX(0);
}
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.title {
  margin: 0;
  font-size: 1rem;
  color: var(--muted);
}
.close {
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 12px;
  background: transparent;
  color: var(--text);
  width: 2.5rem;
  height: 2.5rem;
  display: grid;
  place-items: center;
  cursor: pointer;
}
nav {
  display: grid;
  gap: 0.42rem;
}
button.link {
  width: 100%;
  display: flex;
  align-items: center;
  gap: 0.7rem;
  text-align: left;
  border: 1px solid transparent;
  background: rgba(255, 255, 255, 0.03);
  color: var(--text);
  border-radius: 14px;
  padding: 0.75rem 0.85rem;
  cursor: pointer;
}
button.link.active {
  border-color: rgba(59, 130, 246, 0.44);
  background: rgba(59, 130, 246, 0.15);
}
`;

export class NavDrawer extends HTMLElement {
  private readonly shadowRootRef = this.attachShadow({ mode: 'open' });

  private items: NavItem[] = [];

  private activeId = '';

  private cleanupFocusTrap: (() => void) | null = null;

  set navItems(value: NavItem[]) {
    this.items = value;
    this.render();
  }

  set active(value: string) {
    this.activeId = value;
    this.render();
  }

  static get observedAttributes(): string[] {
    return ['open'];
  }

  connectedCallback(): void {
    this.render();
    document.addEventListener('keydown', this.onKeyDown);
  }

  disconnectedCallback(): void {
    document.removeEventListener('keydown', this.onKeyDown);
    this.cleanupFocusTrap?.();
  }

  attributeChangedCallback(): void {
    this.render();
  }

  private onKeyDown = (event: KeyboardEvent): void => {
    if (event.key === 'Escape' && this.hasAttribute('open')) {
      this.close();
    }
  };

  private close(): void {
    this.removeAttribute('open');
    this.dispatchEvent(new CustomEvent('drawer-close', { bubbles: true, composed: true }));
  }

  private navigate(targetId: string): void {
    this.dispatchEvent(
      new CustomEvent('navigate', {
        detail: { targetId },
        bubbles: true,
        composed: true,
      }),
    );
    this.close();
  }

  private render(): void {
    this.shadowRootRef.innerHTML = '';
    applyScopedStyles(this.shadowRootRef, css);

    const open = this.hasAttribute('open');

    const backdrop = document.createElement('button');
    backdrop.className = 'backdrop';
    backdrop.setAttribute('aria-label', 'Fechar menu ao clicar fora');
    backdrop.addEventListener('click', () => this.close());

    const panel = document.createElement('aside');
    panel.className = 'panel';
    panel.setAttribute('role', 'dialog');
    panel.setAttribute('aria-modal', 'true');
    panel.setAttribute('aria-label', 'Menu de navegação');

    const header = document.createElement('div');
    header.className = 'header';

    const title = document.createElement('p');
    title.className = 'title';
    title.textContent = 'Navegação';

    const close = document.createElement('button');
    close.className = 'close';
    close.setAttribute('aria-label', 'Fechar menu');
    close.innerHTML = '<icon-svg name="close"></icon-svg>';
    close.addEventListener('click', () => this.close());

    header.append(title, close);

    const nav = document.createElement('nav');

    this.items.forEach((item) => {
      const button = document.createElement('button');
      button.className = `link ${item.id === this.activeId ? 'active' : ''}`;
      button.setAttribute('type', 'button');
      button.setAttribute('aria-label', `Ir para seção ${item.label}`);
      button.innerHTML = `<icon-svg name="${item.icon}" size="18"></icon-svg><span>${item.label}</span>`;
      button.addEventListener('click', () => this.navigate(item.id));
      nav.append(button);
    });

    panel.append(header, nav);
    this.shadowRootRef.append(backdrop, panel);

    this.cleanupFocusTrap?.();
    if (open) {
      this.cleanupFocusTrap = trapFocus(panel);
      window.setTimeout(() => {
        close.focus();
      }, 0);
    }
  }
}

customElements.define('nav-drawer', NavDrawer);
