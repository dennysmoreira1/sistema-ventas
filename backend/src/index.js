import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRouter from './routes/auth.js';
import clientesRouter from './routes/clientes.js';
import productosRouter from './routes/productos.js';
import ventasRouter from './routes/ventas.js';

dotenv.config();

const app = express();

// Configuración de CORS
const corsOptions = {
    origin: [
        'http://localhost:3000',
        'https://sistema-ventas-frontend.netlify.app',
        process.env.CORS_ORIGIN
    ].filter(Boolean),
    credentials: true,
    optionsSuccessStatus: 200
};

// Middleware
app.use(cors(corsOptions));
app.use(express.json());

// Rutas
app.use('/api/auth', authRouter);
app.use('/api/clientes', clientesRouter);
app.use('/api/productos', productosRouter);
app.use('/api/ventas', ventasRouter);

// Ruta de prueba
app.get('/api/health', (req, res) => {
    res.json({ status: 'OK', message: 'Backend funcionando correctamente' });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`🚀 Backend escuchando en http://localhost:${PORT}`);
    console.log(`📊 Health check: http://localhost:${PORT}/api/health`);
}); 