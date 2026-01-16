// @ts-nocheck
"use client";

import { useRef, useMemo, useState, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { Float, Instance, Instances, Line, Trail } from "@react-three/drei";
import * as THREE from "three";

// =====================================================
// NETWORK 1: Deep Neural Network (DNN) / Neural Brain
// Central visualization - Abstract brain with neurons
// and synaptic connections, representing a general DNN
// =====================================================
const Brain = ({ count = 400, color = "#00f3ff", connectionDistance = 2.5 }) => {
    const groupRef = useRef();

    // Generate neurons: Core (dense) and Cortex (outer shell)
    const { positions, connections, colors } = useMemo(() => {
        const tempPositions = [];
        const tempConnections = [];
        const tempColors = [];

        // 1. Core (Dense)
        for (let i = 0; i < count * 0.6; i++) {
            const r = Math.random() * 1.5;
            const theta = Math.random() * Math.PI * 2;
            const phi = Math.acos(2 * Math.random() - 1);
            tempPositions.push(new THREE.Vector3(
                r * Math.sin(phi) * Math.cos(theta),
                r * Math.sin(phi) * Math.sin(theta),
                r * Math.cos(phi)
            ));
            tempColors.push(new THREE.Color("#bc13fe")); // Core color
        }

        // 2. Cortex (Outer Layer)
        for (let i = 0; i < count * 0.4; i++) {
            const r = 1.8 + Math.random() * 1.2;
            const theta = Math.random() * Math.PI * 2;
            const phi = Math.acos(2 * Math.random() - 1);
            tempPositions.push(new THREE.Vector3(
                r * Math.sin(phi) * Math.cos(theta),
                r * Math.sin(phi) * Math.sin(theta),
                r * Math.cos(phi)
            ));
            tempColors.push(new THREE.Color("#00f3ff")); // Outer color
        }

        // Connections
        for (let i = 0; i < count; i++) {
            let connected = 0;
            for (let j = i + 1; j < count; j++) {
                const dist = tempPositions[i].distanceTo(tempPositions[j]);
                if (dist < connectionDistance && connected < 5) { // Limit connections per node
                    tempConnections.push(tempPositions[i]);
                    tempConnections.push(tempPositions[j]);
                    connected++;
                }
            }
        }

        return { positions: tempPositions, connections: tempConnections, colors: tempColors };
    }, [count, connectionDistance]);

    useFrame((state, delta) => {
        if (groupRef.current) {
            groupRef.current.rotation.y += delta * 0.05;
            // "Breathing" scale effect
            const s = 1 + Math.sin(state.clock.elapsedTime) * 0.02;
            groupRef.current.scale.set(s, s, s);
        }
    });

    return (
        <group ref={groupRef}>
            {/* Neurons */}
            <Instances range={count}>
                <sphereGeometry args={[0.08, 16, 16]} />
                <meshStandardMaterial
                    emissiveIntensity={1.2}
                    toneMapped={false}
                />
                {positions.map((pos, i) => (
                    <Instance
                        key={i}
                        position={[pos.x, pos.y, pos.z]}
                        color={colors[i]}
                    />
                ))}
            </Instances>

            {/* Pulsing Synapses */}
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
                    color="#00f3ff"
                    transparent
                    opacity={0.25}
                    depthWrite={false}
                />
            </lineSegments>

            {/* Neural Activity Particles (Firing neurons) */}
            {[...Array(8)].map((_, i) => (
                <ParticlePulse key={i} positions={positions} speed={0.5 + Math.random()} />
            ))}
        </group>
    );
};

// Moving pulse on neural pathways
const ParticlePulse = ({ positions, speed }) => {
    const ref = useRef();
    const currentPath = useRef({ start: 0, end: 1, progress: 0 });

    useFrame((state, delta) => {
        if (ref.current) {
            currentPath.current.progress += delta * speed;
            if (currentPath.current.progress >= 1) {
                // Pick new random start/end
                currentPath.current.start = Math.floor(Math.random() * positions.length);
                currentPath.current.end = Math.floor(Math.random() * positions.length);
                currentPath.current.progress = 0;
            }

            const p1 = positions[currentPath.current.start];
            const p2 = positions[currentPath.current.end];
            ref.current.position.lerpVectors(p1, p2, currentPath.current.progress);
        }
    });

    return (
        <mesh ref={ref}>
            <sphereGeometry args={[0.12, 12, 12]} />
            <meshBasicMaterial color="#ffffff" transparent opacity={0.9} />
        </mesh>
    );
};


// =====================================================
// NETWORK 2: Convolutional Neural Network (CNN)
// 3D Feature Map visualization - Stacked cubes showing
// how image data gets compressed through conv layers
// =====================================================
const CNNVisual = ({ position }) => {
    const groupRef = useRef();

    useFrame((state) => {
        if (groupRef.current) {
            groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.2) * 0.15;
        }
    });

    // Layer configurations matching reference image
    const convPlanes = 5;  // Blue stacked planes
    const poolPlanes = 4;  // Red stacked planes
    const fcNodes = 5;     // Fully connected layer nodes
    const outputNodes = 3; // Output nodes

    return (
        <group ref={groupRef} position={position} scale={0.5}>
            {/* INPUT: Brown/Gray Square (Image) */}
            <mesh position={[0, 0, 0]}>
                <boxGeometry args={[1.2, 1.2, 0.1]} />
                <meshStandardMaterial color="#6b5344" emissive="#6b5344" emissiveIntensity={0.3} />
            </mesh>
            {/* Small white square on input (represents filter/kernel) */}
            <mesh position={[0.3, 0.3, 0.06]}>
                <boxGeometry args={[0.25, 0.25, 0.02]} />
                <meshBasicMaterial color="#ffffff" />
            </mesh>

            {/* CONVOLUTION: 5 Stacked Blue Planes (diagonally offset) */}
            {[...Array(convPlanes)].map((_, i) => (
                <mesh key={`conv-${i}`} position={[1.8 + i * 0.15, -i * 0.12, i * 0.1]}>
                    <boxGeometry args={[0.08, 1.0 - i * 0.05, 0.8 - i * 0.04]} />
                    <meshStandardMaterial
                        color="#4a90d9"
                        emissive="#4a90d9"
                        emissiveIntensity={0.5}
                        transparent
                        opacity={0.85}
                    />
                </mesh>
            ))}

            {/* POOLING: 4 Stacked Red/Pink Planes (smaller, diagonally offset) */}
            {[...Array(poolPlanes)].map((_, i) => (
                <mesh key={`pool-${i}`} position={[3.5 + i * 0.12, -i * 0.1, i * 0.08]}>
                    <boxGeometry args={[0.08, 0.7 - i * 0.04, 0.55 - i * 0.03]} />
                    <meshStandardMaterial
                        color="#e85a71"
                        emissive="#e85a71"
                        emissiveIntensity={0.5}
                        transparent
                        opacity={0.85}
                    />
                </mesh>
            ))}

            {/* FULLY CONNECTED: Vertical column of purple nodes */}
            {[...Array(fcNodes)].map((_, i) => (
                <mesh key={`fc-${i}`} position={[5, (i - (fcNodes - 1) / 2) * 0.35, 0]}>
                    <sphereGeometry args={[0.12, 16, 16]} />
                    <meshStandardMaterial color="#bc13fe" emissive="#bc13fe" emissiveIntensity={0.8} />
                </mesh>
            ))}

            {/* OUTPUT: 3 purple nodes */}
            {[...Array(outputNodes)].map((_, i) => (
                <mesh key={`out-${i}`} position={[6.2, (i - (outputNodes - 1) / 2) * 0.5, 0]}>
                    <sphereGeometry args={[0.15, 16, 16]} />
                    <meshStandardMaterial color="#bc13fe" emissive="#bc13fe" emissiveIntensity={1} />
                </mesh>
            ))}

            {/* CONNECTION LINES: Input to Conv */}
            <Line points={[[0.6, 0.3, 0], [1.8, 0.3, 0]]} color="#666666" opacity={0.5} transparent lineWidth={1} />
            <Line points={[[0.6, -0.3, 0], [1.8, -0.3, 0]]} color="#666666" opacity={0.5} transparent lineWidth={1} />

            {/* CONNECTION LINES: Conv to Pool */}
            <Line points={[[2.6, 0, 0], [3.5, 0, 0]]} color="#666666" opacity={0.5} transparent lineWidth={1} />

            {/* CONNECTION LINES: Pool to FC (many connections) */}
            {[...Array(fcNodes)].map((_, i) => (
                <Line
                    key={`fc-conn-${i}`}
                    points={[[4.1, 0, 0], [4.88, (i - (fcNodes - 1) / 2) * 0.35, 0]]}
                    color="#666666"
                    opacity={0.3}
                    transparent
                    lineWidth={1}
                />
            ))}

            {/* CONNECTION LINES: FC to Output (fully connected) */}
            {[...Array(fcNodes)].map((_, fi) => (
                [...Array(outputNodes)].map((_, oi) => (
                    <Line
                        key={`fcout-${fi}-${oi}`}
                        points={[
                            [5.12, (fi - (fcNodes - 1) / 2) * 0.35, 0],
                            [6.05, (oi - (outputNodes - 1) / 2) * 0.5, 0]
                        ]}
                        color="#666666"
                        opacity={0.2}
                        transparent
                        lineWidth={1}
                    />
                ))
            ))}
        </group>
    );
};

