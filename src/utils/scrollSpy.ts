interface ScrollSpyOptions {
  threshold?: number;
  onChange: (id: string) => void;
}

export function setupScrollSpy(sections: HTMLElement[], options: ScrollSpyOptions): () => void {
  if (!sections.length || typeof IntersectionObserver === 'undefined') {
    return () => undefined;
  }

  const visibility = new Map<string, number>();

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const id = (entry.target as HTMLElement).id;
        visibility.set(id, entry.intersectionRatio);
      });

      let bestId = sections[0]?.id ?? '';
      let bestRatio = -1;

      sections.forEach((section) => {
        const ratio = visibility.get(section.id) ?? 0;
        if (ratio > bestRatio) {
          bestRatio = ratio;
          bestId = section.id;
        }
      });

      if (bestId && bestRatio >= (options.threshold ?? 0.55) / 2) {
        options.onChange(bestId);
      }
    },
    {
      threshold: [0.15, 0.35, 0.55, 0.75],
      rootMargin: '-10% 0px -45% 0px',
    },
  );

  sections.forEach((section) => observer.observe(section));

  return () => observer.disconnect();
}
