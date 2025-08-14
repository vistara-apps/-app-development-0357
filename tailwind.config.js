/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: 'hsl(220 12% 96%)',
        accent: 'hsl(220 90% 50%)',
        border: 'hsl(220 10% 80%)',
        primary: 'hsl(220 4% 12%)',
        surface: 'hsl(0 0% 100%)',
        destructive: 'hsl(0 84.2% 60.2%)',
        muted: {
          foreground: 'hsl(220 10% 60%)'
        }
      },
      borderRadius: {
        lg: '16px',
        md: '10px',
        sm: '6px'
      },
      spacing: {
        lg: '20px',
        md: '12px',
        sm: '8px'
      },
      boxShadow: {
        card: '0 8px 24px hsla(0,0%,0%,0.12)'
      },
      animation: {
        'fade-in': 'fadeIn 0.25s cubic-bezier(0.22,1,0.36,1)',
        'slide-up': 'slideUp 0.4s cubic-bezier(0.22,1,0.36,1)'
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' }
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        }
      }
    },
  },
  plugins: [],
}