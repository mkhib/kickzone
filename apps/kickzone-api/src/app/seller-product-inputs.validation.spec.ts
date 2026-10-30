import { BadRequestException, ValidationPipe } from '@nestjs/common';
import { createGlobalValidationPipe } from './global-validation-pipe';
import { CreateSellerProductInput, UpdateSellerProductInput } from '@kickzone-workspace/inputs';

describe('Seller Product Inputs Validation', () => {
  let pipe: ValidationPipe;

  beforeEach(() => {
    pipe = createGlobalValidationPipe();
  });

  const validCreateBase: CreateSellerProductInput = {
    productInfoId: 1,
    price: 100,
    costPrice: 50,
    discount: 10,
    stockQuantity: 5,
  };

  describe('CreateSellerProductInput', () => {
    it('should resolve valid base input', async () => {
      const result = await pipe.transform(validCreateBase, {
        type: 'body',
        metatype: CreateSellerProductInput,
        data: '',
      });
      expect(result).toEqual(validCreateBase);
    });

    it('should reject discount 101 via BadRequestException', async () => {
      const input: CreateSellerProductInput = {
        ...validCreateBase,
        discount: 101,
      };

      await expect(
        pipe.transform(input, {
          type: 'body',
          metatype: CreateSellerProductInput,
          data: '',
        })
      ).rejects.toThrow(BadRequestException);
    });

    it('should reject discount -1 via BadRequestException', async () => {
      const input: CreateSellerProductInput = {
        ...validCreateBase,
        discount: -1,
      };

      await expect(
        pipe.transform(input, {
          type: 'body',
          metatype: CreateSellerProductInput,
          data: '',
        })
      ).rejects.toThrow(BadRequestException);
    });

    it('should reject price 0 via BadRequestException', async () => {
      const input: CreateSellerProductInput = {
        ...validCreateBase,
        price: 0,
      };

      await expect(
        pipe.transform(input, {
          type: 'body',
          metatype: CreateSellerProductInput,
          data: '',
        })
      ).rejects.toThrow(BadRequestException);
    });

    it('should reject costPrice -1 via BadRequestException', async () => {
      const input: CreateSellerProductInput = {
        ...validCreateBase,
        costPrice: -1,
      };

      await expect(
        pipe.transform(input, {
          type: 'body',
          metatype: CreateSellerProductInput,
          data: '',
        })
      ).rejects.toThrow(BadRequestException);
    });

    it('should reject stockQuantity 1.5 via BadRequestException', async () => {
      const input: CreateSellerProductInput = {
        ...validCreateBase,
        stockQuantity: 1.5,
      };

      await expect(
        pipe.transform(input, {
          type: 'body',
          metatype: CreateSellerProductInput,
          data: '',
        })
      ).rejects.toThrow(BadRequestException);
    });

    it('should resolve discount 100', async () => {
      const input: CreateSellerProductInput = {
        ...validCreateBase,
        discount: 100,
      };

      const result = await pipe.transform(input, {
        type: 'body',
        metatype: CreateSellerProductInput,
        data: '',
      });
      expect(result).toEqual(input);
    });

    it('should resolve stockQuantity 0', async () => {
      const input: CreateSellerProductInput = {
        ...validCreateBase,
        stockQuantity: 0,
      };

      const result = await pipe.transform(input, {
        type: 'body',
        metatype: CreateSellerProductInput,
        data: '',
      });
      expect(result).toEqual(input);
    });
  });

  describe('UpdateSellerProductInput', () => {
    it('should reject discount 150 via BadRequestException', async () => {
      const input: UpdateSellerProductInput = {
        id: 'sp-1',
        discount: 150,
      };

      await expect(
        pipe.transform(input, {
          type: 'body',
          metatype: UpdateSellerProductInput,
          data: '',
        })
      ).rejects.toThrow(BadRequestException);
    });

    it('should resolve with only id', async () => {
      const input: UpdateSellerProductInput = {
        id: 'sp-1',
      };

      const result = await pipe.transform(input, {
        type: 'body',
        metatype: UpdateSellerProductInput,
        data: '',
      });
      expect(result).toEqual(input);
    });

    it('should resolve with stockQuantity 0', async () => {
      const input: UpdateSellerProductInput = {
        id: 'sp-1',
        stockQuantity: 0,
      };

      const result = await pipe.transform(input, {
        type: 'body',
        metatype: UpdateSellerProductInput,
        data: '',
      });
      expect(result).toEqual(input);
    });
  });
});