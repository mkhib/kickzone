import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, IsNull } from 'typeorm';
import { Brand, Product } from '@kickzone-workspace/entities';
import { CreateBrandInput, UpdateBrandInput } from '@kickzone-workspace/inputs';
import { TranslationService } from './translation.service';

/** Basic catalog brands seeded on startup. */
export const BASIC_BRANDS: Array<{
  slug: string;
  sortOrder: number;
  name: { en: string; fa: string };
  namePrefixes: string[];
}> = [
  {
    slug: 'nike',
    sortOrder: 1,
    name: { en: 'Nike', fa: 'نایک' },
    namePrefixes: ['nike'],
  },
  {
    slug: 'jordan',
    sortOrder: 2,
    name: { en: 'Jordan', fa: 'جردن' },
    namePrefixes: ['jordan', 'air jordan'],
  },
  {
    slug: 'adidas',
    sortOrder: 3,
    name: { en: 'Adidas', fa: 'آدیداس' },
    namePrefixes: ['adidas'],
  },
  {
    slug: 'puma',
    sortOrder: 4,
    name: { en: 'Puma', fa: 'پوما' },
    namePrefixes: ['puma'],
  },
  {
    slug: 'new-balance',
    sortOrder: 5,
    name: { en: 'New Balance', fa: 'نیو بالانس' },
    namePrefixes: ['new balance'],
  },
  {
    slug: 'under-armour',
    sortOrder: 6,
    name: { en: 'Under Armour', fa: 'آندر آرمور' },
    namePrefixes: ['under armour'],
  },
  {
    slug: 'reebok',
    sortOrder: 7,
    name: { en: 'Reebok', fa: 'ریبوک' },
    namePrefixes: ['reebok'],
  },
  {
    slug: 'asics',
    sortOrder: 8,
    name: { en: 'Asics', fa: 'اسیکس' },
    namePrefixes: ['asics'],
  },
  {
    slug: 'converse',
    sortOrder: 9,
    name: { en: 'Converse', fa: 'کانورس' },
    namePrefixes: ['converse'],
  },
  {
    slug: 'vans',
    sortOrder: 10,
    name: { en: 'Vans', fa: 'ونز' },
    namePrefixes: ['vans'],
  },
];

@Injectable()
export class BrandService implements OnModuleInit {
  private readonly logger = new Logger(BrandService.name);

  constructor(
    @InjectRepository(Brand)
    private readonly brandRepository: Repository<Brand>,
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    private readonly translationService: TranslationService
  ) {}

  async onModuleInit() {
    await this.seedBasicBrands();
    await this.backfillProductBrands();
  }

  async getBrands(options?: { onlyWithProducts?: boolean }): Promise<Brand[]> {
    const qb = this.brandRepository
      .createQueryBuilder('brand')
      .orderBy('brand.sortOrder', 'ASC')
      .addOrderBy('brand.id', 'ASC');

    if (options?.onlyWithProducts) {
      qb.andWhere('brand.isActive = true').andWhere(
        `EXISTS (
          SELECT 1
          FROM product p
          INNER JOIN seller_product sp ON sp."productId" = p.id
          WHERE p."brandId" = brand.id
            AND p.archived = false
            AND sp."stockQuantity" > 0
        )`
      );
    }

    return qb.getMany();
  }

  async getBrandById(id: number): Promise<Brand | null> {
    return this.brandRepository.findOneBy({ id });
  }

  async getBrandBySlug(slug: string): Promise<Brand | null> {
    return this.brandRepository.findOneBy({ slug: slug.toLowerCase() });
  }

  async createBrand(input: CreateBrandInput, name?: string): Promise<Brand> {
    const slug = input.slug.trim().toLowerCase();
    const existing = await this.brandRepository.findOneBy({ slug });
    if (existing) {
      throw new Error('A brand with this slug already exists.');
    }
    const brand = this.brandRepository.create({
      slug,
      sortOrder: input.sortOrder ?? 0,
      isActive: true,
    });
    const saved = await this.brandRepository.save(brand);

    if (name?.trim()) {
      await this.translationService.setTranslation({
        entityType: 'brand',
        entityId: saved.id,
        locale: 'en',
        fieldName: 'name',
        value: name.trim(),
        isAutoTranslated: false,
      });
    }

    return saved;
  }

