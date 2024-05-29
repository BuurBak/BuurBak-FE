import { nextui } from "@nextui-org/theme";
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/components/(autocomplete|calendar|checkbox|date-picker|button|ripple|spinner|input|listbox|divider|popover|scroll-shadow|date-input).js",
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
      fontSize: {
        h1: ["56px", "61.6px"],
        h2: ["48px", "52.8px"],
        h3: ["40px", "44px"],
        h4: ["32px", "35.2px"],
        h5: ["24px", "26.4px"],
        h6: ["20px", "22px"],
        normal: ["20px", "100%"],
        small: ["14px", "100%"],
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
  plugins: [
    nextui({
      themes: {
        "buurbak-light": {
          extend: "light",
          layout: {
            boxShadow: {
              small: "",
              medium: "",
              large: "",
            },
            radius: {
              small: "6px",
              medium: "6px",
              large: "6px",
            },
          },
          colors: {
            overlay: {
              50: "#EE7B46",
              100: "#EE7B46",
              200: "#EE7B46",
              300: "#EE7B46",
              400: "#EE7B46",
              500: "#EE7B46",
              600: "#EE7B46",
              700: "#EE7B46",
              800: "#EE7B46",
              900: "#EE7B46",
              DEFAULT: "#EE7B46",
              foreground: "#EE7B46",
            },
            primary: {
              50: "#EE7B4620",
              100: "#EE7B46",
              200: "#EB672A",
              300: "#EE7B46",
              400: "#EE7B46",
              500: "#EE7B46",
              600: "#EE7B46",
              700: "#EE7B46",
              800: "#EE7B46",
              900: "#EE7B46",
              foreground: "#EE7B46",
              DEFAULT: "#EE7B46",
            },
            default: {
              50: "#fff",
              100: "#fff",
            },
          },
        },
      },
    }),
  ],
};
export default config;
