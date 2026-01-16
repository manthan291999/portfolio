"use client";

import { useState, useEffect } from "react";

interface LoadingScreenProps {
    onLoadComplete?: () => void;
    minDuration?: number;
}

export default function LoadingScreen({
    onLoadComplete,
    minDuration = 2500
}: LoadingScreenProps) {
    const [progress, setProgress] = useState(0);
    const [loadingText, setLoadingText] = useState("INITIALIZING");
    const [isComplete, setIsComplete] = useState(false);

    const loadingPhrases = [
        "INITIALIZING",
        "LOADING NEURAL NETWORK",
        "PROCESSING DATA",
        "SYNCING MODULES",
        "CALIBRATING SYSTEMS",
        "ACTIVATING INTERFACE",
        "ESTABLISHING CONNECTION",
        "SYSTEM READY"
    ];

    useEffect(() => {
        const startTime = Date.now();
        const increment = 100 / (minDuration / 50);

        const progressInterval = setInterval(() => {
            setProgress(prev => {
                const newProgress = Math.min(prev + increment + Math.random() * 2, 100);

                // Update loading text based on progress
                const phraseIndex = Math.min(
                    Math.floor((newProgress / 100) * loadingPhrases.length),
                    loadingPhrases.length - 1
                );
                setLoadingText(loadingPhrases[phraseIndex]);

                if (newProgress >= 100) {
                    clearInterval(progressInterval);
                    const elapsed = Date.now() - startTime;
                    const remaining = Math.max(0, minDuration - elapsed);

                    setTimeout(() => {
                        setIsComplete(true);
                        setTimeout(() => {
                            onLoadComplete?.();
                        }, 500);
                    }, remaining);
                }

                return newProgress;
            });
        }, 50);

        return () => clearInterval(progressInterval);
    }, [minDuration, onLoadComplete]);

    return (
        <div
            className={`fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center transition-opacity duration-500 ${isComplete ? 'opacity-0 pointer-events-none' : 'opacity-100'
                }`}
        >
            {/* Grid Pattern Background */}
            <div className="absolute inset-0 grid-pattern opacity-30" />

            {/* Animated Circuit Lines */}
            <div className="absolute inset-0 overflow-hidden">
                {[...Array(8)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute h-[1px] bg-gradient-to-r from-transparent via-cyan to-transparent"
                        style={{
                            top: `${10 + i * 12}%`,
                            left: '-100%',
                            width: '200%',
                            animation: `slideAcross ${3 + i * 0.5}s linear infinite`,
                            animationDelay: `${i * 0.3}s`,
                            opacity: 0.3
                        }}
                    />
                ))}
            </div>

            {/* Rotating Hex Border */}
            <div className="relative mb-12">
                <div
                    className="w-32 h-32 md:w-40 md:h-40 relative"
                    style={{
                        animation: 'spin 8s linear infinite'
                    }}
                >
                    {/* Outer Ring */}
                    <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100">
                        <circle
                            cx="50"
                            cy="50"
                            r="45"
                            fill="none"
                            stroke="rgba(0, 243, 255, 0.2)"
                            strokeWidth="0.5"
                        />
                        <circle
                            cx="50"
                            cy="50"
                            r="45"
                            fill="none"
                            stroke="url(#gradient)"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeDasharray={`${progress * 2.83} 283`}
                            transform="rotate(-90 50 50)"
                            style={{
                                transition: 'stroke-dasharray 0.1s ease-out',
                                filter: 'drop-shadow(0 0 8px rgba(0, 243, 255, 0.8))'
                            }}
                        />
                        <defs>
                            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stopColor="#00f3ff" />
                                <stop offset="50%" stopColor="#bc13fe" />
                                <stop offset="100%" stopColor="#00f3ff" />
                            </linearGradient>
                        </defs>
                    </svg>
                </div>

                {/* Inner Pulsing Logo/Icon */}
                <div
                    className="absolute inset-0 flex items-center justify-center"
                    style={{ animation: 'pulse-glow 2s ease-in-out infinite' }}
                >
                    <div className="relative">
                        <div className="text-4xl md:text-5xl font-bold font-orbitron text-glow-cyan text-cyan">
                            M
                        </div>
                        {/* Glitch Effect Layers */}
                        <div
                            className="absolute inset-0 text-4xl md:text-5xl font-bold font-orbitron text-purple opacity-70"
                            style={{
                                animation: 'glitch-1 0.3s infinite linear alternate-reverse',
                                clipPath: 'polygon(0 0, 100% 0, 100% 45%, 0 45%)'
                            }}
                        >
                            M
                        </div>
                        <div
                            className="absolute inset-0 text-4xl md:text-5xl font-bold font-orbitron text-cyan opacity-70"
                            style={{
                                animation: 'glitch-2 0.3s infinite linear alternate-reverse',
                                clipPath: 'polygon(0 55%, 100% 55%, 100% 100%, 0 100%)'
                            }}
                        >
                            M
                        </div>
                    </div>
                </div>
            </div>

            {/* Loading Text */}
            <div className="relative mb-8">
                <div
                    className="font-mono text-sm md:text-base text-cyan tracking-[0.3em] uppercase"
                    style={{
                        textShadow: '0 0 10px rgba(0, 243, 255, 0.8)',
                        animation: 'textFlicker 4s infinite'
                    }}
                >
                    {loadingText}
                    <span className="animate-pulse">_</span>
                </div>
            </div>

            {/* Progress Bar */}
            <div className="w-64 md:w-80 relative">
                {/* Background Bar */}
                <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                    {/* Progress Fill */}
                    <div
                        className="h-full rounded-full relative overflow-hidden"
                        style={{
                            width: `${progress}%`,
                            background: 'linear-gradient(90deg, #00f3ff, #bc13fe, #00f3ff)',
                            backgroundSize: '200% 100%',
                            animation: 'shimmer 2s linear infinite',
                            boxShadow: '0 0 20px rgba(0, 243, 255, 0.5), 0 0 40px rgba(188, 19, 254, 0.3)',
                            transition: 'width 0.1s ease-out'
                        }}
                    >
                        {/* Scanning Effect */}
                        <div
                            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
                            style={{
                                animation: 'scan 1.5s ease-in-out infinite'
                            }}
                        />
                    </div>
                </div>

                {/* Percentage */}
                <div className="flex justify-between mt-3 font-mono text-xs text-cyan/60">
                    <span>{Math.round(progress)}%</span>
                    <span className="text-purple/60">PORTFOLIO v2.0</span>
                </div>
            </div>

            {/* Corner Decorations */}
            <div className="absolute top-4 left-4 w-16 h-16 border-l-2 border-t-2 border-cyan/30" />
            <div className="absolute top-4 right-4 w-16 h-16 border-r-2 border-t-2 border-cyan/30" />
            <div className="absolute bottom-4 left-4 w-16 h-16 border-l-2 border-b-2 border-purple/30" />
            <div className="absolute bottom-4 right-4 w-16 h-16 border-r-2 border-b-2 border-purple/30" />

            {/* Floating Particles */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                {[...Array(20)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute w-1 h-1 rounded-full"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            backgroundColor: i % 2 === 0 ? '#00f3ff' : '#bc13fe',
                            opacity: 0.6,
                            animation: `floatParticle ${3 + Math.random() * 4}s ease-in-out infinite`,
                            animationDelay: `${Math.random() * 2}s`
                        }}
                    />
                ))}
            </div>

            {/* Inline Styles for Animations */}
            <style jsx>{`
                @keyframes slideAcross {
                    0% { transform: translateX(-50%); }
                    100% { transform: translateX(50%); }
                }
                
                @keyframes scan {
                    0% { transform: translateX(-100%); }
                    100% { transform: translateX(200%); }
                }
                
                @keyframes textFlicker {
                    0%, 100% { opacity: 1; }
                    92% { opacity: 1; }
                    93% { opacity: 0.3; }
                    94% { opacity: 1; }
                    95% { opacity: 0.5; }
                    96% { opacity: 1; }
                }
                
                @keyframes floatParticle {
                    0%, 100% { 
                        transform: translateY(0) translateX(0);
                        opacity: 0.6;
                    }
                    25% { 
                        transform: translateY(-20px) translateX(10px);
                        opacity: 0.8;
                    }
                    50% { 
                        transform: translateY(-10px) translateX(-10px);
                        opacity: 0.4;
                    }
                    75% { 
                        transform: translateY(-30px) translateX(5px);
                        opacity: 0.7;
                    }
                }
                
                @keyframes spin {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
            `}</style>
        </div>
    );
}
