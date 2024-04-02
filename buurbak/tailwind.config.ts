import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        primary: {
          100: "#EE7B46",
          200: "#EB672A",
        },
        secondary: {
          100: "#398D89",
        },
        gray: {
          100: "#777777",
        },
        offWhite: {
          100: "#f1f1f1",
        },
      },
      maxWidth: {
        "4/5": "80%",
      },
    },
  },
  plugins: [],
};
export default config;
