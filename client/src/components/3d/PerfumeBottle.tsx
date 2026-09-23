import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import {
  MeshTransmissionMaterial,
  RoundedBox,
  Cylinder,
  Sparkles,
} from '@react-three/drei';
import * as THREE from 'three';

interface PerfumeBottleProps {
  liquidColor?: string;
  autoRotate?: boolean;
  rotationSpeed?: number;
  pointer?: { x: number; y: number };
  scale?: number;
}

/**
 * A procedurally-built luxury perfume bottle. No external 3D model files are
 * required: the silhouette is composed from primitives, and realism comes
 * from MeshTransmissionMaterial (glass) + metalness (cap) + a procedural
 * Lightformer environment supplied by the parent <Scene>.
 */
export function PerfumeBottle({
  liquidColor = '#3A2C25',
  autoRotate = true,
  rotationSpeed = 0.15,
  pointer,
  scale = 1,
}: PerfumeBottleProps) {
  const group = useRef<THREE.Group>(null);
  const liquidRef = useRef<THREE.Mesh>(null);

  const bottleGeom = useMemo(() => new THREE.CylinderGeometry(0.72, 0.62, 1.9, 48, 8, false), []);

  useFrame((_, delta) => {
    if (!group.current) return;
    if (autoRotate) {
      group.current.rotation.y += delta * rotationSpeed;
    }
    if (pointer) {
      const targetX = pointer.y * 0.15;
      const targetZ = -pointer.x * 0.12;
      group.current.rotation.x += (targetX - group.current.rotation.x) * 0.04;
      group.current.rotation.z += (targetZ - group.current.rotation.z) * 0.04;
    }
    if (liquidRef.current) {
      liquidRef.current.rotation.y -= delta * 0.08;
    }
  });

  return (
    <group ref={group} scale={scale} dispose={null}>
      {/* Cap */}
      <RoundedBox args={[0.62, 0.5, 0.62]} radius={0.06} smoothness={4} position={[0, 1.55, 0]}>
        <meshStandardMaterial color="#D6B77C" metalness={1} roughness={0.22} />
      </RoundedBox>
      <RoundedBox args={[0.46, 0.16, 0.46]} radius={0.04} smoothness={4} position={[0, 1.22, 0]}>
        <meshStandardMaterial color="#BFA06A" metalness={1} roughness={0.3} />
      </RoundedBox>

      {/* Neck */}
      <Cylinder args={[0.22, 0.24, 0.4, 32]} position={[0, 0.98, 0]}>
        <meshPhysicalMaterial
          color="#ffffff"
          transmission={1}
          roughness={0.05}
          thickness={0.3}
          ior={1.5}
        />
      </Cylinder>

      {/* Body - glass */}
      <mesh geometry={bottleGeom} position={[0, -0.05, 0]} castShadow receiveShadow>
        <MeshTransmissionMaterial
          samples={6}
          resolution={512}
          thickness={0.55}
          roughness={0.06}
          transmission={1}
          ior={1.5}
          chromaticAberration={0.03}
          anisotropy={0.15}
          distortion={0.08}
          distortionScale={0.2}
          temporalDistortion={0.05}
          color="#F7F2E8"
          attenuationColor="#E8DED0"
          attenuationDistance={1.2}
        />
      </mesh>

      {/* Liquid */}
      <mesh ref={liquidRef} position={[0, -0.35, 0]}>
        <cylinderGeometry args={[0.62, 0.55, 1.05, 48]} />
        <meshPhysicalMaterial
          color={liquidColor}
          transmission={0.65}
          roughness={0.15}
          thickness={0.8}
          ior={1.35}
          attenuationColor={liquidColor}
          attenuationDistance={0.6}
        />
      </mesh>

      {/* Gold label band */}
      <Cylinder args={[0.735, 0.735, 0.32, 48, 1, true]} position={[0, -0.2, 0]}>
        <meshStandardMaterial
          color="#0D0B0A"
          metalness={0.4}
          roughness={0.4}
          transparent
          opacity={0.85}
          side={THREE.DoubleSide}
        />
      </Cylinder>

      {/* Ambient dust caught in the light around the bottle */}
      <Sparkles count={40} scale={[2.2, 3, 2.2]} size={2} speed={0.25} color="#D6B77C" opacity={0.6} />
    </group>
  );
}
