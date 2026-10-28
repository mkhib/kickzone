import { Injectable, Optional, OnModuleInit } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { randomBytes, createHash } from 'crypto';

interface TokenData {
  userId: string;
  email: string;
  userType: string;
  tokenType: string;
  expiresAt: Date;
}

@Injectable()
export class TokenService implements OnModuleInit {
  private tokens: Map<string, TokenData> = new Map();
  private tableInitialized = false;

  constructor(
    @Optional()
    @InjectDataSource()
    private readonly dataSource?: DataSource
  ) {}

  async onModuleInit(): Promise<void> {
    if (this.dataSource) {
      await this.ensureTableExists();
    }
  }

  private async ensureTableExists(): Promise<void> {
    if (this.tableInitialized) return;

    try {
      await this.dataSource!.query(`
        CREATE TABLE IF NOT EXISTS auth_action_tokens (
          token_hash VARCHAR(64) PRIMARY KEY,
          user_id VARCHAR(255) NOT NULL,
          email VARCHAR(255) NOT NULL,
          user_type VARCHAR(50) NOT NULL,
          token_type VARCHAR(50) NOT NULL,
          expires_at TIMESTAMPTZ NOT NULL,
          created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
        );
        CREATE INDEX IF NOT EXISTS idx_auth_action_tokens_user_id ON auth_action_tokens(user_id);
        CREATE INDEX IF NOT EXISTS idx_auth_action_tokens_expires_at ON auth_action_tokens(expires_at);
      `);
      this.tableInitialized = true;
    } catch (error) {
      // Table creation might fail in tests without a real database
      // Fall back to in-memory storage
      console.warn('Failed to initialize auth_action_tokens table, falling back to in-memory storage:', error);
    }
  }

  private hashToken(token: string): string {
    return createHash('sha256').update(token).digest('hex');
  }

  async generateToken(
    userId: string,
    email: string,
    userType: string,
    tokenType: string,
    expiresInHours = 24
  ): Promise<string> {
    const token = randomBytes(32).toString('hex');
    const expiresAt = new Date();
    expiresAt.setHours(expiresAt.getHours() + expiresInHours);

    const tokenData: TokenData = {
      userId,
      email,
      userType,
      tokenType,
      expiresAt,
    };

    if (this.dataSource && this.tableInitialized) {
      const tokenHash = this.hashToken(token);
      try {
        await this.storeInDatabase(tokenHash, tokenData);
      } catch (err) {
        console.error('Failed to store token in database:', err);
        // Fall back to in-memory
        this.tokens.set(token, tokenData);
      }
    } else {
      // In-memory fallback for tests or when DB is not available
      this.tokens.set(token, tokenData);
    }

    return token;
  }

  private async storeInDatabase(tokenHash: string, tokenData: TokenData): Promise<void> {
    await this.dataSource!.query(
      `INSERT INTO auth_action_tokens (token_hash, user_id, email, user_type, token_type, expires_at)
       VALUES ($1, $2, $3, $4, $5, $6)`,
      [tokenHash, tokenData.userId, tokenData.email, tokenData.userType, tokenData.tokenType, tokenData.expiresAt]
    );
  }

  async validateToken(token: string): Promise<TokenData | null> {
    const tokenHash = this.hashToken(token);

    if (this.dataSource && this.tableInitialized) {
      return this.validateInDatabase(tokenHash);
    }

    // In-memory fallback
    return this.validateInMemory(token);
  }

  private async validateInDatabase(tokenHash: string): Promise<TokenData | null> {
    try {
      // Atomic consume: DELETE ... RETURNING ensures single-use across instances
      const result = await this.dataSource!.query(
        `DELETE FROM auth_action_tokens
         WHERE token_hash = $1 AND expires_at > NOW()
         RETURNING user_id, email, user_type, token_type, expires_at`,
        [tokenHash]
      );

      if (!result || result.length === 0) {
        return null;
      }

      const row = result[0];
      return {
        userId: row.user_id,
        email: row.email,
        userType: row.user_type,
        tokenType: row.token_type,
        expiresAt: new Date(row.expires_at),
      };
    } catch (error) {
      console.error('Failed to validate token in database:', error);
      // Fall back to in-memory
      return this.validateInMemoryByHash(tokenHash);
    }
  }

  private validateInMemory(token: string): TokenData | null {
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
    return tokenData;
  }

  private validateInMemoryByHash(tokenHash: string): TokenData | null {
    // For in-memory fallback, we need to find by raw token
    // This is only used when DB fails, so we iterate
    for (const [rawToken, tokenData] of this.tokens.entries()) {
      if (this.hashToken(rawToken) === tokenHash) {
        if (new Date() > tokenData.expiresAt) {
          this.tokens.delete(rawToken);
          return null;
        }
        this.tokens.delete(rawToken);
        return tokenData;
      }
    }
    return null;
  }

  // Helper method for tests to clear in-memory storage
  clearMemoryStore(): void {
    this.tokens.clear();
  }

  // Helper method for tests to check if using database
  isUsingDatabase(): boolean {
    return !!(this.dataSource && this.tableInitialized);
  }
}