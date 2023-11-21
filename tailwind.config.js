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
        "topzone-image": "url('./assets/logo-image.webp')",
        "image-1": "url('./assets/img-slider-1.webp')",
        "image-2": "url('./assets/img-slider-2.webp')",
        "image-3": "url('./assets/img-slider-3.webp')",
        "image-4": "url('./assets/img-slider-4.webp')",
        "image-5": "url('./assets/img-slider-5.webp')",
      },
    },
  },
  plugins: [],
};
