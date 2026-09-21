import {
  Category,
  Product,
  ProductConnection,
  SellerInfo,
  SellerProduct,
  User,
  UserRole,
} from '@kickzone-workspace/entities';
import { RolesGuard, CatalogGuard } from '@kickzone-workspace/guards';
import { SizeKind } from '@kickzone-workspace/product-sizes';
import {
  CreateProductInfoInput,
  CreateProductInput,
  ProductArchivedStatus,
  ProductFilterInput,
  UpdateProductInput,
} from '@kickzone-workspace/inputs';
import { ProductService, SellerService } from '@kickzone-workspace/services';
import { createConnection } from '@kickzone-workspace/utils';
import { SetMetadata, UseGuards } from '@nestjs/common';
import {
  Args,
  Context,
  Int,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
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

  @Query(() => [String])
  async distinctProductSizes(
    @Args('sizeKind', { type: () => SizeKind, nullable: true })
    sizeKind?: SizeKind
  ): Promise<string[]> {
    return this.productService.getDistinctProductSizes(sizeKind);
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
  @UseGuards(CatalogGuard)
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
  @UseGuards(CatalogGuard)
  async createProductInfo(
    @Args('input') input: CreateProductInfoInput
  ): Promise<Product> {
    return this.productService.createProductInfo(input);
  }

  @Query(() => [Category])
  async categories(): Promise<Category[]> {
    return this.productService.getCategories();
  }

  @Mutation(() => [String])
  @UseGuards(CatalogGuard)
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
        await new Promise<void>((resolve, reject) => {
          const stream = createReadStream();
          stream
            .pipe(fs.createWriteStream(filePath))
            .on('finish', () => resolve())
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
  @UseGuards(CatalogGuard)
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

  @Query(() => [SellerProduct])
  @UseGuards(RolesGuard)
  @SetMetadata('roles', [UserRole.ADMIN])
  async sellerProductsByProduct(
    @Args('productId', { type: () => Int }) productId: number
  ): Promise<SellerProduct[]> {
    return this.productService.getSellerProductsByProduct(productId);
  }

  @Mutation(() => Product)
  @UseGuards(CatalogGuard)
  async archiveProduct(
    @Args('id', { type: () => Int }) id: number
  ): Promise<Product> {
    return this.productService.archiveProduct(id);
  }

  @Mutation(() => Product)
  @UseGuards(CatalogGuard)
  async unarchiveProduct(
    @Args('id', { type: () => Int }) id: number
  ): Promise<Product> {
    return this.productService.unarchiveProduct(id);
  }

  @Mutation(() => Product)
  @UseGuards(CatalogGuard)
  async updateProduct(
    @Args('input') input: UpdateProductInput
  ): Promise<Product> {
    return this.productService.updateProduct(input);
  }
}

@Resolver(() => SellerProduct)
export class SellerProductResolver {
  @ResolveField(() => Number, { nullable: true })
  async costPrice(
    @Parent() sellerProduct: SellerProduct,
    @Context() context: { req: { user?: User } }
  ): Promise<number | null> {
    const user = context.req.user;
    // Only expose costPrice to sellers and admins, not customers
    if (
      !user ||
      (user.role !== UserRole.SELLER && user.role !== UserRole.ADMIN)
    ) {
      return null;
    }
    return sellerProduct.costPrice;
  }

  @ResolveField(() => SellerInfo, { nullable: true })
  seller(@Parent() sellerProduct: SellerProduct) {
    return sellerProduct.seller;
  }
}
