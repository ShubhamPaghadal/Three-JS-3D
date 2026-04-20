import { PlotData } from '../types/scene';

export const MOCK_PLOTS: PlotData[] = [];

// 1. Top Row (198-225)
for (let i = 0; i < 28; i++) {
  MOCK_PLOTS.push({
    id: `p${198 + i}`,
    number: `${198 + i}`,
    status: (i + 198) % 7 === 0 ? 'booked' : (i + 198) % 11 === 0 ? 'on-hold' : 'available',
    areaSqft: 1500,
    areaSqm: 139,
    position: [-16 + i * 1.5, 0, -12],
    points: []
  });
}

// 2. Bottom Main Row (27-1)
for (let i = 0; i < 27; i++) {
  MOCK_PLOTS.push({
    id: `p${27 - i}`,
    number: `${27 - i}`,
    status: (27 - i) % 5 === 0 ? 'booked' : 'available',
    areaSqft: 1800,
    areaSqm: 167,
    position: [18 - i * 1.4, 0, 14],
    points: []
  });
}

// 3. Left Block (121-134, etc.)
for (let i = 0; i < 7; i++) {
  // Column 1
  MOCK_PLOTS.push({
    id: `p${121 + i}`,
    number: `${121 + i}`,
    status: 'available',
    areaSqft: 1800,
    areaSqm: 167,
    position: [-17, 0, -7 + i * 2.2],
    points: []
  });
  // Column 2
  MOCK_PLOTS.push({
    id: `p${122 + i}`,
    number: `${122 + i + 10}`,
    status: 'available',
    areaSqft: 1800,
    areaSqm: 167,
    position: [-14, 0, -7 + i * 2.2],
    points: []
  });
}

// 4. Middle Internal Blocks
for (let i = 0; i < 5; i++) {
  MOCK_PLOTS.push({
    id: `p${145 + i}`,
    number: `${145 + i}`,
    status: i === 2 ? 'booked' : 'available',
    areaSqft: 1800,
    areaSqm: 167,
    position: [-10, 0, -5 + i * 2.2],
    points: []
  });
}

// 5. Common Plot
MOCK_PLOTS.push({
  id: 'common-1',
  number: 'COMMON PLOT',
  status: 'available',
  areaSqft: 5000,
  areaSqm: 464,
  position: [-7, 0, 4],
  points: []
});

// 6. Right Block
for (let i = 0; i < 8; i++) {
  MOCK_PLOTS.push({
    id: `p${236 + i}`,
    number: `${236 + i}`,
    status: 'available',
    areaSqft: 2000,
    areaSqm: 185,
    position: [14, 0, -5 + i * 2],
    points: []
  });
  MOCK_PLOTS.push({
    id: `p${251 + i}`,
    number: `${251 + i}`,
    status: 'available',
    areaSqft: 2000,
    areaSqm: 185,
    position: [17, 0, -5 + i * 2],
    points: []
  });
}

// 7. Extreme Bottom Left
for (let i = 0; i < 22; i++) {
  MOCK_PLOTS.push({
    id: `p${108 - i}`,
    number: `${108 - i}`,
    status: 'available',
    areaSqft: 1200,
    areaSqm: 111,
    position: [-22 + i * 1.2, 0, 8],
    points: []
  });
}
