import { create } from 'zustand';
import { SceneState, ViewMode } from '../types/scene';

export const useSceneStore = create<SceneState>((set) => ({
  viewMode: '3d',
  selectedPlotId: null,
  hoveredPlotId: null,
  isStatusVisible: false,
  searchQuery: '',

  setViewMode: (mode: ViewMode) => set({ viewMode: mode }),

  selectPlot: (id: string | null) => set({ selectedPlotId: id }),

  setHoveredPlot: (id: string | null) => set({ hoveredPlotId: id }),

  toggleStatus: () => set((state) => ({ isStatusVisible: !state.isStatusVisible })),

  setSearchQuery: (query: string) => set({ searchQuery: query }),
}));
