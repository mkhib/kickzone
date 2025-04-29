import { User } from '@kickzone-workspace/entities';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { UserService } from './user.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService
  ) {}

  async validateUser(email: string, pass: string): Promise<User | null> {
    const user = await this.userService.findByEmail(email);
    if (user && (await bcrypt.compare(pass, user.password))) {
      return user;
    }
    return null;
  }

  async login(user: User) {
    const payload = {
      email: user.email,
      sub: user.id,
      role: user.role,
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async verifyToken(token: string): Promise<User | null> {
    try {
      const decoded = this.jwtService.verify(token);
      // Always get the full user from the database
      return this.userService.getUserById(decoded.sub);
    } catch (_) {
      return null;
    }
  }
}
