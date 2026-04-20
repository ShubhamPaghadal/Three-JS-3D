'use client';

import { Canvas } from '@react-three/fiber';
import { Experience } from '../components/3d/Experience';
import { Overlay } from '../components/ui/Overlay';
import { Gallery } from '../components/ui/Gallery';
import { Suspense, useEffect, useState } from 'react';
import { Loader } from '@react-three/drei';
import { Leva } from 'leva';

export default function Home() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <main className="relative h-screen w-full overflow-hidden bg-zinc-100 dark:bg-zinc-50">
      {/* 3D Scene */}
      <div className="absolute inset-0 h-full w-full">
        <Canvas
          shadows
          camera={{ position: [0, 20, 20], fov: 45 }}
        >
          <Suspense fallback={null}>
            <Experience />
          </Suspense>
        </Canvas>
      </div>

      {/* UI Layers */}
      <Overlay />
      <Gallery />

      {/* Fallback Loader */}
      <Loader 
        containerStyles={{ background: '#09090b' }}
        innerStyles={{ background: '#27272a' }}
        barStyles={{ background: '#3b82f6' }}
        dataStyles={{ color: '#f4f4f5', fontFamily: 'sans-serif' }}
      />

      {/* Dev Tools */}
      <Leva collapsed />
    </main>
  );
}
