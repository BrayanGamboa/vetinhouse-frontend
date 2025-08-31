import { useCallback, useEffect, useRef, useState } from 'react';
import type { LoginCredentials, LoginResponse } from '../types/login.types';
import { loadScript } from '../../../core/utils/loadScript';
import { decodeJwt, type GoogleJwtPayload } from '../../../core/utils/jwt';

export const useLogin = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [googleReady, setGoogleReady] = useState(false);
  const googleInitRef = useRef(false);

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

  // Cargar Google Identity Services
  useEffect(() => {
    let mounted = true;
    const src = 'https://accounts.google.com/gsi/client';
    loadScript(src)
      .then(() => mounted && setGoogleReady(true))
      .catch(() => mounted && setGoogleReady(false));
    return () => {
      mounted = false;
    };
  }, []);

  const ensureGoogleInitialized = useCallback(() => {
    if (!googleReady || googleInitRef.current) return;
    const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID as string | undefined;
    if (!clientId) return;
    if (!window.google?.accounts?.id) return;
    window.google.accounts.id.initialize({
      client_id: clientId,
      callback: () => {
        // El callback real lo manejamos con prompt + credential callback abajo
      }
    });
    googleInitRef.current = true;
  }, [googleReady]);

  useEffect(() => {
    ensureGoogleInitialized();
  }, [ensureGoogleInitialized]);

  const loginWithGoogle = useCallback(async (): Promise<LoginResponse> => {
    setIsLoading(true);
    try {
      const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID as string | undefined;
      if (!clientId) {
        return { success: false, message: 'Falta configurar VITE_GOOGLE_CLIENT_ID' };
      }
      if (!window.google?.accounts?.id) {
        return { success: false, message: 'Google Identity no está disponible' };
      }

      // Inicialización por seguridad si aún no
      if (!googleInitRef.current) {
        window.google.accounts.id.initialize({
          client_id: clientId,
          callback: () => {}
        });
        googleInitRef.current = true;
      }

      // Promesa que resuelve cuando Google devuelve el credential
    const credential: string = await new Promise((resolve, reject) => {
        try {
          // Usamos el flujo One Tap / Prompt, pero forzamos a mostrar el diálogo en popup si aplica
      const handler = (response: any) => {
            const cred = (response && response.credential) as string | undefined;
            if (cred) resolve(cred);
          };
          // Renderizamos un botón invisible y lo clickeamos sería hacky; en su lugar usamos prompt que invoca UX elegible
      window.google!.accounts.id.prompt();
      // Re-initialize with our callback para capturar esta sesión
          window.google!.accounts.id.initialize({ client_id: clientId, callback: handler });
          // Render opcion: si hay un contenedor con id 'googleButton', Google insertará un botón
          const btn = document.getElementById('googleButton');
          if (btn) {
            window.google!.accounts.id.renderButton(btn, {
              type: 'standard',
              theme: 'filled_blue',
              size: 'large',
              text: 'continue_with',
              shape: 'pill',
            });
          } else {
            // si no hay botón, igual el callback funcionará para One Tap
          }
          // además intentamos prompt para forzar UX
          window.google!.accounts.id.prompt();
          // timeout por si el usuario cierra o falla
          setTimeout(() => reject(new Error('Tiempo de espera agotado')), 60000);
        } catch (e) {
          reject(e);
        }
      });

      const payload = decodeJwt<GoogleJwtPayload>(credential);
      if (!payload) {
        return { success: false, message: 'No se pudo leer el token de Google' };
      }
      if (payload.aud !== clientId) {
        return { success: false, message: 'Token no corresponde a este cliente' };
      }
      // Guardamos información básica en localStorage (validación real debería ser en backend)
      localStorage.setItem('auth_provider', 'google');
      localStorage.setItem('userEmail', payload.email ?? '');
      localStorage.setItem('userId', payload.sub);
      localStorage.setItem('userName', payload.name ?? '');
      localStorage.setItem('userPicture', payload.picture ?? '');
      localStorage.setItem('google_credential', credential);

      return {
        success: true,
        message: 'Inicio de sesión con Google exitoso',
        user: {
          id: payload.sub,
          email: payload.email ?? '',
          name: payload.name ?? 'Usuario Google',
        }
      };
    } catch (e) {
      return { success: false, message: 'Login con Google cancelado o fallido' };
    } finally {
      setIsLoading(false);
    }
  }, [googleReady]);

  return {
    login,
    isLoading,
    showPassword,
    togglePasswordVisibility,
    loginWithGoogle,
    googleReady,
  };
};