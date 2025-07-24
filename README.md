# Sistema de Gestión de Ventas

Un sistema completo de gestión de ventas desarrollado con React, Node.js y Material-UI.

## 🚀 Características

### 📊 Dashboard Completo
- **Panel General**: Vista general del negocio
- **Gestión de Usuarios**: Administración de usuarios, vendedores, clientes y proveedores
- **Inventario**: Control de categorías, marcas y productos
- **Ventas**: Registro, control y reportes de ventas
- **Finanzas**: Gestión de gastos y reportes financieros
- **Seguridad**: Control de acceso y permisos

### 🔐 Sistema de Autenticación
- **Login seguro** con JWT
- **Roles diferenciados**: Administrador, Vendedor, Inventario
- **Control de permisos** por módulo
- **Sesiones persistentes**

### 📱 Diseño Responsivo
- **Interfaz moderna** con Material-UI
- **Adaptable** a móviles, tablets y desktop
- **Navegación intuitiva** con sidebar

## 🛠️ Tecnologías Utilizadas

### Frontend
- **React 18** - Biblioteca de interfaz de usuario
- **Material-UI 5** - Componentes de UI
- **React Router 6** - Navegación
- **Context API** - Estado global

### Backend
- **Node.js** - Runtime de JavaScript
- **Express.js** - Framework web
- **JWT** - Autenticación
- **bcryptjs** - Encriptación de contraseñas
- **CORS** - Cross-origin resource sharing

## 📦 Instalación

### Prerrequisitos
- Node.js (versión 18 o superior)
- npm o yarn

### Pasos de Instalación

1. **Clonar el repositorio**
```bash
git clone https://github.com/tu-usuario/sistema-ventas.git
cd sistema-ventas
```

2. **Instalar dependencias del backend**
```bash
cd backend
npm install
```

3. **Instalar dependencias del frontend**
```bash
cd ../frontend
npm install
```

4. **Configurar variables de entorno**
```bash
# En el directorio backend, crear archivo .env
cp .env.example .env
# Editar .env con tus configuraciones
```

## 🚀 Ejecución

### Desarrollo

1. **Iniciar el backend**
```bash
cd backend
npm start
# El servidor se ejecutará en http://localhost:4000
```

2. **Iniciar el frontend**
```bash
cd frontend
npm start
# La aplicación se abrirá en http://localhost:3000
```

### Producción

1. **Construir el frontend**
```bash
cd frontend
npm run build
```

2. **Desplegar el backend**
```bash
cd backend
npm run build
npm start
```

## 👥 Usuarios de Demo

### Administrador
- **Email**: admin@empresa.com
- **Contraseña**: admin123
- **Permisos**: Acceso completo al sistema

### Vendedor
- **Email**: juan@empresa.com
- **Contraseña**: vendedor123
- **Permisos**: Gestión de ventas y clientes

### Inventario
- **Email**: maria@empresa.com
- **Contraseña**: inventario123
- **Permisos**: Gestión de productos e inventario

## 📁 Estructura del Proyecto

```
sistema-ventas/
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── routes/
│   │   └── index.js
│   ├── package.json
│   └── .env
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── context/
│   │   └── App.js
│   └── package.json
└── README.md
```

## 🔧 Configuración

### Variables de Entorno (Backend)

Crear archivo `.env` en el directorio `backend/`:

```env
PORT=4000
JWT_SECRET=tu_secreto_jwt_aqui
NODE_ENV=development
```

### Configuración del Frontend

El frontend está configurado para conectarse al backend en `http://localhost:4000` por defecto.

## 🚀 Despliegue

### Heroku

1. **Crear aplicación en Heroku**
2. **Configurar variables de entorno**
3. **Desplegar backend y frontend**

### Vercel

1. **Conectar repositorio a Vercel**
2. **Configurar build settings**
3. **Desplegar automáticamente**

### Netlify

1. **Conectar repositorio a Netlify**
2. **Configurar build command**
3. **Desplegar**

## 🤝 Contribución

1. Fork el proyecto
2. Crear una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abrir un Pull Request

## 📝 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 📞 Soporte

Si tienes alguna pregunta o problema, por favor abre un issue en el repositorio.

## 🙏 Agradecimientos

- Material-UI por los componentes de UI
- React Router por la navegación
- Express.js por el framework del backend

---

**Desarrollado con ❤️ para la gestión eficiente de ventas** 