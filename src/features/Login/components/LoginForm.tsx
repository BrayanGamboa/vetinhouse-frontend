import { useState } from 'react';
import { useLogin } from '../hooks/useLogin';
import type { LoginCredentials } from '../types/login.types';
import SuccessAnimation from './SuccessAnimation';

export default function LoginForm() {
  const hasGoogleClientId = Boolean(import.meta.env.VITE_GOOGLE_CLIENT_ID);
  const [credentials, setCredentials] = useState<LoginCredentials>({
    email: '',
    password: ''
  });
  const [showSuccess, setShowSuccess] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState<'success' | 'error' | ''>('');
  
  const { login, isLoading, showPassword, togglePasswordVisibility, loginWithGoogle, googleReady } = useLogin();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!credentials.email || !credentials.password) {
      showMessage('Por favor, completa todos los campos', 'error');
      return;
    }
    
    const result = await login(credentials);
    
    if (result.success) {
      showMessage('¡Inicio de sesión exitoso!', 'success');
      setTimeout(() => {
        setShowSuccess(true);
      }, 1000);
    } else {
      showMessage(result.message, 'error');
      // Efecto shake
      const container = document.getElementById('loginContainer');
      if (container) {
        container.style.animation = 'shake 0.5s ease-in-out';
        setTimeout(() => {
          container.style.animation = '';
        }, 500);
      }
    }
  };

  const showMessage = (msg: string, type: 'success' | 'error') => {
    setMessage(msg);
    setMessageType(type);
    setTimeout(() => {
      setMessage('');
      setMessageType('');
    }, 5000);
  };

  if (showSuccess) {
    return <SuccessAnimation />;
  }

  return (
    <div 
      id="loginContainer"
      className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white/15 backdrop-blur-[20px] border border-white/20 rounded-[20px] p-10 w-[400px] max-w-[90vw] shadow-[0_25px_45px_rgba(0,0,0,0.2)] text-center z-[1000] transition-all duration-300 hover:transform hover:-translate-x-1/2 hover:-translate-y-[52%] hover:shadow-[0_30px_50px_rgba(0,0,0,0.3)] animate-[fadeIn_1s_ease-in-out]"
    >
      <div className="mb-8">
        <i className="fas fa-clinic-medical text-5xl text-[#4CAF50] mb-2 text-shadow-[0_0_20px_rgba(76,175,80,0.5)] animate-[pulse_2s_infinite]"></i>
        <h1 className="text-white text-3xl font-bold text-shadow-[0_2px_4px_rgba(0,0,0,0.3)]">VetInHouse</h1>
      </div>
      
      <h2 className="text-white mb-8 text-2xl font-semibold text-shadow-[0_2px_4px_rgba(0,0,0,0.3)] animate-[fadeInDown_1s_ease-in-out]">Iniciar Sesión</h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="relative mb-6 animate-[fadeInLeft_1s_ease-in-out_1s_both]">
          <div className="absolute left-[18px] top-1/2 transform -translate-y-1/2 text-[#4CAF50] text-lg z-10">
            <i className="fas fa-envelope"></i>
          </div>
          <input
            type="email"
            value={credentials.email}
            onChange={(e) => setCredentials({...credentials, email: e.target.value})}
            placeholder="Correo Electrónico"
            className="w-full py-4 px-12 bg-white/10 border border-white/20 rounded-full text-white text-base outline-none transition-all duration-300 backdrop-blur-[10px] placeholder-white/70 focus:bg-white/20 focus:border-[#4CAF50] focus:shadow-[0_0_20px_rgba(76,175,80,0.3)]"
            required
          />
        </div>

        <div className="relative mb-6 animate-[fadeInRight_1s_ease-in-out_1s_both]">
          <div className="absolute left-[18px] top-1/2 transform -translate-y-1/2 text-[#4CAF50] text-lg z-10">
            <i className="fas fa-lock"></i>
          </div>
          <input
            type={showPassword ? 'text' : 'password'}
            value={credentials.password}
            onChange={(e) => setCredentials({...credentials, password: e.target.value})}
            placeholder="Contraseña"
            className="w-full py-4 px-12 bg-white/10 border border-white/20 rounded-full text-white text-base outline-none transition-all duration-300 backdrop-blur-[10px] placeholder-white/70 focus:bg-white/20 focus:border-[#4CAF50] focus:shadow-[0_0_20px_rgba(76,175,80,0.3)]"
            required
          />
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute right-[18px] top-1/2 transform -translate-y-1/2 text-white/70 cursor-pointer transition-colors duration-300 z-10 hover:text-[#4CAF50]"
          >
            <i className={`fas ${showPassword ? 'fa-eye' : 'fa-eye-slash'}`}></i>
          </button>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-4 px-4 bg-gradient-to-br from-[#4CAF50] to-[#45a049] border-none rounded-full text-white text-base font-semibold cursor-pointer transition-all duration-300 mb-5 relative overflow-hidden shadow-[0_10px_30px_rgba(76,175,80,0.3)] hover:transform hover:-translate-y-0.5 hover:shadow-[0_15px_40px_rgba(76,175,80,0.4)] active:transform active:translate-y-0 disabled:opacity-50 animate-[fadeInUp_1s_ease-in-out_2s_both]"
        >
          {isLoading ? (
            <>
              <span className="mr-2">Iniciando sesión...</span>
              <i className="fas fa-spinner animate-spin"></i>
            </>
          ) : (
            <>
              <span className="mr-2">Ingresar</span>
              <i className="fas fa-paw transition-transform duration-300 hover:scale-125"></i>
            </>
          )}
        </button>
      </form>

      {message && (
        <div className={`my-4 p-2 rounded-lg font-medium text-center transition-all duration-300 ${
          messageType === 'success' 
            ? 'bg-[#4CAF50]/20 text-[#4CAF50] border border-[#4CAF50]/30' 
            : 'bg-red-500/20 text-red-500 border border-red-500/30'
        }`}>
          {message}
        </div>
      )}
      
      <div className="mt-4">
        <div className="flex items-center gap-3 mb-4">
          <div className="flex-1 h-px bg-white/20" />
          <span className="text-white/80 text-sm">o</span>
          <div className="flex-1 h-px bg-white/20" />
        </div>
        <div id="googleButton" className="flex justify-center">
          {/* Google renderizará aquí el botón oficial */}
        </div>
        <button
          type="button"
          onClick={async () => {
            const res = await loginWithGoogle();
            if (res.success) {
              showMessage('¡Inicio con Google exitoso!', 'success');
              setTimeout(() => setShowSuccess(true), 1000);
            } else {
              showMessage(res.message, 'error');
            }
          }}
          disabled={isLoading || !googleReady || !hasGoogleClientId}
          className="w-full py-3 mt-3 bg-white text-[#1f2937] rounded-full font-semibold shadow hover:bg-gray-100 disabled:opacity-50 transition-colors"
        >
          <span className="inline-flex items-center justify-center gap-2">
            <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" className="w-5 h-5" />
            Continuar con Google
          </span>
        </button>
        {!hasGoogleClientId && (
          <div className="mt-3 text-xs text-red-300 bg-red-500/20 border border-red-500/30 rounded-lg p-2">
            Configura VITE_GOOGLE_CLIENT_ID en el archivo .env y reinicia el servidor.
          </div>
        )}
      </div>

      <div className="mt-6 text-center w-full animate-[fadeIn_1s_ease-in-out_2s_both]">
        <a href="#" className="inline-block text-white no-underline text-sm font-semibold py-3 px-5 rounded-[25px] bg-[#4CAF50]/25 border-2 border-[#4CAF50] transition-all duration-300 mb-5 backdrop-blur-[10px] text-shadow-[0_1px_3px_rgba(0,0,0,0.5)] shadow-[0_4px_15px_rgba(76,175,80,0.3)] hover:bg-[#4CAF50]/40 hover:transform hover:-translate-y-0.5 hover:shadow-[0_6px_20px_rgba(76,175,80,0.4)]">
          <i className="fas fa-key mr-2 text-xs"></i>
          ¿Olvidaste tu contraseña?
        </a>
        
        <div className="mt-4 p-4 bg-white/10 rounded-2xl border border-white/20 backdrop-blur-[10px]">
          <span className="block text-white/90 text-sm mb-2 font-medium text-shadow-[0_1px_2px_rgba(0,0,0,0.3)]">
            ¿No tienes cuenta?
          </span>
          <a href="#" className="inline-block text-white no-underline text-sm font-bold py-2 px-4 rounded-[20px] bg-gradient-to-br from-[#4CAF50] to-[#45a049] border-2 border-transparent transition-all duration-300 text-shadow-[0_1px_2px_rgba(0,0,0,0.3)] shadow-[0_4px_15px_rgba(76,175,80,0.3)] hover:bg-gradient-to-br hover:from-[#45a049] hover:to-[#4CAF50] hover:transform hover:-translate-y-0.5 hover:shadow-[0_6px_20px_rgba(76,175,80,0.4)]">
            <i className="fas fa-user-plus mr-2 text-xs"></i>
            Regístrate aquí
          </a>
        </div>
      </div>
    </div>
  );
}