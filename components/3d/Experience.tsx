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

// Detailed Mock Data for Solace Layout
const MOCK_PLOTS: PlotData[] = [];

// 1. Top Row (198-225)
for (let i = 0; i < 28; i++) {
  MOCK_PLOTS.push({
    id: `p${198 + i}`,
    number: `${198 + i}`,
    status: (i + 198) % 7 === 0 ? 'booked' : (i + 198) % 11 === 0 ? 'on-hold' : 'available',
    areaSqft: 1500,
    areaSqm: 139,
    position: [-16 + i * 1.5, 0, -12],
    points: []
  });
}

// 2. Bottom Main Row (27-1)
for (let i = 0; i < 27; i++) {
  MOCK_PLOTS.push({
    id: `p${27 - i}`,
    number: `${27 - i}`,
    status: (27 - i) % 5 === 0 ? 'booked' : 'available',
    areaSqft: 1800,
    areaSqm: 167,
    position: [18 - i * 1.4, 0, 14],
    points: []
  });
}

// 3. Left Block (121-134, etc.)
for (let i = 0; i < 7; i++) {
  // Column 1
  MOCK_PLOTS.push({
    id: `p${121 + i}`,
    number: `${121 + i}`,
    status: 'available',
    areaSqft: 1800,
    areaSqm: 167,
    position: [-17, 0, -7 + i * 2.2],
    points: []
  });
  // Column 2
  MOCK_PLOTS.push({
    id: `p${122 + i}`, // Simplified numbering logic for mock
    number: `${122 + i + 10}`,
    status: 'available',
    areaSqft: 1800,
    areaSqm: 167,
    position: [-14, 0, -7 + i * 2.2],
    points: []
  });
}

// 4. Middle Internal Blocks
for (let i = 0; i < 5; i++) {
  MOCK_PLOTS.push({
    id: `p${145 + i}`,
    number: `${145 + i}`,
    status: i === 2 ? 'booked' : 'available',
    areaSqft: 1800,
    areaSqm: 167,
    position: [-10, 0, -5 + i * 2.2],
    points: []
  });
}

// 5. Common Plot (Special Green Plot)
MOCK_PLOTS.push({
  id: 'common-1',
  number: 'COMMON PLOT',
  status: 'available',
  areaSqft: 5000,
  areaSqm: 464,
  position: [-7, 0, 4],
  points: []
});

// 6. Right Block (236-244, 251-244, etc.)
for (let i = 0; i < 8; i++) {
  MOCK_PLOTS.push({
    id: `p${236 + i}`,
    number: `${236 + i}`,
    status: 'available',
    areaSqft: 2000,
    areaSqm: 185,
    position: [14, 0, -5 + i * 2],
    points: []
  });
  MOCK_PLOTS.push({
    id: `p${251 + i}`,
    number: `${251 + i}`,
    status: 'available',
    areaSqft: 2000,
    areaSqm: 185,
    position: [17, 0, -5 + i * 2],
    points: []
  });
}

// 7. Extreme Bottom Left (108-87)
for (let i = 0; i < 22; i++) {
  MOCK_PLOTS.push({
    id: `p${108 - i}`,
    number: `${108 - i}`,
    status: 'available',
    areaSqft: 1200,
    areaSqm: 111,
    position: [-22 + i * 1.2, 0, 8],
    points: []
  });
}

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
        position={[0, -0.01, 0]}
        opacity={0.4}
        scale={60}
        blur={2}
        far={5}
      />
    </>
  );
};
