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
    console.log(`Generated token for ${email}: ${token}`);
    console.log(`Total tokens in store: ${this.tokens.size}`);
    return token;
  }

  validateToken(token: string): string | null {
    console.log(`Validating token: ${token}`);
    console.log(`Total tokens in store: ${this.tokens.size}`);

    const tokenData = this.tokens.get(token);

    if (!tokenData) {
      console.log(`Token not found in store`);
      return null;
    }

    if (new Date() > tokenData.expiresAt) {
      console.log(`Token expired for ${tokenData.email}`);
      this.tokens.delete(token);
      return null;
    }

    // Remove the token after validation (one-time use)
    this.tokens.delete(token);
    console.log(`Token validated successfully for ${tokenData.email}`);
    return tokenData.email;
  }
}
