// const { nextui } = require("@nextui-org/react");
import {nextui} from "@nextui-org/react";


/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bgColor: "var(--bg-color)",
        primaryColor: "var(--primary-color)",
        accentColor: "var(--accent-color)",
        secAccentColor: "var(--sec-accent-color)",
        textColor: "var(--text-color)"
      }
    },
  },
  darkMode: "class",
  plugins: [nextui()],
}

