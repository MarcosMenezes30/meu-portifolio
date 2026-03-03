interface RevealOptions {
  selector?: string;
  threshold?: number;
  root?: Element | Document | null;
  reducedMotion?: boolean;
}

function applyRevealInitial(element: HTMLElement): void {
  element.style.opacity = '0';
  element.style.transform = 'translateY(18px)';
  element.style.transition = 'opacity 650ms var(--ease-out), transform 650ms var(--ease-out)';
  element.style.willChange = 'opacity, transform';
}

function applyRevealFinal(element: HTMLElement): void {
  element.style.opacity = '1';
  element.style.transform = 'translateY(0)';
  element.style.willChange = 'auto';
}

export function setupReveal(root: ParentNode, options: RevealOptions = {}): () => void {
  const selector = options.selector ?? '[data-reveal]';
  const threshold = options.threshold ?? 0.15;
  const reduced = options.reducedMotion ?? false;

  const elements = Array.from(root.querySelectorAll<HTMLElement>(selector));

  if (elements.length === 0) {
    return () => undefined;
  }

  if (reduced || typeof IntersectionObserver === 'undefined') {
    elements.forEach((el) => {
      el.classList.add('revealed');
      applyRevealFinal(el);
      el.style.transition = 'none';
    });
    return () => undefined;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        const target = entry.target as HTMLElement;
        target.classList.add('revealed');
        applyRevealFinal(target);
        observer.unobserve(target);
      });
    },
    { threshold },
  );

  elements.forEach((el) => {
    el.classList.add('reveal');
    applyRevealInitial(el);
    observer.observe(el);
  });

  return () => observer.disconnect();
}
