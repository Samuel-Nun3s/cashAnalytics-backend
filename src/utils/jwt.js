import jwt from 'jsonwebtoken';
import config from '../config/environment.js';

class JWTUtils {

  // Gerar Access Token (curta duracao - 15min)
  static generateAccessToken(payload) {
    return jwt.sign(payload, config.jwt.accessSecret, {
      expiresIn: '15min',
      issuer: 'minha-api',
      audience: 'meu-app'
    });
  }

  // Gerar o Refresh Token (longa duracao - 7 dias)
  static generateRefreshToken(payload) {
    return jwt.sign(payload, config.jwt.refreshSecret, {
      expiresIn: '7d',
      issuer: 'minha-api',
      audience: 'meu-app'
    });
  }

  // Verificar Access Token
  static verifyAccessToken(token) {
    try {
      return jwt.verify(token, config.jwt.accessSecret, {
        issuer: 'minha-api',
        audience: 'meu-app'
      });
    } catch (err) {
      throw new Error('Token invalido ou expirado');
    }
  }

  static verifyRefreshToken(token) {
    try {
      return jwt.verify(token, config.jwt.refreshSecret, {
        issuer: 'minha-api',
        audience: 'meu-app'
      });
    } catch (err) {
      throw new Error ('Refresh token invalido ou expirado');
    }
  }
}

export default JWTUtils;
