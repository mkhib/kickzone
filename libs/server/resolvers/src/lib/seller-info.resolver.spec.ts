import { Reflector } from '@nestjs/core';
import { ExecutionContext } from '@nestjs/common';
import { RolesGuard } from '@kickzone-workspace/guards';
import { SellerResolver } from './seller-info.resolver';
import { ShippingPaymentMode, UserRole } from '@kickzone-workspace/entities';

jest.mock('@nestjs/graphql', () => {
  const actual = jest.requireActual('@nestjs/graphql');
  return {
    ...actual,
    GqlExecutionContext: {
      create: jest.fn((ctx: ExecutionContext) => ({
        getContext: () => ctx.switchToHttp().getRequest(),
      })),
    },
  };
});

describe('SellerResolver - Admin-Only shippingPaymentMode Guard & Mutation', () => {
  const reflector = new Reflector();
  const guard = new RolesGuard(reflector);

  function mockGqlContext(user?: { id: string; role: UserRole }) {
    return {
      getHandler: () => SellerResolver.prototype.updateSeller,
      switchToHttp: () => ({
        getRequest: () => ({ req: { user } }),
      }),
    } as unknown as ExecutionContext;
  }

  it('allows only ADMIN role to invoke updateSeller (which toggles shippingPaymentMode)', () => {
    expect(
      guard.canActivate(mockGqlContext({ id: '1', role: UserRole.ADMIN })),
    ).toBe(true);
    expect(
      guard.canActivate(mockGqlContext({ id: '2', role: UserRole.SELLER })),
    ).toBe(false);
    expect(
      guard.canActivate(mockGqlContext({ id: '3', role: UserRole.CUSTOMER })),
    ).toBe(false);
    expect(guard.canActivate(mockGqlContext(undefined))).toBe(false);
  });

  it('forwards shippingPaymentMode update to SellerService.update', async () => {
    const sellerService = {
      update: jest.fn(async (input) => ({
        id: input.id,
        storeName: 'Selected Seller',
        shippingFee: 12,
        shippingPaymentMode: input.shippingPaymentMode,
      })),
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const resolver = new SellerResolver(sellerService as any, {} as any);

    const updated = await resolver.updateSeller({
      id: 7,
      shippingPaymentMode: ShippingPaymentMode.PAY_ONLINE,
    });

    expect(sellerService.update).toHaveBeenCalledWith({
      id: 7,
      shippingPaymentMode: ShippingPaymentMode.PAY_ONLINE,
    });
    expect(updated?.shippingPaymentMode).toBe(ShippingPaymentMode.PAY_ONLINE);
  });
});