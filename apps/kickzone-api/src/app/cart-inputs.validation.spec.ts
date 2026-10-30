import { BadRequestException, ValidationPipe } from '@nestjs/common';
import { createGlobalValidationPipe } from './global-validation-pipe';
import { AddToCartInput, UpdateCartItemInput } from '@kickzone-workspace/inputs';

describe('Cart Inputs Validation', () => {
  let pipe: ValidationPipe;

  beforeEach(() => {
    pipe = createGlobalValidationPipe();
  });

  describe('AddToCartInput', () => {
    const validAddToCartBase: AddToCartInput = {
      sellerProductId: 'sp-1',
      quantity: 1,
    };

    it('should reject quantity 0 via BadRequestException', async () => {
      const input: AddToCartInput = {
        ...validAddToCartBase,
        quantity: 0,
      };

      await expect(
        pipe.transform(input, {
          type: 'body',
          metatype: AddToCartInput,
          data: '',
        })
      ).rejects.toThrow(BadRequestException);
    });

    it('should reject quantity -1 via BadRequestException', async () => {
      const input: AddToCartInput = {
        ...validAddToCartBase,
        quantity: -1,
      };

      await expect(
        pipe.transform(input, {
          type: 'body',
          metatype: AddToCartInput,
          data: '',
        })
      ).rejects.toThrow(BadRequestException);
    });

    it('should reject quantity 1.5 via BadRequestException', async () => {
      const input: AddToCartInput = {
        ...validAddToCartBase,
        quantity: 1.5,
      };

      await expect(
        pipe.transform(input, {
          type: 'body',
          metatype: AddToCartInput,
          data: '',
        })
      ).rejects.toThrow(BadRequestException);
    });

    it('should resolve quantity 1 unchanged', async () => {
      const input: AddToCartInput = {
        ...validAddToCartBase,
        quantity: 1,
      };

      const result = await pipe.transform(input, {
        type: 'body',
        metatype: AddToCartInput,
        data: '',
      });
      expect(result).toEqual(input);
    });
  });

  describe('UpdateCartItemInput', () => {
    it('should resolve quantity -5 (not rejected, service clamps to 0)', async () => {
      const input: UpdateCartItemInput = {
        quantity: -5,
      };

      const result = await pipe.transform(input, {
        type: 'body',
        metatype: UpdateCartItemInput,
        data: '',
      });
      expect(result).toEqual(input);
    });
  });
});