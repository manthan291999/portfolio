"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, X, Send, Mic, Volume2, VolumeX, MicOff } from "lucide-react";
import { siteConfig } from "../data/siteConfig";
import VoiceControl from "./VoiceControl";

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
    const messagesEndRef = useRef(null);
    const recognitionRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    useEffect(() => {
        if (typeof window !== "undefined" && "webkitSpeechRecognition" in window) {
            const SpeechRecognition = window.webkitSpeechRecognition;
            recognitionRef.current = new SpeechRecognition();
            recognitionRef.current.continuous = false;
            recognitionRef.current.interimResults = false;
            recognitionRef.current.lang = "en-US";

            recognitionRef.current.onresult = (event) => {
                const transcript = event.results[0][0].transcript;
                setInput(transcript);
                handleSend(transcript);
            };

            recognitionRef.current.onend = () => {
                setIsListening(false);
            };
        }
    }, []);

    const toggleListening = () => {
        if (isListening) {
            recognitionRef.current?.stop();
            setIsListening(false);
        } else {
            recognitionRef.current?.start();
            setIsListening(true);
        }
    };

    const speak = (text) => {
        if (!soundEnabled || typeof window === 'undefined') return;
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.pitch = 1;
        utterance.rate = 1;
        window.speechSynthesis.speak(utterance);
    };

    const generateResponse = (query) => {
        const lowerQuery = query.toLowerCase();

        if (lowerQuery.includes("skill") || lowerQuery.includes("stack") || lowerQuery.includes("tech")) {
            return `Manthan is proficient in ${siteConfig.skills.languages.join(", ")}, and frameworks like ${siteConfig.skills.frameworks.join(", ")}.`;
        }
        if (lowerQuery.includes("project") || lowerQuery.includes("work")) {
            return `He has worked on projects like ${siteConfig.projects.map(p => p.title).join(", ")}. Check out the Projects section for more details.`;
        }
        if (lowerQuery.includes("contact") || lowerQuery.includes("email") || lowerQuery.includes("hire")) {
            return `You can reach him at ${siteConfig.email} or connect on LinkedIn.`;
        }
        if (lowerQuery.includes("experience") || lowerQuery.includes("job")) {
            return "He has experience as an AI Research Intern at DeepVision Labs and as a Full-Stack Engineer at Roxigym.";
        }
        if (lowerQuery.includes("hello") || lowerQuery.includes("hi")) {
            return "Hello! How can I assist you today?";
        }

        return "I'm not sure about that, but you can download his resume for more detailed information.";
    };

    const handleSend = async (text = input) => {
        if (!text.trim()) return;

        const userMessage = { role: "user", content: text };
        setMessages(prev => [...prev, userMessage]);
        setInput("");
        setIsTyping(true);

        // Simulate AI delay
        setTimeout(() => {
            const responseText = generateResponse(userMessage.content);
            const aiMessage = { role: "assistant", content: responseText };
            setMessages(prev => [...prev, aiMessage]);
            setIsTyping(false);
            speak(responseText);
        }, 1000);
    };

    return (
        <>
            <motion.button
                onClick={() => setIsOpen(true)}
                className={`fixed bottom-6 right-6 z-50 p-4 rounded-full bg-cyan text-black shadow-[0_0_20px_rgba(0,243,255,0.5)] hover:scale-110 transition-transform ${isOpen ? 'hidden' : 'flex'}`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
            >
                <MessageSquare size={24} />
            </motion.button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.9 }}
                        className="fixed bottom-6 right-6 z-50 w-[350px] h-[500px] bg-black/90 border border-cyan/30 rounded-2xl backdrop-blur-xl flex flex-col shadow-[0_0_50px_rgba(0,243,255,0.2)] overflow-hidden"
                    >
                        {/* Header */}
                        <div className="p-4 border-b border-cyan/20 flex justify-between items-center bg-cyan/5">
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full bg-cyan animate-pulse"></div>
                                <span className="font-orbitron text-cyan text-sm tracking-wider">AI ASSISTANT</span>
                            </div>
                            <div className="flex items-center gap-2">
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
                        </div>

                        {/* Messages */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
                            {messages.map((msg, idx) => (
                                <div
                                    key={idx}
                                    className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                                >
                                    <div
                                        className={`max-w-[80%] p-3 rounded-2xl text-sm ${msg.role === "user"
                                            ? "bg-cyan/20 text-cyan border border-cyan/30 rounded-tr-none"
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

                        {/* Voice Visualizer */}
                        <div className="h-8 flex items-center justify-center bg-black/50">
                            <VoiceControl isListening={isListening} />
                        </div>

                        {/* Input */}
                        <div className="p-4 border-t border-cyan/20 bg-black/50">
                            <div className="flex gap-2">
                                <button
                                    onClick={toggleListening}
                                    className={`p-2 rounded-lg transition border ${isListening ? "bg-red-500/20 text-red-500 border-red-500/50" : "bg-white/5 text-gray-400 border-white/10 hover:text-cyan"}`}
                                >
                                    {isListening ? <MicOff size={18} /> : <Mic size={18} />}
                                </button>
                                <input
                                    type="text"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    onKeyDown={(e) => e.key === "Enter" && handleSend()}
                                    placeholder={isListening ? "Listening..." : "Ask about Manthan..."}
                                    className="flex-1 bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-cyan/50 transition placeholder:text-gray-600"
                                />
                                <button
                                    onClick={() => handleSend()}
                                    className="p-2 bg-cyan/20 text-cyan rounded-lg hover:bg-cyan hover:text-black transition border border-cyan/30"
                                >
                                    <Send size={18} />
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
