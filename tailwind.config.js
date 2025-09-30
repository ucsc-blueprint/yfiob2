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
        extend: {
            colors: {
            darkBlue: "var(--color-primary-blue)",
            lightBlue: "var(--color-secondary-blue)",
            darkOrange: "var(--color-primary-orange)",
            orange: "var(--color-secondary-orange)",
            yellow: "var(--color-primary-yellow)",
            darkGreen: "var(--color-primary-green)",
            lightGreen: "var(--color-secondary-green)"
            }
        },
    },

    plugins: [],
};
