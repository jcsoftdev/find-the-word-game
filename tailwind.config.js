/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    './index.html',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        customWhite: '#F9F9F9',
        darkBlueColor: '#262b3c',
        grayColor: '#939B9F',
        darkGrayColor: '#818181',
        keyboardGrayColor: '#D3D6DA',
        keyboardGrayColorRevert: '#565F7E',
        keyboardDarkGrayColor: '#818181',
        lightGrayColor: '#F3F3F3',
        lightTextColor: '#E5E5E5',
        darkTextColor: '#202537',
        bgColor: 'rgb(218, 220, 224)',
        bgAlternativeColor: '#939b9f',
        greenColor: '#66A060',
        yellowColor: '#CEB02C',
      }
    },
  },
  plugins: [],
}

