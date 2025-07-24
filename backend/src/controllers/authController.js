import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'tu_secreto_jwt_aqui';

// Función para generar hash de contraseñas
const generateHash = (password) => {
    return bcrypt.hashSync(password, 10);
};

// Usuarios de ejemplo (en producción usarías una base de datos)
const usuarios = [
    {
        id: 1,
        nombre: 'Admin Principal',
        email: 'admin@empresa.com',
        password: generateHash('admin123'),
        rol: 'Administrador',
        permisos: ['usuarios', 'productos', 'ventas', 'reportes', 'configuracion']
    },
    {
        id: 2,
        nombre: 'Juan Pérez',
        email: 'juan@empresa.com',
        password: generateHash('vendedor123'),
        rol: 'Vendedor',
        permisos: ['productos', 'ventas']
    },
    {
        id: 3,
        nombre: 'María García',
        email: 'maria@empresa.com',
        password: generateHash('inventario123'),
        rol: 'Inventario',
        permisos: ['productos']
    }
];

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ error: 'Email y contraseña son requeridos' });
        }

        // Buscar usuario
        const usuario = usuarios.find(u => u.email === email);
        if (!usuario) {
            return res.status(401).json({ error: 'Credenciales incorrectas' });
        }

        // Verificar contraseña
        const passwordValida = await bcrypt.compare(password, usuario.password);
        if (!passwordValida) {
            return res.status(401).json({ error: 'Credenciales incorrectas' });
        }

        // Generar token JWT
        const token = jwt.sign(
            {
                id: usuario.id,
                email: usuario.email,
                rol: usuario.rol,
                permisos: usuario.permisos
            },
            JWT_SECRET,
            { expiresIn: '24h' }
        );

        // Enviar respuesta sin la contraseña
        const { password: _, ...usuarioSinPassword } = usuario;

        res.json({
            success: true,
            token,
            user: {
                ...usuarioSinPassword,
                ultimoAcceso: new Date().toISOString()
            }
        });

    } catch (error) {
        console.error('Error en login:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

export const verificarToken = async (req, res) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];

        if (!token) {
            return res.status(401).json({ error: 'Token no proporcionado' });
        }

        const decoded = jwt.verify(token, JWT_SECRET);
        const usuario = usuarios.find(u => u.id === decoded.id);

        if (!usuario) {
            return res.status(401).json({ error: 'Usuario no encontrado' });
        }

        const { password: _, ...usuarioSinPassword } = usuario;
        res.json({ user: usuarioSinPassword });

    } catch (error) {
        console.error('Error al verificar token:', error);
        res.status(401).json({ error: 'Token inválido' });
    }
};

export const logout = (req, res) => {
    res.json({ success: true, message: 'Sesión cerrada correctamente' });
}; 