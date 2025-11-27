"use client";

import { motion } from "framer-motion";

export default function VoiceControl({ isListening }) {
    if (!isListening) return null;

    return (
        <div className="flex items-center justify-center gap-1 h-8">
            {[...Array(5)].map((_, i) => (
                <motion.div
                    key={i}
                    animate={{
                        height: [10, 25, 10],
                        backgroundColor: ["#00f3ff", "#bc13fe", "#00f3ff"],
                    }}
                    transition={{
                        duration: 0.5,
                        repeat: Infinity,
                        delay: i * 0.1,
                        ease: "easeInOut",
                    }}
                    className="w-1 rounded-full bg-cyan shadow-[0_0_10px_rgba(0,243,255,0.8)]"
                />
            ))}
        </div>
    );
}
