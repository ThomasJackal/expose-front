import React from "react";
import { useEffect, useState } from "react";

export default function MovingTitle(props) {

    const fonts = [
        "Montserrat Underline",
        "Bytesized",
        "Roboto Mono",
        "Playfair Display",
        "DM Serif Display",
        "Satisfy",
        "Single Day",
        "DM Serif Text",
        "Monsieur La Doulaise",
        "Funnel Sans",
        "Barriecito",
        "Delius",
        "Limelight",
        "UnifrakturCook",
        "Alfa Slab One",
        "Geo",
        "Fleur De Leah",
        "Condiment",
        "Shadows Into Light",
        "Rubik Glitch",
        "Arial",
        "Georgia",
        "Courier New",
        "Times New Roman",
        "Verdana",
        "Trebuchet MS"
    ];
    const [currentFont, setCurrentFont] = useState(fonts[0]);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentFont(prevFont => {
                const currentIndex = fonts.indexOf(prevFont);
                return fonts[(currentIndex + 1) % fonts.length];
            });
        }, 300);

        return () => clearInterval(interval);
    }, []);

    return (
        <span
            style={{
                fontFamily: currentFont,
                transition: "font-family",
                minHeight: "60px",
                lineHeight: "60px",
                display: "flex"
            }}>
            {props.children}
        </span>
    );
}
