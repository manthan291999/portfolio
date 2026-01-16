// @ts-nocheck
"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Float, Icosahedron } from "@react-three/drei";
import * as THREE from "three";

const Planet = ({ color = "#00f3ff" }) => {
    return (
        <Icosahedron args={[1.5, 0]}>
            <meshStandardMaterial
                color={color}
                flatShading
                metalness={0.5}
                roughness={0.2}
                emissive={color}
                emissiveIntensity={0.2}
            />
        </Icosahedron>
    );
};

const Ring = ({ radius, width, color, speed, rotationOffset = [0, 0, 0], opacity = 0.6 }) => {
    const ref = useRef();

    useFrame((state) => {
        if (ref.current) {
            ref.current.rotation.z += speed * 0.01;
            ref.current.rotation.x += speed * 0.005;
        }
    });

    return (
        <group rotation={rotationOffset}>
            <mesh ref={ref} rotation={[Math.PI / 2, 0, 0]}>
                <torusGeometry args={[radius, width, 16, 100]} />
                <meshBasicMaterial color={color} transparent opacity={opacity} side={THREE.DoubleSide} />
            </mesh>
        </group>
    );
};

const Satellite = ({ distance, speed, size, color, offset }) => {
    const ref = useRef();

    useFrame((state) => {
        if (ref.current) {
            const t = state.clock.elapsedTime * speed + offset;
            ref.current.position.x = Math.cos(t) * distance;
            ref.current.position.z = Math.sin(t) * distance;
            ref.current.position.y = Math.sin(t * 2) * (distance * 0.2);
            ref.current.rotation.y += 0.05;
        }
    });

    return (
        <mesh ref={ref}>
            <icosahedronGeometry args={[size, 0]} />
            <meshStandardMaterial
                color={color}
                emissive={color}
                emissiveIntensity={0.8}
                flatShading
            />
        </mesh>
    );
};

const CyberPlanet = ({ mousePosition }) => {
    const groupRef = useRef();
    const targetRotation = useRef({ x: 0, y: 0 });

    useFrame((state) => {
        if (groupRef.current && mousePosition) {
            // Mouse parallax
            targetRotation.current.y = mousePosition.x * 0.2;
            targetRotation.current.x = -mousePosition.y * 0.2;

            groupRef.current.rotation.y += (targetRotation.current.y - groupRef.current.rotation.y) * 0.05;
            groupRef.current.rotation.x += (targetRotation.current.x - groupRef.current.rotation.x) * 0.05;

            // Constant rotation
            groupRef.current.rotation.y += 0.002;
        }
    });

    return (
        <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
            <group ref={groupRef}>
                {/* Core Planet */}
                <Planet color="#00f3ff" />

                {/* Inner Glow */}
                <mesh>
                    <icosahedronGeometry args={[1.45, 1]} />
                    <meshBasicMaterial color="#bc13fe" transparent opacity={0.3} wireframe />
                </mesh>

                {/* Rings */}
                <Ring radius={2.2} width={0.05} color="#00f3ff" speed={0.5} rotationOffset={[0.2, 0, 0.2]} />
                <Ring radius={2.8} width={0.03} color="#bc13fe" speed={-0.3} rotationOffset={[-0.2, 0.4, -0.1]} />
                <Ring radius={3.5} width={0.02} color="#ffffff" speed={0.2} rotationOffset={[0.4, -0.2, 0.3]} opacity={0.3} />

                {/* Orbiting Satellites */}
                <Satellite distance={2.5} speed={0.8} size={0.15} color="#bc13fe" offset={0} />
                <Satellite distance={3.2} speed={0.5} size={0.2} color="#00f3ff" offset={2} />
                <Satellite distance={2.0} speed={-0.6} size={0.1} color="#ffffff" offset={4} />

                {/* Background Particles/Stars attached to planet group for parallax */}
                {[...Array(20)].map((_, i) => (
                    <mesh
                        key={i}
                        position={[
                            (Math.random() - 0.5) * 10,
                            (Math.random() - 0.5) * 10,
                            (Math.random() - 0.5) * 10
                        ]}
                    >
                        <sphereGeometry args={[0.03]} />
                        <meshBasicMaterial color={Math.random() > 0.5 ? "#00f3ff" : "#bc13fe"} transparent opacity={0.6} />
                    </mesh>
                ))}
            </group>
        </Float>
    );
};

export default CyberPlanet;

