/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      screens: {
        xs: '435px',
        'drawer-full': '525px',
        navInputHide: '745px',
        heroOpacity: '775px',
        customMl: '860px',
        customFullImage: '938px',
        customUserProfile: '1138px',
      },
      fontFamily: {
        montserrat: ['Montserrat', 'sans-serif'],
      },
      boxShadow: {
        customPink: '1px 1px 15px #6C3EB8',
      },
      colors: {
        customGray: '#191919',
        buttonPink: '#6C3EB8',
        heroGray: '#212123',
        lighterGray: '#576067',
        categoriesPink: '#8B57C6',
      },

      textColor: {
        lightGray: '#B8B8B8',
        lighterGray: '#576067',
        categoriesPink: '#8B57C6',
        heroGray: '#212123',
        heroLightGray: '#616E74',
        heroWhite: '#F6F6F7',
      },
    },
    animation: {
      rotation: 'rotation 1s linear infinite',
      'bounce-alternate': 'bounce-alternate 0.4s infinite alternate',
      'bounce-alternate-delay-100': 'bounce-alternate 0.4s infinite alternate 0.1s',
      'bounce-alternate-delay-200': 'bounce-alternate 0.4s infinite alternate 0.2s',
    },
    keyframes: {
      rotation: {
        '0%': { transform: 'rotate(0deg)' },
        '100%': { transform: 'rotate(360deg)' },
      },
      'bounce-alternate': {
        '0%': { transform: 'translateY(0)' },
        '100%': { transform: 'translateY(-10px)' },
      },
    },
  },
  plugins: [],
};
