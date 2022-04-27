module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        primary: '#697AFF',
        darkmode:{
          1: '#18191A',
          2: '#242526',
          3: '#3A3B3C',
          4: '#E4E6EB',
          5: '#B0B3B8',
          hover: '#494A4B',
          disabled: 'rgba(250, 250, 250, 0.64)',
          opacity: 'rgba(0, 0, 0, 0.75)'
        }, 
        buttonCustom: 'linear-gradient(77.55deg, #384CFF 0%, #009EF8 100%);'
      },
      fontFamily: {
        nunito: ['Nunito', 'sans-serif']
      }
    },
  },
  plugins: [],
}