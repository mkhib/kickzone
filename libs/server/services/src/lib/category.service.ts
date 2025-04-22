import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from '@kickzone-workspace/entities';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>
  ) {}

  async getCategories(): Promise<Category[]> {
    return this.categoryRepository.find();
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

    category.name = name;
    return this.categoryRepository.save(category);
  }
}
