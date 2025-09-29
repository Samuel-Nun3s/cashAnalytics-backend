import AuthService from '../services/authService';
import logger from '../utils/logger.js';

class AuthController {
  
  // POST /api/auth/register
  static async register(req, res) {
    try {
      const { name, email, password } = req.body;

      const result = await AuthService.register({ name, email, password });

      logger.info(`Novo usuario registrado: ${email}`);

      res.status(201).json({
        success: true,
        message: 'Usuario criado com sucesso',
        data: result
      });
    } catch (err) {
      logger.error('Erro no registro:', err);

      res.status(400).json({
        error: true,
        message: err.message || 'Erro ao criar usuario'
      });
    }
  }
}