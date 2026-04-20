export type ViewMode = '2d' | '3d' | 'map';
export type PlotStatus = 'available' | 'booked' | 'on-hold' | 'no-info';

export interface PlotData {
  id: string;
  number: string;
  status: PlotStatus;
  areaSqft: number;
  areaSqm: number;
  position: [number, number, number];
  points: [number, number][]; // Boundary points for custom shapes
}

export interface SceneState {
  viewMode: ViewMode;
  selectedPlotId: string | null;
  hoveredPlotId: string | null;
  isStatusVisible: boolean;
  searchQuery: string;
  
  // Actions
  setViewMode: (mode: ViewMode) => void;
  selectPlot: (id: string | null) => void;
  setHoveredPlot: (id: string | null) => void;
  toggleStatus: () => void;
  setSearchQuery: (query: string) => void;
}
