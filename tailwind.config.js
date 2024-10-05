/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                lightBlack: "#000000a6",
                mutedPurple: "#1c1a4f",
                mutedBlue: "#2a2958",
                neonGreen: "#1DB954",
                electricBlue: "#3A86FF",
                vividMagenta: "#FF006E",
                wildBlack: "#202426",
                wildGrey: "#8C8C88",
                barDarkBlue: "#253759",
                barLightBlue: "#495B73",
                barPink: "#F2D5CE",
                barSalmon: "#F2695C",
                barBrown: "#592722"
            },
            fontFamily: {
                sans: ["Helvetica Neue", "Helvetica", "Arial", "sans-serif"]
            }
        },
    },
    plugins: [],
}