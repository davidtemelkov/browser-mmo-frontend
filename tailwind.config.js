/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: theme => ({
                'login': "url('/login.jpeg')",
                'pixel': "url('/pixel.jpg')",
                })
    },
  },
  plugins: [],
}

