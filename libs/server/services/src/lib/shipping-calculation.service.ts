import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  PlatformSettings,
  ShippingStrategy,
} from '@kickzone-workspace/entities';

export interface SellerShippingInfo {
  sellerId: string | number;
  shippingFee: number;
  sellerName?: string;
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

@Injectable()
export class ShippingCalculationService {
  private defaultSettings: Partial<PlatformSettings> = {
    freeShippingThreshold: 50.0,
    freeShippingEnabled: true,
    shippingStrategy: ShippingStrategy.TIERED_DISCOUNT,
    additionalSellerDiscount: 0.5, // 50% discount
    additionalSellerFixedFee: null,
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
   */
  async calculateShippingCost(
    cartSubtotal: number,
    sellerShippingFees: SellerShippingInfo[]
  ): Promise<ShippingCalculationResult> {
    // Get platform settings or use defaults
    const settings = await this.getPlatformSettings();

    // Check for free shipping threshold
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
          originalFee: seller.shippingFee,
          appliedFee: 0,
        })),
        freeShippingApplied: true,
        strategyUsed: settings.shippingStrategy,
      };
    }

    // Calculate shipping based on strategy
    let shippingBreakdown: ShippingCalculationResult['shippingBreakdown'] = [];
    let totalShippingCost = 0;

    switch (settings.shippingStrategy) {
      case ShippingStrategy.FULL_SUM:
        // Current behavior: sum all fees
        shippingBreakdown = sellerShippingFees.map((seller) => ({
          sellerId: seller.sellerId,
          sellerName: seller.sellerName,
          originalFee: seller.shippingFee,
          appliedFee: seller.shippingFee,
        }));
        totalShippingCost = sellerShippingFees.reduce(
          (sum, seller) => sum + seller.shippingFee,
          0
        );
        break;

      case ShippingStrategy.TIERED_DISCOUNT:
        // First seller: full fee, others: discounted
        shippingBreakdown = sellerShippingFees.map((seller, index) => {
          if (index === 0) {
            // First seller pays full fee
            return {
              sellerId: seller.sellerId,
              sellerName: seller.sellerName,
              originalFee: seller.shippingFee,
              appliedFee: seller.shippingFee,
            };
          } else {
            // Additional sellers get discount
            const discount = settings.additionalSellerDiscount || 0;
            const appliedFee = seller.shippingFee * (1 - discount);
            return {
              sellerId: seller.sellerId,
              sellerName: seller.sellerName,
              originalFee: seller.shippingFee,
              appliedFee: Math.max(0, appliedFee),
            };
          }
        });
        totalShippingCost = shippingBreakdown.reduce(
          (sum, item) => sum + item.appliedFee,
          0
        );
        break;

      case ShippingStrategy.TIERED_FIXED:
        // First seller: full fee, others: fixed fee
        const fixedFee = settings.additionalSellerFixedFee || 0;
        shippingBreakdown = sellerShippingFees.map((seller, index) => {
          if (index === 0) {
            return {
              sellerId: seller.sellerId,
              sellerName: seller.sellerName,
              originalFee: seller.shippingFee,
              appliedFee: seller.shippingFee,
            };
          } else {
            return {
              sellerId: seller.sellerId,
              sellerName: seller.sellerName,
              originalFee: seller.shippingFee,
              appliedFee: fixedFee,
            };
          }
        });
        totalShippingCost = shippingBreakdown.reduce(
          (sum, item) => sum + item.appliedFee,
          0
        );
        break;

      case ShippingStrategy.HIGHEST_ONLY:
        // Charge only the highest shipping fee
        const highestFee = Math.max(
          ...sellerShippingFees.map((s) => s.shippingFee)
        );
        shippingBreakdown = sellerShippingFees.map((seller, index) => ({
          sellerId: seller.sellerId,
          sellerName: seller.sellerName,
          originalFee: seller.shippingFee,
          appliedFee: index === 0 ? highestFee : 0, // Only first seller pays
        }));
        totalShippingCost = highestFee;
        break;

      case ShippingStrategy.AVERAGE:
        // Charge average of all shipping fees
        const averageFee =
          sellerShippingFees.reduce((sum, s) => sum + s.shippingFee, 0) /
          sellerShippingFees.length;
        shippingBreakdown = sellerShippingFees.map((seller, index) => ({
          sellerId: seller.sellerId,
          sellerName: seller.sellerName,
          originalFee: seller.shippingFee,
          appliedFee: index === 0 ? averageFee : 0, // Only first seller pays
        }));
        totalShippingCost = averageFee;
        break;
    }

    // Apply maximum shipping cap if enabled
    if (
      settings.maxShippingCapEnabled &&
      settings.maxShippingCap &&
      totalShippingCost > settings.maxShippingCap
    ) {
      const capRatio = settings.maxShippingCap / totalShippingCost;
      shippingBreakdown = shippingBreakdown.map((item) => ({
        ...item,
        appliedFee: item.appliedFee * capRatio,
      }));
      totalShippingCost = settings.maxShippingCap;
    }

    return {
      totalShippingCost: Math.round(totalShippingCost * 100) / 100, // Round to 2 decimals
      shippingBreakdown,
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
      return settings || this.defaultSettings;
    } catch (error) {
      // If table doesn't exist or error, return defaults
      return this.defaultSettings;
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
    } catch (error) {
      // If error, return defaults
      return this.defaultSettings;
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

