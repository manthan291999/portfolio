"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Mic, X, Activity } from "lucide-react";
import SentientOrb from "./SentientOrb";
import { useEffect, useState } from "react";

interface VoiceCommandOverlayProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function VoiceCommandOverlay({ isOpen, onClose }: VoiceCommandOverlayProps) {
    const [transcript, setTranscript] = useState("Listening for command...");
    const [orbState, setOrbState] = useState<"idle" | "listening" | "thinking" | "speaking">("listening");

    // Placeholder for real speech logic integration (simulated for UI)
    useEffect(() => {
        if (isOpen) {
            setOrbState("listening");
            setTranscript("Listening...");
            // In a real app, this would hook into the shared speech recognition instance
        } else {
            setOrbState("idle");
        }
    }, [isOpen]);

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl flex flex-col items-center justify-center"
                >
                    {/* Close Button */}
                    <button
                        onClick={onClose}
                        className="absolute top-8 right-8 p-4 text-cyan/50 hover:text-cyan hover:bg-white/5 rounded-full transition-all"
                    >
                        <X size={32} />
                    </button>

                    {/* Central Orb */}
                    <div className="w-[300px] h-[300px] md:w-[500px] md:h-[500px] relative">
                        <SentientOrb state={orbState} />
                    </div>

                    {/* Transcript / Status */}
                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        className="mt-12 text-center max-w-2xl px-4"
                    >
                        <h2 className="text-2xl md:text-4xl font-light text-white mb-4 tracking-tight">
                            {transcript}
                        </h2>
                        <div className="flex items-center justify-center gap-3 text-cyan/70 font-mono text-sm">
                            <Activity size={16} className="animate-pulse" />
                            <span>VOICE_CHANNEL_ACTIVE</span>
                        </div>
                    </motion.div>

                    {/* Waveform Visualizer (Simulated) */}
                    <div className="absolute bottom-0 left-0 w-full h-32 flex items-end justify-center gap-1 pb-10 opacity-30">
                        {[...Array(20)].map((_, i) => (
                            <motion.div
                                key={i}
                                className="w-2 bg-gradient-to-t from-cyan to-purple rounded-full"
                                animate={{
                                    height: [20, Math.random() * 100 + 20, 20],
                                }}
                                transition={{
                                    duration: 0.5,
                                    repeat: Infinity,
                                    delay: i * 0.05,
                                }}
                            />
                        ))}
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
