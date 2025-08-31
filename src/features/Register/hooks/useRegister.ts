import { useState } from 'react';
import { useNavigate } from 'react-router';
import type { RegisterCredentials, RegisterResponse, PasswordStrength, PasswordRequirements } from '../types/register.types';

export const useRegister = () => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState<'success' | 'error' | ''>('');
  const [showPassword, setShowPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState<PasswordStrength>({
    score: 0,
    text: 'Fuerza de contraseña',
    color: '#fff'
  });
  const [passwordRequirements, setPasswordRequirements] = useState<PasswordRequirements>({
    minLength: false,
    hasUppercase: false,
    hasNumber: false,
    hasSpecialChar: false
  });

  const navigate = useNavigate();

  const validatePassword = (password: string) => {
    const requirements: PasswordRequirements = {
      minLength: password.length >= 8,
      hasUppercase: /[A-Z]/.test(password),
      hasNumber: /[0-9]/.test(password),
      hasSpecialChar: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)
    };

    setPasswordRequirements(requirements);

    // Calcular puntuación de fuerza
    let score = 0;
    if (requirements.minLength) score += 25;
    if (requirements.hasUppercase) score += 25;
    if (requirements.hasNumber) score += 25;
    if (requirements.hasSpecialChar) score += 25;

    // Determinar texto y color
    let text = 'Fuerza de contraseña';
    let color = '#fff';

    if (score <= 25) {
      text = 'Débil';
      color = '#ff6b6b';
    } else if (score <= 50) {
      text = 'Regular';
      color = '#ffa502';
    } else if (score <= 75) {
      text = 'Buena';
      color = '#ffdd59';
    } else {
      text = 'Fuerte';
      color = '#4CAF50';
    }

    setPasswordStrength({ score, text, color });

    // Retornar si todos los requisitos se cumplen
    return Object.values(requirements).every(req => req);
  };

  const register = async (credentials: RegisterCredentials): Promise<RegisterResponse> => {
    setLoading(true);
    setMessage('');
    setMessageType('');

    try {
      // Simular llamada a API
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Validaciones básicas
      if (!credentials.username || !credentials.email || !credentials.password) {
        throw new Error('Por favor, llena todos los campos.');
      }

      if (!validatePassword(credentials.password)) {
        throw new Error('La contraseña no cumple con los requisitos.');
      }

      // Simular registro exitoso
      const response: RegisterResponse = {
        success: true,
        message: 'Registro exitoso. Redirigiendo...',
        user: {
          id: Date.now().toString(),
          username: credentials.username,
          email: credentials.email
        }
      };

      setMessage(response.message);
      setMessageType('success');

      // Guardar sesión simulada
      localStorage.setItem('user', JSON.stringify(response.user));

      // Redirigir después de un breve retraso
      setTimeout(() => {
        navigate('/home');
      }, 1500);

      return response;

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Error al registrar usuario';
      
      setMessage(errorMessage);
      setMessageType('error');

      return {
        success: false,
        message: errorMessage
      };
    } finally {
      setLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return {
    loading,
    message,
    messageType,
    showPassword,
    passwordStrength,
    passwordRequirements,
    register,
    validatePassword,
    togglePasswordVisibility
  };
};
