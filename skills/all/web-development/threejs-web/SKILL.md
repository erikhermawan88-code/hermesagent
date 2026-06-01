---
name: threejs-web
description: "Three.js 3D web development: scenes, models, shaders, and interactive 3D elements for premium websites"
tags: [threejs, 3d, webgl, react-three-fiber, 3d-graphics]
version: 1.0.0
created: 2026-05-27
---

# Three.js Web Development

## Core Setup (React Three Fiber)

```tsx
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, useGLTF } from '@react-three/drei';

export function Scene() {
  return (
    <Canvas camera={{ position: [0, 0, 5] }}>
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <OrbitControls enableZoom={false} />
      <Model url="/model.glb" />
      <Environment preset="studio" />
    </Canvas>
  );
}
```

## Load GLTF Model

```tsx
function Model({ url }: { url: string }) {
  const { scene } = useGLTF(url);
  
  return (
    <primitive 
      object={scene} 
      scale={1}
      position={[0, 0, 0]}
    />
  );
}
```

## Animated 3D Cube

```tsx
import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';

function RotatingCube() {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.5;
      meshRef.current.rotation.y += delta * 0.3;
    }
  });
  
  return (
    <mesh ref={meshRef}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="#6366f1" metalness={0.5} roughness={0.2} />
    </mesh>
  );
}
```

## Floating Particles

```tsx
function Particles({ count = 100 }) {
  const mesh = useRef<THREE.InstancedMesh>(null);
  
  useFrame((state) => {
    if (mesh.current) {
      for (let i = 0; i < count; i++) {
        const matrix = new THREE.Matrix4();
        const position = new THREE.Vector3(
          Math.sin(state.clock.elapsedTime + i * 0.1) * 3,
          Math.cos(state.clock.elapsedTime + i * 0.1) * 3,
          Math.sin(i * 0.5) * 2
        );
        matrix.setPosition(position);
        mesh.current.setMatrixAt(i, matrix);
      }
      mesh.current.instanceMatrix.needsUpdate = true;
    }
  });
  
  return (
    <instancedMesh ref={mesh} args={[undefined, undefined, count]}>
      <sphereGeometry args={[0.05, 16, 16]} />
      <meshBasicMaterial color="#6366f1" transparent opacity={0.6} />
    </instancedMesh>
  );
}
```

## Interactive Mouse Follow

```tsx
function MouseFollower() {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (groupRef.current) {
      const mouseX = state.mouse.x * 2;
      const mouseY = state.mouse.y * 2;
      groupRef.current.position.x += (mouseX - groupRef.current.position.x) * 0.05;
      groupRef.current.position.y += (mouseY - groupRef.current.position.y) * 0.05;
    }
  });
  
  return (
    <group ref={groupRef}>
      <mesh>
        <sphereGeometry args={[0.3, 32, 32]} />
        <meshStandardMaterial color="#ec4899" emissive="#ec4899" emissiveIntensity={0.5} />
      </mesh>
    </group>
  );
}
```

## 3D Text

```tsx
import { Text } from '@react-three/drei';

function 3DText() {
  return (
    <Text
      position={[0, 0, 0]}
      fontSize={0.5}
      color="#ffffff"
      font="/fonts/Inter-Bold.woff"
      anchorX="center"
      anchorY="middle"
    >
      HERMES
    </Text>
  );
}
```

## Post-processing Effects

```tsx
import { EffectComposer, Bloom, ChromaticAberration } from '@react-three/postprocessing';

function Effects() {
  return (
    <EffectComposer>
      <Bloom 
        intensity={0.5}
        luminanceThreshold={0.9}
        luminanceSmoothing={0.9}
      />
      <ChromaticAberration offset={[0.002, 0.002]} />
    </EffectComposer>
  );
}
```

## Performance Tips

1. **Use `dpr`** prop on Canvas: `<Canvas dpr={[1, 2]} />` for adaptive pixel ratio
2. **Dispose** geometries/materials when unmounting
3. **Use `InstancedMesh`** for repeated objects (particles)
4. **Limit shadow maps** — use baked shadows when possible
5. **Use `frustumCulled`** to skip off-screen rendering

## Environment Lighting

```tsx
// Studio lighting preset
<Environment preset="studio" />

// Or custom HDRI
<Environment 
  files="/hdri/studio.hdr"
  background={false}
/>
```

## Fallback for No WebGL

```tsx
function 3DCanvas({ children }) {
  const [hasWebGL, setHasWebGL] = useState(true);
  
  useEffect(() => {
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    if (!gl) setHasWebGL(false);
  }, []);
  
  if (!hasWebGL) {
    return <div className="fallback-image">{children}</div>;
  }
  
  return <Canvas>{children}</Canvas>;
}
```