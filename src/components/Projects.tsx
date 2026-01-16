"use client";

import dynamic from "next/dynamic";
import { siteConfig } from "../data/siteConfig";
import ProjectCard from "./ProjectCard";

// Dynamically import 3D background
const ProjectsBackground3D = dynamic(
    () => import("./canvas/ProjectsBackground3D"),
    { ssr: false, loading: () => null }
);

export default function Projects() {
    return (
        <section id="projects" className="py-24 relative z-10 overflow-hidden">
            {/* 3D Background */}
            <ProjectsBackground3D />

            <div className="max-w-6xl mx-auto px-4 relative z-10">
                <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 font-orbitron">
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan to-purple">
                        INNOVATIONS
                    </span>
                </h2>
                <p className="text-center text-gray-400 mb-16 max-w-2xl mx-auto font-light">
                    Deploying intelligence into production.
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
