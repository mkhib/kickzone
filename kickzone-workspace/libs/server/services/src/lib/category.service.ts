import { Injectable } from '@nestjs/common';
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
    const category = this.categoryRepository.create({ name });
    return this.categoryRepository.save(category);
  }
}
