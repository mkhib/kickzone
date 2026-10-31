import { BadRequestException } from '@nestjs/common';
import { ZodValidationPipe } from '@kickzone-workspace/resolvers';
import { createSellerProductSchema, updateSellerProductSchema } from '@kickzone-workspace/validation';
import { CreateSellerProductInput, UpdateSellerProductInput } from '@kickzone-workspace/inputs';

describe('Seller Product Inputs Validation', () => {
  const createPipe = new ZodValidationPipe(createSellerProductSchema);
  const updatePipe = new ZodValidationPipe(updateSellerProductSchema);

  const validCreateBase: CreateSellerProductInput = {
    productInfoId: 1,
    price: 100,
    costPrice: 50,
    discount: 10,
    stockQuantity: 5,
  };

  describe('CreateSellerProductInput', () => {
    it('should resolve valid base input', () => {
      expect(createPipe.transform(validCreateBase)).toEqual(validCreateBase);
    });

    it.each([
      ['discount 101', { discount: 101 }],
      ['discount -1', { discount: -1 }],
      ['price 0', { price: 0 }],
      ['costPrice -1', { costPrice: -1 }],
      ['stockQuantity 1.5', { stockQuantity: 1.5 }],
    ])('should reject %s via BadRequestException', (_label, patch) => {
      const input: CreateSellerProductInput = { ...validCreateBase, ...patch };
      expect(() => createPipe.transform(input)).toThrow(BadRequestException);
    });

    it.each([
      ['discount 100', { discount: 100 }],
      ['stockQuantity 0', { stockQuantity: 0 }],
    ])('should resolve %s', (_label, patch) => {
      const input: CreateSellerProductInput = { ...validCreateBase, ...patch };
      expect(createPipe.transform(input)).toEqual(input);
    });
  });

  describe('UpdateSellerProductInput', () => {
    it('should reject discount 150 via BadRequestException', () => {
      const input: UpdateSellerProductInput = { id: 'sp-1', discount: 150 };
      expect(() => updatePipe.transform(input)).toThrow(BadRequestException);
    });

    it('should resolve with only id', () => {
      const input: UpdateSellerProductInput = { id: 'sp-1' };
      expect(updatePipe.transform(input)).toEqual(input);
    });

    it('should resolve with stockQuantity 0', () => {
      const input: UpdateSellerProductInput = { id: 'sp-1', stockQuantity: 0 };
      expect(updatePipe.transform(input)).toEqual(input);
    });
  });
});