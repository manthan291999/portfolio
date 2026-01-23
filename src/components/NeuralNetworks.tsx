"use client";

import { motion } from "framer-motion";
import { siteConfig } from "../data/siteConfig";
import {
    Code2,
    Terminal,
    Cpu,
    Coffee,
    Database,
    Atom,
    Layers,
    Server,
    Wind,
    Brain,
    Bot,
    GitBranch,
    Container,
    Cloud,
    TestTube,
    Eye,
    MessageSquare,
    Network,
    Box,
    Workflow,
    Activity,
    Zap
} from "lucide-react";

// Icon mapping helper (Enhanced)
const getSkillIcon = (skillName: string) => {
    const lower = skillName.toLowerCase();

    // Languages
    if (lower.includes("python")) return Code2;
    if (lower.includes("script")) return Terminal;
    if (lower.includes("c++")) return Cpu;
    if (lower.includes("java") && !lower.includes("script")) return Coffee;
    if (lower.includes("sql")) return Database;

    // Frameworks
    if (lower.includes("react")) return Atom;
    if (lower.includes("next")) return Layers;
    if (lower.includes("node")) return Server;
    if (lower.includes("tailwind")) return Wind;
    if (lower.includes("tensor") || lower.includes("torch") || lower.includes("learn")) return Brain;
    if (lower.includes("ros")) return Bot;

    // Tools
    if (lower.includes("git")) return GitBranch;
    if (lower.includes("docker")) return Container;
    if (lower.includes("aws") || lower.includes("vercel") || lower.includes("netlify")) return Cloud;
    if (lower.includes("jest") || lower.includes("cypress")) return TestTube;

    // Domains
    if (lower.includes("vision")) return Eye;
    if (lower.includes("nlp") || lower.includes("language")) return MessageSquare;
    if (lower.includes("robotics")) return Bot;
    if (lower.includes("generative")) return Activity;
    if (lower.includes("deep")) return Network;

    // Default
    return Box;
};

const modules = [
    {
        key: "languages",
        label: "LANGUAGES // SYNTAX_CORE",
        color: "cyan",
        icon: Code2,
        description: "Primary communication protocols"
    },
    {
        key: "frameworks",
        label: "FRAMEWORKS // STRUCTURE_MATRIX",
        color: "purple",
        icon: Workflow,
        description: "Architectural scaffolding libraries"
    },
    {
        key: "tools",
        label: "INFRASTRUCTURE // DEPLOY_GRID",
        color: "amber",
        icon: Container,
        description: "DevOps & virtualization units"
    },
    {
        key: "domains",
        label: "DOMAINS // COGNITIVE_LAYERS",
        color: "red",
        icon: Network,
        description: "Advanced AI/Robotics specializations"
    },
] as const;

