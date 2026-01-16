"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Github, ExternalLink, Code } from "lucide-react";

export default function ProjectCard({ project, index }) {
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseX = useSpring(x, { stiffness: 500, damping: 100 });
    const mouseY = useSpring(y, { stiffness: 500, damping: 100 });

    const rotateX = useTransform(mouseY, [-0.5, 0.5], ["17.5deg", "-17.5deg"]);
    const rotateY = useTransform(mouseX, [-0.5, 0.5], ["-17.5deg", "17.5deg"]);

    const handleMouseMove = (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        const xPct = mouseX / width - 0.5;
        const yPct = mouseY / height - 0.5;
        x.set(xPct);
        y.set(yPct);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            style={{
                rotateX,
                rotateY,
                transformStyle: "preserve-3d",
            }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="group relative bg-black border border-gray-800 hover:border-cyan/50 transition-colors duration-500 rounded-xl h-full flex flex-col perspective-1000"
        >
            {/* Holographic Overlay */}
            <div
                className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(0,243,255,0.05)_50%,transparent_75%)] bg-[length:250%_250%] opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-gradient-xy pointer-events-none rounded-xl"
                style={{ transform: "translateZ(50px)" }}
            />

            <div className="p-6 flex flex-col flex-grow relative z-10" style={{ transform: "translateZ(20px)" }}>
                <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-bold font-orbitron text-white group-hover:text-cyan transition-colors">{project.title}</h3>
                    <Code className="text-gray-600 group-hover:text-cyan transition-colors" size={20} />
                </div>

                <p className="text-gray-400 mb-6 text-sm flex-grow leading-relaxed font-light">
                    {project.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-6">
                    {project.techStack.map((tech) => (
                        <span
                            key={tech}
                            className="px-2 py-1 bg-gray-900 text-cyan/70 rounded text-xs font-mono border border-gray-800 group-hover:border-cyan/30 transition-colors"
                        >
                            {tech}
                        </span>
                    ))}
                </div>

                <ul className="space-y-2 mb-6 border-t border-gray-800 pt-4">
                    {project.highlights.map((highlight, i) => (
                        <li key={i} className="text-xs text-gray-500 flex items-start group-hover:text-gray-400 transition-colors">
                            <span className="mr-2 text-cyan">•</span>
                            {highlight}
                        </li>
                    ))}
                </ul>

                <div className="flex items-center gap-4 mt-auto pt-4 border-t border-gray-800">
                    {project.github && (
                        <a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 text-sm font-medium text-gray-400 hover:text-cyan transition group/link"
                        >
                            <Github size={16} className="group-hover/link:rotate-12 transition-transform" />
                            <span className="relative">
                                Source Code
                                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-cyan transition-all group-hover/link:w-full"></span>
                            </span>
                        </a>
                    )}
                    {project.demo && project.demo !== "#" && (
                        <a
                            href={project.demo}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 text-sm font-medium text-gray-400 hover:text-purple transition group/link"
                        >
                            <ExternalLink size={16} className="group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5 transition-transform" />
                            <span className="relative">
                                Live Demo
                                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-purple transition-all group-hover/link:w-full"></span>
                            </span>
                        </a>
                    )}
                </div>
            </div>
        </motion.div>
    );
}
