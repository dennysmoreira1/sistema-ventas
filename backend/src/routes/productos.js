import express from 'express';
import { listarProductos, buscarProducto } from '../controllers/productosController.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

router.get('/', authenticateToken, listarProductos);
router.get('/buscar', authenticateToken, buscarProducto);

export default router; 