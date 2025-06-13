import { User } from '@kickzone-workspace/entities';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { UserService } from './user.service';
import { EmailService } from './email.service';
import { TokenService } from './token.service';
import { getPasswordSetupEmailTemplate } from '@kickzone-workspace/utils';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private emailService: EmailService,
    private tokenService: TokenService
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

  async initiatePasswordSetup(email: string, baseUrl: string): Promise<void> {
    const user = await this.userService.findByEmail(email);
    if (!user) {
      throw new Error('User not found');
    }

    const token = this.tokenService.generateToken(email);
    const setupLink = `${baseUrl}/setup-password/${token}`;
    const { subject, html } = getPasswordSetupEmailTemplate(setupLink);

    await this.emailService.sendEmail(email, subject, html);
  }

  async setupPassword(token: string, newPassword: string): Promise<User> {
    const email = this.tokenService.validateToken(token);
    if (!email) {
      throw new Error('Invalid or expired token');
    }

    const user = await this.userService.findByEmail(email);
    if (!user) {
      throw new Error('User not found');
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    return this.userService.updateUser(user.id, { password: hashedPassword });
  }
}
