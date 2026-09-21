import { ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { RolesGuard } from './roles.guard';

jest.mock('@kickzone-workspace/entities', () => ({
  UserRole: {
    ADMIN: 'ADMIN',
    SELLER: 'SELLER',
    CUSTOMER: 'CUSTOMER',
  },
}));

jest.mock('@nestjs/graphql', () => ({
  GqlExecutionContext: {
    create: (context: ExecutionContext) => ({
      getContext: () =>
        (
          context as unknown as {
            _gql: { req: { user?: { role: string } } };
          }
        )._gql,
    }),
  },
}));

const UserRole = {
  ADMIN: 'ADMIN',
  SELLER: 'SELLER',
  CUSTOMER: 'CUSTOMER',
} as const;

describe('RolesGuard', () => {
  let guard: RolesGuard;
  let reflector: Reflector;

  const makeContext = (user?: { role: string }): ExecutionContext =>
    ({
      getHandler: () => ({}),
      getClass: () => ({}),
      _gql: { req: { user } },
    } as unknown as ExecutionContext);

  beforeEach(() => {
    reflector = new Reflector();
    guard = new RolesGuard(reflector);
  });

  it('allows access when no roles are required', () => {
    jest.spyOn(reflector, 'get').mockReturnValue(undefined);
    expect(guard.canActivate(makeContext())).toBe(true);
  });

  it('denies access when user is missing', () => {
    jest.spyOn(reflector, 'get').mockReturnValue([UserRole.ADMIN]);
    expect(guard.canActivate(makeContext())).toBe(false);
  });

  it('allows access when user has a required role', () => {
    jest.spyOn(reflector, 'get').mockReturnValue([UserRole.ADMIN]);
    expect(
      guard.canActivate(makeContext({ role: UserRole.ADMIN }))
    ).toBe(true);
  });

  it('denies access when user lacks a required role', () => {
    jest.spyOn(reflector, 'get').mockReturnValue([UserRole.ADMIN]);
    expect(
      guard.canActivate(makeContext({ role: UserRole.CUSTOMER }))
    ).toBe(false);
  });
});
