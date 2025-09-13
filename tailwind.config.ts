/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      // 既存のアニメーション設定
      keyframes: {
        "fade-in-up": {
          "0%": {
            opacity: "0",
            transform: "translateY(20px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0)",
          },
        },
      },
      animation: {
        "fade-in-up": "fade-in-up 1s ease-out forwards",
      },
      // ↓↓↓ ここに新しいフォントを追加しました ↓↓↓
      fontFamily: {
        'dancing-script': ['var(--font-dancing-script)'],
      },
    },
  },
  plugins: [],
};