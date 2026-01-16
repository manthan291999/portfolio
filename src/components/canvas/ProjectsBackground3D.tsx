// @ts-nocheck
"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Preload } from "@react-three/drei";
import * as THREE from "three";

// Floating Tech Cube
const TechCube = ({ position, size = 0.3, color, rotationSpeed = 1 }) => {
    const meshRef = useRef();
    const wireRef = useRef();

    useFrame((state) => {
        const t = state.clock.elapsedTime * rotationSpeed;
        if (meshRef.current) {
            meshRef.current.rotation.x = t * 0.5;
            meshRef.current.rotation.y = t * 0.3;
        }
        if (wireRef.current) {
            wireRef.current.rotation.x = -t * 0.3;
            wireRef.current.rotation.y = -t * 0.5;
        }
    });

    return (
        <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.5} position={position}>
            <group>
                {/* Solid inner cube */}
                <mesh ref={meshRef} scale={size}>
                    <boxGeometry args={[1, 1, 1]} />
                    <meshStandardMaterial
                        color={color}
                        emissive={color}
                        emissiveIntensity={0.3}
                        metalness={0.8}
                        roughness={0.2}
                        transparent
                        opacity={0.6}
                    />
                </mesh>

                {/* Wireframe outer */}
                <mesh ref={wireRef} scale={size * 1.4}>
                    <boxGeometry args={[1, 1, 1]} />
                    <meshBasicMaterial
                        color={color}
                        wireframe
                        transparent
                        opacity={0.3}
                    />
                </mesh>
            </group>
        </Float>
    );
};

// Holographic Frame
const HoloFrame = ({ position, size = [2, 1.5], color }) => {
    const ref = useRef();

    useFrame((state) => {
        if (ref.current) {
            ref.current.material.opacity = 0.1 + Math.sin(state.clock.elapsedTime * 2) * 0.05;
        }
    });

    const points = useMemo(() => {
        const [w, h] = size;
        return [
            new THREE.Vector3(-w / 2, -h / 2, 0),
            new THREE.Vector3(w / 2, -h / 2, 0),
            new THREE.Vector3(w / 2, h / 2, 0),
            new THREE.Vector3(-w / 2, h / 2, 0),
            new THREE.Vector3(-w / 2, -h / 2, 0),
        ];
    }, [size]);

    const geometry = useMemo(
        () => new THREE.BufferGeometry().setFromPoints(points),
        [points]
    );

    return (
        <Float speed={0.5} floatIntensity={0.2} position={position}>
            <line ref={ref} geometry={geometry}>
                <lineBasicMaterial color={color} transparent opacity={0.15} />
            </line>
        </Float>
    );
};

// Floating Particles Grid
const ParticleGrid = () => {
    const particlesRef = useRef();

    const positions = useMemo(() => {
        const pos = [];
        const gridSize = 8;
        const spacing = 1;
        for (let x = 0; x < gridSize; x++) {
            for (let y = 0; y < gridSize; y++) {
                pos.push(
                    (x - gridSize / 2) * spacing + (Math.random() - 0.5) * 0.3,
                    (y - gridSize / 2) * spacing * 0.6 + (Math.random() - 0.5) * 0.3,
                    (Math.random() - 0.5) * 2 - 3
                );
            }
        }
        return new Float32Array(pos);
    }, []);

    useFrame((state) => {
        if (particlesRef.current) {
            particlesRef.current.rotation.z = state.clock.elapsedTime * 0.02;
        }
    });

    return (
        <points ref={particlesRef}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    count={positions.length / 3}
                    array={positions}
                    itemSize={3}
                />
            </bufferGeometry>
            <pointsMaterial
                size={0.03}
                color="#00f3ff"
                transparent
                opacity={0.4}
                sizeAttenuation
            />
        </points>
    );
};

// Gear Shape
const Gear = ({ position, size = 0.5, color, speed = 1 }) => {
    const ref = useRef();

    useFrame((state) => {
        if (ref.current) {
            ref.current.rotation.z = state.clock.elapsedTime * speed;
        }
    });

    return (
        <Float speed={1} floatIntensity={0.3} position={position}>
            <mesh ref={ref}>
                <torusGeometry args={[size, size * 0.15, 8, 12]} />
                <meshBasicMaterial color={color} transparent opacity={0.4} wireframe />
            </mesh>
        </Float>
    );
};