// =====================================================
// NETWORK 3: Recurrent Neural Network (RNN / LSTM)
// Multi-layer network with recurrent feedback loops
// matching the reference diagram style
// =====================================================
const RNNVisual = ({ position }) => {
    const groupRef = useRef();

    useFrame((state) => {
        if (groupRef.current) {
            groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.15) * 0.1;
        }
    });

    // Layer configurations matching reference image
    const inputNodes = 3;    // Green nodes (left)
    const hidden1Nodes = 5;  // Yellow nodes 
    const hidden2Nodes = 4;  // Coral/Orange nodes
    const outputNodes = 1;   // Blue node (right)

    const layerSpacing = 1.5;
    const nodeSpacing = 0.4;

    // Generate node positions for each layer
    const getLayerNodes = (count, xPos) => {
        const nodes = [];
        const startY = -((count - 1) * nodeSpacing) / 2;
        for (let i = 0; i < count; i++) {
            nodes.push({ x: xPos, y: startY + i * nodeSpacing, z: 0 });
        }
        return nodes;
    };

    const inputLayer = getLayerNodes(inputNodes, 0);
    const hidden1Layer = getLayerNodes(hidden1Nodes, layerSpacing);
    const hidden2Layer = getLayerNodes(hidden2Nodes, layerSpacing * 2);
    const outputLayer = getLayerNodes(outputNodes, layerSpacing * 3);

    return (
        <group ref={groupRef} position={position} scale={0.6}>
            {/* INPUT LAYER: Green nodes */}
            {inputLayer.map((node, i) => (
                <mesh key={`in-${i}`} position={[node.x, node.y, node.z]}>
                    <sphereGeometry args={[0.15, 16, 16]} />
                    <meshStandardMaterial color="#2d9b8a" emissive="#2d9b8a" emissiveIntensity={0.8} />
                </mesh>
            ))}

            {/* HIDDEN LAYER 1: Yellow nodes */}
            {hidden1Layer.map((node, i) => (
                <mesh key={`h1-${i}`} position={[node.x, node.y, node.z]}>
                    <sphereGeometry args={[0.15, 16, 16]} />
                    <meshStandardMaterial color="#f5b841" emissive="#f5b841" emissiveIntensity={0.8} />
                </mesh>
            ))}

            {/* HIDDEN LAYER 2: Coral/Orange nodes */}
            {hidden2Layer.map((node, i) => (
                <mesh key={`h2-${i}`} position={[node.x, node.y, node.z]}>
                    <sphereGeometry args={[0.15, 16, 16]} />
                    <meshStandardMaterial color="#e8a07e" emissive="#e8a07e" emissiveIntensity={0.8} />
                </mesh>
            ))}

            {/* OUTPUT LAYER: Blue node */}
            {outputLayer.map((node, i) => (
                <mesh key={`out-${i}`} position={[node.x, node.y, node.z]}>
                    <sphereGeometry args={[0.2, 16, 16]} />
                    <meshStandardMaterial color="#4a90d9" emissive="#4a90d9" emissiveIntensity={1} />
                </mesh>
            ))}

            {/* CONNECTIONS: Input to Hidden1 (full connections) */}
            {inputLayer.map((n1, i) => (
                hidden1Layer.map((n2, j) => (
                    <Line
                        key={`in-h1-${i}-${j}`}
                        points={[[n1.x + 0.15, n1.y, n1.z], [n2.x - 0.15, n2.y, n2.z]]}
                        color="#333333"
                        opacity={0.4}
                        transparent
                        lineWidth={1}
                    />
                ))
            ))}

            {/* CONNECTIONS: Hidden1 to Hidden2 (full connections) */}
            {hidden1Layer.map((n1, i) => (
                hidden2Layer.map((n2, j) => (
                    <Line
                        key={`h1-h2-${i}-${j}`}
                        points={[[n1.x + 0.15, n1.y, n1.z], [n2.x - 0.15, n2.y, n2.z]]}
                        color="#333333"
                        opacity={0.4}
                        transparent
                        lineWidth={1}
                    />
                ))
            ))}

            {/* CONNECTIONS: Hidden2 to Output (full connections) */}
            {hidden2Layer.map((n1, i) => (
                outputLayer.map((n2, j) => (
                    <Line
                        key={`h2-out-${i}-${j}`}
                        points={[[n1.x + 0.15, n1.y, n1.z], [n2.x - 0.2, n2.y, n2.z]]}
                        color="#333333"
                        opacity={0.4}
                        transparent
                        lineWidth={1}
                    />
                ))
            ))}

            {/* RECURRENT LOOP 1: Arc above Hidden1 layer */}
            <mesh position={[layerSpacing, hidden1Layer[0].y + 0.5, 0]} rotation={[0, 0, Math.PI]}>
                <torusGeometry args={[0.4, 0.02, 8, 16, Math.PI]} />
                <meshBasicMaterial color="#333333" />
            </mesh>

            {/* RECURRENT LOOP 2: Arc above Hidden2 layer */}
            <mesh position={[layerSpacing * 2, hidden2Layer[0].y + 0.5, 0]} rotation={[0, 0, Math.PI]}>
                <torusGeometry args={[0.35, 0.02, 8, 16, Math.PI]} />
                <meshBasicMaterial color="#333333" />
            </mesh>

            {/* RECURRENT LOOP 3: Large arc from output back to hidden1 */}
            <mesh position={[layerSpacing * 1.5, hidden1Layer[hidden1Layer.length - 1].y - 0.6, 0]} rotation={[0, 0, 0]}>
                <torusGeometry args={[1.0, 0.015, 8, 24, Math.PI]} />
                <meshBasicMaterial color="#333333" transparent opacity={0.6} />
            </mesh>
        </group>
    );
};

