"use client";

import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import { siteConfig } from "../data/siteConfig";
import { Briefcase, Calendar, MapPin, GraduationCap } from "lucide-react";

// Dynamically import 3D background
const TimelineBackground3D = dynamic(
    () => import("./canvas/TimelineBackground3D"),
    { ssr: false, loading: () => null }
);

export default function Experience() {
    return (
        <section id="experience" className="py-24 relative z-10 overflow-hidden">
            {/* 3D Background */}
            <TimelineBackground3D />
            <div className="max-w-5xl mx-auto px-4">
                <h2 className="text-4xl md:text-5xl font-bold text-center mb-20 font-orbitron">
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan to-purple">
                        CHRONICLES
                    </span>
                </h2>

                <div className="grid md:grid-cols-2 gap-12">
                    {/* Experience */}
                    <div>
                        <h3 className="text-2xl font-orbitron flex items-center gap-3 mb-10 text-cyan">
                            <Briefcase className="text-cyan" /> EXPERIENCE
                        </h3>
                        <div className="space-y-12">
                            {siteConfig.experience.map((exp, idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: idx * 0.1 }}
                                    className="relative pl-8 border-l border-cyan/30 hover:border-cyan transition-colors duration-300 group"
                                >
                                    <div className="absolute -left-[5px] top-0 w-2.5 h-2.5 rounded-full bg-black border border-cyan group-hover:bg-cyan group-hover:shadow-[0_0_10px_rgba(0,243,255,0.8)] transition-all duration-300" />

                                    <div className="mb-2">
                                        <h4 className="text-xl font-bold text-white group-hover:text-cyan transition-colors">{exp.role}</h4>
                                        <div className="flex items-center gap-2 text-sm text-gray-400 mt-1">
                                            <span className="text-purple font-medium">{exp.company}</span>
                                            <span>•</span>
                                            <span className="flex items-center gap-1"><Calendar size={12} /> {exp.period}</span>
                                        </div>
                                    </div>

                                    <ul className="space-y-2 text-gray-400 text-sm leading-relaxed mt-4">
                                        {exp.points.map((point, i) => (
                                            <li key={i} className="flex items-start gap-2">
                                                <span className="text-cyan/50 mt-1">▹</span>
                                                {point}
                                            </li>
                                        ))}
                                    </ul>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* Education */}
                    <div>
                        <h3 className="text-2xl font-orbitron flex items-center gap-3 mb-10 text-purple">
                            <GraduationCap className="text-purple" /> EDUCATION
                        </h3>
                        <div className="space-y-12">
                            {siteConfig.education.map((edu, idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: idx * 0.1 }}
                                    className="relative pl-8 border-l border-purple/30 hover:border-purple transition-colors duration-300 group"
                                >
                                    <div className="absolute -left-[5px] top-0 w-2.5 h-2.5 rounded-full bg-black border border-purple group-hover:bg-purple group-hover:shadow-[0_0_10px_rgba(188,19,254,0.8)] transition-all duration-300" />

                                    <div className="mb-2">
                                        <h4 className="text-xl font-bold text-white group-hover:text-purple transition-colors">{edu.degree}</h4>
                                        <div className="flex items-center gap-2 text-sm text-gray-400 mt-1">
                                            <span className="text-cyan font-medium">{edu.institution}</span>
                                            <span>•</span>
                                            <span>{edu.year}</span>
                                        </div>
                                    </div>

                                    <ul className="space-y-2 text-gray-400 text-sm leading-relaxed mt-4">
                                        {edu.details.map((detail, i) => (
                                            <li key={i} className="flex items-start gap-2">
                                                <span className="text-purple/50 mt-1">▹</span>
                                                {detail}
                                            </li>
                                        ))}
                                    </ul>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
