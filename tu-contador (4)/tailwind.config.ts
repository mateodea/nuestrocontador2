import type { Config } from "tailwindcss"

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
    "*.{js,ts,jsx,tsx,mdx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        serif: ["Georgia", "Times New Roman", "serif"],
      },
      colors: {
        "game-green": "#2D351A",
        "game-olive": "#3C4422",
        "game-cream": "#EFE8C1",
        "game-beige": "#F6F1D3",
        "game-red": "#B03A2E",
        "game-blue": "#2C82C9",
        "game-brown": "#4C3B2C",
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "#2D351A",
          foreground: "#EFE8C1",
        },
        secondary: {
          DEFAULT: "#3C4422",
          foreground: "#EFE8C1",
        },
        destructive: {
          DEFAULT: "#B03A2E",
          foreground: "#EFE8C1",
        },
        muted: {
          DEFAULT: "#F6F1D3",
          foreground: "#2D351A",
        },
        accent: {
          DEFAULT: "#D4AF37",
          foreground: "#2D351A",
        },
        popover: {
          DEFAULT: "#F6F1D3",
          foreground: "#2D351A",
        },
        card: {
          DEFAULT: "#F6F1D3",
          foreground: "#2D351A",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [],
} satisfies Config

export default config
