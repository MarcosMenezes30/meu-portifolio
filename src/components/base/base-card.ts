import { applyScopedStyles } from '../../utils/style';

const css = `
:host {
  display: block;
}
.shell {
  position: relative;
  border-radius: var(--r-xl);
}
.card {
  position: relative;
  height: 100%;
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: inherit;
  background: linear-gradient(145deg, rgba(14, 22, 46, 0.84), rgba(17, 26, 55, 0.65));
  box-shadow: var(--shadow-1);
  backdrop-filter: blur(10px);
  padding: var(--card-pad, 1.25rem);
  transition:
    border-color var(--dur-2) var(--ease-out),
    box-shadow var(--dur-2) var(--ease-out),
    transform var(--dur-2) var(--ease-out);
}
:host([interactive]) .card {
  cursor: pointer;
}
:host([interactive]):hover .card,
:host([interactive]):focus-within .card {
  border-color: rgba(59, 130, 246, 0.38);
  box-shadow:
    0 0 0 1px rgba(59, 130, 246, 0.2),
    var(--shadow-2);
}
:host([breath]):hover .breathe,
:host([breath]):focus-within .breathe {
  transform: scale(1.02);
  animation: breath 2.2s ease-in-out infinite;
}
@keyframes breath {
  0% { transform: scale(1.02); }
  50% { transform: scale(1.028); }
  100% { transform: scale(1.02); }
}
`;

export class BaseCard extends HTMLElement {
  private readonly shadowRootRef = this.attachShadow({ mode: 'open' });

  connectedCallback(): void {
    this.render();
  }

  private render(): void {
    this.shadowRootRef.innerHTML = '';
    applyScopedStyles(this.shadowRootRef, css);

    const shell = document.createElement('div');
    shell.className = 'shell';

    const card = document.createElement('div');
    card.className = 'card breathe';

    const slot = document.createElement('slot');
    card.append(slot);
    shell.append(card);

    this.shadowRootRef.append(shell);
  }
}

customElements.define('base-card', BaseCard);
