import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  PlatformSettings,
  ShippingStrategy,
  ShippingPaymentMode,
} from '@kickzone-workspace/entities';

export interface SellerShippingInfo {
  sellerId: string | number;
  shippingFee: number;
  sellerName?: string;
  shippingPaymentMode?: ShippingPaymentMode | string;
}

export interface ShippingCalculationResult {
  totalShippingCost: number;
  shippingBreakdown: Array<{
    sellerId: string | number;
    sellerName?: string;
    originalFee: number;
    appliedFee: number;
  }>;
  freeShippingApplied: boolean;
  strategyUsed: ShippingStrategy;
}

export function applyShippingMethodMultiplier(
  baseFee: number,
  shippingMethod?: string | null
): number {
  const normalized = String(shippingMethod || 'vip').toLowerCase();
  const safeBase = Number.isFinite(Number(baseFee)) && Number(baseFee) > 0 ? Number(baseFee) : 0;
  if (normalized === 'pickup') {
    return 0;
  }
  if (normalized === 'express') {
    return Math.round(safeBase * 0.45 * 100) / 100;
  }
  return Math.round(safeBase * 100) / 100;
}

@Injectable()
export class ShippingCalculationService {
  private defaultSettings: Partial<PlatformSettings> = {
    freeShippingThreshold: 500.0, // Temporarily increased to test shipping fees
    freeShippingEnabled: false, // Temporarily disabled to test shipping fees
    shippingStrategy: ShippingStrategy.TIERED_DISCOUNT,
    additionalSellerDiscount: 0.5, // 50% discount
    additionalSellerFixedFee: undefined,
    maxShippingCap: 15.0,
    maxShippingCapEnabled: true,
  };

  constructor(
    @InjectRepository(PlatformSettings)
    private platformSettingsRepository: Repository<PlatformSettings>
  ) {}

  /**
   * Calculate shipping costs for multi-seller cart
   * Implements smart shipping strategies similar to Amazon/eBay
   * PAY_ON_DELIVERY sellers are excluded from online shipping calculation
   */
  async calculateShippingCost(
    cartSubtotal: number,
    sellerShippingFees: SellerShippingInfo[]
  ): Promise<ShippingCalculationResult> {
    // Get platform settings or use defaults
    const settings = await this.getPlatformSettings();

    // Separate PAY_ON_DELIVERY and PAY_ONLINE sellers
    // Only explicitly PAY_ON_DELIVERY (case-insensitive) are treated as COD; missing/undefined = PAY_ONLINE (legacy behavior)
    const onlineSellers = sellerShippingFees.filter(
      (s) =>
        s.shippingPaymentMode !== undefined &&
        s.shippingPaymentMode !== null &&
        String(s.shippingPaymentMode).toUpperCase() === ShippingPaymentMode.PAY_ON_DELIVERY
          ? false
          : true
    );

    // Check for free shipping threshold (applies only to online sellers)
    if (
      settings.freeShippingEnabled &&
      settings.freeShippingThreshold &&
      cartSubtotal >= settings.freeShippingThreshold
    ) {
      return {
        totalShippingCost: 0,
        shippingBreakdown: sellerShippingFees.map((seller) => ({
          sellerId: seller.sellerId,
          sellerName: seller.sellerName,
          originalFee: Number(seller.shippingFee) || 0,
          appliedFee: 0,
        })),
        freeShippingApplied: true,
        strategyUsed: settings.shippingStrategy,
      };
    }

    // Calculate shipping based on strategy for ONLINE sellers only
    let onlineBreakdown: ShippingCalculationResult['shippingBreakdown'] = [];
    let totalShippingCost = 0;

    const computeStrategy = (
      sellers: SellerShippingInfo[]
    ): ShippingCalculationResult['shippingBreakdown'] => {
      switch (settings.shippingStrategy) {
        case ShippingStrategy.FULL_SUM:
          return sellers.map((seller) => ({
            sellerId: seller.sellerId,
            sellerName: seller.sellerName,
            originalFee: Number(seller.shippingFee) || 0,
            appliedFee: Number(seller.shippingFee) || 0,
          }));

        case ShippingStrategy.TIERED_DISCOUNT: {
          return sellers.map((seller, index) => {
            const originalFee = Number(seller.shippingFee) || 0;
            if (index === 0) {
              return {
                sellerId: seller.sellerId,
                sellerName: seller.sellerName,
                originalFee,
                appliedFee: originalFee,
              };
            } else {
              const discount = settings.additionalSellerDiscount || 0;
              const appliedFee = originalFee * (1 - discount);
              return {
                sellerId: seller.sellerId,
                sellerName: seller.sellerName,
                originalFee,
                appliedFee: Math.max(0, Math.round(appliedFee * 100) / 100),
              };
            }
          });
        }

        case ShippingStrategy.TIERED_FIXED: {
          const fixedFee = Number(settings.additionalSellerFixedFee) || 0;
          return sellers.map((seller, index) => {
            const originalFee = Number(seller.shippingFee) || 0;
            if (index === 0) {
              return {
                sellerId: seller.sellerId,
                sellerName: seller.sellerName,
                originalFee,
                appliedFee: originalFee,
              };
            } else {
              return {
                sellerId: seller.sellerId,
                sellerName: seller.sellerName,
                originalFee,
                appliedFee: Math.round(fixedFee * 100) / 100,
              };
            }
          });
        }

        case ShippingStrategy.HIGHEST_ONLY: {
          const fees = sellers.map((s) => Number(s.shippingFee) || 0);
          const highestFee = Math.max(...fees, 0);
          return sellers.map((seller, index) => {
            const originalFee = Number(seller.shippingFee) || 0;
            return {
              sellerId: seller.sellerId,
              sellerName: seller.sellerName,
              originalFee,
              appliedFee: index === 0 ? Math.round(highestFee * 100) / 100 : 0,
            };
          });
        }

        case ShippingStrategy.AVERAGE: {
          const fees = sellers.map((s) => Number(s.shippingFee) || 0);
          const averageFee =
            fees.reduce((sum, fee) => sum + fee, 0) / (fees.length || 1);
          const roundedAverage = Math.round(averageFee * 100) / 100;
          return sellers.map((seller, index) => {
            const originalFee = Number(seller.shippingFee) || 0;
            return {
              sellerId: seller.sellerId,
              sellerName: seller.sellerName,
              originalFee,
              appliedFee: index === 0 ? roundedAverage : 0,
            };
          });
        }

        default:
          return sellers.map((seller) => ({
            sellerId: seller.sellerId,
            sellerName: seller.sellerName,
            originalFee: Number(seller.shippingFee) || 0,
            appliedFee: Number(seller.shippingFee) || 0,
          }));
      }
    };

    if (onlineSellers.length > 0) {
      onlineBreakdown = computeStrategy(onlineSellers);
      totalShippingCost = onlineBreakdown.reduce(
        (sum, item) => sum + item.appliedFee,
        0
      );
    }

    // Apply maximum shipping cap if enabled (only to online sellers)
    if (
      settings.maxShippingCapEnabled &&
      settings.maxShippingCap &&
      totalShippingCost > settings.maxShippingCap
    ) {
      const capRatio = settings.maxShippingCap / totalShippingCost;
      onlineBreakdown = onlineBreakdown.map((item) => ({
        ...item,
        appliedFee: Math.round(item.appliedFee * capRatio * 100) / 100,
      }));
      totalShippingCost = Math.round(settings.maxShippingCap * 100) / 100;
    }

    // Merge COD sellers with 0 fees, preserving original order
    const breakdownMap = new Map<string, number>();
    for (const item of onlineBreakdown) {
      breakdownMap.set(String(item.sellerId), item.appliedFee);
    }

    const finalBreakdown = sellerShippingFees.map((seller) => {
      const isCod =
        seller.shippingPaymentMode !== undefined &&
        seller.shippingPaymentMode !== null &&
        String(seller.shippingPaymentMode).toUpperCase() === ShippingPaymentMode.PAY_ON_DELIVERY;
      const originalFee = Number(seller.shippingFee) || 0;
      const appliedFee = isCod ? 0 : breakdownMap.get(String(seller.sellerId)) ?? 0;
      return {
        sellerId: seller.sellerId,
        sellerName: seller.sellerName,
        originalFee: isCod ? 0 : Math.round(originalFee * 100) / 100,
        appliedFee: Math.round(appliedFee * 100) / 100,
      };
    });

    return {
      totalShippingCost: Math.round(totalShippingCost * 100) / 100,
      shippingBreakdown: finalBreakdown,
      freeShippingApplied: false,
      strategyUsed: settings.shippingStrategy,
    };
  }

