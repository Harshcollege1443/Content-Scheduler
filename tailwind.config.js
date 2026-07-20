/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        slate: {
          950: "#0E1116",
        },
        base: "#F5F4F1",
        panel: "#FFFFFF",
        line: "#E4E2DC",
        ink: "#1B1D22",
        mute: "#6B6E76",
        indigo: "#4F46E5",
        coral: "#EF6461",
        amber: "#E8A33D",
        sage: "#5B8266",
        yt: "#E1352F",
        ig: "#C13584",
        x: "#111111",
      },
      fontFamily: {
        display: ["'Fraunces'", "serif"],
        body: ["'Inter'", "sans-serif"],
        mono: ["'JetBrains Mono'", "monospace"],
      },
    },
  },
  plugins: [],
};
