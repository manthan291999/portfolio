"use client";

import { useEffect } from "react";

export default function Cursor() {
    useEffect(() => {
        const cursorDot = document.querySelector(".cursor-dot") as HTMLElement | null;
        const cursorOutline = document.querySelector(".cursor-outline") as HTMLElement | null;

        const moveCursor = (e: MouseEvent) => {
            const posX = e.clientX;
            const posY = e.clientY;

            if (cursorDot) {
                cursorDot.style.left = `${posX}px`;
                cursorDot.style.top = `${posY}px`;
            }

            if (cursorOutline) {
                cursorOutline.animate(
                    {
                        left: `${posX}px`,
                        top: `${posY}px`,
                    },
                    { duration: 500, fill: "forwards" }
                );
            }
        };

        window.addEventListener("mousemove", moveCursor);
        return () => window.removeEventListener("mousemove", moveCursor);
    }, []);

    return (
        <>
            <div className="cursor-dot hidden md:block"></div>
            <div className="cursor-outline hidden md:block"></div>
        </>
    );
}
