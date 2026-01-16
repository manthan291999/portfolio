"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import dynamic from "next/dynamic";
import { siteConfig } from "../data/siteConfig";
import { ArrowRight, Download, Terminal } from "lucide-react";
import ResumeGate from "./ResumeGate";

// Dynamically import the 3D canvas to avoid SSR issues
const RobotHero = dynamic(
    () => import("./canvas/RobotHero"),
    {
        ssr: false,
        loading: () => (
            <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 border-2 border-cyan/30 rounded-full animate-spin" />
            </div>
        )
    }
);

export default function Hero() {
    const [isResumeOpen, setIsResumeOpen] = useState(false);
    const [showScrollIndicator, setShowScrollIndicator] = useState(true);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setShowScrollIndicator(false);
            } else {
                setShowScrollIndicator(true);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <section className="relative min-h-screen flex items-center overflow-hidden pt-20">
            {/* 3D Canvas Background - Right Side */}
            <div className="absolute inset-0 z-0">
                {/* Gradient Overlays */}
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan/10 rounded-full blur-[120px] animate-pulse-slow" />
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple/10 rounded-full blur-[120px] animate-pulse-slow delay-1000" />

                {/* 3D Model Container - Positioned Right */}
                <div className="absolute right-0 top-0 w-full md:w-1/2 h-full">
                    <RobotHero />
                </div>
            </div>

            {/* Content - Left Side */}
            <div className="relative z-10 max-w-7xl mx-auto px-4 w-full">
                <div className="grid md:grid-cols-2 gap-8 items-center">
                    {/* Text Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="text-left"
                    >
                        {/* Status Badge */}
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm mb-8">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                            </span>
                            <span className="text-sm text-gray-300 font-mono">System Online</span>
                        </div>

                        {/* Name */}
                        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 font-orbitron tracking-tight">
                            <span className="block text-white mb-2 relative group">
                                <span className="absolute -inset-1 bg-cyan/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                <span className="relative glitch-text" data-text={siteConfig.name}>
                                    {siteConfig.name}
                                </span>
                            </span>
                        </h1>

                        {/* Tagline with Typewriter Effect */}
                        <div className="h-8 mb-8 overflow-hidden">
                            <motion.p
                                className="text-xl md:text-2xl text-transparent bg-clip-text bg-gradient-to-r from-cyan to-purple font-mono"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3, duration: 0.5 }}
                            >
                                {siteConfig.tagline}
                            </motion.p>
                        </div>

                        {/* Description */}
                        <motion.p
                            className="text-gray-400 max-w-xl mb-10 text-lg leading-relaxed"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5, duration: 0.5 }}
                        >
                            Architecting intelligent systems and scalable applications.
                            Specializing in <span className="text-cyan">Generative AI</span>, <span className="text-purple">LLMs</span>, and <span className="text-white">Full-Stack Engineering</span>.
                        </motion.p>

                        {/* CTA Buttons */}
                        <motion.div
                            className="flex flex-col sm:flex-row items-start gap-4"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.7, duration: 0.5 }}
                        >
                            <a
                                href="#projects"
                                className="group relative px-8 py-4 bg-transparent overflow-hidden font-bold transition-all duration-300 flex items-center gap-2"
                            >
                                {/* Button Background */}
                                <span className="absolute inset-0 bg-gradient-to-r from-cyan to-purple opacity-100" />
                                <span className="absolute inset-0 bg-gradient-to-r from-purple to-cyan opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                                {/* Button Border Glow */}
                                <span className="absolute inset-0 border border-cyan/50 group-hover:border-purple/50 transition-colors duration-300" />

                                {/* Button Text */}
                                <span className="relative text-black font-orbitron tracking-wider text-sm">
                                    VIEW PROJECTS
                                </span>
                                <ArrowRight size={18} className="relative text-black group-hover:translate-x-1 transition-transform" />
                            </a>

                            <button
                                onClick={() => setIsResumeOpen(true)}
                                className="group px-8 py-4 bg-transparent border border-white/20 text-white font-bold hover:bg-white/5 hover:border-cyan transition-all duration-300 flex items-center gap-2 backdrop-blur-sm"
                            >
                                <span className="font-orbitron tracking-wider text-sm group-hover:text-cyan transition-colors">
                                    DOWNLOAD CV
                                </span>
                                <Download size={18} className="group-hover:text-cyan transition-colors" />
                            </button>

                            <a
                                href={siteConfig.resumeUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group px-8 py-4 bg-transparent border border-white/20 text-white font-bold hover:bg-white/5 hover:border-purple transition-all duration-300 flex items-center gap-2 backdrop-blur-sm"
                            >
                                <span className="font-orbitron tracking-wider text-sm group-hover:text-purple transition-colors">
                                    VIEW RESUME
                                </span>
                                <Terminal size={18} className="group-hover:text-purple transition-colors" />
                            </a>
                        </motion.div>
                    </motion.div>

                    {/* Spacer for 3D Model */}
                    <div className="hidden md:block" />
                </div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: showScrollIndicator ? 1 : 0 }}
                transition={{ duration: 0.5 }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-gray-500"
            >
                <span className="text-xs font-mono tracking-widest">SCROLL_DOWN</span>
                <div className="w-[1px] h-12 bg-gradient-to-b from-cyan to-transparent" />
            </motion.div>

            <ResumeGate isOpen={isResumeOpen} onClose={() => setIsResumeOpen(false)} />
        </section>
    );
}
