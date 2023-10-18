/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: theme => ({
                'login': "url('/public/login.jpeg')",
                'pixel': "url('/public/pixel.jpg')",
                })
    },
  },
  plugins: [],
}