  /**
   * Get platform settings or return defaults
   */
  private async getPlatformSettings(): Promise<PlatformSettings> {
    try {
      // Try to get settings (assuming single row with id = 1)
      const settings = await this.platformSettingsRepository.findOne({
        where: { id: 1 },
      });
      if (settings) {
        return settings;
      }
      // Return defaults with required fields
      return {
        id: 1,
        shippingStrategy: ShippingStrategy.TIERED_DISCOUNT,
        freeShippingEnabled: true,
        maxShippingCapEnabled: true,
        ...this.defaultSettings,
      } as PlatformSettings;
    } catch (_error) {
      // If table doesn't exist or error, return defaults
      return {
        id: 1,
        shippingStrategy: ShippingStrategy.TIERED_DISCOUNT,
        freeShippingEnabled: true,
        maxShippingCapEnabled: true,
        ...this.defaultSettings,
      } as PlatformSettings;
    }
  }

  /**
   * Get or create platform settings (for admin use)
   */
  async getOrCreateSettings(): Promise<PlatformSettings> {
    try {
      let settings = await this.platformSettingsRepository.findOne({
        where: { id: 1 },
      });

      if (!settings) {
        // Create default settings
        settings = this.platformSettingsRepository.create({
          ...this.defaultSettings,
          id: 1,
        } as PlatformSettings);
        settings = await this.platformSettingsRepository.save(settings);
      }

      return settings;
    } catch (_error) {
      // If error, return defaults
      return {
        id: 1,
        shippingStrategy: ShippingStrategy.TIERED_DISCOUNT,
        freeShippingEnabled: true,
        maxShippingCapEnabled: true,
        ...this.defaultSettings,
      } as PlatformSettings;
    }
  }

  /**
   * Update platform settings (admin only)
   */
  async updateSettings(
    updates: Partial<PlatformSettings>
  ): Promise<PlatformSettings> {
    const settings = await this.getOrCreateSettings();
    Object.assign(settings, updates);
    return this.platformSettingsRepository.save(settings);
  }
}
