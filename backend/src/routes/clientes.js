import express from 'express';
import { listarClientes, buscarCliente } from '../controllers/clientesController.js';
const router = express.Router();

router.get('/', listarClientes);
router.get('/buscar', buscarCliente);

export default router; 