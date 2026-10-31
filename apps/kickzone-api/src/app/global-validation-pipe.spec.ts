import { BadRequestException } from '@nestjs/common';
import { readFileSync } from 'fs';
import { join } from 'path';
import { ZodValidationPipe } from '@kickzone-workspace/resolvers';
import {
  addToCartSchema,
  createBrandSchema,
  createProductSchema,
  createSellerSchema,
} from '@kickzone-workspace/validation';
import {
  AddToCartInput,
  CreateBrandInput,
  CreateProductInput,
  CreateSellerInput,
  ProductVariantInput,
} from '@kickzone-workspace/inputs';

/**
 * The global class-validator ValidationPipe was removed (V9). Arguments are now
 * validated per resolver argument by ZodValidationPipe with the shared schemas.
 */
describe('Global Validation Pipe (replaced by per-argument Zod pipes)', () => {
  it('main.ts no longer registers a global validation pipe', () => {
    const main = readFileSync(join(__dirname, '..', 'main.ts'), 'utf8');
    expect(main).not.toMatch(/useGlobalPipes|ValidationPipe/);
  });

  describe('valid inputs pass through unchanged (fields not stripped)', () => {
    it('should pass AddToCartInput unchanged', () => {
      const input: AddToCartInput = { sellerProductId: 'sp-1', quantity: 2 };
      expect(new ZodValidationPipe(addToCartSchema).transform(input)).toEqual(input);
    });

    it.each([
      { slug: 'nike', sortOrder: 5 },
      { slug: 'adidas', sortOrder: 10 },
    ])('should pass CreateBrandInput %p unchanged', (input: CreateBrandInput) => {
      expect(new ZodValidationPipe(createBrandSchema).transform(input)).toEqual(input);
    });
  });

  describe('product and seller rules', () => {
    const productPipe = new ZodValidationPipe(createProductSchema);
    const product = (weight: number): CreateProductInput => ({
      name: 'X',
      sku: 'S',
      categoryIds: [1],
      variants: [{ size: 'M', colorIds: [1], weight } as ProductVariantInput],
    });

    it('should reject CreateProductInput with invalid weight (0) via BadRequestException', () => {
      expect(() => productPipe.transform(product(0))).toThrow(BadRequestException);
    });

    it('should resolve CreateProductInput with valid weight (1.5)', () => {
      expect(productPipe.transform(product(1.5))).toEqual(product(1.5));
    });

    const sellerPipe = new ZodValidationPipe(createSellerSchema);
    const seller = {
      name: 'John',
      lastName: 'Doe',
      username: 'johndoe',
      email: 'john@example.com',
      password: 'password123',
    };

    it('should reject CreateSellerInput with empty storeName via BadRequestException', () => {
      const input: CreateSellerInput = { ...seller, storeName: '' };
      expect(() => sellerPipe.transform(input)).toThrow(BadRequestException);
    });

    it('should reject CreateSellerInput with missing storeName via BadRequestException', () => {
      expect(() => sellerPipe.transform(seller)).toThrow(BadRequestException);
    });
  });
});