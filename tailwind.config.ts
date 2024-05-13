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
        "landing-background":
          "url('/img/BuurBak_Duurzaam-Delen_Aanhanger02972022_1920_1.webp')",
      },
      colors: {
        primary: {
          100: "#EE7B46",
          200: "#EB672A",
        },
        secondary: {
          100: "#398D89",
        },
        black: {
          100: "#000000",
          200: "#373530",
        },
        gray: {
          50: "#DDDDDD",
          100: "#777777",
        },
        offWhite: {
          100: "#f1f1f1",
        },
        succes: {
          100: "#66CC99",
        },
        error: {
          100: "#EB5C5C",
        },
      },
      maxWidth: {
        "4/5": "80%",
        "1/3": "33.33333333%",
      },
    },
  },
  plugins: [],
};
export default config;
