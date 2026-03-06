import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { MeshTransmissionMaterial, Environment, Float } from '@react-three/drei';
import * as THREE from 'three';

function Blob() {
  const mesh = useRef<THREE.Mesh>(null);
  
  // Create a custom geometry that we can morph
  const geometry = useMemo(() => new THREE.IcosahedronGeometry(2, 64), []);

  useFrame((state) => {
    if (!mesh.current) return;
    
    // Slowly rotate the blob
    mesh.current.rotation.x = state.clock.getElapsedTime() * 0.2;
    mesh.current.rotation.y = state.clock.getElapsedTime() * 0.3;

    // Morph vertices based on time and position
    const time = state.clock.getElapsedTime();
    const positionAttribute = geometry.getAttribute('position');
    const vertex = new THREE.Vector3();
    
    for (let i = 0; i < positionAttribute.count; i++) {
      vertex.fromBufferAttribute(positionAttribute, i);
      
      // Calculate a noise-like displacement
      const noise = Math.sin(vertex.x * 2 + time) * 
                    Math.cos(vertex.y * 2 + time) * 
                    Math.sin(vertex.z * 2 + time);
                    
      // Normalize the vertex and apply displacement
      vertex.normalize().multiplyScalar(2 + noise * 0.3);
      
      positionAttribute.setXYZ(i, vertex.x, vertex.y, vertex.z);
    }
    
    positionAttribute.needsUpdate = true;
    geometry.computeVertexNormals();
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <mesh ref={mesh} geometry={geometry}>
        <MeshTransmissionMaterial 
          backside
          samples={4}
          thickness={1.5}
          chromaticAberration={0.05}
          anisotropy={0.1}
          distortion={0.2}
          distortionScale={0.5}
          temporalDistortion={0.1}
          clearcoat={1}
          attenuationDistance={0.5}
          attenuationColor="#ffffff"
          color="#ffffff"
          roughness={0.1}
        />
      </mesh>
    </Float>
  );
}

export function HeroBlob() {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none">
      <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
        <ambientLight intensity={1.5} />
        <directionalLight position={[10, 10, 10]} intensity={2} />
        <Environment preset="city" />
        <Blob />
      </Canvas>
    </div>
  );
}
