import type { Config } from "tailwindcss";

const config = {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      boxShadow: {
        card: "32.8387px 24.5482px 79px rgba(0, 0, 0, 0.15), 23.8851px 17.855px 53.2479px rgba(0, 0, 0, 0.121406), 16.6246px 12.4276px 34.4391px rgba(0, 0, 0, 0.10125), 10.9035px 8.15079px 21.3701px rgba(0, 0, 0, 0.0867188), 6.56775px 4.90965px 12.8375px rgba(0, 0, 0, 0.075), 3.46346px 2.58907px 7.6377px rgba(0, 0, 0, 0.0632813), 1.4367px 1.07399px 4.56719px rgba(0, 0, 0, 0.04875), 0.333519px 0.249318px 2.42246px rgba(0, 0, 0, 0.0285938);",
        image: "20px 20px 30px 0px #0000004D",
      },
      colors: {
        "c-blue-800": "#1D1C3B",
        "c-blue-900": "#17162E",
        "c-gray-400": "#ACACAC",
        "c-gray-600": "#454558",
        "c-red-700": "#BA0707",
      },
      fontFamily: {
        "kumbh-sans": "Kumbh Sans",
      },
      screens: {
        "s-1440px": { max: "1440px" },
        "s-1320px": { max: "1320px" },
        "s-1200px": { max: "1200px" },
        "s-1080px": { max: "1080px" },
        "s-960px": { max: "960px" },
        "s-840px": { max: "840px" },
        "s-720px": { max: "720px" },
        "s-600px": { max: "600px" },
        "s-480px": { max: "480px" },
        "s-360px": { max: "360px" },
      },
    },
  },
} satisfies Config;

export default config;
