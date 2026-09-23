import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { ContactShadows, OrbitControls } from '@react-three/drei';
import { PerfumeBottle } from './PerfumeBottle';
import { Mist } from './Mist';
import { ProceduralEnvironment } from './ProceduralEnvironment';

export default function ProductCanvas({ liquidColor }: { liquidColor: string }) {
  return (
    <Canvas
      shadows
      dpr={[1, 1.6]}
      camera={{ position: [0, 0.1, 5.3], fov: 28 }}
      gl={{ antialias: true, alpha: true }}
    >
      <color attach="background" args={['#0D0B0A']} />
      <ambientLight intensity={0.3} />
      <spotLight position={[3, 5, 4]} angle={0.35} penumbra={0.8} intensity={2} color="#F7F2E8" castShadow />
      <pointLight position={[-3, -1, 2]} intensity={0.5} color="#D6B77C" />

      <Suspense fallback={null}>
        <ProceduralEnvironment />
        <PerfumeBottle liquidColor={liquidColor} autoRotate rotationSpeed={0.06} />
        <Mist />
        <ContactShadows position={[0, -1.35, 0]} opacity={0.5} scale={6} blur={2.8} far={2} />
      </Suspense>

      <OrbitControls
        enableZoom={false}
        enablePan={false}
        minPolarAngle={Math.PI / 2.6}
        maxPolarAngle={Math.PI / 1.8}
        rotateSpeed={0.5}
      />
    </Canvas>
  );
}
