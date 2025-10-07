import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Color } from '@kickzone-workspace/entities';
import { CreateColorInput, UpdateColorInput } from '@kickzone-workspace/inputs';
import { TranslationService } from './translation.service';

@Injectable()
export class ColorService {
  constructor(
    @InjectRepository(Color)
    private readonly colorRepository: Repository<Color>,
    private readonly translationService: TranslationService
  ) {}

  async getColors(): Promise<Color[]> {
    return this.colorRepository.find();
  }

  async getColorById(id: number): Promise<Color | null> {
    return this.colorRepository.findOneBy({ id });
  }

  async createColor(input: CreateColorInput, name?: string): Promise<Color> {
    const existing = await this.colorRepository.findOneBy({
      hexCode: input.hexCode,
    });
    if (existing) {
      throw new Error('A color with this hex code already exists.');
    }
    const color = this.colorRepository.create({
      hexCode: input.hexCode,
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
    const existing = await this.colorRepository.findOne({
      where: { hexCode: input.hexCode },
    });
    if (existing && existing.id !== id) {
      throw new Error('A color with this hex code already exists.');
    }
    color.hexCode = input.hexCode;
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
}
