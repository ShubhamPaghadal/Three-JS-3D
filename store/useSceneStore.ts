import { create } from 'zustand';
import { SceneState, ViewMode } from '../types/scene';

export const useSceneStore = create<SceneState>((set) => ({
  view: 'world',
  viewMode: '3d',
  selectedPlotId: null,
  hoveredPlotId: null,
  
  selectedBuilding: null,
  selectedFlat: null,
  hoveredItem: null,
  
  isStatusVisible: false,
  searchQuery: '',
  isGalleryOpen: false,

  setView: (view: 'plot' | 'world') => set({ view }),
  setViewMode: (mode: ViewMode) => set({ viewMode: mode }),
  selectPlot: (id: string | null) => set({ selectedPlotId: id }),
  setHoveredPlot: (id: string | null) => set({ hoveredPlotId: id }),

  selectBuilding: (id: string | null) => set({ selectedBuilding: id }),
  selectFlat: (id: string | null) => set({ selectedFlat: id }),
  setHoveredItem: (id: string | null) => set({ hoveredItem: id }),

  toggleStatus: () => set((state) => ({ isStatusVisible: !state.isStatusVisible })),
  setSearchQuery: (query: string) => set({ searchQuery: query }),
  setGalleryOpen: (isOpen: boolean) => set({ isGalleryOpen: isOpen }),
}));
