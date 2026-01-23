"use client";

import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { OrbitControls, Stars, Html } from "@react-three/drei";
import React, { useRef, useMemo, useState } from "react";
import * as THREE from "three";
import { TextureLoader, Color, AdditiveBlending, ShaderMaterial, Vector3, BackSide } from "three";

// --- Configuration ---
const EARTH_RADIUS = 2; // Matched to provided code
const ROTATION_SPEED = 0.001; // Matched to provided code

const cities: { name: string; lat: number; lon: number; color: string }[] = [];

function latLonToVector3(lat: number, lon: number, radius: number) {
    const phi = (90 - lat) * (Math.PI / 180);
    const theta = (lon * Math.PI / 180) - Math.PI / 2;
    const x = radius * Math.sin(phi) * Math.cos(theta);
    const z = radius * Math.sin(phi) * Math.sin(theta);
    const y = radius * Math.cos(phi);
    return new THREE.Vector3(x, y, z);
}

// --- Shader Logic ---
// We pass textures in as arguments instead of calling useLoader inside
function getEarthMat(sunDirection, textures) {
    const { map, nightMap, cloudsMap } = textures;

    const uniforms = {
        dayTexture: { value: map },
        nightTexture: { value: nightMap },
        cloudsTexture: { value: cloudsMap },
        sunDirection: { value: sunDirection },
    };

    const vs = `
    varying vec2 vUv;
    varying vec3 vNormal;
    varying vec3 vPosition;

    void main() {
      vec4 modelPosition = modelMatrix * vec4(position, 1.0);
      gl_Position = projectionMatrix * viewMatrix * modelPosition;
      
      vec3 modelNormal = (modelMatrix * vec4(normal, 0.0)).xyz;
      
      vUv = uv;
      vNormal = modelNormal;
      vPosition = modelPosition.xyz;
    }
  `;

    const fs = `
    uniform sampler2D dayTexture;
    uniform sampler2D nightTexture;
    uniform sampler2D cloudsTexture;
    uniform vec3 sunDirection;

    varying vec2 vUv;
    varying vec3 vNormal;
    varying vec3 vPosition;

    void main() {
      vec3 viewDirection = normalize(vPosition - cameraPosition);
      vec3 normal = normalize(vNormal);
      vec3 color = vec3(0.0);

      // Sun orientation
      float sunOrientation = dot(sunDirection, normal);

      // Day / night color
      float dayMix = smoothstep(- 0.25, 0.5, sunOrientation);
      vec3 dayColor = texture2D(dayTexture, vUv).rgb;
      vec3 nightColor = texture2D(nightTexture, vUv).rgb;
      color = mix(nightColor, dayColor, dayMix);

      // Specular cloud color
      vec2 specularCloudsColor = texture2D(cloudsTexture, vUv).rg;

      // Clouds
      float cloudsMix = smoothstep(0.0, 1.0, specularCloudsColor.g);
      cloudsMix *= dayMix;
      color = mix(color, vec3(1.0), cloudsMix);
      
      // Final color
      gl_FragColor = vec4(color, 1.0);
    }
  `;

    return new ShaderMaterial({
        uniforms: uniforms,
        vertexShader: vs,
        fragmentShader: fs,
    });
}

// --- Atmosphere Logic ---
function getFresnelShaderArgs({ rimHex = 0x0088ff, facingHex = 0x000000 } = {}) {
    const uniforms = {
        color1: { value: new Color(rimHex) },
        color2: { value: new Color(facingHex) },
        fresnelBias: { value: 0.1 },
        fresnelScale: { value: 1.0 },
        fresnelPower: { value: 4.0 },
    };
    const vs = `
  uniform float fresnelBias;
  uniform float fresnelScale;
  uniform float fresnelPower;
  
  varying float vReflectionFactor;
  
  void main() {
    vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );
    vec4 worldPosition = modelMatrix * vec4( position, 1.0 );
  
    vec3 worldNormal = normalize( mat3( modelMatrix[0].xyz, modelMatrix[1].xyz, modelMatrix[2].xyz ) * normal );
  
    vec3 I = worldPosition.xyz - cameraPosition;
  
    vReflectionFactor = fresnelBias + fresnelScale * pow( 1.0 + dot( normalize( I ), worldNormal ), fresnelPower );
  
    gl_Position = projectionMatrix * mvPosition;
  }
  `;
    const fs = `
  uniform vec3 color1;
  uniform vec3 color2;
  
  varying float vReflectionFactor;
  
  void main() {
    float f = clamp( vReflectionFactor, 0.0, 1.0 );
    gl_FragColor = vec4(mix(color2, color1, vec3(f)), f);
  }
  `;
    return {
        uniforms: uniforms,
        vertexShader: vs,
        fragmentShader: fs,
        transparent: true,
        blending: AdditiveBlending,
    };
}


