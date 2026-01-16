// @ts-nocheck
"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial, Sphere, Text, Preload } from "@react-three/drei";
import * as THREE from "three";

// Individual Skill Sphere
const SkillSphere = ({ position, color, emissive, size = 1, speed = 1, label }) => {
    const meshRef = useRef();
    const textRef = useRef();

    useFrame((state) => {
        if (meshRef.current) {
            // Subtle pulsing effect
            const scale = 1 + Math.sin(state.clock.elapsedTime * 2 + position[0]) * 0.05;
            meshRef.current.scale.setScalar(scale * size);
        }
    });

    return (
        <Float
            speed={speed}
            rotationIntensity={0.4}
            floatIntensity={0.8}
            position={position}
        >
            <group>
                {/* Main Sphere */}
                <mesh ref={meshRef}>
                    <icosahedronGeometry args={[0.5, 2]} />
                    <MeshDistortMaterial
                        color={color}
                        emissive={emissive}
                        emissiveIntensity={0.4}
                        distort={0.2}
                        speed={3}
                        roughness={0.2}
                        metalness={0.8}
                        transparent
                        opacity={0.9}
                    />
                </mesh>

                {/* Glow Effect */}
                <mesh scale={1.2}>
                    <sphereGeometry args={[0.5, 16, 16]} />
                    <meshBasicMaterial
                        color={emissive}
                        transparent
                        opacity={0.1}
                    />
                </mesh>

                {/* Wireframe Overlay */}
                <mesh scale={1.1}>
                    <icosahedronGeometry args={[0.5, 1]} />
                    <meshBasicMaterial
                        color={emissive}
                        wireframe
                        transparent
                        opacity={0.3}
                    />
                </mesh>
            </group>
        </Float>
    );
};

// Connecting Lines between spheres
const ConnectionLines = ({ points }) => {
    const lineRef = useRef();

    const positions = useMemo(() => {
        const pos = [];
        points.forEach((point, i) => {
            if (i < points.length - 1) {
                pos.push(...point, ...points[i + 1]);
            }
        });
        return new Float32Array(pos);
    }, [points]);

    useFrame((state) => {
        if (lineRef.current) {
            lineRef.current.material.opacity = 0.1 + Math.sin(state.clock.elapsedTime) * 0.05;
        }
    });

    return (
        <line ref={lineRef}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    count={positions.length / 3}
                    array={positions}
                    itemSize={3}
                />
            </bufferGeometry>
            <lineBasicMaterial color="#00f3ff" transparent opacity={0.15} />
        </line>
    );
};

// Main Skill Spheres Scene
const SkillSpheresScene = () => {
    const groupRef = useRef();

    // Skill categories with positions and colors
    const skills = useMemo(() => [
        { position: [-2, 1.5, 0], color: "#00f3ff", emissive: "#00f3ff", size: 1.2, speed: 1.5, label: "LANGUAGES" },
        { position: [2, 1, 0.5], color: "#bc13fe", emissive: "#bc13fe", size: 1.1, speed: 1.8, label: "FRAMEWORKS" },
        { position: [0, -1, 1], color: "#ff006e", emissive: "#ff006e", size: 1, speed: 1.2, label: "TOOLS" },
        { position: [-1.5, -0.5, -0.5], color: "#00f3ff", emissive: "#00f3ff", size: 0.9, speed: 2, label: "DOMAINS" },
        { position: [1.5, 0, -1], color: "#bc13fe", emissive: "#bc13fe", size: 0.85, speed: 1.6, label: "AI/ML" },
    ], []);

    // Points for connection lines
    const connectionPoints = useMemo(() =>
        skills.map(s => s.position),
        [skills]);

    useFrame((state) => {
        if (groupRef.current) {
            // Subtle rotation based on mouse
            groupRef.current.rotation.y = state.mouse.x * 0.2;
            groupRef.current.rotation.x = state.mouse.y * 0.1;
        }
    });

    return (
        <group ref={groupRef}>
            {/* Ambient particles */}
            {[...Array(30)].map((_, i) => (
                <Float key={i} speed={0.5 + Math.random()} floatIntensity={0.3}>
                    <mesh
                        position={[
                            (Math.random() - 0.5) * 8,
                            (Math.random() - 0.5) * 6,
                            (Math.random() - 0.5) * 4,
                        ]}
                    >
                        <sphereGeometry args={[0.02, 8, 8]} />
                        <meshBasicMaterial
                            color={i % 2 === 0 ? "#00f3ff" : "#bc13fe"}
                            transparent
                            opacity={0.6}
                        />
                    </mesh>
                </Float>
            ))}

            {/* Connection Lines */}
            <ConnectionLines points={connectionPoints} />

            {/* Skill Spheres */}
            {skills.map((skill, index) => (
                <SkillSphere key={index} {...skill} />
            ))}

            {/* Central Core */}
            <Float speed={1} floatIntensity={0.5}>
                <mesh position={[0, 0.5, 0]}>
                    <octahedronGeometry args={[0.3, 0]} />
                    <meshStandardMaterial
                        color="#ffffff"
                        emissive="#00f3ff"
                        emissiveIntensity={0.5}
                        metalness={1}
                        roughness={0}
                    />
                </mesh>
            </Float>
        </group>
    );
};

// Exported Canvas Component
const SkillSpheres = () => {
    return (
        <div className="w-full h-[400px] md:h-[500px]">
            <Canvas
                camera={{ position: [0, 0, 6], fov: 45 }}
                dpr={[1, 2]}
                gl={{ antialias: true, alpha: true }}
            >
                {/* Lighting */}
                <ambientLight intensity={0.3} />
                <pointLight position={[10, 10, 10]} intensity={0.5} color="#00f3ff" />
                <pointLight position={[-10, -10, -5]} intensity={0.3} color="#bc13fe" />
                <pointLight position={[0, 5, 0]} intensity={0.4} color="#ffffff" />

                <SkillSpheresScene />

                <Preload all />
            </Canvas>
        </div>
    );
};

export default SkillSpheres;

