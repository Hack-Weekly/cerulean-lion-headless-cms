/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        heading: ["Tilt Prism", "cursive"],
        general: ["Orbitron", "sans-serif"],
      },
      colors: {
        lion: "#2a52be",
      },
      backgroundImage: {
        background: "url('src/images/home-page-lion.jpg')",
      },
    },
  },
  plugins: [require("daisyui")],
};
