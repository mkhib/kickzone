import { BadRequestException, ValidationPipe } from '@nestjs/common';
import { createGlobalValidationPipe } from './global-validation-pipe';
import { CreateProductInput, ProductVariantInput } from '@kickzone-workspace/inputs';

describe('Product Variant Inputs Validation', () => {
  let pipe: ValidationPipe;

  beforeEach(() => {
    pipe = createGlobalValidationPipe();
  });

  const validVariant: ProductVariantInput = {
    size: 'M',
    colorIds: [1],
    weight: 1,
  };

  const validCreateBase: CreateProductInput = {
    name: 'X',
    sku: 'S',
    categoryIds: [1],
    variants: [validVariant],
  };

  describe('CreateProductInput with ProductVariantInput', () => {
    it('should resolve valid variant input', async () => {
      const result = await pipe.transform(validCreateBase, {
        type: 'body',
        metatype: CreateProductInput,
        data: '',
      });
      expect(result).toEqual(validCreateBase);
    });

    it('should reject discount 101 via BadRequestException', async () => {
      const input: CreateProductInput = {
        ...validCreateBase,
        variants: [
          {
            ...validVariant,
            discount: 101,
          },
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

    it('should resolve discount 100', async () => {
      const input: CreateProductInput = {
        ...validCreateBase,
        variants: [
          {
            ...validVariant,
            discount: 100,
          },
        ],
      };

      const result = await pipe.transform(input, {
        type: 'body',
        metatype: CreateProductInput,
        data: '',
      });
      expect(result).toEqual(input);
    });

    it('should reject stockQuantity 2.5 via BadRequestException', async () => {
      const input: CreateProductInput = {
        ...validCreateBase,
        variants: [
          {
            ...validVariant,
            stockQuantity: 2.5,
          },
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

    it('should resolve stockQuantity 0', async () => {
      const input: CreateProductInput = {
        ...validCreateBase,
        variants: [
          {
            ...validVariant,
            stockQuantity: 0,
          },
        ],
      };

      const result = await pipe.transform(input, {
        type: 'body',
        metatype: CreateProductInput,
        data: '',
      });
      expect(result).toEqual(input);
    });
  });
});