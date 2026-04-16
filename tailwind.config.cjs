/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}", 
    "./layout/**/*.{js,ts,jsx,tsx}",
    "./hooks/**/*.{js,ts,jsx,tsx}", 
    "./context/**/*.{js,ts,jsx,tsx}", 
    "./const/**/*.{js,ts,jsx,tsx}" 
  ],
  darkMode: "class",
  theme: {
    extend: {},
  },
  plugins: [],
};