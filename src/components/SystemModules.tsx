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
    Activity
} from "lucide-react";

// Icon mapping helper
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

// Module configuration for categories
const modules = [
    {
        key: "languages",
        label: "LANGUAGES",
        color: "text-cyan-400",
        bg: "bg-cyan-500/10",
        border: "border-cyan-500/20",
        icon: Code2
    },
    {
        key: "frameworks",
        label: "FRAMEWORKS",
        color: "text-purple-400",
        bg: "bg-purple-500/10",
        border: "border-purple-500/20",
        icon: Workflow
    },
    {
        key: "tools",
        label: "TOOLS & INFRA",
        color: "text-amber-400",
        bg: "bg-amber-500/10",
        border: "border-amber-500/20",
        icon: Container
    },
    {
        key: "domains",
        label: "DOMAINS",
        color: "text-red-400",
        bg: "bg-red-500/10",
        border: "border-red-500/20",
        icon: Network
    },
] as const;

export default function SystemModules() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
            {modules.map((module, i) => {
                const skills = siteConfig.skills[module.key as keyof typeof siteConfig.skills] || [];
                const BaseIcon = module.icon;

                return (
                    <motion.div
                        key={module.key}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1 }}
                        className="group relative overflow-hidden rounded-xl border border-white/10 bg-black/40 backdrop-blur-md p-4"
                    >
                        {/* Module Header */}
                        <div className="flex items-center justify-between mb-4 border-b border-white/5 pb-2">
                            <div className="flex items-center gap-2">
                                <BaseIcon className={`w-4 h-4 ${module.color}`} />
                                <span className={`text-xs font-mono tracking-widest ${module.color}`}>
                                    {module.label}
                                </span>
                            </div>
                            <div className="flex gap-1">
                                {[...Array(3)].map((_, j) => (
                                    <div key={j} className={`w-1 h-1 rounded-full ${j === 0 ? "bg-white/50" : "bg-white/10"}`} />
                                ))}
                            </div>
                        </div>

                        {/* Skills Grid */}
                        <div className="flex flex-wrap gap-2">
                            {skills.map((skill, idx) => {
                                const Icon = getSkillIcon(skill);
                                return (
                                    <motion.div
                                        key={skill}
                                        whileHover={{ scale: 1.05 }}
                                        className={`
                                            flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg 
                                            border border-white/5 bg-white/5 
                                            hover:border-white/20 hover:bg-white/10 
                                            transition-all duration-300 cursor-crosshair
                                            ${module.color === "text-cyan-400" ? "hover:shadow-[0_0_10px_rgba(34,211,238,0.2)]" : ""}
                                            ${module.color === "text-purple-400" ? "hover:shadow-[0_0_10px_rgba(192,132,252,0.2)]" : ""}
                                            ${module.color === "text-amber-400" ? "hover:shadow-[0_0_10px_rgba(251,191,36,0.2)]" : ""}
                                            ${module.color === "text-red-400" ? "hover:shadow-[0_0_10px_rgba(248,113,113,0.2)]" : ""}
                                        `}
                                    >
                                        <Icon className={`w-3.5 h-3.5 ${module.color} opacity-80`} />
                                        <span className="text-[10px] md:text-xs text-gray-300 font-mono">
                                            {skill}
                                        </span>
                                    </motion.div>
                                );
                            })}
                        </div>

                        {/* Decorative Corner */}
                        <div className={`absolute -bottom-1 -right-1 w-6 h-6 border-r-2 border-b-2 ${module.border} opacity-20 group-hover:opacity-100 transition-opacity rounded-br-xl`} />
                    </motion.div>
                );
            })}
        </div>
    );
}
