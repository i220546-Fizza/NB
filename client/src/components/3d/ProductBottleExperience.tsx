import { lazy, Suspense, useEffect, useState } from 'react';
import { isWebGLAvailable } from '@/utils/webgl';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import { BottleFallback } from './BottleFallback';

const ProductCanvas = lazy(() => import('./ProductCanvas'));

export function ProductBottleExperience({
  liquidColor,
  image,
  alt,
}: {
  liquidColor: string;
  image: string;
  alt: string;
}) {
  const reducedMotion = usePrefersReducedMotion();
  const [canRender3D, setCanRender3D] = useState(false);

  useEffect(() => {
    setCanRender3D(isWebGLAvailable() && !reducedMotion);
  }, [reducedMotion]);

  if (!canRender3D) {
    return <BottleFallback image={image} alt={alt} animate={!reducedMotion} />;
  }

  return (
    <Suspense fallback={<BottleFallback image={image} alt={alt} />}>
      <ProductCanvas liquidColor={liquidColor} />
    </Suspense>
  );
}
