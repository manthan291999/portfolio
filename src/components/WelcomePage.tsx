// @ts-nocheck
/// <reference types="@react-three/fiber" />
"use client";

import { useRef, useMemo, useState, useEffect, Suspense } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { Float, Sphere, MeshDistortMaterial, Preload, Environment, OrbitControls } from "@react-three/drei";
import { Image } from "@react-three/drei";
import NeuralNetworkHero from "./canvas/NeuralNetworkHero";
import { motion, AnimatePresence } from "framer-motion";
import * as THREE from "three";

// Floating Particles
const Particles = ({ count = 500 }) => {
    const mesh = useRef();
    const positions = useMemo(() => {
        const pos = new Float32Array(count * 3);
        for (let i = 0; i < count; i++) {
            pos[i * 3] = (Math.random() - 0.5) * 20;
            pos[i * 3 + 1] = (Math.random() - 0.5) * 20;
            pos[i * 3 + 2] = (Math.random() - 0.5) * 20;
        }
        return pos;
    }, [count]);

    const colors = useMemo(() => {
        const cols = new Float32Array(count * 3);
        for (let i = 0; i < count; i++) {
            const isCyan = Math.random() > 0.5;
            cols[i * 3] = isCyan ? 0 : 0.74;
            cols[i * 3 + 1] = isCyan ? 0.95 : 0.07;
            cols[i * 3 + 2] = isCyan ? 1 : 1;
        }
        return cols;
    }, [count]);

    useFrame((state) => {
        if (mesh.current) {
            mesh.current.rotation.y = state.clock.elapsedTime * 0.02;
            mesh.current.rotation.x = state.clock.elapsedTime * 0.01;
        }
    });

    return (
        <points ref={mesh}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    count={count}
                    array={positions}
                    itemSize={3}
                />
                <bufferAttribute
                    attach="attributes-color"
                    count={count}
                    array={colors}
                    itemSize={3}
                />
            </bufferGeometry>
            <pointsMaterial
                size={0.05}
                vertexColors
                transparent
                opacity={0.8}
                sizeAttenuation
            />
        </points>
    );
};

