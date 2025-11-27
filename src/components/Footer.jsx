import { siteConfig } from "../data/siteConfig";
import { Github, Linkedin, Twitter } from "lucide-react";

export default function Footer() {
    const iconMap = {
        github: Github,
        linkedin: Linkedin,
        twitter: Twitter,
    };

    return (
        <footer className="bg-black py-12 border-t border-cyan/20 relative z-10">
            <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
                <div className="mb-4 md:mb-0 text-center md:text-left">
                    <h2 className="text-xl font-bold font-orbitron text-white mb-2 tracking-widest">{siteConfig.name.toUpperCase()}</h2>
                    <p className="text-gray-500 text-sm font-mono">
                        SYSTEM_STATUS: ONLINE | © {new Date().getFullYear()}
                    </p>
                </div>

                <div className="flex space-x-6">
                    {siteConfig.socials.map((s) => {
                        const Icon = iconMap[s.icon.toLowerCase()] || Github;
                        return (
                            <a
                                key={s.name}
                                href={s.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-gray-500 hover:text-cyan transition transform hover:scale-110 hover:shadow-[0_0_15px_rgba(0,243,255,0.5)] rounded-full p-1"
                                aria-label={s.name}
                            >
                                <Icon size={24} />
                            </a>
                        );
                    })}
                </div>
            </div>
        </footer>
    );
}
