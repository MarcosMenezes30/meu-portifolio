interface CounterTarget {
  element: HTMLElement;
  value: number;
  suffix?: string;
  duration?: number;
}

interface CounterOptions {
  threshold?: number;
  reducedMotion?: boolean;
}

function easeOutQuad(t: number): number {
  return t * (2 - t);
}

function animateCounter(target: CounterTarget): void {
  const startTime = performance.now();
  const duration = target.duration ?? 1200;

  const frame = (now: number): void => {
    const progress = Math.min((now - startTime) / duration, 1);
    const eased = easeOutQuad(progress);
    const current = Math.round(target.value * eased);

    target.element.textContent = `${current}${target.suffix ?? ''}`;

    if (progress < 1) {
      requestAnimationFrame(frame);
    }
  };

  requestAnimationFrame(frame);
}

export function setupCounters(targets: CounterTarget[], options: CounterOptions = {}): () => void {
  if (!targets.length) return () => undefined;

  const reduced = options.reducedMotion ?? false;

  if (reduced || typeof IntersectionObserver === 'undefined') {
    targets.forEach((target) => {
      target.element.textContent = `${target.value}${target.suffix ?? ''}`;
    });
    return () => undefined;
  }

  const seen = new WeakSet<HTMLElement>();
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        const element = entry.target as HTMLElement;
        if (seen.has(element)) return;

        const target = targets.find((item) => item.element === element);
        if (!target) return;

        seen.add(element);
        animateCounter(target);
        observer.unobserve(element);
      });
    },
    { threshold: options.threshold ?? 0.35 },
  );

  targets.forEach((target) => {
    target.element.textContent = `0${target.suffix ?? ''}`;
    observer.observe(target.element);
  });

  return () => observer.disconnect();
}
