import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { UnauthorizedException, BadRequestException } from '@nestjs/common';
import { createHash } from 'crypto';
import {
  AuthService,
  REFRESH_TOKEN_MAX_AGE_MS,
} from './auth.service';
import { RefreshToken, User, UserRole } from '@kickzone-workspace/entities';
import { UserService } from './user.service';
import { EmailService } from './email.service';
import { TokenService } from './token.service';

describe('AuthService', () => {
  let service: AuthService;
  let userService: {
    findByEmail: jest.Mock;
    getUserById: jest.Mock;
    createUser: jest.Mock;
    updateUser: jest.Mock;
  };
  let jwtService: { sign: jest.Mock; verify: jest.Mock };
  let refreshTokenRepository: {
    create: jest.Mock;
    save: jest.Mock;
    findOne: jest.Mock;
    update: jest.Mock;
  };
  let tokenService: {
    generateToken: jest.Mock;
    validateToken: jest.Mock;
  };

  const mockUser = {
    id: 'user-1',
    email: 'user@test.com',
    role: UserRole.CUSTOMER,
    name: 'Test',
    lastName: 'User',
    username: 'user@test.com',
    password: 'hashed',
  } as User;

  beforeEach(async () => {
    userService = {
      findByEmail: jest.fn(),
      getUserById: jest.fn(),
      createUser: jest.fn(),
      updateUser: jest.fn(),
    };
    jwtService = {
      sign: jest.fn().mockReturnValue('access.jwt.token'),
      verify: jest.fn(),
    };
    refreshTokenRepository = {
      create: jest.fn((entity) => entity),
      save: jest.fn(async (entity) => ({
        id: 'rt-1',
        ...entity,
      })),
      findOne: jest.fn(),
      update: jest.fn().mockResolvedValue({ affected: 1 }),
    };
    tokenService = {
      generateToken: jest.fn().mockResolvedValue('reset-token-123'),
      validateToken: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: UserService, useValue: userService },
        { provide: JwtService, useValue: jwtService },
        { provide: EmailService, useValue: { sendEmail: jest.fn().mockResolvedValue(undefined) } },
        { provide: TokenService, useValue: tokenService },
        {
          provide: getRepositoryToken(RefreshToken),
          useValue: refreshTokenRepository,
        },
      ],
    }).compile();

    service = module.get(AuthService);
  });

  describe('login', () => {
    it('issues access JWT and stores hashed refresh token', async () => {
      const tokens = await service.login(mockUser);

      expect(jwtService.sign).toHaveBeenCalledWith({
        email: mockUser.email,
        sub: mockUser.id,
        role: mockUser.role,
      });
      expect(tokens.access_token).toBe('access.jwt.token');
      expect(tokens.refresh_token).toEqual(expect.any(String));
      expect(tokens.refresh_token.length).toBeGreaterThan(20);

      expect(refreshTokenRepository.create).toHaveBeenCalledWith(
        expect.objectContaining({
          userId: mockUser.id,
          tokenHash: createHash('sha256')
            .update(tokens.refresh_token)
            .digest('hex'),
        })
      );
      expect(refreshTokenRepository.save).toHaveBeenCalled();

      const saved = refreshTokenRepository.create.mock.calls[0][0];
      const expiresAt = saved.expiresAt as Date;
      const delta = expiresAt.getTime() - Date.now();
      expect(delta).toBeGreaterThan(REFRESH_TOKEN_MAX_AGE_MS - 5_000);
      expect(delta).toBeLessThan(REFRESH_TOKEN_MAX_AGE_MS + 5_000);
    });
  });

  describe('refresh', () => {
    it('rotates refresh token and returns a new pair', async () => {
      const { refresh_token: raw } = await service.login(mockUser);
      const tokenHash = createHash('sha256').update(raw).digest('hex');
      const stored: RefreshToken = {
        id: 'rt-old',
        userId: mockUser.id,
        tokenHash,
        expiresAt: new Date(Date.now() + 60_000),
        createdAt: new Date(),
        revokedAt: null,
        user: mockUser,
      };

      refreshTokenRepository.findOne.mockResolvedValue(stored);
      userService.getUserById.mockResolvedValue(mockUser);
      jwtService.sign.mockReturnValue('new.access.jwt');

      const tokens = await service.refresh(raw);

      expect(tokens.access_token).toBe('new.access.jwt');
      expect(tokens.refresh_token).toEqual(expect.any(String));
      expect(tokens.refresh_token).not.toBe(raw);
      expect(stored.revokedAt).toBeInstanceOf(Date);
      expect(refreshTokenRepository.save).toHaveBeenCalledWith(stored);
      // New refresh token persisted after rotation
      expect(refreshTokenRepository.save.mock.calls.length).toBeGreaterThanOrEqual(2);
    });

    it('rejects missing refresh tokens', async () => {
      refreshTokenRepository.findOne.mockResolvedValue(null);

      await expect(service.refresh('unknown')).rejects.toBeInstanceOf(
        UnauthorizedException
      );
    });

    it('rejects revoked refresh tokens', async () => {
      refreshTokenRepository.findOne.mockResolvedValue({
        id: 'rt-1',
        userId: mockUser.id,
        tokenHash: 'hash',
        expiresAt: new Date(Date.now() + 60_000),
        createdAt: new Date(),
        revokedAt: new Date(),
      });

      await expect(service.refresh('raw')).rejects.toBeInstanceOf(
        UnauthorizedException
      );
    });

    it('rejects and revokes expired refresh tokens', async () => {
      const expired: RefreshToken = {
        id: 'rt-1',
        userId: mockUser.id,
        tokenHash: 'hash',
        expiresAt: new Date(Date.now() - 1_000),
        createdAt: new Date(),
        revokedAt: null,
        user: mockUser,
      };
      refreshTokenRepository.findOne.mockResolvedValue(expired);

      await expect(service.refresh('raw')).rejects.toBeInstanceOf(
        UnauthorizedException
      );
      expect(expired.revokedAt).toBeInstanceOf(Date);
      expect(refreshTokenRepository.save).toHaveBeenCalledWith(expired);
    });

    it('rejects when user no longer exists and revokes the token', async () => {
      const stored: RefreshToken = {
        id: 'rt-1',
        userId: 'missing',
        tokenHash: 'hash',
        expiresAt: new Date(Date.now() + 60_000),
        createdAt: new Date(),
        revokedAt: null,
        user: mockUser,
      };
      refreshTokenRepository.findOne.mockResolvedValue(stored);
      userService.getUserById.mockResolvedValue(null);

      await expect(service.refresh('raw')).rejects.toBeInstanceOf(
        UnauthorizedException
      );
      expect(stored.revokedAt).toBeInstanceOf(Date);
    });
  });

  describe('revokeRefreshTokenByRaw', () => {
    it('no-ops when token is missing', async () => {
      await service.revokeRefreshTokenByRaw(null);
      await service.revokeRefreshTokenByRaw(undefined);
      expect(refreshTokenRepository.findOne).not.toHaveBeenCalled();
    });

    it('revokes an active refresh token', async () => {
      const stored: RefreshToken = {
        id: 'rt-1',
        userId: mockUser.id,
        tokenHash: 'hash',
        expiresAt: new Date(Date.now() + 60_000),
        createdAt: new Date(),
        revokedAt: null,
        user: mockUser,
      };
      refreshTokenRepository.findOne.mockResolvedValue(stored);

      await service.revokeRefreshTokenByRaw('raw-token');

      expect(stored.revokedAt).toBeInstanceOf(Date);
      expect(refreshTokenRepository.save).toHaveBeenCalledWith(stored);
    });

    it('does not re-revoke already revoked tokens', async () => {
      refreshTokenRepository.findOne.mockResolvedValue({
        id: 'rt-1',
        revokedAt: new Date(),
      });

      await service.revokeRefreshTokenByRaw('raw-token');
      expect(refreshTokenRepository.save).not.toHaveBeenCalled();
    });
  });

  describe('revokeAllUserRefreshTokens', () => {
    it('revokes all non-revoked refresh tokens for a user', async () => {
      await service.revokeAllUserRefreshTokens('user-1');

      expect(refreshTokenRepository.update).toHaveBeenCalledWith(
        { userId: 'user-1', revokedAt: undefined },
        { revokedAt: expect.any(Date) }
      );
    });
  });

  describe('verifyToken', () => {
    it('returns user when JWT is valid', async () => {
      jwtService.verify.mockReturnValue({ sub: mockUser.id });
      userService.getUserById.mockResolvedValue(mockUser);

      await expect(service.verifyToken('good')).resolves.toBe(mockUser);
    });

    it('returns null when JWT is invalid', async () => {
      jwtService.verify.mockImplementation(() => {
        throw new Error('jwt expired');
      });

      await expect(service.verifyToken('bad')).resolves.toBeNull();
    });
  });

  describe('initiatePasswordSetup', () => {
    it('generates token and sends email', async () => {
      userService.findByEmail.mockResolvedValue(mockUser);
      tokenService.generateToken.mockReturnValue('setup-token-abc');

      await service.initiatePasswordSetup('user@test.com', 'https://app.example.com');

      expect(tokenService.generateToken).toHaveBeenCalledWith(
        mockUser.id,
        mockUser.email,
        mockUser.role,
        'password_setup'
      );
    });

    it('throws when user not found', async () => {
      userService.findByEmail.mockResolvedValue(null);

      await expect(service.initiatePasswordSetup('unknown@test.com', 'https://app.example.com'))
        .rejects.toBeInstanceOf(BadRequestException);
    });
  });

  describe('setupPassword', () => {
    it('validates token, updates password, and revokes all refresh tokens', async () => {
      const tokenData = {
        userId: 'user-1',
        email: 'user@test.com',
        userType: 'CUSTOMER',
        tokenType: 'password_setup',
        expiresAt: new Date(Date.now() + 3600000),
      };
      tokenService.validateToken.mockResolvedValue(tokenData);
      userService.findByEmail.mockResolvedValue(mockUser);
      userService.updateUser.mockResolvedValue({ ...mockUser, password: 'new-hashed' });

      const result = await service.setupPassword('valid-token', 'NewPass123!');

      expect(tokenService.validateToken).toHaveBeenCalledWith('valid-token');
      expect(userService.updateUser).toHaveBeenCalledWith('user-1', {
        password: expect.any(String),
      });
      expect(refreshTokenRepository.update).toHaveBeenCalledWith(
        { userId: 'user-1', revokedAt: undefined },
        { revokedAt: expect.any(Date) }
      );
      expect(result.password).toBe('new-hashed');
    });

    it('throws BadRequestException for invalid/expired token', async () => {
      tokenService.validateToken.mockResolvedValue(null);

      await expect(service.setupPassword('invalid-token', 'NewPass123!'))
        .rejects.toBeInstanceOf(BadRequestException);

      expect(userService.updateUser).not.toHaveBeenCalled();
      expect(refreshTokenRepository.update).not.toHaveBeenCalled();
    });

    it('throws BadRequestException for wrong token type', async () => {
      tokenService.validateToken.mockResolvedValue({
        userId: 'user-1',
        email: 'user@test.com',
        userType: 'CUSTOMER',
        tokenType: 'password_reset', // Wrong type
        expiresAt: new Date(Date.now() + 3600000),
      });

      await expect(service.setupPassword('wrong-type-token', 'NewPass123!'))
        .rejects.toBeInstanceOf(BadRequestException);
    });

    it('throws BadRequestException when user not found', async () => {
      tokenService.validateToken.mockResolvedValue({
        userId: 'user-1',
        email: 'user@test.com',
        userType: 'CUSTOMER',
        tokenType: 'password_setup',
        expiresAt: new Date(Date.now() + 3600000),
      });
      userService.findByEmail.mockResolvedValue(null);

      await expect(service.setupPassword('valid-token', 'NewPass123!'))
        .rejects.toBeInstanceOf(BadRequestException);
    });

    it('does not revoke tokens or change password when token is invalid', async () => {
      tokenService.validateToken.mockResolvedValue(null);

      await expect(service.setupPassword('invalid-token', 'NewPass123!'))
        .rejects.toBeInstanceOf(BadRequestException);

      expect(userService.updateUser).not.toHaveBeenCalled();
      expect(refreshTokenRepository.update).not.toHaveBeenCalled();
    });
  });

  describe('initiateForgotPassword', () => {
    it('generates token and sends email when user exists', async () => {
      userService.findByEmail.mockResolvedValue(mockUser);
      tokenService.generateToken.mockReturnValue('reset-token-xyz');

      await service.initiateForgotPassword('user@test.com', 'https://app.example.com');

      expect(tokenService.generateToken).toHaveBeenCalledWith(
        mockUser.id,
        mockUser.email,
        mockUser.role,
        'password_reset'
      );
    });

    it('silently returns when user does not exist (security)', async () => {
      userService.findByEmail.mockResolvedValue(null);

      await expect(service.initiateForgotPassword('unknown@test.com', 'https://app.example.com'))
        .resolves.toBeUndefined();
    });
  });

  describe('resetPassword', () => {
    it('validates token, updates password, revokes all refresh tokens, and consumes token', async () => {
      const tokenData = {
        userId: 'user-1',
        email: 'user@test.com',
        userType: 'CUSTOMER',
        tokenType: 'password_reset',
        expiresAt: new Date(Date.now() + 3600000),
      };
      tokenService.validateToken.mockResolvedValue(tokenData);
      userService.findByEmail.mockResolvedValue(mockUser);
      userService.updateUser.mockResolvedValue({ ...mockUser, password: 'new-hashed' });

      const result = await service.resetPassword('valid-reset-token', 'NewPass123!');

      expect(tokenService.validateToken).toHaveBeenCalledWith('valid-reset-token');
      expect(userService.updateUser).toHaveBeenCalledWith('user-1', {
        password: expect.any(String),
      });
      expect(refreshTokenRepository.update).toHaveBeenCalledWith(
        { userId: 'user-1', revokedAt: undefined },
        { revokedAt: expect.any(Date) }
      );
      expect(result.password).toBe('new-hashed');
    });

    it('throws BadRequestException for invalid/expired reset token', async () => {
      tokenService.validateToken.mockResolvedValue(null);

      await expect(service.resetPassword('invalid-token', 'NewPass123!'))
        .rejects.toBeInstanceOf(BadRequestException);

      expect(userService.updateUser).not.toHaveBeenCalled();
      expect(refreshTokenRepository.update).not.toHaveBeenCalled();
    });

    it('throws BadRequestException for wrong token type', async () => {
      tokenService.validateToken.mockResolvedValue({
        userId: 'user-1',
        email: 'user@test.com',
        userType: 'CUSTOMER',
        tokenType: 'password_setup', // Wrong type
        expiresAt: new Date(Date.now() + 3600000),
      });

      await expect(service.resetPassword('wrong-type-token', 'NewPass123!'))
        .rejects.toBeInstanceOf(BadRequestException);
    });

    it('throws BadRequestException when user not found', async () => {
      tokenService.validateToken.mockResolvedValue({
        userId: 'user-1',
        email: 'user@test.com',
        userType: 'CUSTOMER',
        tokenType: 'password_reset',
        expiresAt: new Date(Date.now() + 3600000),
      });
      userService.findByEmail.mockResolvedValue(null);

      await expect(service.resetPassword('valid-token', 'NewPass123!'))
        .rejects.toBeInstanceOf(BadRequestException);
    });

    it('does not revoke tokens or change password when reset token is invalid', async () => {
      tokenService.validateToken.mockResolvedValue(null);

      await expect(service.resetPassword('invalid-token', 'NewPass123!'))
        .rejects.toBeInstanceOf(BadRequestException);

      expect(userService.updateUser).not.toHaveBeenCalled();
      expect(refreshTokenRepository.update).not.toHaveBeenCalled();
    });

    it('does not revoke tokens or change password when reset token is expired', async () => {
      tokenService.validateToken.mockResolvedValue(null); // Expired tokens return null

      await expect(service.resetPassword('expired-token', 'NewPass123!'))
        .rejects.toBeInstanceOf(BadRequestException);

      expect(userService.updateUser).not.toHaveBeenCalled();
      expect(refreshTokenRepository.update).not.toHaveBeenCalled();
    });
  });
});