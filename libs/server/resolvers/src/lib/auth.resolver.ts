import { Resolver, Mutation, Args, Context, Query } from '@nestjs/graphql';
import { AuthService } from '@kickzone-workspace/services';
import { User } from '@kickzone-workspace/entities';
import { Response, Request } from 'express';
import { UnauthorizedException } from '@nestjs/common';

@Resolver()
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Mutation(() => User)
  async login(
    @Args('email') email: string,
    @Args('password') password: string,
    @Context() context: { res: Response }
  ): Promise<User> {
    const user = await this.authService.validateUser(email, password);
    if (!user) {
      throw new UnauthorizedException();
    }

    const { access_token } = await this.authService.login(user);
    context.res.cookie('access_token', access_token, {
      httpOnly: true,
      maxAge: 2629800000,
      sameSite: 'none',
      secure: true,
    });

    return user;
  }

  @Query(() => User, { nullable: true })
  async me(@Context() context: { req: Request }): Promise<User | null> {
    const token = context.req.cookies['access_token'];
    if (!token) return null;

    return this.authService.verifyToken(token);
  }

  @Mutation(() => Boolean)
  async logout(@Context() context: { res: Response }): Promise<boolean> {
    context.res.clearCookie('access_token', {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      path: '/',
    });
    return true;
  }

  @Mutation(() => Boolean)
  async initiatePasswordSetup(
    @Args('email') email: string,
    @Args('baseUrl') baseUrl: string
  ): Promise<boolean> {
    await this.authService.initiatePasswordSetup(email, baseUrl);
    return true;
  }

  @Mutation(() => User)
  async setupPassword(
    @Args('token') token: string,
    @Args('newPassword') newPassword: string
  ): Promise<User> {
    return this.authService.setupPassword(token, newPassword);
  }

  @Mutation(() => User)
  async register(
    @Args('name') name: string,
    @Args('email') email: string,
    @Args('password') password: string,
    @Context() context: { res: Response }
  ): Promise<User> {
    const user = await this.authService.register(name, email, password);

    // Auto-login after registration
    const { access_token } = await this.authService.login(user);
    context.res.cookie('access_token', access_token, {
      httpOnly: true,
      maxAge: 2629800000,
      sameSite: 'none',
      secure: true,
    });

    return user;
  }

  @Mutation(() => Boolean)
  async forgotPassword(
    @Args('email') email: string,
    @Args('baseUrl') baseUrl: string
  ): Promise<boolean> {
    await this.authService.initiateForgotPassword(email, baseUrl);
    return true;
  }

  @Mutation(() => User)
  async resetPassword(
    @Args('token') token: string,
    @Args('newPassword') newPassword: string
  ): Promise<User> {
    return this.authService.resetPassword(token, newPassword);
  }
}
