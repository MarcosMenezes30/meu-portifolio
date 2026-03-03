import type { SiteData } from '../../types/siteData';
import { applyScopedStyles } from '../../utils/style';

const css = `
:host {
  display: block;
  padding: 2rem 0 2.5rem;
}
.footer {
  width: var(--container);
  margin: 0 auto;
  border-radius: var(--r-xl);
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: linear-gradient(180deg, rgba(9, 14, 32, 0.8), rgba(8, 12, 28, 0.95));
  padding: 1.6rem;
}
.grid {
  display: grid;
  grid-template-columns: 1.5fr 1fr 1fr 1fr;
  gap: 1.3rem;
}
h4 {
  margin: 0 0 0.65rem;
  font-size: 0.92rem;
}
p,
a,button {
  color: var(--muted);
  font-size: 0.9rem;
}
.links {
  display: grid;
  gap: 0.45rem;
}
.link-btn {
  border: 0;
  text-align: left;
  background: transparent;
  padding: 0;
  cursor: pointer;
}
.bottom {
  margin-top: 1.25rem;
  padding-top: 1rem;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  flex-wrap: wrap;
  color: var(--muted);
  font-size: 0.82rem;
}
@media (max-width: 960px) {
  .grid {
    grid-template-columns: 1fr 1fr;
  }
}
@media (max-width: 640px) {
  .grid {
    grid-template-columns: 1fr;
  }
}
`;

export class AppFooter extends HTMLElement {
  private readonly shadowRootRef = this.attachShadow({ mode: 'open' });

  private siteData: SiteData | null = null;

  set data(value: SiteData) {
    this.siteData = value;
    this.render();
  }

  connectedCallback(): void {
    this.render();
  }

  private navigate(targetId: string): void {
    this.dispatchEvent(
      new CustomEvent('navigate', {
        detail: { targetId },
        bubbles: true,
        composed: true,
      }),
    );
  }

  private openWhatsapp(): void {
    const whatsapp = this.siteData?.profile.whatsapp;
    if (!whatsapp) return;
    const text = encodeURIComponent(whatsapp.message);
    window.open(`https://wa.me/${whatsapp.number}?text=${text}`, '_blank', 'noopener,noreferrer');
  }

  private render(): void {
    if (!this.siteData) return;

    this.shadowRootRef.innerHTML = '';
    applyScopedStyles(this.shadowRootRef, css);

    const footer = document.createElement('footer');
    footer.className = 'footer';

    const grid = document.createElement('div');
    grid.className = 'grid';

    const colBio = document.createElement('div');
    colBio.innerHTML = `<h4>${this.siteData.profile.name}</h4><p>${this.siteData.footer.shortBio}</p>`;

    const colNav = document.createElement('div');
    const navLinks = document.createElement('div');
    navLinks.className = 'links';
    colNav.innerHTML = '<h4>Navegação</h4>';
    this.siteData.nav.items.forEach((item) => {
      const button = document.createElement('button');
      button.className = 'link-btn';
      button.textContent = item.label;
      button.addEventListener('click', () => this.navigate(item.id));
      navLinks.append(button);
    });
    colNav.append(navLinks);

    const colContact = document.createElement('div');
    colContact.innerHTML = `<h4>Contato</h4><div class="links"><a href="mailto:${this.siteData.contact.email}">${this.siteData.contact.email}</a><a href="tel:${this.siteData.contact.phone}">${this.siteData.contact.phone}</a><p>${this.siteData.contact.location}</p></div>`;

    const colCta = document.createElement('div');
    colCta.innerHTML = '<h4>Vamos conversar?</h4><p>Aberto para novos desafios e consultorias.</p>';
    const cta = document.createElement('base-button');
    cta.setAttribute('variant', 'outline');
    cta.textContent = 'Chamar no WhatsApp';
    cta.addEventListener('click', () => this.openWhatsapp());
    colCta.append(cta);

    grid.append(colBio, colNav, colContact, colCta);

    const bottom = document.createElement('div');
    bottom.className = 'bottom';

    const now = new Date().getFullYear();
    bottom.innerHTML = `<span>© ${now} ${this.siteData.profile.name}. Todos os direitos reservados.</span><span>${this.siteData.footer.credits}</span>`;

    footer.append(grid, bottom);
    this.shadowRootRef.append(footer);
  }
}

customElements.define('app-footer', AppFooter);
