// @ts-nocheck
"use client";

import { Suspense, useRef, useEffect, useMemo, useState } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { OrbitControls, Environment, Preload } from "@react-three/drei";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader";
import * as THREE from "three";

// Floating Sci-Fi Pedestal Component
const FloatingPedestal = () => {
    const pedestalRef = useRef();
    const ring1Ref = useRef();
    const ring2Ref = useRef();
    const ring3Ref = useRef();

    useFrame((state) => {
        const t = state.clock.elapsedTime;

        // Floating animation for pedestal
        if (pedestalRef.current) {
            pedestalRef.current.position.y = -1.5 + Math.sin(t * 0.8) * 0.05;
        }

        // Rotating rings
        if (ring1Ref.current) {
            ring1Ref.current.rotation.z = t * 0.5;
        }
        if (ring2Ref.current) {
            ring2Ref.current.rotation.z = -t * 0.3;
        }
        if (ring3Ref.current) {
            ring3Ref.current.rotation.z = t * 0.7;
        }
    });

    return (
        <group ref={pedestalRef} position={[0, -1.5, 0]}>
            {/* Main Platform */}
            <mesh receiveShadow>
                <cylinderGeometry args={[1.2, 1.4, 0.15, 32]} />
                <meshStandardMaterial
                    color="#0a1628"
                    metalness={0.9}
                    roughness={0.2}
                    emissive="#00f3ff"
                    emissiveIntensity={0.1}
                />
            </mesh>

            {/* Outer rotating ring 1 */}
            <mesh ref={ring1Ref} position={[0, 0.1, 0]} rotation={[Math.PI / 2, 0, 0]}>
                <torusGeometry args={[1.5, 0.02, 8, 64]} />
                <meshBasicMaterial color="#00f3ff" transparent opacity={0.6} />
            </mesh>

            {/* Outer rotating ring 2 */}
            <mesh ref={ring2Ref} position={[0, 0.15, 0]} rotation={[Math.PI / 2, 0, 0]}>
                <torusGeometry args={[1.7, 0.015, 8, 64]} />
                <meshBasicMaterial color="#bc13fe" transparent opacity={0.4} />
            </mesh>

            {/* Outer rotating ring 3 */}
            <mesh ref={ring3Ref} position={[0, 0.05, 0]} rotation={[Math.PI / 2, 0, 0]}>
                <torusGeometry args={[1.3, 0.01, 8, 64]} />
                <meshBasicMaterial color="#00ff88" transparent opacity={0.5} />
            </mesh>

            {/* Bottom glow */}
            <mesh position={[0, -0.1, 0]}>
                <cylinderGeometry args={[1.0, 0.5, 0.3, 32]} />
                <meshBasicMaterial
                    color="#00f3ff"
                    transparent
                    opacity={0.15}
                />
            </mesh>

            {/* Holographic grid lines on platform */}
            <mesh position={[0, 0.09, 0]} rotation={[-Math.PI / 2, 0, 0]}>
                <circleGeometry args={[1.1, 32]} />
                <meshBasicMaterial
                    color="#00f3ff"
                    transparent
                    opacity={0.1}
                    wireframe
                />
            </mesh>
        </group>
    );
};

