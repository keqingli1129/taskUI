/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        dark: {
          50: '#f6f6f7',
          100: '#e1e3e6',
          200: '#c2c5cb',
          300: '#9ba1ab',
          400: '#707786',
          500: '#515869',
          600: '#3e4351',
          700: '#2e323c',
          800: '#1f2128',
          900: '#141519',
        }
      }
    },
  },
  darkMode: 'class',
  plugins: [],
}
