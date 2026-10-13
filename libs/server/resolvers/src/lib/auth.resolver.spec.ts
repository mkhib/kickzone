import { UnauthorizedException } from '@nestjs/common';
import { Response, Request } from 'express';
import { AuthResolver } from './auth.resolver';
import {
  ACCESS_TOKEN_MAX_AGE_MS,
  REFRESH_TOKEN_MAX_AGE_MS,
} from '@kickzone-workspace/services';
import { User, UserRole } from '@kickzone-workspace/entities';

describe('AuthResolver', () => {
  let resolver: AuthResolver;
  let authService: {
    validateUser: jest.Mock;
    login: jest.Mock;
    refresh: jest.Mock;
    revokeRefreshTokenByRaw: jest.Mock;
    verifyToken: jest.Mock;
    register: jest.Mock;
  };
  let res: {
    cookie: jest.Mock;
    clearCookie: jest.Mock;
  };

  const mockUser = {
    id: 'user-1',
    email: 'user@test.com',
    role: UserRole.CUSTOMER,
    name: 'Test',
  } as User;

  beforeEach(() => {
    authService = {
      validateUser: jest.fn(),
      login: jest.fn(),
      refresh: jest.fn(),
      revokeRefreshTokenByRaw: jest.fn(),
      verifyToken: jest.fn(),
      register: jest.fn(),
    };
    res = {
      cookie: jest.fn(),
      clearCookie: jest.fn(),
    };
    resolver = new AuthResolver(authService as any);
  });

  const expectAuthCookies = (access: string, refresh: string) => {
    expect(res.cookie).toHaveBeenCalledWith(
      'access_token',
      access,
      expect.objectContaining({
        httpOnly: true,
        secure: true,
        sameSite: 'none',
        path: '/',
        maxAge: ACCESS_TOKEN_MAX_AGE_MS,
      })
    );
    expect(res.cookie).toHaveBeenCalledWith(
      'refresh_token',
      refresh,
      expect.objectContaining({
        httpOnly: true,
        secure: true,
        sameSite: 'none',
        path: '/',
        maxAge: REFRESH_TOKEN_MAX_AGE_MS,
      })
    );
  };

  describe('login', () => {
    it('sets access and refresh cookies on successful login', async () => {
      authService.validateUser.mockResolvedValue(mockUser);
      authService.login.mockResolvedValue({
        access_token: 'access-1',
        refresh_token: 'refresh-1',
      });

      const result = await resolver.login('user@test.com', 'secret', {
        res: res as unknown as Response,
      });

      expect(result).toBe(mockUser);
      expectAuthCookies('access-1', 'refresh-1');
    });

    it('throws when credentials are invalid', async () => {
      authService.validateUser.mockResolvedValue(null);

      await expect(
        resolver.login('bad@test.com', 'wrong', {
          res: res as unknown as Response,
        })
      ).rejects.toBeInstanceOf(UnauthorizedException);
      expect(res.cookie).not.toHaveBeenCalled();
    });
  });

  describe('register', () => {
    it('auto-logs in and sets both cookies', async () => {
      authService.register.mockResolvedValue(mockUser);
      authService.login.mockResolvedValue({
        access_token: 'access-2',
        refresh_token: 'refresh-2',
      });

      const result = await resolver.register(
        'Test',
        'user@test.com',
        'secret',
        { res: res as unknown as Response }
      );

      expect(result).toBe(mockUser);
      expectAuthCookies('access-2', 'refresh-2');
    });
  });

  describe('refresh', () => {
    it('rotates tokens and sets new cookies', async () => {
      authService.refresh.mockResolvedValue({
        access_token: 'access-new',
        refresh_token: 'refresh-new',
      });

      const result = await resolver.refresh({
        req: {
          cookies: { refresh_token: 'refresh-old' },
        } as unknown as Request,
        res: res as unknown as Response,
      });

      expect(result).toBe(true);
      expect(authService.refresh).toHaveBeenCalledWith('refresh-old');
      expectAuthCookies('access-new', 'refresh-new');
    });

    it('clears cookies and throws when refresh cookie is missing', async () => {
      await expect(
        resolver.refresh({
          req: { cookies: {} } as unknown as Request,
          res: res as unknown as Response,
        })
      ).rejects.toBeInstanceOf(UnauthorizedException);

      expect(res.clearCookie).toHaveBeenCalledWith(
        'access_token',
        expect.objectContaining({ httpOnly: true, path: '/' })
      );
      expect(res.clearCookie).toHaveBeenCalledWith(
        'refresh_token',
        expect.objectContaining({ httpOnly: true, path: '/' })
      );
    });

    it('clears cookies when refresh fails', async () => {
      authService.refresh.mockRejectedValue(
        new UnauthorizedException('Invalid or expired refresh token')
      );

      await expect(
        resolver.refresh({
          req: {
            cookies: { refresh_token: 'bad' },
          } as unknown as Request,
          res: res as unknown as Response,
        })
      ).rejects.toBeInstanceOf(UnauthorizedException);

      expect(res.clearCookie).toHaveBeenCalled();
    });
  });

  describe('logout', () => {
    it('revokes refresh token and clears both cookies', async () => {
      const result = await resolver.logout({
        req: {
          cookies: { refresh_token: 'refresh-1' },
        } as unknown as Request,
        res: res as unknown as Response,
      });

      expect(result).toBe(true);
      expect(authService.revokeRefreshTokenByRaw).toHaveBeenCalledWith(
        'refresh-1'
      );
      expect(res.clearCookie).toHaveBeenCalledWith(
        'access_token',
        expect.any(Object)
      );
      expect(res.clearCookie).toHaveBeenCalledWith(
        'refresh_token',
        expect.any(Object)
      );
    });
  });

  describe('me', () => {
    it('returns user when access token is valid', async () => {
      authService.verifyToken.mockResolvedValue(mockUser);

      const result = await resolver.me({
        req: {
          cookies: { access_token: 'access-ok' },
        } as unknown as Request,
        res: res as unknown as Response,
      });

      expect(result).toBe(mockUser);
      expect(authService.refresh).not.toHaveBeenCalled();
    });

    it('silently refreshes when access token is expired but refresh is valid', async () => {
      authService.verifyToken
        .mockResolvedValueOnce(null)
        .mockResolvedValueOnce(mockUser);
      authService.refresh.mockResolvedValue({
        access_token: 'access-new',
        refresh_token: 'refresh-new',
      });

      const result = await resolver.me({
        req: {
          cookies: {
            access_token: 'access-expired',
            refresh_token: 'refresh-ok',
          },
        } as unknown as Request,
        res: res as unknown as Response,
      });

      expect(authService.refresh).toHaveBeenCalledWith('refresh-ok');
      expectAuthCookies('access-new', 'refresh-new');
      expect(result).toBe(mockUser);
    });

    it('returns null when both tokens are missing', async () => {
      const result = await resolver.me({
        req: { cookies: {} } as unknown as Request,
        res: res as unknown as Response,
      });

      expect(result).toBeNull();
    });

    it('clears cookies and returns null when refresh fails', async () => {
      authService.verifyToken.mockResolvedValue(null);
      authService.refresh.mockRejectedValue(new UnauthorizedException());

      const result = await resolver.me({
        req: {
          cookies: { refresh_token: 'bad' },
        } as unknown as Request,
        res: res as unknown as Response,
      });

      expect(result).toBeNull();
      expect(res.clearCookie).toHaveBeenCalled();
    });
  });
});
