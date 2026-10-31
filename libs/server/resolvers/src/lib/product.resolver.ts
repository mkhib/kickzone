import {
  createProductInfoSchema,
  createProductSchema,
  productFilterSchema,
  updateProductSchema,
} from '@kickzone-workspace/validation';
import { ZodValidationPipe } from './zod-validation.pipe';
import {
  Category,
  Product,
  ProductConnection,
  SellerInfo,
  SellerProduct,
  User,
  UserRole,
  ProductDescription,
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
    @Args('filter', { nullable: true }, new ZodValidationPipe(productFilterSchema))
    filter?: ProductFilterInput
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
    @Args('filter', { nullable: true }, new ZodValidationPipe(productFilterSchema))
    filter?: ProductFilterInput
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
    @Args('input', new ZodValidationPipe(createProductSchema))
    input: CreateProductInput,
    @Context() context?: { req: { user?: User } }
  ): Promise<Product> {
    const product = await this.productService.createProduct(
      input,
      context?.req?.user
    );
    if (!product.productInfos) {
      product.productInfos = [];
    }
    return product;
  }

  @Mutation(() => Product)
  @UseGuards(CatalogGuard)
  async createProductInfo(
    @Args('input', new ZodValidationPipe(createProductInfoSchema))
    input: CreateProductInfoInput
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

  @Mutation(() => Boolean)
  @UseGuards(CatalogGuard)
  async deleteProduct(
    @Args('id', { type: () => Int }) id: number
  ): Promise<boolean> {
    return this.productService.deleteProduct(id);
  }

  @Mutation(() => Product)
  @UseGuards(CatalogGuard)
  async updateProduct(
    @Args('input', new ZodValidationPipe(updateProductSchema))
    input: UpdateProductInput,
    @Context() context?: { req: { user?: User } }
  ): Promise<Product> {
    return this.productService.updateProduct(input, context?.req?.user);
  }

  @ResolveField(() => String, { nullable: true })
  async description(
    @Parent() product: Product,
    @Context() context?: { req: { locale?: string } }
  ): Promise<string | null> {
    return this.productService.resolveProductDescription(
      product,
      context?.req?.locale || 'en'
    );
  }

  @ResolveField(() => [ProductDescription], { nullable: true })
  async descriptions(
    @Parent() product: Product
  ): Promise<ProductDescription[]> {
    if (product.descriptions) {
      return product.descriptions;
    }
    return this.productService.getProductDescriptions(product.id);
  }

  @Mutation(() => Boolean)
  async subscribeNewsletter(@Args('email') email: string): Promise<boolean> {
    return this.productService.subscribeNewsletter(email);
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