// Robot Model Component with textures and animations
const RobotModel = ({ scale = 0.01, onLoaded }) => {
    const groupRef = useRef();
    const innerGroupRef = useRef();
    const mixerRef = useRef();
    const baseY = -1.35; // Position on top of pedestal (pedestal is at -1.5)

    // Load the FBX model
    const fbx = useLoader(FBXLoader, "/source/Orange black sci fi unit2 rigged and animated.fbx");

    // Load textures
    const textureLoader = useMemo(() => new THREE.TextureLoader(), []);

    const textures = useMemo(() => {
        const loadTexture = (path, flipY = true) => {
            const texture = textureLoader.load(path);
            texture.flipY = flipY;
            texture.colorSpace = THREE.SRGBColorSpace;
            texture.wrapS = THREE.RepeatWrapping;
            texture.wrapT = THREE.RepeatWrapping;
            return texture;
        };

        return {
            // Body textures
            bodyDiffuse: loadTexture("/textures/Body3_Diffuse.png", true),
            bodyNormal: loadTexture("/textures/Body3_Normal.png", true),
            bodyMetallic: loadTexture("/textures/Body3_metallic.png", true),
            bodyRoughness: loadTexture("/textures/Body3_roughness.png", true),
            // Material textures
            matDiffuse: loadTexture("/textures/material_0_Merged0_LOD0_Bake_Diffuse.png", true),
            matNormal: loadTexture("/textures/material_0_Merged0_LOD0_Bake_Normal.png", true),
            matMetallic: loadTexture("/textures/material_0_Merged0_LOD0_Bake_metallic.png", true),
            matRoughness: loadTexture("/textures/material_0_Merged0_LOD0_Bake_roughness.png", true),
        };
    }, [textureLoader]);

    // Apply materials, textures, rotation fix and setup animations
    useEffect(() => {
        if (fbx) {
            // Fix rotation - rotate the model to stand upright
            // FBX models often export with Z-up, we need Y-up
            fbx.rotation.set(-Math.PI / 2, 0, 0);

            // Center the model
            const box = new THREE.Box3().setFromObject(fbx);
            const center = box.getCenter(new THREE.Vector3());
            fbx.position.x = -center.x;
            fbx.position.z = -center.z;
            // Adjust so feet are at y=0 of the group
            fbx.position.y = -box.min.y;

            // Setup animation mixer if model has animations
            if (fbx.animations && fbx.animations.length > 0) {
                mixerRef.current = new THREE.AnimationMixer(fbx);
                const action = mixerRef.current.clipAction(fbx.animations[0]);
                action.play();
            }

            let meshIndex = 0;
            fbx.traverse((child) => {
                if (child.isMesh) {
                    // Enable shadows
                    child.castShadow = true;
                    child.receiveShadow = true;

                    // Alternate between texture sets for different parts
                    const useBodyTextures = meshIndex % 2 === 0;
                    meshIndex++;

                    child.material = new THREE.MeshStandardMaterial({
                        map: useBodyTextures ? textures.bodyDiffuse : textures.matDiffuse,
                        normalMap: useBodyTextures ? textures.bodyNormal : textures.matNormal,
                        metalnessMap: useBodyTextures ? textures.bodyMetallic : textures.matMetallic,
                        roughnessMap: useBodyTextures ? textures.bodyRoughness : textures.matRoughness,
                        metalness: 0.8,
                        roughness: 0.3,
                        envMapIntensity: 1.5,
                        side: THREE.DoubleSide,
                    });
                }
            });

            // Notify parent that robot is loaded
            if (onLoaded) {
                onLoaded();
            }
        }
    }, [fbx, textures, onLoaded]);

    // Animation loop: 360° rotation + jumping
    useFrame((state, delta) => {
        // Update FBX animation mixer
        if (mixerRef.current) {
            mixerRef.current.update(delta);
        }

        if (groupRef.current) {
            // Continuous 360° rotation (rotate the outer group)
            groupRef.current.rotation.y += 0.008;

            // Jumping animation - bounce up and down
            const t = state.clock.elapsedTime;
            const jumpCycle = t % 2;
            let jumpHeight = 0;

            if (jumpCycle < 0.3) {
                // Going up
                jumpHeight = Math.sin((jumpCycle / 0.3) * Math.PI * 0.5) * 0.3;
            } else if (jumpCycle < 0.6) {
                // Coming down
                jumpHeight = Math.cos(((jumpCycle - 0.3) / 0.3) * Math.PI * 0.5) * 0.3;
            } else {
                // Standing still with subtle float
                jumpHeight = Math.sin(t * 2) * 0.02;
            }

            groupRef.current.position.y = baseY + jumpHeight;
        }
    });

    return (
        <group ref={groupRef} position={[0, baseY, 0]}>
            <group ref={innerGroupRef} scale={scale}>
                <primitive object={fbx} />
            </group>
        </group>
    );
};

// Speech Bubble Component
const SpeechBubble = ({ show, message }) => {
    if (!show) return null;

    return (
        <div className="absolute top-4 right-4 md:top-8 md:right-8 z-20 animate-bounce-in">
            <div className="relative bg-gradient-to-br from-cyan-500/90 to-purple-600/90 backdrop-blur-sm rounded-2xl px-5 py-3 shadow-lg shadow-cyan-500/30 border border-cyan-400/50">
                {/* Speech bubble tail */}
                <div className="absolute -bottom-2 left-6 w-4 h-4 bg-gradient-to-br from-cyan-500/90 to-purple-600/90 rotate-45 border-r border-b border-cyan-400/50" />

                {/* Message */}
                <div className="relative z-10">
                    <p className="text-white font-bold text-lg md:text-xl tracking-wide">
                        👋 Hiya!
                    </p>
                    <p className="text-cyan-100 text-sm md:text-base font-medium mt-1">
                        {message}
                    </p>
                </div>

                {/* Glow effect */}
                <div className="absolute inset-0 rounded-2xl bg-cyan-400/20 blur-xl -z-10" />
            </div>
        </div>
    );
};

