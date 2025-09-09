import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    port: 3000,
    proxy: {
      '/api': {
        target: 'https://vetinhouse-backend-1.onrender.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
        configure: (proxy, _options) => {
          proxy.on('error', (err, _req, _res) => {
            console.log('proxy error', err);
          });
          proxy.on('proxyReq', (proxyReq, req, _res) => {
            // Importante: no reenviar cookies del navegador al backend para evitar
            // errores tipo "Invalid cookie value" y problemas de CORS/cookies.
            try {
              // @ts-ignore - types of removeHeader may not be present in typing
              proxyReq.removeHeader?.('cookie');
              // Fallback si removeHeader no existe
              // @ts-ignore
              if (proxyReq.getHeader && proxyReq.setHeader) {
                // @ts-ignore
                if (proxyReq.getHeader('cookie')) {
                  // @ts-ignore
                  proxyReq.setHeader('cookie', '');
                }
              }
            } catch {}
            console.log('Sending Request to the Target (no cookies):', req.method, req.url);
          });
          proxy.on('proxyRes', (proxyRes, req, _res) => {
            console.log('Received Response from the Target:', proxyRes.statusCode, req.url);
          });
        },
      }
    }
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src/"),
      "@features": path.resolve(__dirname, "./src/features/"),
    },
  },
});
