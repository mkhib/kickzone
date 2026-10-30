import { BadRequestException, ValidationPipe } from '@nestjs/common';
import { GLOBAL_VALIDATION_PIPE_OPTIONS, createGlobalValidationPipe } from './global-validation-pipe';
import { AddToCartInput } from '@kickzone-workspace/inputs';
import { CreateBrandInput } from '@kickzone-workspace/inputs';
import { CreateProductInput, ProductVariantInput } from '@kickzone-workspace/inputs';
import { CreateSellerInput } from '@kickzone-workspace/inputs';

describe('Global Validation Pipe', () => {
  let pipe: ValidationPipe;

  beforeEach(() => {
    pipe = createGlobalValidationPipe();
  });

  describe('GLOBAL_VALIDATION_PIPE_OPTIONS', () => {
    it('should have exactly the required 5 options with correct values', () => {
      expect(GLOBAL_VALIDATION_PIPE_OPTIONS).toEqual({
        whitelist: false,
        forbidNonWhitelisted: false,
        forbidUnknownValues: false,
        transform: false,
        stopAtFirstError: true,
      });
    });

    it('should not have any additional properties', () => {
      const keys = Object.keys(GLOBAL_VALIDATION_PIPE_OPTIONS).sort();
      expect(keys).toEqual([
        'forbidNonWhitelisted',
        'forbidUnknownValues',
        'stopAtFirstError',
        'transform',
        'whitelist',
      ]);
    });
  });

  describe('undecorated inputs (no class-validator decorators)', () => {
    it('should pass AddToCartInput unchanged (fields not stripped)', async () => {
      const input = { sellerProductId: 'sp-1', quantity: 2 };
      const result = await pipe.transform(input, {
        type: 'body',
        metatype: AddToCartInput,
        data: '',
      });
      expect(result).toEqual(input); // deep-equal, fields not stripped
    });

    it('should pass CreateBrandInput unchanged (fields not stripped)', async () => {
      const input = { slug: 'nike', sortOrder: 5 };
      const result = await pipe.transform(input, {
        type: 'body',
        metatype: CreateBrandInput,
        data: '',
      });
      expect(result).toEqual(input); // deep-equal, fields not stripped
    });

    it('should NOT reject plain object for undecorated class with "unknown value" error', async () => {
      const input = { slug: 'adidas', sortOrder: 10 };
      await expect(
        pipe.transform(input, {
          type: 'body',
          metatype: CreateBrandInput,
          data: '',
        })
      ).resolves.toEqual(input);
    });
  });

  describe('decorated inputs (with class-validator decorators)', () => {
    it('should reject CreateProductInput with invalid weight (0) via BadRequestException', async () => {
      const input: CreateProductInput = {
        name: 'X',
        sku: 'S',
        categoryIds: [1],
        variants: [
          {
            size: 'M',
            colorIds: [1],
            weight: 0, // invalid: must be > 0
          } as ProductVariantInput,
        ],
      };

      await expect(
        pipe.transform(input, {
          type: 'body',
          metatype: CreateProductInput,
          data: '',
        })
      ).rejects.toThrow(BadRequestException);
    });

    it('should resolve CreateProductInput with valid weight (1.5)', async () => {
      const input: CreateProductInput = {
        name: 'X',
        sku: 'S',
        categoryIds: [1],
        variants: [
          {
            size: 'M',
            colorIds: [1],
            weight: 1.5, // valid: > 0
          } as ProductVariantInput,
        ],
      };

      const result = await pipe.transform(input, {
        type: 'body',
        metatype: CreateProductInput,
        data: '',
      });
      expect(result).toEqual(input);
    });

    it('should reject CreateSellerInput with missing/empty storeName via BadRequestException', async () => {
      const input: CreateSellerInput = {
        name: 'John',
        lastName: 'Doe',
        username: 'johndoe',
        email: 'john@example.com',
        password: 'password123',
        storeName: '', // invalid: empty string
      };

      await expect(
        pipe.transform(input, {
          type: 'body',
          metatype: CreateSellerInput,
          data: '',
        })
      ).rejects.toThrow(BadRequestException);
    });

    it('should reject CreateSellerInput with missing storeName via BadRequestException', async () => {
      const input = {
        name: 'John',
        lastName: 'Doe',
        username: 'johndoe',
        email: 'john@example.com',
        password: 'password123',
        // storeName missing entirely
      };

      await expect(
        pipe.transform(input, {
          type: 'body',
          metatype: CreateSellerInput,
          data: '',
        })
      ).rejects.toThrow(BadRequestException);
    });
  });
});