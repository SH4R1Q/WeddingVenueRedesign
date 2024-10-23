/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        roboto: ['Roboto', 'sans-serif'],
      },
      // added colors as per theme 
      colors: {
        majenta: '#87255B',
        pinkDark: '#B370B0',
        pinkLight: '#BBA0CA',
        offWhite: '#D1C8E1',
        blue10: '#C3C3E6'
      },
      backgroundImage: {
        'bg-gradient-to-b': 'linear-gradient(180deg, black, transparent)'
      },
      keyframes: {
        gradient: {
          '0%': {
            background: 'linear-gradient(45deg, #FAFAFA, #D6D6D6)',
          },
          '50%': {
            background: 'linear-gradient(45deg, #FAFAFA, #D6D6D6)',
          },
          '100%': {
            background: 'linear-gradient(45deg, #D6D6D6, #FAFAFA)',
          },
        },
      },
      animation: {
        gradient: 'gradient 15s ease infinite',
      },
    },
  },
  plugins: [],
};
