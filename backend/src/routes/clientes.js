import express from 'express';
import { listarClientes, buscarCliente } from '../controllers/clientesController.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

router.get('/', authenticateToken, listarClientes);
router.get('/buscar', authenticateToken, buscarCliente);

export default router; 