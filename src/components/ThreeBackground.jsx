"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial, Stars } from "@react-three/drei";
import * as random from "maath/random/dist/maath-random.esm";

function ParticleField(props) {
    const ref = useRef();
    const sphere = useMemo(() => random.inSphere(new Float32Array(6000), { radius: 1.5 }), []);

    useFrame((state, delta) => {
        ref.current.rotation.x -= delta / 10;
        ref.current.rotation.y -= delta / 15;

        // Interactive Mouse Movement
        const { mouse } = state;
        ref.current.rotation.x += (mouse.y * 0.5 - ref.current.rotation.x) * 0.02;
        ref.current.rotation.y += (mouse.x * 0.5 - ref.current.rotation.y) * 0.02;
    });

    return (
        <group rotation={[0, 0, Math.PI / 4]}>
            <Points ref={ref} positions={sphere} stride={3} frustumCulled={false} {...props}>
                <PointMaterial
                    transparent
                    color="#00f3ff"
                    size={0.002}
                    sizeAttenuation={true}
                    depthWrite={false}
                    blending={2} // Additive blending for glow
                />
            </Points>
        </group>
    );
}

export default function ThreeBackground() {
    return (
        <div className="fixed inset-0 z-0 bg-black">
            <Canvas camera={{ position: [0, 0, 1] }}>
                <ParticleField />
                <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
            </Canvas>
        </div>
    );
}