// =====================================================
// NETWORK 4: Autoencoder (Encoder-Decoder Network)
// Hourglass visualization - Shows compression to
// latent space (bottleneck) and reconstruction
// =====================================================
const AutoencoderVisual = ({ position }) => {
    const groupRef = useRef();

    useFrame((state) => {
        if (groupRef.current) {
            groupRef.current.rotation.y = state.clock.elapsedTime * 0.2;
        }
    });

    const layers = [
        { y: 1.0, count: 6, radius: 0.8, color: "#00f3ff" }, // Input
        { y: 0.5, count: 4, radius: 0.5, color: "#bc13fe" }, // Encoding
        { y: 0.0, count: 2, radius: 0.2, color: "#ffffff" }, // Bottleneck
        { y: -0.5, count: 4, radius: 0.5, color: "#bc13fe" }, // Decoding
        { y: -1.0, count: 6, radius: 0.8, color: "#00f3ff" }  // Output
    ];

    return (
        <group ref={groupRef} position={position}>
            {layers.map((layer, i) => {
                const nodes = [];
                for (let j = 0; j < layer.count; j++) {
                    const angle = (j / layer.count) * Math.PI * 2;
                    nodes.push([Math.cos(angle) * layer.radius, layer.y, Math.sin(angle) * layer.radius]);
                }
                return (
                    <group key={i}>
                        <Instances range={layer.count}>
                            <sphereGeometry args={[0.12, 16, 16]} />
                            <meshStandardMaterial color={layer.color} emissive={layer.color} emissiveIntensity={0.9} />
                            {nodes.map((pos, k) => (
                                <Instance key={k} position={pos} />
                            ))}
                        </Instances>
                        {/* Ring connecting layer nodes */}
                        <mesh position={[0, layer.y, 0]} rotation={[Math.PI / 2, 0, 0]}>
                            <ringGeometry args={[layer.radius - 0.02, layer.radius + 0.02, 32]} />
                            <meshBasicMaterial color={layer.color} transparent opacity={0.25} side={THREE.DoubleSide} />
                        </mesh>
                    </group>
                );
            })}

            {/* Wireframe Hull for "Hourglass" shape */}
            <mesh>
                <cylinderGeometry args={[0.8, 0.8, 2, 6, 1, true]} />
                <meshBasicMaterial color="#00f3ff" wireframe transparent opacity={0.15} />
            </mesh>
        </group>
    );
}

