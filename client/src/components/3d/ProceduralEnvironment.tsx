import { Environment, Lightformer } from '@react-three/drei';

/**
 * Builds a fully procedural studio lighting environment for the glass/gold
 * materials to reflect — no HDRI files or network fetches required.
 */
export function ProceduralEnvironment() {
  return (
    <Environment resolution={256}>
      <group>
        <Lightformer
          form="rect"
          intensity={2.2}
          color="#F7F2E8"
          position={[0, 4, -4]}
          scale={[6, 3, 1]}
        />
        <Lightformer
          form="rect"
          intensity={1.4}
          color="#D6B77C"
          position={[-4, 1, 2]}
          scale={[3, 4, 1]}
          rotation={[0, Math.PI / 4, 0]}
        />
        <Lightformer
          form="rect"
          intensity={1.1}
          color="#BFA06A"
          position={[4, -1, 2]}
          scale={[3, 4, 1]}
          rotation={[0, -Math.PI / 4, 0]}
        />
        <Lightformer
          form="ring"
          intensity={1.8}
          color="#ffffff"
          position={[0, 2, 3]}
          scale={2}
        />
      </group>
    </Environment>
  );
}
