"use client";

import { motion } from "framer-motion";
import { siteConfig } from "../data/siteConfig";

export default function About() {
    return (
        <section id="about" className="py-24 bg-darkBg relative overflow-hidden">
            <div className="max-w-4xl mx-auto px-4 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                >
                    <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-500">
                        About Me
                    </h2>
                    <div className="prose prose-lg dark:prose-invert mx-auto text-gray-400 leading-relaxed">
                        {siteConfig.about.map((paragraph, index) => (
                            <p key={index} className="mb-6 last:mb-0">
                                {paragraph}
                            </p>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
