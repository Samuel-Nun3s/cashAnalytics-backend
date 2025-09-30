import { dmmfToRuntimeDataModel } from '@prisma/client/runtime/library';
import config from '../config/environment.js';
import AuthService from '../services/authService.js';
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

  // POST /api/auth/login
  static async login(req, res) {
    try {
      const { email, password } = req.body;

      const result = await AuthService.login({ email, password });

      res.cookie('refreshToken', result.refreshToken, {
        httpOnly: true,
        secure: config.server.nodeEnv === 'production',
        sameSite: 'strict',
        maxAge: 7 * 24 * 60 * 60 * 1000
      });

      logger.info(`Usuario logado: ${email}`);

      res.status(200).json({
        success: true,
        message: 'Login realizado com sucesso',
        data: {
          user: result.user,
          accessToken: result.accessToken
        }
      });
    } catch (err) {
      logger.error('Erro no login:', err);

      res.status(401).json({
        error: true,
        message: err.message || 'Erro ao fazer o login'
      });
    }
  }

  // POST /api/auth/refresh
  static async refreshToken(req, res) {
    try {
      const refreshToken = req.cookies.refreshToken || req.body.refreshToken;

      if (!refreshToken) {
        return res.status(401).json({
          error: true,
          message: 'Refresh token nao fornecido'
        });
      }

      const result = await AuthService.refreshToken(refreshToken);

      res.status(200).json({
        success: true,
        message: 'Token renovado com sucesso',
        data: result
      });
    } catch (err) {
      logger.error('Erro no refresh: ', err);

      res.status(401).json({
        error: true,
        message: err.message || 'Erro ao renovar token'
      });
    }
  }

  // POST /api/auth/logout
  static async logout(req, res) {
    try {
      const refreshToken = req.cookies.refreshToken || req.body.refreshToken;

      if (refreshToken) {
        await AuthService.logout(refreshToken);
      }

      res.clearCookie('refreshToken');

      logger.info(`Usuario deslogado ${req.user?.email || 'desconhecido'}`);

      res.status(200).json({
        success: true,
        message: 'Logout realizado com sucesso'
      });
    } catch (err) {
      logger.error('Erro no logout:', err);

      res.status(400).json({
        error: true,
        message: err.message || 'Erro ao fazer logout'
      });
    }
  }

  // POST /api/auth/logout-all
  static async logoutAll(req, res) {
    try {
      await AuthService.logoutAll(req.user.id);

      res.clearCookie('refreshToken');

      logger.info(`Logout geral realizado: ${req.user.email}`);

      res.status(200).json({
        success: true,
        message: 'Logout realizado em todos os dispositivos'
      });
    } catch (err) {
      logger.error('Erro no logout geral:', err);

      res.status(400).json({
        error: true,
        message: err.message || 'Erro ao fazer logout geral'
      });
    }
  }

  // GET /api/auth/me
  static async getProfile(req, res) {
    try {
      res.status(200).json({
        success: true,
        message: 'Perfil do usuario',
        data: {
          user: req.user
        }
      });
    } catch (err) {
      logger.error('Erro ao buscar perfil: ', err);

      res.status(400).json({
        error: true,
        message: err.message || 'Erro ao buscar perfil'
      });
    }
  }
}

export default AuthController;