/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      typography: {
        DEFAULT: {
          css: {
            color: '#333',
            h1: {
              color: '#3182ce',
              '&:hover': {
                color: '#2c5282',

              },
              fontSize: "10rem"
            },
          },
        },
      },
    },
    colors: {
      "color-dark": "#060d17",
      "color-dark-hover": "#1E252E",
      "color-white": "#ffffff",
      "color-dark-white": "#c6c8cd",
      "color-link-active": "#d9e8ed",
      "color-link-hover": "#d5d5d5",
      "color-link": "#999c9f",
      "color-primary": "#fbc500",
      "color-primary-hover": "#ffd966",
      "color-secondary": "#4c5a67",
      "color-secondary-hover": "#fbd446",
      "color-input-bg": "#1c252f",
      "color-dark-grey": "#11161c",
      "color-subtitle": "#6a7c8f",
      "color-transparent": "rgba(0,0,0,0)",
      "color-body": "#b9bdcc"
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}

