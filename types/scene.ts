export type ViewMode = '2d' | '3d' | 'map';
export type PlotStatus = 'available' | 'booked' | 'on-hold' | 'no-info';
export type FlatStatus = 'available' | 'booked' | 'reserved' | 'sold';

export interface PlotData {
  id: string;
  number: string;
  status: PlotStatus;
  areaSqft: number;
  areaSqm: number;
  position: [number, number, number];
  points: [number, number][]; // Boundary points for custom shapes
}

export interface FlatData {
  id: string;
  number: string;
  status: FlatStatus;
  area?: number;
  price?: number;
}

export interface FloorData {
  id: string;
  number: number;
  flats: FlatData[];
}

export interface BuildingData {
  id: string;
  name: string;
  position: [number, number, number];
  floors: FloorData[];
}

export interface SceneState {
  view: 'plot' | 'world';
  viewMode: ViewMode;
  selectedPlotId: string | null;
  hoveredPlotId: string | null;
  
  selectedBuilding: string | null;
  selectedFlat: string | null;
  hoveredItem: string | null;
  
  isStatusVisible: boolean;
  searchQuery: string;
  
  // Actions
  setView: (view: 'plot' | 'world') => void;
  setViewMode: (mode: ViewMode) => void;
  selectPlot: (id: string | null) => void;
  setHoveredPlot: (id: string | null) => void;
  
  selectBuilding: (id: string | null) => void;
  selectFlat: (id: string | null) => void;
  setHoveredItem: (id: string | null) => void;
  
  toggleStatus: () => void;
  setSearchQuery: (query: string) => void;
}
