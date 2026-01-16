// @ts-nocheck
"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Html, Preload } from "@react-three/drei";
import * as THREE from "three";

// Floating Geometric Shape
const FloatingShape = ({ position, type = "octahedron", size = 0.3, color, speed = 1 }) => {
    const meshRef = useRef();
    const wireRef = useRef();

    useFrame((state) => {
        const t = state.clock.elapsedTime * speed;
        if (meshRef.current) {
            meshRef.current.rotation.x = t * 0.5;
            meshRef.current.rotation.y = t * 0.3;
            meshRef.current.rotation.z = t * 0.2;
        }
        if (wireRef.current) {
            wireRef.current.rotation.x = -t * 0.3;
            wireRef.current.rotation.y = -t * 0.4;
        }
    });

    const Geometry = () => {
        switch (type) {
            case "cube":
                return <boxGeometry args={[1, 1, 1]} />;
            case "dodecahedron":
                return <dodecahedronGeometry args={[1, 0]} />;
            case "icosahedron":
                return <icosahedronGeometry args={[1, 0]} />;
            default:
                return <octahedronGeometry args={[1, 0]} />;
        }
    };

    return (
        <Float speed={1.5} rotationIntensity={0.4} floatIntensity={0.6} position={position}>
            <group>
                {/* Solid shape */}
                <mesh ref={meshRef} scale={size}>
                    <Geometry />
                    <meshStandardMaterial
                        color={color}
                        emissive={color}
                        emissiveIntensity={0.4}
                        metalness={0.9}
                        roughness={0.1}
                        transparent
                        opacity={0.7}
                    />
                </mesh>

                {/* Wireframe */}
                <mesh ref={wireRef} scale={size * 1.3}>
                    <Geometry />
                    <meshBasicMaterial
                        color={color}
                        wireframe
                        transparent
                        opacity={0.2}
                    />
                </mesh>
            </group>
        </Float>
    );
};

// Year Marker (Holographic) - using Html for reliable rendering
const YearMarker = ({ position, year, color }) => {
    return (
        <Float speed={0.5} floatIntensity={0.2} position={position}>
            <Html center>
                <div
                    style={{
                        color: color,
                        fontSize: '14px',
                        fontFamily: 'monospace',
                        fontWeight: 'bold',
                        textShadow: `0 0 10px ${color}`,
                        userSelect: 'none',
                    }}
                >
                    {year}
                </div>
            </Html>
        </Float>
    );
};

// Data Orb traveling along path
const DataOrb = ({ pathPoints, color, speed = 1, delay = 0 }) => {
    const ref = useRef();

    const curve = useMemo(() => {
        return new THREE.CatmullRomCurve3(
            pathPoints.map((p) => new THREE.Vector3(...p))
        );
    }, [pathPoints]);

    useFrame((state) => {
        if (ref.current) {
            const t = ((state.clock.elapsedTime * speed + delay) % 1);
            const point = curve.getPoint(t);
            ref.current.position.copy(point);
            ref.current.material.opacity = Math.sin(t * Math.PI) * 0.8;
        }
    });

    return (
        <mesh ref={ref}>
            <sphereGeometry args={[0.05, 16, 16]} />
            <meshBasicMaterial color={color} transparent opacity={0.8} />
        </mesh>
    );
};

// Circuit Line
const CircuitLine = ({ points, color }) => {
    const ref = useRef();

    const geometry = useMemo(() => {
        const vectors = points.map((p) => new THREE.Vector3(...p));
        return new THREE.BufferGeometry().setFromPoints(vectors);
    }, [points]);

    useFrame((state) => {
        if (ref.current) {
            ref.current.material.opacity = 0.15 + Math.sin(state.clock.elapsedTime * 2) * 0.1;
        }
    });

    return (
        <line ref={ref} geometry={geometry}>
            <lineBasicMaterial color={color} transparent opacity={0.2} />
        </line>
    );
};

