import { BadRequestException } from '@nestjs/common';
import { ZodValidationPipe } from '@kickzone-workspace/resolvers';
import { addToCartSchema, updateCartItemSchema } from '@kickzone-workspace/validation';
import { AddToCartInput, UpdateCartItemInput } from '@kickzone-workspace/inputs';

// Cart inputs are validated by the resolver's ZodValidationPipe with the shared cart schemas.
describe('Cart Inputs Validation', () => {
  const addPipe = new ZodValidationPipe(addToCartSchema);
  const updatePipe = new ZodValidationPipe(updateCartItemSchema);

  describe('AddToCartInput', () => {
    const validAddToCartBase: AddToCartInput = {
      sellerProductId: 'sp-1',
      quantity: 1,
    };

    it.each([0, -1, 1.5])('should reject quantity %p via BadRequestException', (quantity) => {
      const input: AddToCartInput = { ...validAddToCartBase, quantity };
      expect(() => addPipe.transform(input)).toThrow(BadRequestException);
    });

    it('should resolve quantity 1 unchanged', () => {
      const input: AddToCartInput = { ...validAddToCartBase, quantity: 1 };
      expect(addPipe.transform(input)).toEqual(input);
    });
  });

  describe('UpdateCartItemInput', () => {
    // Changed from the class-validator era: the shared cart rule (V2a) requires a
    // quantity of 1-999, so -5 is now rejected at the API instead of being clamped.
    it('should reject quantity -5 via BadRequestException', () => {
      const input: UpdateCartItemInput = { quantity: -5 };
      expect(() => updatePipe.transform(input)).toThrow(BadRequestException);
    });

    it('should resolve quantity 2 unchanged', () => {
      const input: UpdateCartItemInput = { quantity: 2 };
      expect(updatePipe.transform(input)).toEqual(input);
    });
  });
});