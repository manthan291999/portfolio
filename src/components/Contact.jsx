"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { siteConfig } from "../data/siteConfig";
import { Mail, MapPin, Phone, Send, Terminal } from "lucide-react";

export default function Contact() {
    const [status, setStatus] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus("loading");

        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData);

        // Simulate API call
        setTimeout(() => {
            setStatus("success");
            e.target.reset();
        }, 1500);
    };

    return (
        <section id="contact" className="py-24 relative z-10">
            <div className="max-w-6xl mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="grid md:grid-cols-2 gap-12 items-start"
                >
                    {/* Contact Info */}
                    <div>
                        <h2 className="text-4xl md:text-5xl font-bold mb-8 font-orbitron">
                            <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan to-purple">
                                ESTABLISH UPLINK
                            </span>
                        </h2>
                        <p className="text-gray-400 mb-12 text-lg leading-relaxed font-light">
                            Initiate communication protocol. Open to collaboration on AI research and full-stack development.
                        </p>

                        <div className="space-y-8">
                            <div className="flex items-center gap-5 group">
                                <div className="p-4 bg-cyan/10 rounded-none border border-cyan/30 text-cyan group-hover:bg-cyan group-hover:text-black transition-all duration-300">
                                    <Mail size={24} />
                                </div>
                                <div>
                                    <p className="text-xs font-orbitron text-gray-500 mb-1 tracking-widest">EMAIL_ADDRESS</p>
                                    <a href={`mailto:${siteConfig.email}`} className="text-lg font-mono text-white hover:text-cyan transition">
                                        {siteConfig.email}
                                    </a>
                                </div>
                            </div>

                            <div className="flex items-center gap-5 group">
                                <div className="p-4 bg-purple/10 rounded-none border border-purple/30 text-purple group-hover:bg-purple group-hover:text-black transition-all duration-300">
                                    <Phone size={24} />
                                </div>
                                <div>
                                    <p className="text-xs font-orbitron text-gray-500 mb-1 tracking-widest">FREQUENCY</p>
                                    <p className="text-lg font-mono text-white">{siteConfig.phone}</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-5 group">
                                <div className="p-4 bg-gray-800 rounded-none border border-gray-700 text-gray-400 group-hover:bg-white group-hover:text-black transition-all duration-300">
                                    <MapPin size={24} />
                                </div>
                                <div>
                                    <p className="text-xs font-orbitron text-gray-500 mb-1 tracking-widest">COORDINATES</p>
                                    <p className="text-lg font-mono text-white">{siteConfig.location}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="bg-black/50 backdrop-blur-md p-8 border border-cyan/20 relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan to-purple" />
                        <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-cyan" />

                        <div className="flex items-center gap-2 mb-8 text-cyan/70 font-mono text-sm">
                            <Terminal size={16} />
                            <span>TRANSMISSION_CONSOLE</span>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label htmlFor="name" className="block text-xs font-orbitron text-cyan mb-2 tracking-widest">USER_ID</label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    required
                                    className="w-full px-4 py-3 bg-black border border-gray-800 focus:border-cyan text-white font-mono outline-none transition-colors placeholder:text-gray-700"
                                    placeholder="ENTER NAME"
                                />
                            </div>

                            <div>
                                <label htmlFor="email" className="block text-xs font-orbitron text-cyan mb-2 tracking-widest">CONTACT_POINT</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    required
                                    className="w-full px-4 py-3 bg-black border border-gray-800 focus:border-cyan text-white font-mono outline-none transition-colors placeholder:text-gray-700"
                                    placeholder="ENTER EMAIL"
                                />
                            </div>

                            <div>
                                <label htmlFor="message" className="block text-xs font-orbitron text-cyan mb-2 tracking-widest">DATA_PACKET</label>
                                <textarea
                                    id="message"
                                    name="message"
                                    required
                                    rows={4}
                                    className="w-full px-4 py-3 bg-black border border-gray-800 focus:border-cyan text-white font-mono outline-none transition-colors resize-none placeholder:text-gray-700"
                                    placeholder="ENTER MESSAGE CONTENT..."
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={status === "loading"}
                                className="w-full py-4 px-6 bg-cyan/10 border border-cyan text-cyan font-orbitron tracking-widest hover:bg-cyan hover:text-black transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed group"
                            >
                                {status === "loading" ? (
                                    "TRANSMITTING..."
                                ) : (
                                    <>
                                        SEND_TRANSMISSION <Send size={18} className="group-hover:translate-x-1 transition-transform" />
                                    </>
                                )}
                            </button>

                            {status === "success" && (
                                <p className="text-green-400 text-center text-sm font-mono border border-green-500/30 bg-green-500/10 p-3">
                                    &gt;&gt; TRANSMISSION RECEIVED SUCCESSFULLY
                                </p>
                            )}
                            {status === "error" && (
                                <p className="text-red-400 text-center text-sm font-mono border border-red-500/30 bg-red-500/10 p-3">
                                    &gt;&gt; ERROR: TRANSMISSION FAILED
                                </p>
                            )}
                        </form>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