// Robot Head - Main centerpiece
const RobotHead = () => {
    const headRef = useRef();
    const leftEyeRef = useRef();
    const rightEyeRef = useRef();
    const antennaRef = useRef();
    const ringRef1 = useRef();
    const ringRef2 = useRef();
    const ringRef3 = useRef();

    useFrame((state) => {
        const t = state.clock.elapsedTime;

        // Subtle head movement
        if (headRef.current) {
            headRef.current.rotation.y = Math.sin(t * 0.3) * 0.15;
            headRef.current.rotation.x = Math.sin(t * 0.2) * 0.05;
        }

        // Eye glow pulsing
        if (leftEyeRef.current && rightEyeRef.current) {
            const eyeIntensity = 0.8 + Math.sin(t * 3) * 0.2;
            leftEyeRef.current.material.emissiveIntensity = eyeIntensity;
            rightEyeRef.current.material.emissiveIntensity = eyeIntensity;
        }

        // Antenna bob
        if (antennaRef.current) {
            antennaRef.current.rotation.z = Math.sin(t * 2) * 0.1;
        }

        // Orbital rings
        if (ringRef1.current) {
            ringRef1.current.rotation.x = t * 0.5;
            ringRef1.current.rotation.z = t * 0.3;
        }
        if (ringRef2.current) {
            ringRef2.current.rotation.y = t * 0.4;
            ringRef2.current.rotation.z = -t * 0.2;
        }
        if (ringRef3.current) {
            ringRef3.current.rotation.x = -t * 0.3;
            ringRef3.current.rotation.y = t * 0.2;
        }
    });

    return (
        <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
            <group ref={headRef}>
                {/* Main Head - Rounded Box Shape */}
                <mesh>
                    <boxGeometry args={[1.8, 2, 1.5]} />
                    <meshStandardMaterial
                        color="#1a1a2e"
                        metalness={0.9}
                        roughness={0.2}
                    />
                </mesh>

                {/* Head Top Curve */}
                <mesh position={[0, 1, 0]}>
                    <sphereGeometry args={[0.9, 32, 32, 0, Math.PI * 2, 0, Math.PI / 2]} />
                    <meshStandardMaterial
                        color="#1a1a2e"
                        metalness={0.9}
                        roughness={0.2}
                    />
                </mesh>

                {/* Face Plate */}
                <mesh position={[0, 0.1, 0.76]}>
                    <boxGeometry args={[1.5, 1.6, 0.1]} />
                    <meshStandardMaterial
                        color="#0f0f1a"
                        metalness={0.95}
                        roughness={0.1}
                    />
                </mesh>

                {/* Left Eye Socket */}
                <mesh position={[-0.45, 0.3, 0.75]}>
                    <cylinderGeometry args={[0.25, 0.25, 0.15, 32]} rotation={[Math.PI / 2, 0, 0]} />
                    <meshStandardMaterial color="#000000" />
                </mesh>

                {/* Left Eye - Glowing */}
                <mesh ref={leftEyeRef} position={[-0.45, 0.3, 0.85]}>
                    <sphereGeometry args={[0.18, 32, 32]} />
                    <meshStandardMaterial
                        color="#00f3ff"
                        emissive="#00f3ff"
                        emissiveIntensity={1}
                        metalness={0.5}
                        roughness={0.1}
                    />
                </mesh>

                {/* Left Eye Glow */}
                <mesh position={[-0.45, 0.3, 0.9]}>
                    <sphereGeometry args={[0.25, 16, 16]} />
                    <meshBasicMaterial color="#00f3ff" transparent opacity={0.2} />
                </mesh>

                {/* Right Eye Socket */}
                <mesh position={[0.45, 0.3, 0.75]}>
                    <cylinderGeometry args={[0.25, 0.25, 0.15, 32]} rotation={[Math.PI / 2, 0, 0]} />
                    <meshStandardMaterial color="#000000" />
                </mesh>

                {/* Right Eye - Glowing */}
                <mesh ref={rightEyeRef} position={[0.45, 0.3, 0.85]}>
                    <sphereGeometry args={[0.18, 32, 32]} />
                    <meshStandardMaterial
                        color="#00f3ff"
                        emissive="#00f3ff"
                        emissiveIntensity={1}
                        metalness={0.5}
                        roughness={0.1}
                    />
                </mesh>

                {/* Right Eye Glow */}
                <mesh position={[0.45, 0.3, 0.9]}>
                    <sphereGeometry args={[0.25, 16, 16]} />
                    <meshBasicMaterial color="#00f3ff" transparent opacity={0.2} />
                </mesh>

                {/* Mouth/Speaker Grille */}
                <mesh position={[0, -0.5, 0.78]}>
                    <boxGeometry args={[0.8, 0.3, 0.05]} />
                    <meshStandardMaterial
                        color="#0a0a15"
                        metalness={0.8}
                        roughness={0.3}
                    />
                </mesh>

                {/* Mouth Lines */}
                {[-0.25, 0, 0.25].map((x, i) => (
                    <mesh key={i} position={[x, -0.5, 0.82]}>
                        <boxGeometry args={[0.05, 0.2, 0.02]} />
                        <meshBasicMaterial color="#00f3ff" transparent opacity={0.5} />
                    </mesh>
                ))}

                {/* Antenna Base */}
                <group ref={antennaRef} position={[0, 1.5, 0]}>
                    <mesh>
                        <cylinderGeometry args={[0.08, 0.12, 0.3, 16]} />
                        <meshStandardMaterial color="#2a2a3e" metalness={0.9} roughness={0.2} />
                    </mesh>
                    {/* Antenna Tip */}
                    <mesh position={[0, 0.25, 0]}>
                        <sphereGeometry args={[0.1, 16, 16]} />
                        <meshStandardMaterial
                            color="#bc13fe"
                            emissive="#bc13fe"
                            emissiveIntensity={0.8}
                        />
                    </mesh>
                    {/* Antenna Glow */}
                    <mesh position={[0, 0.25, 0]}>
                        <sphereGeometry args={[0.15, 16, 16]} />
                        <meshBasicMaterial color="#bc13fe" transparent opacity={0.3} />
                    </mesh>
                </group>

                {/* Side Panels - Left */}
                <mesh position={[-0.95, 0, 0]}>
                    <boxGeometry args={[0.1, 1.2, 1]} />
                    <meshStandardMaterial
                        color="#00f3ff"
                        emissive="#00f3ff"
                        emissiveIntensity={0.3}
                        metalness={0.8}
                        roughness={0.2}
                    />
                </mesh>

                {/* Side Panels - Right */}
                <mesh position={[0.95, 0, 0]}>
                    <boxGeometry args={[0.1, 1.2, 1]} />
                    <meshStandardMaterial
                        color="#bc13fe"
                        emissive="#bc13fe"
                        emissiveIntensity={0.3}
                        metalness={0.8}
                        roughness={0.2}
                    />
                </mesh>

                {/* Chin */}
                <mesh position={[0, -1.05, 0.2]}>
                    <boxGeometry args={[1.2, 0.15, 0.8]} />
                    <meshStandardMaterial color="#1a1a2e" metalness={0.9} roughness={0.2} />
                </mesh>

                {/* Forehead Detail */}
                <mesh position={[0, 0.85, 0.7]}>
                    <boxGeometry args={[1, 0.15, 0.2]} />
                    <meshStandardMaterial
                        color="#00f3ff"
                        emissive="#00f3ff"
                        emissiveIntensity={0.4}
                    />
                </mesh>

                {/* Circuit Lines on Face */}
                {[0.55, 0.65, 0.75].map((y, i) => (
                    <mesh key={`circuit-${i}`} position={[0, y, 0.82]}>
                        <boxGeometry args={[1.2, 0.02, 0.01]} />
                        <meshBasicMaterial color="#00f3ff" transparent opacity={0.4} />
                    </mesh>
                ))}
            </group>

            {/* Orbital Ring 1 */}
            <mesh ref={ringRef1} scale={2.5}>
                <torusGeometry args={[1, 0.02, 16, 100]} />
                <meshBasicMaterial color="#00f3ff" transparent opacity={0.6} />
            </mesh>

            {/* Orbital Ring 2 */}
            <mesh ref={ringRef2} scale={2.8} rotation={[Math.PI / 3, 0, 0]}>
                <torusGeometry args={[1, 0.015, 16, 100]} />
                <meshBasicMaterial color="#bc13fe" transparent opacity={0.5} />
            </mesh>

            {/* Orbital Ring 3 */}
            <mesh ref={ringRef3} scale={3.2} rotation={[Math.PI / 6, Math.PI / 4, 0]}>
                <torusGeometry args={[1, 0.01, 16, 100]} />
                <meshBasicMaterial color="#ff006e" transparent opacity={0.4} />
            </mesh>

            {/* Orbiting Nodes */}
            {[...Array(8)].map((_, i) => (
                <OrbitingNode key={i} index={i} />
            ))}
        </Float>
    );
};

