// @ts-nocheck
"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Sphere, Preload } from "@react-three/drei";
import * as THREE from "three";

// Location marker component
const LocationMarker = ({ position, color = "#00f3ff" }) => {
    const markerRef = useRef();
    const ringRef = useRef();

    useFrame((state) => {
        if (markerRef.current) {
            markerRef.current.scale.setScalar(1 + Math.sin(state.clock.elapsedTime * 3) * 0.2);
        }
        if (ringRef.current) {
            ringRef.current.scale.setScalar(1 + Math.sin(state.clock.elapsedTime * 2) * 0.3);
            ringRef.current.rotation.z = state.clock.elapsedTime;
        }
    });

    return (
        <group position={position}>
            {/* Main marker dot */}
            <mesh ref={markerRef}>
                <sphereGeometry args={[0.04, 16, 16]} />
                <meshBasicMaterial color={color} />
            </mesh>

            {/* Pulsing ring */}
            <mesh ref={ringRef} rotation={[Math.PI / 2, 0, 0]}>
                <ringGeometry args={[0.06, 0.08, 32]} />
                <meshBasicMaterial color={color} transparent opacity={0.6} side={THREE.DoubleSide} />
            </mesh>

            {/* Vertical beam */}
            <mesh position={[0, 0.15, 0]}>
                <cylinderGeometry args={[0.005, 0.005, 0.3, 8]} />
                <meshBasicMaterial color={color} transparent opacity={0.4} />
            </mesh>
        </group>
    );
};

// Network connection lines
const NetworkLines = ({ points }) => {
    const lineRef = useRef();

    useFrame((state) => {
        if (lineRef.current) {
            lineRef.current.material.opacity = 0.15 + Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
        }
    });

    const positions = useMemo(() => {
        const pos = [];
        // Create constellation-like connections
        for (let i = 0; i < points.length; i++) {
            for (let j = i + 1; j < points.length; j++) {
                if (Math.random() > 0.7) { // Random connections
                    pos.push(...points[i], ...points[j]);
                }
            }
        }
        return new Float32Array(pos);
    }, [points]);

    if (positions.length === 0) return null;

    return (
        <lineSegments ref={lineRef}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    count={positions.length / 3}
                    array={positions}
                    itemSize={3}
                />
            </bufferGeometry>
            <lineBasicMaterial color="#00f3ff" transparent opacity={0.2} />
        </lineSegments>
    );
};

// Point cloud for landmasses
const PointCloud = ({ count = 800 }) => {
    const pointsRef = useRef();

    const positions = useMemo(() => {
        const pos = [];
        const radius = 1.5;

        for (let i = 0; i < count; i++) {
            // Fibonacci sphere distribution for even coverage
            const phi = Math.acos(-1 + (2 * i) / count);
            const theta = Math.sqrt(count * Math.PI) * phi;

            // Add some randomness for organic look
            const r = radius + (Math.random() - 0.5) * 0.02;

            const x = r * Math.sin(phi) * Math.cos(theta);
            const y = r * Math.sin(phi) * Math.sin(theta);
            const z = r * Math.cos(phi);

            pos.push(x, y, z);
        }

        return new Float32Array(pos);
    }, [count]);

    useFrame((state) => {
        if (pointsRef.current) {
            pointsRef.current.rotation.y = state.clock.elapsedTime * 0.1;
        }
    });

    return (
        <points ref={pointsRef}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    count={positions.length / 3}
                    array={positions}
                    itemSize={3}
                />
            </bufferGeometry>
            <pointsMaterial
                color="#00f3ff"
                size={0.02}
                transparent
                opacity={0.6}
                sizeAttenuation
            />
        </points>
    );
};

