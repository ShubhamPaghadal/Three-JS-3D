'use client';

import { useCursor } from '@react-three/drei';
import { useState } from 'react';
import { useSceneStore } from '../../store/useSceneStore';
import { BuildingData } from '../../types/scene';
import { Floor } from './Floor';

interface BuildingProps {
  data: BuildingData;
}

export const Building = ({ data }: BuildingProps) => {
  const [hovered, setHovered] = useState(false);
  const { selectBuilding, selectedBuilding, view } = useSceneStore();
  
  useCursor(hovered && view === 'world');

  const isSelected = selectedBuilding === data.id;

  return (
    <group 
      position={data.position}
      onClick={(e) => {
        if (view === 'world') {
          e.stopPropagation();
          selectBuilding(data.id);
        }
      }}
      onPointerOver={(e) => {
        if (view === 'world') {
          e.stopPropagation();
          setHovered(true);
        }
      }}
      onPointerOut={() => setHovered(false)}
    >
      {/* Building Base / Glass Shell */}
      <mesh position={[0, (data.floors.length * 1) / 2, 0]}>
        <boxGeometry args={[4.5, data.floors.length * 1 + 0.5, 6.5]} />
        <meshStandardMaterial 
          color={isSelected ? "#3b82f6" : "#ffffff"} 
          transparent 
          opacity={0.15} 
          roughness={0}
          metalness={1}
        />
      </mesh>

      {/* Floors */}
      {data.floors.map((floor, index) => (
        <Floor 
          key={floor.id} 
          data={floor} 
          position={[0, index * 1 + 0.5, 0]} 
        />
      ))}
    </group>
  );
};