  async updateBrand(
    input: UpdateBrandInput,
    name?: string,
    locale = 'en'
  ): Promise<Brand> {
    const brand = await this.brandRepository.findOneBy({ id: input.id });
    if (!brand) {
      throw new Error(`Brand with ID ${input.id} not found`);
    }

    if (input.slug && input.slug !== brand.slug) {
      const slug = input.slug.trim().toLowerCase();
      const existing = await this.brandRepository.findOneBy({ slug });
      if (existing) {
        throw new Error('A brand with this slug already exists.');
      }
      brand.slug = slug;
    }

    if (input.sortOrder !== undefined) brand.sortOrder = input.sortOrder;
    if (input.isActive !== undefined) brand.isActive = input.isActive;

    const saved = await this.brandRepository.save(brand);

    if (name?.trim()) {
      await this.translationService.setTranslation({
        entityType: 'brand',
        entityId: saved.id,
        locale,
        fieldName: 'name',
        value: name.trim(),
        isAutoTranslated: false,
      });
    }

    return saved;
  }

  async deleteBrand(id: number): Promise<boolean> {
    const brand = await this.brandRepository.findOneBy({ id });
    if (!brand) {
      throw new Error(`Brand with ID ${id} not found`);
    }

    const productCount = await this.productRepository.count({
      where: { brandId: id },
    });
    if (productCount > 0) {
      throw new Error('Cannot delete brand that is assigned to products');
    }

    await this.translationService.deleteEntityTranslations('brand', id);
    await this.brandRepository.remove(brand);
    return true;
  }

  private async seedBasicBrands(): Promise<void> {
    let created = 0;
    for (const basic of BASIC_BRANDS) {
      let brand = await this.brandRepository.findOneBy({ slug: basic.slug });
      if (!brand) {
        brand = await this.brandRepository.save(
          this.brandRepository.create({
            slug: basic.slug,
            sortOrder: basic.sortOrder,
            isActive: true,
          })
        );
        created += 1;
      }

      await this.ensureBrandNameTranslation(brand.id, 'en', basic.name.en);
      await this.ensureBrandNameTranslation(brand.id, 'fa', basic.name.fa);
    }

    if (created > 0) {
      this.logger.log(`Seeded ${created} basic brand(s)`);
    }
  }

  /**
   * Assign brands to products that still lack one, using name prefixes.
   */
  private async backfillProductBrands(): Promise<void> {
    try {
      const brands = await this.brandRepository.find();
      if (!brands.length) return;

      const products = await this.productRepository.find({
        where: { brandId: IsNull() },
      });
      if (!products.length) return;

      let updated = 0;
      for (const product of products) {
        const nameLower = (product.name || '').trim().toLowerCase();
        const matched = BASIC_BRANDS.find((b) =>
          b.namePrefixes.some(
            (prefix) =>
              nameLower === prefix || nameLower.startsWith(`${prefix} `)
          )
        );
        if (!matched) continue;
        const brand = brands.find((b) => b.slug === matched.slug);
        if (!brand) continue;
        product.brandId = brand.id;
        await this.productRepository.save(product);
        updated += 1;
      }

      if (updated > 0) {
        this.logger.log(`Backfilled brand on ${updated} product(s)`);
      }
    } catch (error) {
      this.logger.warn(
        `Skipped brand backfill: ${(error as Error).message}`
      );
    }
  }

  private async ensureBrandNameTranslation(
    brandId: number,
    locale: string,
    value: string
  ): Promise<void> {
    const existing = await this.translationService.getTranslation(
      'brand',
      brandId,
      locale,
      'name',
      ''
    );
    if (existing) {
      return;
    }
    await this.translationService.setTranslation({
      entityType: 'brand',
      entityId: brandId,
      locale,
      fieldName: 'name',
      value,
      isAutoTranslated: false,
    });
  }
}
