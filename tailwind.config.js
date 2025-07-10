/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        redwood: {
          berry: '#871c45',
          blue: '#045b8e',
          green: '#2a7e5e',
          cloud: '#f4f5f6',
          slate: '#4f5b62',
        },
      },
    },
  },
  plugins: [],
}