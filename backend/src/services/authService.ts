import { AppDataSource } from '../data-source';
import { User } from '../entities/User';
import * as jwt from 'jsonwebtoken';

export class AuthService {
  private userRepository = AppDataSource.getRepository(User);

  async register(email: string, password: string): Promise<User> {
    const user = this.userRepository.create({ email, password });
    return await this.userRepository.save(user);
  }

  async login(email: string, password: string): Promise<string | null> {
    const user = await this.userRepository.findOne({ where: { email } });

    if (user && await user.validatePassword(password)) {
      return this.generateToken(user);
    }

    return null;
  }

  private generateToken(user: User): string {
    return jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET!, {
      expiresIn: '1h', // O token expira em 1 hora
    });
  }

  verifyToken(token: string): any {
    try {
      return jwt.verify(token, process.env.JWT_SECRET!);
    } catch (e) {
      return null;
    }
  }
}
