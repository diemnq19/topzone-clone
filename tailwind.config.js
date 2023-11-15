/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "normal-bg-color": "#3e3e3f",
        "dark-bg-color": "#101010",
      },
      backgroundImage: {
        "logo-image": "url('./assets/logo.png')",
        "topzone-image": "url('./assets/logo-image.webp')"
      },
    },
  },
  plugins: [],
};
