import type { Metadata } from "next";
import { Inter, Orbitron, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { siteConfig } from "../data/siteConfig";
import Navbar from "../components/Navbar";
import ThreeBackground from "../components/ThreeBackground";
import Cursor from "../components/Cursor";
import AIChatbot from "../components/AIChatbot";
import NeuralTerminal from "../components/NeuralTerminal";

import { SpeedInsights } from "@vercel/speed-insights/next";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const orbitron = Orbitron({ subsets: ["latin"], variable: "--font-orbitron" });
const jetbrainsMono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jetbrains" });

export const metadata: Metadata = {
    title: `${siteConfig.name} – AI Engineer Portfolio`,
    description: siteConfig.tagline,
    openGraph: {
        title: siteConfig.name,
        description: siteConfig.tagline,
        images: [{ url: "/og-image.png", width: 1200, height: 630 }],
        locale: "en_US",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: siteConfig.name,
        description: siteConfig.tagline,
        images: ["/og-image.png"],
    },
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" className="scroll-smooth dark" suppressHydrationWarning>
            <body suppressHydrationWarning className={`${inter.variable} ${orbitron.variable} ${jetbrainsMono.variable} bg-obsidian text-white antialiased selection:bg-cyan/30 selection:text-cyan relative overflow-x-hidden`}>
                <ThreeBackground />
                <Cursor />
                <Navbar />
                <AIChatbot />
                <NeuralTerminal />
                <main className="relative z-10">
                    {children}
                    <SpeedInsights />
                </main>
            </body>
        </html>
    );
}
