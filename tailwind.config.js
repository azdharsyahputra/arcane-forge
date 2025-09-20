// tailwind.config.js
const plugin = require('tailwindcss/plugin');

module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}", // semua file React
    "./public/index.html"
  ],
  theme: {
    extend: {
      colors: {
        // warna fantasy/dark theme ArcaneForge
        primary: "#6b21a8",
        secondary: "#9333ea",
        accent: "#facc15",
        background: "#1f2937",
        foreground: "#f9fafb",
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui"],
      },
    },
  },
  plugins: [
    plugin(function({ addVariant }) {
      // Contoh custom variant: hover-then-focus
      addVariant("hover-focus", "&:hover &:focus");
      // Bisa tambahkan variant lain sesuai kebutuhan
    }),
  ],
};