// Orbiting nodes around the core
const OrbitingNode = ({ index }) => {
    const ref = useRef();
    const angle = (index / 8) * Math.PI * 2;
    const radius = 2.8 + (index % 2) * 0.5;
    const speed = 0.3 + (index % 3) * 0.1;

    useFrame((state) => {
        const t = state.clock.elapsedTime * speed + angle;
        ref.current.position.x = Math.cos(t) * radius;
        ref.current.position.z = Math.sin(t) * radius;
        ref.current.position.y = Math.sin(t * 2) * 0.5;
    });

    return (
        <mesh ref={ref}>
            <octahedronGeometry args={[0.1]} />
            <meshBasicMaterial
                color={index % 2 === 0 ? "#00f3ff" : "#bc13fe"}
                transparent
                opacity={0.8}
            />
        </mesh>
    );
};

// Hero Image - 2D Image replacement for Robot




// Data streams / Circuit lines
const DataStreams = () => {
    const lines = useMemo(() => {
        const streamData = [];
        for (let i = 0; i < 20; i++) {
            const startX = (Math.random() - 0.5) * 15;
            const startY = (Math.random() - 0.5) * 10;
            const startZ = (Math.random() - 0.5) * 10 - 5;
            streamData.push({
                start: [startX, startY, startZ],
                end: [startX + (Math.random() - 0.5) * 5, startY + (Math.random() - 0.5) * 3, startZ + 2],
                color: Math.random() > 0.5 ? "#00f3ff" : "#bc13fe",
            });
        }
        return streamData;
    }, []);

    return (
        <group>
            {lines.map((line, i) => (
                <DataLine key={i} start={line.start} end={line.end} color={line.color} index={i} />
            ))}
        </group>
    );
};

