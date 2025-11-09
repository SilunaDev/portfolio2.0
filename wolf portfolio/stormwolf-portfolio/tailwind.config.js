/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens: {
        'xs': '320px',
      },
      fontSize: {
        '2xl': '1.5rem',
        '3xl': '1.875rem',
        '4xl': '2.25rem',
        '5xl': '3rem',
        '6xl': '3.75rem',
      },
      animation: {
        'float-slow': 'float-slow 8s ease-in-out infinite',
        'float-reverse': 'float-reverse 7s ease-in-out infinite',
        'title-glow': 'title-glow 3s ease-in-out infinite',
        'spin-slow': 'spin 15s linear infinite',
        'spin-slow-reverse': 'spin 12s linear infinite reverse',
      }
    },
  },
  plugins: [],
}



