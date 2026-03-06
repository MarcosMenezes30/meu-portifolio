import type { SiteData } from '../../types/siteData';
import { prefersReducedMotion } from '../../utils/motion';
import { setupReveal } from '../../utils/reveal';
import { applyScopedStyles } from '../../utils/style';

const css = `
:host {
  display: block;
}
.section {
  width: var(--container);
  margin: 0 auto;
}
.grid {
  display: grid;
  grid-template-columns: 1.2fr 0.8fr;
  gap: 1rem;
}
form {
  display: grid;
  gap: 0.72rem;
}
label {
  display: grid;
  gap: 0.3rem;
  font-size: 0.88rem;
}
input,
textarea {
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.17);
  background: rgba(255, 255, 255, 0.03);
  color: var(--text);
  padding: 0.7rem 0.8rem;
}
textarea {
  min-height: 130px;
  resize: vertical;
}
.infos {
  display: grid;
  gap: 0.72rem;
}
.info {
  display: flex;
  align-items: center;
  gap: 0.65rem;
}
@media (max-width: 920px) {
  .grid {
    grid-template-columns: 1fr;
  }
}
`;

export class SectionContact extends HTMLElement {
  private readonly shadowRootRef = this.attachShadow({ mode: 'open' });

  private data: SiteData | null = null;

  private cleanupReveal: (() => void) | null = null;

  set siteData(value: SiteData) {
    this.data = value;
    this.render();
  }

  connectedCallback(): void {
    this.render();
  }

  disconnectedCallback(): void {
    this.cleanupReveal?.();
  }

  private toast(message: string, type: 'success' | 'info' | 'error' = 'info'): void {
    window.dispatchEvent(new CustomEvent('show-toast', { detail: { message, type } }));
  }

  private openWhatsapp(): void {
    const whatsapp = this.data?.profile.whatsapp;
    if (!whatsapp) return;
    const text = encodeURIComponent(whatsapp.message);
    window.open(`https://wa.me/${whatsapp.number}?text=${text}`, '_blank', 'noopener,noreferrer');
  }

  private async submitForm(form: HTMLFormElement): Promise<void> {
    if (!this.data) return;

    const formData = new FormData(form);
    const name = String(formData.get('name') ?? '').trim();
    const email = String(formData.get('email') ?? '').trim();
    const subject = String(formData.get('subject') ?? '').trim();
    const message = String(formData.get('message') ?? '').trim();

    if (!name || !email || !subject || !message) {
      this.toast('Preencha todos os campos obrigatórios.', 'error');
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      this.toast('Informe um e-mail válido.', 'error');
      return;
    }

    const endpoint = this.data.contact.formEndpoint;

    if (endpoint) {
      try {
        const response = await fetch(endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name, email, subject, message }),
        });

        if (response.ok) {
          this.toast('Mensagem enviada com sucesso.', 'success');
          form.reset();
          return;
        }
      } catch {
        this.toast('Endpoint indisponível, abrindo fallback por e-mail.', 'info');
      }
    }

    const mailto = `mailto:${this.data.contact.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`Nome: ${name}\nE-mail: ${email}\n\n${message}`)}`;
    window.location.href = mailto;
    this.toast('Abrindo seu app de email...', 'info');
  }

  private render(): void {
    if (!this.data) return;

    this.cleanupReveal?.();

    this.shadowRootRef.innerHTML = '';
    applyScopedStyles(this.shadowRootRef, css);

    const section = document.createElement('section');
    section.className = 'section';

    section.innerHTML = `
      <section-title
        eyebrow="Contato"
        title="Interessado em trabalhar comigo"
        highlight="trabalhar comigo"
        subtitle="Envie sua ideia, desafio ou proposta. Retorno rápido com próximos passos e estimativas."
        data-reveal
      ></section-title>
      <div class="grid">
        <div data-reveal>
          <base-card>
            <form id="contact-form" novalidate>
              <label>Nome<input name="name" required autocomplete="name" /></label>
              <label>E-mail<input name="email" type="email" required autocomplete="email" /></label>
              <label>Assunto<input name="subject" required /></label>
              <label>Mensagem<textarea name="message" required></textarea></label>
              <base-button variant="primary" type="submit">Enviar Mensagem</base-button>
            </form>
          </base-card>
        </div>
        <div class="infos">
          <div data-reveal><base-card interactive breath><div class="info"><icon-svg name="mail" size="18"></icon-svg><a href="mailto:${this.data.contact.email}">${this.data.contact.email}</a></div></base-card></div>
          <div data-reveal><base-card interactive breath><div class="info"><icon-svg name="phone" size="18"></icon-svg><a href="tel:${this.data.contact.phone}">${this.data.contact.phone}</a></div></base-card></div>
          <div data-reveal><base-card interactive breath><div class="info"><icon-svg name="location" size="18"></icon-svg><span>${this.data.contact.location}</span></div></base-card></div>
          <div data-reveal><base-card interactive breath><div class="info"><icon-svg name="whatsapp" size="18"></icon-svg><button id="wa-contact" type="button">Conversar no WhatsApp</button></div></base-card></div>
        </div>
      </div>
    `;

    this.shadowRootRef.append(section);

    this.shadowRootRef.getElementById('wa-contact')?.addEventListener('click', () => this.openWhatsapp());

    const form = this.shadowRootRef.getElementById('contact-form') as HTMLFormElement | null;
    form?.addEventListener('submit', (event) => {
      event.preventDefault();
      this.submitForm(form);
    });

    this.cleanupReveal = setupReveal(this.shadowRootRef, { reducedMotion: prefersReducedMotion() });
  }
}

customElements.define('section-contact', SectionContact);
