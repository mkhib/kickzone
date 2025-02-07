import { User, UserConnection, UserRole } from '@kickzone-workspace/entities';
import { RolesGuard } from '@kickzone-workspace/guards';
import { UserService } from '@kickzone-workspace/services';
import { SetMetadata, UseGuards } from '@nestjs/common';
import { Args, Query, Resolver } from '@nestjs/graphql';
import { Connection } from '@kickzone-workspace/utils';

@Resolver(() => User)
export class UserResolver {
  constructor(private userService: UserService) {}

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
}