// Main Earth scene
const EarthScene = () => {
    const groupRef = useRef();
    const wireframeRef = useRef();

    // Convert lat/lng to 3D position
    // Ahmedabad, India: 23.0225° N, 72.5714° E
    const latLngToPosition = (lat, lng, radius = 1.52) => {
        const phi = (90 - lat) * (Math.PI / 180);
        const theta = (lng + 180) * (Math.PI / 180);

        const x = -radius * Math.sin(phi) * Math.cos(theta);
        const y = radius * Math.cos(phi);
        const z = radius * Math.sin(phi) * Math.sin(theta);

        return [x, y, z];
    };

    // Location: Ahmedabad, India
    const ahmedabadPosition = latLngToPosition(23.0225, 72.5714);

    // Generate network node positions
    const networkNodes = useMemo(() => {
        const nodes = [];
        const radius = 1.52;

        // Add some random city-like positions
        const cities = [
            [51.5074, -0.1278],   // London
            [40.7128, -74.006],   // New York
            [35.6762, 139.6503],  // Tokyo
            [37.7749, -122.4194], // San Francisco
            [1.3521, 103.8198],   // Singapore
            [-33.8688, 151.2093], // Sydney
        ];

        cities.forEach(([lat, lng]) => {
            nodes.push(latLngToPosition(lat, lng, radius));
        });

        return nodes;
    }, []);

    useFrame((state) => {
        if (groupRef.current) {
            // Auto rotation
            groupRef.current.rotation.y = state.clock.elapsedTime * 0.1;

            // Mouse parallax
            groupRef.current.rotation.x = state.mouse.y * 0.1;
            groupRef.current.rotation.z = state.mouse.x * 0.05;
        }
    });

    return (
        <group ref={groupRef}>
            {/* Wireframe Globe */}
            <mesh ref={wireframeRef}>
                <sphereGeometry args={[1.5, 32, 32]} />
                <meshBasicMaterial
                    color="#0a1628"
                    transparent
                    opacity={0.3}
                />
            </mesh>

            {/* Latitude/Longitude Grid */}
            <mesh>
                <sphereGeometry args={[1.51, 24, 24]} />
                <meshBasicMaterial
                    color="#00f3ff"
                    wireframe
                    transparent
                    opacity={0.1}
                />
            </mesh>

            {/* Point Cloud */}
            <PointCloud count={600} />

            {/* Network Lines */}
            <NetworkLines points={[...networkNodes, ahmedabadPosition]} />

            {/* City Markers */}
            {networkNodes.map((pos, i) => (
                <LocationMarker
                    key={i}
                    position={pos}
                    color={i % 2 === 0 ? "#bc13fe" : "#00f3ff"}
                />
            ))}

            {/* Main Location Marker - Ahmedabad */}
            <LocationMarker position={ahmedabadPosition} color="#00ff88" />

            {/* Atmospheric Glow */}
            <mesh>
                <sphereGeometry args={[1.7, 32, 32]} />
                <meshBasicMaterial
                    color="#00f3ff"
                    transparent
                    opacity={0.03}
                    side={THREE.BackSide}
                />
            </mesh>

            {/* Outer Ring */}
            <mesh rotation={[Math.PI / 2, 0, 0]}>
                <ringGeometry args={[2, 2.02, 64]} />
                <meshBasicMaterial
                    color="#00f3ff"
                    transparent
                    opacity={0.2}
                    side={THREE.DoubleSide}
                />
            </mesh>
        </group>
    );
};

// Exported Canvas Component
const DigitalEarth = () => {
    return (
        <div className="w-full h-[350px] md:h-[450px] relative">
            <Canvas
                camera={{ position: [0, 0, 5], fov: 45 }}
                dpr={[1, 2]}
                gl={{ antialias: true, alpha: true }}
            >
                {/* Subtle Lighting */}
                <ambientLight intensity={0.2} />
                <pointLight position={[10, 10, 10]} intensity={0.3} color="#00f3ff" />
                <pointLight position={[-10, -10, 5]} intensity={0.2} color="#bc13fe" />

                <EarthScene />

                <Preload all />
            </Canvas>

            {/* Overlay Label */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                <span className="text-xs font-mono text-gray-500 tracking-widest">
                    AHMEDABAD, INDIA
                </span>
            </div>
        </div>
    );
};

export default DigitalEarth;

