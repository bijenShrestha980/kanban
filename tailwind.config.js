/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        mianBackground: "#f5f5f5",
        columnBackground: "#ffffff",
      },
    },
  },
  plugins: [],
};
