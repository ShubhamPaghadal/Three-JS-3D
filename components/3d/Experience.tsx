'use client';

import {
  ContactShadows,
  Environment,
  OrbitControls,
  PerspectiveCamera,
  Grid
} from '@react-three/drei';
import { Plot } from './Plot';
import { CameraHandler } from './CameraHandler';
import { Roads, CentralGreen, Tree } from './Environment';
import { PlotData } from '../../types/scene';
import { useSceneStore } from '../../store/useSceneStore';
import { MOCK_PLOTS } from '../../data/mockData';

export const Experience = () => {
  const { viewMode } = useSceneStore();
  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 30, 30]} fov={35} />
      <OrbitControls
        enableDamping
        dampingFactor={0.05}
        maxPolarAngle={Math.PI / 2.2}
        minDistance={10}
        maxDistance={60}
        makeDefault
      />

      <CameraHandler />

      <color attach="background" args={[viewMode === 'map' ? '#1f2937' : '#1a1a1a']} />

      <ambientLight intensity={viewMode === 'map' ? 1.5 : 1} />
      <directionalLight
        position={[20, 20, 10]}
        intensity={viewMode === 'map' ? 2 : 1.5}
        castShadow
      />

      {/* Infrastructure */}
      <Roads visible={viewMode !== 'map'} />
      <CentralGreen visible={viewMode !== 'map'} />
      
      {/* Map View Satellite Image */}
      {viewMode === 'map' && (
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.2, 0]}>
          <planeGeometry args={[100, 100]} />
          <meshStandardMaterial 
            color="#555"
            roughness={0.8}
            metalness={0.1}
          />
          {/* In a production environment, you would use useTexture from @react-three/drei */}
          {/* to load a real satellite tile here */}
        </mesh>
      )}

      {/* Plots */}
      <group>
        {MOCK_PLOTS.map((plot) => (
          <Plot key={plot.id} data={plot} />
        ))}
      </group>

      {/* Decoration */}
      {viewMode !== 'map' && (
        <>
          <Tree position={[-6, 0, -12]} />
          <Tree position={[6, 0, -12]} />
          <Tree position={[-6, 0, -8]} />
          <Tree position={[6, 0, -8]} />
        </>
      )}

      {/* Ground */}
      {viewMode !== 'map' && (
        <Grid
          position={[0, -0.05, 0]}
          infiniteGrid
          fadeDistance={50}
          fadeStrength={5}
          sectionSize={5}
          cellSize={1}
          sectionColor="#334155"
          cellColor="#1e293b"
        />
      )}

      <ContactShadows
        position={[0, -0.02, 0]}
        opacity={0.4}
        scale={60}
        blur={2}
        far={5}
      />
    </>
  );
};
