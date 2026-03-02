/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{js,jsx}'],
    theme: {
        extend: {
            colors: {
                brand: {
                    50: '#fdf8f0',
                    100: '#faecd8',
                    200: '#f4d4a8',
                    300: '#ecb56e',
                    400: '#e49840',
                    500: '#d97706',
                    600: '#b45309',
                    700: '#92400e',
                    800: '#78350f',
                    900: '#451a03',
                },
                dark: {
                    800: '#1a1a1a',
                    900: '#111111',
                },
            },
            fontFamily: {
                display: ['Playfair Display', 'serif'],
                body: ['Inter', 'sans-serif'],
            },
        },
    },
    plugins: [],
};
