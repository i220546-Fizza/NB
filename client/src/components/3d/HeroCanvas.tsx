import { Suspense, useRef, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { ContactShadows, Sparkles } from '@react-three/drei';
import { PerfumeBottle } from './PerfumeBottle';
import { Mist } from './Mist';
import { ProceduralEnvironment } from './ProceduralEnvironment';

function Loader3D() {
  return null;
}

export default function HeroCanvas() {
  const [pointer, setPointer] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const y = ((e.clientY - rect.top) / rect.height) * 2 - 1;
    setPointer({ x, y });
  };

  return (
    <div ref={containerRef} onPointerMove={handlePointerMove} className="h-full w-full">
      <Canvas
        shadows
        dpr={[1, 1.6]}
        camera={{ position: [0, 0.15, 5.6], fov: 30 }}
        gl={{ antialias: true, alpha: true }}
      >
        <color attach="background" args={['#0D0B0A']} />
        <fog attach="fog" args={['#0D0B0A', 6, 12]} />
        <ambientLight intensity={0.25} />
        <spotLight
          position={[3, 5, 4]}
          angle={0.35}
          penumbra={0.8}
          intensity={2.2}
          color="#F7F2E8"
          castShadow
        />
        <pointLight position={[-3, -1, 2]} intensity={0.6} color="#D6B77C" />

        <Suspense fallback={<Loader3D />}>
          <ProceduralEnvironment />
          <PerfumeBottle pointer={pointer} rotationSpeed={0.18} />
          <Mist />
          <Sparkles count={60} scale={[6, 4, 4]} size={1.4} speed={0.15} color="#E8DED0" opacity={0.35} />
          <ContactShadows
            position={[0, -1.35, 0]}
            opacity={0.55}
            scale={6}
            blur={2.8}
            far={2}
            color="#000000"
          />
        </Suspense>
      </Canvas>
    </div>
  );
}
