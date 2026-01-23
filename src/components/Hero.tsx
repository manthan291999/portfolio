"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { siteConfig } from "../data/siteConfig";
import { ArrowRight, Download, Terminal, Cpu, Network } from "lucide-react";
import ResumeGate from "./ResumeGate";
import TerminalWindow from "./TerminalWindow";
import HolographicCard from "./HolographicCard";

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

    const bootSequence = [
        "> Initializing Neural Interface...",
        "> Loading Core Modules [AI, ML, LLM]...",
        "> ESTABLISHING UPLINK...",
        "> Connection Established.",
        "> Accessing User Profile: " + siteConfig.name,
        "> Role: Senior AI Engineer",
        "> Status: ONLINE",
    ];

    return (
        <section className="relative min-h-screen flex items-center overflow-hidden pt-20">
            {/* Content Container */}
            <div className="relative z-10 max-w-7xl mx-auto px-4 w-full">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    {/* Left Column: Text Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="text-left"
                    >
                        {/* Status Badge */}
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-glass border border-glass-border backdrop-blur-sm mb-8">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                            </span>
                            <span className="text-sm text-cyan font-mono tracking-widest">SYSTEM ONLINE</span>
                        </div>

                        {/* Name */}
                        <h1 className="text-5xl md:text-7xl font-bold mb-6 font-orbitron tracking-tighter">
                            <div className="overflow-hidden">
                                <motion.span
                                    className="block text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-200 to-gray-400"
                                    initial={{ y: "100%" }}
                                    animate={{ y: 0 }}
                                    transition={{ duration: 0.8, ease: "circOut" }}
                                >
                                    {siteConfig.name}
                                </motion.span>
                            </div>
                        </h1>

                        {/* Tagline */}
                        <div className="mb-8">
                            <motion.p
                                className="text-xl md:text-2xl text-cyan font-mono"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3, duration: 0.5 }}
                            >
                                <span className="text-purple">{">"}</span> {siteConfig.tagline}
                            </motion.p>
                        </div>

                        {/* Description */}
                        <motion.p
                            className="text-gray-400 max-w-xl mb-10 text-lg leading-relaxed font-light"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5, duration: 0.5 }}
                        >
                            Architecting intelligent systems and scalable applications.
                            Specializing in <span className="text-cyan font-medium">Generative AI</span>, <span className="text-purple font-medium">LLMs</span>, and <span className="text-white font-medium">Full-Stack Engineering</span>.
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
                                className="group relative px-8 py-4 bg-cyan/10 overflow-hidden font-bold transition-all duration-300 flex items-center gap-2 border border-cyan/50 hover:border-cyan hover:bg-cyan/20 rounded-sm"
                            >
                                <span className="text-cyan font-orbitron tracking-wider text-sm">
                                    VIEW PROJECTS
                                </span>
                                <ArrowRight size={18} className="text-cyan group-hover:translate-x-1 transition-transform" />
                            </a>

                            <button
                                onClick={() => setIsResumeOpen(true)}
                                className="group px-8 py-4 bg-transparent border border-white/20 text-white font-bold hover:bg-white/5 hover:border-purple transition-all duration-300 flex items-center gap-2 backdrop-blur-sm rounded-sm"
                            >
                                <span className="font-orbitron tracking-wider text-sm group-hover:text-purple transition-colors">
                                    DOWNLOAD CV
                                </span>
                                <Download size={18} className="group-hover:text-purple transition-colors" />
                            </button>
                        </motion.div>
                    </motion.div>

                    {/* Right Column: Terminal Display */}
                    <div className="hidden md:block relative">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.5, duration: 0.8 }}
                        >
                            <TerminalWindow title="neural_link.sh" className="h-[400px] shadow-2xl shadow-cyan/10">
                                <div className="space-y-4">
                                    {bootSequence.map((line, index) => (
                                        <motion.div
                                            key={index}
                                            initial={{ opacity: 0, x: -10 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: 1 + index * 0.2 }}
                                            className="text-sm font-mono"
                                        >
                                            <span className={line.includes("Error") ? "text-red-400" : "text-green-400"}>
                                                {line}
                                            </span>
                                        </motion.div>
                                    ))}

                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: 2.5 }}
                                        className="pt-4 border-t border-white/10 mt-4"
                                    >
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="bg-white/5 p-3 rounded border border-white/5">
                                                <div className="text-xs text-gray-500 mb-1">CURRENT PROJECT</div>
                                                <div className="text-cyan text-sm">FinFlow AI</div>
                                            </div>
                                            <div className="bg-white/5 p-3 rounded border border-white/5">
                                                <div className="text-xs text-gray-500 mb-1">STACK</div>
                                                <div className="text-purple text-sm">Next.js + PyTorch</div>
                                            </div>
                                        </div>
                                    </motion.div>
                                </div>
                            </TerminalWindow>

                            {/* Decorative Background Elements behind Terminal */}
                            <div className="absolute -z-10 -top-10 -right-10 w-64 h-64 bg-cyan/20 rounded-full blur-[80px]" />
                            <div className="absolute -z-10 -bottom-10 -left-10 w-64 h-64 bg-purple/20 rounded-full blur-[80px]" />
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: showScrollIndicator ? 1 : 0 }}
                transition={{ duration: 0.5 }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-cyan/50"
            >
                <span className="text-xs font-mono tracking-widest animate-pulse">SCROLL_DOWN</span>
                <div className="w-[1px] h-12 bg-gradient-to-b from-cyan to-transparent" />
            </motion.div>

            <ResumeGate isOpen={isResumeOpen} onClose={() => setIsResumeOpen(false)} />
        </section>
    );
}
