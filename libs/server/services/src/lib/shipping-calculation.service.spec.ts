import { Test, TestingModule } from '@nestjs/testing';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ShippingCalculationService } from './shipping-calculation.service';
import { PlatformSettings, ShippingStrategy } from '@kickzone-workspace/entities';

describe('ShippingCalculationService', () => {
  let service: ShippingCalculationService;
  let mockSettingsRepository: jest.Mocked<Repository<PlatformSettings>>;

  const mockSettings: PlatformSettings = {
    id: 1,
    freeShippingEnabled: true,
    freeShippingThreshold: 100,
    shippingStrategy: ShippingStrategy.TIERED_DISCOUNT,
    additionalSellerDiscount: 0.5,
    additionalSellerFixedFee: 2.5,
    maxShippingCapEnabled: true,
    maxShippingCap: 15,
    createdAt: new Date(),
    updatedAt: new Date(),
  } as PlatformSettings;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ShippingCalculationService,
        {
          provide: getRepositoryToken(PlatformSettings),
          useValue: {
            findOne: jest.fn().mockResolvedValue(mockSettings),
            create: jest.fn().mockReturnValue(mockSettings),
            save: jest.fn().mockResolvedValue(mockSettings),
          },
        },
      ],
    }).compile();

    service = module.get<ShippingCalculationService>(ShippingCalculationService);
    mockSettingsRepository = module.get(getRepositoryToken(PlatformSettings));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('Free Shipping', () => {
    it('should return totalShippingCost: 0 and appliedFee: 0 for all sellers when free shipping threshold is met', async () => {
      const sellerFees = [
        { sellerId: '1', shippingFee: 5.0, sellerName: 'Seller 1' },
        { sellerId: '2', shippingFee: 3.0, sellerName: 'Seller 2' },
      ];

      const result = await service.calculateShippingCost(150, sellerFees);

      expect(result.totalShippingCost).toBe(0);
      expect(result.freeShippingApplied).toBe(true);
      expect(result.shippingBreakdown).toHaveLength(2);
      result.shippingBreakdown.forEach((item) => {
        expect(item.appliedFee).toBe(0);
        expect(item.originalFee).toBeGreaterThanOrEqual(0);
      });
    });

    it('should return originalFee as number even when shippingFee is 0', async () => {
      const sellerFees = [
        { sellerId: '1', shippingFee: 0, sellerName: 'Free Ship Seller' },
      ];

      const result = await service.calculateShippingCost(150, sellerFees);

      expect(result.totalShippingCost).toBe(0);
      expect(result.shippingBreakdown[0].originalFee).toBe(0);
      expect(result.shippingBreakdown[0].appliedFee).toBe(0);
    });
  });

  describe('Zero Shipping Fee Sellers', () => {
    it('should return 0 for seller with shippingFee: 0 (regular customer)', async () => {
      mockSettingsRepository.findOne.mockResolvedValueOnce({
        ...mockSettings,
        freeShippingEnabled: false,
      });

      const sellerFees = [
        { sellerId: '1', shippingFee: 0, sellerName: 'Free Ship Seller' },
        { sellerId: '2', shippingFee: 10, sellerName: 'Paid Ship Seller' },
      ];

      const result = await service.calculateShippingCost(50, sellerFees);

      expect(result.shippingBreakdown.find((s) => s.sellerId === '1')?.appliedFee).toBe(0);
      expect(result.shippingBreakdown.find((s) => s.sellerId === '2')?.appliedFee).toBeGreaterThan(0);
    });

    it('should return 0 for seller with shippingFee: 0 (VIP customer with TIERED_DISCOUNT)', async () => {
      mockSettingsRepository.findOne.mockResolvedValueOnce({
        ...mockSettings,
        freeShippingEnabled: false,
        shippingStrategy: ShippingStrategy.TIERED_DISCOUNT,
        additionalSellerDiscount: 0.5,
      });

      const sellerFees = [
        { sellerId: '1', shippingFee: 0, sellerName: 'First Seller Free' },
        { sellerId: '2', shippingFee: 10, sellerName: 'Second Seller' },
      ];

      const result = await service.calculateShippingCost(50, sellerFees);

      // First seller (index 0) pays full fee = 0
      expect(result.shippingBreakdown[0].appliedFee).toBe(0);
      // Second seller gets 50% discount on 10 = 5
      expect(result.shippingBreakdown[1].appliedFee).toBe(5);
    });

    it('should return 0 for seller with shippingFee: 0 in FULL_SUM strategy', async () => {
      mockSettingsRepository.findOne.mockResolvedValueOnce({
        ...mockSettings,
        freeShippingEnabled: false,
        shippingStrategy: ShippingStrategy.FULL_SUM,
      });

      const sellerFees = [
        { sellerId: '1', shippingFee: 0, sellerName: 'Free Seller' },
        { sellerId: '2', shippingFee: 5, sellerName: 'Paid Seller' },
      ];

      const result = await service.calculateShippingCost(50, sellerFees);

      expect(result.totalShippingCost).toBe(5);
      expect(result.shippingBreakdown.find((s) => s.sellerId === '1')?.appliedFee).toBe(0);
      expect(result.shippingBreakdown.find((s) => s.sellerId === '2')?.appliedFee).toBe(5);
    });
  });

  describe('Regular Shipping Fees', () => {
    it('should return correct fee for seller with shippingFee: 10 in FULL_SUM', async () => {
      mockSettingsRepository.findOne.mockResolvedValueOnce({
        ...mockSettings,
        freeShippingEnabled: false,
        shippingStrategy: ShippingStrategy.FULL_SUM,
      });

      const sellerFees = [
        { sellerId: '1', shippingFee: 10, sellerName: 'Seller 1' },
      ];

      const result = await service.calculateShippingCost(50, sellerFees);

      expect(result.totalShippingCost).toBe(10);
      expect(result.shippingBreakdown[0].appliedFee).toBe(10);
      expect(result.shippingBreakdown[0].originalFee).toBe(10);
    });

    it('should apply TIERED_DISCOUNT correctly for VIP customer', async () => {
      mockSettingsRepository.findOne.mockResolvedValueOnce({
        ...mockSettings,
        freeShippingEnabled: false,
        shippingStrategy: ShippingStrategy.TIERED_DISCOUNT,
        additionalSellerDiscount: 0.5,
        maxShippingCapEnabled: false, // Disable cap to test full calculation
      });

      const sellerFees = [
        { sellerId: '1', shippingFee: 10, sellerName: 'First Seller' },
        { sellerId: '2', shippingFee: 10, sellerName: 'Second Seller' },
        { sellerId: '3', shippingFee: 10, sellerName: 'Third Seller' },
      ];

      const result = await service.calculateShippingCost(50, sellerFees);

      // First seller: 10 (full)
      // Second: 10 * 0.5 = 5
      // Third: 10 * 0.5 = 5
      // Total: 20
      expect(result.totalShippingCost).toBe(20);
      expect(result.shippingBreakdown[0].appliedFee).toBe(10);
      expect(result.shippingBreakdown[1].appliedFee).toBe(5);
      expect(result.shippingBreakdown[2].appliedFee).toBe(5);
    });

    it('should apply TIERED_FIXED correctly', async () => {
      mockSettingsRepository.findOne.mockResolvedValueOnce({
        ...mockSettings,
        freeShippingEnabled: false,
        shippingStrategy: ShippingStrategy.TIERED_FIXED,
        additionalSellerFixedFee: 2.5,
        maxShippingCapEnabled: false, // Disable cap to test full calculation
      });

      const sellerFees = [
        { sellerId: '1', shippingFee: 10, sellerName: 'First Seller' },
        { sellerId: '2', shippingFee: 10, sellerName: 'Second Seller' },
      ];

      const result = await service.calculateShippingCost(50, sellerFees);

      expect(result.shippingBreakdown[0].appliedFee).toBe(10);
      expect(result.shippingBreakdown[1].appliedFee).toBe(2.5);
      expect(result.totalShippingCost).toBe(12.5);
    });

    it('should apply HIGHEST_ONLY correctly', async () => {
      mockSettingsRepository.findOne.mockResolvedValueOnce({
        ...mockSettings,
        freeShippingEnabled: false,
        shippingStrategy: ShippingStrategy.HIGHEST_ONLY,
        maxShippingCapEnabled: false,
      });

      const sellerFees = [
        { sellerId: '1', shippingFee: 5, sellerName: 'Seller 1' },
        { sellerId: '2', shippingFee: 15, sellerName: 'Seller 2' },
        { sellerId: '3', shippingFee: 10, sellerName: 'Seller 3' },
      ];

      const result = await service.calculateShippingCost(50, sellerFees);

      expect(result.totalShippingCost).toBe(15);
      expect(result.shippingBreakdown[0].appliedFee).toBe(15);
      expect(result.shippingBreakdown[1].appliedFee).toBe(0);
      expect(result.shippingBreakdown[2].appliedFee).toBe(0);
    });

    it('should apply AVERAGE correctly', async () => {
      mockSettingsRepository.findOne.mockResolvedValueOnce({
        ...mockSettings,
        freeShippingEnabled: false,
        shippingStrategy: ShippingStrategy.AVERAGE,
        maxShippingCapEnabled: false,
      });

      const sellerFees = [
        { sellerId: '1', shippingFee: 10, sellerName: 'Seller 1' },
        { sellerId: '2', shippingFee: 20, sellerName: 'Seller 2' },
      ];

      const result = await service.calculateShippingCost(50, sellerFees);

      // Average = (10 + 20) / 2 = 15
      expect(result.totalShippingCost).toBe(15);
      expect(result.shippingBreakdown[0].appliedFee).toBe(15);
      expect(result.shippingBreakdown[1].appliedFee).toBe(0);
    });
  });

  describe('Rounding and Number Coercion', () => {
    it('should round all returned values to 2 decimal places', async () => {
      mockSettingsRepository.findOne.mockResolvedValueOnce({
        ...mockSettings,
        freeShippingEnabled: false,
        shippingStrategy: ShippingStrategy.TIERED_DISCOUNT,
        additionalSellerDiscount: 0.33, // Creates non-round numbers
        maxShippingCapEnabled: false,
      });

      const sellerFees = [
        { sellerId: '1', shippingFee: 10.123, sellerName: 'Seller 1' },
        { sellerId: '2', shippingFee: 5.456, sellerName: 'Seller 2' },
      ];

      const result = await service.calculateShippingCost(50, sellerFees);

      // Check totalShippingCost is rounded
      expect(result.totalShippingCost).toBe(Math.round(result.totalShippingCost * 100) / 100);
      
      // Check each breakdown item is rounded
      result.shippingBreakdown.forEach((item) => {
        expect(item.originalFee).toBe(Math.round(item.originalFee * 100) / 100);
        expect(item.appliedFee).toBe(Math.round(item.appliedFee * 100) / 100);
      });
    });

    it('should coerce null/undefined shippingFee to 0', async () => {
      mockSettingsRepository.findOne.mockResolvedValueOnce({
        ...mockSettings,
        freeShippingEnabled: false,
        shippingStrategy: ShippingStrategy.FULL_SUM,
        maxShippingCapEnabled: false,
      });

      const sellerFees = [
        { sellerId: '1', shippingFee: null as never, sellerName: 'Seller 1' },
        { sellerId: '2', shippingFee: undefined as never, sellerName: 'Seller 2' },
      ];

      const result = await service.calculateShippingCost(50, sellerFees);

      expect(result.totalShippingCost).toBe(0);
      result.shippingBreakdown.forEach((item) => {
        expect(item.originalFee).toBe(0);
        expect(item.appliedFee).toBe(0);
      });
    });
  });

  describe('Max Shipping Cap', () => {
    it('should apply max shipping cap and round results', async () => {
      mockSettingsRepository.findOne.mockResolvedValueOnce({
        ...mockSettings,
        freeShippingEnabled: false,
        shippingStrategy: ShippingStrategy.FULL_SUM,
        maxShippingCapEnabled: true,
        maxShippingCap: 10,
      });

      const sellerFees = [
        { sellerId: '1', shippingFee: 20, sellerName: 'Seller 1' },
        { sellerId: '2', shippingFee: 15, sellerName: 'Seller 2' },
      ];

      const result = await service.calculateShippingCost(50, sellerFees);

      expect(result.totalShippingCost).toBe(10); // Capped at 10
      // Each fee should be proportionally reduced and rounded
      result.shippingBreakdown.forEach((item) => {
        expect(item.appliedFee).toBe(Math.round(item.appliedFee * 100) / 100);
      });
    });
  });
});