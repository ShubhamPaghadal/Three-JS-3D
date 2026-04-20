'use client';

import { useState, useEffect } from 'react';
import { X, ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';
import { useSceneStore } from '../../store/useSceneStore';
import { clsx } from 'clsx';

const GALLERY_IMAGES = [
  'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&q=80&w=1200',
  'https://images.unsplash.com/photo-1600585154340-be6191dae10c?auto=format&fit=crop&q=80&w=1200',
  'https://images.unsplash.com/photo-1600607687940-47a04b697a33?auto=format&fit=crop&q=80&w=1200',
  'https://images.unsplash.com/photo-1600566753190-17f0bb2a6c3e?auto=format&fit=crop&q=80&w=1200',
  'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80&w=1200',
  'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&q=80&w=1200',
  'https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?auto=format&fit=crop&q=80&w=1200',
  'https://images.unsplash.com/photo-1600607687644-c7171b42498b?auto=format&fit=crop&q=80&w=1200',
];

export const Gallery = () => {
  const { isGalleryOpen, setGalleryOpen } = useSceneStore();
  const [previewIndex, setPreviewIndex] = useState<number | null>(null);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isGalleryOpen) return;

      if (e.key === 'Escape') {
        if (previewIndex !== null) setPreviewIndex(null);
        else setGalleryOpen(false);
      }

      if (previewIndex !== null) {
        if (e.key === 'ArrowLeft') handlePrev();
        if (e.key === 'ArrowRight') handleNext();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isGalleryOpen, previewIndex]);

  const handlePrev = () => {
    setPreviewIndex((prev) =>
      prev === null ? null : prev === 0 ? GALLERY_IMAGES.length - 1 : prev - 1
    );
  };

  const handleNext = () => {
    setPreviewIndex((prev) =>
      prev === null ? null : prev === GALLERY_IMAGES.length - 1 ? 0 : prev + 1
    );
  };

  if (!isGalleryOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 animate-in fade-in duration-300">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/95 backdrop-blur-sm"
        onClick={() => setGalleryOpen(false)}
      />

      {/* Gallery Modal */}
      <div className="relative w-full max-w-6xl max-h-[90vh] bg-zinc-900 rounded-[2.5rem] border border-white/10 shadow-2xl flex flex-col overflow-hidden pointer-events-auto">

        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/5">
          <div className="flex flex-col">
            <h2 className="text-xl font-black text-white tracking-tight">PROJECT GALLERY</h2>
            <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-[0.2em]">Visual Experience</p>
          </div>
          <button
            onClick={() => setGalleryOpen(false)}
            className="h-10 w-10 bg-white/5 hover:bg-white/10 text-white rounded-full flex items-center justify-center transition-colors border border-white/10 cursor-pointer"
          >
            <X size={20} />
          </button>
        </div>

        {/* Grid View */}
        <div className="flex-1 overflow-y-auto p-6 scrollbar-hide">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {GALLERY_IMAGES.map((src, index) => (
              <div
                key={index}
                className="group relative aspect-[4/3] rounded-2xl overflow-hidden cursor-pointer bg-zinc-800"
                onClick={() => setPreviewIndex(index)}
              >
                <img
                  src={src}
                  alt={`Gallery item ${index + 1}`}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <div className="h-10 w-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white scale-75 group-hover:scale-100 transition-transform duration-500">
                    <Maximize2 size={20} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 text-center border-t border-white/5">
          <p className="text-[10px] font-bold text-zinc-600 uppercase tracking-[0.3em]">
            {GALLERY_IMAGES.length} Images Total
          </p>
        </div>
      </div>

      {/* Full Preview Slider Overlay */}
      {previewIndex !== null && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center animate-in fade-in zoom-in-95 duration-300">
          <div
            className="absolute inset-0 bg-black/98"
            onClick={() => setPreviewIndex(null)}
          />

          {/* Main Preview Image */}
          <div className="relative w-full h-full flex items-center justify-center p-4">
            <button
              onClick={() => setPreviewIndex(null)}
              className="absolute top-6 right-6 z-[70] h-12 w-12 bg-white/5 hover:bg-white/10 text-white rounded-full flex items-center justify-center transition-colors border border-white/10 backdrop-blur-md cursor-pointer"
            >
              <X size={24} />
            </button>

            <button
              onClick={(e) => { e.stopPropagation(); handlePrev(); }}
              className="absolute left-6 z-[70] h-14 w-14 bg-white/5 hover:bg-white/10 text-white rounded-full flex items-center justify-center transition-colors border border-white/10 backdrop-blur-md cursor-pointer"
            >
              <ChevronLeft size={32} />
            </button>

            <div className="relative w-full max-w-5xl aspect-video rounded-3xl overflow-hidden shadow-2xl border border-white/10">
              <img
                src={GALLERY_IMAGES[previewIndex]}
                alt="Full Preview"
                className="w-full h-full object-cover animate-in fade-in slide-in-from-right-20 duration-500"
                key={previewIndex} // Key to trigger animation on change
              />

              {/* Image Info Overlay */}
              <div className="absolute bottom-0 inset-x-0 p-8 bg-gradient-to-t from-black/80 to-transparent">
                <div className="flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="text-blue-500 text-xs font-black tracking-widest uppercase">Solace View</span>
                    <h3 className="text-2xl font-black text-white">Project Highlight {previewIndex + 1}</h3>
                  </div>
                  <div className="px-4 py-1 bg-white/10 backdrop-blur-md border border-white/10 rounded-full">
                    <span className="text-xs font-bold text-white tracking-widest">
                      {previewIndex + 1} / {GALLERY_IMAGES.length}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <button
              onClick={(e) => { e.stopPropagation(); handleNext(); }}
              className="absolute right-6 z-[70] h-14 w-14 bg-white/5 hover:bg-white/10 text-white rounded-full flex items-center justify-center transition-colors border border-white/10 backdrop-blur-md cursor-pointer"
            >
              <ChevronRight size={32} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
