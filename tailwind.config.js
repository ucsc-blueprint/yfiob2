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
            darkBlue: '#1D7387',
            lightBlue: '#A8DEED',
            orange: '#F58220',
            darkOrange: '#974B18',
            yellow: '#FFD85F',
            darkGreen: '#6C7632',
            lightGreen: '#B9CB71'
            }
        },
    },

    plugins: [],
};
