/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx}"
  ],
  theme: {
    extend: {
      animation: {
        'spin-fast': 'spin 0.8s linear infinite',
      },
    },
  },
  plugins: [],
}

