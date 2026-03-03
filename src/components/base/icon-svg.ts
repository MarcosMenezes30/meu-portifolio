import { iconMap } from '../../utils/icons';
import { applyScopedStyles } from '../../utils/style';

const css = `
:host {
  display: inline-flex;
  width: var(--icon-size, 1.1rem);
  height: var(--icon-size, 1.1rem);
  color: currentColor;
}
svg {
  width: 100%;
  height: 100%;
  fill: currentColor;
}
`;

export class IconSvg extends HTMLElement {
  static get observedAttributes(): string[] {
    return ['name', 'size'];
  }

  private readonly shadowRootRef = this.attachShadow({ mode: 'open' });

  connectedCallback(): void {
    this.render();
  }

  attributeChangedCallback(): void {
    this.render();
  }

  private render(): void {
    const name = this.getAttribute('name') ?? 'spark';
    const icon = iconMap[name] ?? iconMap.spark;
    const size = this.getAttribute('size');

    this.shadowRootRef.innerHTML = '';
    applyScopedStyles(this.shadowRootRef, css);

    if (size) {
      this.style.setProperty('--icon-size', size.endsWith('px') ? size : `${size}px`);
    }

    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('viewBox', icon.viewBox);
    svg.setAttribute('aria-hidden', 'true');

    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttribute('d', icon.path);
    svg.append(path);

    this.shadowRootRef.append(svg);
  }
}

customElements.define('icon-svg', IconSvg);
