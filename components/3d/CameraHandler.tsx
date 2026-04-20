'use client';

import { useThree } from '@react-three/fiber';
import gsap from 'gsap';
import { useEffect } from 'react';
import { useSceneStore } from '../../store/useSceneStore';
import * as THREE from 'three';

import { MOCK_PLOTS } from '../../data/mockData';

export const CameraHandler = () => {
  const { camera, controls } = useThree() as any;
  const { viewMode, selectedPlotId } = useSceneStore();

  useEffect(() => {
    if (!camera || !controls) return;

    let targetPos = new THREE.Vector3(0, 20, 20);
    let targetLookAt = new THREE.Vector3(0, 0, 0);

    // 1. Handle Selection (Highest Priority)
    if (selectedPlotId) {
      const plot = MOCK_PLOTS.find(p => p.id === selectedPlotId);
      if (plot) {
        const [x, y, z] = plot.position;
        targetLookAt.set(x, y, z);
        
        if (viewMode === '3d') {
          targetPos.set(x, 8, z + 12);
        } else {
          targetPos.set(x, 15, z + 0.1);
        }
        
        // Animate Camera
        gsap.to(camera.position, {
          x: targetPos.x,
          y: targetPos.y,
          z: targetPos.z,
          duration: 1.5,
          ease: 'power3.inOut',
        });

        gsap.to(controls.target, {
          x: targetLookAt.x,
          y: targetLookAt.y,
          z: targetLookAt.z,
          duration: 1.5,
          ease: 'power3.inOut',
          onUpdate: () => controls.update(),
        });
        
        return; // Skip the viewMode animations if selecting
      }
    }

    // 2. Handle View Mode (Default views)

    // Animate Camera
    gsap.to(camera.position, {
      x: targetPos.x,
      y: targetPos.y,
      z: targetPos.z,
      duration: 1.2,
      ease: 'power2.inOut',
    });

    // Animate Controls Target
    gsap.to(controls.target, {
      x: targetLookAt.x,
      y: targetLookAt.y,
      z: targetLookAt.z,
      duration: 1.2,
      ease: 'power2.inOut',
      onUpdate: () => controls.update(),
    });

  }, [viewMode, selectedPlotId, camera, controls]);

  return null;
};
