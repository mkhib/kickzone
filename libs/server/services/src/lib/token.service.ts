import { Injectable } from '@nestjs/common';
import { randomBytes } from 'crypto';

@Injectable()
export class TokenService {
  private tokens: Map<string, { email: string; expiresAt: Date }> = new Map();

  generateToken(email: string): string {
    const token = randomBytes(32).toString('hex');
    const expiresAt = new Date();
    expiresAt.setHours(expiresAt.getHours() + 24); // Token expires in 24 hours

    this.tokens.set(token, { email, expiresAt });
    return token;
  }

  validateToken(token: string): string | null {
    const tokenData = this.tokens.get(token);

    if (!tokenData) {
      return null;
    }

    if (new Date() > tokenData.expiresAt) {
      this.tokens.delete(token);
      return null;
    }

    // Remove the token after validation (one-time use)
    this.tokens.delete(token);
    return tokenData.email;
  }
}
