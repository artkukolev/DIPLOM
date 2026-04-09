/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        lavender: {
          50: "hsl(270 50% 98%)",
          100: "hsl(270 100% 96%)",
          200: "hsl(270 100% 92%)",
          300: "hsl(270 83% 87%)",
          400: "hsl(262 80% 75%)",
          500: "hsl(262 80% 50%)",
          600: "hsl(262 80% 38%)",
          700: "hsl(262 80% 28%)",
          800: "hsl(262 80% 18%)",
          900: "hsl(262 80% 8%)",
        },
      },
      fontFamily: {
        serif: ["Playfair Display", "Georgia", "serif"],
        sans: ["Inter", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "sans-serif"],
      },
    },
  },
  darkMode: "class",
};
