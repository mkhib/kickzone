import { Resolver, Mutation, Args, Context } from '@nestjs/graphql';
import { AuthService } from '@kickzone-workspace/services';
import { User } from '@kickzone-workspace/entities';
import { Response } from 'express';
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
      secure: process.env['NODE_ENV'] === 'production',
    });

    return user;
  }
}
