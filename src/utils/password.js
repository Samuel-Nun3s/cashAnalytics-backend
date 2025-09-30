import bcrypt from 'bcryptjs';
import config from '../config/environment.js';

class PasswordUtils {

  // Hash da senha
  static async hashPassword(password) {
    const saltRounds = config.security.bcryptRounds;
    return await bcrypt.hash(password, saltRounds);
  }

  // Verificar senha
  static async verifyPassword(password, hashedPassword) {
    return await bcrypt.compare(password, hashedPassword);
  }

  // Validar forca da senha
  static validatePasswordStrength(password) {
    const minLength = config.security.password.minLength;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    const issues = [];

    if (password.length < minLength) {
      issues.push(`Deve ter pelo menos ${minLength} caracteres`);
    }
    if (!hasUpperCase) {
      issues.push('Deve conter ao menos uma letra maiuscula');
    }
    if (!hasLowerCase) {
      issues.push('Deve conter ao menos uma letra minuscula');
    }
    if (!hasNumbers) {
      issues.push('Deve conter ao menos um numero');
    }
    if (!hasSpecialChar) {
      issues.push('Deve conter ao menos um caractere especial');
    }

    return {
      isValid: issues.length === 0,
      issues
    };
  }
}

export default PasswordUtils;