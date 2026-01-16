// @ts-nocheck
"use client";

import { useRef, useMemo, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Html, Preload } from "@react-three/drei";
import * as THREE from "three";

// Single Neuron
const Neuron = ({ position, color, size = 0.15, delay = 0 }) => {
    const meshRef = useRef();
    const glowRef = useRef();
    const [activated, setActivated] = useState(false);

    useFrame((state) => {
        const t = state.clock.elapsedTime + delay;

        // Pulse effect
        if (meshRef.current) {
            const pulse = 1 + Math.sin(t * 3) * 0.1;
            meshRef.current.scale.setScalar(size * pulse);
        }

        // Glow intensity based on "activation"
        if (glowRef.current) {
            const intensity = 0.3 + Math.sin(t * 2) * 0.2;
            glowRef.current.material.opacity = intensity;
        }

        // Random activation simulation
        if (Math.sin(t * 5 + delay * 10) > 0.95 && !activated) {
            setActivated(true);
            setTimeout(() => setActivated(false), 300);
        }
    });

    return (
        <group position={position}>
            {/* Core neuron */}
            <mesh ref={meshRef}>
                <sphereGeometry args={[1, 16, 16]} />
                <meshStandardMaterial
                    color={activated ? "#ffffff" : color}
                    emissive={color}
                    emissiveIntensity={activated ? 1.5 : 0.5}
                    metalness={0.8}
                    roughness={0.2}
                />
            </mesh>

            {/* Glow effect */}
            <mesh ref={glowRef} scale={1.8}>
                <sphereGeometry args={[size, 16, 16]} />
                <meshBasicMaterial
                    color={color}
                    transparent
                    opacity={0.3}
                />
            </mesh>
        </group>
    );
};

// Connection between neurons with animated data flow
const Connection = ({ start, end, color, dataFlowSpeed = 1 }) => {
    const lineRef = useRef();
    const particleRef = useRef();

    const curve = useMemo(() => {
        const midPoint = [
            (start[0] + end[0]) / 2,
            (start[1] + end[1]) / 2 + (Math.random() - 0.5) * 0.3,
            (start[2] + end[2]) / 2,
        ];
        return new THREE.QuadraticBezierCurve3(
            new THREE.Vector3(...start),
            new THREE.Vector3(...midPoint),
            new THREE.Vector3(...end)
        );
    }, [start, end]);

    const points = useMemo(() => curve.getPoints(20), [curve]);
    const geometry = useMemo(
        () => new THREE.BufferGeometry().setFromPoints(points),
        [points]
    );

    useFrame((state) => {
        // Animate data particle along the connection
        if (particleRef.current) {
            const t = ((state.clock.elapsedTime * dataFlowSpeed) % 1);
            const point = curve.getPoint(t);
            particleRef.current.position.copy(point);
            particleRef.current.material.opacity = Math.sin(t * Math.PI);
        }

        // Pulse connection opacity
        if (lineRef.current) {
            lineRef.current.material.opacity = 0.15 + Math.sin(state.clock.elapsedTime * 2) * 0.05;
        }
    });

    return (
        <group>
            {/* Connection line */}
            <line ref={lineRef} geometry={geometry}>
                <lineBasicMaterial color={color} transparent opacity={0.2} />
            </line>

            {/* Data flow particle */}
            <mesh ref={particleRef}>
                <sphereGeometry args={[0.03, 8, 8]} />
                <meshBasicMaterial color="#ffffff" transparent opacity={0.8} />
            </mesh>
        </group>
    );
};

// Layer label - using Html for reliable rendering without custom fonts
const LayerLabel = ({ position, text, color }) => {
    return (
        <Html position={position} center>
            <div
                style={{
                    color: color,
                    fontSize: '10px',
                    fontFamily: 'monospace',
                    fontWeight: 'bold',
                    textTransform: 'uppercase',
                    letterSpacing: '2px',
                    whiteSpace: 'nowrap',
                    textShadow: `0 0 10px ${color}`,
                    userSelect: 'none',
                }}
            >
                {text}
            </div>
        </Html>
    );
};

