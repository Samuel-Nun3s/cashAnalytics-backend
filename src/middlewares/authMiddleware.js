import JWTUtils from "../utils/jwt.js";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({
        error: true,
        message: 'Token de acesso nao fornecido'
      });
    }

    const [scheme, token] = authHeader.split(' ');

    if (scheme !== 'Bearer' || !token) {
      return res.status(401).json({
        error: true,
        message: 'Formato do token invalido. Use: Bearer <token>'
      });
    }

    const decoded = JWTUtils.verifyAccessToken(token);

    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        isActive: true
      }
    });

    if (!user || !user.isActive) {
      return res.status(401).json({
        error: true,
        message: 'Usuario nao encontrado ou inativo'
      });
    }

    req.user = user;

    next();
  } catch (err) {
    return res.status(401).json({
      error: true,
      message: err.message || 'Token invalido' 
    })
  }
}

export default authMiddleware;