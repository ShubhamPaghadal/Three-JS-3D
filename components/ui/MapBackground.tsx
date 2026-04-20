'use client';

import { useSceneStore } from '../../store/useSceneStore';
import { clsx } from 'clsx';
import { Minus, Plus, Layers, Navigation2 } from 'lucide-react';

export const MapBackground = () => {
  const { viewMode } = useSceneStore();

  if (viewMode !== 'map') return null;

  return (
    <div className="absolute inset-0 z-0 animate-in fade-in duration-700">
      {/* Third Party Map Provider Overlay (Satellite) */}
      <div 
        className="absolute inset-0 w-full h-full bg-[#1a1a1a]"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=2500&auto=format&fit=crop')`,
          backgroundSize: '150% 150%',
          backgroundPosition: 'center',
          filter: 'brightness(0.8) contrast(1.2)'
        }}
      />
      
      {/* Mock Map UI Elements to simulate a real Third-Party Library (like Google Maps) */}
      <div className="absolute bottom-20 left-6 z-10 flex flex-col gap-2 pointer-events-auto">
        <div className="flex flex-col bg-white rounded-lg shadow-xl overflow-hidden border border-zinc-200">
          <button className="p-2 hover:bg-zinc-100 transition-colors border-b border-zinc-200">
            <Plus size={20} className="text-zinc-600" />
          </button>
          <button className="p-2 hover:bg-zinc-100 transition-colors">
            <Minus size={20} className="text-zinc-600" />
          </button>
        </div>
        <button className="bg-white p-2 rounded-lg shadow-xl border border-zinc-200 hover:bg-zinc-100 transition-colors">
          <Navigation2 size={20} className="text-blue-600 rotate-45" />
        </button>
      </div>

      <div className="absolute top-24 right-6 z-10 flex flex-col gap-3 pointer-events-auto">
        <button className="bg-white/90 backdrop-blur-md p-3 rounded-xl shadow-2xl border border-white/20 flex items-center gap-3 hover:bg-white transition-all">
          <Layers size={18} className="text-zinc-700" />
          <span className="text-xs font-bold text-zinc-800 uppercase tracking-widest">Satellite</span>
        </button>
      </div>

      {/* Google Maps style attribution */}
      <div className="absolute bottom-2 left-2 z-10 flex items-center gap-2 pointer-events-none">
        <div className="px-2 py-0.5 bg-black/40 backdrop-blur-sm rounded text-[9px] text-white/70">
          Google
        </div>
        <div className="text-[9px] text-white/50">
          Map data ©2026 Solace Imagery
        </div>
      </div>
    </div>
  );
};
