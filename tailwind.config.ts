import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        heliconia: {
          light: "#829368",
          DEFAULT: "#576643",
          dark: "#3f4a30",
          accent: "#c1a57b",
        },
      },
    },
  },
  plugins: [],
};
export default config;