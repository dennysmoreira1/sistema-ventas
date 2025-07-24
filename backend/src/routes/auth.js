import express from 'express';
import { login, verificarToken, logout } from '../controllers/authController.js';

const router = express.Router();

router.post('/login', login);
router.get('/verify', verificarToken);
router.post('/logout', logout);

export default router; 