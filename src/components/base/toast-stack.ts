import { applyScopedStyles } from '../../utils/style';

interface ToastPayload {
  message: string;
  type?: 'success' | 'info' | 'error';
}

interface ToastItem extends ToastPayload {
  id: string;
}

const css = `
:host {
  position: fixed;
  right: 1rem;
  bottom: 1rem;
  z-index: 120;
  display: grid;
  gap: 0.6rem;
  width: min(360px, calc(100vw - 2rem));
}
.toast {
  border-radius: 14px;
  border: 1px solid rgba(255, 255, 255, 0.12);
  background: rgba(11, 16, 38, 0.93);
  color: var(--text);
  padding: 0.8rem 0.95rem;
  box-shadow: var(--shadow-2);
  opacity: 0;
  transform: translateY(8px);
  animation: show 240ms var(--ease-out) forwards;
}
.toast.success {
  border-color: rgba(52, 211, 153, 0.4);
}
.toast.error {
  border-color: rgba(251, 113, 133, 0.4);
}
@keyframes show {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
`;

export class ToastStack extends HTMLElement {
  private readonly shadowRootRef = this.attachShadow({ mode: 'open' });

  private toasts: ToastItem[] = [];

  private readonly onToast = (event: Event): void => {
    const custom = event as CustomEvent<ToastPayload>;
    if (!custom.detail?.message) return;

    const toast: ToastItem = {
      id: crypto.randomUUID(),
      message: custom.detail.message,
      type: custom.detail.type ?? 'info',
    };

    this.toasts = [...this.toasts, toast];
    this.render();

    window.setTimeout(() => {
      this.toasts = this.toasts.filter((item) => item.id !== toast.id);
      this.render();
    }, 3200);
  };

  connectedCallback(): void {
    window.addEventListener('show-toast', this.onToast as EventListener);
    this.render();
  }

  disconnectedCallback(): void {
    window.removeEventListener('show-toast', this.onToast as EventListener);
  }

  private render(): void {
    this.shadowRootRef.innerHTML = '';
    applyScopedStyles(this.shadowRootRef, css);

    this.toasts.forEach((toast) => {
      const item = document.createElement('div');
      item.className = `toast ${toast.type ?? 'info'}`;
      item.textContent = toast.message;
      item.setAttribute('role', 'status');
      item.setAttribute('aria-live', 'polite');
      this.shadowRootRef.append(item);
    });
  }
}

customElements.define('toast-stack', ToastStack);
