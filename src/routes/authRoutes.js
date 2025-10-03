import { Router } from 'express';
import AuthController from '../controllers/authController.js';
import authMiddleware from '../middlewares/authMiddleware.js';
import { validateLogin, validateRegister } from '../middlewares/validation.js';

const authRoutes = Router();

// Rotas publicas (sem autenticacao)
authRoutes.post('/register', validateRegister, AuthController.register);
authRoutes.post('/login', validateLogin, AuthController.login);
authRoutes.post('/refresh', AuthController.refreshTokens);

// Rotas protegidas (com autenticacao)
authRoutes.post('/logout', authMiddleware, AuthController.logout);
authRoutes.post('/logout-all', authMiddleware, AuthController.logoutAll);
authRoutes.get('/me', authMiddleware, AuthController.getProfile);

export default authRoutes;