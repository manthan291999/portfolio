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
            className="group relative h-full flex flex-col perspective-1000"
        >
            <div className="relative h-full w-full bg-glass backdrop-blur-md border border-glass-border rounded-xl p-6 overflow-hidden hover:border-cyan/50 transition-colors duration-500">
                {/* Corner Accents */}
                <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-cyan/50 rounded-tl-lg opacity-50 group-hover:opacity-100 transition-opacity" />
                <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-purple/50 rounded-tr-lg opacity-50 group-hover:opacity-100 transition-opacity" />
                <div className="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-purple/50 rounded-bl-lg opacity-50 group-hover:opacity-100 transition-opacity" />
                <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-cyan/50 rounded-br-lg opacity-50 group-hover:opacity-100 transition-opacity" />

                {/* Content Container with Z-Depth */}
                <div className="relative z-10 flex flex-col h-full" style={{ transform: "translateZ(20px)" }}>
                    <div className="flex justify-between items-start mb-4">
                        <h3 className="text-xl font-bold font-orbitron text-white group-hover:text-cyan transition-colors tracking-wide">{project.title}</h3>
                        <Code className="text-gray-600 group-hover:text-cyan transition-colors" size={20} />
                    </div>

                    <p className="text-gray-400 mb-6 text-sm flex-grow leading-relaxed font-light font-mono">
                        {project.description}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-6">
                        {project.techStack.map((tech) => (
                            <span
                                key={tech}
                                className="px-2 py-1 bg-white/5 text-cyan/70 rounded text-[10px] font-mono border border-white/10 group-hover:border-cyan/30 transition-colors"
                            >
                                {tech}
                            </span>
                        ))}
                    </div>

                    <div className="flex items-center gap-4 mt-auto pt-4 border-t border-white/10">
                        {project.github && (
                            <a
                                href={project.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 text-sm font-medium text-gray-400 hover:text-cyan transition group/link"
                            >
                                <Github size={16} className="group-hover/link:rotate-12 transition-transform" />
                                <span className="relative font-orbitron text-xs">
                                    SOURCE
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
                                <span className="relative font-orbitron text-xs">
                                    DEMO
                                </span>
                            </a>
                        )}
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
