import { useCallback, useEffect, useState } from 'react';
import type { LoginCredentials, LoginResponse } from '../types/login.types';
import { loadScript } from '../../../core/utils/loadScript';
import { decodeJwt, type GoogleJwtPayload } from '../../../core/utils/jwt';

export const useLogin = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [googleReady, setGoogleReady] = useState(false);

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

      // Llamada real a la API (usa proxy /api para evitar CORS)
      const resp = await fetch('/api/user/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'omit',
        body: JSON.stringify({ email: credentials.email, password: credentials.password })
      });

      if (!resp.ok) {
        const errText = await resp.text().catch(() => '');
        return {
          success: false,
          message: `Error ${resp.status}: ${resp.statusText}${errText ? ` — ${errText}` : ''}`
        };
      }

      // Intentar parsear json de respuesta
      const data: any = await resp.json().catch(() => ({}));
      // Normalizar usuario
      const userObj = data?.user ?? data ?? {};
      const user = {
        id: userObj.id ?? userObj.userId ?? userObj._id ?? credentials.email,
        email: userObj.email ?? credentials.email,
        name: userObj.name ?? userObj.fullName ?? 'Usuario'
      };

      // Guardar info básica y token si viene
      localStorage.setItem('auth_provider', 'credentials');
      localStorage.setItem('userEmail', user.email);
      localStorage.setItem('userId', String(user.id));
      if (data?.token) localStorage.setItem('auth_token', String(data.token));

      return {
        success: true,
        message: '¡Bienvenido de vuelta!',
        user
      };
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

  // Evitamos inicializar aquí para no duplicar init; lo haremos en setupGoogleButton

  const loginWithGoogle = useCallback(async (): Promise<LoginResponse> => {
  // Mantenemos por compatibilidad; ahora el flujo recomendado es el botón oficial (setupGoogleButton)
  return { success: false, message: 'Usa el botón de Google para iniciar sesión' };
  }, [googleReady]);

  // Renderizar botón oficial de Google con callback de resultado
  const setupGoogleButton = useCallback(
    (
      container: HTMLElement,
      onResult: (res: LoginResponse) => void
    ) => {
      const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID as string | undefined;
      if (!clientId || !window.google?.accounts?.id) {
        // Aún no está listo; evita mostrar error en UI inicial
        return false;
      }
      // Reinicializar siempre para asegurar que funcione
      window.google.accounts.id.initialize({
        client_id: clientId,
        callback: (response: any) => {
          const credential = response?.credential as string | undefined;
          if (!credential) {
            onResult({ success: false, message: 'No se recibió credencial de Google' });
            return;
          }
          const payload = decodeJwt<GoogleJwtPayload>(credential);
          if (!payload || payload.aud !== clientId) {
            onResult({ success: false, message: 'Token inválido' });
            return;
          }
          localStorage.setItem('auth_provider', 'google');
          localStorage.setItem('userEmail', payload.email ?? '');
          localStorage.setItem('userId', payload.sub);
          localStorage.setItem('userName', payload.name ?? '');
          localStorage.setItem('userPicture', payload.picture ?? '');
          localStorage.setItem('google_credential', credential);
          onResult({
            success: true,
            message: 'Inicio con Google exitoso',
            user: { id: payload.sub, email: payload.email ?? '', name: payload.name ?? 'Usuario Google' }
          });
        }
      });
      // Render oficial full-width
      window.google.accounts.id.renderButton(container, {
        type: 'standard',
        theme: 'filled_blue',
        size: 'large',
        text: 'continue_with',
        shape: 'pill',
        width: '100%'
      });
      return true;
    },
    []
  );

  return {
    login,
    isLoading,
    showPassword,
    togglePasswordVisibility,
    loginWithGoogle,
    googleReady,
    setupGoogleButton,
  };
};