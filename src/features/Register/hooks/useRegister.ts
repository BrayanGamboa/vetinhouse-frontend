import { useState } from 'react';
import type { RegisterCredentials, RegisterResponse, DocumentType, Role } from '../types/register.types';

export const useRegister = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const documentTypes: DocumentType[] = [
    { id: 1, name: 'Cédula de Ciudadanía' },
    { id: 2, name: 'Cédula de Extranjería' },
    { id: 3, name: 'Pasaporte' }
  ];

  const roles: Role[] = [
    { id: 1, name: 'Cliente' },
    { id: 2, name: 'Veterinario' },
    { id: 3, name: 'Paseador' }
  ];

  const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const register = async (credentials: RegisterCredentials): Promise<RegisterResponse> => {
    setIsLoading(true);
    
    try {
      if (!isValidEmail(credentials.email)) {
        return {
          success: false,
          message: 'Por favor, ingresa un correo electrónico válido'
        };
      }

      if (!credentials.password || credentials.password === 'google_auth') {
        // Skip password validation for Google auth
      } else if (credentials.password.length < 6) {
        return {
          success: false,
          message: 'La contraseña debe tener al menos 6 caracteres'
        };
      }

      const response = await fetch('https://vetinhouse-backend-1.onrender.com/user', {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          document: credentials.document,
          name: credentials.name,
          lastName: credentials.lastName,
          email: credentials.email,
          password: credentials.password || 'google_auth',
          roleId: credentials.roleId,
          documentTypeId: credentials.documentTypeId
        })
      });

      if (response.ok) {
        const data = await response.json();
        return {
          success: true,
          message: '¡Registro exitoso! Ya puedes iniciar sesión',
          user: data
        };
      } else {
        const errorText = await response.text();
        let errorMessage = 'Error al registrar usuario';
        
        try {
          const errorData = JSON.parse(errorText);
          errorMessage = errorData.message || errorMessage;
        } catch {
          errorMessage = `Error ${response.status}: ${response.statusText}`;
        }
        
        return {
          success: false,
          message: errorMessage
        };
      }
    } catch (error: any) {
      console.error('Error de registro:', error);
      
      if (error.name === 'TypeError' && error.message.includes('fetch')) {
        return {
          success: false,
          message: 'Error de conexión: No se puede conectar con el servidor. Verifica que el backend esté funcionando.'
        };
      }
      
      return {
        success: false,
        message: `Error de conexión: ${error.message}`
      };
    } finally {
      setIsLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return {
    register,
    isLoading,
    showPassword,
    togglePasswordVisibility,
    documentTypes,
    roles
  };
};