const DataLine = ({ start, end, color, index }) => {
    const ref = useRef();

    useFrame((state) => {
        if (ref.current) {
            ref.current.material.opacity = 0.1 + Math.sin(state.clock.elapsedTime * 2 + index) * 0.1;
        }
    });

    const points = useMemo(() => {
        return [new THREE.Vector3(...start), new THREE.Vector3(...end)];
    }, [start, end]);

    const geometry = useMemo(() => {
        return new THREE.BufferGeometry().setFromPoints(points);
    }, [points]);

    return (
        <line ref={ref} geometry={geometry}>
            <lineBasicMaterial color={color} transparent opacity={0.2} />
        </line>
    );
};

// Main 3D Scene
const WelcomeScene = ({ mousePosition }) => {
    return (
        <>
            <ambientLight intensity={0.4} />
            <directionalLight position={[5, 10, 5]} intensity={1} color="#ffffff" />
            <pointLight position={[10, 10, 10]} intensity={0.8} color="#00f3ff" />
            <pointLight position={[-10, -10, -5]} intensity={0.5} color="#bc13fe" />
            <pointLight position={[0, 5, 5]} intensity={0.3} color="#ffffff" />

            <Particles count={800} />

            {/* 3D Neural Network Hero */}
            <Suspense fallback={null}>
                <NeuralNetworkHero mousePosition={mousePosition} />
                <Environment preset="city" />
            </Suspense>

            <DataStreams />

            <Preload all />
        </>
    );
};

// Matrix Rain Effect (2D overlay)
const MatrixRain = () => {
    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
            {[...Array(30)].map((_, i) => (
                <motion.div
                    key={i}
                    className="absolute text-cyan font-mono text-xs"
                    style={{ left: `${(i / 30) * 100}%` }}
                    initial={{ y: "-100%", opacity: 0 }}
                    animate={{
                        y: "100vh",
                        opacity: [0, 1, 1, 0],
                    }}
                    transition={{
                        duration: 5 + Math.random() * 5,
                        repeat: Infinity,
                        delay: Math.random() * 5,
                        ease: "linear",
                    }}
                >
                    {[...Array(20)].map((_, j) => (
                        <div key={j} className="opacity-70">
                            {String.fromCharCode(0x30A0 + Math.random() * 96)}
                        </div>
                    ))}
                </motion.div>
            ))}
        </div>
    );
};

// Scanline Effect
const Scanlines = () => (
    <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
            background: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,243,255,0.1) 2px, rgba(0,243,255,0.1) 4px)",
        }}
    />
);

