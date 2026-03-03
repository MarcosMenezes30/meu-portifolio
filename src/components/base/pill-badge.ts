import { applyScopedStyles } from '../../utils/style';

const css = `
:host {
  display: inline-flex;
}
span {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.45rem 0.78rem;
  border-radius: 999px;
  border: 1px solid rgba(255, 255, 255, 0.14);
  background: rgba(255, 255, 255, 0.03);
  font-size: 0.82rem;
  color: color-mix(in oklab, var(--text), white 5%);
  letter-spacing: 0.02em;
}
:host([accent]) span {
  border-color: rgba(59, 130, 246, 0.38);
  background: rgba(59, 130, 246, 0.12);
}
`;

export class PillBadge extends HTMLElement {
  private readonly shadowRootRef = this.attachShadow({ mode: 'open' });

  connectedCallback(): void {
    this.render();
  }

  private render(): void {
    this.shadowRootRef.innerHTML = '';
    applyScopedStyles(this.shadowRootRef, css);

    const span = document.createElement('span');
    span.append(document.createElement('slot'));
    this.shadowRootRef.append(span);
  }
}

customElements.define('pill-badge', PillBadge);
