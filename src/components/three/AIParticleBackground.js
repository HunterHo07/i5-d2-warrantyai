'use client';

import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

// Particle system component
function ParticleField({ count = 1000 }) {
  const mesh = useRef();
  const light = useRef();

  // Generate random positions for particles
  const particles = useMemo(() => {
    const temp = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      temp[i3] = (Math.random() - 0.5) * 20;
      temp[i3 + 1] = (Math.random() - 0.5) * 20;
      temp[i3 + 2] = (Math.random() - 0.5) * 20;
    }
    return temp;
  }, [count]);

  // Animation loop
  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    
    if (mesh.current) {
      mesh.current.rotation.x = time * 0.1;
      mesh.current.rotation.y = time * 0.05;
      
      // Update particle positions for floating effect
      const positions = mesh.current.geometry.attributes.position.array;
      for (let i = 0; i < positions.length; i += 3) {
        positions[i + 1] += Math.sin(time + positions[i]) * 0.001;
      }
      mesh.current.geometry.attributes.position.needsUpdate = true;
    }

    if (light.current) {
      light.current.position.x = Math.sin(time) * 5;
      light.current.position.z = Math.cos(time) * 5;
    }
  });

  return (
    <group>
      <Points ref={mesh} positions={particles} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color="#00D4FF"
          size={0.05}
          sizeAttenuation={true}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </Points>
      
      {/* AI Network Lines */}
      <mesh>
        <sphereGeometry args={[8, 32, 32]} />
        <meshBasicMaterial
          color="#8B5CF6"
          transparent
          opacity={0.1}
          wireframe
        />
      </mesh>

      {/* Floating light */}
      <pointLight
        ref={light}
        color="#00FF88"
        intensity={0.5}
        distance={10}
        decay={2}
      />
    </group>
  );
}

// Neural network connections
function NeuralNetwork() {
  const lines = useRef();

  useFrame((state) => {
    if (lines.current) {
      lines.current.rotation.y = state.clock.getElapsedTime() * 0.1;
    }
  });

  const connections = useMemo(() => {
    const points = [];
    const nodeCount = 20;
    
    // Create nodes in 3D space
    const nodes = [];
    for (let i = 0; i < nodeCount; i++) {
      nodes.push(new THREE.Vector3(
        (Math.random() - 0.5) * 15,
        (Math.random() - 0.5) * 15,
        (Math.random() - 0.5) * 15
      ));
    }

    // Connect nearby nodes
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        if (nodes[i].distanceTo(nodes[j]) < 5) {
          points.push(nodes[i], nodes[j]);
        }
      }
    }

    return points;
  }, []);

  return (
    <group ref={lines}>
      <lineSegments>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={connections.length}
            array={new Float32Array(connections.flatMap(v => [v.x, v.y, v.z]))}
            itemSize={3}
          />
        </bufferGeometry>
        <lineBasicMaterial
          color="#00D4FF"
          transparent
          opacity={0.3}
          blending={THREE.AdditiveBlending}
        />
      </lineSegments>
    </group>
  );
}

// Main background component
const AIParticleBackground = () => {
  return (
    <div className="absolute inset-0 w-full h-full">
      <Canvas
        camera={{ position: [0, 0, 10], fov: 60 }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.2} />
        <ParticleField count={1500} />
        <NeuralNetwork />
        
        {/* Fog for depth */}
        <fog attach="fog" args={['#0A0A0F', 10, 50]} />
      </Canvas>
    </div>
  );
};

export default AIParticleBackground;
