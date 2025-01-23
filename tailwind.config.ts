import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        mil_orange: "#FFB81C",
        blue_1: "#144570",
        background: "#F5F5F5",
        "light-yellow": "#FFF8E8",
        "light-blue": "#6CACE4",
      },
    },
  },
} satisfies Config;
