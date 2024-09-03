import { Request, Response, NextFunction } from 'express';
import { AuthService } from '../services/authService';

const authService = new AuthService();

export function authenticateJWT(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(' ')[1];

    const user = authService.verifyToken(token);

    if (user) {
      req.body.user = user; // Armazena os dados do usuário na requisição
      return next();
    }
  }

  return res.status(403).json({ message: 'Token inválido ou expirado' });
}