// Main Welcome Page Component
export default function WelcomePage({ onEnter }) {
    const [isExiting, setIsExiting] = useState(false);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    // Track mouse position
    useEffect(() => {
        const handleMouseMove = (e) => {
            // Normalize mouse position to -1 to 1 range
            const x = (e.clientX / window.innerWidth) * 2 - 1;
            const y = -(e.clientY / window.innerHeight) * 2 + 1;
            setMousePosition({ x, y });
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    const handleEnter = () => {
        setIsExiting(true);
        setTimeout(() => {
            onEnter();
        }, 1000);
    };

    return (
        <AnimatePresence>
            {!isExiting && (
                <motion.div
                    className="fixed inset-0 z-50 bg-black overflow-hidden"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0, scale: 1.1 }}
                    transition={{ duration: 1 }}
                >
                    {/* 3D Canvas */}
                    <div className="absolute inset-0">
                        <Canvas
                            camera={{ position: [0, 0, 8], fov: 50 }}
                            dpr={[1, 2]}
                            gl={{ antialias: true, alpha: true }}
                        >
                            <WelcomeScene mousePosition={mousePosition} />
                        </Canvas>
                    </div>

                    {/* Matrix Rain Effect */}
                    <MatrixRain />

                    {/* Scanlines */}
                    <Scanlines />

                    {/* Vignette */}
                    <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_30%,black_100%)]" />

                    {/* Content Overlay */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
                        {/* Glitch Text */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5, duration: 0.8 }}
                            className="text-center mb-8"
                        >
                            <motion.p
                                className="text-cyan/60 font-mono text-sm tracking-[0.5em] mb-4"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.8 }}
                            >
                                INITIALIZING SYSTEM
                            </motion.p>

                            <h1 className="text-5xl md:text-7xl lg:text-8xl font-orbitron font-bold relative">
                                <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan via-white to-purple">
                                    MANTHAN MITTAL
                                </span>
                                {/* Glitch layers */}
                                <span className="absolute inset-0 bg-clip-text text-transparent bg-gradient-to-r from-cyan to-purple opacity-50 animate-glitch-1">
                                    MANTHAN MITTAL
                                </span>
                            </h1>

                            <motion.div
                                className="mt-6 flex items-center justify-center gap-3"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 1.2 }}
                            >
                                <span className="h-px w-12 bg-gradient-to-r from-transparent to-cyan" />
                                <span className="text-gray-400 font-mono text-sm tracking-widest">
                                    AI ENGINEER • FULL-STACK DEVELOPER
                                </span>
                                <span className="h-px w-12 bg-gradient-to-l from-transparent to-purple" />
                            </motion.div>
                        </motion.div>

                        {/* Enter Button */}
                        <motion.button
                            onClick={handleEnter}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 1.5, duration: 0.5 }}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="group relative px-12 py-4 mt-8"
                        >
                            {/* Button background */}
                            <div className="absolute inset-0 bg-gradient-to-r from-cyan/20 to-purple/20 rounded-lg border border-cyan/50 group-hover:border-cyan transition-all duration-300" />

                            {/* Glow effect */}
                            <div className="absolute inset-0 bg-cyan/10 rounded-lg blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                            {/* Button content */}
                            <div className="relative flex items-center gap-3">
                                <span className="text-cyan font-orbitron tracking-widest text-sm">
                                    ENTER SYSTEM
                                </span>
                                <motion.span
                                    className="text-cyan"
                                    animate={{ x: [0, 5, 0] }}
                                    transition={{ duration: 1.5, repeat: Infinity }}
                                >
                                    ▶
                                </motion.span>
                            </div>

                            {/* Corner accents */}
                            <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-cyan" />
                            <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-purple" />
                            <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-purple" />
                            <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-cyan" />
                        </motion.button>

                        {/* Loading indicator */}
                        <motion.div
                            className="mt-12 flex items-center gap-2 text-gray-600 font-mono text-xs"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 2 }}
                        >
                            <motion.div
                                className="w-2 h-2 bg-cyan rounded-full"
                                animate={{ opacity: [0.3, 1, 0.3] }}
                                transition={{ duration: 1.5, repeat: Infinity }}
                            />
                            <span>SYSTEM READY</span>
                        </motion.div>
                    </div>

                    {/* Bottom info */}
                    <motion.div
                        className="absolute bottom-8 left-0 right-0 flex justify-center gap-8 text-gray-600 font-mono text-xs"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 2.5 }}
                    >
                        <span>v2.0.26</span>
                        <span>NEURAL_INTERFACE_ONLINE</span>
                        <span>UK • INDIA</span>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
