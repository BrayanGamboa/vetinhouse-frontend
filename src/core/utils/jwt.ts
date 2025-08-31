export type GoogleJwtPayload = {
  iss: string; // issuer
  nbf?: number;
  aud: string; // client_id
  sub: string; // user id
  hd?: string;
  email?: string;
  email_verified?: boolean;
  name?: string;
  picture?: string;
  given_name?: string;
  family_name?: string;
  iat: number; // issued at
  exp: number; // expiration
  jti?: string;
};

export function decodeJwt<T = unknown>(token: string): T | null {
  try {
    const [, payload] = token.split('.');
    if (!payload) return null;
    const json = atob(payload.replace(/-/g, '+').replace(/_/g, '/'));
    return JSON.parse(decodeURIComponent(escape(json))) as T;
  } catch {
    return null;
  }
}
