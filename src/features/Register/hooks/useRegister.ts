import { useState } from 'react';
import { useNavigate } from 'react-router';
import type { RegisterCredentials, RegisterResponse, PasswordStrength, PasswordRequirements, DocumentType, Role } from '../types/register.types';

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

  // Datos simulados de tipos de documento y roles
  const documentTypes: DocumentType[] = [
    { id: 1, name: 'Cédula de Ciudadanía', description: 'Documento de identidad colombiano' },
    { id: 2, name: 'Cédula de Extranjería', description: 'Documento para extranjeros residentes' },
    { id: 3, name: 'Pasaporte', description: 'Documento de viaje internacional' },
    { id: 4, name: 'Tarjeta de Identidad', description: 'Documento de identidad menor de edad' },
  ];

  const roles: Role[] = [
    { id: 1, name: 'Cliente', description: 'Usuario dueño de mascotas' },
    { id: 2, name: 'Veterinario', description: 'Profesional veterinario' },
    { id: 3, name: 'Paseador', description: 'Paseador de mascotas' },
    { id: 4, name: 'Administrador', description: 'Administrador del sistema' },
  ];

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

  const validateDocument = (document: string, typeId: number): boolean => {
    if (!document || !typeId) return false;
    
    const type = documentTypes.find(t => t.id === typeId);
    if (!type) return false;

    // Validaciones específicas por tipo de documento
    switch (typeId) {
      case 1: // Cédula de Ciudadanía
        return /^\d{7,10}$/.test(document);
      case 2: // Cédula de Extranjería
        return /^\d{6,12}$/.test(document);
      case 3: // Pasaporte
        return /^[A-Z0-9]{6,12}$/.test(document.toUpperCase());
      case 4: // Tarjeta de Identidad
        return /^\d{10,11}$/.test(document);
      default:
        return document.length >= 6;
    }
  };

  const register = async (credentials: RegisterCredentials): Promise<RegisterResponse> => {
    setLoading(true);
    setMessage('');
    setMessageType('');

    try {
      // Simular llamada a API
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Validaciones básicas
      if (!credentials.document || !credentials.name || !credentials.lastName || 
          !credentials.email || !credentials.password || !credentials.role_id || 
          !credentials.document_type_id) {
        throw new Error('Por favor, llena todos los campos obligatorios.');
      }

      // Validar documento
      if (!validateDocument(credentials.document, credentials.document_type_id)) {
        const docType = documentTypes.find(t => t.id === credentials.document_type_id);
        throw new Error(`El número de documento no es válido para ${docType?.name || 'el tipo seleccionado'}.`);
      }

      // Validar email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(credentials.email)) {
        throw new Error('Por favor, ingresa un email válido.');
      }

      // Validar contraseña
      if (!validatePassword(credentials.password)) {
        throw new Error('La contraseña no cumple con los requisitos de seguridad.');
      }

      // Simular registro exitoso
      const response: RegisterResponse = {
        success: true,
        message: 'Registro exitoso. Redirigiendo...',
        user: {
          id: Date.now().toString(),
          document: credentials.document,
          name: credentials.name,
          lastName: credentials.lastName,
          email: credentials.email,
          role_id: credentials.role_id,
          document_type_id: credentials.document_type_id
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
    documentTypes,
    roles,
    register,
    validatePassword,
    validateDocument,
    togglePasswordVisibility
  };
};
