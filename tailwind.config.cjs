/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      backgroundColor: {
        lightGrey: '#F3F2EE',
        bgBlue: '#007CE7',
        bgDarkBlue: '#21599F',
      },
      textColor: {
        customBlue: '#007CE7',
      },
      borderColor: {
        customBlue: '#007CE7',
      },
    },
  },
  plugins: [],
};
