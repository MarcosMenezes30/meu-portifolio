import { applyScopedStyles } from '../../utils/style';

const css = `
:host {
  display: block;
  margin-bottom: clamp(1.8rem, 2.8vw, 2.6rem);
}
.eyebrow {
  display: inline-flex;
  margin-bottom: 0.8rem;
  font-size: 0.78rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--muted);
  border: 1px solid rgba(255, 255, 255, 0.13);
  border-radius: 999px;
  padding: 0.35rem 0.7rem;
}
h2 {
  margin: 0;
  font-family: var(--font-display);
  font-size: var(--h2);
  line-height: 1.1;
  letter-spacing: -0.02em;
}
.highlight {
  background: var(--accent-grad);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}
p {
  margin: 0.85rem 0 0;
  max-width: 64ch;
  color: var(--muted);
}
`;

export class SectionTitle extends HTMLElement {
  static get observedAttributes(): string[] {
    return ['eyebrow', 'title', 'highlight', 'subtitle'];
  }

  private readonly shadowRootRef = this.attachShadow({ mode: 'open' });

  connectedCallback(): void {
    this.render();
  }

  attributeChangedCallback(): void {
    this.render();
  }

  private render(): void {
    const eyebrow = this.getAttribute('eyebrow') ?? '';
    const title = this.getAttribute('title') ?? '';
    const highlight = this.getAttribute('highlight') ?? '';
    const subtitle = this.getAttribute('subtitle') ?? '';

    this.shadowRootRef.innerHTML = '';
    applyScopedStyles(this.shadowRootRef, css);

    if (eyebrow) {
      const badge = document.createElement('span');
      badge.className = 'eyebrow';
      badge.textContent = eyebrow;
      this.shadowRootRef.append(badge);
    }

    const heading = document.createElement('h2');

    if (highlight && title.includes(highlight)) {
      const [before, after] = title.split(highlight);
      heading.append(before);

      const accent = document.createElement('span');
      accent.className = 'highlight';
      accent.textContent = highlight;
      heading.append(accent, after);
    } else {
      heading.textContent = title;
    }

    this.shadowRootRef.append(heading);

    if (subtitle) {
      const paragraph = document.createElement('p');
      paragraph.textContent = subtitle;
      this.shadowRootRef.append(paragraph);
    }
  }
}

customElements.define('section-title', SectionTitle);
