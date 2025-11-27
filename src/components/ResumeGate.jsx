"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Download, User, Mail, FileText } from "lucide-react";
import { siteConfig } from "../data/siteConfig";

export default function ResumeGate({ isOpen, onClose }) {
    const [formData, setFormData] = useState({ name: "", contact: "" });
    const [loading, setLoading] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);

        // Simulate API call / Data collection
        setTimeout(() => {
            setLoading(false);

            // Trigger download
            const link = document.createElement("a");
            link.href = siteConfig.resumeUrl;
            link.download = "Manthan_Mittal_Resume.pdf";
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            onClose();
        }, 1500);
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                    />

                    {/* Modal */}
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.9, opacity: 0 }}
                        className="relative w-full max-w-md bg-black border border-cyan/30 p-8 shadow-[0_0_50px_rgba(0,243,255,0.15)] overflow-hidden"
                    >
                        {/* Decorative Elements */}
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan to-purple" />
                        <div className="absolute top-0 right-0 w-16 h-16 border-t-2 border-r-2 border-cyan/50 rounded-tr-3xl" />
                        <div className="absolute bottom-0 left-0 w-16 h-16 border-b-2 border-l-2 border-purple/50 rounded-bl-3xl" />

                        <button
                            onClick={onClose}
                            className="absolute top-4 right-4 text-gray-500 hover:text-cyan transition-colors"
                        >
                            <X size={24} />
                        </button>

                        <div className="text-center mb-8">
                            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-cyan/10 text-cyan mb-4 border border-cyan/30">
                                <FileText size={32} />
                            </div>
                            <h3 className="text-2xl font-bold font-orbitron text-white mb-2 tracking-wide">
                                ACCESS REQUEST
                            </h3>
                            <p className="text-gray-400 text-sm font-mono">
                                IDENTIFICATION REQUIRED FOR DATA DOWNLOAD
                            </p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="space-y-2">
                                <label className="text-xs font-orbitron text-cyan tracking-widest">FULL_NAME</label>
                                <div className="relative">
                                    <User className="absolute left-4 top-3.5 text-gray-500" size={18} />
                                    <input
                                        type="text"
                                        required
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        className="w-full bg-gray-900/50 border border-gray-800 text-white pl-12 pr-4 py-3 focus:border-cyan focus:ring-1 focus:ring-cyan outline-none transition-all font-mono placeholder:text-gray-700"
                                        placeholder="ENTER NAME"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-orbitron text-purple tracking-widest">CONTACT_INFO</label>
                                <div className="relative">
                                    <Mail className="absolute left-4 top-3.5 text-gray-500" size={18} />
                                    <input
                                        type="text"
                                        required
                                        value={formData.contact}
                                        onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                                        className="w-full bg-gray-900/50 border border-gray-800 text-white pl-12 pr-4 py-3 focus:border-purple focus:ring-1 focus:ring-purple outline-none transition-all font-mono placeholder:text-gray-700"
                                        placeholder="EMAIL OR PHONE"
                                    />
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-cyan/10 border border-cyan text-cyan font-orbitron py-4 tracking-widest hover:bg-cyan hover:text-black transition-all duration-300 flex items-center justify-center gap-2 group disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {loading ? (
                                    "AUTHENTICATING..."
                                ) : (
                                    <>
                                        INITIATE DOWNLOAD <Download size={18} className="group-hover:translate-y-1 transition-transform" />
                                    </>
                                )}
                            </button>
                        </form>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
