import express from 'express';
import { listarProductos, buscarProducto } from '../controllers/productosController.js';
const router = express.Router();

router.get('/', listarProductos);
router.get('/buscar', buscarProducto);

export default router; 