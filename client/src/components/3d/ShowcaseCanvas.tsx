import { Suspense, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { ContactShadows, Sparkles } from '@react-three/drei';
import * as THREE from 'three';
import { PerfumeBottle } from './PerfumeBottle';
import { Mist } from './Mist';
import { ProceduralEnvironment } from './ProceduralEnvironment';

function ScrollRig({ progressRef }: { progressRef: React.MutableRefObject<number> }) {
  const group = useRef<THREE.Group>(null);
  useFrame(() => {
    if (!group.current) return;
    group.current.rotation.y = progressRef.current * Math.PI * 2.4;
  });
  return (
    <group ref={group}>
      <PerfumeBottle autoRotate={false} liquidColor="#3A2C25" scale={1.4} />
    </group>
  );
}

export default function ShowcaseCanvas({
  progressRef,
}: {
  progressRef: React.MutableRefObject<number>;
}) {
  return (
    <Canvas
      shadows
      dpr={[1, 1.6]}
      camera={{ position: [0, 0.2, 7], fov: 26 }}
      gl={{ antialias: true, alpha: true }}
    >
      <color attach="background" args={['#0D0B0A']} />
      <ambientLight intensity={0.25} />
      <spotLight position={[3, 5, 4]} angle={0.35} penumbra={0.85} intensity={2.4} color="#F7F2E8" castShadow />
      <pointLight position={[-4, -1, 2]} intensity={0.6} color="#D6B77C" />
      <pointLight position={[0, 0, 4]} intensity={0.4} color="#BFA06A" />

      <Suspense fallback={null}>
        <ProceduralEnvironment />
        <ScrollRig progressRef={progressRef} />
        <Mist />
        <Sparkles count={90} scale={[7, 5, 5]} size={1.6} speed={0.12} color="#E8DED0" opacity={0.35} />
        <ContactShadows position={[0, -1.9, 0]} opacity={0.5} scale={8} blur={3} far={2.5} />
      </Suspense>
    </Canvas>
  );
}
