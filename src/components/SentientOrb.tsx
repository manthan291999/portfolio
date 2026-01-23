"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { Sphere } from "@react-three/drei";

// Vertex Shader: Handles dynamic displacement (morphing)
const vertexShader = `
uniform float uTime;
uniform float uIntensity;
varying vec2 vUv;
varying float vDisplacement;

// Simplex Noise Function (Simplified)
vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec4 permute(vec4 x) { return mod289(((x*34.0)+1.0)*x); }
vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }
float snoise(vec3 v) {
  const vec2  C = vec2(1.0/6.0, 1.0/3.0) ;
  const vec4  D = vec4(0.0, 0.5, 1.0, 2.0);
  vec3 i  = floor(v + dot(v, C.yyy) );
  vec3 x0 = v - i + dot(i, C.xxx) ;
  vec3 g = step(x0.yzx, x0.xyz);
  vec3 l = 1.0 - g;
  vec3 i1 = min( g.xyz, l.zxy );
  vec3 i2 = max( g.xyz, l.zxy );
  vec3 x1 = x0 - i1 + C.xxx;
  vec3 x2 = x0 - i2 + C.yyy; // 2.0*C.x = 1/3 = C.y
  vec3 x3 = x0 - D.yyy;      // -1.0+3.0*C.x = -0.5 = -D.y
  i = mod289(i);
  vec4 p = permute( permute( permute(
             i.z + vec4(0.0, i1.z, i2.z, 1.0 ))
           + i.y + vec4(0.0, i1.y, i2.y, 1.0 ))
           + i.x + vec4(0.0, i1.x, i2.x, 1.0 ));
  float n_ = 0.142857142857; // 1.0/7.0
  vec3  ns = n_ * D.wyz - D.xzx;
  vec4 j = p - 49.0 * floor(p * ns.z * ns.z);  //  mod(p,7*7)
  vec4 x_ = floor(j * ns.z);
  vec4 y_ = floor(j - 7.0 * x_ );    // mod(j,N)
  vec4 x = x_ *ns.x + ns.yyyy;
  vec4 y = y_ *ns.x + ns.yyyy;
  vec4 h = 1.0 - abs(x) - abs(y);
  vec4 b0 = vec4( x.xy, y.xy );
  vec4 b1 = vec4( x.zw, y.zw );
  vec4 s0 = floor(b0)*2.0 + 1.0;
  vec4 s1 = floor(b1)*2.0 + 1.0;
  vec4 sh = -step(h, vec4(0.0));
  vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy ;
  vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww ;
  vec3 p0 = vec3(a0.xy,h.x);
  vec3 p1 = vec3(a0.zw,h.y);
  vec3 p2 = vec3(a1.xy,h.z);
  vec3 p3 = vec3(a1.zw,h.w);
  vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));
  p0 *= norm.x;
  p1 *= norm.y;
  p2 *= norm.z;
  p3 *= norm.w;
  vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
  m = m * m;
  return 42.0 * dot( m*m, vec4( dot(p0,x0), dot(p1,x1),
                                dot(p2,x2), dot(p3,x3) ) );
}

void main() {
  vUv = uv;
  
  // Dynamic noise displacement
  float noise = snoise(position * 2.0 + uTime * 0.5);
  vDisplacement = noise;
  
  vec3 newPosition = position + normal * noise * uIntensity;
  
  gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
}
`;

// Fragment Shader: Handles color blending and iridescence
const fragmentShader = `
uniform float uTime;
uniform vec3 uColorA;
uniform vec3 uColorB;
varying vec2 vUv;
varying float vDisplacement;

void main() {
  // Mix colors based on displacement and time
  float mixStrength = smoothstep(-0.2, 0.5, vDisplacement);
  vec3 color = mix(uColorA, uColorB, mixStrength + sin(uTime) * 0.1);
  
  // Add Fresnel-like glow
  float glow = pow(0.8 - dot(vDisplacement, vDisplacement), 4.0);
  
  gl_FragColor = vec4(color + glow * 0.5, 1.0);
}
`;

function OrbMesh({ state }) {
    const meshRef = useRef<THREE.Mesh>(null);

    // Shader Uniforms
    const uniforms = useMemo(() => ({
        uTime: { value: 0 },
        uIntensity: { value: 0.3 },
        uColorA: { value: new THREE.Color("#00f3ff") }, // Cyan
        uColorB: { value: new THREE.Color("#bc13fe") }, // Purple
    }), []);

    useFrame((stateObj) => {
        if (!meshRef.current) return;

        const material = meshRef.current.material as THREE.ShaderMaterial;

        // Update Time
        material.uniforms.uTime.value = stateObj.clock.elapsedTime;

        // Animate based on State
        const targetIntensity = state === "speaking" ? 0.6 : state === "thinking" ? 0.4 : 0.15;
        const targetSpeed = state === "speaking" ? 2.0 : state === "thinking" ? 3.0 : 0.5;

        // Lerp Intensity (Smooth transition)
        material.uniforms.uIntensity.value = THREE.MathUtils.lerp(
            material.uniforms.uIntensity.value,
            targetIntensity,
            0.1
        );

        // Color transition logic can be added here
        if (state === "listening") {
            material.uniforms.uColorB.value.set("#ff0055"); // Red/Pinkish for listening
        } else {
            material.uniforms.uColorB.value.set("#bc13fe"); // Back to Purple
        }

        // Rotation
        meshRef.current.rotation.y += 0.005 * targetSpeed;
        meshRef.current.rotation.z += 0.002 * targetSpeed;
    });

    return (
        <Sphere ref={meshRef} args={[1, 64, 64]}>
            <shaderMaterial
                attach="material"
                vertexShader={vertexShader}
                fragmentShader={fragmentShader}
                uniforms={uniforms}
                transparent
            />
        </Sphere>
    );
}

export default function SentientOrb({ state = "idle" }: { state?: "idle" | "listening" | "thinking" | "speaking" }) {
    return (
        <div className="w-full h-full relative">
            <Canvas camera={{ position: [0, 0, 3] }} gl={{ alpha: true, antialias: true }}>
                <ambientLight intensity={0.5} />
                <OrbMesh state={state} />
            </Canvas>
        </div>
    );
}
