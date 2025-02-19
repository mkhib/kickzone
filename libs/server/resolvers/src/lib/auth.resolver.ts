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
      secure: process.env['NODE_ENV'] === 'production',
    });

    return user;
  }

  // @Query(() => User, { nullable: true })
  // async me(@Context() context: { req: Request }): Promise<User | null> {
  //   const token = context.req.cookies?.access_token;
  //   if (!token) return null;

  //   try {
  //     const payload = await this.authService.verifyToken(token);
  //     return this.authService.getUserById(payload.sub);
  //   } catch {
  //     return null;
  //   }
  // }

  @Mutation(() => Boolean)
  async logout(@Context() context: { res: Response }): Promise<boolean> {
    context.res.clearCookie('access_token', {
      httpOnly: true,
      secure: process.env['NODE_ENV'] === 'production',
    });
    return true;
  }
}
