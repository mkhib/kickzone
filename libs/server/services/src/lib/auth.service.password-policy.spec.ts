import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { BadRequestException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RefreshToken, User, UserRole } from '@kickzone-workspace/entities';
import { UserService } from './user.service';
import { EmailService } from './email.service';
import { TokenService } from './token.service';

describe('AuthService - Password Policy', () => {
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

  describe('register', () => {
    it('rejects empty password with BadRequestException', async () => {
      await expect(service.register('Test', 'test@test.com', '')).rejects.toBeInstanceOf(BadRequestException);
      expect(userService.findByEmail).not.toHaveBeenCalled();
      expect(userService.createUser).not.toHaveBeenCalled();
    });

    it('rejects 7-character password with BadRequestException', async () => {
      await expect(service.register('Test', 'test@test.com', 'short7c')).rejects.toBeInstanceOf(BadRequestException);
      expect(userService.findByEmail).not.toHaveBeenCalled();
      expect(userService.createUser).not.toHaveBeenCalled();
    });

    it('accepts 8-character password and creates user', async () => {
      userService.findByEmail.mockResolvedValue(null);
      userService.createUser.mockResolvedValue({ ...mockUser, password: 'hashed-abcdefgh' });

      const result = await service.register('Test', 'test@test.com', 'abcdefgh');

      expect(userService.findByEmail).toHaveBeenCalledWith('test@test.com');
      expect(userService.createUser).toHaveBeenCalledWith(
        expect.objectContaining({
          email: 'test@test.com',
          password: expect.any(String),
        })
      );
      expect(result).toEqual({ ...mockUser, password: 'hashed-abcdefgh' });
    });
  });

  describe('adminCreateUser', () => {
    it('rejects 3-character password with BadRequestException', async () => {
      await expect(
        service.adminCreateUser({
          name: 'Admin',
          lastName: 'User',
          username: 'admin',
          email: 'admin@test.com',
          password: 'abc',
          role: UserRole.ADMIN,
        })
      ).rejects.toBeInstanceOf(BadRequestException);

      expect(userService.findByEmail).not.toHaveBeenCalled();
      expect(userService.createUser).not.toHaveBeenCalled();
    });

    it('accepts 8-character password and creates user', async () => {
      userService.findByEmail.mockResolvedValue(null);
      userService.createUser.mockResolvedValue({
        ...mockUser,
        role: UserRole.ADMIN,
        password: 'hashed-abcdefgh',
      });

      const result = await service.adminCreateUser({
        name: 'Admin',
        lastName: 'User',
        username: 'admin',
        email: 'admin@test.com',
        password: 'abcdefgh',
        role: UserRole.ADMIN,
      });

      expect(userService.findByEmail).toHaveBeenCalledWith('admin@test.com');
      expect(userService.createUser).toHaveBeenCalledWith(
        expect.objectContaining({
          email: 'admin@test.com',
          password: expect.any(String),
        })
      );
      expect(result.role).toBe(UserRole.ADMIN);
    });
  });

  describe('setupPassword', () => {
    it('rejects 3-character password with BadRequestException before token validation', async () => {
      await expect(service.setupPassword('valid-token', 'abc')).rejects.toBeInstanceOf(BadRequestException);

      expect(tokenService.validateToken).not.toHaveBeenCalled();
      expect(userService.findByEmail).not.toHaveBeenCalled();
      expect(userService.updateUser).not.toHaveBeenCalled();
    });

    it('rejects empty password with BadRequestException before token validation', async () => {
      await expect(service.setupPassword('valid-token', '')).rejects.toBeInstanceOf(BadRequestException);

      expect(tokenService.validateToken).not.toHaveBeenCalled();
      expect(userService.findByEmail).not.toHaveBeenCalled();
      expect(userService.updateUser).not.toHaveBeenCalled();
    });

    it('accepts 8-character password and proceeds with token validation', async () => {
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

      const result = await service.setupPassword('valid-token', 'abcdefgh');

      expect(tokenService.validateToken).toHaveBeenCalledWith('valid-token');
      expect(userService.findByEmail).toHaveBeenCalledWith('user@test.com');
      expect(userService.updateUser).toHaveBeenCalledWith('user-1', {
        password: expect.any(String),
      });
      expect(refreshTokenRepository.update).toHaveBeenCalledWith(
        { userId: 'user-1', revokedAt: undefined },
        { revokedAt: expect.any(Date) }
      );
      expect(result.password).toBe('new-hashed');
    });
  });

  describe('resetPassword', () => {
    it('rejects 3-character password with BadRequestException before token validation', async () => {
      await expect(service.resetPassword('valid-token', 'abc')).rejects.toBeInstanceOf(BadRequestException);

      expect(tokenService.validateToken).not.toHaveBeenCalled();
      expect(userService.findByEmail).not.toHaveBeenCalled();
      expect(userService.updateUser).not.toHaveBeenCalled();
    });

    it('rejects empty password with BadRequestException before token validation', async () => {
      await expect(service.resetPassword('valid-token', '')).rejects.toBeInstanceOf(BadRequestException);

      expect(tokenService.validateToken).not.toHaveBeenCalled();
      expect(userService.findByEmail).not.toHaveBeenCalled();
      expect(userService.updateUser).not.toHaveBeenCalled();
    });

    it('accepts 8-character password and proceeds with token validation', async () => {
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

      const result = await service.resetPassword('valid-reset-token', 'abcdefgh');

      expect(tokenService.validateToken).toHaveBeenCalledWith('valid-reset-token');
      expect(userService.findByEmail).toHaveBeenCalledWith('user@test.com');
      expect(userService.updateUser).toHaveBeenCalledWith('user-1', {
        password: expect.any(String),
      });
      expect(refreshTokenRepository.update).toHaveBeenCalledWith(
        { userId: 'user-1', revokedAt: undefined },
        { revokedAt: expect.any(Date) }
      );
      expect(result.password).toBe('new-hashed');
    });
  });
});