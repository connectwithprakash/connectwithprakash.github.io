import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (!hash) {
      window.scrollTo(0, 0);
      return undefined;
    }

    let attempts = 0;
    let timeoutId;

    const scrollToHash = () => {
      const element = document.querySelector(hash);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        return;
      }

      attempts += 1;
      if (attempts < 20) {
        timeoutId = window.setTimeout(scrollToHash, 50);
      }
    };

    scrollToHash();
    return () => window.clearTimeout(timeoutId);
  }, [pathname, hash]);

  return null;
};

export default ScrollToTop;
