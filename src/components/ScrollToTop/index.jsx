import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

export default function ScrollToTop() {
  const { pathname, state, hash } = useLocation();
  const prevPathRef = useRef(pathname);

  useEffect(() => {
    const isReturningToHomeFromProject =
      pathname === '/' && typeof prevPathRef.current === 'string' && prevPathRef.current.startsWith('/project/');

    prevPathRef.current = pathname;

    const targetId =
      state?.scrollTo ||
      (hash ? hash.replace('#', '') : null) ||
      (isReturningToHomeFromProject ? 'portfolio' : null);

    if (targetId) {
      const scroll = () => {
        const el = document.getElementById(targetId);
        if (el) {
          el.scrollIntoView({ behavior: 'auto' });
          return true;
        }
        return false;
      };

      if (!scroll()) {
        const rafId = requestAnimationFrame(() => {
          if (!scroll()) {
            setTimeout(scroll, 50);
          }
        });
        return () => cancelAnimationFrame(rafId);
      }
      return undefined;
    }

    window.scrollTo(0, 0);
    return undefined;
  }, [pathname, state, hash]);

  return null;
}
