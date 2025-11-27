"use client";

import { motion } from "framer-motion";
import { siteConfig } from "../data/siteConfig";
import { Cpu, Code2, Globe } from "lucide-react";

export default function Skills() {
    const categories = [
        { name: "LANGUAGES", icon: <Code2 />, items: siteConfig.skills.languages },
        { name: "FRAMEWORKS", icon: <Cpu />, items: siteConfig.skills.frameworks },
        { name: "TOOLS", icon: <Globe />, items: siteConfig.skills.tools },
    ];

    return (
        <section id="skills" className="py-24 relative z-10">
            <div className="max-w-6xl mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                >
                    <h2 className="text-4xl md:text-5xl font-bold text-center mb-20 font-orbitron">
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan to-purple">
                            NEURAL NETWORKS
                        </span>
                    </h2>

                    <div className="grid md:grid-cols-3 gap-8">
                        {categories.map((category, idx) => (
                            <motion.div
                                key={category.name}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1 }}
                                className="bg-black/40 backdrop-blur-md rounded-xl p-6 border border-cyan/20 hover:border-cyan/60 transition-all duration-300 group relative overflow-hidden"
                            >
                                <div className="absolute inset-0 bg-gradient-to-b from-cyan/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                                <div className="flex items-center gap-3 mb-6 border-b border-cyan/20 pb-4">
                                    <span className="text-cyan">{category.icon}</span>
                                    <h3 className="text-xl font-orbitron tracking-widest text-white">{category.name}</h3>
                                </div>

                                <div className="flex flex-wrap gap-3 relative z-10">
                                    {category.items.map((skill, i) => (
                                        <motion.div
                                            key={skill}
                                            initial={{ opacity: 0, x: -10 }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            transition={{ delay: 0.2 + (i * 0.05) }}
                                            className="relative group/skill"
                                        >
                                            <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan to-purple rounded opacity-0 group-hover/skill:opacity-75 blur transition duration-200" />
                                            <div className="relative px-3 py-1.5 bg-black border border-gray-800 rounded text-sm font-mono text-cyan/80 group-hover/skill:text-white transition-colors">
                                                {skill}
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
