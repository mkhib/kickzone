import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Color } from '@kickzone-workspace/entities';
import { CreateColorInput, UpdateColorInput } from '@kickzone-workspace/inputs';
import { TranslationService } from './translation.service';

/** Basic catalog colors seeded on startup so admins/sellers don't recreate them. */
export const BASIC_COLORS: Array<{
  hexCode: string;
  sortOrder: number;
  name: { en: string; fa: string };
}> = [
  // Neutrals
  { hexCode: '#000000', sortOrder: 1, name: { en: 'Black', fa: 'مشکی' } },
  { hexCode: '#1A1A1A', sortOrder: 2, name: { en: 'Charcoal', fa: 'ذغالی' } },
  { hexCode: '#4A4A4A', sortOrder: 3, name: { en: 'Dark Gray', fa: 'خاکستری تیره' } },
  { hexCode: '#808080', sortOrder: 4, name: { en: 'Gray', fa: 'خاکستری' } },
  { hexCode: '#B0B0B0', sortOrder: 5, name: { en: 'Light Gray', fa: 'خاکستری روشن' } },
  { hexCode: '#C0C0C0', sortOrder: 6, name: { en: 'Silver', fa: 'نقره‌ای' } },
  { hexCode: '#FFFFFF', sortOrder: 7, name: { en: 'White', fa: 'سفید' } },
  { hexCode: '#F5F5F5', sortOrder: 8, name: { en: 'Off White', fa: 'سفید مات' } },
  { hexCode: '#FFFFF0', sortOrder: 9, name: { en: 'Ivory', fa: 'عاجی' } },
  { hexCode: '#F5F5DC', sortOrder: 10, name: { en: 'Beige', fa: 'بژ' } },
  { hexCode: '#F5DEB3', sortOrder: 11, name: { en: 'Wheat', fa: 'گندمی' } },
  { hexCode: '#D2B48C', sortOrder: 12, name: { en: 'Tan', fa: 'برنزه روشن' } },
  { hexCode: '#C3B091', sortOrder: 13, name: { en: 'Khaki', fa: 'خاکی' } },
  // Browns
  { hexCode: '#8B4513', sortOrder: 14, name: { en: 'Saddle Brown', fa: 'قهوه‌ای زین' } },
  { hexCode: '#A52A2A', sortOrder: 15, name: { en: 'Brown', fa: 'قهوه‌ای' } },
  { hexCode: '#5D4037', sortOrder: 16, name: { en: 'Coffee', fa: 'قهوه' } },
  { hexCode: '#3E2723', sortOrder: 17, name: { en: 'Dark Brown', fa: 'قهوه‌ای تیره' } },
  { hexCode: '#CD7F32', sortOrder: 18, name: { en: 'Bronze', fa: 'برنزی' } },
  { hexCode: '#FFD700', sortOrder: 19, name: { en: 'Gold', fa: 'طلایی' } },
  { hexCode: '#B76E79', sortOrder: 20, name: { en: 'Rose Gold', fa: 'رزگلد' } },
  // Reds / pinks
  { hexCode: '#FF0000', sortOrder: 21, name: { en: 'Red', fa: 'قرمز' } },
  { hexCode: '#DC143C', sortOrder: 22, name: { en: 'Crimson', fa: 'زرشکی روشن' } },
  { hexCode: '#800020', sortOrder: 23, name: { en: 'Burgundy', fa: 'بورگاندی' } },
  { hexCode: '#800000', sortOrder: 24, name: { en: 'Maroon', fa: 'زرشکی' } },
  { hexCode: '#FF4500', sortOrder: 25, name: { en: 'Orange Red', fa: 'قرمز نارنجی' } },
  { hexCode: '#FFA500', sortOrder: 26, name: { en: 'Orange', fa: 'نارنجی' } },
  { hexCode: '#FF7F50', sortOrder: 27, name: { en: 'Coral', fa: 'مرجانی' } },
  { hexCode: '#FFC0CB', sortOrder: 28, name: { en: 'Pink', fa: 'صورتی' } },
  { hexCode: '#FF69B4', sortOrder: 29, name: { en: 'Hot Pink', fa: 'صورتی تند' } },
  { hexCode: '#C71585', sortOrder: 30, name: { en: 'Magenta', fa: 'سرخابی' } },
  // Yellows / greens
  { hexCode: '#FFFF00', sortOrder: 31, name: { en: 'Yellow', fa: 'زرد' } },
  { hexCode: '#FFD54F', sortOrder: 32, name: { en: 'Mustard', fa: 'خردلی' } },
  { hexCode: '#ADFF2F', sortOrder: 33, name: { en: 'Lime', fa: 'سبز لیمویی' } },
  { hexCode: '#98FF98', sortOrder: 34, name: { en: 'Mint', fa: 'نعناعی' } },
  { hexCode: '#008000', sortOrder: 35, name: { en: 'Green', fa: 'سبز' } },
  { hexCode: '#228B22', sortOrder: 36, name: { en: 'Forest Green', fa: 'سبز جنگلی' } },
  { hexCode: '#556B2F', sortOrder: 37, name: { en: 'Olive', fa: 'زیتونی' } },
  { hexCode: '#006400', sortOrder: 38, name: { en: 'Dark Green', fa: 'سبز تیره' } },
  { hexCode: '#008080', sortOrder: 39, name: { en: 'Teal', fa: 'سبزآبی' } },
  { hexCode: '#40E0D0', sortOrder: 40, name: { en: 'Turquoise', fa: 'فیروزه‌ای' } },
  // Blues / purples
  { hexCode: '#87CEEB', sortOrder: 41, name: { en: 'Sky Blue', fa: 'آبی آسمانی' } },
  { hexCode: '#00BFFF', sortOrder: 42, name: { en: 'Cyan', fa: 'فیروزه‌ای روشن' } },
  { hexCode: '#0000FF', sortOrder: 43, name: { en: 'Blue', fa: 'آبی' } },
  { hexCode: '#4169E1', sortOrder: 44, name: { en: 'Royal Blue', fa: 'آبی سلطنتی' } },
  { hexCode: '#000080', sortOrder: 45, name: { en: 'Navy', fa: 'سرمه‌ای' } },
  { hexCode: '#191970', sortOrder: 46, name: { en: 'Midnight Blue', fa: 'آبی نیمه‌شب' } },
  { hexCode: '#4B0082', sortOrder: 47, name: { en: 'Indigo', fa: 'نیلی' } },
  { hexCode: '#800080', sortOrder: 48, name: { en: 'Purple', fa: 'بنفش' } },
  { hexCode: '#9370DB', sortOrder: 49, name: { en: 'Lavender', fa: 'اسطوخودوسی' } },
  { hexCode: '#E6E6FA', sortOrder: 50, name: { en: 'Lilac', fa: 'یاسی' } },
];

