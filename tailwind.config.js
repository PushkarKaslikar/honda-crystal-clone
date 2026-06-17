/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        honda: {
          red: '#d01818',
          redHover: '#b01010',
          dark: '#1e293b',
          darker: '#0f172a',
          black: '#020617',
          light: '#f8fafc',
          gray: '#f1f5fa',
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Outfit', 'sans-serif'],
      },
    },
  },
  plugins: [],
}


