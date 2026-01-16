"use client";

import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import { siteConfig } from "../data/siteConfig";
import { Cpu, Code2, Globe, Brain } from "lucide-react";

// Dynamically import 3D component
const NeuralNetwork3D = dynamic(
    () => import("./canvas/NeuralNetwork3D"),
    {
        ssr: false,
        loading: () => (
            <div className="w-full h-[400px] md:h-[500px] flex items-center justify-center">
                <div className="w-12 h-12 border-2 border-cyan/30 rounded-full animate-spin" />
            </div>
        )
    }
);

export default function Skills() {
    const categories = [
        { name: "LANGUAGES", icon: <Code2 />, items: siteConfig.skills.languages, color: "cyan" },
        { name: "FRAMEWORKS", icon: <Cpu />, items: siteConfig.skills.frameworks, color: "purple" },
        { name: "TOOLS", icon: <Globe />, items: siteConfig.skills.tools, color: "cyan" },
        { name: "DOMAINS", icon: <Brain />, items: siteConfig.skills.domains, color: "purple" },
    ];

    return (
        <section id="skills" className="py-24 relative z-10 overflow-hidden">
            {/* Background Gradient Effects */}
            <div className="absolute inset-0 z-0">
                <div className="absolute top-1/2 left-1/4 w-[500px] h-[500px] bg-cyan/5 rounded-full blur-[150px]" />
                <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-purple/5 rounded-full blur-[150px]" />
            </div>

            <div className="max-w-7xl mx-auto px-4 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                >
                    {/* Section Header */}
                    <div className="text-center mb-16">
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            whileInView={{ scale: 1, opacity: 1 }}
                            viewport={{ once: true }}
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-cyan/20 mb-6"
                        >
                            <Brain className="w-4 h-4 text-cyan" />
                            <span className="text-sm font-mono text-gray-400">SKILL_MATRIX</span>
                        </motion.div>

                        <h2 className="text-4xl md:text-5xl font-bold font-orbitron mb-4">
                            <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan to-purple">
                                NEURAL NETWORKS
                            </span>
                        </h2>
                        <p className="text-gray-400 max-w-2xl mx-auto">
                            Technologies and domains powering intelligent systems
                        </p>
                    </div>

                    {/* Main Content - Split Layout */}
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        {/* 3D Visualization */}
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="relative order-2 lg:order-1"
                        >
                            <NeuralNetwork3D />

                            {/* Decorative Elements */}
                            <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 text-xs font-mono text-gray-600 tracking-widest">
                                [ INTERACTIVE_3D ]
                            </div>
                        </motion.div>

                        {/* Skill Categories */}
                        <div className="grid sm:grid-cols-2 gap-6 order-1 lg:order-2">
                            {categories.map((category, idx) => (
                                <motion.div
                                    key={category.name}
                                    initial={{ opacity: 0, y: 20, scale: 0.95 }}
                                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: idx * 0.1, duration: 0.4 }}
                                    className={`
                                        relative group p-6 
                                        bg-gradient-to-br from-black/60 to-black/40
                                        backdrop-blur-md rounded-lg
                                        border border-${category.color}/20 
                                        hover:border-${category.color}/60 
                                        transition-all duration-500
                                        overflow-hidden
                                    `}
                                >
                                    {/* Hover Glow */}
                                    <div className={`
                                        absolute inset-0 
                                        bg-gradient-to-br from-${category.color}/10 to-transparent 
                                        opacity-0 group-hover:opacity-100 
                                        transition-opacity duration-500
                                    `} />

                                    {/* Corner Accent */}
                                    <div className={`
                                        absolute top-0 right-0 w-16 h-16
                                        bg-gradient-to-bl from-${category.color}/20 to-transparent
                                        opacity-0 group-hover:opacity-100
                                        transition-opacity duration-300
                                    `} />

                                    {/* Header */}
                                    <div className="flex items-center gap-3 mb-4 relative z-10">
                                        <span className={`text-${category.color} group-hover:scale-110 transition-transform`}>
                                            {category.icon}
                                        </span>
                                        <h3 className="text-lg font-orbitron tracking-widest text-white">
                                            {category.name}
                                        </h3>
                                    </div>

                                    {/* Skills List */}
                                    <div className="flex flex-wrap gap-2 relative z-10">
                                        {category.items.slice(0, 5).map((skill, i) => (
                                            <motion.span
                                                key={skill}
                                                initial={{ opacity: 0, scale: 0.8 }}
                                                whileInView={{ opacity: 1, scale: 1 }}
                                                transition={{ delay: 0.2 + (i * 0.05) }}
                                                className={`
                                                    px-3 py-1.5 
                                                    bg-black/50 
                                                    border border-gray-800 
                                                    rounded text-xs font-mono 
                                                    text-gray-400
                                                    hover:text-${category.color} 
                                                    hover:border-${category.color}/50
                                                    transition-all duration-200
                                                    cursor-default
                                                `}
                                            >
                                                {skill}
                                            </motion.span>
                                        ))}
                                        {category.items.length > 5 && (
                                            <span className="px-3 py-1.5 text-xs font-mono text-gray-600">
                                                +{category.items.length - 5} more
                                            </span>
                                        )}
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
