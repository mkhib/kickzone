import { ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CatalogGuard } from './catalog.guard';
import { SellerInfo } from '@kickzone-workspace/entities';

jest.mock('@kickzone-workspace/entities', () => ({
  UserRole: {
    ADMIN: 'ADMIN',
    SELLER: 'SELLER',
    CUSTOMER: 'CUSTOMER',
  },
  SellerInfo: class SellerInfo {},
}));

jest.mock('@nestjs/graphql', () => ({
  GqlExecutionContext: {
    create: (context: ExecutionContext) => ({
      getContext: () =>
        (
          context as unknown as {
            _gql: { req: { user?: { id: number; role: string } } };
          }
        )._gql,
    }),
  },
}));

describe('CatalogGuard', () => {
  let guard: CatalogGuard;
  let sellerInfoRepo: jest.Mocked<Repository<SellerInfo>>;

  const makeContext = (user?: { id: number; role: string }): ExecutionContext =>
    ({
      getHandler: () => ({}),
      getClass: () => ({}),
      _gql: { req: { user } },
    } as unknown as ExecutionContext);

  beforeEach(() => {
    sellerInfoRepo = {
      findOne: jest.fn(),
    } as unknown as jest.Mocked<Repository<SellerInfo>>;
    guard = new CatalogGuard(sellerInfoRepo);
  });

  it('throws UnauthorizedException when user is not authenticated', async () => {
    await expect(guard.canActivate(makeContext())).rejects.toThrow(
      UnauthorizedException
    );
  });

  it('allows access for ADMIN users without querying seller info', async () => {
    const result = await guard.canActivate(
      makeContext({ id: 1, role: 'ADMIN' })
    );
    expect(result).toBe(true);
    expect(sellerInfoRepo.findOne).not.toHaveBeenCalled();
  });

  it('allows access for SELLER users with canManageCatalog === true', async () => {
    sellerInfoRepo.findOne.mockResolvedValue({
      canManageCatalog: true,
    } as SellerInfo);

    const result = await guard.canActivate(
      makeContext({ id: 2, role: 'SELLER' })
    );
    expect(result).toBe(true);
    expect(sellerInfoRepo.findOne).toHaveBeenCalledWith({
      where: { user: { id: 2 } },
    });
  });

  it('denies access for SELLER users with canManageCatalog === false', async () => {
    sellerInfoRepo.findOne.mockResolvedValue({
      canManageCatalog: false,
    } as SellerInfo);

    const result = await guard.canActivate(
      makeContext({ id: 2, role: 'SELLER' })
    );
    expect(result).toBe(false);
  });

  it('denies access for other roles (e.g. CUSTOMER)', async () => {
    const result = await guard.canActivate(
      makeContext({ id: 3, role: 'CUSTOMER' })
    );
    expect(result).toBe(false);
  });
});
