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
}
