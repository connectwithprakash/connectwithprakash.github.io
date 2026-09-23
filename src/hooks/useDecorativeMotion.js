import { useSyncExternalStore } from 'react';
import { useReducedMotion } from 'framer-motion';

const query = '(max-width: 768px)';

const subscribe = callback => {
  const media = window.matchMedia(query);
  media.addEventListener('change', callback);
  return () => media.removeEventListener('change', callback);
};

const isNarrowScreen = () => window.matchMedia(query).matches;

export default function useDecorativeMotion() {
  const reducedMotion = useReducedMotion();
  const narrowScreen = useSyncExternalStore(subscribe, isNarrowScreen, () => false);
  return !reducedMotion && !narrowScreen;
}
