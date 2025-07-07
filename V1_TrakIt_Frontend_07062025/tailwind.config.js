/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        'inter': ['Inter', 'sans-serif'],
      },
      colors: {
        'navy': '#0A2342',
        'navy-dark': '#061A30',
        'neon-green': '#39FF14',
        'neon-green-glow': 'rgba(57, 255, 20, 0.3)',
        'aurora-blue': '#4A90E2',
        'aurora-cyan': '#50E3C2',
      },
      boxShadow: {
        'neon': '0 0 25px rgba(57, 255, 20, 0.4), 0 0 50px rgba(57, 255, 20, 0.2), inset 0 0 0 1px rgba(57, 255, 20, 0.3)',
        'neon-hover': '0 0 30px rgba(57, 255, 20, 0.5)',
        'neon-rich': '0 0 12px rgba(57, 255, 20, 0.95), 0 0 24px rgba(57, 255, 20, 0.8), 0 0 36px rgba(57, 255, 20, 0.4), inset 0 0 0 1px rgba(57, 255, 20, 0.9)',
        'neon-subtle': '0 0 15px rgba(57, 255, 20, 0.4), 0 0 25px rgba(57, 255, 20, 0.2), inset 0 0 0 1px rgba(57, 255, 20, 0.5)',
        'neon-block': '0 0 20px rgba(57, 255, 20, 0.6), 0 0 40px rgba(57, 255, 20, 0.4), 0 0 60px rgba(57, 255, 20, 0.2)',
        '3xl': '0 35px 60px -12px rgba(0, 0, 0, 0.25)',
      },
      backgroundImage: {
        'navy-gradient': 'linear-gradient(135deg, #0A2342 0%, #1a3a5c 100%)',
        'neon-gradient': 'linear-gradient(135deg, #39FF14 0%, #2ee00f 100%)',
        'hero-glow': 'radial-gradient(ellipse at center, rgba(57, 255, 20, 0.1) 0%, rgba(10, 35, 66, 0.9) 70%)',
        'radial-gradient': 'radial-gradient(ellipse at center, var(--tw-gradient-stops))',
      },
      blur: {
        '3xl': '64px',
        '4xl': '128px',
      },
      textShadow: {
        'dark': '2px 2px 4px rgba(0, 0, 0, 0.5)',
      },
      animation: {
        'aurora-organic-1': 'aurora-organic-1 20s ease-in-out infinite alternate',
        'aurora-organic-2': 'aurora-organic-2 25s ease-in-out infinite alternate-reverse',
        'aurora-organic-3': 'aurora-organic-3 22s ease-in-out infinite alternate',
        'aurora-organic-4': 'aurora-organic-4 28s ease-in-out infinite alternate-reverse',
        'aurora-organic-5': 'aurora-organic-5 24s ease-in-out infinite alternate',
        'aurora-flow-organic-1': 'aurora-flow-organic-1 35s ease-in-out infinite',
        'aurora-flow-organic-2': 'aurora-flow-organic-2 40s ease-in-out infinite reverse',
        'aurora-flow-organic-3': 'aurora-flow-organic-3 45s ease-in-out infinite',
        'aurora-accent-1': 'aurora-accent-1 30s ease-in-out infinite alternate',
        'aurora-accent-2': 'aurora-accent-2 32s ease-in-out infinite alternate-reverse',
        'aurora-accent-3': 'aurora-accent-3 28s ease-in-out infinite alternate',
        'aurora-glow-organic-1': 'aurora-glow-organic-1 50s ease-in-out infinite alternate',
        'aurora-glow-organic-2': 'aurora-glow-organic-2 55s ease-in-out infinite alternate-reverse',
      },
      keyframes: {
        'aurora-organic-1': {
          '0%': { transform: 'translateX(-150%) skewY(-8deg) scaleY(0.7)', opacity: '0.9' },
          '20%': { transform: 'translateX(-60%) skewY(-2deg) scaleY(1.3)', opacity: '0.9' },
          '40%': { transform: 'translateX(10%) skewY(-12deg) scaleY(0.8)', opacity: '0.9' },
          '60%': { transform: 'translateX(70%) skewY(-4deg) scaleY(1.5)', opacity: '0.9' },
          '80%': { transform: 'translateX(130%) skewY(-9deg) scaleY(0.9)', opacity: '0.9' },
          '100%': { transform: 'translateX(180%) skewY(-6deg) scaleY(0.7)', opacity: '0.9' },
        },
        'aurora-organic-2': {
          '0%': { transform: 'translateX(160%) skewY(5deg) scaleY(1.2)', opacity: '0.9' },
          '25%': { transform: 'translateX(50%) skewY(11deg) scaleY(0.8)', opacity: '0.9' },
          '50%': { transform: 'translateX(-20%) skewY(3deg) scaleY(1.6)', opacity: '0.9' },
          '75%': { transform: 'translateX(-80%) skewY(8deg) scaleY(1.0)', opacity: '0.9' },
          '100%': { transform: 'translateX(-160%) skewY(5deg) scaleY(1.2)', opacity: '0.9' },
        },
        'aurora-organic-3': {
          '0%': { transform: 'translateX(-110%) skewY(-3deg) scaleY(1.1)', opacity: '0.9' },
          '30%': { transform: 'translateX(-20%) skewY(-7deg) scaleY(1.7)', opacity: '0.9' },
          '60%': { transform: 'translateX(50%) skewY(-1deg) scaleY(0.6)', opacity: '0.9' },
          '100%': { transform: 'translateX(110%) skewY(-3deg) scaleY(1.1)', opacity: '0.9' },
        },
        'aurora-organic-4': {
          '0%': { transform: 'translateX(140%) skewY(6deg) scaleY(0.8)', opacity: '0.9' },
          '35%': { transform: 'translateX(40%) skewY(10deg) scaleY(1.4)', opacity: '0.9' },
          '65%': { transform: 'translateX(-60%) skewY(2deg) scaleY(1.1)', opacity: '0.9' },
          '100%': { transform: 'translateX(-140%) skewY(6deg) scaleY(0.8)', opacity: '0.9' },
        },
        'aurora-organic-5': {
          '0%': { transform: 'translateX(-130%) skewY(7deg) scaleY(1.3)', opacity: '0.9' },
          '50%': { transform: 'translateX(20%) skewY(3deg) scaleY(1.8)', opacity: '0.9' },
          '100%': { transform: 'translateX(130%) skewY(7deg) scaleY(1.3)', opacity: '0.9' },
        },
        'aurora-flow-organic-1': {
          '0%': { transform: 'translateX(-200%) rotate(8deg) scaleX(0.6)', opacity: '0.9' },
          '25%': { transform: 'translateX(-80%) rotate(4deg) scaleX(1.4)', opacity: '0.9' },
          '50%': { transform: 'translateX(20%) rotate(12deg) scaleX(1.1)', opacity: '0.9' },
          '75%': { transform: 'translateX(80%) rotate(3deg) scaleX(1.3)', opacity: '0.9' },
          '100%': { transform: 'translateX(200%) rotate(8deg) scaleX(0.6)', opacity: '0.9' },
        },
        'aurora-flow-organic-2': {
          '0%': { transform: 'translateX(-200%) rotate(-5deg) scaleX(1.3)', opacity: '0.9' },
          '30%': { transform: 'translateX(-50%) rotate(-9deg) scaleX(0.7)', opacity: '0.9' },
          '70%': { transform: 'translateX(50%) rotate(-2deg) scaleX(1.6)', opacity: '0.9' },
          '100%': { transform: 'translateX(200%) rotate(-5deg) scaleX(1.3)', opacity: '0.9' },
        },
        'aurora-flow-organic-3': {
          '0%': { transform: 'translateX(-200%) rotate(3deg) scaleX(1.2)', opacity: '0.9' },
          '40%': { transform: 'translateX(-40%) rotate(7deg) scaleX(1.7)', opacity: '0.9' },
          '60%': { transform: 'translateX(40%) rotate(1deg) scaleX(0.5)', opacity: '0.9' },
          '100%': { transform: 'translateX(200%) rotate(3deg) scaleX(1.2)', opacity: '0.9' },
        },
        'aurora-accent-1': {
          '0%': { transform: 'translateX(-150%) rotate(12deg)', opacity: '0.9' },
          '50%': { transform: 'translateX(0%) rotate(6deg)', opacity: '0.9' },
          '100%': { transform: 'translateX(150%) rotate(12deg)', opacity: '0.9' },
        },
        'aurora-accent-2': {
          '0%': { transform: 'translateX(150%) rotate(-7deg)', opacity: '0.9' },
          '50%': { transform: 'translateX(0%) rotate(-3deg)', opacity: '0.9' },
          '100%': { transform: 'translateX(-150%) rotate(-7deg)', opacity: '0.9' },
        },
        'aurora-accent-3': {
          '0%': { transform: 'translateX(-150%) rotate(6deg)', opacity: '0.9' },
          '50%': { transform: 'translateX(0%) rotate(10deg)', opacity: '0.9' },
          '100%': { transform: 'translateX(150%) rotate(6deg)', opacity: '0.9' },
        },
        'aurora-glow-organic-1': {
          '0%': { opacity: '0.9' },
          '33%': { opacity: '1.0' },
          '66%': { opacity: '1.0' },
          '100%': { opacity: '0.9' },
        },
        'aurora-glow-organic-2': {
          '0%': { opacity: '0.8' },
          '50%': { opacity: '1.0' },
          '100%': { opacity: '0.8' },
        },
      },
    },
  },
  plugins: [
    function({ addUtilities }) {
      const newUtilities = {
        '.text-shadow-dark': {
          textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
        },
      }
      addUtilities(newUtilities)
    }
  ],
};