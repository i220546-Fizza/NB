import { useEffect, useState, type RefObject } from 'react';

export function useScrollProgress(ref: RefObject<HTMLElement>) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const onScroll = () => {
      const rect = el.getBoundingClientRect();
      const viewport = window.innerHeight;
      const total = rect.height + viewport;
      const scrolled = viewport - rect.top;
      const pct = Math.min(1, Math.max(0, scrolled / total));
      setProgress(pct);
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [ref]);

  return progress;
}
