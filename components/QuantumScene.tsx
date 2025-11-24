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
        emissiveIntensity={0.5}
        roughness={0.2}
        metalness={0.8}
      />
    </Sphere>
  );
};

const NetworkConnections = ({ count = 15 }) => {
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
                    color="#C5A059"
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
    <div className="absolute inset-0 z-0 opacity-60 pointer-events-none">
      <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#4F46E5" />
        <pointLight position={[-10, -10, -5]} intensity={1} color="#C5A059" />
        
        <Float speed={1} rotationIntensity={0.2} floatIntensity={0.2}>
          {/* Central Cluster */}
          <NodeInstance position={[0, 0, 0]} color="#C5A059" scale={1.5} />
          <NodeInstance position={[-2, 1, -1]} color="#4F46E5" scale={1} />
          <NodeInstance position={[2, -1.5, 0.5]} color="#374151" scale={1} />
          <NodeInstance position={[1.5, 1.5, -2]} color="#C5A059" scale={0.8} />
          <NodeInstance position={[-1.5, -2, 1]} color="#4F46E5" scale={0.8} />
          
          <NetworkConnections count={20} />
        </Float>
        
        <Environment preset="city" />
        <Stars radius={100} depth={50} count={2000} factor={4} saturation={0} fade speed={0.5} />
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
        <pointLight position={[2, 0, 2]} intensity={0.5} color="#C5A059" />
        <Environment preset="city" />
        
        <Float rotationIntensity={0.1} floatIntensity={0.1} speed={1}>
          <group position={[0, -1, 0]}>
            {/* Abstract Server Racks / Layers */}
            
            {/* Base Layer - Storage (Prometheus) */}
            <Box args={[3, 0.2, 3]} position={[0, 0, 0]}>
                <meshStandardMaterial color="#374151" metalness={0.8} roughness={0.2} />
            </Box>
            <Instances range={16}>
                <boxGeometry args={[0.5, 0.8, 0.5]} />
                <meshStandardMaterial color="#1f2937" metalness={0.5} roughness={0.5} />
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

            {/* Middle Layer - Processing (OTel) */}
            <Box args={[2.5, 0.1, 2.5]} position={[0, 1.2, 0]}>
                <meshStandardMaterial color="#C5A059" metalness={1} roughness={0.2} transparent opacity={0.8} />
            </Box>
            
            {/* Connections */}
            <Cylinder args={[0.05, 0.05, 1.2, 8]} position={[-1, 0.6, -1]}>
               <meshStandardMaterial color="#9CA3AF" />
            </Cylinder>
            <Cylinder args={[0.05, 0.05, 1.2, 8]} position={[1, 0.6, 1]}>
               <meshStandardMaterial color="#9CA3AF" />
            </Cylinder>
            <Cylinder args={[0.05, 0.05, 1.2, 8]} position={[-1, 0.6, 1]}>
               <meshStandardMaterial color="#9CA3AF" />
            </Cylinder>
            <Cylinder args={[0.05, 0.05, 1.2, 8]} position={[1, 0.6, -1]}>
               <meshStandardMaterial color="#9CA3AF" />
            </Cylinder>

            {/* Top Layer - Visualization (Grafana) */}
            <Box args={[2, 0.1, 2]} position={[0, 2.5, 0]}>
               <meshStandardMaterial color="#E5E7EB" metalness={0.2} roughness={0.1} />
            </Box>
            
            {/* Floating Data Spheres */}
            <Sphere args={[0.1]} position={[0, 1.8, 0]}>
                <meshStandardMaterial color="#4F46E5" emissive="#4F46E5" emissiveIntensity={2} />
            </Sphere>
             <Sphere args={[0.1]} position={[0.5, 1.5, 0.5]}>
                <meshStandardMaterial color="#C5A059" emissive="#C5A059" emissiveIntensity={2} />
            </Sphere>
          </group>
        </Float>
      </Canvas>
    </div>
  );
}