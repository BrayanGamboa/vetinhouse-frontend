import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router';
import { useLogin } from '../hooks/useLogin';
import GoogleSetupInstructions from './GoogleSetupInstructions';

interface LoginMethodSelectorProps {
  onSelectEmail: () => void;
}

export default function LoginMethodSelector({ onSelectEmail }: LoginMethodSelectorProps) {
  const navigate = useNavigate();
  const { googleReady, setupGoogleButton } = useLogin();
  const googleBtnRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!googleReady || !googleBtnRef.current) return;
    
    const timer = setTimeout(() => {
      if (googleBtnRef.current) {
        googleBtnRef.current.innerHTML = '';
        setupGoogleButton(googleBtnRef.current, (res) => {
          if (res.success) {
            setTimeout(() => navigate('/home'), 300);
          }
        });
      }
    }, 100);

    return () => {
      clearTimeout(timer);
      try { window.google?.accounts.id.cancel(); } catch {}
      if (googleBtnRef.current) googleBtnRef.current.innerHTML = '';
    };
  }, [googleReady, setupGoogleButton, navigate]);

  return (
    <div 
      className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white/15 backdrop-blur-[20px] border border-white/20 rounded-[20px] p-10 w-[400px] max-w-[90vw] shadow-[0_25px_45px_rgba(0,0,0,0.2)] text-center z-[1000] transition-all duration-300 animate-[fadeIn_1s_ease-in-out]"
    >
      <div className="mb-8">
        <i className="fas fa-clinic-medical text-5xl text-[#5FD068] mb-2 text-shadow-[0_0_20px_rgba(95,208,104,0.5)] animate-[pulse_2s_infinite]"></i>
        <h1 className="text-white text-3xl font-bold text-shadow-[0_2px_4px_rgba(0,0,0,0.3)]">VetInHouse</h1>
      </div>
      
      <div className="mb-8 text-center animate-[fadeInDown_1s_ease-in-out]">
        <h2 className="text-white text-2xl font-semibold mb-3 text-shadow-[0_2px_4px_rgba(0,0,0,0.3)]">
          ¡Bienvenido a VetInHouse!
        </h2>
        <p className="text-white/90 text-lg mb-4 text-shadow-[0_1px_2px_rgba(0,0,0,0.3)]">
          Tu compañero de confianza para el cuidado veterinario en casa
        </p>
        <p className="text-white/80 text-base text-shadow-[0_1px_2px_rgba(0,0,0,0.3)]">
          ¿Cómo deseas comenzar tu experiencia?
        </p>
      </div>

      <div className="space-y-4">
        {/* Botón Google */}
        <div className="animate-[fadeInUp_1s_ease-in-out_0.5s_both]">
          <div ref={googleBtnRef} className="flex justify-center w-full mb-4">
            {/* Google renderizará aquí el botón oficial */}
          </div>
          {!import.meta.env.VITE_GOOGLE_CLIENT_ID && (
            <GoogleSetupInstructions />
          )}
        </div>

        {/* Separador */}
        <div className="flex items-center gap-3 my-6 animate-[fadeIn_1s_ease-in-out_1s_both]">
          <div className="flex-1 h-px bg-white/20" />
          <span className="text-white/80 text-sm">o</span>
          <div className="flex-1 h-px bg-white/20" />
        </div>

        {/* Botón Email */}
        <button
          onClick={onSelectEmail}
          className="w-full py-4 px-4 bg-gradient-to-br from-[#4CAF50] to-[#45a049] border-none rounded-full text-white text-base font-semibold cursor-pointer transition-all duration-300 relative overflow-hidden shadow-[0_10px_30px_rgba(76,175,80,0.3)] hover:transform hover:-translate-y-0.5 hover:shadow-[0_15px_40px_rgba(76,175,80,0.4)] animate-[fadeInUp_1s_ease-in-out_1.5s_both]"
        >
          <span className="inline-flex items-center justify-center gap-2">
            <i className="fas fa-envelope"></i>
            Iniciar con Email y Contraseña
          </span>
        </button>
      </div>

      {/* Footer con info adicional */}
      <div className="mt-8 text-center animate-[fadeIn_1s_ease-in-out_2s_both]">
        <div className="p-4 bg-white/10 rounded-2xl border border-white/20 backdrop-blur-[10px]">
          <span className="block text-white/90 text-sm mb-2 font-medium text-shadow-[0_1px_2px_rgba(0,0,0,0.3)]">
            ¿Primera vez en VetInHouse?
          </span>
          <a href="/register" className="inline-block text-white no-underline text-sm font-bold py-2 px-4 rounded-[20px] bg-gradient-to-br from-[#4CAF50] to-[#45a049] border-2 border-transparent transition-all duration-300 text-shadow-[0_1px_2px_rgba(0,0,0,0.3)] shadow-[0_4px_15px_rgba(76,175,80,0.3)] hover:bg-gradient-to-br hover:from-[#45a049] hover:to-[#4CAF50] hover:transform hover:-translate-y-0.5 hover:shadow-[0_6px_20px_rgba(76,175,80,0.4)]">
            <i className="fas fa-user-plus mr-2 text-xs"></i>
            Crear cuenta nueva
          </a>
        </div>
      </div>
    </div>
  );
}