// --- Main Hero Component ---
const NeuralNetworkHero = ({ mousePosition }) => {
    const wrapperRef = useRef();
    const targetRotation = useRef({ x: 0, y: 0 });

    useFrame((state) => {
        if (wrapperRef.current && mousePosition) {
            // Mouse parallax
            targetRotation.current.y = mousePosition.x * 0.15;
            targetRotation.current.x = -mousePosition.y * 0.15;

            wrapperRef.current.rotation.y += (targetRotation.current.y - wrapperRef.current.rotation.y) * 0.05;
            wrapperRef.current.rotation.x += (targetRotation.current.x - wrapperRef.current.rotation.x) * 0.05;
        }
    });

    return (
        <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
            <group ref={wrapperRef}>
                {/* Central Brain */}
                <Brain />

                {/* Satellite Architectures - Evenly spaced around the center */}
                <group>
                    {/* CNN - Top Right */}
                    <CNNVisual position={[4, 1.5, 1]} />

                    {/* RNN - Left Side */}
                    <RNNVisual position={[-4, 0.5, 0]} />

                    {/* Autoencoder - Bottom Center (clearly visible) */}
                    <AutoencoderVisual position={[0, -3.5, 1.5]} />
                </group>

                {/* Data Connections to Satellites */}
                <Line points={[[0, 0, 0], [4, 1.5, 1]]} color="#bc13fe" opacity={0.25} transparent lineWidth={2} dashed dashScale={0.1} />
                <Line points={[[0, 0, 0], [-4, 0.5, 0]]} color="#ffffff" opacity={0.25} transparent lineWidth={2} dashed dashScale={0.1} />
                <Line points={[[0, 0, 0], [0, -3.5, 1.5]]} color="#00f3ff" opacity={0.25} transparent lineWidth={2} dashed dashScale={0.1} />
            </group>
        </Float>
    );
};

export default NeuralNetworkHero;

