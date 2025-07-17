module.exports = {
    content: [
        "./src/app/**/*.{js,ts,jsx,tsx}",
        "./src/pages/**/*.{js,ts,jsx,tsx}",
        "./src/components/**/*.{js,ts,jsx,tsx}",
    ],

    theme: {
        fontFamily: {
            primary: "var(--font-primary)",
            secondary: "var(--font-secondary)",
        },
        extend: {},
    },

    plugins: [],
};
