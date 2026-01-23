// @ts-nocheck
/// <reference types="@react-three/fiber" />
"use client";

import { useRef, useMemo, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Points, PointMaterial, Line, Sphere, MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";

export default function ThreeBackground() {
    return (
        <div className="fixed inset-0 z-0 bg-obsidian pointer-events-none">
            <Canvas camera={{ position: [0, 0, 6], fov: 60 }} gl={{ antialias: true, alpha: true }}>
                {/* Cinematic Lighting - Enhanced */}
                <ambientLight intensity={0.2} />
                <pointLight position={[10, 10, 10]} intensity={1} color="#00f3ff" />
                <pointLight position={[-10, -10, -10]} intensity={1} color="#bc13fe" />

                <NeuralCortex />

                {/* Stars for depth */}
                <Stars radius={50} depth={50} count={3000} factor={4} saturation={0} fade speed={1} />

                {/* Atmospheric Fog */}
                <fog attach="fog" args={['#050505', 5, 25]} />
            </Canvas>
            {/* Vignette Overlay */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.6)_100%)] pointer-events-none" />
        </div>
    );
}

function NeuralCortex() {
    const groupRef = useRef<THREE.Group>(null);
    const nodesRef = useRef<THREE.Points>(null);
    const coreRef = useRef<THREE.Mesh>(null);

    // Mouse interaction state
    const [hoveredNode, setHoveredNode] = useState<number | null>(null);
    const { mouse, viewport } = useThree();

    // ── 1. Create Nodes & Connections ────────────────────────────
    const { nodes, lines, initialPositions } = useMemo(() => {
        const nodeCount = 65; // High density swarm
        const nodeList: THREE.Vector3[] = [];
        const lineList: THREE.Vector3[][] = [];
        const initialPos: THREE.Vector3[] = [];

        // Generate nodes in a sphere distribution
        for (let i = 0; i < nodeCount; i++) {
            const theta = Math.random() * Math.PI * 2;
            const phi = Math.acos((Math.random() * 2) - 1);
            const r = 2.5 + Math.random() * 1.5; // Wider distribution

            const x = r * Math.sin(phi) * Math.cos(theta);
            const y = r * Math.sin(phi) * Math.sin(theta);
            const z = r * Math.cos(phi);

            const vec = new THREE.Vector3(x, y, z);
            nodeList.push(vec);
            initialPos.push(vec.clone());
        }

        // Connect nearby nodes
        for (let i = 0; i < nodeCount; i++) {
            for (let j = i + 1; j < nodeCount; j++) {
                const dist = nodeList[i].distanceTo(nodeList[j]);
                if (dist < 1.5) {
                    lineList.push([nodeList[i], nodeList[j]]);
                }
            }
        }

        return { nodes: nodeList, lines: lineList, initialPositions: initialPos };
    }, []);

    // ── 2. Particle Positions Array ──────────────────────────────
    const positions = useMemo(() => {
        const pos = new Float32Array(nodes.length * 3);
        nodes.forEach((n, i) => {
            pos[i * 3] = n.x;
            pos[i * 3 + 1] = n.y;
            pos[i * 3 + 2] = n.z;
        });
        return pos;
    }, [nodes]);

    // ── 3. Animation Loop (The Living Grid) ──────────────────────
    useFrame((state, delta) => {
        if (!groupRef.current || !nodesRef.current) return;

        const time = state.clock.elapsedTime;

        // Mouse influence vector (convert normalized mouse to world space roughly)
        const mouseVec = new THREE.Vector3(
            (mouse.x * viewport.width) / 2,
            (mouse.y * viewport.height) / 2,
            0
        );

        // Update Node Positions (Swarm Logic)
        const currentPositions = nodesRef.current.geometry.attributes.position.array as Float32Array;

        for (let i = 0; i < nodes.length; i++) {
            const i3 = i * 3;
            const original = initialPositions[i];

            // Create "Breathing" movement
            const noiseX = Math.sin(time * 0.5 + i) * 0.1;
            const noiseY = Math.cos(time * 0.3 + i) * 0.1;
            const noiseZ = Math.sin(time * 0.4 + i) * 0.1;

            // Mouse Repulsion/Attraction
            // We'll calculate distance from mouse to this node (in 2D projection approx)
            // Ideally strictly 3D, but 2D feel is often better for UI backgrounds
            const currentNode = new THREE.Vector3(currentPositions[i3], currentPositions[i3 + 1], currentPositions[i3 + 2]);

            // Simple drift back to original
            let targetX = original.x + noiseX;
            let targetY = original.y + noiseY;
            let targetZ = original.z + noiseZ;

            // Lerp towards target
            currentPositions[i3] += (targetX - currentPositions[i3]) * 0.05;
            currentPositions[i3 + 1] += (targetY - currentPositions[i3 + 1]) * 0.05;
            currentPositions[i3 + 2] += (targetZ - currentPositions[i3 + 2]) * 0.05;
        }

        nodesRef.current.geometry.attributes.position.needsUpdate = true;

        // Rotate entire group slowly
        groupRef.current.rotation.y += delta * 0.05;
        groupRef.current.rotation.x = Math.sin(time * 0.15) * 0.05;

        // Gemini Core Pulse
        if (coreRef.current) {
            const pulse = 1 + Math.sin(time * 2) * 0.1;
            coreRef.current.scale.set(pulse, pulse, pulse);
        }
    });

    return (
        <group ref={groupRef}>
            {/* ── GEMINI CORE ────────────────────────────── */}
            <Sphere ref={coreRef} args={[0.8, 32, 32]} position={[0, 0, 0]}>
                <MeshDistortMaterial
                    color="#00f3ff"
                    emissive="#bc13fe"
                    emissiveIntensity={0.5}
                    roughness={0.2}
                    metalness={0.8}
                    distort={0.4} // Wobbly effect
                    speed={2}
                />
            </Sphere>

            {/* ── NODES ──────────────────────────────────── */}
            <Points ref={nodesRef} positions={positions} stride={3} frustumCulled={false}>
                <PointMaterial
                    transparent
                    color="#00f3ff"
                    size={0.12} // Larger nodes
                    sizeAttenuation={true}
                    depthWrite={false}
                    blending={THREE.AdditiveBlending}
                />
            </Points>

            {/* ── CONNECTIONS ────────────────────────────── */}
            {lines.map((line, i) => (
                <Line
                    key={i}
                    points={line}
                    color="#bc13fe" // Purple connections
                    transparent
                    opacity={0.15}
                    lineWidth={1}
                />
            ))}

            {/* ── DATA PULSES (Simulated via extra moving points) ──────────────── */}
            <DataPulses route={lines} />
        </group>
    );
}

