
  /** @type {import('tailwindcss').Config} */
  module.exports = {
    content: ['./src/**/*.{html,js}', 'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}'],

    mode: "jit",
    theme: {
      container: {
        center: true,
        padding: '5px',
      },
      extend: {
        colors: {
          primary: "#00040f",
          secondary: "#00f6ff",
          dimWhite: "rgba(255, 255, 255, 0.7)",
          dimBlue: "rgba(9, 151, 124, 0.1)",
        },
        fontFamily: {
          poppins: ["Poppins", "sans-serif"],
          Amiri: ["Amiri"],
          Island: ["Island Moments"],
          Permanent: ["Permanent Marker"],
          Cinzel: ["Cinzel"],
          Alegreya: ["Alegreya Sans"],
          Gloria: ["Gloria Hallelujah"],
          Nanum: ["Nanum Pen Script"],
          Reenie: ["Reenie Beanie"],
          Modak: ["Modak"],
          Roboto: ["Roboto"],
          Roboto100: ["Roboto+Condensed"],
          OpenSans: ["Open+Sans:wght"],
          Lato: ["Lato"],
          Rubik: ["Rubik"],
          Montserrat: ["Montserrat"],
          Oswald: ["Oswald"],
          PTSans: ["PT+Sans"],
        },
        animation:{
          'slide-right':'slide-right 1s ease-in-out',
          'slide-left':'slide-left 1s ease-in-out',
          'fade':'fadeIn 1s ease-in-out',
        }
      },
      screens: {
        xs: '370px',
        sm: '576px',
        md: '768px',
        lg: '992px',
        xl: '1200px',
        xxl: '1400px',
        xxxl: '1600px',
      },
    },
    plugins: [
      // require('flowbite/plugin'),
    ],
    corePlugins: {
      keyframes: true
    }
  };