/// <reference types="vite/client" />

// Google Maps types
declare global {
  interface Window {
    google: typeof google;
    particlesJS: any;
    L: any;
  }
}
