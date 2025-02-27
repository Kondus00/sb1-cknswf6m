/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      typography: {
        DEFAULT: {
          css: {
            maxWidth: 'none',
            color: 'inherit',
            a: {
              color: '#2DD4BF',
              '&:hover': {
                color: '#14B8A6',
              },
            },
            blockquote: {
              borderLeftColor: '#2DD4BF',
              color: 'inherit'
            },
            'h1, h2, h3, h4': {
              color: 'inherit',
              'scroll-margin-top': '6rem',
            },
            hr: { borderColor: '#4B5563' },
            code: { color: '#14B8A6' },
            'pre code': { color: 'inherit' },
            strong: { color: 'inherit' },
          },
        },
      },
      animation: {
        'background-shine': 'background-shine 2s linear infinite',
      },
      keyframes: {
        'background-shine': {
          from: {
            backgroundPosition: '0 0',
          },
          to: {
            backgroundPosition: '-200% 0',
          },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}