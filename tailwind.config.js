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
                    dim: '#00f3ff80',
                },
                purple: {
                    DEFAULT: '#bc13fe',
                    dim: '#bc13fe80',
                },
                black: {
                    DEFAULT: '#050505',
                    surface: '#0a0a0a',
                },
            },
            fontFamily: {
                orbitron: ['var(--font-orbitron)', 'sans-serif'],
                inter: ['var(--font-inter)', 'sans-serif'],
            },
            animation: {
                'spin-slow': 'spin 10s linear infinite',
                'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                'glitch': 'glitch 1s linear infinite',
            },
            keyframes: {
                glitch: {
                    '2%, 64%': { transform: 'translate(2px,0) skew(0deg)' },
                    '4%, 60%': { transform: 'translate(-2px,0) skew(0deg)' },
                    '62%': { transform: 'translate(0,0) skew(5deg)' },
                },
            },
        },
    },
    plugins: [],
};
