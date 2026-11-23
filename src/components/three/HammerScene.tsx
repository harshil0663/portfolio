"use client";

import { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Line, RoundedBox } from "@react-three/drei";
import * as THREE from "three";

type V3 = [number, number, number];

function makeBolt(): V3[] {
  const a = Math.random() * Math.PI * 2;
  const start: V3 = [Math.cos(a) * 2.2, Math.sin(a) * 1.8 + 0.3, (Math.random() - 0.5) * 0.8];
  const end: V3 = [(Math.random() - 0.5) * 1.6, (Math.random() - 0.5) * 0.7 + 0.3, 0.45];
  const pts: V3[] = [];
  const n = 9;
  for (let i = 0; i <= n; i++) {
    const t = i / n;
    const j = i === 0 || i === n ? 0 : 0.28;
    pts.push([
      start[0] + (end[0] - start[0]) * t + (Math.random() - 0.5) * j,
      start[1] + (end[1] - start[1]) * t + (Math.random() - 0.5) * j,
      start[2] + (end[2] - start[2]) * t + (Math.random() - 0.5) * j,
    ]);
  }
  return pts;
}

function Lightning() {
  const [bolts, setBolts] = useState<V3[][]>([]);
  const light = useRef<THREE.PointLight>(null);
  const last = useRef(0);

  useFrame(({ clock }) => {
    if (clock.elapsedTime - last.current > 0.1) {
      last.current = clock.elapsedTime;
      const count = Math.random() > 0.35 ? 3 : 0;
      setBolts(Array.from({ length: count }, makeBolt));
      if (light.current) light.current.intensity = count ? 40 : 12;
    }
  });

  return (
    <>
      <pointLight ref={light} position={[0, 0.5, 2.5]} color="#4cc9ff" intensity={12} />
      {bolts.map((pts, i) => (
        <Line key={i} points={pts} color="#bfeaff" lineWidth={2.5} />
      ))}
    </>
  );
}

function Hammer() {
  const group = useRef<THREE.Group>(null);
  useFrame(({ pointer, clock }) => {
    const g = group.current;
    if (!g) return;
    g.rotation.y = THREE.MathUtils.lerp(g.rotation.y, pointer.x * 0.9 + Math.sin(clock.elapsedTime * 0.7) * 0.35, 0.1);
    g.rotation.x = THREE.MathUtils.lerp(g.rotation.x, -pointer.y * 0.4, 0.08);
  });
  return (
    <group ref={group} rotation={[0, 0, -0.45]}>
      <RoundedBox args={[1.7, 0.85, 0.85]} radius={0.08} smoothness={4} position={[0, 0.45, 0]}>
        <meshStandardMaterial color="#8d96a3" metalness={0.75} roughness={0.35} />
      </RoundedBox>
      {[-0.82, 0.82].map((x) => (
        <RoundedBox key={x} args={[0.22, 0.95, 0.95]} radius={0.05} smoothness={4} position={[x, 0.45, 0]}>
          <meshStandardMaterial color="#5f6773" metalness={0.8} roughness={0.4} />
        </RoundedBox>
      ))}
      <mesh position={[0, -1.35, 0]}>
        <cylinderGeometry args={[0.09, 0.09, 2.3, 20]} />
        <meshStandardMaterial color="#3a2a1d" roughness={0.8} />
      </mesh>
      {Array.from({ length: 7 }, (_, i) => (
        <mesh key={i} position={[0, -0.7 - i * 0.2, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.1, 0.02, 8, 20]} />
          <meshStandardMaterial color="#17110c" roughness={0.9} />
        </mesh>
      ))}
      <mesh position={[0, -2.55, 0]} rotation={[0, Math.PI / 2, 0]}>
        <torusGeometry args={[0.16, 0.035, 12, 28]} />
        <meshStandardMaterial color="#9aa3b0" metalness={0.8} roughness={0.3} />
      </mesh>
    </group>
  );
}

export default function HammerScene() {
  return (
    <Canvas camera={{ position: [0, 0, 5.5], fov: 45 }} dpr={[1, 2]}>
      <ambientLight intensity={0.9} />
      <directionalLight position={[3, 4, 5]} intensity={2.6} />
      <Float speed={2} rotationIntensity={0.15} floatIntensity={0.5}>
        <Hammer />
      </Float>
      <Lightning />
    </Canvas>
  );
}
