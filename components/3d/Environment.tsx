'use client';

import { Text, Float } from '@react-three/drei';

export const Roads = ({ visible = true }: { visible?: boolean }) => {
  if (!visible) return null;
  return (
    <group position={[0, -0.01, 0]}>
      {/* Top Road */}
      <mesh position={[0, 0, -13.5]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[60, 2]} />
        <meshStandardMaterial color="#333333" roughness={1} />
      </mesh>
      <Text position={[0, 0.05, -13.5]} rotation={[-Math.PI / 2, 0, 0]} fontSize={0.3} color="#9ca3af">9 Meter Road</Text>

      {/* Bottom Road */}
      <mesh position={[0, 0, 12.5]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[60, 2]} />
        <meshStandardMaterial color="#333333" roughness={1} />
      </mesh>
      <Text position={[0, 0.05, 12.5]} rotation={[-Math.PI / 2, 0, 0]} fontSize={0.3} color="#9ca3af">9 Meter Road</Text>

      {/* Internal Vertical Roads */}
      <mesh position={[-12, 0, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[2, 30]} />
        <meshStandardMaterial color="#333333" roughness={1} />
      </mesh>
      <Text position={[-12, 0.05, 0]} rotation={[-Math.PI / 2, 0, Math.PI / 2]} fontSize={0.3} color="#9ca3af">7.5 Meter Road</Text>

      <mesh position={[11, 0, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[2, 30]} />
        <meshStandardMaterial color="#333333" roughness={1} />
      </mesh>
      <Text position={[11, 0.05, 0]} rotation={[-Math.PI / 2, 0, Math.PI / 2]} fontSize={0.3} color="#9ca3af">9 Meter Road</Text>

      {/* Middle Horizontal Road */}
      <mesh position={[0, 0, 6.5]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[60, 1.5]} />
        <meshStandardMaterial color="#333333" roughness={1} />
      </mesh>
      <Text position={[0, 0.05, 6.5]} rotation={[-Math.PI / 2, 0, 0]} fontSize={0.3} color="#9ca3af">9 Meter Road</Text>
    </group>
  );
};

export const CentralGreen = ({ visible = true }: { visible?: boolean }) => {
  if (!visible) return null;
  return (
    <group position={[1.5, 0.01, -2]}>
      {/* Main Amenity Area Base */}
      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[18, 14]} />
        <meshStandardMaterial color="#4d7c0f" roughness={1} />
      </mesh>
      
      {/* Swimming Pool (Blue Area) */}
      <mesh position={[-3, 0.05, -3]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[5, 4]} />
        <meshStandardMaterial color="#38bdf8" roughness={0.1} metalness={0.5} />
      </mesh>
      
      {/* Buildings / Club House Area */}
      <mesh position={[-3, 0.25, 1]} rotation={[0, 0, 0]}>
        <boxGeometry args={[6, 0.5, 6]} />
        <meshStandardMaterial color="#d1d5db" />
      </mesh>

      {/* Basketball Court */}
      <mesh position={[5.5, 0.05, -4]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[4, 3]} />
        <meshStandardMaterial color="#65a30d" />
      </mesh>
      <Text
        position={[5.5, 0.1, -4]}
        rotation={[-Math.PI / 2, 0, 0]}
        fontSize={0.4}
        color="white"
      >
        Basketball
      </Text>

      {/* Party Lawn */}
      <mesh position={[5.5, 0.05, 3]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[6, 8]} />
        <meshStandardMaterial color="#3f6212" />
      </mesh>
      <Text
        position={[5.5, 0.1, 3]}
        rotation={[-Math.PI / 2, 0, 0]}
        fontSize={0.6}
        color="white"
        fontWeight="bold"
      >
        PARTY LAWN
      </Text>
    </group>
  );
};

export const Tree = ({ position }: { position: [number, number, number] }) => {
  return (
    <group position={position}>
      <mesh position={[0, 0.5, 0]}>
        <cylinderGeometry args={[0.1, 0.15, 1]} />
        <meshStandardMaterial color="#451a03" />
      </mesh>
      <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
        <mesh position={[0, 1.2, 0]}>
          <sphereGeometry args={[0.5, 8, 8]} />
          <meshStandardMaterial color="#166534" flatShading />
        </mesh>
      </Float>
    </group>
  );
};
