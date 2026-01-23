/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    darkMode: "class",
    theme: {
        extend: {
            colors: {
                cyan: {
                    DEFAULT: '#00f3ff',
                    dim: 'rgba(0, 243, 255, 0.1)',
                },
                purple: {
                    DEFAULT: '#bc13fe',
                    dim: 'rgba(188, 19, 254, 0.1)',
                },
                obsidian: {
                    DEFAULT: '#050505',
                    surface: '#0a0a0a',
                },
                glass: {
                    DEFAULT: 'rgba(255, 255, 255, 0.05)',
                    border: 'rgba(255, 255, 255, 0.1)',
                }
            },
            fontFamily: {
                orbitron: ['var(--font-orbitron)', 'sans-serif'],
                inter: ['var(--font-inter)', 'sans-serif'],
                mono: ['var(--font-jetbrains)', 'monospace'],
            },
            animation: {
                'spin-slow': 'spin 10s linear infinite',
                'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                'glitch': 'glitch 1s linear infinite',
                'glow-pulse': 'glow-pulse 4s ease-in-out infinite',
                'scanline': 'scanline 2s linear infinite',
            },
            keyframes: {
                glitch: {
                    '2%, 64%': { transform: 'translate(2px,0) skew(0deg)' },
                    '4%, 60%': { transform: 'translate(-2px,0) skew(0deg)' },
                    '62%': { transform: 'translate(0,0) skew(5deg)' },
                },
                'glow-pulse': {
                    '0%, 100%': { opacity: '0.8', filter: 'brightness(1)' },
                    '50%': { opacity: '1', filter: 'brightness(1.5)' },
                },
                scanline: {
                    '0%': { transform: 'translateY(-100%)' },
                    '100%': { transform: 'translateY(100%)' },
                },
            },
            backgroundImage: {
                'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
                'scanline': 'repeating-linear-gradient(to bottom, transparent, transparent 2px, rgba(0, 0, 0, 0.5) 2px, rgba(0, 0, 0, 0.5) 4px)',
            },
        },
    },
    plugins: [],
};
