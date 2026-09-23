import { lazy, Suspense, useEffect, useState } from 'react';
import { isWebGLAvailable } from '@/utils/webgl';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import { BottleFallback } from './BottleFallback';

const HeroCanvas = lazy(() => import('./HeroCanvas'));

export function HeroBottleExperience() {
  const reducedMotion = usePrefersReducedMotion();
  const [canRender3D, setCanRender3D] = useState(false);

  useEffect(() => {
    setCanRender3D(isWebGLAvailable() && !reducedMotion);
  }, [reducedMotion]);

  if (!canRender3D) {
    return (
      <BottleFallback
        image="/images/products/noir-elegance.svg"
        alt="NB Classic Scents signature bottle"
        animate={!reducedMotion}
      />
    );
  }

  return (
    <Suspense
      fallback={
        <BottleFallback image="/images/products/noir-elegance.svg" alt="NB Classic Scents signature bottle" />
      }
    >
      <HeroCanvas />
    </Suspense>
  );
}
