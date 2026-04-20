'use client';

import { useThree } from '@react-three/fiber';
import gsap from 'gsap';
import { useEffect } from 'react';
import { useSceneStore } from '../../store/useSceneStore';
import * as THREE from 'three';

export const CameraHandler = () => {
  const { camera, controls } = useThree() as any;
  const { viewMode, selectedPlotId } = useSceneStore();

  useEffect(() => {
    if (!camera || !controls) return;

    let targetPos = new THREE.Vector3(0, 20, 20);
    let targetLookAt = new THREE.Vector3(0, 0, 0);

    // 1. Handle View Mode (2D vs 3D vs Map)
    if (viewMode === '2d') {
      targetPos.set(0, 25, 0.1); // Top down
      targetLookAt.set(0, 0, 0);
    } else if (viewMode === 'map') {
      targetPos.set(0, 35, 0.1); // Higher Top down for Map
      targetLookAt.set(0, 0, 0);
    } else {
      targetPos.set(0, 15, 20); // Perspective
      targetLookAt.set(0, 0, 0);
    }

    // 2. Handle Selection (Zoom into plot)
    if (selectedPlotId) {
      // For this boilerplate, we'd ideally find the plot's position from data
      // But we can also use the store to store selectedPlotPosition if needed.
      // For now, let's assume we can calculate it or just use a placeholder zoom.
      // Ideally, we'd pass the position in the selectPlot action.
    }

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
