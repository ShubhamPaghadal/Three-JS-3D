'use client';

import { useCursor, Text, Edges } from '@react-three/drei';
import { useRef, useState } from 'react';
import * as THREE from 'three';
import { useSceneStore } from '../../store/useSceneStore';
import { PlotData } from '../../types/scene';

interface PlotProps {
  data: PlotData;
}

export const Plot = ({ data }: PlotProps) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const { 
    selectedPlotId, 
    selectPlot, 
    hoveredPlotId, 
    setHoveredPlot, 
    isStatusVisible,
    viewMode
  } = useSceneStore();

  const isSelected = selectedPlotId === data.id;
  const isHovered = hoveredPlotId === data.id;

  useCursor(isHovered);

  const getStatusColor = () => {
    if (viewMode === 'map') return '#00f2ff'; // Cyan Overlay for Map View
    if (data.number.includes('COMMON')) return '#84cc16'; 
    if (isSelected) return '#3b82f6';
    if (!isStatusVisible) return '#fcfaf2';

    switch (data.status) {
      case 'available': return '#84cc16';
      case 'booked': return '#ef4444';
      case 'on-hold': return '#f59e0b';
      case 'no-info': return '#94a3b8';
      default: return '#fcfaf2';
    }
  };

  return (
    <group position={data.position}>
      <mesh
        ref={meshRef}
        rotation={[-Math.PI / 2, 0, 0]}
        onPointerOver={(e) => {
          e.stopPropagation();
          setHoveredPlot(data.id);
        }}
        onPointerOut={() => setHoveredPlot(null)}
        onClick={(e) => {
          e.stopPropagation();
          selectPlot(isSelected ? null : data.id);
        }}
      >
        <planeGeometry args={[1.3, 2]} />
        <meshStandardMaterial
          color={getStatusColor()}
          transparent
          opacity={viewMode === 'map' ? (isSelected ? 0.7 : 0.3) : (isSelected ? 1 : 0.95)}
          emissive={isSelected ? (viewMode === 'map' ? '#00f2ff' : '#3b82f6') : '#000000'}
          emissiveIntensity={isSelected ? 0.5 : 0}
          polygonOffset
          polygonOffsetFactor={1}
          polygonOffsetUnits={1}
        />

        {/* Subtle Border for all plots */}
        <Edges
          threshold={15}
          color="#333333"
          opacity={0.3}
          transparent
        />

        {/* Selection Outline - White Dashed style */}
        {isSelected && (
          <Edges
            threshold={15}
            color="white"
            scale={1.05}
          />
        )}
      </mesh>

      {/* Plot Number - oriented for readability */}
      <Text
        position={[0, 0.1, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
        fontSize={0.25}
        color={viewMode === 'map' ? "white" : "#374151"}
        anchorX="center"
        anchorY="middle"
        maxWidth={1}
        textAlign="center"
      >
        {data.number}
      </Text>

      {/* Selected Data Overlay (Area) */}
      {isSelected && (
        <group position={[0, 0.1, 0.5]}>
          <Text
            rotation={[-Math.PI / 2, 0, 0]}
            fontSize={0.25}
            color="white"
            anchorX="center"
            fontWeight="bold"
          >
            {`${data.areaSqft.toLocaleString()} ft²`}
          </Text>
        </group>
      )}
    </group>
  );
};
