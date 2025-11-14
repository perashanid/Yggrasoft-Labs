/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          light: '#A89048',
          DEFAULT: '#8C7231',
          dark: '#5d1B2C',
        },
        teal: {
          light: '#4A7A8A',
          DEFAULT: '#365265',
          dark: '#213127',
        },
        background: {
          primary: '#010202',
          secondary: '#213127',
          elevated: '#2D2D2D',
        },
      },
      fontFamily: {
        heading: ['"Cinzel"', 'serif'],
        body: ['"Inter"', 'sans-serif'],
        accent: ['"Marcellus"', 'serif'],
      },
    },
  },
  plugins: [],
}
