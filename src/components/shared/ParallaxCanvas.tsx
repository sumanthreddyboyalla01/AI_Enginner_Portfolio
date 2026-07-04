import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useRef, useState, useEffect, useMemo } from "react";
import type { Mesh, Group, Points } from "three";
import * as THREE from "three";

function usePointer() {
  const [p, setP] = useState<[number, number]>([0, 0]);
  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      setP([(e.clientX / window.innerWidth) * 2 - 1, -((e.clientY / window.innerHeight) * 2 - 1)]);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);
  return p;
}

function useScrollProgress() {
  const [s, setS] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      setS(Math.min(1, Math.max(0, window.scrollY / max)));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return s;
}

function Orb() {
  const ref = useRef<Mesh>(null);
  const pointer = usePointer();
  useFrame((_s, dt) => {
    const m = ref.current;
    if (!m) return;
    m.rotation.y += dt * 0.18;
    m.rotation.x += dt * 0.07;
    m.position.x += (pointer[0] * 0.6 - m.position.x) * 0.04;
    m.position.y += (pointer[1] * 0.4 - m.position.y) * 0.04;
  });
  return (
    <mesh ref={ref}>
      <icosahedronGeometry args={[1.4, 1]} />
      <meshStandardMaterial
        color="#c9a24a"
        wireframe
        emissive="#8a6a1a"
        emissiveIntensity={0.5}
        transparent
        opacity={0.85}
      />
    </mesh>
  );
}

/** Small wireframe satellite — replaces the crude blue knot. */
function Satellite() {
  const ref = useRef<Mesh>(null);
  useFrame((_s, dt) => {
    const m = ref.current;
    if (!m) return;
    m.rotation.x += dt * 0.35;
    m.rotation.y += dt * 0.25;
    const t = performance.now() * 0.0004;
    m.position.x = 2.6 + Math.sin(t) * 0.25;
    m.position.y = -0.6 + Math.cos(t * 1.3) * 0.2;
  });
  return (
    <mesh ref={ref} position={[2.6, -0.6, -0.5]} scale={0.42}>
      <octahedronGeometry args={[1, 0]} />
      <meshStandardMaterial color="#f5c563" wireframe emissive="#a06a10" emissiveIntensity={0.6} />
    </mesh>
  );
}

function Ring() {
  const ref = useRef<Mesh>(null);
  useFrame((_s, dt) => {
    const m = ref.current;
    if (!m) return;
    m.rotation.x += dt * 0.15;
    m.rotation.y -= dt * 0.08;
  });
  return (
    <mesh ref={ref} position={[-2.4, 0.6, -1.5]} scale={0.6}>
      <torusGeometry args={[1.2, 0.03, 8, 128]} />
      <meshStandardMaterial
        color="#f5c563"
        emissive="#a06a10"
        emissiveIntensity={0.55}
        transparent
        opacity={0.9}
      />
    </mesh>
  );
}

/** Additive-blended hologram grid plane behind the whole scene. */
function HologramGrid() {
  const ref = useRef<Mesh>(null);
  useFrame(() => {
    const m = ref.current;
    if (!m) return;
    const t = performance.now() * 0.0005;
    m.position.z = -4 + Math.sin(t) * 0.4;
  });
  const material = useMemo(() => {
    return new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      uniforms: { uTime: { value: 0 } },
      vertexShader: /* glsl */ `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: /* glsl */ `
        varying vec2 vUv;
        uniform float uTime;
        void main() {
          vec2 uv = vUv * 30.0;
          vec2 g = abs(fract(uv - 0.5) - 0.5) / fwidth(uv);
          float line = 1.0 - min(min(g.x, g.y), 1.0);
          float fade = smoothstep(0.5, 0.0, distance(vUv, vec2(0.5)));
          float pulse = 0.6 + 0.4 * sin(uTime * 0.6);
          vec3 col = mix(vec3(0.08,0.05,0.12), vec3(0.78,0.42,0.95), line);
          gl_FragColor = vec4(col * fade * pulse, line * fade * 0.55);
        }
      `,
    });
  }, []);
  useFrame((_s, dt) => {
    (material.uniforms.uTime.value as number) += dt;
  });
  return (
    <mesh ref={ref} position={[0, 0, -4]} rotation={[-Math.PI / 2.6, 0, 0]}>
      <planeGeometry args={[18, 12, 1, 1]} />
      <primitive object={material} attach="material" />
    </mesh>
  );
}

function Stars({ count = 500 }: { count?: number }) {
  const ref = useRef<Points>(null);
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 20;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 12;
      arr[i * 3 + 2] = -Math.random() * 10 - 2;
    }
    return arr;
  }, [count]);
  useFrame((_s, dt) => {
    if (ref.current) ref.current.rotation.y += dt * 0.02;
  });
  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.028}
        color="#ffffff"
        transparent
        opacity={0.75}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

/** Scroll-driven camera dolly + subtle rotation. */
function CameraRig() {
  const { camera } = useThree();
  const scroll = useScrollProgress();
  const pointer = usePointer();
  useFrame(() => {
    const targetZ = 4 - scroll * 1.6; // dolly in as user scrolls
    const targetY = -scroll * 0.6; // pan down slightly
    camera.position.z += (targetZ - camera.position.z) * 0.06;
    camera.position.y += (targetY - camera.position.y) * 0.06;
    camera.position.x += (pointer[0] * 0.4 - camera.position.x) * 0.04;
    camera.lookAt(0, 0, 0);
  });
  return null;
}

function Scene() {
  const groupRef = useRef<Group>(null);
  const pointer = usePointer();
  useFrame(() => {
    const g = groupRef.current;
    if (!g) return;
    g.rotation.y += (pointer[0] * 0.12 - g.rotation.y) * 0.05;
    g.rotation.x += (-pointer[1] * 0.08 - g.rotation.x) * 0.05;
  });
  return (
    <group ref={groupRef}>
      <HologramGrid />
      <Stars />
      <Orb />
    </group>
  );
}

export default function ParallaxCanvas() {
  return (
    <Canvas
      dpr={[1, 1.5]}
      gl={{ antialias: false, powerPreference: "low-power", alpha: true }}
      camera={{ position: [0, 0, 4], fov: 50 }}
      style={{ width: "100%", height: "100%" }}
    >
      <ambientLight intensity={0.35} />
      <pointLight position={[4, 4, 4]} intensity={1.2} color="#f5c563" />
      <pointLight position={[-4, -2, -3]} intensity={0.7} color="#b478f0" />
      <pointLight position={[0, 0, 5]} intensity={0.35} color="#ffffff" />

      <CameraRig />
      <Scene />
    </Canvas>
  );
}
