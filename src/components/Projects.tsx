"use client";

import { siteConfig } from "../data/siteConfig";
import ProjectCard from "./ProjectCard";

export default function Projects() {
    return (
        <section id="projects" className="py-24 relative z-10 overflow-hidden">
            <div className="max-w-6xl mx-auto px-4 relative z-10">
                <div className="flex items-center justify-center gap-4 mb-12">
                    <div className="h-[1px] w-12 bg-cyan/50" />
                    <h2 className="text-4xl md:text-5xl font-bold text-center font-orbitron tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-cyan to-purple">
                        SYSTEM_MODULES
                    </h2>
                    <div className="h-[1px] w-12 bg-purple/50" />
                </div>

                <p className="text-center text-gray-400 mb-16 max-w-2xl mx-auto font-mono text-sm">
                    {">"} LISTING DEPLOYED APPLICATIONS...
                </p>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {siteConfig.projects.map((project, index) => (
                        <ProjectCard key={index} project={project} index={index} />
                    ))}
                </div>
            </div>
        </section>
    );
}