export default function NeuralNetworks() {
    return (
        <section id="neural-networks" className="py-32 relative overflow-hidden bg-black">
            {/* Background: Server Room Aesthetic */}
            <div className="absolute inset-0 z-0">
                {/* Vertical Server Rack Lines */}
                <div className="absolute inset-0 flex justify-around opacity-10 pointer-events-none">
                    {[...Array(6)].map((_, i) => (
                        <div key={i} className="w-[1px] h-full bg-gradient-to-b from-transparent via-cyan/50 to-transparent dashed-line" />
                    ))}
                </div>

                {/* Floor Reflection Gradient */}
                <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-cyan/5 to-transparent opacity-20" />
            </div>

            <div className="max-w-7xl mx-auto px-4 relative z-10">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-20"
                >
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan/10 border border-cyan/20 text-cyan text-xs font-mono mb-4 tracking-widest">
                        <Zap className="w-3 h-3" />
                        SYSTEM_ARCHIVES_V4.0
                    </div>
                    <h2 className="text-4xl md:text-6xl font-black font-orbitron tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-white/10 uppercase">
                        Neural Networks
                    </h2>
                    <p className="text-gray-500 font-mono mt-4 text-sm md:text-base">
                        /usr/bin/skills --verbose --all
                    </p>
                </motion.div>

                {/* Modules Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {modules.map((module, i) => {
                        const skills = siteConfig.skills[module.key as keyof typeof siteConfig.skills] || [];
                        const BaseIcon = module.icon;
                        const isCyan = module.color === "cyan";
                        const isPurple = module.color === "purple";
                        const isAmber = module.color === "amber";
                        const isRed = module.color === "red";

                        const borderColor = isCyan ? "border-cyan-500/30" : isPurple ? "border-purple-500/30" : isAmber ? "border-amber-500/30" : "border-red-500/30";
                        const glowColor = isCyan ? "shadow-cyan-500/20" : isPurple ? "shadow-purple-500/20" : isAmber ? "shadow-amber-500/20" : "shadow-red-500/20";
                        const textColor = isCyan ? "text-cyan-400" : isPurple ? "text-purple-400" : isAmber ? "text-amber-400" : "text-red-400";
                        const bgColor = isCyan ? "bg-cyan-500/5" : isPurple ? "bg-purple-500/5" : isAmber ? "bg-amber-500/5" : "bg-red-500/5";

                        return (
                            <motion.div
                                key={module.key}
                                initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true, margin: "-50px" }}
                                transition={{ delay: i * 0.1, type: "spring", stiffness: 50 }}
                                className={`
                                    relative group
                                    border ${borderColor} bg-black/40 backdrop-blur-sm
                                    rounded-sm p-6 md:p-8
                                    hover:shadow-[0_0_30px_rgba(0,0,0,0.5)] ${glowColor}
                                    transition-all duration-500
                                `}
                            >
                                {/* Server Lights (Blinking) */}
                                <div className="absolute top-4 right-4 flex gap-1.5">
                                    <div className={`w-1.5 h-1.5 rounded-full ${textColor} animate-pulse bg-current opacity-80`} />
                                    <div className={`w-1.5 h-1.5 rounded-full ${textColor} animate-pulse bg-current opacity-40 delay-75`} />
                                    <div className={`w-1.5 h-1.5 rounded-full ${textColor} animate-pulse bg-current opacity-20 delay-150`} />
                                </div>

                                {/* Module Header */}
                                <div className="flex items-start gap-4 mb-8">
                                    <div className={`p-3 rounded bg-black border ${borderColor} ${textColor}`}>
                                        <BaseIcon className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h3 className={`text-lg font-orbitron tracking-widest ${textColor} mb-1`}>
                                            {module.label}
                                        </h3>
                                        <p className="text-xs text-gray-500 font-mono">
                                            {module.description}
                                        </p>
                                    </div>
                                </div>

                                {/* Skills Chips (Hexagon/Tech style) */}
                                <div className="flex flex-wrap gap-3">
                                    {skills.map((skill, idx) => {
                                        const SkillIcon = getSkillIcon(skill);
                                        return (
                                            <div
                                                key={skill}
                                                className={`
                                                    relative flex items-center gap-2 px-3 py-2
                                                    bg-black border border-white/10
                                                    hover:border-${module.color}-500/50
                                                    group/chip transition-colors duration-300
                                                `}
                                            >
                                                {/* Left Bar Accent */}
                                                <div className={`absolute left-0 top-0 bottom-0 w-[2px] ${bgColor.replace('/5', '')} opacity-0 group-hover/chip:opacity-100 transition-opacity`} />

                                                <SkillIcon className={`w-4 h-4 text-gray-400 group-hover/chip:${textColor} transition-colors`} />
                                                <span className="text-xs font-mono text-gray-300 group-hover/chip:text-white uppercase">
                                                    {skill}
                                                </span>
                                            </div>
                                        );
                                    })}
                                </div>

                                {/* Decorative Tech Lines */}
                                <div className={`absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 ${borderColor} opacity-10 group-hover:opacity-100 transition-opacity`} />
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
