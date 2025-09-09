import { useState } from 'react';
import { useNavigate } from 'react-router';
import type { RegisterCredentials, RegisterResponse, PasswordStrength, PasswordRequirements, DocumentType, CreateDocumentTypeResponse } from '../types/register.types';

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

  const createDocumentType = async (documentType: DocumentType): Promise<CreateDocumentTypeResponse> => {
    setLoading(true);
    setMessage('');
    setMessageType('');

    try {
      console.log('📤 Enviando datos:', {
        id: documentType.id,
        name: documentType.name,
        description: documentType.description
      });

      const requestOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'omit' as RequestCredentials, // No enviar cookies
        body: JSON.stringify({
          id: documentType.id,
          name: documentType.name,
          description: documentType.description
        }),
      };

      console.log('📋 Configuración de request:', requestOptions);

  // Usar proxy de Vite en dev para evitar CORS
  const response = await fetch('/api/document_type', requestOptions);

      console.log('📥 Respuesta del servidor:', {
        status: response.status,
        statusText: response.statusText,
        ok: response.ok,
        headers: Object.fromEntries(response.headers.entries())
      });

      if (!response.ok) {
        let errorText = '';
        try {
          errorText = await response.text();
        } catch (e) {
          errorText = 'No se pudo leer el error del servidor';
        }
        
        console.error('❌ Error del servidor:', {
          status: response.status,
          statusText: response.statusText,
          errorText: errorText,
          url: response.url
        });
        
        throw new Error(`Error ${response.status}: ${response.statusText}. ${errorText || 'Sin detalles adicionales'}`);
      }

      const data = await response.json();
      console.log('✅ Datos recibidos:', data);

      const successResponse: CreateDocumentTypeResponse = {
        success: true,
        message: 'Tipo de documento creado exitosamente',
        documentType: data
      };

      setMessage(successResponse.message);
      setMessageType('success');

      return successResponse;

    } catch (error) {
      console.error('💥 Error capturado:', error);
      
      let errorMessage = 'Error desconocido al crear tipo de documento';
      
      if (error instanceof TypeError && error.message.includes('fetch')) {
        errorMessage = 'Error de conexión. Verifica tu conexión a internet y que el servidor esté disponible.';
      } else if (error instanceof Error) {
        errorMessage = error.message;
      }
      
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

  return {
    loading,
    message,
    messageType,
    showPassword,
    passwordStrength,
    passwordRequirements,
    register,
    validatePassword,
    togglePasswordVisibility,
    createDocumentType
  };
};
