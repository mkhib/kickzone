import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Ensures that whenever navigation occurs (route path, query params, hash, or history key changes),
 * the window scroll position is reset to the top (or scrolled to the anchored element if a hash exists).
 */
export function ScrollToTop() {
  const { pathname, search, hash, key } = useLocation();

  // Set browser scroll restoration to manual so SPA routing controls the scroll position
  useEffect(() => {
    if (typeof window !== 'undefined' && 'scrollRestoration' in window.history) {
      try {
        const previous = window.history.scrollRestoration;
        window.history.scrollRestoration = 'manual';
        return () => {
          try {
            window.history.scrollRestoration = previous;
          } catch {
            // ignore
          }
        };
      } catch {
        // ignore
      }
    }
  }, []);

  useEffect(() => {
    // If an in-page anchor hash exists, attempt to scroll to it
    if (hash) {
      const elementId = hash.replace(/^#/, '');
      const targetElement =
        document.getElementById(elementId) ||
        (elementId ? document.querySelector(hash) : null);
      if (targetElement) {
        targetElement.scrollIntoView();
        return;
      }
    }

    const resetScroll = () => {
      if (
        typeof window !== 'undefined' &&
        typeof window.scrollTo === 'function'
      ) {
        try {
          window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
        } catch {
          window.scrollTo(0, 0);
        }
      }
      if (typeof document !== 'undefined') {
        if (document.documentElement) {
          document.documentElement.scrollTop = 0;
        }
        if (document.body) {
          document.body.scrollTop = 0;
        }
      }
    };

    // 1. Immediately reset scroll
    resetScroll();

    // 2. Re-assert scroll to top in the next animation frame to prevent
    // any browser layout adjustment or deferred jump
    let rafId: number | null = null;
    if (
      typeof window !== 'undefined' &&
      typeof window.requestAnimationFrame === 'function'
    ) {
      rafId = window.requestAnimationFrame(() => {
        resetScroll();
      });
    }

    return () => {
      if (rafId !== null && typeof window !== 'undefined') {
        window.cancelAnimationFrame(rafId);
      }
    };
  }, [pathname, search, hash, key]);

  return null;
}

export default ScrollToTop;
