/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          "var(--font-sans)",
          "-apple-system",
          "BlinkMacSystemFont",
          "system-ui",
          "sans-serif",
        ],
      },
      colors: {
        pelangi: {
          merah: {
            pastel: "#FFB3B3",
            cerah: "#FF4D4D",
            gelap: "#B30000",
          },
          jingga: {
            pastel: "#FFD1B3",
            cerah: "#FF9F43",
            gelap: "#E67E22",
          },
          kuning: {
            pastel: "#FFF5B3",
            cerah: "#FDCB6E",
            gelap: "#F39C12",
          },
          lime: {
            pastel: "#E6F9AF",
            cerah: "#BADC58",
            gelap: "#6AB04C",
          },
          hijau: {
            pastel: "#B3FFCC",
            cerah: "#2ECC71",
            gelap: "#218C74",
          },
          tosca: {
            pastel: "#A3E4D7",
            cerah: "#1ABC9C",
            gelap: "#16A085",
          },
          langit: {
            pastel: "#AED6F1",
            cerah: "#3498DB",
            gelap: "#2980B9",
          },
          biru: {
            pastel: "#A9CCE3",
            cerah: "#2980B9",
            gelap: "#1F3A93",
          },
          nila: {
            pastel: "#D2B4DE",
            cerah: "#9B59B6",
            gelap: "#8E44AD",
          },
          ungu: {
            pastel: "#E8DAEF",
            cerah: "#8E44AD",
            gelap: "#5B2C6F",
          },
          pink: {
            pastel: "#FADBD8",
            cerah: "#E84393",
            gelap: "#C44569",
          },
          abu: {
            terang: "#F5F6FA",
            sedang: "#DCDDE1",
            gelap: "#2F3640",
          },
        },
      },
    },
  },
  plugins: [],
};