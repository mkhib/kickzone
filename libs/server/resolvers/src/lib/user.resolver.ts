import { User, UserConnection, UserRole } from '@kickzone-workspace/entities';
import { RolesGuard } from '@kickzone-workspace/guards';
import { UserService, AuthService } from '@kickzone-workspace/services';
import { SetMetadata, UseGuards } from '@nestjs/common';
import { Args, Query, Resolver, Mutation } from '@nestjs/graphql';
import { Connection } from '@kickzone-workspace/utils';
import { CreateUserInput } from '@kickzone-workspace/inputs';

@Resolver(() => User)
export class UserResolver {
  constructor(
    private userService: UserService,
    private authService: AuthService
  ) {}

  @Query(() => UserConnection)
  @UseGuards(RolesGuard)
  @SetMetadata('roles', [UserRole.ADMIN])
  async users(
    @Args('first', { nullable: true }) first: number,
    @Args('after', { nullable: true }) after: string,
    @Args('searchTerm', { nullable: true }) searchTerm: string
  ): Promise<Connection<User>> {
    return this.userService.findAllPaginated({
      first,
      after,
      searchTerm,
    });
  }

  @Mutation(() => User)
  async createUser(
    @Args('createUserInput') createUserInput: CreateUserInput
  ): Promise<User> {
    // Use the register method which handles password hashing
    return this.authService.register(
      createUserInput.name,
      createUserInput.email,
      createUserInput.password
    );
  }
}
