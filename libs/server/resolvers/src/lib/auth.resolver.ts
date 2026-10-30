import { Resolver, Mutation, Args, Context, Query } from '@nestjs/graphql';
import {
  ACCESS_TOKEN_MAX_AGE_MS,
  AuthService,
  REFRESH_TOKEN_MAX_AGE_MS,
} from '@kickzone-workspace/services';
import { User } from '@kickzone-workspace/entities';
import { Response, Request } from 'express';
import { UnauthorizedException } from '@nestjs/common';
import { ZodValidationPipe } from './zod-validation.pipe';
import {
  emailSchema,
  loginPasswordSchema,
  newPasswordSchema,
  personNameSchema,
  baseUrlSchema,
  tokenSchema,
} from '@kickzone-workspace/validation';

const COOKIE_BASE = {
  httpOnly: true,
  secure: true,
  sameSite: 'none' as const,
  path: '/',
};

function setAuthCookies(
  res: Response,
  accessToken: string,
  refreshToken: string
): void {
  res.cookie('access_token', accessToken, {
    ...COOKIE_BASE,
    maxAge: ACCESS_TOKEN_MAX_AGE_MS,
  });
  res.cookie('refresh_token', refreshToken, {
    ...COOKIE_BASE,
    maxAge: REFRESH_TOKEN_MAX_AGE_MS,
  });
}

function clearAuthCookies(res: Response): void {
  res.clearCookie('access_token', COOKIE_BASE);
  res.clearCookie('refresh_token', COOKIE_BASE);
}

@Resolver()
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Mutation(() => User)
  async login(
    @Args('email', new ZodValidationPipe(emailSchema)) email: string,
    @Args('password', new ZodValidationPipe(loginPasswordSchema)) password: string,
    @Context() context: { res: Response }
  ): Promise<User> {
    const user = await this.authService.validateUser(email, password);
    if (!user) {
      throw new UnauthorizedException();
    }

    const { access_token, refresh_token } = await this.authService.login(user);
    setAuthCookies(context.res, access_token, refresh_token);

    return user;
  }

  @Query(() => User, { nullable: true })
  async me(
    @Context() context: { req: Request; res: Response }
  ): Promise<User | null> {
    const accessToken = context.req.cookies?.['access_token'];
    if (accessToken) {
      const user = await this.authService.verifyToken(accessToken);
      if (user) {
        return user;
      }
    }

    // Access JWT missing/expired — try refresh cookie so page reloads keep the session
    const rawRefreshToken = context.req.cookies?.['refresh_token'];
    if (!rawRefreshToken) {
      return null;
    }

    try {
      const { access_token, refresh_token } =
        await this.authService.refresh(rawRefreshToken);
      setAuthCookies(context.res, access_token, refresh_token);
      return this.authService.verifyToken(access_token);
    } catch {
      clearAuthCookies(context.res);
      return null;
    }
  }

  @Mutation(() => Boolean)
  async refresh(
    @Context() context: { req: Request; res: Response }
  ): Promise<boolean> {
    const rawRefreshToken = context.req.cookies?.['refresh_token'];
    if (!rawRefreshToken) {
      clearAuthCookies(context.res);
      throw new UnauthorizedException('No refresh token');
    }

    try {
      const { access_token, refresh_token } =
        await this.authService.refresh(rawRefreshToken);
      setAuthCookies(context.res, access_token, refresh_token);
      return true;
    } catch (error) {
      clearAuthCookies(context.res);
      throw error;
    }
  }

  @Mutation(() => Boolean)
  async logout(
    @Context() context: { req: Request; res: Response }
  ): Promise<boolean> {
    const rawRefreshToken = context.req.cookies?.['refresh_token'];
    await this.authService.revokeRefreshTokenByRaw(rawRefreshToken);
    clearAuthCookies(context.res);
    return true;
  }

  @Mutation(() => Boolean)
  async initiatePasswordSetup(
    @Args('email', new ZodValidationPipe(emailSchema)) email: string,
    @Args('baseUrl', new ZodValidationPipe(baseUrlSchema)) baseUrl: string
  ): Promise<boolean> {
    await this.authService.initiatePasswordSetup(email, baseUrl);
    return true;
  }

  @Mutation(() => User)
  async setupPassword(
    @Args('token', new ZodValidationPipe(tokenSchema)) token: string,
    @Args('newPassword', new ZodValidationPipe(newPasswordSchema)) newPassword: string
  ): Promise<User> {
    return this.authService.setupPassword(token, newPassword);
  }

  @Mutation(() => User)
  async register(
    @Args('name', new ZodValidationPipe(personNameSchema)) name: string,
    @Args('email', new ZodValidationPipe(emailSchema)) email: string,
    @Args('password', new ZodValidationPipe(newPasswordSchema)) password: string,
    @Context() context: { res: Response }
  ): Promise<User> {
    const user = await this.authService.register(name, email, password);

    // Auto-login after registration
    const { access_token, refresh_token } = await this.authService.login(user);
    setAuthCookies(context.res, access_token, refresh_token);

    return user;
  }

  @Mutation(() => Boolean)
  async forgotPassword(
    @Args('email', new ZodValidationPipe(emailSchema)) email: string,
    @Args('baseUrl', new ZodValidationPipe(baseUrlSchema)) baseUrl: string
  ): Promise<boolean> {
    await this.authService.initiateForgotPassword(email, baseUrl);
    return true;
  }

  @Mutation(() => User)
  async resetPassword(
    @Args('token', new ZodValidationPipe(tokenSchema)) token: string,
    @Args('newPassword', new ZodValidationPipe(newPasswordSchema)) newPassword: string
  ): Promise<User> {
    return this.authService.resetPassword(token, newPassword);
  }
}
