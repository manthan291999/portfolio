"use client";

export default function Logo({ className = "w-10 h-10" }) {
    return (
        <svg
            viewBox="0 0 100 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
        >
            <path
                d="M50 5L93.3013 25V75L50 95L6.69873 75V25L50 5Z"
                stroke="url(#paint0_linear)"
                strokeWidth="4"
                className="animate-pulse-slow"
            />
            <path
                d="M50 20L75.9808 35V65L50 80L24.0192 65V35L50 20Z"
                stroke="url(#paint1_linear)"
                strokeWidth="2"
                className="animate-spin-slow origin-center"
            />
            <circle cx="50" cy="50" r="8" fill="#00f3ff" className="animate-pulse" />
            <defs>
                <linearGradient id="paint0_linear" x1="50" y1="5" x2="50" y2="95" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#00F3FF" />
                    <stop offset="1" stopColor="#BC13FE" />
                </linearGradient>
                <linearGradient id="paint1_linear" x1="50" y1="20" x2="50" y2="80" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#BC13FE" />
                    <stop offset="1" stopColor="#00F3FF" />
                </linearGradient>
            </defs>
        </svg>
    );
}