// Component to render smaller particles traveling along lines
function DataPulses({ route }: { route: THREE.Vector3[][] }) {
    // Pick random routes for pulses
    const pulseCount = 20;
    const activeRoutes = useMemo(() => {
        return Array.from({ length: pulseCount }).map(() => {
            const lineIdx = Math.floor(Math.random() * route.length);
            return {
                line: route[lineIdx],
                speed: 0.01 + Math.random() * 0.02,
                offset: Math.random(), // 0 to 1 position along line
            };
        });
    }, [route]);

    const pulsesRef = useRef<THREE.Group>(null);

    useFrame((_, delta) => {
        if (!pulsesRef.current) return;

        // Update each pulse position
        pulsesRef.current.children.forEach((mesh, i) => {
            const r = activeRoutes[i];
            r.offset += r.speed;
            if (r.offset > 1) {
                // Reset to new random line
                r.offset = 0;
                const newLineIdx = Math.floor(Math.random() * route.length);
                r.line = route[newLineIdx];
            }

            // Interpolate position
            const start = r.line[0];
            const end = r.line[1];
            mesh.position.lerpVectors(start, end, r.offset);
        });
    });

    return (
        <group ref={pulsesRef}>
            {activeRoutes.map((_, i) => (
                <mesh key={i}>
                    <sphereGeometry args={[0.04, 8, 8]} />
                    <meshBasicMaterial color="white" transparent opacity={0.8} />
                </mesh>
            ))}
        </group>
    );
}

// Helper re-export
import { Stars } from "@react-three/drei";
