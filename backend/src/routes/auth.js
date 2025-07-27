import express from 'express';
import { login, verificarToken, logout } from '../controllers/authController.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

router.post('/login', login);
router.get('/verify', authenticateToken, verificarToken);
router.post('/logout', authenticateToken, logout);

export default router; 