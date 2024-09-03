import { Request, Response } from 'express';
import { AuthService } from '../services/authService';

const authService = new AuthService();

export class AuthController {
  static async register(req: Request, res: Response) {
    const { email, password } = req.body;

    try {
      const user = await authService.register(email, password);
      return res.status(201).json(user);
    } catch (error) {
      return res.status(400).json({ message: 'Erro ao registrar usuário', error });
    }
  }

  static async login(req: Request, res: Response) {
    const { email, password } = req.body;

    const token = await authService.login(email, password);

    if (token) {
      return res.status(200).json({ token });
    } else {
      return res.status(401).json({ message: 'Credenciais inválidas' });
    }
  }
}
