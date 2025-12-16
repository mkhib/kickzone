import { User, UserRole } from '@kickzone-workspace/entities';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { UserService } from './user.service';
import { EmailService } from './email.service';
import { TokenService } from './token.service';
import {
  getPasswordSetupEmailTemplate,
  getPasswordResetEmailTemplate,
} from '@kickzone-workspace/utils';

interface AdminCreateUserParams {
  name: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
  role: UserRole;
}

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

    if (user) {
      const isPasswordValid = await bcrypt.compare(pass, user.password);

      if (isPasswordValid) {
        return user;
      }
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
    const locale = (user.locale as 'en' | 'fa') || 'en';
    const { subject, html } = getPasswordSetupEmailTemplate(setupLink, locale);

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

  async register(name: string, email: string, password: string): Promise<User> {
    // Check if user already exists
    const existingUser = await this.userService.findByEmail(email);
    if (existingUser) {
      throw new Error('Email already exists');
    }

    // Create new customer user
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await this.userService.createUser({
      name,
      lastName: '', // Optional for customers
      username: email, // Use email as username
      email,
      password: hashedPassword,
      role: UserRole.CUSTOMER,
    });

    return user;
  }

  async adminCreateUser(params: AdminCreateUserParams): Promise<User> {
    const existingUser = await this.userService.findByEmail(params.email);
    if (existingUser) {
      throw new Error('Email already exists');
    }

    const hashedPassword = await bcrypt.hash(params.password, 10);

    const user = await this.userService.createUser({
      ...params,
      password: hashedPassword,
    });

    return user;
  }

  async initiateForgotPassword(email: string, baseUrl: string): Promise<void> {
    const user = await this.userService.findByEmail(email);
    if (!user) {
      // Don't reveal if email exists for security
      return;
    }

    const token = this.tokenService.generateToken(email);
    const resetLink = `${baseUrl}/reset-password/${token}`;
    const locale = (user.locale as 'en' | 'fa') || 'en';
    const { subject, html } = getPasswordResetEmailTemplate(resetLink, locale);

    await this.emailService.sendEmail(email, subject, html);
  }

  async resetPassword(token: string, newPassword: string): Promise<User> {
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
