"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function NotFound() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute inset-0 z-0">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-red-500/10 rounded-full blur-[100px] animate-pulse-slow" />
            </div>

            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="relative z-10 text-center px-4"
            >
                <h1 className="text-9xl font-bold font-orbitron text-transparent bg-clip-text bg-gradient-to-b from-red-500 to-red-900 mb-4 glitch-text" data-text="404">
                    404
                </h1>
                <h2 className="text-2xl md:text-3xl font-orbitron text-red-400 mb-8 tracking-widest">
                    SYSTEM ERROR: PAGE NOT FOUND
                </h2>
                <p className="text-gray-400 mb-10 max-w-md mx-auto font-mono">
                    The requested data packet could not be located in the neural network. It may have been deleted or moved to a secure sector.
                </p>

                <Link
                    href="/"
                    className="inline-flex items-center gap-2 px-8 py-4 bg-red-500/10 border border-red-500/50 text-red-400 font-orbitron tracking-wider hover:bg-red-500 hover:text-black transition-all duration-300 rounded-none group"
                >
                    <span className="group-hover:-translate-x-1 transition-transform">←</span> RETURN TO BASE
                </Link>
            </motion.div>
        </div>
    );
}
