export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        sand: {
          50: '#FDFBF7',
          100: '#F7F3E9',
          200: '#EFE7D3',
          300: '#E4D5B7',
          900: '#2B1E16',
        },
        terracotta: {
          500: '#C85A32',
          600: '#B04B25',
          700: '#8E381A',
        },
        ochre: {
          400: '#EBB458',
          500: '#E09F3E',
        },
        forest: {
          800: '#1E2D24',
          900: '#15201A',
        }
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'sans-serif'],
        serif: ['"Cormorant Garamond"', 'serif'],
        mono: ['"Space Grotesk"', 'monospace'],
      }
    },
  },
  plugins: [],
}