// Full Neural Network
const NeuralNetworkScene = () => {
    const groupRef = useRef();

    // Define layers: [x position, neurons per layer, layer name]
    const layers = useMemo(() => [
        { x: -3, neurons: 4, name: "INPUT", color: "#00f3ff" },
        { x: -1, neurons: 6, name: "HIDDEN 1", color: "#bc13fe" },
        { x: 1, neurons: 5, name: "HIDDEN 2", color: "#bc13fe" },
        { x: 3, neurons: 3, name: "OUTPUT", color: "#00f3ff" },
    ], []);

    // Calculate neuron positions
    const neuronPositions = useMemo(() => {
        const positions = [];
        layers.forEach((layer, layerIdx) => {
            const layerPositions = [];
            const spacing = 0.6;
            const startY = ((layer.neurons - 1) * spacing) / 2;

            for (let i = 0; i < layer.neurons; i++) {
                layerPositions.push([layer.x, startY - i * spacing, 0]);
            }
            positions.push({ positions: layerPositions, ...layer });
        });
        return positions;
    }, [layers]);

    // Generate connections between layers
    const connections = useMemo(() => {
        const conns = [];
        for (let l = 0; l < neuronPositions.length - 1; l++) {
            const currentLayer = neuronPositions[l];
            const nextLayer = neuronPositions[l + 1];

            currentLayer.positions.forEach((startPos) => {
                nextLayer.positions.forEach((endPos) => {
                    // Only connect some neurons to avoid visual clutter
                    if (Math.random() > 0.3) {
                        conns.push({
                            start: startPos,
                            end: endPos,
                            color: currentLayer.color,
                            speed: 0.3 + Math.random() * 0.5,
                        });
                    }
                });
            });
        }
        return conns;
    }, [neuronPositions]);

    useFrame((state) => {
        if (groupRef.current) {
            // Subtle rotation based on mouse
            groupRef.current.rotation.y = state.mouse.x * 0.15;
            groupRef.current.rotation.x = state.mouse.y * 0.08;
        }
    });

    return (
        <group ref={groupRef}>
            {/* Background particles */}
            {[...Array(50)].map((_, i) => (
                <Float key={i} speed={0.5 + Math.random()} floatIntensity={0.2}>
                    <mesh
                        position={[
                            (Math.random() - 0.5) * 10,
                            (Math.random() - 0.5) * 6,
                            (Math.random() - 0.5) * 4 - 2,
                        ]}
                    >
                        <sphereGeometry args={[0.015, 8, 8]} />
                        <meshBasicMaterial
                            color={i % 2 === 0 ? "#00f3ff" : "#bc13fe"}
                            transparent
                            opacity={0.5}
                        />
                    </mesh>
                </Float>
            ))}

            {/* Connections */}
            {connections.map((conn, i) => (
                <Connection
                    key={i}
                    start={conn.start}
                    end={conn.end}
                    color={conn.color}
                    dataFlowSpeed={conn.speed}
                />
            ))}

            {/* Neurons */}
            {neuronPositions.map((layer, layerIdx) => (
                <group key={layerIdx}>
                    {layer.positions.map((pos, neuronIdx) => (
                        <Neuron
                            key={`${layerIdx}-${neuronIdx}`}
                            position={pos}
                            color={layer.color}
                            size={0.12 + (layerIdx === 0 || layerIdx === neuronPositions.length - 1 ? 0.03 : 0)}
                            delay={layerIdx * 0.5 + neuronIdx * 0.2}
                        />
                    ))}

                    {/* Layer label */}
                    <LayerLabel
                        position={[layer.x, -2.2, 0]}
                        text={layer.name}
                        color={layer.color}
                    />
                </group>
            ))}

            {/* Data flow arrows */}
            {[...Array(3)].map((_, i) => (
                <mesh key={i} position={[-2 + i * 2, -2.5, 0]}>
                    <boxGeometry args={[0.8, 0.02, 0.02]} />
                    <meshBasicMaterial color="#333333" />
                </mesh>
            ))}
        </group>
    );
};

// Exported Canvas Component
const NeuralNetwork3D = () => {
    return (
        <div className="w-full h-[400px] md:h-[500px]">
            <Canvas
                camera={{ position: [0, 0, 6], fov: 50 }}
                dpr={[1, 2]}
                gl={{ antialias: true, alpha: true }}
            >
                {/* Lighting */}
                <ambientLight intensity={0.4} />
                <pointLight position={[10, 10, 10]} intensity={0.6} color="#00f3ff" />
                <pointLight position={[-10, -10, -5]} intensity={0.4} color="#bc13fe" />
                <pointLight position={[0, 5, 5]} intensity={0.3} color="#ffffff" />

                <NeuralNetworkScene />

                <Preload all />
            </Canvas>
        </div>
    );
};

export default NeuralNetwork3D;

