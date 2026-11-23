"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";

function Star() {
  const shape = useMemo(() => {
    const s = new THREE.Shape();
    const R = 0.34;
    const r = 0.14;
    for (let i = 0; i < 10; i++) {
      const a = Math.PI / 2 + (i * Math.PI) / 5;
      const rad = i % 2 ? r : R;
      const x = Math.cos(a) * rad;
      const y = Math.sin(a) * rad;
      if (i) s.lineTo(x, y);
      else s.moveTo(x, y);
    }
    s.closePath();
    return s;
  }, []);
  return (
    <mesh position={[0, 0, 0.12]}>
      <extrudeGeometry args={[shape, { depth: 0.03, bevelEnabled: false }]} />
      <meshStandardMaterial color="#f4f4f4" metalness={0.5} roughness={0.25} />
    </mesh>
  );
}

const layers = [
  { r: 1.15, c: "#c1121f", z: 0 },
  { r: 0.92, c: "#f1f1f1", z: 0.03 },
  { r: 0.68, c: "#c1121f", z: 0.06 },
  { r: 0.44, c: "#1d3fa8", z: 0.09 },
];

function Shield() {
  const group = useRef<THREE.Group>(null);
  const spin = useRef({ left: 0, acc: 0 });

  useFrame(({ pointer, clock }, dt) => {
    const g = group.current;
    if (!g) return;
    const step = Math.min(spin.current.left, dt * 14);
    spin.current.left -= step;
    spin.current.acc += step;
    const ty = pointer.x * 0.9 + Math.sin(clock.elapsedTime * 0.8) * 0.3 + spin.current.acc;
    const tx = -pointer.y * 0.5;
    g.rotation.y = THREE.MathUtils.lerp(g.rotation.y, ty, 0.12);
    g.rotation.x = THREE.MathUtils.lerp(g.rotation.x, tx, 0.08);
  });

  return (
    <group
      ref={group}
      onClick={() => {
        spin.current.left += Math.PI * 4;
      }}
      onPointerOver={() => (document.body.style.cursor = "pointer")}
      onPointerOut={() => (document.body.style.cursor = "")}
    >
      {layers.map((l) => (
        <mesh key={l.r} position={[0, 0, l.z]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[l.r, l.r, 0.06, 72]} />
          <meshStandardMaterial color={l.c} metalness={0.45} roughness={0.32} />
        </mesh>
      ))}
      <mesh>
        <torusGeometry args={[1.15, 0.045, 16, 80]} />
        <meshStandardMaterial color="#cfd6e4" metalness={0.8} roughness={0.2} />
      </mesh>
      <Star />
    </group>
  );
}

export default function ShieldScene() {
  return (
    <Canvas camera={{ position: [0, 0, 3.8], fov: 45 }} dpr={[1, 2]}>
      <ambientLight intensity={1.1} />
      <directionalLight position={[3, 4, 5]} intensity={3} />
      <pointLight position={[-4, -2, 3]} intensity={25} color="#6aa0ff" />
      <Float speed={2} rotationIntensity={0.3} floatIntensity={0.7}>
        <Shield />
      </Float>
    </Canvas>
  );
}
