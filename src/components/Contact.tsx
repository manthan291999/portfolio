"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import { siteConfig } from "../data/siteConfig";
import { Mail, MapPin, Phone, Send, Terminal, Globe, Linkedin, Github } from "lucide-react";

// Dynamically import 3D component
const DigitalEarth = dynamic(
    () => import("./canvas/DigitalEarth"),
    {
        ssr: false,
        loading: () => (
            <div className="w-full h-[350px] md:h-[450px] flex items-center justify-center">
                <div className="w-12 h-12 border-2 border-cyan/30 rounded-full animate-spin" />
            </div>
        )
    }
);

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
        <section id="contact" className="py-24 relative z-10 overflow-hidden">
            {/* Background Effects */}
            <div className="absolute inset-0 z-0">
                <div className="absolute bottom-0 left-1/4 w-[600px] h-[600px] bg-cyan/5 rounded-full blur-[200px]" />
                <div className="absolute top-1/4 right-0 w-[400px] h-[400px] bg-purple/5 rounded-full blur-[150px]" />
            </div>

            <div className="max-w-7xl mx-auto px-4 relative z-10">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-cyan/20 mb-6">
                        <Globe className="w-4 h-4 text-cyan" />
                        <span className="text-sm font-mono text-gray-400">GLOBAL_REACH</span>
                    </div>

                    <h2 className="text-4xl md:text-5xl font-bold font-orbitron mb-4">
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan to-purple">
                            ESTABLISH UPLINK
                        </span>
                    </h2>
                    <p className="text-gray-400 max-w-2xl mx-auto">
                        Initiate communication protocol. Open to collaboration on AI research and full-stack development.
                    </p>
                </motion.div>

                {/* Main Content Grid */}
                <div className="grid lg:grid-cols-2 gap-12 items-start">
                    {/* Left Column - Earth + Contact Info */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        {/* 3D Earth */}
                        <div className="relative mb-8">
                            <DigitalEarth />
                        </div>

                        {/* Contact Info Cards */}
                        <div className="grid sm:grid-cols-2 gap-4">
                            <motion.a
                                href={`mailto:${siteConfig.email}`}
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.1 }}
                                className="group p-4 bg-black/40 backdrop-blur-md border border-cyan/20 hover:border-cyan/60 transition-all duration-300"
                            >
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-cyan/10 text-cyan group-hover:bg-cyan group-hover:text-black transition-all">
                                        <Mail size={18} />
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-mono text-gray-500 tracking-widest">EMAIL</p>
                                        <p className="text-sm text-white truncate">{siteConfig.email}</p>
                                    </div>
                                </div>
                            </motion.a>

                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.2 }}
                                className="group p-4 bg-black/40 backdrop-blur-md border border-purple/20 hover:border-purple/60 transition-all duration-300"
                            >
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-purple/10 text-purple group-hover:bg-purple group-hover:text-black transition-all">
                                        <Phone size={18} />
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-mono text-gray-500 tracking-widest">PHONE</p>
                                        <p className="text-sm text-white">{siteConfig.phone}</p>
                                    </div>
                                </div>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.3 }}
                                className="group p-4 bg-black/40 backdrop-blur-md border border-gray-800 hover:border-white/40 transition-all duration-300"
                            >
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-gray-800 text-gray-400 group-hover:bg-white group-hover:text-black transition-all">
                                        <MapPin size={18} />
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-mono text-gray-500 tracking-widest">LOCATION</p>
                                        <p className="text-sm text-white">{siteConfig.location}</p>
                                    </div>
                                </div>
                            </motion.div>

                            {/* Social Links */}
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.4 }}
                                className="p-4 bg-black/40 backdrop-blur-md border border-gray-800 flex items-center justify-center gap-4"
                            >
                                {siteConfig.socials.map((social) => (
                                    <a
                                        key={social.name}
                                        href={social.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="p-2 text-gray-500 hover:text-cyan hover:bg-cyan/10 transition-all"
                                    >
                                        {social.icon === "linkedin" && <Linkedin size={20} />}
                                        {social.icon === "github" && <Github size={20} />}
                                        {social.icon === "twitter" && <Globe size={20} />}
                                    </a>
                                ))}
                            </motion.div>
                        </div>
                    </motion.div>

                    {/* Right Column - Contact Form */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="relative"
                    >
                        <div className="bg-gradient-to-br from-black/80 to-black/40 backdrop-blur-md p-8 border border-cyan/20 relative overflow-hidden">
                            {/* Top Accent Line */}
                            <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-cyan via-purple to-cyan" />

                            {/* Corner Decorations */}
                            <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-cyan/50" />
                            <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-purple/50" />

                            {/* Form Header */}
                            <div className="flex items-center gap-2 mb-8 text-cyan/70 font-mono text-sm">
                                <Terminal size={16} />
                                <span className="tracking-widest">TRANSMISSION_CONSOLE</span>
                                <div className="flex-1 h-[1px] bg-gradient-to-r from-cyan/30 to-transparent ml-4" />
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div>
                                    <label htmlFor="name" className="block text-xs font-orbitron text-cyan mb-2 tracking-widest">
                                        USER_ID
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        required
                                        className="w-full px-4 py-3 bg-black/50 border border-gray-800 focus:border-cyan text-white font-mono outline-none transition-colors placeholder:text-gray-700"
                                        placeholder="ENTER NAME"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="email" className="block text-xs font-orbitron text-cyan mb-2 tracking-widest">
                                        CONTACT_POINT
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        required
                                        className="w-full px-4 py-3 bg-black/50 border border-gray-800 focus:border-cyan text-white font-mono outline-none transition-colors placeholder:text-gray-700"
                                        placeholder="ENTER EMAIL"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="subject" className="block text-xs font-orbitron text-purple mb-2 tracking-widest">
                                        SUBJECT_LINE
                                    </label>
                                    <input
                                        type="text"
                                        id="subject"
                                        name="subject"
                                        className="w-full px-4 py-3 bg-black/50 border border-gray-800 focus:border-purple text-white font-mono outline-none transition-colors placeholder:text-gray-700"
                                        placeholder="ENTER SUBJECT"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="message" className="block text-xs font-orbitron text-cyan mb-2 tracking-widest">
                                        DATA_PACKET
                                    </label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        required
                                        rows={5}
                                        className="w-full px-4 py-3 bg-black/50 border border-gray-800 focus:border-cyan text-white font-mono outline-none transition-colors resize-none placeholder:text-gray-700"
                                        placeholder="ENTER MESSAGE CONTENT..."
                                    />
                                </div>

                                <button
                                    type="submit"
                                    disabled={status === "loading"}
                                    className="w-full py-4 px-6 bg-gradient-to-r from-cyan/20 to-purple/20 border border-cyan text-cyan font-orbitron tracking-widest hover:from-cyan hover:to-purple hover:text-black transition-all duration-500 flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed group"
                                >
                                    {status === "loading" ? (
                                        <>
                                            <div className="w-5 h-5 border-2 border-cyan/30 border-t-cyan rounded-full animate-spin" />
                                            TRANSMITTING...
                                        </>
                                    ) : (
                                        <>
                                            SEND_TRANSMISSION
                                            <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                        </>
                                    )}
                                </button>

                                {status === "success" && (
                                    <motion.p
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="text-green-400 text-center text-sm font-mono border border-green-500/30 bg-green-500/10 p-4"
                                    >
                                        &gt;&gt; TRANSMISSION RECEIVED SUCCESSFULLY
                                    </motion.p>
                                )}
                                {status === "error" && (
                                    <motion.p
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="text-red-400 text-center text-sm font-mono border border-red-500/30 bg-red-500/10 p-4"
                                    >
                                        &gt;&gt; ERROR: TRANSMISSION FAILED
                                    </motion.p>
                                )}
                            </form>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
