import { type Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";
import animatePlugin from "tailwindcss-animate";

export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      keyframes: {
        "accordion-down": {
          from: { height: "0", opacity: "0" },
          to: { height: "var(--radix-accordion-content-height)", opacity: "1" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)", opacity: "1" },
          to: { height: "0", opacity: "0" },
        },
        "fade-in": {
          "0%": {
            opacity: "0",
            transform: "translateY(20px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0)",
          },
        },
        "fade-out": {
          "0%": {
            opacity: "1",
          },
          "100%": {
            opacity: "0",
          },
        },
        "scale-in": {
          "0%": {
            transform: "scale(0.95)",
            opacity: "0",
          },
          "100%": {
            transform: "scale(1)",
            opacity: "1",
          },
        },
        "float": {
          "0%": {
            transform: "translateY(0px) translateX(0px) rotate(0deg)",
          },
          "25%": {
            transform: "translateY(-50px) translateX(25px) rotate(90deg)",
          },
          "50%": {
            transform: "translateY(-100px) translateX(-25px) rotate(180deg)",
          },
          "75%": {
            transform: "translateY(-150px) translateX(50px) rotate(270deg)",
          },
          "100%": {
            transform: "translateY(-200px) translateX(0px) rotate(360deg)",
          },
        },
        "rotate3d": {
          "0%": {
            transform: "perspective(1000px) rotateY(0deg) translateZ(0px) translateY(0px)",
          },
          "25%": {
            transform: "perspective(1000px) rotateY(90deg) translateZ(50px) translateY(-20px)",
          },
          "50%": {
            transform: "perspective(1000px) rotateY(180deg) translateZ(0px) translateY(0px)",
          },
          "75%": {
            transform: "perspective(1000px) rotateY(270deg) translateZ(-50px) translateY(20px)",
          },
          "100%": {
            transform: "perspective(1000px) rotateY(360deg) translateZ(0px) translateY(0px)",
          },
        },
        "cardRotate": {
          "0%": {
            transform: "perspective(1000px) rotateY(0deg) translateY(0px)",
          },
          "25%": {
            transform: "perspective(1000px) rotateY(90deg) translateY(-20px)",
          },
          "50%": {
            transform: "perspective(1000px) rotateY(180deg) translateY(0px)",
          },
          "75%": {
            transform: "perspective(1000px) rotateY(270deg) translateY(20px)",
          },
          "100%": {
            transform: "perspective(1000px) rotateY(360deg) translateY(0px)",
          },
        },
        "textStabilize": {
          "0%": {
            transform: "rotateY(0deg)",
          },
          "25%": {
            transform: "rotateY(-90deg)",
          },
          "50%": {
            transform: "rotateY(-180deg)",
          },
          "75%": {
            transform: "rotateY(-270deg)",
          },
          "100%": {
            transform: "rotateY(-360deg)",
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in": "fade-in 0.3s ease-out",
        "fade-out": "fade-out 0.2s ease-out",
        "scale-in": "scale-in 0.3s ease-out",
        "float": "float linear infinite",
        "rotate3d": "rotate3d 20s linear infinite",
        "cardRotate": "cardRotate 15s linear infinite",
        "textStabilize": "textStabilize 15s linear infinite",
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        dark: "#3C474B",
        highlight: "#9EEFE5",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        sans: ["Gilroy", ...fontFamily.sans],
      },
    },
  },
  plugins: [animatePlugin],
} satisfies Config;
