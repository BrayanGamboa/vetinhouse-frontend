import { useState } from 'react';
import type { LoginCredentials, LoginResponse } from '../types/login.types';

export const useLogin = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const login = async (credentials: LoginCredentials): Promise<LoginResponse> => {
    setIsLoading(true);
    
    try {
      // Validaciones
      if (!isValidEmail(credentials.email)) {
        return {
          success: false,
          message: 'Por favor, ingresa un correo electrónico válido'
        };
      }

      // Simulación de autenticación con Firebase
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Simulación de credenciales válidas (para demo)
      if (credentials.email === 'juan123@yopmail.com' && credentials.password === 'juan123') {
        // Guardar en localStorage
        localStorage.setItem('userEmail', credentials.email);
        localStorage.setItem('userId', '1');
        
        return {
          success: true,
          message: '¡Bienvenido de vuelta!',
          user: {
            id: '1',
            email: credentials.email,
            name: 'Juan - VetInHouse'
          }
        };
      } else {
        return {
          success: false,
          message: 'Credenciales inválidas. Usa: juan123@yopmail.com / juan123'
        };
      }
    } catch (error) {
      return {
        success: false,
        message: 'Error de conexión. Intenta nuevamente'
      };
    } finally {
      setIsLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return {
    login,
    isLoading,
    showPassword,
    togglePasswordVisibility
  };
};