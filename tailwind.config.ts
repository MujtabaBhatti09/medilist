import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens: {
        'xs': '500px',
      },
      colors: {
        'custom-gray': '#232323',
        'custom-blue-dark': '#1C75BC',
        'custom-blue-light': '#2B3990',
        'custom-white': '#e5e7eb',
        'custom-white-lighter': '#FCFCFC',
        'custom-bg-dark': '#0e1622',
        'custom-bg-light': '#d6dbdc',
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      width: {
        "c48": "48%",
        "c49": "49.4%",
        "cmd": "31.4%",
        "c32": "31.95%"
      },
      spacing: {
        "c14": "14.4rem"
      },
      boxShadow: {
        'cxl-light': ' 0 2px 8px 4px rgba(43, 57, 144, 1)',
        'cxl-dark': ' 0 1px 6px 2px rgba(28, 117, 188, 1)',
        'crosss': ' 0 1px 6px 2px rgba(223, 0, 3, 1)',
        'card': ' 0 1px 6px 2px rgba(79,70,229,.6)',
        'btns-pos': ' 0 1px 1rem 7px #1C75BC',
        'cross-spin': ' 0 0 6px 2px rgba(223, 0, 3, 1)',
        'cxl-spin': ' 0 1px 6px 2px rgba(79,70,229,150)',
        'cxl-active': ' 0 1px 5px 2px rgba(80, 190, 37, 1)',
      },
      dropShadow:{
        'cxl': ' 0 1px 6px 2px rgba(79,70,229,150)',
      },
      zIndex:{
        '60': 60,
        '70': 70,
        '80': 80,
      }
    },
  },
  plugins: [],
};
export default config;
