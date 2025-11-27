"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { siteConfig } from "../data/siteConfig";
import { ArrowRight, Download, Terminal } from "lucide-react";
import ResumeGate from "./ResumeGate";

export default function Hero() {
    const [isResumeOpen, setIsResumeOpen] = useState(false);

    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
            {/* Background Elements */}
            <div className="absolute inset-0 z-0">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan/20 rounded-full blur-[100px] animate-pulse-slow" />
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple/20 rounded-full blur-[100px] animate-pulse-slow delay-1000" />
            </div>

            <div className="relative z-10 max-w-6xl mx-auto px-4 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm mb-8">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                        </span>
                        <span className="text-sm text-gray-300 font-mono">System Online</span>
                    </div>

                    <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 font-orbitron tracking-tight">
                        <span className="block text-white mb-2 relative group">
                            <span className="absolute -inset-1 bg-cyan/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            <span className="relative glitch-text" data-text={siteConfig.name}>
                                {siteConfig.name}
                            </span>
                        </span>
                    </h1>

                    <div className="h-8 mb-8 overflow-hidden">
                        <p className="text-xl md:text-2xl text-transparent bg-clip-text bg-gradient-to-r from-cyan to-purple font-mono typewriter">
                            {siteConfig.tagline}
                        </p>
                    </div>

                    <p className="text-gray-400 max-w-2xl mx-auto mb-10 text-lg leading-relaxed">
                        Architecting intelligent systems and scalable applications.
                        Specializing in Generative AI, LLMs, and Full-Stack Engineering.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <a
                            href="#projects"
                            className="px-8 py-4 bg-white text-black rounded-none font-bold hover:bg-cyan hover:scale-105 transition-all duration-300 flex items-center gap-2 group"
                        >
                            INITIALIZE PROJECTS <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                        </a>
                        <button
                            onClick={() => setIsResumeOpen(true)}
                            className="px-8 py-4 bg-transparent border border-white/20 text-white rounded-none font-bold hover:bg-white/10 hover:border-cyan hover:text-cyan transition-all duration-300 flex items-center gap-2 backdrop-blur-sm"
                        >
                            DOWNLOAD DATA <Download size={20} />
                        </button>
                    </div>
                </motion.div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 1 }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-gray-500"
            >
                <span className="text-xs font-mono">SCROLL_DOWN</span>
                <div className="w-[1px] h-12 bg-gradient-to-b from-cyan to-transparent" />
            </motion.div>

            <ResumeGate isOpen={isResumeOpen} onClose={() => setIsResumeOpen(false)} />
        </section>
    );
}
