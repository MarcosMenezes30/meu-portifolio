export function setupScrollGradient(): () => void {
  if (typeof window === 'undefined') return () => undefined;

  let ticking = false;

  const update = (): void => {
    const maxScroll = Math.max(document.body.scrollHeight - window.innerHeight, 1);
    const progress = window.scrollY / maxScroll;
    const shift = Math.min(Math.max(progress * 100, 0), 100);

    document.documentElement.style.setProperty('--bg-shift', `${shift.toFixed(2)}%`);
    ticking = false;
  };

  const onScroll = (): void => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(update);
  };

  update();
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll, { passive: true });

  return () => {
    window.removeEventListener('scroll', onScroll);
    window.removeEventListener('resize', onScroll);
  };
}
