import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (!hash) {
      window.scrollTo(0, 0);
      return undefined;
    }

    let anchor;
    try { anchor = decodeURIComponent(hash.slice(1)); } catch { return undefined; }
    let frame;
    const scrollToAnchor = () => {
      const element = document.getElementById(anchor);
      if (!element) return;
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        frame = requestAnimationFrame(() => {
          element.scrollIntoView({ behavior: 'instant', block: 'start' });
          observer.disconnect();
        });
      });
    };
    const observer = new MutationObserver(scrollToAnchor);
    observer.observe(document.getElementById('root'), { childList: true, subtree: true });
    scrollToAnchor();
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [pathname, hash]);

  return null;
};

export default ScrollToTop;
