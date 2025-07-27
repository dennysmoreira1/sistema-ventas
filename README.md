# Sistema de Gestión de Ventas

Un sistema completo de gestión de ventas desarrollado con React (frontend) y Node.js/Express (backend).

## 🚀 Características

- **Autenticación JWT** - Sistema seguro de login/logout
- **Gestión de Usuarios** - Roles y permisos
- **Gestión de Clientes** - CRUD completo
- **Gestión de Productos** - Inventario y categorías
- **Gestión de Ventas** - Registro y control de ventas
- **Reportes** - Ventas y salidas
- **Interfaz Moderna** - Material-UI con diseño responsivo

## 🛠️ Tecnologías

### Frontend
- React 18
- Material-UI (MUI)
- React Router DOM
- Context API para estado global

### Backend
- Node.js
- Express.js
- JWT para autenticación
- bcryptjs para encriptación
- CORS configurado

## 📋 Requisitos Previos

- Node.js >= 18.0.0
- npm >= 9.0.0

## 🔧 Instalación

### 1. Clonar el repositorio
```bash
git clone https://github.com/dennysmoreira1/sistema-ventas.git
cd sistema-ventas
```

### 2. Instalar dependencias
```bash
# Instalar todas las dependencias (backend y frontend)
npm run install:all

# O instalar por separado:
# Backend
cd backend && npm install

# Frontend
cd frontend && npm install
```

### 3. Configurar variables de entorno

#### Backend (.env)
Crear archivo `.env` en la carpeta `backend/`:
```env
NODE_ENV=development
PORT=4000
JWT_SECRET=tu_secreto_jwt_super_seguro_aqui_2024
JWT_EXPIRES_IN=24h
CORS_ORIGIN=http://localhost:3000
```

#### Frontend (.env)
Crear archivo `.env` en la carpeta `frontend/`:
```env
REACT_APP_API_URL=http://localhost:4000/api
```

### 4. Ejecutar el proyecto

#### Desarrollo (ambos servicios)
```bash
npm run dev
```

#### Solo Backend
```bash
npm run dev:backend
```

#### Solo Frontend
```bash
npm run dev:frontend
```

#### Producción
```bash
npm start
```

## 🔐 Credenciales de Prueba

### Usuarios disponibles:
1. **Administrador**
   - Email: `admin@empresa.com`
   - Password: `admin123`
   - Permisos: Todos

2. **Vendedor**
   - Email: `juan@empresa.com`
   - Password: `vendedor123`
   - Permisos: Productos, Ventas

3. **Inventario**
   - Email: `maria@empresa.com`
   - Password: `inventario123`
   - Permisos: Productos

## 🌐 URLs

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:4000/api
- **Health Check**: http://localhost:4000/api/health

## 📁 Estructura del Proyecto

```
sistema-ventas/
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── routes/
│   │   ├── middleware/
│   │   └── index.js
│   ├── package.json
│   └── start.js
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── context/
│   │   └── utils/
│   └── package.json
└── package.json
```

## 🚀 Despliegue

### Backend (Render)
- Configurado para desplegar en Render
- Usar el archivo `render.yaml` para configuración automática

### Frontend (Netlify/Vercel)
- Configurado para desplegar en Netlify o Vercel
- Usar `netlify.toml` o `vercel.json` respectivamente

## 🔧 Scripts Disponibles

```bash
# Desarrollo
npm run dev                    # Ambos servicios
npm run dev:backend           # Solo backend
npm run dev:frontend          # Solo frontend

# Producción
npm start                     # Ambos servicios
npm run start:backend         # Solo backend
npm run start:frontend        # Solo frontend

# Build
npm run build                 # Frontend
npm run build:frontend        # Frontend
npm run build:backend         # Backend

# Testing
npm test                      # Ambos
npm run test:backend          # Backend
npm run test:frontend         # Frontend

# Linting
npm run lint                  # Ambos
npm run lint:backend          # Backend
npm run lint:frontend         # Frontend
```

## 🐛 Solución de Problemas

### Error de CORS
- Verificar que `CORS_ORIGIN` en backend coincida con la URL del frontend

### Error de Autenticación
- Verificar que `JWT_SECRET` esté configurado
- Limpiar localStorage si hay problemas de tokens

### Error de Dependencias
```bash
# Limpiar cache de npm
npm cache clean --force

# Reinstalar dependencias
rm -rf node_modules package-lock.json
npm install
```

## 📝 Licencia

MIT License - ver archivo LICENSE para más detalles.

## 🤝 Contribuir

1. Fork el proyecto
2. Crear una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abrir un Pull Request

## 📞 Soporte

Para soporte, email: soporte@empresa.com o crear un issue en GitHub. 