/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
    './node_modules/flowbite/**/*.js',
    './node_modules/flowbite-react/lib/esm/**/*.js'
  ],
  theme: {
    extend: {},
    container: {
      center: true,
      margin: '1rem'
    }
  },
  plugins: [],
  darkMode: 'class'
}
