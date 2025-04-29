import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { ProductService } from '@kickzone-workspace/services';
import { Product, ProductInfo, Category } from '@kickzone-workspace/entities';
import {
  CreateProductInput,
  CreateProductInfoInput,
  CreateCategoryInput,
  ProductFilterInput,
} from '@kickzone-workspace/inputs';
import { RolesGuard } from '@kickzone-workspace/guards';
import { UserRole } from '@kickzone-workspace/entities';
import { SetMetadata, UseGuards } from '@nestjs/common';
import GraphQLUpload from 'graphql-upload/GraphQLUpload.js';
import * as fs from 'fs';
import * as path from 'path';

export interface FileUpload {
  filename: string;
  mimetype: string;
  encoding: string;
  createReadStream: () => NodeJS.ReadableStream;
}

@Resolver(() => Product)
export class ProductResolver {
  constructor(private readonly productService: ProductService) {}

  @Query(() => [Product])
  async products(
    @Args('filter', { nullable: true }) filter?: ProductFilterInput
  ) {
    return this.productService.getProducts(filter);
  }

  @Mutation(() => Product)
  @UseGuards(RolesGuard)
  @SetMetadata('roles', [UserRole.ADMIN])
  async createProduct(
    @Args('input') input: CreateProductInput
  ): Promise<Product> {
    const product = await this.productService.createProduct(input);
    if (!product.productInfos) {
      product.productInfos = [];
    }
    return product;
  }

  @Mutation(() => ProductInfo)
  async createProductInfo(
    @Args('input') input: CreateProductInfoInput
  ): Promise<ProductInfo> {
    return this.productService.createProductInfo(input);
  }

  @Mutation(() => Category)
  async createCategory(
    @Args('input') input: CreateCategoryInput
  ): Promise<Category> {
    return this.productService.createCategory(input);
  }

  @Query(() => [Category])
  async categories(): Promise<Category[]> {
    return this.productService.getCategories();
  }

  @Mutation(() => [String])
  @UseGuards(RolesGuard)
  @SetMetadata('roles', [UserRole.ADMIN])
  async uploadProductInfoImages(
    @Args('productInfoId') productInfoId: number,
    @Args({ name: 'files', type: () => [GraphQLUpload] })
    files: Promise<FileUpload>[]
  ): Promise<string[]> {
    const uploadDir = path.join(process.cwd(), 'uploads', 'products');
    if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

    const uploadedFiles = await Promise.all(files);

    const imageUrls: string[] = [];
    for (const file of uploadedFiles) {
      const { createReadStream, filename } = file;
      const uniqueName = `${Date.now()}-${filename}`;
      const filePath = path.join(uploadDir, uniqueName);
      await new Promise((resolve, reject) => {
        createReadStream()
          .pipe(fs.createWriteStream(filePath))
          .on('finish', resolve)
          .on('error', reject);
      });
      imageUrls.push(`/uploads/products/${uniqueName}`);
    }

    await this.productService.addImagesToProductInfo(productInfoId, imageUrls);
    return imageUrls;
  }

  @Mutation(() => Boolean)
  @UseGuards(RolesGuard)
  @SetMetadata('roles', [UserRole.ADMIN])
  async removeProductInfoImage(
    @Args('productInfoId') productInfoId: number,
    @Args('imageName') imageName: string
  ): Promise<boolean> {
    const uploadDir = path.join(process.cwd(), 'uploads', 'products');
    const filePath = path.join(uploadDir, imageName);

    try {
      // Remove the file from the filesystem
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }

      // Remove the image URL from the product info
      await this.productService.removeImageFromProductInfo(
        productInfoId,
        `/uploads/products/${imageName}`
      );
      return true;
    } catch (error) {
      console.error('Error removing product info image:', error);
      return false;
    }
  }
}
