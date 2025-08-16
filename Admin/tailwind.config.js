/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // Fixed glob pattern
  ],
  theme: {
    extend: {},
  },
  plugins: [],
} // Removed extra brace