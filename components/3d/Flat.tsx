'use client';

import { useCursor } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useRef, useState } from 'react';
import * as THREE from 'three';
import { useSceneStore } from '../../store/useSceneStore';
import { FlatData } from '../../types/scene';

interface FlatProps {
  data: FlatData;
  position: [number, number, number];
  size: [number, number, number];
}

export const Flat = ({ data, position, size }: FlatProps) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  const { selectFlat, setHoveredItem, selectedFlat } = useSceneStore();
  
  useCursor(hovered);

  const isSelected = selectedFlat === data.id;
  
  // Color based on status
  const getStatusColor = () => {
    if (isSelected) return '#3b82f6'; // Blue
    if (data.status === 'available') return hovered ? '#22c55e' : '#10b981';
    if (data.status === 'reserved') return '#f59e0b';
    return '#ef4444';
  };

  return (
    <mesh
      ref={meshRef}
      position={position}
      onPointerOver={(e) => {
        e.stopPropagation();
        setHovered(true);
        setHoveredItem(data.id);
      }}
      onPointerOut={() => {
        setHovered(false);
        setHoveredItem(null);
      }}
      onClick={(e) => {
        e.stopPropagation();
        selectFlat(data.id);
      }}
    >
      <boxGeometry args={size} />
      <meshStandardMaterial 
        color={getStatusColor()} 
        transparent 
        opacity={isSelected ? 0.9 : 0.6}
        roughness={0.2}
        metalness={0.8}
      />
    </mesh>
  );
};
