import { RefreshToken, User, UserRole } from '@kickzone-workspace/entities';
import { Injectable, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { createHash, randomBytes } from 'crypto';
import { UserService } from './user.service';
import { EmailService } from './email.service';
import { TokenService } from './token.service';
import {
  getPasswordSetupEmailTemplate,
  getPasswordResetEmailTemplate,
} from '@kickzone-workspace/utils';

export const ACCESS_TOKEN_MAX_AGE_MS = 15 * 60 * 1000; // 15 minutes
export const REFRESH_TOKEN_MAX_AGE_MS = 2629800000; // ~30.4 days

export interface AdminCreateUserParams {
  name: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
  role: UserRole;
}

export interface AuthTokens {
  access_token: string;
  refresh_token: string;
}

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private emailService: EmailService,
    private tokenService: TokenService,
    @InjectRepository(RefreshToken)
    private refreshTokenRepository: Repository<RefreshToken>
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

  async login(user: User): Promise<AuthTokens> {
    const access_token = this.signAccessToken(user);
    const refresh_token = await this.createRefreshToken(user.id);
    return { access_token, refresh_token };
  }

  async refresh(rawRefreshToken: string): Promise<AuthTokens> {
    const stored = await this.findValidRefreshToken(rawRefreshToken);
    if (!stored) {
      throw new UnauthorizedException('Invalid or expired refresh token');
    }

    const user = await this.userService.getUserById(stored.userId);
    if (!user) {
      await this.revokeRefreshToken(stored);
      throw new UnauthorizedException('Invalid or expired refresh token');
    }

    // Rotate: revoke old token before issuing a new pair
    await this.revokeRefreshToken(stored);

    const access_token = this.signAccessToken(user);
    const refresh_token = await this.createRefreshToken(user.id);
    return { access_token, refresh_token };
  }

  async revokeRefreshTokenByRaw(rawRefreshToken?: string | null): Promise<void> {
    if (!rawRefreshToken) {
      return;
    }
    const stored = await this.findRefreshTokenByRaw(rawRefreshToken);
    if (stored && !stored.revokedAt) {
      await this.revokeRefreshToken(stored);
    }
  }

  async revokeAllUserRefreshTokens(userId: string): Promise<void> {
    await this.refreshTokenRepository.update(
      { userId, revokedAt: undefined },
      { revokedAt: new Date() }
    );
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
      throw new BadRequestException('User not found');
    }

    const token = await this.tokenService.generateToken(
      user.id,
      email,
      user.role,
      'password_setup'
    );
    const setupLink = `${baseUrl}/setup-password/${token}`;
    const locale = (user.locale as 'en' | 'fa') || 'en';
    const { subject, html } = getPasswordSetupEmailTemplate(setupLink, locale);

    await this.emailService.sendEmail(email, subject, html);
  }

  private assertPasswordPolicy(password: unknown): void {
    if (typeof password !== 'string' || password.length < 8) {
      throw new BadRequestException('Password must be at least 8 characters');
    }
  }

  async setupPassword(token: string, newPassword: string): Promise<User> {
    this.assertPasswordPolicy(newPassword);

    const tokenData = await this.tokenService.validateToken(token);
    if (!tokenData) {
      throw new BadRequestException('Invalid or expired token');
    }

    if (tokenData.tokenType !== 'password_setup') {
      throw new BadRequestException('Invalid token type');
    }

    const user = await this.userService.findByEmail(tokenData.email);
    if (!user) {
      throw new BadRequestException('User not found');
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    const updatedUser = await this.userService.updateUser(user.id, { password: hashedPassword });

    // Revoke all existing refresh tokens for this user
    await this.revokeAllUserRefreshTokens(user.id);

    return updatedUser;
  }

  async register(name: string, email: string, password: string): Promise<User> {
    this.assertPasswordPolicy(password);

    // Check if user already exists
    const existingUser = await this.userService.findByEmail(email);
    if (existingUser) {
      throw new BadRequestException('Email already exists');
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
    this.assertPasswordPolicy(params.password);

    const existingUser = await this.userService.findByEmail(params.email);
    if (existingUser) {
      throw new BadRequestException('Email already exists');
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

    const token = await this.tokenService.generateToken(
      user.id,
      email,
      user.role,
      'password_reset'
    );
    const resetLink = `${baseUrl}/reset-password/${token}`;
    const locale = (user.locale as 'en' | 'fa') || 'en';
    const { subject, html } = getPasswordResetEmailTemplate(resetLink, locale);

    await this.emailService.sendEmail(email, subject, html);
  }

  async resetPassword(token: string, newPassword: string): Promise<User> {
    this.assertPasswordPolicy(newPassword);

    const tokenData = await this.tokenService.validateToken(token);
    if (!tokenData) {
      throw new BadRequestException('Invalid or expired token');
    }

    if (tokenData.tokenType !== 'password_reset') {
      throw new BadRequestException('Invalid token type');
    }

    const user = await this.userService.findByEmail(tokenData.email);
    if (!user) {
      throw new BadRequestException('User not found');
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    const updatedUser = await this.userService.updateUser(user.id, { password: hashedPassword });

    // Revoke all existing refresh tokens for this user
    await this.revokeAllUserRefreshTokens(user.id);

    return updatedUser;
  }

  private signAccessToken(user: User): string {
    const payload = {
      email: user.email,
      sub: user.id,
      role: user.role,
    };
    return this.jwtService.sign(payload);
  }

  private hashRefreshToken(rawToken: string): string {
    return createHash('sha256').update(rawToken).digest('hex');
  }

  private async createRefreshToken(userId: string): Promise<string> {
    const rawToken = randomBytes(48).toString('base64url');
    const tokenHash = this.hashRefreshToken(rawToken);
    const expiresAt = new Date(Date.now() + REFRESH_TOKEN_MAX_AGE_MS);

    await this.refreshTokenRepository.save(
      this.refreshTokenRepository.create({
        userId,
        tokenHash,
        expiresAt,
      })
    );

    return rawToken;
  }

  private async findRefreshTokenByRaw(
    rawToken: string
  ): Promise<RefreshToken | null> {
    const tokenHash = this.hashRefreshToken(rawToken);
    return this.refreshTokenRepository.findOne({ where: { tokenHash } });
  }

  private async findValidRefreshToken(
    rawToken: string
  ): Promise<RefreshToken | null> {
    const stored = await this.findRefreshTokenByRaw(rawToken);
    if (!stored || stored.revokedAt) {
      return null;
    }
    if (stored.expiresAt.getTime() <= Date.now()) {
      await this.revokeRefreshToken(stored);
      return null;
    }
    return stored;
  }

  private async revokeRefreshToken(stored: RefreshToken): Promise<void> {
    stored.revokedAt = new Date();
    await this.refreshTokenRepository.save(stored);
  }
}