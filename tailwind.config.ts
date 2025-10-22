import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#eef6ff",
          100: "#d9ebff",
          200: "#add4ff",
          300: "#7fbaff",
          400: "#4d9dff",
          500: "#1d82ff",
          600: "#1666d1",
          700: "#104ba0",
          800: "#0a326f",
          900: "#041a3f"
        }
      }
    }
  },
  plugins: []
};

export default config;
