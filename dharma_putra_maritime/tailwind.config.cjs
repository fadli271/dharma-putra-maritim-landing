/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{astro,html,js,jsx,ts,tsx}", "./public/**/*.html"],
  theme: {
    extend: {
      colors: {
        brand: {
          // Deep Navy - Professional & Trustworthy
          950: "#050d1a",
          900: "#0a192f",
          800: "#112240",
          700: "#1d335a",
          // Gold - Premium & Excellence
          gold: {
            50: "#fbf8f1",
            100: "#f4edda",
            200: "#e9dbb5",
            300: "#dac286",
            400: "#cda95f",
            DEFAULT: "#c5a059", // Signature Gold
            600: "#b08543",
            700: "#936838",
            800: "#7a5632",
            900: "#65472d",
          },
          accent: "#64ffda",
        },
        slate: {
          950: "#020617",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "-apple-system", "sans-serif"],
        serif: ["Playfair Display", "Georgia", "serif"],
      },
      animation: {
        "fade-in-up": "fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "fade-in": "fadeIn 1s ease-out forwards",
        float: "float 6s ease-in-out infinite",
        "scroll-reveal":
          "scrollReveal 1s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "ken-burns": "kenBurns 20s ease-in-out infinite alternate",
      },
      keyframes: {
        fadeInUp: {
          "0%": { opacity: "0", transform: "translateY(30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-20px)" },
        },
        kenBurns: {
          "0%": { transform: "scale(1)" },
          "100%": { transform: "scale(1.15)" },
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "premium-dark": "linear-gradient(135deg, #0a192f 0%, #050d1a 100%)",
      },
      boxShadow: {
        premium: "0 20px 50px -12px rgba(0, 0, 0, 0.25)",
        "gold-glow": "0 0 20px rgba(197, 160, 89, 0.2)",
      },
    },
  },
  plugins: [],
};
