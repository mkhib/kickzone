// src/user/user.resolver.ts
import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UserService } from '@kickzone-workspace/services';
import { User } from '@kickzone-workspace/entities';
import { CreateUserInput, UpdateUserInput } from '@kickzone-workspace/inputs';

@Resolver(() => User)
export class UserResolver {
  constructor(private userService: UserService) {}

  @Query(() => [User])
  async users(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Query(() => User)
  async user(@Args('id') id: string): Promise<User | null> {
    return this.userService.findById(id);
  }

  @Mutation(() => User)
  async createUser(@Args('input') input: CreateUserInput): Promise<User> {
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
