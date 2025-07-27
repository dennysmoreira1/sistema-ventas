import express from 'express';
import { listarVentas, buscarVenta } from '../controllers/ventasController.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

router.get('/', authenticateToken, listarVentas);
router.get('/buscar', authenticateToken, buscarVenta);

export default router; 