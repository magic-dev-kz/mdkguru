/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        'bg-primary': '#0e0e10',
        'bg-secondary': '#1a1a2e',
        'bg-card': '#16162a',
        'accent-purple': '#9945FF',
        'accent-green': '#14F195',
        'accent-blue': '#00D1FF',
        'text-primary': '#ffffff',
        'text-secondary': '#c4c4cf',
        'text-muted': '#6e6e80',
        'border': '#2a2a3e',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};
