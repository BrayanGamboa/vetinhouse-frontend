# ⚛️ React Feature-Based Architecture Boilerplate

A scalable React + Vite + TypeScript boilerplate following **feature-based architecture**.

This project provides a clean, modular structure to help you build large React applications that are easy to maintain, test, and grow over time.

---

## 📁 Project Structure

```bash
src/
├── core/                # Global configuration, assets, styles, context
├── layouts/             # App-wide layouts (Header, Footer, etc.)
├── features/            # Feature-based modules (e.g. Post, Product)
│   └── Post/
│       ├── components/
│       ├── hooks/
│       ├── types/
│       ├── views/
│       └── routes.ts
├── router.ts            # Central route aggregation
└── main.tsx             # App entry point
```

> Each feature folder contains everything it needs: components, views, hooks, types, and routing.

---

## 🚀 Features

- ✅ Feature-based architecture
- ⚡️ Vite for fast development
- 🧠 TypeScript support
- 🔀 Modular routing per feature
- 🎨 Organized global styles and layouts
- 🧱 Clean and scalable file structure

---

## 📦 Tech Stack

- React 19
- Vite
- TypeScript
- React Router DOM (v7)

---

## 🛠️ Getting Started

```bash
# Clonar el repositorio
git clone https://github.com/BrayanGamboa/vetinhouse-frontend

# Instalar dependencias
cd vetinhouse-frontend
npm install

# Configurar variables de entorno
cp .env.example .env
# Editar .env con tu Google Client ID

# Iniciar servidor de desarrollo
npm run dev
```

---

## 📂 Feature Example

Here’s how the `Post` feature is organized:

```bash
features/
└── Post/
    ├── components/
    │   ├── PostItem.tsx
    │   └── PostList.tsx
    ├── hooks/
    │   └── usePost.ts
    ├── types/
    │   └── post.types.ts
    ├── views/
    │   └── PostView.tsx
    └── routes.ts
```

---

## 🌐 Routing Example

Each feature can define its own routes in `routes.ts`, then the app combines all routes centrally:

```tsx
// features/Post/routes.ts
export const postRoutes = [
  { path: "/posts", element: <PostView /> }
];

// router.ts
import { postRoutes } from "@/features/Post/routes";
export const routes = [...postRoutes, ...otherRoutes];
```

---

## 🤝 Contributing

Pull requests and suggestions are welcome!  
If you find this helpful, feel free to star ⭐ the repo or share it with others.

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

## 📬 Contact

Made with ❤️ by [Naser Rasouli]  
GitHub: [@naserrasoulii](https://github.com/naserrasoulii)

---

## 🔐 Configuración de Google OAuth

### Paso 1: Crear proyecto en Google Cloud Console

1. Ve a [Google Cloud Console](https://console.cloud.google.com/)
2. Crea un nuevo proyecto o selecciona uno existente
3. Habilita la **Google Identity API**:
   - Ve a "APIs y servicios" > "Biblioteca"
   - Busca "Google Identity" y habilítala

### Paso 2: Configurar OAuth 2.0

1. Ve a "APIs y servicios" > "Credenciales"
2. Haz clic en "+ CREAR CREDENCIALES" > "ID de cliente de OAuth 2.0"
3. Selecciona "Aplicación web"
4. Configura:
   - **Nombre**: VetInHouse Frontend
   - **Orígenes autorizados**: 
     - `http://localhost:3002` (desarrollo)
     - `https://tu-dominio.com` (producción)
   - **URIs de redirección**: No necesario para Google Identity Services

### Paso 3: Configurar variables de entorno

1. Copia el **Client ID** generado
2. Crea/edita el archivo `.env` en la raíz del proyecto:

```bash
VITE_GOOGLE_CLIENT_ID=tu_client_id_aqui.apps.googleusercontent.com
```

### Paso 4: Probar la integración

1. Reinicia el servidor: `npm run dev`
2. Ve a `http://localhost:3002/login`
3. El botón de Google aparecerá automáticamente

### Notas importantes:
- El token JWT se valida en el frontend para obtener datos básicos
- En producción, valida el token también en el backend
- Los datos se guardan en localStorage: email, nombre, foto de perfil