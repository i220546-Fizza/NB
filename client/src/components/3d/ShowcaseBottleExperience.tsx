import { lazy, Suspense, useEffect, useState } from 'react';
import { isWebGLAvailable } from '@/utils/webgl';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import { BottleFallback } from './BottleFallback';

const ShowcaseCanvas = lazy(() => import('./ShowcaseCanvas'));

export function ShowcaseBottleExperience({
  progressRef,
}: {
  progressRef: React.MutableRefObject<number>;
}) {
  const reducedMotion = usePrefersReducedMotion();
  const [canRender3D, setCanRender3D] = useState(false);

  useEffect(() => {
    setCanRender3D(isWebGLAvailable() && !reducedMotion);
  }, [reducedMotion]);

  if (!canRender3D) {
    return (
      <BottleFallback
        image="/images/products/obsidian-oud.svg"
        alt="NB Classic Scents signature bottle in motion"
        animate={!reducedMotion}
      />
    );
  }

  return (
    <Suspense
      fallback={
        <BottleFallback image="/images/products/obsidian-oud.svg" alt="NB Classic Scents signature bottle in motion" />
      }
    >
      <ShowcaseCanvas progressRef={progressRef} />
    </Suspense>
  );
}
