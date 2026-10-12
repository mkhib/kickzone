import { useEffect } from 'react';

/**
 * Hook to provide JS fallback for scroll-driven animations (@property --t and --v)
 * when CSS animation-timeline: view() is not supported (e.g. Safari / Firefox).
 */
export function useScrollProgress() {
  useEffect(() => {
    // If browser supports CSS animation-timeline: view(), let native engine handle it
    const supportsViewTimeline =
      typeof CSS !== 'undefined' &&
      typeof CSS.supports === 'function' &&
      CSS.supports('animation-timeline: view()');

    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      typeof window.matchMedia === 'function' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (supportsViewTimeline && !prefersReducedMotion) {
      return;
    }

    const clamp = (val: number, min = 0, max = 1) =>
      Math.min(Math.max(val, min), max);

    let rafId: number | null = null;

    const onScroll = () => {
      if (rafId !== null) return;

      rafId = window.requestAnimationFrame(() => {
        rafId = null;

        if (prefersReducedMotion) {
          const hero = document.querySelector<HTMLElement>('.hero-campaign');
          if (hero) hero.style.setProperty('--t', '0');

          const rvElements = document.querySelectorAll<HTMLElement>('.rv');
          rvElements.forEach((el) => {
            el.style.setProperty('--v', '1');
          });
          return;
        }

        const vh = window.innerHeight;

        // 1. Hero progress --t
        const hero = document.querySelector<HTMLElement>('.hero-campaign');
        if (hero) {
          const rect = hero.getBoundingClientRect();
          const t = clamp(-rect.top / (rect.height || 1));
          hero.style.setProperty('--t', t.toFixed(4));
        }

        // 2. Reveal elements .rv progress --v
        const rvElements = document.querySelectorAll<HTMLElement>('.rv');
        rvElements.forEach((el) => {
          const rect = el.getBoundingClientRect();
          const h = rect.height;
          const start = 0.05 * Math.min(h, vh);
          const end = 0.3 * (vh + h);
          const v = clamp((vh - rect.top - start) / (end - start || 1));
          el.style.setProperty('--v', v.toFixed(4));
        });
      });
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });

    return () => {
      if (rafId !== null) window.cancelAnimationFrame(rafId);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);
}
