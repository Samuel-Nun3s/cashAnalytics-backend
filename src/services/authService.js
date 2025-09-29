import { Prisma, PrismaClient } from "@prisma/client";
import JWTUtils from '../utils/jwt.js';
import PasswordUtils from '../utils/password.js';
import config from "../config/environment.js";

const prisma = new PrismaClient();

class AuthService {
  static async register({ name, email, password }) {
    try {
      const existingUser = await prisma.user.findUnique({
        where: { email }
      });

      if (existingUser) {
        throw new Error('Email ja esta sendo usado');
      }

      const hashedPassword = await PasswordUtils.hashPassword(password);

      const user = await prisma.user.create({
        data: {
          name,
          email,
          password: hashedPassword
        },
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
          createdAt: true
        }
      });

      return { user };
    } catch (err) {
      throw err;
    }
  }

  static async login({ email, password }) {
    try {
      const user = await prisma.user.findUnique({
        where: { email }
      });

      if (!user) {
        throw new Error('Credencias invalidas');
      }

      if (!user.isActive) {
        throw new Error('Conta desativada. Entre em contato com o suporte');
      }

      const isValidPassword = await PasswordUtils.verifyPassword(password, user.password);

      if (!isValidPassword) {
        throw new Error('Credencias invalidas');
      }

      const tokenPayload = {
        userId: user.id,
        email: user.email,
        role: user.role
      };

      const accessToken = JWTUtils.generateAccessToken(tokenPayload);
      const refreshToken = JWTUtils.generateRefreshToken({ userId: user.id });

      const expiresAt = new Date();
      expiresAt.setDate(expiresAt.getDate() + config.jwt.refreshExpiration);

      await prisma.refreshTokens.create({
        data: {
          token: refreshToken,
          userId: user.id,
          expiresAt
        }
      });

      const { password: _, ...userWithoutPassword } = user;

      return {
        user: userWithoutPassword,
        accessToken,
        refreshToken
      };
    } catch (err) {
      throw err;
    }
  }

  static async refreshToken(refreshToken) {
    try {
      const decoded = JWTUtils.verifyRefreshToken(refreshToken);

      const storedToken = await prisma.refreshTokens.findUnique({
        where: { token: refreshToken },
        include: { user: true }
      });

      if (!storedToken || storedToken.expiresAt < new Date()) {
        throw new Error('Refresh token invalido ou expirado');
      }

      const tokenPayload = {
        userId: storedToken.user.id,
        email: storedToken.user.email,
        role: storedToken.user.role
      };

      const accessToken = JWTUtils.generateAccessToken(tokenPayload);

      return { accessToken };
    } catch (err) {
      throw err;
    }
  }

  static async logout(refreshToken) {
    try {
      await prisma.refreshTokens.deleteMany({
        where: { token: refreshToken }
      });

      return { message: 'Logout realizado com sucesso' };
    } catch (err) {
      throw err;
    }
  }

  static async logoutAll(userId) {
    try {
      await prisma.refreshTokens.deleteMany({
        where: { userId }
      });

      return { message: 'Logout realizado em todos os dispositivos' };
    } catch (err) {
      throw err;
    }
  }
}

export default AuthService;