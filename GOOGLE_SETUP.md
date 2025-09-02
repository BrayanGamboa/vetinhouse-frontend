# 🔐 Configuración de Google OAuth - VetInHouse

## Pasos para habilitar el login con Google

### 1. Crear proyecto en Google Cloud Console

1. Ve a [Google Cloud Console](https://console.cloud.google.com/)
2. Crea un nuevo proyecto o selecciona uno existente
3. Anota el **Project ID**

### 2. Habilitar APIs necesarias

1. Ve a **"APIs y servicios"** > **"Biblioteca"**
2. Busca y habilita:
   - **Google Identity Services API**
   - **Google+ API** (opcional, para datos adicionales)

### 3. Crear credenciales OAuth 2.0

1. Ve a **"APIs y servicios"** > **"Credenciales"**
2. Haz clic en **"+ CREAR CREDENCIALES"** > **"ID de cliente de OAuth 2.0"**
3. Si es la primera vez, configura la **pantalla de consentimiento OAuth**:
   - Tipo: **Externo**
   - Nombre de la aplicación: **VetInHouse**
   - Email de soporte: tu email
   - Dominio autorizado: `localhost` (para desarrollo)

### 4. Configurar el cliente OAuth

1. Selecciona **"Aplicación web"**
2. Configura:
   - **Nombre**: `VetInHouse Frontend`
   - **Orígenes JavaScript autorizados**:
     ```
     http://localhost:3002
     http://localhost:3000
     https://tu-dominio-produccion.com
     ```
   - **URIs de redirección autorizados**: (dejar vacío para Google Identity Services)

### 5. Obtener el Client ID

1. Después de crear, copia el **Client ID** (termina en `.apps.googleusercontent.com`)
2. **NO compartas** el Client Secret públicamente

### 6. Configurar en el proyecto

1. Edita el archivo `.env` en la raíz del proyecto:
   ```bash
   VITE_GOOGLE_CLIENT_ID=tu_client_id_aqui.apps.googleusercontent.com
   ```

2. Reinicia el servidor de desarrollo:
   ```bash
   npm run dev
   ```

### 7. Probar la integración

1. Ve a `http://localhost:3002/login`
2. Deberías ver el botón oficial de Google
3. Al hacer clic, se abrirá la ventana de autenticación de Google

## ⚠️ Notas importantes

- **Desarrollo**: Usa `http://localhost:3002` en orígenes autorizados
- **Producción**: Agrega tu dominio real a orígenes autorizados
- **Seguridad**: El Client ID es público, pero valida siempre en el backend
- **Datos**: Se guardan en localStorage: email, nombre, foto de perfil

## 🔧 Troubleshooting

### Error: "redirect_uri_mismatch"
- Verifica que `http://localhost:3002` esté en orígenes autorizados
- No agregues URIs de redirección para Google Identity Services

### Error: "invalid_client"
- Verifica que el Client ID sea correcto en `.env`
- Asegúrate de que el proyecto esté habilitado

### Botón no aparece
- Verifica que `VITE_GOOGLE_CLIENT_ID` esté configurado
- Revisa la consola del navegador para errores
- Asegúrate de que las APIs estén habilitadas

## 📞 Soporte

Si tienes problemas, revisa:
1. [Documentación oficial de Google Identity](https://developers.google.com/identity/gsi/web)
2. Consola del navegador para errores específicos
3. Configuración de orígenes autorizados en Google Cloud Console