import {
  CustomerProfile,
  User,
  UserConnection,
  UserRole,
} from '@kickzone-workspace/entities';
import { RolesGuard } from '@kickzone-workspace/guards';
import {
  UserService,
  AuthService,
  CustomerProfileService,
} from '@kickzone-workspace/services';
import { SetMetadata, UseGuards } from '@nestjs/common';
import {
  Args,
  Query,
  Resolver,
  Mutation,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { Connection } from '@kickzone-workspace/utils';
import { CreateUserInput } from '@kickzone-workspace/inputs';

@Resolver(() => User)
export class UserResolver {
  constructor(
    private userService: UserService,
    private authService: AuthService,
    private customerProfileService: CustomerProfileService
  ) {}

  @Query(() => UserConnection)
  @UseGuards(RolesGuard)
  @SetMetadata('roles', [UserRole.ADMIN])
  async users(
    @Args('first', { nullable: true }) first: number,
    @Args('after', { nullable: true }) after: string,
    @Args('searchTerm', { nullable: true }) searchTerm: string,
    @Args('role', { type: () => UserRole, nullable: true }) role?: UserRole
  ): Promise<Connection<User>> {
    return this.userService.findAllPaginated({
      first,
      after,
      searchTerm,
      role,
    });
  }

  @Query(() => UserConnection)
  @UseGuards(RolesGuard)
  @SetMetadata('roles', [UserRole.ADMIN])
  async customers(
    @Args('first', { nullable: true }) first: number,
    @Args('after', { nullable: true }) after: string,
    @Args('searchTerm', { nullable: true }) searchTerm: string
  ): Promise<Connection<User>> {
    return this.userService.findAllPaginated({
      first,
      after,
      searchTerm,
      role: UserRole.CUSTOMER,
    });
  }

  @ResolveField(() => CustomerProfile, { nullable: true })
  async customerProfile(
    @Parent() user: User
  ): Promise<CustomerProfile | null> {
    return this.customerProfileService.getProfile(user.id);
  }

  @Mutation(() => User)
  async createUser(
    @Args('createUserInput') createUserInput: CreateUserInput
  ): Promise<User> {
    // Public user creation: always create a CUSTOMER, but use all provided fields
    return this.authService.adminCreateUser({
      name: createUserInput.name,
      lastName: createUserInput.lastName,
      username: createUserInput.username,
      email: createUserInput.email,
      password: createUserInput.password,
      role: UserRole.CUSTOMER,
    });
  }

  @Mutation(() => User)
  @UseGuards(RolesGuard)
  @SetMetadata('roles', [UserRole.ADMIN])
  async adminCreateUser(
    @Args('createUserInput') createUserInput: CreateUserInput
  ): Promise<User> {
    return this.authService.adminCreateUser({
      name: createUserInput.name,
      lastName: createUserInput.lastName,
      username: createUserInput.username,
      email: createUserInput.email,
      password: createUserInput.password,
      role: createUserInput.role,
    });
  }
}
