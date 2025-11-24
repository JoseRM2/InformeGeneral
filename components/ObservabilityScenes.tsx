/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Sphere, Line, Stars, Environment, Box, Cylinder, Instances, Instance } from '@react-three/drei';
import * as THREE from 'three';

// --- HERO SCENE: DISTRIBUTED NETWORK ---

const NodeInstance = ({ position, color, scale = 1 }: { position: [number, number, number]; color: string; scale?: number }) => {
  const ref = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (ref.current) {
      const t = state.clock.getElapsedTime();
      // Gentle floating breathing effect
      ref.current.position.y = position[1] + Math.sin(t + position[0]) * 0.1;
    }
  });

  return (
    <Sphere ref={ref} args={[0.3, 16, 16]} position={position} scale={scale}>
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={0.8}
        roughness={0.2}
        metalness={0.8}
      />
    </Sphere>
  );
};

const NetworkConnections = ({ count = 20 }: { count?: number }) => {
    const lines = useMemo(() => {
        const temp = [];
        for (let i = 0; i < count; i++) {
            const start = [
                (Math.random() - 0.5) * 10,
                (Math.random() - 0.5) * 5,
                (Math.random() - 0.5) * 5
            ] as [number, number, number];
            const end = [
                (Math.random() - 0.5) * 10,
                (Math.random() - 0.5) * 5,
                (Math.random() - 0.5) * 5
            ] as [number, number, number];
            temp.push({ start, end });
        }
        return temp;
    }, [count]);

    return (
        <group>
            {lines.map((line, i) => (
                <Line
                    key={i}
                    points={[line.start, line.end]}
                    color="#38bdf8" // Sky blue
                    opacity={0.1}
                    transparent
                    lineWidth={1}
                />
            ))}
        </group>
    );
}

export const NetworkScene: React.FC = () => {
  return (
    <div className="absolute inset-0 z-0 opacity-100 pointer-events-none">
      <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1.5} color="#3b82f6" />
        <pointLight position={[-10, -10, -5]} intensity={0.5} color="#67e8f9" />
        
        <Float speed={1} rotationIntensity={0.2} floatIntensity={0.2}>
          {/* Central Cluster - Blue Tech Colors */}
          <NodeInstance position={[0, 0, 0]} color="#2563eb" scale={1.5} /> {/* Blue 600 */}
          <NodeInstance position={[-2, 1, -1]} color="#0ea5e9" scale={1} /> {/* Sky 500 */}
          <NodeInstance position={[2, -1.5, 0.5]} color="#1e40af" scale={1} /> {/* Blue 800 */}
          <NodeInstance position={[1.5, 1.5, -2]} color="#60a5fa" scale={0.8} /> {/* Blue 400 */}
          <NodeInstance position={[-1.5, -2, 1]} color="#93c5fd" scale={0.8} /> {/* Blue 300 */}
          
          <NetworkConnections count={40} />
        </Float>
        
        <Environment preset="city" />
      </Canvas>
    </div>
  );
};

// --- IMPACT SCENE: SERVER ARCHITECTURE ---

export const ServerArchitectureScene: React.FC = () => {
  return (
    <div className="w-full h-full absolute inset-0">
      <Canvas camera={{ position: [4, 3, 4], fov: 40 }}>
        <ambientLight intensity={1} />
        <directionalLight position={[-5, 5, 5]} intensity={2} color="#ffffff" />
        <pointLight position={[2, 0, 2]} intensity={0.8} color="#38bdf8" />
        <Environment preset="night" />
        
        <Float rotationIntensity={0.1} floatIntensity={0.1} speed={1}>
          <group position={[0, -1, 0]}>
            {/* Abstract Server Racks / Layers */}
            
            {/* Base Layer - Storage (Prometheus) - Dark Blue Metal */}
            <Box args={[3, 0.2, 3]} position={[0, 0, 0]}>
                <meshStandardMaterial color="#1e293b" metalness={0.8} roughness={0.2} />
            </Box>
            <Instances range={16}>
                <boxGeometry args={[0.5, 0.8, 0.5]} />
                <meshStandardMaterial color="#0f172a" metalness={0.7} roughness={0.4} />
                {/* 4x4 Grid of storage units */}
                {Array.from({ length: 4 }).map((_, i) => 
                    Array.from({ length: 4 }).map((_, j) => (
                        <Instance 
                            key={`${i}-${j}`} 
                            position={[(i - 1.5) * 0.6, 0.5, (j - 1.5) * 0.6]} 
                        />
                    ))
                )}
            </Instances>

            {/* Middle Layer - Processing (OTel) - Glowing Blue */}
            <Box args={[2.5, 0.1, 2.5]} position={[0, 1.2, 0]}>
                <meshStandardMaterial color="#3b82f6" metalness={0.9} roughness={0.1} transparent opacity={0.6} />
            </Box>
            
            {/* Connections */}
            <Cylinder args={[0.02, 0.02, 1.2, 8]} position={[-1, 0.6, -1]}>
               <meshStandardMaterial color="#64748b" />
            </Cylinder>
            <Cylinder args={[0.02, 0.02, 1.2, 8]} position={[1, 0.6, 1]}>
               <meshStandardMaterial color="#64748b" />
            </Cylinder>
            <Cylinder args={[0.02, 0.02, 1.2, 8]} position={[-1, 0.6, 1]}>
               <meshStandardMaterial color="#64748b" />
            </Cylinder>
            <Cylinder args={[0.02, 0.02, 1.2, 8]} position={[1, 0.6, -1]}>
               <meshStandardMaterial color="#64748b" />
            </Cylinder>

            {/* Top Layer - Visualization (Grafana) - Glass */}
            <Box args={[2, 0.1, 2]} position={[0, 2.5, 0]}>
               <meshStandardMaterial color="#bae6fd" metalness={0.1} roughness={0.05} opacity={0.4} transparent />
            </Box>
            
            {/* Floating Data Spheres */}
            <Sphere args={[0.15]} position={[0, 1.8, 0]}>
                <meshStandardMaterial color="#ef4444" emissive="#ef4444" emissiveIntensity={1} />
            </Sphere>
             <Sphere args={[0.1]} position={[0.5, 1.5, 0.5]}>
                <meshStandardMaterial color="#3b82f6" emissive="#3b82f6" emissiveIntensity={1} />
            </Sphere>
          </group>
        </Float>
      </Canvas>
    </div>
  );
}