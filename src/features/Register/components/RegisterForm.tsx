import React, { useState } from 'react';
import { useRegister } from '../hooks/useRegister';
import type { RegisterCredentials } from '../types/register.types';

interface RegisterFormProps {
  onBack: () => void;
}

const RegisterForm: React.FC<RegisterFormProps> = ({ onBack }) => {
  const [credentials, setCredentials] = useState<RegisterCredentials>({
    username: '',
    email: '',
    password: ''
  });

  const {
    loading,
    message,
    messageType,
    showPassword,
    passwordStrength,
    passwordRequirements,
    register,
    validatePassword,
    togglePasswordVisibility
  } = useRegister();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCredentials(prev => ({
      ...prev,
      [name]: value
    }));

    // Validar contraseña en tiempo real
    if (name === 'password') {
      validatePassword(value);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await register(credentials);
  };

  const isFormValid = () => {
    return credentials.username && 
           credentials.email && 
           credentials.password &&
           Object.values(passwordRequirements).every(req => req);
  };

  return (
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
                    bg-white/10 backdrop-blur-[10px] p-10 rounded-[20px] text-center text-white 
                    w-[450px] shadow-[0_15px_35px_rgba(0,0,0,0.2)] border border-white/10 
                    transition-all duration-300 max-h-[90vh] overflow-y-auto
                    hover:transform hover:-translate-x-1/2 hover:-translate-y-[52%] 
                    hover:shadow-[0_20px_40px_rgba(0,0,0,0.3)]
                    animate-fadeInCenter">
      
      {/* Botón de regresar */}
      <button 
        onClick={onBack}
        className="absolute top-4 left-4 text-white/70 hover:text-white transition-colors duration-200"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      {/* Logo y título */}
      <div className="mb-8">
        <div className="text-5xl text-[#5FD068] mb-3 animate-pulse">
          <svg className="w-12 h-12 mx-auto" fill="currentColor" viewBox="0 0 24 24">
            <path d="M19 14.46V8.5a6.5 6.5 0 0 0-13 0v5.96l-1.85 1.85A1 1 0 0 0 4.5 18h15a1 1 0 0 0 .35-1.69L19 14.46zM12 22a2 2 0 0 0 2-2H10a2 2 0 0 0 2 2z"/>
          </svg>
        </div>
        <h1 className="text-3xl font-bold text-white mb-3 text-shadow-[2px_2px_4px_rgba(0,0,0,0.3)]">
          VetInHouse
        </h1>
        <h2 className="text-2xl text-white mb-8">Registro</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Campo de usuario */}
        <div className="relative">
          <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#5FD068] text-xl">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
            </svg>
          </div>
          <input
            type="text"
            name="username"
            value={credentials.username}
            onChange={handleInputChange}
            placeholder="Nombre de usuario"
            className="w-full py-4 px-12 bg-white/10 border-none rounded-full text-white text-base 
                     transition-all duration-300 placeholder-white/70
                     focus:outline-none focus:bg-white/20 focus:shadow-[0_0_15px_rgba(95,208,104,0.3)]"
            required
          />
        </div>

        {/* Campo de email */}
        <div className="relative">
          <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#5FD068] text-xl">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
            </svg>
          </div>
          <input
            type="email"
            name="email"
            value={credentials.email}
            onChange={handleInputChange}
            placeholder="Correo Electrónico"
            className="w-full py-4 px-12 bg-white/10 border-none rounded-full text-white text-base 
                     transition-all duration-300 placeholder-white/70
                     focus:outline-none focus:bg-white/20 focus:shadow-[0_0_15px_rgba(95,208,104,0.3)]"
            required
          />
        </div>

        {/* Campo de contraseña */}
        <div className="relative">
          <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#5FD068] text-xl">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"/>
            </svg>
          </div>
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            value={credentials.password}
            onChange={handleInputChange}
            placeholder="Contraseña"
            className="w-full py-4 px-12 bg-white/10 border-none rounded-full text-white text-base 
                     transition-all duration-300 placeholder-white/70
                     focus:outline-none focus:bg-white/20 focus:shadow-[0_0_15px_rgba(95,208,104,0.3)]"
            required
          />
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-[#5FD068] 
                     hover:text-[#45a049] transition-colors duration-300"
          >
            {showPassword ? (
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 7c2.76 0 5 2.24 5 5 0 .65-.13 1.26-.36 1.83l2.92 2.92c1.51-1.26 2.7-2.89 3.43-4.75-1.73-4.39-6-7.5-11-7.5-1.4 0-2.74.25-3.98.7l2.16 2.16C10.74 7.13 11.35 7 12 7zM2 4.27l2.28 2.28.46.46C3.08 8.3 1.78 10.02 1 12c1.73 4.39 6 7.5 11 7.5 1.55 0 3.03-.3 4.38-.84l.42.42L19.73 22 21 20.73 3.27 3 2 4.27zM7.53 9.8l1.55 1.55c-.05.21-.08.43-.08.65 0 1.66 1.34 3 3 3 .22 0 .44-.03.65-.08l1.55 1.55c-.67.33-1.41.53-2.2.53-2.76 0-5-2.24-5-5 0-.79.2-1.53.53-2.2zm4.31-.78l3.15 3.15.02-.16c0-1.66-1.34-3-3-3l-.17.01z"/>
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/>
              </svg>
            )}
          </button>
        </div>

        {/* Indicador de fuerza de contraseña */}
        <div className="mb-5">
          <div className="h-[5px] bg-white/20 rounded-[5px] mb-3 overflow-hidden">
            <div 
              className="h-full transition-all duration-300"
              style={{ 
                width: `${passwordStrength.score}%`,
                backgroundColor: passwordStrength.color
              }}
            />
          </div>
          <p 
            className="text-sm"
            style={{ color: passwordStrength.color }}
          >
            {passwordStrength.text}
          </p>
        </div>

        {/* Requisitos de contraseña */}
        <div className="text-left mb-6 bg-white/10 p-4 rounded-[10px]">
          <p className="mb-3 text-sm">La contraseña debe contener:</p>
          <ul className="space-y-1">
            <li className="text-sm flex items-center">
              <span className={`mr-2 ${passwordRequirements.minLength ? 'text-[#4CAF50]' : 'text-[#ff6b6b]'}`}>
                {passwordRequirements.minLength ? '✓' : '✗'}
              </span>
              Al menos 8 caracteres
            </li>
            <li className="text-sm flex items-center">
              <span className={`mr-2 ${passwordRequirements.hasUppercase ? 'text-[#4CAF50]' : 'text-[#ff6b6b]'}`}>
                {passwordRequirements.hasUppercase ? '✓' : '✗'}
              </span>
              Al menos una mayúscula
            </li>
            <li className="text-sm flex items-center">
              <span className={`mr-2 ${passwordRequirements.hasNumber ? 'text-[#4CAF50]' : 'text-[#ff6b6b]'}`}>
                {passwordRequirements.hasNumber ? '✓' : '✗'}
              </span>
              Al menos un número
            </li>
            <li className="text-sm flex items-center">
              <span className={`mr-2 ${passwordRequirements.hasSpecialChar ? 'text-[#4CAF50]' : 'text-[#ff6b6b]'}`}>
                {passwordRequirements.hasSpecialChar ? '✓' : '✗'}
              </span>
              Al menos un carácter especial
            </li>
          </ul>
        </div>

        {/* Botón de registro */}
        <button
          type="submit"
          disabled={!isFormValid() || loading}
          className={`w-full py-4 px-6 border-none rounded-full text-white text-lg font-semibold 
                     transition-all duration-300 flex items-center justify-center gap-3
                     ${isFormValid() && !loading 
                       ? 'bg-[#4CAF50] hover:bg-[#45a049] hover:-translate-y-0.5 hover:shadow-[0_5px_15px_rgba(76,175,80,0.4)] opacity-100' 
                       : 'bg-[#4CAF50] opacity-70 cursor-not-allowed'
                     }
                     active:translate-y-0`}
        >
          {loading ? (
            <>
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Registrando...
            </>
          ) : (
            <>
              <span>Registrarse</span>
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
              </svg>
            </>
          )}
        </button>

        {/* Mensaje de respuesta */}
        {message && (
          <p className={`mt-4 text-sm ${messageType === 'error' ? 'text-[#ff6b6b]' : 'text-[#4CAF50]'}`}>
            {message}
          </p>
        )}

        {/* Enlace a login */}
        <div className="mt-5">
          <p className="text-white/80">
            ¿Ya tienes cuenta?{' '}
            <button
              type="button"
              onClick={onBack}
              className="text-[#4CAF50] hover:text-[#45a049] hover:underline 
                       transition-colors duration-300 font-medium"
            >
              Inicia sesión aquí
            </button>
          </p>
        </div>
      </form>
    </div>
  );
};

export default RegisterForm;
