'use client';

import { useSceneStore } from '../../store/useSceneStore';
import {
  Search,
  Map as MapIcon,
  Layers,
  Info,
  Image as ImageIcon,
  Compass,
  Share2,
  Box,
  Maximize2
} from 'lucide-react';
import { clsx } from 'clsx';
import { MOCK_PLOTS } from '../../data/mockData';

import { useState, useEffect } from 'react';
import { AlertCircle } from 'lucide-react';

export const Overlay = () => {
  const {
    viewMode,
    setViewMode,
    isStatusVisible,
    toggleStatus,
    selectedPlotId,
    selectPlot,
    searchQuery,
    setSearchQuery,
    setGalleryOpen
  } = useSceneStore();

  const [toast, setToast] = useState<string | null>(null);
  const [isInvalid, setIsInvalid] = useState(false);

  // Clear states when query changes
  useEffect(() => {
    if (isInvalid) setIsInvalid(false);
  }, [searchQuery]);

  const showToast = (message: string) => {
    setToast(message);
    setTimeout(() => setToast(null), 3000);
  };

  const validateAndSearch = (query: string) => {
    const trimmed = query.trim();
    if (!trimmed) return;

    // Check for invalid characters (only allow "Plot", numbers, and spaces)
    const isValidFormat = /^(plot\s*)?\d+$/i.test(trimmed);
    
    if (!isValidFormat) {
      setIsInvalid(true);
      showToast("Please enter a valid plot number");
      return;
    }

    // Extract the number
    const plotNum = trimmed.replace(/plot\s*/i, '');
    const foundPlot = MOCK_PLOTS.find(p => p.number === plotNum);

    if (!foundPlot) {
      setIsInvalid(true);
      showToast(`Plot ${plotNum} is not found`);
      return;
    }

    // Success
    setIsInvalid(false);
    selectPlot(foundPlot.id);
  };

  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      validateAndSearch(searchQuery);
    }
  };

  const handleLocate = () => {
    validateAndSearch(searchQuery);
  };

  return (
    <div className="pointer-events-none absolute inset-0 z-10 flex flex-col justify-between p-6 font-sans select-none overflow-hidden">

      {/* Top Left: Logo */}
      <div className="flex items-start justify-between w-full">
        <div className="pointer-events-auto flex flex-col">
          <h1 className="text-3xl font-black tracking-tighter text-white flex items-center gap-3">
            <div className="h-10 w-10 bg-white rounded-xl flex items-center justify-center shadow-lg">
              <div className="h-5 w-5 border-[3px] border-zinc-900 rotate-45" />
            </div>
            SOLACE
          </h1>
          <p className="text-[10px] font-bold tracking-[0.4em] text-zinc-400 mt-2 uppercase pl-1">
            Interactive Plotting
          </p>
        </div>

        {/* Top Right: Project Title */}
        <div className="pointer-events-auto bg-zinc-900/50 backdrop-blur-md border border-white/10 rounded-full px-6 py-2.5 shadow-2xl">
          <p className="text-xs font-bold text-white tracking-[0.1em]">
            SOLACE LIFESTYLE GARDENS
          </p>
        </div>
      </div>

      {/* Middle: Spacer */}
      <div className="flex-1" />

      {/* Bottom Row */}
      <div className="flex items-end justify-between w-full gap-8">

        {/* Right Side: Legend (Visible when Status is ON) */}
        {isStatusVisible && (
          <div className="pointer-events-auto absolute bottom-28 right-8 flex flex-col gap-3 bg-white/90 backdrop-blur-md p-6 rounded-[2rem] border border-zinc-200 shadow-xl min-w-[180px] animate-in fade-in slide-in-from-right-8 duration-500">
            <div className="flex items-center gap-3">
              <div className="h-3 w-3 rounded-full bg-amber-500 shadow-lg shadow-amber-500/20" />
              <span className="text-[11px] font-black text-zinc-700 uppercase tracking-widest">On Hold</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="h-3 w-3 rounded-full bg-rose-500 shadow-lg shadow-rose-500/20" />
              <span className="text-[11px] font-black text-zinc-700 uppercase tracking-widest">Booked</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="h-3 w-3 rounded-full bg-lime-500 shadow-lg shadow-lime-500/20" />
              <span className="text-[11px] font-black text-zinc-700 uppercase tracking-widest">Available</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="h-3 w-3 rounded-full bg-slate-400 shadow-lg shadow-slate-400/20" />
              <span className="text-[11px] font-black text-zinc-700 uppercase tracking-widest">No Info</span>
            </div>
          </div>
        )}

      {/* Right Side Toast Notification */}
      {toast && (
        <div className="absolute top-24 right-8 z-50 animate-in slide-in-from-right-8 duration-500">
          <div className="bg-red-500/90 backdrop-blur-md px-6 py-3 rounded-full shadow-2xl border border-red-400/50 flex items-center gap-3">
            <AlertCircle size={18} className="text-white" />
            <span className="text-sm font-bold text-white tracking-wide">{toast}</span>
          </div>
        </div>
      )}

      {/* Bottom Center: Search & Actions */}
      <div className="flex flex-col items-center gap-4 flex-1">
        <div className={clsx(
          "pointer-events-auto flex items-center gap-2 bg-zinc-900 p-2 rounded-full shadow-2xl border transition-all duration-300",
          isInvalid ? "border-red-500 shadow-red-500/20" : "border-white/10"
        )}>
          <div className="flex items-center gap-3 px-4 h-10 border-r border-white/10">
            <Search size={18} className={clsx("transition-colors", isInvalid ? "text-red-500" : "text-zinc-500")} />
              <input
                type="text"
                placeholder="Find a plot..."
                className="bg-transparent border-none outline-none text-white text-sm font-medium w-32 placeholder:text-zinc-600"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={handleSearch}
              />
            </div>
            <div className="flex items-center gap-1 px-1">
              <button
                onClick={() => setGalleryOpen(true)}
                className="flex items-center gap-2 px-4 py-2 text-zinc-400 hover:text-white transition-colors cursor-pointer"
              >
                <ImageIcon size={18} />
                <span className="text-[10px] font-bold uppercase tracking-widest">Gallery</span>
              </button>
              <button className="flex items-center gap-2 px-4 py-2 text-zinc-400 hover:text-white transition-colors cursor-pointer">
                <Info size={18} />
                <span className="text-[10px] font-bold uppercase tracking-widest">Info</span>
              </button>
              <button
                onClick={handleLocate}
                className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-all active:scale-95 shadow-lg shadow-blue-500/20 cursor-pointer"
              >
                <Compass size={18} />
                <span className="text-[10px] font-bold uppercase tracking-widest">Locate</span>
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Right: Settings & Status Toggle */}
        <div className="pointer-events-auto flex items-center gap-3">
          <div className="flex bg-zinc-900/50 backdrop-blur-md p-1.5 rounded-full border border-white/10 shadow-2xl items-center gap-2">
            <button
              onClick={() => setViewMode('map')}
              className={clsx(
                "flex items-center gap-2 px-4 py-2 rounded-full transition-all text-[10px] font-black uppercase tracking-widest cursor-pointer",
                viewMode === 'map' ? "bg-white text-zinc-900 shadow-lg" : "text-white/60 hover:text-white"
              )}
            >
              <MapIcon size={16} />
              Map View
            </button>
            <button
              onClick={() => setViewMode('2d')}
              className={clsx(
                "flex items-center gap-2 px-4 py-2 rounded-full transition-all text-[10px] font-black uppercase tracking-widest cursor-pointer",
                viewMode === '2d' ? "bg-white text-zinc-900 shadow-lg" : "text-white/60 hover:text-white"
              )}
            >
              <Layers size={16} />
              2D View
            </button>
            <button
              onClick={() => setViewMode('3d')}
              className={clsx(
                "flex items-center gap-2 px-4 py-2 rounded-full transition-all text-[10px] font-black uppercase tracking-widest cursor-pointer",
                viewMode === '3d' ? "bg-white text-zinc-900 shadow-lg" : "text-white/60 hover:text-white"
              )}
            >
              <Box size={16} />
              3D View
            </button>
          </div>

          <button className="p-4 bg-white/90 backdrop-blur-md rounded-full border border-zinc-200 shadow-xl text-zinc-800 hover:bg-zinc-50 transition-colors cursor-pointer">
            <Share2 size={20} />
          </button>

          {/* Status Toggle Pill exactly like reference */}
          <div className="flex bg-[#2d2d2d]/90 backdrop-blur-md px-6 py-3 rounded-full border border-white/10 shadow-2xl items-center gap-4 transition-all ml-4">
            <span className="text-sm font-medium text-white/90">Status</span>
            <button
              onClick={toggleStatus}
              className={clsx(
                "relative inline-flex h-6 w-11 items-center rounded-full transition-all duration-300 focus:outline-none cursor-pointer",
                isStatusVisible ? "bg-zinc-500" : "bg-zinc-700"
              )}
            >
              <span
                className={clsx(
                  "inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-300 shadow-lg",
                  isStatusVisible ? "translate-x-6" : "translate-x-1"
                )}
              />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