// Loading Fallback Component
const LoadingFallback = () => (
    <div className="w-full h-full flex items-center justify-center">
        <div className="text-center">
            <div className="w-16 h-16 border-4 border-cyan/30 border-t-cyan rounded-full animate-spin mx-auto mb-4" />
            <p className="text-cyan font-mono text-sm animate-pulse">Loading Robot...</p>
        </div>
    </div>
);

// Text-to-Speech function
const speakGreeting = (message) => {
    // Check if browser supports speech synthesis
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        const synth = window.speechSynthesis;

        // Cancel any ongoing speech
        synth.cancel();

        const speak = () => {
            const utterance = new SpeechSynthesisUtterance(message);
            utterance.rate = 0.9;
            utterance.pitch = 1.0;
            utterance.volume = 1.0;

            // Get available voices
            const voices = synth.getVoices();

            // Try to find a good English voice
            const preferredVoice = voices.find(v =>
                v.lang.includes('en') && !v.localService
            ) || voices.find(v =>
                v.lang.includes('en')
            ) || voices[0];

            if (preferredVoice) {
                utterance.voice = preferredVoice;
            }

            synth.speak(utterance);
        };

        // Voices may not be loaded yet, wait for them
        if (synth.getVoices().length > 0) {
            speak();
        } else {
            // Wait for voices to load
            synth.onvoiceschanged = () => {
                speak();
            };
        }
    }
};

// Main RobotHero Component
const RobotHero = () => {
    const [showSpeechBubble, setShowSpeechBubble] = useState(false);
    const [hasGreeted, setHasGreeted] = useState(false);

    const handleRobotLoaded = () => {
        if (!hasGreeted) {
            setShowSpeechBubble(true);
            setHasGreeted(true);

            // Speak the greeting
            speakGreeting("Hiya! Welcome to Manthan Mittal's Portfolio!");

            // Hide speech bubble after 6 seconds
            setTimeout(() => {
                setShowSpeechBubble(false);
            }, 6000);
        }
    };

    return (
        <div className="w-full h-full min-h-[400px] md:min-h-[500px] relative">
            {/* Speech Bubble */}
            <SpeechBubble
                show={showSpeechBubble}
                message="Welcome to Manthan Mittal's Portfolio!"
            />

            <Suspense fallback={<LoadingFallback />}>
                <Canvas
                    camera={{ position: [0, 1.5, 6], fov: 45 }}
                    dpr={[1, 2]}
                    gl={{ antialias: true, alpha: true }}
                    shadows
                >
                    {/* Enhanced Lighting */}
                    <ambientLight intensity={0.3} />
                    <directionalLight
                        position={[5, 10, 5]}
                        intensity={1.2}
                        castShadow
                        shadow-mapSize={[2048, 2048]}
                        color="#ffffff"
                    />
                    <directionalLight
                        position={[-5, 5, -5]}
                        intensity={0.6}
                        color="#00f3ff"
                    />
                    <pointLight
                        position={[0, 5, 0]}
                        intensity={0.6}
                        color="#bc13fe"
                    />
                    <pointLight
                        position={[0, -2, 2]}
                        intensity={0.4}
                        color="#00f3ff"
                    />
                    <spotLight
                        position={[0, 8, 0]}
                        angle={0.3}
                        penumbra={0.5}
                        intensity={0.8}
                        color="#ffffff"
                        castShadow
                    />

                    {/* Floating Pedestal */}
                    <FloatingPedestal />

                    {/* Robot Model */}
                    <RobotModel scale={0.012} onLoaded={handleRobotLoaded} />

                    {/* Environment for reflections */}
                    <Environment preset="city" />

                    {/* Orbit Controls - rotation only, no zoom */}
                    <OrbitControls
                        enableZoom={false}
                        enablePan={false}
                        enableRotate={true}
                        autoRotate={false}
                        minPolarAngle={Math.PI / 4}
                        maxPolarAngle={Math.PI / 1.8}
                    />

                    <Preload all />
                </Canvas>
            </Suspense>
        </div>
    );
};

export default RobotHero;

