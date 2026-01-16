"use client";

import { useState, useEffect } from "react";
import { siteConfig } from "../data/siteConfig";
import Logo from "./Logo";
import Link from "next/link";
import { Menu, X } from "lucide-react";

export default function Navbar() {
    const [open, setOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const links = [
        { name: "HOME", href: "#" },
        { name: "ABOUT", href: "#about" },
        { name: "SKILLS", href: "#skills" },
        { name: "EXPERIENCE", href: "#experience" },
        { name: "PROJECTS", href: "#projects" },
    ];

    return (
        <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-black/80 backdrop-blur-md border-b border-cyan/20 py-2" : "bg-transparent py-4"}`}>
            <nav className="max-w-7xl mx-auto flex items-center justify-between px-6">
                <Link href="/" className="flex items-center gap-3 text-2xl font-bold font-orbitron text-white tracking-widest group">
                    <Logo className="w-10 h-10 group-hover:rotate-180 transition-transform duration-700" />
                    <span>{siteConfig.name.split(" ")[0]}<span className="text-cyan">.AI</span></span>
                </Link>

                {/* Desktop */}
                <div className="hidden md:flex items-center gap-8">
                    <ul className="flex space-x-8 items-center">
                        {links.map((l) => (
                            <li key={l.name}>
                                <Link href={l.href} className="relative text-sm font-orbitron text-gray-400 hover:text-cyan transition-colors tracking-wider group">
                                    {l.name}
                                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-cyan transition-all group-hover:w-full"></span>
                                </Link>
                            </li>
                        ))}
                    </ul>
                    <Link
                        href="#contact"
                        className="px-6 py-2 bg-cyan/10 border border-cyan/50 text-cyan font-orbitron text-sm tracking-widest hover:bg-cyan hover:text-black transition-all duration-300 rounded-sm"
                    >
                        HIRE ME
                    </Link>
                </div>

                {/* Mobile */}
                <div className="flex items-center md:hidden">
                    <button
                        className="p-2 text-cyan"
                        onClick={() => setOpen(!open)}
                        aria-label="Menu"
                    >
                        {open ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>

                {open && (
                    <div className="absolute top-full left-0 w-full bg-black/95 backdrop-blur-xl border-b border-cyan/20 md:hidden">
                        <ul className="flex flex-col p-4">
                            {links.map((l) => (
                                <li key={l.name} className="border-b border-gray-800 last:border-0">
                                    <Link
                                        href={l.href}
                                        className="block px-4 py-4 font-orbitron text-gray-300 hover:text-cyan hover:bg-white/5 transition tracking-widest"
                                        onClick={() => setOpen(false)}
                                    >
                                        {l.name}
                                    </Link>
                                </li>
                            ))}
                            <li className="pt-4">
                                <Link
                                    href="#contact"
                                    className="block w-full text-center px-4 py-3 bg-cyan/10 border border-cyan/50 text-cyan font-orbitron text-sm tracking-widest hover:bg-cyan hover:text-black transition-all duration-300"
                                    onClick={() => setOpen(false)}
                                >
                                    HIRE ME
                                </Link>
                            </li>
                        </ul>
                    </div>
                )}
            </nav>
        </header>
    );
}
