/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primaryBlack: "#121212",
                primaryGreen: "#35403A",
                secondaryGreen: "#4C594F",
                primaryWhite: "#BFBFB8",
                secondaryWhite: "#A4A69C"
            },
            fontFamily: {
                sans: ["Helvetica Neue", "Helvetica", "Arial", "sans-serif"]
            }
        },
    },
    plugins: [],
}