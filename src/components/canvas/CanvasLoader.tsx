// @ts-nocheck
"use client";

import { Html, useProgress } from "@react-three/drei";

const CanvasLoader = () => {
    const { progress } = useProgress();

    return (
        <Html
            as="div"
            center
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
            }}
        >
            {/* Cyberpunk Loading Spinner */}
            <div className="relative">
                {/* Outer Ring */}
                <div className="w-20 h-20 border-2 border-cyan/30 rounded-full animate-spin-slow" />
                
                {/* Inner Ring */}
                <div className="absolute inset-2 border-2 border-purple/50 rounded-full animate-spin" 
                     style={{ animationDirection: "reverse", animationDuration: "1s" }} />
                
                {/* Core Glow */}
                <div className="absolute inset-4 bg-gradient-to-br from-cyan/20 to-purple/20 rounded-full blur-sm animate-pulse" />
                
                {/* Center Dot */}
                <div className="absolute inset-1/2 w-2 h-2 -translate-x-1/2 -translate-y-1/2 bg-cyan rounded-full shadow-[0_0_10px_#00f3ff]" />
            </div>

            {/* Progress Text */}
            <p className="mt-6 text-sm font-mono text-cyan tracking-widest">
                LOADING<span className="animate-pulse">...</span>
            </p>
            <p className="text-xs font-mono text-gray-500 mt-1">
                {progress.toFixed(0)}%
            </p>
        </Html>
    );
};

export default CanvasLoader;

