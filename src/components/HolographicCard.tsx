import { ReactNode } from "react";
import { cn } from "@/lib/utils"; // Assuming cn utility exists, if not I will just use template literals or install clsx/tailwind-merge

interface HolographicCardProps {
    children: ReactNode;
    className?: string;
}

export default function HolographicCard({ children, className }: HolographicCardProps) {
    return (
        <div className={`relative group p-1 ${className}`}>
            {/* Holographic Border Gradient */}
            <div className="absolute inset-0 bg-gradient-to-r from-cyan/30 via-purple/30 to-cyan/30 opacity-20 group-hover:opacity-100 transition-opacity duration-500 rounded-xl blur-sm" />

            {/* Main Glass Container */}
            <div className="relative h-full w-full bg-glass backdrop-blur-xl border border-glass-border rounded-xl p-6 overflow-hidden">

                {/* Corner Accents (HUD Style) */}
                <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-cyan/50 rounded-tl-xl" />
                <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-purple/50 rounded-tr-xl" />
                <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-purple/50 rounded-bl-xl" />
                <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-cyan/50 rounded-br-xl" />

                {/* Scanline Effect */}
                <div className="absolute inset-0 bg-scanline opacity-5 pointer-events-none" />

                {/* Content */}
                <div className="relative z-10">
                    {children}
                </div>
            </div>
        </div>
    );
}
