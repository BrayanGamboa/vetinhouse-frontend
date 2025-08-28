import { useEffect } from 'react';

export default function LoginBackground() {
  useEffect(() => {
    // Configurar partículas si particles.js está disponible
    if (window.particlesJS) {
      window.particlesJS('particles-js', {
        particles: {
          number: { value: 80, density: { enable: true, value_area: 800 } },
          color: { value: '#4CAF50' },
          shape: { type: 'circle' },
          opacity: { value: 0.5 },
          size: { value: 3, random: true },
          line_linked: { enable: true, distance: 150, color: '#4CAF50', opacity: 0.4, width: 1 },
          move: { enable: true, speed: 6 }
        },
        interactivity: {
          events: { onhover: { enable: true, mode: 'repulse' }, onclick: { enable: true, mode: 'push' } }
        }
      });
    }
  }, []);

  return (
    <>
      {/* Partículas */}
      <div id="particles-js" className="fixed inset-0 z-0"></div>
      
      {/* Video de fondo */}
      <div className="fixed inset-0 z-[-2]">
        <video autoPlay muted loop className="absolute top-1/2 left-1/2 w-full h-full object-cover transform -translate-x-1/2 -translate-y-1/2">
          <source src="https://cdn.pixabay.com/video/2020/05/13/39009-420224623_large.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/40 z-[-1]"></div>
      </div>

      {/* Huellas animadas */}
      <div className="fixed inset-0 pointer-events-none">
        <i className="fas fa-paw absolute text-white/10 text-xl animate-[floating_20s_linear_infinite]" style={{left: '10%'}}></i>
        <i className="fas fa-paw absolute text-white/10 text-2xl animate-[floating_20s_linear_infinite]" style={{left: '40%', animationDelay: '5s'}}></i>
        <i className="fas fa-paw absolute text-white/10 text-3xl animate-[floating_20s_linear_infinite]" style={{left: '70%', animationDelay: '10s'}}></i>
      </div>

      {/* Burbujas flotantes */}
      <div className="fixed inset-0 z-[-1] pointer-events-none">
        <div className="absolute bottom-[-100px] w-10 h-10 bg-white/10 rounded-full opacity-50 animate-[rise_8s_infinite_ease-in]" style={{left: '10%'}}></div>
        <div className="absolute bottom-[-100px] w-5 h-5 bg-white/10 rounded-full opacity-50 animate-[rise_5s_infinite_ease-in]" style={{left: '20%', animationDelay: '1s'}}></div>
        <div className="absolute bottom-[-100px] w-12 h-12 bg-white/10 rounded-full opacity-50 animate-[rise_7s_infinite_ease-in]" style={{left: '35%', animationDelay: '2s'}}></div>
        <div className="absolute bottom-[-100px] w-20 h-20 bg-white/10 rounded-full opacity-50 animate-[rise_11s_infinite_ease-in]" style={{left: '50%'}}></div>
        <div className="absolute bottom-[-100px] w-9 h-9 bg-white/10 rounded-full opacity-50 animate-[rise_6s_infinite_ease-in]" style={{left: '55%', animationDelay: '1s'}}></div>
        <div className="absolute bottom-[-100px] w-11 h-11 bg-white/10 rounded-full opacity-50 animate-[rise_8s_infinite_ease-in]" style={{left: '65%', animationDelay: '3s'}}></div>
      </div>
    </>
  );
}