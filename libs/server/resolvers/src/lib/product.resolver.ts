import {
  Category,
  Product,
  ProductConnection,
  User,
  UserRole,
} from '@kickzone-workspace/entities';
import { RolesGuard } from '@kickzone-workspace/guards';
import {
  CreateCategoryInput,
  CreateProductInfoInput,
  CreateProductInput,
  ProductArchivedStatus,
  ProductFilterInput,
} from '@kickzone-workspace/inputs';
import { ProductService, SellerService } from '@kickzone-workspace/services';
import { createConnection } from '@kickzone-workspace/utils';
import { SetMetadata, UseGuards } from '@nestjs/common';
import { Args, Context, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import * as fs from 'fs';
import GraphQLUpload from 'graphql-upload/GraphQLUpload.js';
import * as path from 'path';

export interface FileUpload {
  filename: string;
  mimetype: string;
  encoding: string;
  createReadStream: () => NodeJS.ReadableStream;
}

@Resolver(() => Product)
export class ProductResolver {
  constructor(
    private readonly productService: ProductService,
    private readonly sellerService: SellerService
  ) {}

  @Query(() => ProductConnection)
  async products(
    @Args('filter', { nullable: true }) filter?: ProductFilterInput
  ): Promise<ProductConnection> {
    if (!filter) filter = { archivedStatus: ProductArchivedStatus.ACTIVE };
    if (!filter.archivedStatus)
      filter.archivedStatus = ProductArchivedStatus.ACTIVE;
    const [products, totalCount] = await this.productService.getProducts(
      filter
    );
    return createConnection(
      products,
      totalCount,
      filter?.first || 10,
      filter?.after
    );
  }

  @Query(() => ProductConnection)
  async sellerProductsForMe(
    @Context() context: { req: { user: User } },
    @Args('filter', { nullable: true }) filter?: ProductFilterInput
  ): Promise<ProductConnection> {
    const user = context.req.user;
    if (!user) throw new Error('Not authenticated');
    if (user.role !== UserRole.SELLER) throw new Error('Not a seller');

    const seller = await this.sellerService.findOneByUserId(user.id);
    if (!seller) throw new Error('Seller info not found');

    const [products, totalCount] = await this.productService.getSellerProducts(
      seller.id,
      filter
    );
    return createConnection(
      products,
      totalCount,
      filter?.first || 10,
      filter?.after
    );
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

  @Mutation(() => Product)
  async createProductInfo(
    @Args('input') input: CreateProductInfoInput
  ): Promise<Product> {
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
    console.log('uploadProductInfoImages called');
    console.log('productInfoId:', productInfoId);
    console.log('files:', files);
    const uploadDir = path.join(process.cwd(), 'uploads', 'products');
    if (!fs.existsSync(uploadDir)) {
      console.log('Creating upload directory:', uploadDir);
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    let uploadedFiles;
    try {
      uploadedFiles = await Promise.all(files);
      console.log(
        'uploadedFiles:',
        uploadedFiles.map((f) => ({
          filename: f.filename,
          mimetype: f.mimetype,
          encoding: f.encoding,
        }))
      );
    } catch (err) {
      console.error('Error resolving uploaded files:', err);
      throw err;
    }

    const imageUrls: string[] = [];
    for (const file of uploadedFiles) {
      const { createReadStream, filename } = file;
      const uniqueName = `${Date.now()}-${filename}`;
      const filePath = path.join(uploadDir, uniqueName);
      try {
        await new Promise((resolve, reject) => {
          const stream = createReadStream();
          stream
            .pipe(fs.createWriteStream(filePath))
            .on('finish', resolve)
            .on('error', reject);
        });
        imageUrls.push(`/uploads/products/${uniqueName}`);
        console.log('Saved file:', filePath);
      } catch (err) {
        console.error('Error saving file:', filename, err);
        throw err;
      }
    }

    try {
      await this.productService.addImagesToProductInfo(
        productInfoId,
        imageUrls
      );
      console.log('Added image URLs to product info:', imageUrls);
    } catch (err) {
      console.error('Error adding images to product info:', err);
      throw err;
    }
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

  @Query(() => Product, { nullable: true })
  async product(
    @Args('id', { type: () => Int }) id: number
  ): Promise<Product | null> {
    return this.productService.getProductById(id);
  }

  @Mutation(() => Product)
  @UseGuards(RolesGuard)
  @SetMetadata('roles', [UserRole.ADMIN])
  async archiveProduct(
    @Args('id', { type: () => Int }) id: number
  ): Promise<Product> {
    return this.productService.archiveProduct(id);
  }

  @Mutation(() => Product)
  @UseGuards(RolesGuard)
  @SetMetadata('roles', [UserRole.ADMIN])
  async unarchiveProduct(
    @Args('id', { type: () => Int }) id: number
  ): Promise<Product> {
    return this.productService.unarchiveProduct(id);
  }

  @Mutation(() => Product)
  @UseGuards(RolesGuard)
  @SetMetadata('roles', [UserRole.ADMIN])
  async updateProduct(
    @Args('id', { type: () => Int }) id: number,
    @Args('name') name: string,
    @Args('categoryIds', { type: () => [Int] }) categoryIds: number[],
    @Args('description', { nullable: true }) description?: string
  ): Promise<Product> {
    return this.productService.updateProduct(
      id,
      name,
      categoryIds,
      description
    );
  }
}
