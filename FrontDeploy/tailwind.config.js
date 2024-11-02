/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        inter: ["Inter", "sans-serif"],
        roboto: ["Roboto", "sans-serif"],
        marcellus: ["Marcellus", "sans-serif"],
      },
      // added colors as per theme
      colors: {
        majenta: "#87255B",
        pink: {
          600: "#6b2049",
          500: "#B370B0",
          300: "#BBA0CA",
          100: "#d4b4c4",
          "100-a": "#d4b4c470",
        },
        lightpink: "#D1C8E1",
        white: {
          100: "#D1C8E1",
          500: "#ffffff",
          "500-a": "#ffffffa8",
        },
        "light-blue": "#C3C3E6",
      },
      spacing: {
        px: "1px",
        0: "0",
        1: "0.5 rem",
        4: "1rem",
        8: "2rem",
        12: "3rem",
        16: "4rem",
        20: "5rem",
        24: "6rem",
        28: "7rem",
        32: "8rem",
        36: "9rem",
        40: "10rem",
        44: "11rem",
        48: "12rem",
        50: "20rem",
        60: "33rem",
        100: "1200px",
        full: "100%",
      },
      borderRadius: {
        none: "0",
        sm: "0.125rem",
        DEFAULT: "0.25rem",
        md: "0.375rem",
        lg: "0.5rem",
        xl: "0.75rem",
        "2xl": "1rem",
        "3xl": "1.5rem",
        full: "9999px",
      },
      boxShadow: {
        sm: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
        DEFAULT:
          "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
        md: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
        lg: "-1px 0px 20px 6px rgb(0 0 0 / 70%)",
        lg2: "0px 1rem 2rem 3px rgb(0 0 0 / 28%)",
        xl: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
        "2xl": "9px 6px 20px 2px rgb(0 0 0 / 70%)",
        inner: "inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)",
        none: "none",
      },
      textShadow: {
        sm : "0px 5px 4px black"
      },
      fontSize: {
        xs: "0.75rem",
        sm: "0.875rem",
        almost: "0.93rem",
        base: "1rem",
        lg: "1.125rem",
        xl: "1.25rem",
        "2xl": "1.5rem",
        "3xl": "1.875rem",
        "4xl": "2.25rem",
        "5xl": "3rem",
      },
      backgroundImage: {
        "bg-gradient-to-b": "linear-gradient(180deg, black, transparent)",
      },
      keyframes: {
        gradient: {
          "0%": {
            background: "linear-gradient(45deg, #FAFAFA, #D6D6D6)",
          },
          "50%": {
            background: "linear-gradient(45deg, #FAFAFA, #D6D6D6)",
          },
          "100%": {
            background: "linear-gradient(45deg, #D6D6D6, #FAFAFA)",
          },
        },
      },
      animation: {
        gradient: "gradient 15s ease infinite",
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        '.text-shadow-sm': {
          textShadow: '0px 5px 4px black',
        },
      });
    },
  ],
};
