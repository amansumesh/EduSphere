/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'brand-black': '#0b0b0f',
        'brand-purple': {
          50: '#f4f0ff',
          100: '#ebe2ff',
          200: '#d7c5ff',
          300: '#b79aff',
          400: '#9870ff',
          500: '#7c3aed',
          600: '#6b2bd6',
          700: '#581fb5',
          800: '#451a8f',
          900: '#35166e'
        },
        'brand-pink': {
          50: '#fff0f7',
          100: '#ffd9ec',
          200: '#ffb4d8',
          300: '#ff8ec3',
          400: '#ff64ac',
          500: '#f43f5e',
          600: '#e11d48',
          700: '#be123c',
          800: '#9f1239',
          900: '#881337'
        }
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'brand-hero': 'radial-gradient(1200px 500px at -10% -20%, rgba(124, 58, 237, 0.25), rgba(0,0,0,0)), radial-gradient(800px 400px at 110% -10%, rgba(244, 63, 94, 0.20), rgba(0,0,0,0))'
      },
      gridTemplateColumns:{
        'auto': 'repeat(auto-fit, minmax(200px, 1fr))'
      },
      spacing: {
        'section-height': '500px',
      },
      fontSize: {
        'default': ['15px', '21px'],
        'course-deatails-heading-small': ['26px', '36px'],
        'course-deatails-heading-large': ['36px', '44px'],
        'home-heading-small': ['28px', '34px'],
        'home-heading-large': ['48px', '56px'],
      },
      maxWidth: {
        'course-card': '424px',
      },
      boxShadow: {
        'custom-card': '0px 4px 15px 2px rgba(0, 0, 0, 0.1)',
      },
    },
  },
  plugins: [],
}