// Timeline Background Scene
const TimelineScene = () => {
    const groupRef = useRef();

    // Timeline years
    const years = ["2021", "2022", "2024", "2025"];

    // Path for data orbs
    const orbPath = useMemo(() => [
        [-4, 2, -1],
        [-2, 1, -2],
        [0, 0, -1],
        [2, -1, -2],
        [4, -2, -1],
    ], []);

    useFrame((state) => {
        if (groupRef.current) {
            groupRef.current.rotation.y = state.mouse.x * 0.05;
            groupRef.current.rotation.x = state.mouse.y * 0.02;
        }
    });

    return (
        <group ref={groupRef}>
            {/* Floating Geometric Shapes */}
            <FloatingShape position={[-5, 2, -2]} type="octahedron" size={0.25} color="#00f3ff" speed={0.4} />
            <FloatingShape position={[5, 1, -3]} type="dodecahedron" size={0.3} color="#bc13fe" speed={0.3} />
            <FloatingShape position={[-4, -2, -1]} type="cube" size={0.2} color="#bc13fe" speed={0.5} />
            <FloatingShape position={[4, -1, -2]} type="icosahedron" size={0.25} color="#00f3ff" speed={0.35} />
            <FloatingShape position={[0, 3, -3]} type="octahedron" size={0.2} color="#00f3ff" speed={0.45} />

            {/* Year Markers */}
            {years.map((year, i) => (
                <YearMarker
                    key={year}
                    position={[-3 + i * 2, -2.5, -2]}
                    year={year}
                    color={i % 2 === 0 ? "#00f3ff" : "#bc13fe"}
                />
            ))}

            {/* Circuit Lines */}
            <CircuitLine
                points={[[-5, 1, -2], [-3, 0, -2], [-1, 1, -2], [1, 0, -2], [3, 1, -2], [5, 0, -2]]}
                color="#00f3ff"
            />
            <CircuitLine
                points={[[-5, -1, -3], [-2, 0, -3], [0, -1, -3], [2, 0, -3], [5, -1, -3]]}
                color="#bc13fe"
            />

            {/* Data Orbs */}
            <DataOrb pathPoints={orbPath} color="#00f3ff" speed={0.15} delay={0} />
            <DataOrb pathPoints={orbPath} color="#bc13fe" speed={0.15} delay={0.33} />
            <DataOrb pathPoints={orbPath} color="#00f3ff" speed={0.15} delay={0.66} />

            {/* Ambient particles */}
            {[...Array(40)].map((_, i) => (
                <Float key={i} speed={0.3 + Math.random() * 0.4} floatIntensity={0.2}>
                    <mesh
                        position={[
                            (Math.random() - 0.5) * 12,
                            (Math.random() - 0.5) * 8,
                            (Math.random() - 0.5) * 4 - 3,
                        ]}
                    >
                        <sphereGeometry args={[0.02, 8, 8]} />
                        <meshBasicMaterial
                            color={i % 2 === 0 ? "#00f3ff" : "#bc13fe"}
                            transparent
                            opacity={0.5}
                        />
                    </mesh>
                </Float>
            ))}

            {/* Connecting dots grid */}
            {[...Array(20)].map((_, i) => (
                <mesh
                    key={`grid-${i}`}
                    position={[
                        -4 + (i % 5) * 2,
                        2 - Math.floor(i / 5) * 1.5,
                        -4,
                    ]}
                >
                    <sphereGeometry args={[0.02, 8, 8]} />
                    <meshBasicMaterial color="#333333" transparent opacity={0.3} />
                </mesh>
            ))}
        </group>
    );
};

// Exported Canvas Component
const TimelineBackground3D = () => {
    return (
        <div className="absolute inset-0 -z-10 overflow-hidden">
            <Canvas
                camera={{ position: [0, 0, 5], fov: 50 }}
                dpr={[1, 1.5]}
                gl={{ antialias: true, alpha: true }}
            >
                <ambientLight intensity={0.2} />
                <pointLight position={[10, 10, 10]} intensity={0.3} color="#00f3ff" />
                <pointLight position={[-10, -10, -5]} intensity={0.2} color="#bc13fe" />

                <TimelineScene />

                <Preload all />
            </Canvas>
        </div>
    );
};

export default TimelineBackground3D;

