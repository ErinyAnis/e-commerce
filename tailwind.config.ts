import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        lightOrange: "#Fe6E44",
        darkOrange: "rgb(255,77,17)",
        lightText: "#888888",
        accent: "#000000",
        accentWhite: "#ffffff",
        lightRed: "#EF3636",
        bgLight: "#F5f5f5",
      },
    },
  },
  plugins: [],
} satisfies Config;
