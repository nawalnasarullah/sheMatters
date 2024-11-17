/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        black: '#000000',  
        white: '#ffffff',  
        primary: '#005c65', 
        primaryHover: '#004654',  
        primaryDark: '#005368', 
        secondary: '#FCEAEA',  
      },
      fontFamily: {
        primaryFont: ['Signika', 'sans-serif'], 
        secondaryFont: ['Khula', 'sans-serif'], 
      },
      fontSize: {
        body: '14px', 
      },
      fontWeight: {
        body: '500', 
      },
    },
  },
  plugins: [],
};
