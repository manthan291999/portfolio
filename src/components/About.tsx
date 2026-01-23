"use client";

import { motion } from "framer-motion";
import { siteConfig } from "../data/siteConfig";
import HolographicCard from "./HolographicCard";



export default function About() {
    return (
        <section id="about" className="py-24 relative overflow-hidden">
            {/* Decorative Background Elements */}
            <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-radial from-purple/10 to-transparent opacity-30 pointer-events-none" />

            <div className="max-w-5xl mx-auto px-4 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                >
                    <div className="flex items-center gap-4 mb-12 justify-center">
                        <div className="h-[1px] w-12 bg-cyan/50" />
                        <h2 className="text-3xl md:text-4xl font-bold text-center font-orbitron tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-cyan to-purple">
                            IDENTITY_VERIFICATION
                        </h2>
                        <div className="h-[1px] w-12 bg-purple/50" />
                    </div>

                    <HolographicCard className="backdrop-blur-md">
                        <div className="grid md:grid-cols-[1fr,2fr] gap-8">
                            {/* Left Column: Image & Stats */}
                            <div className="flex flex-col">
                                {/* Profile Image */}
                                <div className="relative aspect-square rounded-lg overflow-hidden border border-white/10 bg-black/50 group">
                                    <img
                                        src="/images/profile.jpg"
                                        alt="Manthan Mittal"
                                        className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500 grayscale group-hover:grayscale-0"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-br from-cyan/20 to-purple/20 opacity-20 group-hover:opacity-0 transition-opacity duration-500 pointer-events-none" />

                                    {/* Scanline on image */}
                                    <div className="absolute inset-0 bg-scanline opacity-20 pointer-events-none" />

                                    {/* Corner Accents */}
                                    <div className="absolute top-0 left-0 w-2 h-2 border-l-2 border-t-2 border-cyan/50" />
                                    <div className="absolute top-0 right-0 w-2 h-2 border-r-2 border-t-2 border-cyan/50" />
                                    <div className="absolute bottom-0 left-0 w-2 h-2 border-l-2 border-b-2 border-cyan/50" />
                                    <div className="absolute bottom-0 right-0 w-2 h-2 border-r-2 border-b-2 border-cyan/50" />
                                </div>


                            </div>

                            {/* Right Column: Bio Text */}
                            <div className="prose prose-lg dark:prose-invert mx-auto text-gray-300 leading-relaxed font-light">
                                <div className="font-mono text-xs text-cyan mb-4">
                                    {">"} IDENTITY_VERIFIED // ACCESS_GRANTED
                                </div>
                                {siteConfig.about.map((paragraph, index) => (
                                    <p key={index} className="mb-6 last:mb-0">
                                        {paragraph}
                                    </p>
                                ))}
                            </div>

                        </div>

                    </HolographicCard>
                </motion.div>
            </div>
        </section >
    );
}
