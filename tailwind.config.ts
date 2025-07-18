import type { Config } from "tailwindcss";
import defaultTheme from "tailwindcss/defaultTheme";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      'xs': '480px',
      ...defaultTheme.screens,
    },
    extend: {
      fontFamily: {
        'gotham': ['Gotham', 'Helvetica', 'Arial', 'sans-serif'], // Default body font
        'primera': ['"Primera Trial"', 'sans-serif'],
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      animation: {
        fadeIn: 'fadeIn 0.5s ease-in-out forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        }
      },
      fontSize: {
        '7xl': '5rem', // Default is around 4.5rem
        '8xl': '6rem',
      },
    },
  },
  plugins: [
    // @ts-ignore
    function({ addUtilities }: { addUtilities: any }) {
      const newUtilities = {
        '.scrollbar-hide': {
          '-ms-overflow-style': 'none',
          'scrollbar-width': 'none',
          '&::-webkit-scrollbar': {
            display: 'none'
          },
        },
      }
      addUtilities(newUtilities);
    },
  ],
} satisfies Config;