function Earth({ sunDirection }) {
    const earthRef = useRef<THREE.Group>(null);
    const [hoveredCity, setHoveredCity] = useState<string | null>(null);

    // FIX: Call useLoader at top level of component
    const [map, nightMap, cloudsMap] = useLoader(TextureLoader, [
        "/textures/earth-daymap-4k.jpg",
        "/textures/earth-nightmap-4k.jpg",
        "/textures/earth-clouds-4k.jpg"
    ]);

    // Custom Shader Materials - Pass textures properly
    const earthMaterial = useMemo(() => getEarthMat(sunDirection, { map, nightMap, cloudsMap }), [sunDirection, map, nightMap, cloudsMap]);
    const atmosphereArgs = useMemo(() => getFresnelShaderArgs({ rimHex: 0x22d3ee, facingHex: 0x000000 }), []);

    // Axial Tilt
    const axialTilt = 23.4 * Math.PI / 180;

    useFrame((state, delta) => {
        if (earthRef.current) {
            earthRef.current.rotation.y += ROTATION_SPEED;
        }
    });

    const cityPositions = useMemo(() => {
        return cities.map(city => ({
            ...city,
            pos: latLonToVector3(city.lat, city.lon, EARTH_RADIUS) // Radius matched to geometry
        }));
    }, []);

    // Generate connections
    const connections = useMemo(() => {
        const lines: THREE.Vector3[] = [];
        cityPositions.forEach((cityA, i) => {
            let nearest = [];
            for (let j = 0; j < cityPositions.length; j++) {
                if (i !== j) {
                    const dist = cityA.pos.distanceTo(cityPositions[j].pos);
                    nearest.push({ idx: j, dist });
                }
            }
            nearest.sort((a, b) => a.dist - b.dist);
            nearest.slice(0, 2).forEach(n => {
                lines.push(cityA.pos);
                lines.push(cityPositions[n.idx].pos);
            });
        });
        return lines;
    }, [cityPositions]);

    return (
        <group rotation-z={axialTilt}>
            <group ref={earthRef}>
                {/* Custom Shader Earth */}
                <mesh>
                    <icosahedronGeometry args={[EARTH_RADIUS, 64]} />
                    <primitive object={earthMaterial} attach="material" />
                </mesh>

                {/* Atmosphere Mesh */}
                <mesh scale={[1.01, 1.01, 1.01]}>
                    <icosahedronGeometry args={[EARTH_RADIUS, 64]} />
                    <shaderMaterial {...atmosphereArgs} />
                </mesh>

                {/* Cities Overlay (Rotates with Earth) */}
                {cityPositions.map((city, i) => (
                    <group key={i} position={city.pos}>
                        <mesh
                            onPointerOver={() => setHoveredCity(city.name)}
                            onPointerOut={() => setHoveredCity(null)}
                        >
                            <sphereGeometry args={[0.08, 16, 16]} />
                            <meshBasicMaterial color={city.color} toneMapped={false} />
                        </mesh>
                        <mesh scale={[1.5, 1.5, 1.5]}>
                            <ringGeometry args={[0.07, 0.09, 32]} />
                            <meshBasicMaterial color={city.color} transparent opacity={0.6} side={THREE.DoubleSide} toneMapped={false} />
                        </mesh>
                        <Html distanceFactor={10}>
                            <div className={`
                                px-2 py-1 bg-black/80 border border-white/10 backdrop-blur-md rounded
                                text-[10px] font-mono whitespace-nowrap transition-opacity duration-300
                                ${hoveredCity === city.name ? 'opacity-100' : 'opacity-0'}
                            `}>
                                <span style={{ color: city.color }}>●</span> {city.name.toUpperCase()}
                            </div>
                        </Html>
                    </group>
                ))}

                {/* Connections (Rotates with Earth) */}
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
                        color="#22d3ee"
                        transparent
                        opacity={0.2}
                        depthWrite={false}
                    />
                </lineSegments>
            </group>
        </group>
    );
}

export default function GlobalReach() {
    const sunDirection = useMemo(() => new Vector3(-2, 0.5, 1.5).normalize(), []);

    return (
        <section className="h-[600px] w-full relative bg-transparent overflow-visible">


            {/* 3D Scene */}
            <div className="absolute inset-0">
                <Canvas
                    camera={{ position: [0, 0, 6], fov: 45 }}
                    gl={{ toneMapping: THREE.NoToneMapping }}
                >
                    <OrbitControls
                        enableZoom={false}
                        enablePan={false}
                    />
                    <ambientLight intensity={0.1} /> {/* Low ambient, shader handles day/night */}
                    <directionalLight position={[-2, 0.5, 1.5]} intensity={1} />
                    <Stars radius={100} depth={50} count={3000} factor={4} saturation={0} fade speed={1} />
                    <React.Suspense fallback={null}>
                        <Earth sunDirection={sunDirection} />
                    </React.Suspense>
                </Canvas>
            </div>




        </section>
    );
}
