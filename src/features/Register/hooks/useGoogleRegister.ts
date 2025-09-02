import { useCallback, useEffect, useRef, useState } from 'react';
import { loadScript } from '../../../core/utils/loadScript';
import { decodeJwt, type GoogleJwtPayload } from '../../../core/utils/jwt';

export const useGoogleRegister = () => {
  const [googleReady, setGoogleReady] = useState(false);
  const googleInitRef = useRef(false);

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

  const setupGoogleButton = useCallback(
    (
      container: HTMLElement,
      onGoogleData: (data: { name: string; email: string }) => void
    ) => {
      const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID as string | undefined;
      if (!clientId || !window.google?.accounts?.id) {
        return false;
      }

      if (!googleInitRef.current) {
        window.google.accounts.id.initialize({
          client_id: clientId,
          callback: (response: any) => {
            const credential = response?.credential as string | undefined;
            if (!credential) return;
            
            const payload = decodeJwt<GoogleJwtPayload>(credential);
            if (!payload || payload.aud !== clientId) return;
            
            onGoogleData({
              name: payload.given_name || payload.name?.split(' ')[0] || '',
              email: payload.email || ''
            });
          }
        });
        googleInitRef.current = true;
      }

      window.google.accounts.id.renderButton(container, {
        type: 'standard',
        theme: 'filled_blue',
        size: 'large',
        text: 'signup_with',
        shape: 'pill',
        width: '100%'
      });
      return true;
    },
    []
  );

  return {
    googleReady,
    setupGoogleButton
  };
};