import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { getMistTexture } from '@/utils/mistTexture';

interface Wisp {
  basePos: THREE.Vector3;
  speed: number;
  phase: number;
  scale: number;
  color: string;
}

/**
 * Slow-drifting fragrance mist built from soft, procedurally-generated
 * sprite billboards (see utils/mistTexture.ts) — no external texture files,
 * no CDN fetches, no bundled PNGs. Works identically online or fully offline.
 */
export function Mist() {
  const texture = getMistTexture();
  const group = useRef<THREE.Group>(null);
  const refs = useRef<(THREE.Sprite | null)[]>([]);

  const wisps = useMemo<Wisp[]>(
    () => [
      { basePos: new THREE.Vector3(0, -0.4, -1), speed: 0.12, phase: 0, scale: 2.6, color: '#D6B77C' },
      { basePos: new THREE.Vector3(0.7, 0.4, -0.6), speed: 0.09, phase: 1.4, scale: 2.1, color: '#F7F2E8' },
      { basePos: new THREE.Vector3(-0.8, -0.8, 0.3), speed: 0.15, phase: 2.8, scale: 1.9, color: '#BFA06A' },
      { basePos: new THREE.Vector3(-0.4, 0.7, 0.2), speed: 0.1, phase: 4.1, scale: 1.7, color: '#E8DED0' },
      { basePos: new THREE.Vector3(0.5, -0.9, 0.6), speed: 0.13, phase: 5.3, scale: 1.6, color: '#3A2C25' },
    ],
    []
  );

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (group.current) {
      group.current.rotation.y = Math.sin(t * 0.05) * 0.08;
    }
    wisps.forEach((w, i) => {
      const sprite = refs.current[i];
      if (!sprite) return;
      sprite.position.set(
        w.basePos.x + Math.sin(t * w.speed + w.phase) * 0.5,
        w.basePos.y + Math.cos(t * w.speed * 0.8 + w.phase) * 0.3,
        w.basePos.z + Math.sin(t * w.speed * 0.6 + w.phase) * 0.4
      );
    });
  });

  return (
    <group ref={group}>
      {wisps.map((w, i) => (
        <sprite
          key={i}
          ref={(el) => (refs.current[i] = el)}
          position={w.basePos}
          scale={[w.scale, w.scale, 1]}
        >
          <spriteMaterial
            map={texture}
            color={w.color}
            transparent
            opacity={0.16}
            depthWrite={false}
            blending={THREE.AdditiveBlending}
          />
        </sprite>
      ))}
    </group>
  );
}
