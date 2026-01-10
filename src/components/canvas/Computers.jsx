"use client";

import { useRef, useEffect, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { useFBX, Float, useTexture } from "@react-three/drei";
import * as THREE from "three";

// Floating Sci-Fi Pedestal Component
const FloatingPedestal = ({ position = [0, 0, 0] }) => {
    const ringRef = useRef();
    const ring2Ref = useRef();

    useFrame((state) => {
        const t = state.clock.elapsedTime;
        // Rotate the rings
        if (ringRef.current) {
            ringRef.current.rotation.z = t * 0.5;
        }
        if (ring2Ref.current) {
            ring2Ref.current.rotation.z = -t * 0.3;
        }
    });

    return (
        <group position={position}>
            {/* Main circular platform - flat disc */}
            <mesh rotation={[-Math.PI / 2, 0, 0]}>
                <cylinderGeometry args={[1.5, 1.5, 0.08, 64]} />
                <meshStandardMaterial
                    color="#0a0a18"
                    metalness={0.95}
                    roughness={0.1}
                />
            </mesh>

            {/* Top glowing edge */}
            <mesh position={[0, 0.05, 0]} rotation={[-Math.PI / 2, 0, 0]}>
                <ringGeometry args={[1.4, 1.5, 64]} />
                <meshBasicMaterial color="#00f3ff" transparent opacity={0.9} side={THREE.DoubleSide} />
            </mesh>

            {/* Inner ring pattern */}
            <mesh position={[0, 0.05, 0]} rotation={[-Math.PI / 2, 0, 0]}>
                <ringGeometry args={[0.9, 1.0, 64]} />
                <meshBasicMaterial color="#bc13fe" transparent opacity={0.6} side={THREE.DoubleSide} />
            </mesh>

            {/* Center glow */}
            <mesh position={[0, 0.05, 0]} rotation={[-Math.PI / 2, 0, 0]}>
                <circleGeometry args={[0.5, 32]} />
                <meshBasicMaterial color="#00f3ff" transparent opacity={0.4} side={THREE.DoubleSide} />
            </mesh>

            {/* Outer floating ring 1 */}
            <mesh ref={ringRef} position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]}>
                <torusGeometry args={[1.8, 0.02, 16, 64]} />
                <meshBasicMaterial color="#00f3ff" transparent opacity={0.8} />
            </mesh>

            {/* Outer floating ring 2 */}
            <mesh ref={ring2Ref} position={[0, -0.1, 0]} rotation={[-Math.PI / 2, 0, 0]}>
                <torusGeometry args={[2.0, 0.015, 16, 64]} />
                <meshBasicMaterial color="#bc13fe" transparent opacity={0.6} />
            </mesh>

            {/* Grid pattern rings */}
            {[0.3, 0.6, 1.2].map((r, i) => (
                <mesh key={i} position={[0, 0.051, 0]} rotation={[-Math.PI / 2, 0, 0]}>
                    <ringGeometry args={[r, r + 0.02, 64]} />
                    <meshBasicMaterial color="#00f3ff" transparent opacity={0.2} side={THREE.DoubleSide} />
                </mesh>
            ))}
        </group>
    );
};

// Robot Model Component
const RobotModel = ({ isMobile }) => {
    const groupRef = useRef();
    const mixerRef = useRef();
    const [materialsApplied, setMaterialsApplied] = useState(false);

    // Load the FBX model
    const fbx = useFBX("/source/robot-model.fbx");

    // Load textures using useTexture from drei (handles SSR properly)
    const textures = useTexture({
        bodyDiffuse: "/textures/Body3_Diffuse.png",
        bodyNormal: "/textures/Body3_Normal.png",
        bodyMetallic: "/textures/Body3_metallic.png",
        bodyRoughness: "/textures/Body3_roughness.png",
        matDiffuse: "/textures/material_0_Merged0_LOD0_Bake_Diffuse.png",
        matNormal: "/textures/material_0_Merged0_LOD0_Bake_Normal.png",
        matMetallic: "/textures/material_0_Merged0_LOD0_Bake_metallic.png",
        matRoughness: "/textures/material_0_Merged0_LOD0_Bake_roughness.png",
    });

    // Set up animations and apply textures
    useEffect(() => {
        if (materialsApplied) return;

        // Set up animations
        if (fbx.animations && fbx.animations.length > 0) {
            mixerRef.current = new THREE.AnimationMixer(fbx);
            const action = mixerRef.current.clipAction(fbx.animations[0]);
            action.play();
        }

        // Configure textures
        if (textures.bodyDiffuse) textures.bodyDiffuse.colorSpace = THREE.SRGBColorSpace;
        if (textures.matDiffuse) textures.matDiffuse.colorSpace = THREE.SRGBColorSpace;

        // Apply materials to the model
        fbx.traverse((child) => {
            if (child.isMesh) {
                child.castShadow = true;
                child.receiveShadow = true;

                // Determine which texture set to use
                const meshName = child.name.toLowerCase();
                const isBody = meshName.includes("body");

                // Create PBR material with loaded textures
                const newMaterial = new THREE.MeshStandardMaterial({
                    map: isBody ? textures.bodyDiffuse : textures.matDiffuse,
                    normalMap: isBody ? textures.bodyNormal : textures.matNormal,
                    metalnessMap: isBody ? textures.bodyMetallic : textures.matMetallic,
                    roughnessMap: isBody ? textures.bodyRoughness : textures.matRoughness,
                    metalness: 1.0,
                    roughness: 1.0,
                    envMapIntensity: 2.0,
                });

                child.material = newMaterial;
            }
        });

        setMaterialsApplied(true);
    }, [fbx, textures, materialsApplied]);

    // Animation loop
    useFrame((state, delta) => {
        // Update FBX animations
        if (mixerRef.current) {
            mixerRef.current.update(delta);
        }
        // 360° turntable rotation
        if (groupRef.current) {
            groupRef.current.rotation.y += delta * 0.3;
        }
    });

    // Scale and position - FBX models often need rotation adjustment
    const scale = isMobile ? 0.015 : 0.022;

    return (
        <group ref={groupRef}>
            {/* Robot Model - rotated to stand upright */}
            <primitive
                object={fbx}
                scale={scale}
                position={isMobile ? [0, -0.8, 0] : [0, -1, 0]}
                rotation={[-Math.PI / 2, 0, 0]} // Rotate 90 degrees on X to stand upright
            />

            {/* Floating Pedestal underneath */}
            <FloatingPedestal position={isMobile ? [0, -1.8, 0] : [0, -2.2, 0]} />
        </group>
    );
};

// Main Computers Component
const Computers = ({ isMobile }) => {
    return (
        <Float speed={1.5} rotationIntensity={0.1} floatIntensity={0.2}>
            <RobotModel isMobile={isMobile} />
        </Float>
    );
};

export default Computers;
