import { useEffect, useState } from 'react';

export default function SuccessAnimation() {
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    setShowConfetti(true);
    
    // Crear confetti
    createConfetti();
    
    // Redirigir después de 4 segundos
    setTimeout(() => {
      console.log('Redirigiendo al home...');
      window.location.href = '/home';
    }, 4000);
  }, []);

  const createConfetti = () => {
    const colors = ['#4CAF50', '#FFD700', '#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA726'];
    const confettiContainer = document.getElementById('confettiContainer');
    
    if (!confettiContainer) return;
    
    for (let i = 0; i < 100; i++) {
      setTimeout(() => {
        const confetti = document.createElement('div');
        confetti.className = 'absolute w-2.5 h-2.5 animate-[confettiFall_3s_linear_infinite]';
        confetti.style.left = Math.random() * 100 + '%';
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.animationDelay = Math.random() * 2 + 's';
        confetti.style.animationDuration = (Math.random() * 2 + 2) + 's';
        
        confettiContainer.appendChild(confetti);
        
        setTimeout(() => {
          confetti.remove();
        }, 4000);
      }, i * 50);
    }
  };

  return (
    <>
      {/* Animación de éxito */}
      <div className="fixed top-0 left-0 w-full h-full bg-gradient-to-br from-[#4CAF50]/95 to-[#45a049]/95 backdrop-blur-[20px] flex items-center justify-center z-[10000] opacity-100 visible transition-all duration-500">
        <div className="text-center text-white animate-[successBounce_0.8s_ease-out]">
          {/* Checkmark con anillos */}
          <div className="relative mb-8">
            <div className="w-30 h-30 bg-white rounded-full flex items-center justify-center mx-auto shadow-[0_0_50px_rgba(255,255,255,0.5)] animate-[checkmarkPulse_2s_infinite]">
              <i className="fas fa-check text-6xl text-[#4CAF50] animate-[checkmarkRotate_0.6s_ease-in-out_0.3s_both]"></i>
            </div>
            
            {/* Anillos expansivos */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <div className="absolute w-35 h-35 border-4 border-white/30 rounded-full -ml-[70px] -mt-[70px] animate-[ringExpand_2s_ease-out_infinite]"></div>
              <div className="absolute w-45 h-45 border-4 border-white/30 rounded-full -ml-[90px] -mt-[90px] animate-[ringExpand_2s_ease-out_infinite] [animation-delay:0.3s]"></div>
              <div className="absolute w-55 h-55 border-4 border-white/30 rounded-full -ml-[110px] -mt-[110px] animate-[ringExpand_2s_ease-out_infinite] [animation-delay:0.6s]"></div>
            </div>
          </div>
          
          <h2 className="text-4xl font-bold mb-4 text-shadow-[0_2px_10px_rgba(0,0,0,0.3)] animate-[titleSlideUp_0.8s_ease-out_0.5s_both]">
            ¡Bienvenido de vuelta!
          </h2>
          
          <p className="text-xl mb-8 opacity-90 animate-[subtitleFadeIn_0.8s_ease-out_0.7s_both]">
            Acceso concedido exitosamente
          </p>
          
          {/* Huellas animadas */}
          <div className="flex justify-center gap-5 mb-10">
            <i className="fas fa-paw text-3xl text-white animate-[pawBounce_1s_ease-in-out_infinite]"></i>
            <i className="fas fa-paw text-3xl text-white animate-[pawBounce_1s_ease-in-out_infinite] [animation-delay:0.2s]"></i>
            <i className="fas fa-paw text-3xl text-white animate-[pawBounce_1s_ease-in-out_infinite] [animation-delay:0.4s]"></i>
          </div>
          
          {/* Barra de carga */}
          <div className="w-75 h-1.5 bg-white/30 rounded-full mx-auto mb-5 overflow-hidden">
            <div className="h-full bg-gradient-to-r from-white to-white/80 rounded-full w-0 animate-[loadingProgress_3s_ease-in-out_1s_both]"></div>
          </div>
          
          <p className="text-base opacity-80 animate-[loadingTextPulse_1.5s_ease-in-out_infinite]">
            Redirigiendo al dashboard...
          </p>
        </div>
      </div>
      
      {/* Contenedor de confetti */}
      <div id="confettiContainer" className="fixed top-0 left-0 w-full h-full pointer-events-none z-[9999]"></div>
    </>
  );
}