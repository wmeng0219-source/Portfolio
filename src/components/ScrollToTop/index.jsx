import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

export default function ScrollToTop() {
  const { pathname, state, hash } = useLocation();
  const prevPathRef = useRef(null);

  useEffect(() => {
    const isReturningToHomeFromProject =
      pathname === '/' && typeof prevPathRef.current === 'string' && prevPathRef.current.startsWith('/project/');

    const previousPath = prevPathRef.current;
    prevPathRef.current = pathname;

    // Case pages own their anchor scrolling and focus; same-route navigation stays local.
    if (pathname.startsWith('/project/') && (hash || previousPath === pathname)) return undefined;

    const targetId =
      state?.scrollTo ||
      (hash ? hash.replace('#', '') : null) ||
      (isReturningToHomeFromProject ? 'portfolio' : null);

    if (targetId) {
      const scroll = () => {
        const el = document.getElementById(targetId);
        if (el) {
          el.scrollIntoView({
            behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'auto',
          });
          return true;
        }
        return false;
      };

      if (!scroll()) {
        let timeoutId;
        const rafId = requestAnimationFrame(() => {
          if (!scroll()) {
            timeoutId = setTimeout(scroll, 50);
          }
        });
        return () => {
          cancelAnimationFrame(rafId);
          clearTimeout(timeoutId);
        };
      }
      return undefined;
    }

    window.scrollTo(0, 0);
    return undefined;
  }, [pathname, state, hash]);

  return null;
}
