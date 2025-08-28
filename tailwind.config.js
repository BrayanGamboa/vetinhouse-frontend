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