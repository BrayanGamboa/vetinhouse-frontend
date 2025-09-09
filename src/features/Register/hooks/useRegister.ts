import { useState } from 'react';
import { useNavigate } from 'react-router';
import type { RegisterCredentials, RegisterResponse, PasswordStrength, PasswordRequirements, DocumentType, CreateDocumentTypeResponse, RoleUser, CreateRoleResponse } from '../types/register.types';

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
      // Validaciones básicas
      const { document, name, lastName, email, password, roleId, documentTypeId } = credentials;
      if (!document || !name || !lastName || !email || !password || !roleId || !documentTypeId) {
        throw new Error('Por favor, completa todos los campos del formulario.');
      }

      if (!validatePassword(password)) {
        throw new Error('La contraseña no cumple con los requisitos.');
      }

      // Llamada real a la API (usa proxy /api)
      const resp = await fetch('/api/user', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'omit',
        body: JSON.stringify({ document, name, lastName, email, password, roleId, documentTypeId })
      });

      if (!resp.ok) {
        const errText = await resp.text().catch(() => '');
        throw new Error(`Error ${resp.status}: ${resp.statusText}. ${errText}`);
      }

      const data = await resp.json().catch(() => ({}));

      const response: RegisterResponse = {
        success: true,
        message: 'Registro exitoso. Redirigiendo...',
        user: {
          id: data?.id ?? Date.now(),
          name,
          email,
          document,
          lastName,
          roleId,
          documentTypeId
        }
      };

      setMessage(response.message);
      setMessageType('success');

      localStorage.setItem('user', JSON.stringify(response.user));

      setTimeout(() => {
        navigate('/home');
      }, 1200);

      return response;

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Error al registrar usuario';
      setMessage(errorMessage);
      setMessageType('error');
      return { success: false, message: errorMessage };
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

  const createRole = async (role: RoleUser): Promise<CreateRoleResponse> => {
    setLoading(true);
    setMessage('');
    setMessageType('');

    try {
      const resp = await fetch('/api/role_user', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'omit',
        body: JSON.stringify({ id: role.id, name: role.name, description: role.description })
      });

      if (!resp.ok) {
        const errText = await resp.text().catch(() => '');
        throw new Error(`Error ${resp.status}: ${resp.statusText}. ${errText}`);
      }

      const data = await resp.json().catch(() => role);

      const success: CreateRoleResponse = {
        success: true,
        message: 'Rol creado exitosamente',
        role: data
      };

      setMessage(success.message);
      setMessageType('success');
      return success;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Error al crear rol';
      setMessage(errorMessage);
      setMessageType('error');
      return { success: false, message: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  // Traer Tipos de Documento existentes
  const fetchDocumentTypes = async (): Promise<DocumentType[]> => {
    try {
      const resp = await fetch('/api/document_type', {
        method: 'GET',
        credentials: 'omit',
      });
      if (!resp.ok) {
        const err = await resp.text().catch(() => '');
        throw new Error(`Error ${resp.status}: ${resp.statusText}. ${err}`);
      }
      const data = await resp.json();
      const arr = Array.isArray(data)
        ? data
        : Array.isArray((data as any)?.data)
          ? (data as any).data
          : Array.isArray((data as any)?.results)
            ? (data as any).results
            : [];
      return arr as DocumentType[];
    } catch (e) {
      console.error('Error al obtener tipos de documento', e);
      return [];
    }
  };

  // Traer Roles existentes
  const fetchRoles = async (): Promise<RoleUser[]> => {
    try {
      const resp = await fetch('/api/role_user', {
        method: 'GET',
        credentials: 'omit',
      });
      if (!resp.ok) {
        const err = await resp.text().catch(() => '');
        throw new Error(`Error ${resp.status}: ${resp.statusText}. ${err}`);
      }
      const data = await resp.json();
      const arr = Array.isArray(data)
        ? data
        : Array.isArray((data as any)?.data)
          ? (data as any).data
          : Array.isArray((data as any)?.results)
            ? (data as any).results
            : [];
      return arr as RoleUser[];
    } catch (e) {
      console.error('Error al obtener roles', e);
      return [];
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
    createDocumentType,
    createRole,
    fetchDocumentTypes,
    fetchRoles
  };
};
