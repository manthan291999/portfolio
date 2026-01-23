import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface TerminalWindowProps {
    children: ReactNode;
    title?: string;
    className?: string;
    showControls?: boolean;
}

export default function TerminalWindow({
    children,
    title = "terminal@user:~",
    className,
    showControls = true
}: TerminalWindowProps) {
    return (
        <div className={cn("relative overflow-hidden rounded-lg bg-black/80 backdrop-blur-md border border-white/10 font-mono text-sm shadow-2xl", className)}>
            {/* Header / Title Bar */}
            <div className="flex items-center px-4 py-2 bg-white/5 border-b border-white/5">
                {/* Traffic Lights */}
                {showControls && (
                    <div className="flex space-x-2 mr-4">
                        <div className="w-3 h-3 rounded-full bg-red-500/80" />
                        <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                        <div className="w-3 h-3 rounded-full bg-green-500/80" />
                    </div>
                )}

                {/* Title */}
                <div className="flex-1 text-center text-xs text-white/50 select-none">
                    {title}
                </div>
            </div>

            {/* Content Area */}
            <div className="p-4 text-gray-300 font-mono">
                {children}
            </div>
        </div>
    );
}
