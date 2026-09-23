import * as THREE from 'three';

let cached: THREE.Texture | null = null;

/**
 * Generates a soft radial-gradient sprite texture entirely in-memory via the
 * Canvas 2D API. No network fetch, no bundled binary asset — this is what
 * lets the mist render identically offline and online.
 */
export function getMistTexture(): THREE.Texture {
  if (cached) return cached;

  const size = 256;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d')!;

  const gradient = ctx.createRadialGradient(
    size / 2,
    size / 2,
    0,
    size / 2,
    size / 2,
    size / 2
  );
  gradient.addColorStop(0, 'rgba(255,255,255,0.9)');
  gradient.addColorStop(0.4, 'rgba(255,255,255,0.35)');
  gradient.addColorStop(1, 'rgba(255,255,255,0)');

  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, size, size);

  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  cached = texture;
  return texture;
}
