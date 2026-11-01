import { Test, TestingModule } from '@nestjs/testing';
import { DataSource } from 'typeorm';
import { TokenService } from './token.service';
import { createHash } from 'crypto';

describe('TokenService', () => {
  let service: TokenService;
  let mockDataSource: Partial<DataSource>;
  let queryMock: jest.Mock;

  const setupServiceWithDb = async (): Promise<TokenService> => {
    queryMock = jest.fn();
    mockDataSource = { query: queryMock };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TokenService,
        { provide: DataSource, useValue: mockDataSource },
      ],
    }).compile();

    service = module.get(TokenService);
    // Mock the table initialization to succeed immediately
    queryMock.mockResolvedValueOnce([]);
    await service.onModuleInit();
    // Reset mock after initialization
    queryMock.mockReset();
    return service;
  };

  const setupServiceWithoutDb = (): TokenService => {
    return new TokenService(undefined as never);
  };

  afterEach(() => {
    jest.clearAllMocks();
    if (service) {
      service.clearMemoryStore();
    }
  });

  describe('generateToken', () => {
    it('generates a 64-character hex token', async () => {
      const serviceWithoutDb = setupServiceWithoutDb();
      const token = await serviceWithoutDb.generateToken('user-1', 'test@example.com', 'CUSTOMER', 'password_reset');
      expect(token).toMatch(/^[a-f0-9]{64}$/);
    });

    it('stores token in memory when no DataSource', async () => {
      const serviceWithoutDb = setupServiceWithoutDb();
      const token = await serviceWithoutDb.generateToken('user-1', 'test@example.com', 'CUSTOMER', 'password_reset');

      const result = await serviceWithoutDb.validateToken(token);
      expect(result).toEqual({
        userId: 'user-1',
        email: 'test@example.com',
        userType: 'CUSTOMER',
        tokenType: 'password_reset',
        expiresAt: expect.any(Date),
      });
    });

    it('stores hashed token in database when DataSource available', async () => {
      await setupServiceWithDb();
      
      // Mock INSERT
      queryMock.mockResolvedValueOnce([]);

      const token = await service.generateToken('user-1', 'test@example.com', 'CUSTOMER', 'password_reset');

      expect(queryMock).toHaveBeenCalledWith(
        expect.stringContaining('INSERT INTO auth_action_tokens'),
        expect.arrayContaining([
          expect.stringMatching(/^[a-f0-9]{64}$/), // SHA-256 hash
          'user-1',
          'test@example.com',
          'CUSTOMER',
          'password_reset',
          expect.any(Date),
        ])
      );

      // Verify it's the SHA-256 hash of the token, not the raw token
      const insertCall = queryMock.mock.calls.find(call =>
        call[0].includes('INSERT INTO auth_action_tokens')
      );
      const storedHash = insertCall?.[1]?.[0];
      const expectedHash = createHash('sha256').update(token).digest('hex');
      expect(storedHash).toBe(expectedHash);
    });
  });

  describe('validateToken', () => {
    it('returns null for non-existent token (in-memory)', async () => {
      const serviceWithoutDb = setupServiceWithoutDb();
      const result = await serviceWithoutDb.validateToken('nonexistent-token');
      expect(result).toBeNull();
    });

    it('returns null and deletes expired token (in-memory)', async () => {
      const serviceWithoutDb = setupServiceWithoutDb();
      const token = await serviceWithoutDb.generateToken('user-1', 'test@example.com', 'CUSTOMER', 'password_reset');

      // Manually expire the token
      const stored = serviceWithoutDb['tokens'].get(token);

      if (!stored) throw new Error('expected token to be stored');
      stored.expiresAt = new Date(Date.now() - 1000);

      const result = await serviceWithoutDb.validateToken(token);
      expect(result).toBeNull();
    });

    it('validates and consumes token in database (single-use)', async () => {
      await setupServiceWithDb();
      
      const token = 'a'.repeat(64);
      const tokenHash = createHash('sha256').update(token).digest('hex');
      const expiresAt = new Date(Date.now() + 3600000);

      // Mock DELETE RETURNING for first validation (success)
      queryMock.mockResolvedValueOnce([{
        user_id: 'user-1',
        email: 'test@example.com',
        user_type: 'CUSTOMER',
        token_type: 'password_reset',
        expires_at: expiresAt.toISOString(),
      }]);
      // Mock DELETE RETURNING for second validation (already consumed)
      queryMock.mockResolvedValueOnce([]);

      // First validation should succeed
      const result1 = await service.validateToken(token);
      expect(result1).toEqual({
        userId: 'user-1',
        email: 'test@example.com',
        userType: 'CUSTOMER',
        tokenType: 'password_reset',
        expiresAt: expect.any(Date),
      });

      // Second validation should fail (token consumed)
      const result2 = await service.validateToken(token);
      expect(result2).toBeNull();

      // Verify DELETE ... RETURNING was called with correct hash
      expect(queryMock).toHaveBeenCalledWith(
        expect.stringContaining('DELETE FROM auth_action_tokens'),
        [tokenHash]
      );
    });

    it('returns null for expired token in database', async () => {
      await setupServiceWithDb();
      
      const token = 'b'.repeat(64);
      // Mock DELETE RETURNING empty (expired)
      queryMock.mockResolvedValueOnce([]);

      const result = await service.validateToken(token);
      expect(result).toBeNull();
    });

    it('falls back to in-memory when database query fails', async () => {
      await setupServiceWithDb();
      
      // Mock DB query to fail
      queryMock.mockRejectedValueOnce(new Error('DB connection failed'));

      // Add token to in-memory store directly
      const token = 'fallback-token-' + 'c'.repeat(48); // 64 chars
      service['tokens'].set(token, {
        userId: 'user-1',
        email: 'test@example.com',
        userType: 'CUSTOMER',
        tokenType: 'password_reset',
        expiresAt: new Date(Date.now() + 3600000),
      });

      const result = await service.validateToken(token);
      expect(result).toEqual({
        userId: 'user-1',
        email: 'test@example.com',
        userType: 'CUSTOMER',
        tokenType: 'password_reset',
        expiresAt: expect.any(Date),
      });
    });
  });

  describe('Cross-Instance / Process Restart Persistence', () => {
    it('allows a new TokenService instance to validate a token created by another instance (shared DB)', async () => {
      // Instance 1 creates token
      await setupServiceWithDb();
      queryMock.mockResolvedValueOnce([]); // INSERT
      const token1 = await service.generateToken('user-1', 'test@example.com', 'CUSTOMER', 'password_reset');

      // Instance 2 (new service with same DataSource)
      const service2 = new TokenService(mockDataSource as DataSource);
      // Mock table init for instance 2
      queryMock.mockResolvedValueOnce([]);
      await service2.onModuleInit();
      queryMock.mockReset();

      const expiresAt = new Date(Date.now() + 3600000);
      // Mock validation for instance 2
      queryMock
        .mockResolvedValueOnce([{
          user_id: 'user-1',
          email: 'test@example.com',
          user_type: 'CUSTOMER',
          token_type: 'password_reset',
          expires_at: expiresAt.toISOString(),
        }]) // First validation succeeds
        .mockResolvedValueOnce([]); // Second validation fails (consumed)

      // Instance 2 validates the token
      const result = await service2.validateToken(token1);
      expect(result).toEqual({
        userId: 'user-1',
        email: 'test@example.com',
        userType: 'CUSTOMER',
        tokenType: 'password_reset',
        expiresAt: expect.any(Date),
      });

      // Token is consumed, second validation fails
      const result2 = await service2.validateToken(token1);
      expect(result2).toBeNull();
    });
  });

  describe('SHA-256 Hash-at-Rest', () => {
    it('hashToken produces correct SHA-256 hash', () => {
      const serviceWithoutDb = setupServiceWithoutDb();
      const plainToken = 'plaintext-token-for-testing';
      const expectedHash = createHash('sha256').update(plainToken).digest('hex');

      const hash = serviceWithoutDb['hashToken'](plainToken);
      expect(hash).toBe(expectedHash);
      expect(hash).not.toBe(plainToken);
      expect(hash).toMatch(/^[a-f0-9]{64}$/);
    });

    it('stores only SHA-256 hash in database, never plaintext', async () => {
      await setupServiceWithDb();
      queryMock.mockResolvedValueOnce([]); // INSERT

      const token = await service.generateToken('user-1', 'test@example.com', 'CUSTOMER', 'password_reset');

      const insertCall = queryMock.mock.calls.find(call =>
        call[0].includes('INSERT INTO auth_action_tokens')
      );
      const storedHash = insertCall?.[1]?.[0];
      const tokenHash = createHash('sha256').update(token).digest('hex');
      expect(storedHash).toBe(tokenHash);
      expect(storedHash).not.toBe(token);
    });
  });

  describe('Single-Use / Replay Prevention', () => {
    it('consumes token on first validation, rejects replay (database)', async () => {
      await setupServiceWithDb();
      
      const token = 'replay-token-' + 'e'.repeat(51); // 64 chars
      const tokenHash = createHash('sha256').update(token).digest('hex');
      const expiresAt = new Date(Date.now() + 3600000);

      queryMock
        .mockResolvedValueOnce([{
          user_id: 'user-1',
          email: 'test@example.com',
          user_type: 'CUSTOMER',
          token_type: 'password_reset',
          expires_at: expiresAt.toISOString(),
        }]) // First validation
        .mockResolvedValueOnce([]); // Replay attempt

      await service.validateToken(token);
      const replayResult = await service.validateToken(token);

      expect(replayResult).toBeNull();
      expect(queryMock).toHaveBeenCalledTimes(2); // 2x DELETE
    });

    it('in-memory store also prevents replay', async () => {
      const serviceWithoutDb = setupServiceWithoutDb();
      const token = await serviceWithoutDb.generateToken('user-1', 'test@example.com', 'CUSTOMER', 'password_reset');

      const result1 = await serviceWithoutDb.validateToken(token);
      expect(result1).not.toBeNull();

      const result2 = await serviceWithoutDb.validateToken(token);
      expect(result2).toBeNull();
    });
  });

  describe('Expiration', () => {
    it('rejects expired token in database', async () => {
      await setupServiceWithDb();
      
      const token = 'expired-token-' + 'f'.repeat(50); // 64 chars
      // Mock DELETE RETURNING empty (expired)
      queryMock.mockResolvedValueOnce([]);

      const result = await service.validateToken(token);
      expect(result).toBeNull();
    });

    it('rejects expired token in memory and cleans up', async () => {
      const serviceWithoutDb = setupServiceWithoutDb();
      const token = await serviceWithoutDb.generateToken('user-1', 'test@example.com', 'CUSTOMER', 'password_reset');

      // Expire the token
      const stored = serviceWithoutDb['tokens'].get(token);

      if (!stored) throw new Error('expected token to be stored');
      stored.expiresAt = new Date(Date.now() - 1000);

      const result = await serviceWithoutDb.validateToken(token);
      expect(result).toBeNull();
      expect(serviceWithoutDb['tokens'].has(token)).toBe(false);
    });
  });
});