// Code Bracket
const CodeBracket = ({ position, color, isOpen = true }) => {
    const points = useMemo(() => {
        const h = 0.8;
        const w = 0.3;
        if (isOpen) {
            return [
                new THREE.Vector3(w, -h, 0),
                new THREE.Vector3(0, -h * 0.5, 0),
                new THREE.Vector3(0, h * 0.5, 0),
                new THREE.Vector3(w, h, 0),
            ];
        }
        return [
            new THREE.Vector3(-w, -h, 0),
            new THREE.Vector3(0, -h * 0.5, 0),
            new THREE.Vector3(0, h * 0.5, 0),
            new THREE.Vector3(-w, h, 0),
        ];
    }, [isOpen]);

    const geometry = useMemo(
        () => new THREE.BufferGeometry().setFromPoints(points),
        [points]
    );

    return (
        <Float speed={1} floatIntensity={0.3} position={position}>
            <line geometry={geometry}>
                <lineBasicMaterial color={color} transparent opacity={0.5} linewidth={2} />
            </line>
        </Float>
    );
};

// Main Projects Background Scene
const ProjectsScene = () => {
    const groupRef = useRef();

    useFrame((state) => {
        if (groupRef.current) {
            groupRef.current.rotation.y = state.mouse.x * 0.05;
            groupRef.current.rotation.x = state.mouse.y * 0.03;
        }
    });

    return (
        <group ref={groupRef}>
            {/* Particle Grid */}
            <ParticleGrid />

            {/* Floating Cubes */}
            <TechCube position={[-4, 2, -2]} size={0.4} color="#00f3ff" rotationSpeed={0.5} />
            <TechCube position={[4, -1, -3]} size={0.3} color="#bc13fe" rotationSpeed={0.7} />
            <TechCube position={[-3, -2, -1]} size={0.25} color="#00f3ff" rotationSpeed={0.6} />
            <TechCube position={[3, 2.5, -2]} size={0.35} color="#bc13fe" rotationSpeed={0.4} />

            {/* Holographic Frames */}
            <HoloFrame position={[-5, 0, -4]} size={[1.5, 1]} color="#00f3ff" />
            <HoloFrame position={[5, 1, -5]} size={[1.2, 0.8]} color="#bc13fe" />
            <HoloFrame position={[0, -3, -4]} size={[2, 1.2]} color="#00f3ff" />

            {/* Gears */}
            <Gear position={[-5, -2, -2]} size={0.4} color="#bc13fe" speed={0.3} />
            <Gear position={[5, -2, -3]} size={0.5} color="#00f3ff" speed={-0.2} />

            {/* Code Brackets */}
            <CodeBracket position={[-2, 3, -2]} color="#00f3ff" isOpen={true} />
            <CodeBracket position={[2, 3, -2]} color="#bc13fe" isOpen={false} />

            {/* Ambient floating particles */}
            {[...Array(30)].map((_, i) => (
                <Float key={i} speed={0.3 + Math.random() * 0.5} floatIntensity={0.3}>
                    <mesh
                        position={[
                            (Math.random() - 0.5) * 12,
                            (Math.random() - 0.5) * 8,
                            (Math.random() - 0.5) * 4 - 3,
                        ]}
                    >
                        <octahedronGeometry args={[0.04]} />
                        <meshBasicMaterial
                            color={i % 2 === 0 ? "#00f3ff" : "#bc13fe"}
                            transparent
                            opacity={0.6}
                        />
                    </mesh>
                </Float>
            ))}
        </group>
    );
};

// Exported Canvas Component
const ProjectsBackground3D = () => {
    return (
        <div className="absolute inset-0 -z-10">
            <Canvas
                camera={{ position: [0, 0, 5], fov: 50 }}
                dpr={[1, 1.5]}
                gl={{ antialias: true, alpha: true }}
            >
                <ambientLight intensity={0.2} />
                <pointLight position={[10, 10, 10]} intensity={0.3} color="#00f3ff" />
                <pointLight position={[-10, -10, -5]} intensity={0.2} color="#bc13fe" />

                <ProjectsScene />

                <Preload all />
            </Canvas>
        </div>
    );
};

export default ProjectsBackground3D;

