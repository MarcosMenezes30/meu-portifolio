import { applyScopedStyles } from '../../utils/style';

const css = `
:host {
  display: inline-flex;
}
button,
a {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  min-height: 2.9rem;
  padding: 0.65rem 1.15rem;
  border-radius: 999px;
  border: 1px solid transparent;
  font-weight: 600;
  letter-spacing: 0.01em;
  color: var(--text);
  text-decoration: none;
  cursor: pointer;
  transition:
    transform var(--dur-2) var(--ease-out),
    box-shadow var(--dur-2) var(--ease-out),
    border-color var(--dur-2) var(--ease-out),
    background var(--dur-2) var(--ease-out);
}
button.primary,
a.primary {
  background: linear-gradient(120deg, rgba(59, 130, 246, 0.95), rgba(66, 133, 244, 0.84));
  box-shadow: 0 12px 22px rgba(30, 86, 196, 0.28);
}
button.outline,
a.outline {
  border-color: rgba(255, 255, 255, 0.2);
  background: rgba(255, 255, 255, 0.02);
}
button:hover,
button:focus-visible,
a:hover,
a:focus-visible {
  transform: scale(1.02);
  box-shadow:
    0 0 0 1px rgba(59, 130, 246, 0.35),
    0 12px 24px rgba(30, 86, 196, 0.34);
  animation: breath 2.2s ease-in-out infinite;
}
@keyframes breath {
  0% { transform: scale(1.02); }
  50% { transform: scale(1.028); }
  100% { transform: scale(1.02); }
}
`;

export class BaseButton extends HTMLElement {
  static get observedAttributes(): string[] {
    return ['variant', 'href', 'target', 'rel', 'type', 'aria-label'];
  }

  private readonly shadowRootRef = this.attachShadow({ mode: 'open' });

  connectedCallback(): void {
    this.render();
  }

  attributeChangedCallback(): void {
    this.render();
  }

  private render(): void {
    const variant = this.getAttribute('variant') ?? 'primary';
    const href = this.getAttribute('href');

    this.shadowRootRef.innerHTML = '';
    applyScopedStyles(this.shadowRootRef, css);

    const element = href ? document.createElement('a') : document.createElement('button');
    element.className = variant;

    if (href && element instanceof HTMLAnchorElement) {
      element.href = href;
      element.target = this.getAttribute('target') ?? '_self';
      element.rel = this.getAttribute('rel') ?? 'noopener noreferrer';
    }

    if (!href && element instanceof HTMLButtonElement) {
      element.type = (this.getAttribute('type') as 'button' | 'submit' | 'reset') ?? 'button';
    }

    const ariaLabel = this.getAttribute('aria-label');
    if (ariaLabel) {
      element.setAttribute('aria-label', ariaLabel);
    }

    const slot = document.createElement('slot');
    element.append(slot);
    this.shadowRootRef.append(element);
  }
}

customElements.define('base-button', BaseButton);
