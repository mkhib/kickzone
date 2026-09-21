import { Injectable, Logger, NotFoundException, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from '@kickzone-workspace/entities';
import { TranslationService } from './translation.service';

/** Basic catalog categories seeded on startup so admins/sellers don't recreate them. */
export const BASIC_CATEGORIES: Array<{
  slug: string;
  sortOrder: number;
  name: { en: string; fa: string };
}> = [
  // Audience
  { slug: 'men', sortOrder: 1, name: { en: 'Men', fa: 'مردانه' } },
  { slug: 'women', sortOrder: 2, name: { en: 'Women', fa: 'زنانه' } },
  { slug: 'kids', sortOrder: 3, name: { en: 'Kids', fa: 'بچگانه' } },
  { slug: 'unisex', sortOrder: 4, name: { en: 'Unisex', fa: 'یونیسکس' } },
  { slug: 'boys', sortOrder: 5, name: { en: 'Boys', fa: 'پسرانه' } },
  { slug: 'girls', sortOrder: 6, name: { en: 'Girls', fa: 'دخترانه' } },
  // Shoe types
  { slug: 'sneakers', sortOrder: 10, name: { en: 'Sneakers', fa: 'اسنیکرز' } },
  { slug: 'running', sortOrder: 11, name: { en: 'Running', fa: 'دویدن' } },
  { slug: 'football', sortOrder: 12, name: { en: 'Football', fa: 'فوتبال' } },
  { slug: 'cleats', sortOrder: 13, name: { en: 'Cleats', fa: 'استوک' } },
  { slug: 'training', sortOrder: 14, name: { en: 'Training', fa: 'تمرینی' } },
  { slug: 'basketball', sortOrder: 15, name: { en: 'Basketball', fa: 'بسکتبال' } },
  { slug: 'casual', sortOrder: 16, name: { en: 'Casual', fa: 'روزمره' } },
  { slug: 'formal', sortOrder: 17, name: { en: 'Formal', fa: 'رسمی' } },
  { slug: 'boots', sortOrder: 18, name: { en: 'Boots', fa: 'بوت' } },
  { slug: 'hiking', sortOrder: 19, name: { en: 'Hiking', fa: 'کوهنوردی' } },
  { slug: 'sandals', sortOrder: 20, name: { en: 'Sandals', fa: 'صندل' } },
  { slug: 'slippers', sortOrder: 21, name: { en: 'Slippers', fa: 'دمپایی' } },
  // Merchandising
  { slug: 'new-arrivals', sortOrder: 30, name: { en: 'New Arrivals', fa: 'جدید' } },
  { slug: 'sale', sortOrder: 31, name: { en: 'Sale', fa: 'حراج' } },
  { slug: 'limited-edition', sortOrder: 32, name: { en: 'Limited Edition', fa: 'نسخه محدود' } },
  { slug: 'accessories', sortOrder: 33, name: { en: 'Accessories', fa: 'لوازم جانبی' } },
];

@Injectable()
export class CategoryService implements OnModuleInit {
  private readonly logger = new Logger(CategoryService.name);

  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
    private readonly translationService: TranslationService
  ) {}

  async onModuleInit() {
    await this.seedBasicCategories();
  }

  async getCategories(): Promise<Category[]> {
    return this.categoryRepository.find({
      order: { sortOrder: 'ASC', id: 'ASC' },
    });
  }

  async createCategory(name: string): Promise<Category> {
    const category = this.categoryRepository.create({ name, products: [] });
    return this.categoryRepository.save(category);
  }

  async updateCategory(id: number, name: string): Promise<Category> {
    const category = await this.categoryRepository.findOne({ where: { id } });

    if (!category) {
      throw new NotFoundException(`Category with ID ${id} not found`);
    }

    // Check for duplicate name (excluding current category)
    const existing = await this.categoryRepository.findOne({ where: { name } });
    if (existing && existing.id !== id) {
      throw new Error('A category with this name already exists.');
    }

    category.name = name;
    return this.categoryRepository.save(category);
  }

  async deleteCategory(id: number): Promise<void> {
    const category = await this.categoryRepository.findOne({ where: { id } });

    if (!category) {
      throw new NotFoundException(`Category with ID ${id} not found`);
    }

    // Check if category has any products using a count query
    const productCount = await this.categoryRepository
      .createQueryBuilder('category')
      .leftJoin('category.products', 'product')
      .where('category.id = :id', { id })
      .select('COUNT(product.id)', 'count')
      .getRawOne();

    if (productCount && Number(productCount.count) > 0) {
      throw new Error('Cannot delete category that is assigned to products');
    }

    await this.categoryRepository.remove(category);
  }

  /**
   * Idempotently insert basic categories + EN/FA name translations.
   */
  async seedBasicCategories(): Promise<void> {
    let created = 0;
    for (const basic of BASIC_CATEGORIES) {
      let category = await this.categoryRepository.findOneBy({
        slug: basic.slug,
      });
      if (!category) {
        category = await this.categoryRepository.save(
          this.categoryRepository.create({
            slug: basic.slug,
            sortOrder: basic.sortOrder,
            isActive: true,
          })
        );
        created += 1;
      }

      await this.ensureCategoryNameTranslation(
        category.id,
        'en',
        basic.name.en
      );
      await this.ensureCategoryNameTranslation(
        category.id,
        'fa',
        basic.name.fa
      );
    }

    if (created > 0) {
      this.logger.log(`Seeded ${created} basic categor(y/ies)`);
    }
  }

  private async ensureCategoryNameTranslation(
    categoryId: number,
    locale: string,
    value: string
  ): Promise<void> {
    const existing = await this.translationService.getTranslation(
      'category',
      categoryId,
      locale,
      'name',
      ''
    );
    if (existing) {
      return;
    }
    await this.translationService.setTranslation({
      entityType: 'category',
      entityId: categoryId,
      locale,
      fieldName: 'name',
      value,
      isAutoTranslated: false,
    });
  }
}
