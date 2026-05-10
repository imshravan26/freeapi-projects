/** @type {import('tailwindcss').Config} */
export default {
  theme: {
    extend: {
      colors: {
        dark: "#0f0e17",
        light: "#fffffe",
        accent: "#ff8906",
        secondary: "#f25f4c",
        muted: "#a7a9be",
        border: "#ffffff10",
      },
      fontFamily: {
        syne: ["Syne", "sans-serif"],
      },
      animation: {
        bounce: "bounce 1s infinite",
        spin: "spin 1s linear infinite",
        pulse: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
      backdropBlur: {
        sm: "4px",
      },
    },
  },
};
