'use client';

import { FloorData } from '../../types/scene';
import { Flat } from './Flat';

interface FloorProps {
  data: FloorData;
  position: [number, number, number];
}

export const Floor = ({ data, position }: FloorProps) => {
  const [x, y, z] = position;
  const flatWidth = 1.8;
  const flatDepth = 2.8;
  const spacing = 0.2;

  return (
    <group position={position}>
      {data.flats.map((flat, index) => {
        // Arrange flats in a simple grid for this boilerplate
        const col = index % 2;
        const row = Math.floor(index / 2);

        return (
          <Flat
            key={flat.id}
            data={flat}
            position={[
              (col - 0.5) * (flatWidth + spacing),
              0,
              (row - 0.5) * (flatDepth + spacing)
            ]}
            size={[flatWidth, 0.8, flatDepth]}
          />
        );
      })}
    </group>
  );
};
