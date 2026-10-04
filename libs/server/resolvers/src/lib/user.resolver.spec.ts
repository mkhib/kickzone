import { UserResolver } from './user.resolver';
import { CustomerProfile, User, UserRole } from '@kickzone-workspace/entities';

describe('UserResolver', () => {
  let resolver: UserResolver;
  let mockUserService: {
    findAllPaginated: jest.Mock;
    createUser: jest.Mock;
  };
  let mockAuthService: {
    adminCreateUser: jest.Mock;
  };
  let mockCustomerProfileService: {
    getProfile: jest.Mock;
  };

  beforeEach(() => {
    mockUserService = {
      findAllPaginated: jest.fn(),
      createUser: jest.fn(),
    };
    mockAuthService = {
      adminCreateUser: jest.fn(),
    };
    mockCustomerProfileService = {
      getProfile: jest.fn(),
    };

    resolver = new UserResolver(
      mockUserService as any,
      mockAuthService as any,
      mockCustomerProfileService as any
    );
  });

  it('queries customers with role CUSTOMER', async () => {
    mockUserService.findAllPaginated.mockResolvedValue({
      edges: [],
      pageInfo: { hasNextPage: false, hasPreviousPage: false },
      totalCount: 0,
    });

    await resolver.customers(50, 'cursor-1', 'john');

    expect(mockUserService.findAllPaginated).toHaveBeenCalledWith({
      first: 50,
      after: 'cursor-1',
      searchTerm: 'john',
      role: UserRole.CUSTOMER,
    });
  });

  it('queries users with optional role', async () => {
    mockUserService.findAllPaginated.mockResolvedValue({
      edges: [],
      pageInfo: { hasNextPage: false, hasPreviousPage: false },
      totalCount: 0,
    });

    await resolver.users(20, undefined, undefined, UserRole.ADMIN);

    expect(mockUserService.findAllPaginated).toHaveBeenCalledWith({
      first: 20,
      after: undefined,
      searchTerm: undefined,
      role: UserRole.ADMIN,
    });
  });

  it('resolves customerProfile by delegating to CustomerProfileService', async () => {
    const mockProfile = {
      id: 'profile-1',
      userId: 'user-1',
      phone: '123456789',
      city: 'Tehran',
    } as CustomerProfile;

    mockCustomerProfileService.getProfile.mockResolvedValue(mockProfile);

    const user = { id: 'user-1' } as User;
    const result = await resolver.customerProfile(user);

    expect(mockCustomerProfileService.getProfile).toHaveBeenCalledWith('user-1');
    expect(result).toBe(mockProfile);
  });
});
