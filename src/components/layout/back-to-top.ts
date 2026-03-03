import { applyScopedStyles } from '../../utils/style';

const css = `
:host {
  position: fixed;
  right: 1.1rem;
  bottom: 1.1rem;
  z-index: 95;
}
button {
  width: 3rem;
  height: 3rem;
  border-radius: 999px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  background: linear-gradient(140deg, rgba(59, 130, 246, 0.9), rgba(124, 58, 237, 0.78));
  color: white;
  display: grid;
  place-items: center;
  cursor: pointer;
  opacity: 0;
  transform: translateY(10px);
  pointer-events: none;
  transition: all var(--dur-2) var(--ease-out);
  box-shadow: var(--shadow-2);
}
button.visible {
  opacity: 1;
  transform: translateY(0);
  pointer-events: auto;
}
`;

export class BackToTop extends HTMLElement {
  private readonly shadowRootRef = this.attachShadow({ mode: 'open' });

  private visible = false;

  private ticking = false;

  connectedCallback(): void {
    this.render();
    window.addEventListener('scroll', this.onScroll, { passive: true });
  }

  disconnectedCallback(): void {
    window.removeEventListener('scroll', this.onScroll);
  }

  private onScroll = (): void => {
    if (this.ticking) return;
    this.ticking = true;

    requestAnimationFrame(() => {
      this.visible = window.scrollY > 500;
      this.render();
      this.ticking = false;
    });
  };

  private render(): void {
    this.shadowRootRef.innerHTML = '';
    applyScopedStyles(this.shadowRootRef, css);

    const button = document.createElement('button');
    button.className = this.visible ? 'visible' : '';
    button.setAttribute('aria-label', 'Voltar ao topo');
    button.innerHTML = '<icon-svg name="arrowUp" size="20"></icon-svg>';
    button.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    this.shadowRootRef.append(button);
  }
}

customElements.define('back-to-top', BackToTop);
