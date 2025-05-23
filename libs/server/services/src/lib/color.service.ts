import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Color } from '@kickzone-workspace/entities';
import { CreateColorInput, UpdateColorInput } from '@kickzone-workspace/inputs';

@Injectable()
export class ColorService {
  constructor(
    @InjectRepository(Color)
    private readonly colorRepository: Repository<Color>
  ) {}

  async getColors(): Promise<Color[]> {
    return this.colorRepository.find();
  }

  async getColorById(id: number): Promise<Color | null> {
    return this.colorRepository.findOneBy({ id });
  }

  async createColor(input: CreateColorInput): Promise<Color> {
    const existing = await this.colorRepository.findOneBy({ name: input.name });
    if (existing) {
      throw new Error('A color with this name already exists.');
    }
    const color = this.colorRepository.create({
      name: input.name,
      hexCode: input.hexCode,
    });
    return this.colorRepository.save(color);
  }

  async updateColor(id: number, input: UpdateColorInput): Promise<Color> {
    const color = await this.colorRepository.findOneBy({ id });
    if (!color) {
      throw new Error(`Color with ID ${id} not found`);
    }
    const existing = await this.colorRepository.findOne({
      where: { name: input.name },
    });
    if (existing && existing.id !== id) {
      throw new Error('A color with this name already exists.');
    }
    color.name = input.name;
    color.hexCode = input.hexCode;
    return this.colorRepository.save(color);
  }

  async deleteColor(id: number): Promise<boolean> {
    const result = await this.colorRepository.delete(id);
    return (result.affected ?? 0) > 0;
  }
}
