/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'poppins': ['Poppins', 'Arial', 'sans-serif'],
      },
      animation: {
        'pulse': 'pulse 2s infinite',
        'fadeIn': 'fadeIn 1s ease-in-out',
        'fadeInDown': 'fadeInDown 1s ease-in-out',
        'fadeInLeft': 'fadeInLeft 1s ease-in-out 1s both',
        'fadeInRight': 'fadeInRight 1s ease-in-out 1s both',
        'fadeInUp': 'fadeInUp 1s ease-in-out 2s both',
        'shake': 'shake 0.5s ease-in-out',
        'floating': 'floating 20s linear infinite',
        'rise': 'rise 15s infinite ease-in',
        'successBounce': 'successBounce 0.8s ease-out',
        'checkmarkPulse': 'checkmarkPulse 2s infinite',
        'checkmarkRotate': 'checkmarkRotate 0.6s ease-in-out 0.3s both',
        'ringExpand': 'ringExpand 2s ease-out infinite',
        'titleSlideUp': 'titleSlideUp 0.8s ease-out 0.5s both',
        'subtitleFadeIn': 'subtitleFadeIn 0.8s ease-out 0.7s both',
        'pawBounce': 'pawBounce 1s ease-in-out infinite',
        'loadingProgress': 'loadingProgress 3s ease-in-out 1s both',
        'loadingTextPulse': 'loadingTextPulse 1.5s ease-in-out infinite',
        'confettiFall': 'confettiFall 3s linear infinite',
        'fadeInCenter': 'fadeInCenter 0.4s ease-out',
        'slideInFromLeft': 'slideInFromLeft 0.8s ease-out',
        'slideInFromRight': 'slideInFromRight 0.6s ease-out',
      },
      keyframes: {
        fadeInCenter: {
          '0%': { transform: 'translate(-50%, -50%) scale(0.95)', opacity: '0' },
          '100%': { transform: 'translate(-50%, -50%) scale(1)', opacity: '1' },
        },
        slideInFromLeft: {
          '0%': { transform: 'translate(-150%, -50%)', opacity: '0' },
          '100%': { transform: 'translate(-50%, -50%)', opacity: '1' },
        },
        slideInFromRight: {
          '0%': { transform: 'translate(50%, -50%)', opacity: '0' },
          '100%': { transform: 'translate(-50%, -50%)', opacity: '1' },
        },
        floating: {
          '0%': { 
            top: '-10%', 
            transform: 'translateX(0) rotate(0deg)', 
            opacity: '1' 
          },
          '100%': { 
            top: '110%', 
            transform: 'translateX(100px) rotate(360deg)', 
            opacity: '0' 
          },
        },
        rise: {
          '0%': { bottom: '-100px', transform: 'translateX(0)' },
          '50%': { transform: 'translate(100px)' },
          '100%': { bottom: '1080px', transform: 'translateX(-200px)' },
        },
      },
      backdropBlur: {
        '20': '20px',
      },
      textShadow: {
        'sm': '0 1px 2px rgba(0, 0, 0, 0.3)',
        'DEFAULT': '0 2px 4px rgba(0, 0, 0, 0.3)',
        'lg': '0 0 20px rgba(76, 175, 80, 0.5)',
      }
    },
  },
  plugins: [],
}