/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "primary": "#083D77",
        "secondary": "#FA7B21",
        "bg-gray": "#EEEEEE",
        "border-color": "#c5c5c5"
      }
    },
  },
  plugins: [require("daisyui")],
};
