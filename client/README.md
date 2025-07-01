# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

## API Endpoints Backend

### 1. POST `/api/register`
- **Descripción:** Registra un nuevo usuario.
- **Requiere (body JSON):**
  - `email` (string, requerido)
  - `password` (string, requerido)
  - Otros campos opcionales: `firstName`, `lastName`, etc.
- **Respuesta exitosa:**
  - Código 201. Devuelve el usuario creado (sin contraseña).
- **Errores:**
  - 400 si faltan email o password.
  - 409 si el email ya está registrado.
- **Uso esperado:** Crear una cuenta nueva para acceder a la aplicación.

### 2. POST `/api/login`
- **Descripción:** Inicia sesión con email y contraseña.
- **Requiere (body JSON):**
  - `email` (string, requerido)
  - `password` (string, requerido)
- **Respuesta exitosa:**
  - Código 200. Devuelve el usuario autenticado (sin contraseña).
- **Errores:**
  - 400 si faltan datos.
  - 401 si las credenciales son incorrectas.
- **Uso esperado:** Autenticación de usuario y almacenamiento de datos en localStorage.

### 3. GET `/api/users`
- **Descripción:** Obtiene la lista de todos los usuarios registrados.
- **Requiere:** Nada.
- **Respuesta exitosa:**
  - Código 200. Devuelve un array de usuarios (sin contraseñas).
- **Uso esperado:** Panel de administración para ver usuarios.

### 4. GET `/api/palette`
- **Descripción:** Obtiene la paleta de colores activa.
- **Requiere:** Nada.
- **Respuesta exitosa:**
  - Código 200. Devuelve un objeto con los colores activos.
- **Uso esperado:** Personalización visual del sitio.

### 5. POST `/api/palette`
- **Descripción:** Guarda la paleta de colores activa.
- **Requiere (body JSON):**
  - `name` (string, requerido)
  - `primary`, `secondary`, `accent`, `text`, `neutral` (strings, colores)
- **Respuesta exitosa:**
  - Código 200. Mensaje de éxito.
- **Errores:**
  - 400 si falta el nombre.
- **Uso esperado:** Cambiar la apariencia del sitio.

### 6. GET `/api/palettes`
- **Descripción:** Obtiene todas las paletas personalizadas guardadas.
- **Requiere:** Nada.
- **Respuesta exitosa:**
  - Código 200. Devuelve un array de paletas.
- **Uso esperado:** Mostrar opciones de personalización.

### 7. POST `/api/palettes`
- **Descripción:** Guarda una nueva paleta personalizada.
- **Requiere (body JSON):**
  - `name` (string, requerido)
  - `primary`, `secondary`, `accent`, `text`, `neutral` (strings, colores)
- **Respuesta exitosa:**
  - Código 201. Mensaje de éxito y la paleta guardada.
- **Errores:**
  - 400 si falta el nombre.
- **Uso esperado:** Permitir a los usuarios guardar nuevas combinaciones de colores.
