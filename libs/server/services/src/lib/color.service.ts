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
  { hexCode: '#000000', sortOrder: 1, name: { en: 'Black', fa: 'مشکی' } },
  { hexCode: '#FFFFFF', sortOrder: 2, name: { en: 'White', fa: 'سفید' } },
  { hexCode: '#808080', sortOrder: 3, name: { en: 'Gray', fa: 'خاکستری' } },
  { hexCode: '#C0C0C0', sortOrder: 4, name: { en: 'Silver', fa: 'نقره‌ای' } },
  { hexCode: '#FF0000', sortOrder: 5, name: { en: 'Red', fa: 'قرمز' } },
  { hexCode: '#0000FF', sortOrder: 6, name: { en: 'Blue', fa: 'آبی' } },
  { hexCode: '#000080', sortOrder: 7, name: { en: 'Navy', fa: 'سرمه‌ای' } },
  { hexCode: '#008000', sortOrder: 8, name: { en: 'Green', fa: 'سبز' } },
  { hexCode: '#FFFF00', sortOrder: 9, name: { en: 'Yellow', fa: 'زرد' } },
  { hexCode: '#FFA500', sortOrder: 10, name: { en: 'Orange', fa: 'نارنجی' } },
  { hexCode: '#800080', sortOrder: 11, name: { en: 'Purple', fa: 'بنفش' } },
  { hexCode: '#FFC0CB', sortOrder: 12, name: { en: 'Pink', fa: 'صورتی' } },
  { hexCode: '#A52A2A', sortOrder: 13, name: { en: 'Brown', fa: 'قهوه‌ای' } },
  { hexCode: '#F5F5DC', sortOrder: 14, name: { en: 'Beige', fa: 'بژ' } },
  { hexCode: '#FFD700', sortOrder: 15, name: { en: 'Gold', fa: 'طلایی' } },
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

  async updateColor(id: number, input: UpdateColorInput): Promise<Color> {
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
    return this.colorRepository.save(color);
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
