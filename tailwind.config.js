/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gold: '#8B6914',
        burgundy: '#6B1A2A',
        cream: '#FAF8F5',
        // Admin colors
        'admin-bg': '#0d1117',
        'admin-sidebar': '#161b22',
        'admin-accent': '#8B1A1A',
        'admin-gold': '#C9A84C',
        'admin-text': '#f0ece4',
        'admin-muted': '#b3b0aa',
      },
      fontFamily: {
        display: ['Playfair Display', 'serif'],
        body: ['Inter', 'sans-serif'],
        'admin-display': ['DM Serif Display', 'serif'],
        'admin-mono': ['DM Mono', 'monospace'],
      },
    },
  },
  plugins: [],
}