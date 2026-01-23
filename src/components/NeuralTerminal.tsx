"use client";

import { useEffect, useState, useRef, FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal, X, ChevronRight, Activity, Cpu, ShieldCheck } from "lucide-react";
import { siteConfig } from "../data/siteConfig";

type CommandHistory = {
    type: "input" | "output" | "system";
    content: React.ReactNode;
};

export default function NeuralTerminal() {
    const [isOpen, setIsOpen] = useState(false);
    const [input, setInput] = useState("");
    const [history, setHistory] = useState<CommandHistory[]>([
        { type: "system", content: "NEURAL_LINK_V3.0 initialized..." },
        { type: "system", content: "Type 'help' for available commands." }
    ]);
    const inputRef = useRef<HTMLInputElement>(null);
    const endRef = useRef<HTMLDivElement>(null);

    // Toggle logic
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if ((e.metaKey || e.ctrlKey) && e.key === "k") {
                e.preventDefault();
                setIsOpen((prev) => !prev);
            }
            if (e.key === "Escape") {
                setIsOpen(false);
            }
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, []);

    // Auto-scroll and focus
    useEffect(() => {
        if (isOpen) {
            setTimeout(() => inputRef.current?.focus(), 100);
            endRef.current?.scrollIntoView({ behavior: "smooth" });
        }
    }, [isOpen, history]);

    const handleCommand = async (cmd: string) => {
        const cleanCmd = cmd.trim().toLowerCase();

        // Add user input to history
        setHistory(prev => [...prev, { type: "input", content: cleanCmd }]);
        setInput("");

        // Process thinking delay (simulated latency)
        await new Promise(r => setTimeout(r, 300));

        let response: CommandHistory | null = null;

        switch (cleanCmd) {
            case "help":
                response = {
                    type: "output",
                    content: (
                        <div className="grid grid-cols-2 gap-4 text-sm">
                            <span className="text-cyan-400">help</span> <span>Show this menu</span>
                            <span className="text-cyan-400">whoami</span> <span>Display bio bio_data</span>
                            <span className="text-cyan-400">ls projects</span> <span>List repositories</span>
                            <span className="text-cyan-400">contact</span> <span>Establish comms channel</span>
                            <span className="text-cyan-400">status</span> <span>Run system diagnostics</span>
                            <span className="text-cyan-400">clear</span> <span>Purge terminal history</span>
                        </div>
                    )
                };
                break;

            case "whoami":
                response = {
                    type: "output",
                    content: (
                        <div className="space-y-2">
                            <div className="font-bold text-lg">{siteConfig.name}</div>
                            <div className="text-gray-400">{siteConfig.tagline}</div>
                            <div className="text-sm border-l-2 border-purple-500 pl-3 italic">
                                "{siteConfig.about[0]}"
                            </div>
                        </div>
                    )
                };
                break;

            case "ls projects":
            case "projects":
                response = {
                    type: "output",
                    content: (
                        <div className="grid gap-2">
                            {siteConfig.projects.slice(0, 5).map(p => (
                                <a key={p.title} href={p.github} target="_blank" className="flex items-center justify-between group hover:bg-white/5 p-1 rounded transition-colors">
                                    <span>{p.title}</span>
                                    <span className="text-xs text-gray-500 group-hover:text-cyan-400">[{p.techStack[0]}]</span>
                                </a>
                            ))}
                            <div className="text-xs text-gray-500 mt-1">... {siteConfig.projects.length - 5} more projects hidden.</div>
                        </div>
                    )
                };
                break;

            case "contact":
                response = {
                    type: "output",
                    content: (
                        <div className="flex flex-col gap-1">
                            {siteConfig.socials.map(s => (
                                <a key={s.name} href={s.url} target="_blank" className="text-cyan-400 hover:underline">{s.name} &rarr; {s.url}</a>
                            ))}
                            <div className="text-purple-400">Email &rarr; {siteConfig.email}</div>
                        </div>
                    )
                };
                break;

            case "status":
                setHistory(prev => [...prev, { type: "system", content: "Running diagnostics..." }]);
                await new Promise(r => setTimeout(r, 800));
                response = {
                    type: "output",
                    content: (
                        <div className="grid grid-cols-3 gap-2 text-xs font-mono">
                            <div className="border border-green-500/30 bg-green-500/10 p-2 text-center rounded">
                                <Cpu className="w-4 h-4 mx-auto mb-1 text-green-400" />
                                <div>CORE: ONLINE</div>
                            </div>
                            <div className="border border-green-500/30 bg-green-500/10 p-2 text-center rounded">
                                <Activity className="w-4 h-4 mx-auto mb-1 text-green-400" />
                                <div>LATENCY: 12ms</div>
                            </div>
                            <div className="border border-green-500/30 bg-green-500/10 p-2 text-center rounded">
                                <ShieldCheck className="w-4 h-4 mx-auto mb-1 text-green-400" />
                                <div>SECURE: TRUE</div>
                            </div>
                        </div>
                    )
                };
                break;

            case "clear":
                setHistory([{ type: "system", content: "Terminal cleared." }]);
                return;

            default:
                response = {
                    type: "output",
                    content: <span className="text-red-400">Error: Command not recognized. Type 'help'.</span>
                };
        }

        if (response) {
            setHistory(prev => [...prev, response!]);
        }
    };

    const onSubmit = (e: FormEvent) => {
        e.preventDefault();
        if (input.trim()) handleCommand(input);
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md p-4"
                    onClick={() => setIsOpen(false)}
                >
                    <motion.div
                        initial={{ scale: 0.95, y: 20 }}
                        animate={{ scale: 1, y: 0 }}
                        exit={{ scale: 0.95, y: 20 }}
                        transition={{ type: "spring", bounce: 0.2 }}
                        className="w-full max-w-2xl bg-[#09090b] border border-white/10 rounded-xl overflow-hidden shadow-2xl shadow-cyan-500/10 flex flex-col font-mono text-sm"
                        onClick={e => e.stopPropagation()}
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between px-4 py-3 border-b border-white/5 bg-white/5">
                            <div className="flex items-center gap-2 text-gray-400">
                                <Terminal className="w-4 h-4" />
                                <span>guest@neural_link:~</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <span className="text-[10px] text-gray-600 border border-gray-800 px-1 rounded">PROD</span>
                                <button onClick={() => setIsOpen(false)} className="hover:text-white transition-colors">
                                    <X className="w-4 h-4" />
                                </button>
                            </div>
                        </div>

                        {/* Terminal Body */}
                        <div className="h-[400px] overflow-y-auto p-4 space-y-2 text-gray-300 scrollbar-hide" onClick={() => inputRef.current?.focus()}>
                            {history.map((entry, i) => (
                                <div key={i} className="leading-snug">
                                    {entry.type === "input" && (
                                        <div className="flex items-center gap-2 text-cyan-400 mt-4 mb-1">
                                            <ChevronRight className="w-3 h-3" />
                                            <span>{entry.content}</span>
                                        </div>
                                    )}
                                    {entry.type === "output" && (
                                        <div className="ml-5 text-gray-200">{entry.content}</div>
                                    )}
                                    {entry.type === "system" && (
                                        <div className="text-gray-500 italic text-xs mb-2">
                                            {">>"} {entry.content}
                                        </div>
                                    )}
                                </div>
                            ))}
                            <div ref={endRef} />
                        </div>

                        {/* Input Area */}
                        <form onSubmit={onSubmit} className="p-3 bg-black/20 border-t border-white/5 flex items-center gap-2">
                            <ChevronRight className="w-4 h-4 text-cyan-500 animate-pulse" />
                            <input
                                ref={inputRef}
                                type="text"
                                value={input}
                                onChange={e => setInput(e.target.value)}
                                className="flex-1 bg-transparent border-none outline-none text-white placeholder-gray-700"
                                placeholder="Enter command..."
                                autoFocus
                            />
                        </form>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
