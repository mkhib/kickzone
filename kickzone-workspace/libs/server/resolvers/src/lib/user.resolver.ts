import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { UserService } from '@kickzone-workspace/services';
import { User } from '@kickzone-workspace/entities';
import { CreateUserInput, UpdateUserInput } from '@kickzone-workspace/inputs';
import { RolesGuard } from '@kickzone-workspace/guards';
import { UserRole } from '@kickzone-workspace/entities';
import { SetMetadata } from '@nestjs/common';

@Resolver(() => User)
export class UserResolver {
  constructor(private userService: UserService) {}

  @Query(() => [User])
  @UseGuards(RolesGuard)
  @SetMetadata('roles', [UserRole.ADMIN])
  async users(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Query(() => User)
  async user(@Args('id') id: string): Promise<User | null> {
    return this.userService.findById(id);
  }

  @Mutation(() => User)
  async createUser(
    @Args('input') input: CreateUserInput
  ): Promise<User | null> {
    return this.userService.create(input);
  }

  @Mutation(() => User)
  async updateUser(
    @Args('id') id: string,
    @Args('input') input: UpdateUserInput
  ): Promise<User | null> {
    return this.userService.update(id, input);
  }
}
