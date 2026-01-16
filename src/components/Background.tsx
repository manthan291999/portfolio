"use client";

export default function Background() {
    return (
        <div className="fixed inset-0 -z-50 h-full w-full bg-slate-950">
            {/* Radial Gradient for depth */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_500px_at_50%_200px,#3e3e3e,transparent)]"></div>

            {/* Grid Pattern - made more visible */}
            <div className="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>

            {/* Colorful Orbs/Glows */}
            <div className="absolute top-[-10%] left-[-20%] w-[600px] h-[600px] rounded-full bg-primary/20 blur-[100px] opacity-40 animate-pulse-slow"></div>
            <div className="absolute bottom-[-10%] right-[-20%] w-[600px] h-[600px] rounded-full bg-purple-500/20 blur-[100px] opacity-40 animate-pulse-slow delay-700"></div>

            {/* Floating Particles */}
            <div className="absolute top-[20%] right-[20%] w-2 h-2 bg-blue-400 rounded-full blur-[1px] animate-ping duration-[3s]"></div>
            <div className="absolute top-[60%] left-[10%] w-1 h-1 bg-purple-400 rounded-full blur-[1px] animate-ping duration-[5s]"></div>
        </div>
    );
}
