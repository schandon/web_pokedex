/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        pokemon: {
          fire: '#FF6B35',
          water: '#4A90E2',
          grass: '#7ED321',
          electric: '#F5A623',
          psychic: '#BD10E0',
          ice: '#50E3C2',
          dragon: '#9013FE',
          dark: '#4A4A4A',
          fairy: '#FF69B4',
          normal: '#9B9B9B',
          fighting: '#D0021B',
          poison: '#7B68EE',
          ground: '#D2691E',
          flying: '#87CEEB',
          bug: '#8FBC8F',
          rock: '#8B4513',
          ghost: '#9370DB',
          steel: '#708090'
        }
      }
    },
  },
  plugins: [],
}