@Injectable()
export class ColorService implements OnModuleInit {
  private readonly logger = new Logger(ColorService.name);

  constructor(
    @InjectRepository(Color)
    private readonly colorRepository: Repository<Color>,
    private readonly translationService: TranslationService
  ) {}

  async onModuleInit() {
    await this.seedBasicColors();
  }

  async getColors(): Promise<Color[]> {
    return this.colorRepository.find({
      order: { sortOrder: 'ASC', id: 'ASC' },
    });
  }

  async getColorById(id: number): Promise<Color | null> {
    return this.colorRepository.findOneBy({ id });
  }

  async createColor(input: CreateColorInput, name?: string): Promise<Color> {
    const hexCode = this.normalizeHex(input.hexCode);
    const existing = await this.colorRepository.findOneBy({ hexCode });
    if (existing) {
      throw new Error('A color with this hex code already exists.');
    }
    const color = this.colorRepository.create({
      hexCode,
      sortOrder: input.sortOrder || 0,
    });
    const savedColor = await this.colorRepository.save(color);

    // Create a translation entry for the color name if provided
    if (name) {
      await this.translationService.setTranslation({
        entityType: 'color',
        entityId: savedColor.id,
        locale: 'en', // Default to English
        fieldName: 'name',
        value: name,
        isAutoTranslated: false, // Not auto-translated
      });
    }

    return savedColor;
  }

  async updateColor(
    id: number,
    input: UpdateColorInput,
    name?: string,
    locale = 'en'
  ): Promise<Color> {
    const color = await this.colorRepository.findOneBy({ id });
    if (!color) {
      throw new Error(`Color with ID ${id} not found`);
    }
    const hexCode = this.normalizeHex(input.hexCode);
    const existing = await this.colorRepository.findOne({
      where: { hexCode },
    });
    if (existing && existing.id !== id) {
      throw new Error('A color with this hex code already exists.');
    }
    color.hexCode = hexCode;
    if (input.sortOrder !== undefined) {
      color.sortOrder = input.sortOrder;
    }
    if (input.isActive !== undefined) {
      color.isActive = input.isActive;
    }
    const saved = await this.colorRepository.save(color);

    const trimmedName = name?.trim();
    if (trimmedName) {
      await this.translationService.setTranslation({
        entityType: 'color',
        entityId: saved.id,
        locale,
        fieldName: 'name',
        value: trimmedName,
        isAutoTranslated: false,
      });
    }

    return saved;
  }

  async deleteColor(id: number): Promise<boolean> {
    const result = await this.colorRepository.delete(id);
    return (result.affected ?? 0) > 0;
  }

  /**
   * Idempotently insert basic colors + EN/FA name translations.
   */
  async seedBasicColors(): Promise<void> {
    let created = 0;
    for (const basic of BASIC_COLORS) {
      const hexCode = this.normalizeHex(basic.hexCode);
      let color = await this.colorRepository.findOneBy({ hexCode });
      if (!color) {
        color = await this.colorRepository.save(
          this.colorRepository.create({
            hexCode,
            sortOrder: basic.sortOrder,
            isActive: true,
          })
        );
        created += 1;
      }

      await this.ensureColorNameTranslation(color.id, 'en', basic.name.en);
      await this.ensureColorNameTranslation(color.id, 'fa', basic.name.fa);
    }

    if (created > 0) {
      this.logger.log(`Seeded ${created} basic color(s)`);
    }
  }

  private async ensureColorNameTranslation(
    colorId: number,
    locale: string,
    value: string
  ): Promise<void> {
    const existing = await this.translationService.getTranslation(
      'color',
      colorId,
      locale,
      'name',
      ''
    );
    if (existing) {
      return;
    }
    await this.translationService.setTranslation({
      entityType: 'color',
      entityId: colorId,
      locale,
      fieldName: 'name',
      value,
      isAutoTranslated: false,
    });
  }

  private normalizeHex(hexCode: string): string {
    const trimmed = hexCode.trim();
    return trimmed.startsWith('#')
      ? trimmed.toUpperCase()
      : `#${trimmed.toUpperCase()}`;
  }
}
