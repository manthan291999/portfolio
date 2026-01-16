"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import Hero from "../components/Hero";
import About from "../components/About";
import Skills from "../components/Skills";
import Experience from "../components/Experience";
import Projects from "../components/Projects";
import Contact from "../components/Contact";
import Footer from "../components/Footer";
import LoadingScreen from "../components/LoadingScreen";

// Dynamically import Welcome Page (heavy 3D component)
const WelcomePage = dynamic(
    () => import("../components/WelcomePage"),
    {
        ssr: false,
        loading: () => <LoadingScreen />
    }
);

export default function HomeClient() {
    const [showWelcome, setShowWelcome] = useState(true);
    const [mounted, setMounted] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setMounted(true);
        // Check if user has visited before - skip welcome page if they have
        const hasVisited = localStorage.getItem('hasVisitedBefore');
        if (hasVisited) {
            setShowWelcome(false);
        }
    }, []);

    const handleEnter = () => {
        setShowWelcome(false);
        // Remember that user has visited
        localStorage.setItem('hasVisitedBefore', 'true');
    };

    const handleLoadComplete = () => {
        setIsLoading(false);
    };

    // Show loading screen while mounting
    if (!mounted || isLoading) {
        return <LoadingScreen onLoadComplete={handleLoadComplete} minDuration={2500} />;
    }

    return (
        <>
            {/* Welcome Page */}
            {showWelcome && <WelcomePage onEnter={handleEnter} />}

            {/* Main Content */}
            <main className={showWelcome ? "opacity-0" : "opacity-100 transition-opacity duration-1000"}>
                <Hero />
                <About />
                <Skills />
                <Experience />
                <Projects />
                <Contact />
                <Footer />
            </main>
        </>
    );
}
