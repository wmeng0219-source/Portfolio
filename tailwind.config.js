/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      // HTML utilities use the same runtime tokens as the page styles.
      colors: {
        'surface-deep-black': 'var(--color-bg-primary)',
        'on-surface': 'var(--color-text-primary)',
        primary: 'var(--color-accent)',
      },
      fontFamily: {
        'body-md': 'var(--font-body)',
      },
    },
  },
};
