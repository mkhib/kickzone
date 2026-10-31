import { BadRequestException } from '@nestjs/common';
import { ZodValidationPipe } from '@kickzone-workspace/resolvers';
import { createProductSchema } from '@kickzone-workspace/validation';
import { CreateProductInput, ProductVariantInput } from '@kickzone-workspace/inputs';

describe('Product Variant Inputs Validation', () => {
  const pipe = new ZodValidationPipe(createProductSchema);

  const validVariant: ProductVariantInput = { size: 'M', colorIds: [1], weight: 1 };

  const validCreateBase: CreateProductInput = {
    name: 'X',
    sku: 'S',
    categoryIds: [1],
    variants: [validVariant],
  };

  const withVariant = (patch: Partial<ProductVariantInput>): CreateProductInput => ({
    ...validCreateBase,
    variants: [{ ...validVariant, ...patch }],
  });

  describe('CreateProductInput with ProductVariantInput', () => {
    it('should resolve valid variant input', () => {
      expect(pipe.transform(validCreateBase)).toEqual(validCreateBase);
    });

    it('should reject discount 101 via BadRequestException', () => {
      expect(() => pipe.transform(withVariant({ discount: 101 }))).toThrow(BadRequestException);
    });

    it('should resolve discount 100', () => {
      const input = withVariant({ discount: 100 });
      expect(pipe.transform(input)).toEqual(input);
    });

    it('should reject stockQuantity 2.5 via BadRequestException', () => {
      expect(() => pipe.transform(withVariant({ stockQuantity: 2.5 }))).toThrow(BadRequestException);
    });

    it('should resolve stockQuantity 0', () => {
      const input = withVariant({ stockQuantity: 0 });
      expect(pipe.transform(input)).toEqual(input);
    });
  });
});