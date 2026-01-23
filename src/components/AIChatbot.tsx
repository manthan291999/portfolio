"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, X, Send, Mic, Volume2, VolumeX, MicOff } from "lucide-react";
import { siteConfig } from "../data/siteConfig";
import VoiceControl from "./VoiceControl";
import SentientOrb from "./SentientOrb";
import VoiceCommandOverlay from "./VoiceCommandOverlay";

const INITIAL_MESSAGE = {
    role: "assistant",
    content: "Hello! I am Manthan's AI Assistant. Ask me about his skills, projects, or experience."
};

export default function AIChatbot() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([INITIAL_MESSAGE]);
    const [input, setInput] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const [soundEnabled, setSoundEnabled] = useState(true);
    const [isListening, setIsListening] = useState(false);
    const [orbState, setOrbState] = useState<"idle" | "listening" | "thinking" | "speaking">("idle");
    const [isVoiceOverlayOpen, setIsVoiceOverlayOpen] = useState(false);

    const messagesEndRef = useRef<HTMLDivElement>(null);
    const recognitionRef = useRef<any>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    useEffect(() => {
        if (typeof window !== "undefined" && "webkitSpeechRecognition" in window) {
            const SpeechRecognition = (window as any).webkitSpeechRecognition;
            recognitionRef.current = new SpeechRecognition();
            recognitionRef.current.continuous = false;
            recognitionRef.current.interimResults = false;
            recognitionRef.current.lang = "en-US";

            recognitionRef.current.onstart = () => {
                setOrbState("listening");
            };

            recognitionRef.current.onresult = (event: any) => {
                const transcript = event.results[0][0].transcript;
                setInput(transcript);
                handleSend(transcript);
            };

            recognitionRef.current.onend = () => {
                setIsListening(false);
                setOrbState("idle");
            };
        }
    }, []);

    const toggleListening = () => {
        if (isListening) {
            recognitionRef.current?.stop();
            setIsListening(false);
            setOrbState("idle");
        } else {
            recognitionRef.current?.start();
            setIsListening(true);
            setOrbState("listening");
        }
    };

    // Sync orb state for overlay when listening via button
    useEffect(() => {
        if (isVoiceOverlayOpen) {
            toggleListening();
        }
    }, [isVoiceOverlayOpen]);

    const speak = (text: string) => {
        if (!soundEnabled || typeof window === 'undefined') return;
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.pitch = 1;
        utterance.rate = 1;

        utterance.onstart = () => setOrbState("speaking");
        utterance.onend = () => setOrbState("idle");

        window.speechSynthesis.speak(utterance);
    };

    const [conversationState, setConversationState] = useState("idle");

    const generateResponse = (query: string) => {
        const lowerQuery = query.toLowerCase();

        // ── Resume Logic ─────────────────────────────────────────────────────────
        if (conversationState === "awaiting_resume_version") {
            if (lowerQuery.includes("uk") || lowerQuery.includes("united kingdom")) {
                setConversationState("idle");
                return "Here is the UK version of Manthan's Resume: /Manthan_Mittal_Resume_UK.pdf";
            }
            if (lowerQuery.includes("india")) {
                setConversationState("idle");
                return "Here is the India version of Manthan's Resume: /Manthan_Mittal_Resume_India.pdf";
            }
            return "Please specify which version you would like: United Kingdom or India?";
        }
        if (lowerQuery.includes("resume") || lowerQuery.includes("cv") || lowerQuery.includes("download") || lowerQuery.includes("profile")) {
            setConversationState("awaiting_resume_version");
            return "I have two versions of the resume available. Would you like the United Kingdom version or the India version?";
        }

        // ── General Logic ────────────────────────────────────────────────────────
        if (lowerQuery.includes("skill") || lowerQuery.includes("stack") || lowerQuery.includes("tech")) {
            return "Manthan's key tech stack includes Python, PyTorch, React, Node.js, MongoDB, AWS, and Oracle OCI.";
        }
        if (lowerQuery.includes("project") || lowerQuery.includes("work")) {
            return "Key projects include Narrative-to-Clip (Text-to-Video AI), DocInsight (RAG System), and Web Task Autopilot (Autonomous Agents).";
        }
        if (lowerQuery.includes("education") || lowerQuery.includes("study") || lowerQuery.includes("degree")) {
            return "Manthan holds an MSc in Artificial Intelligence from the University of Essex (UK) and a BE in Information Technology from Ahmedabad Institute of Technology (India).";
        }
        if (lowerQuery.includes("contact") || lowerQuery.includes("email") || lowerQuery.includes("hire")) {
            return "You can reach him at manthanmittal93@gmail.com.";
        }
        if (lowerQuery.includes("experience") || lowerQuery.includes("job")) {
            return "He is currently working as an AI & Data Analytics Intern at KM Steel.";
        }
        if (lowerQuery.includes("hello") || lowerQuery.includes("hi")) {
            return "Hello! I am Manthan's AI Assistant. Ask me about his skills, projects, or experience.";
        }
        return "I'm not sure about that. You can ask about my skills, projects, education, or ask to download my resume.";
    };

    const handleSend = async (text = input) => {
        if (!text.trim()) return;

        const userMessage = { role: "user", content: text };
        setMessages(prev => [...prev, userMessage]);
        setInput("");
        setIsTyping(true);
        setOrbState("thinking");

        setTimeout(() => {
            const responseText = generateResponse(userMessage.content);
            const aiMessage = { role: "assistant", content: responseText };
            setMessages(prev => [...prev, aiMessage]);
            setIsTyping(false);
            speak(responseText);
        }, 1500);
    };

    return (
        <>
            <VoiceCommandOverlay isOpen={isVoiceOverlayOpen} onClose={() => setIsVoiceOverlayOpen(false)} />

            <motion.button
                onClick={() => setIsOpen(true)}
                className={`fixed bottom-6 right-6 z-50 w-16 h-16 rounded-full bg-cyan/10 border border-cyan/50 shadow-[0_0_20px_rgba(0,243,255,0.3)] hover:scale-110 transition-transform ${isOpen ? 'hidden' : 'flex'} items-center justify-center overflow-hidden`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
            >
                <div className="absolute inset-0 pointer-events-none">
                    <SentientOrb state="idle" />
                </div>
            </motion.button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.9 }}
                        className="fixed bottom-6 right-6 z-50 w-[350px] h-[600px] bg-black/90 border border-cyan/30 rounded-2xl backdrop-blur-xl flex flex-col shadow-[0_0_50px_rgba(0,243,255,0.2)] overflow-hidden"
                    >
                        {/* Header with Sentient Orb */}
                        <div className="relative h-40 border-b border-cyan/20 bg-gradient-to-b from-cyan/10 to-transparent">
                            <div className="absolute top-2 right-2 z-20 flex gap-2">
                                <button
                                    onClick={() => setSoundEnabled(!soundEnabled)}
                                    className="p-1 hover:bg-white/10 rounded-full text-cyan/70 hover:text-cyan transition"
                                >
                                    {soundEnabled ? <Volume2 size={16} /> : <VolumeX size={16} />}
                                </button>
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="p-1 hover:bg-white/10 rounded-full text-cyan/70 hover:text-cyan transition"
                                >
                                    <X size={18} />
                                </button>
                            </div>

                            <div className="absolute inset-0 z-10">
                                <SentientOrb state={orbState} />
                            </div>

                            <div className="absolute bottom-2 left-0 w-full text-center z-20">
                                <span className="font-orbitron text-cyan/50 text-xs tracking-[0.2em]">{orbState.toUpperCase()}</span>
                            </div>
                        </div>

                        {/* Messages */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar bg-black/50">
                            {messages.map((msg, idx) => (
                                <div
                                    key={idx}
                                    className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                                >
                                    <div
                                        className={`max-w-[85%] p-3 rounded-2xl text-sm ${msg.role === "user"
                                            ? "bg-cyan/10 text-cyan border border-cyan/20 rounded-tr-none"
                                            : "bg-white/5 text-gray-300 border border-white/10 rounded-tl-none"
                                            }`}
                                    >
                                        {msg.content}
                                    </div>
                                </div>
                            ))}
                            {isTyping && (
                                <div className="flex justify-start">
                                    <div className="bg-white/5 p-3 rounded-2xl rounded-tl-none border border-white/10 flex gap-1">
                                        <span className="w-1.5 h-1.5 bg-cyan/50 rounded-full animate-bounce"></span>
                                        <span className="w-1.5 h-1.5 bg-cyan/50 rounded-full animate-bounce delay-100"></span>
                                        <span className="w-1.5 h-1.5 bg-cyan/50 rounded-full animate-bounce delay-200"></span>
                                    </div>
                                </div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input */}
                        <div className="p-4 border-t border-cyan/20 bg-black/80">
                            <div className="flex gap-2">
                                <button
                                    onClick={() => setIsVoiceOverlayOpen(true)}
                                    className={`p-3 rounded-xl transition border bg-white/5 text-gray-400 border-white/10 hover:text-cyan group relative overflow-hidden`}
                                    title="Voice Command Center"
                                >
                                    <div className="absolute inset-0 bg-cyan/10 translate-y-full group-hover:translate-y-0 transition-transform" />
                                    <Mic size={20} className="relative z-10" />
                                </button>
                                <input
                                    type="text"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    onKeyDown={(e) => e.key === "Enter" && handleSend()}
                                    placeholder={isListening ? "Listening..." : "Ask AI..."}
                                    className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-cyan/50 transition placeholder:text-gray-600 font-mono"
                                />
                                <button
                                    onClick={() => handleSend()}
                                    className="p-3 bg-cyan/10 text-cyan rounded-xl hover:bg-cyan hover:text-black transition border border-cyan/30"
                                >
                                    <Send size={20} />
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
