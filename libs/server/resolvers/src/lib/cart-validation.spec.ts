import { BadRequestException } from '@nestjs/common';
import { ROUTE_ARGS_METADATA } from '@nestjs/common/constants';
import { CartResolver } from './cart.resolver';
import { ZodValidationPipe } from './zod-validation.pipe';
import { idSchema, addToCartSchema } from '@kickzone-workspace/validation';

import type { ZodType } from 'zod';

type ParamMetadata = { index: number; pipes?: unknown[] };

describe('Cart resolver argument validation pipes', () => {
  function getParamMetadata(target: object, methodName: string) {
    const args = Reflect.getMetadata(ROUTE_ARGS_METADATA, target.constructor, methodName) ?? {};
    return Object.values(args) as ParamMetadata[];
  }

  function findPipeForArg(paramMetadata: ParamMetadata[], argIndex: number): ZodValidationPipe<ZodType> | undefined {
    const param = paramMetadata.find((p) => p.index === argIndex);
    return param?.pipes?.find((pipe): pipe is ZodValidationPipe<ZodType> => pipe instanceof ZodValidationPipe);
  }

  describe('CartResolver', () => {
    describe('addToCart', () => {
      it('has ZodValidationPipe for addToCartInput (arg 1)', () => {
        const metadata = getParamMetadata(CartResolver.prototype, 'addToCart');
        const pipe = findPipeForArg(metadata, 1);
        expect(pipe).toBeInstanceOf(ZodValidationPipe);
      });

      it('addToCart pipe rejects quantity 0 with BadRequestException', () => {
        const metadata = getParamMetadata(CartResolver.prototype, 'addToCart');
        const pipe = findPipeForArg(metadata, 1) as ZodValidationPipe<ZodType<{ sellerProductId: string; quantity: number }>>;
        expect(() => pipe.transform({ sellerProductId: 'sp-1', quantity: 0 })).toThrow(BadRequestException);
      });

      it('addToCart pipe accepts valid input', () => {
        const metadata = getParamMetadata(CartResolver.prototype, 'addToCart');
        const pipe = findPipeForArg(metadata, 1) as ZodValidationPipe<ZodType<{ sellerProductId: string; quantity: number }>>;
        const validInput = { sellerProductId: 'sp-1', quantity: 1 };
        expect(() => pipe.transform(validInput)).not.toThrow();
        const result = pipe.transform(validInput);
        expect(result.sellerProductId).toBe('sp-1');
        expect(result.quantity).toBe(1);
      });
    });

    describe('updateCartItem', () => {
      it('has ZodValidationPipe for itemId (arg 1)', () => {
        const metadata = getParamMetadata(CartResolver.prototype, 'updateCartItem');
        const pipe = findPipeForArg(metadata, 1);
        expect(pipe).toBeInstanceOf(ZodValidationPipe);
      });

      it('has ZodValidationPipe for updateInput (arg 2)', () => {
        const metadata = getParamMetadata(CartResolver.prototype, 'updateCartItem');
        const pipe = findPipeForArg(metadata, 2);
        expect(pipe).toBeInstanceOf(ZodValidationPipe);
      });

      it('updateInput pipe accepts all-null', () => {
        const metadata = getParamMetadata(CartResolver.prototype, 'updateCartItem');
        const pipe = findPipeForArg(metadata, 2) as ZodValidationPipe<ZodType<{ sellerProductId: string; quantity: number }>>;
        const allNullInput = { quantity: null, color: null, size: null };
        expect(() => pipe.transform(allNullInput)).not.toThrow();
        const result = pipe.transform(allNullInput);
        expect(result).toEqual({ quantity: null, color: null, size: null });
      });

      it('itemId pipe rejects whitespace only', () => {
        const metadata = getParamMetadata(CartResolver.prototype, 'updateCartItem');
        const pipe = findPipeForArg(metadata, 1) as ZodValidationPipe<ZodType<{ sellerProductId: string; quantity: number }>>;
        expect(() => pipe.transform('  ')).toThrow(BadRequestException);
      });

      it('itemId pipe accepts valid id', () => {
        const metadata = getParamMetadata(CartResolver.prototype, 'updateCartItem');
        const pipe = findPipeForArg(metadata, 1) as ZodValidationPipe<ZodType<{ sellerProductId: string; quantity: number }>>;
        expect(() => pipe.transform('item-123')).not.toThrow();
        const result = pipe.transform('item-123');
        expect(result).toBe('item-123');
      });
    });

    describe('removeFromCart', () => {
      it('has ZodValidationPipe for itemId (arg 1)', () => {
        const metadata = getParamMetadata(CartResolver.prototype, 'removeFromCart');
        const pipe = findPipeForArg(metadata, 1);
        expect(pipe).toBeInstanceOf(ZodValidationPipe);
      });

      it('itemId pipe rejects whitespace only', () => {
        const metadata = getParamMetadata(CartResolver.prototype, 'removeFromCart');
        const pipe = findPipeForArg(metadata, 1) as ZodValidationPipe<ZodType<{ sellerProductId: string; quantity: number }>>;
        expect(() => pipe.transform('  ')).toThrow(BadRequestException);
      });

      it('itemId pipe accepts valid id', () => {
        const metadata = getParamMetadata(CartResolver.prototype, 'removeFromCart');
        const pipe = findPipeForArg(metadata, 1) as ZodValidationPipe<ZodType<{ sellerProductId: string; quantity: number }>>;
        expect(() => pipe.transform('item-123')).not.toThrow();
        const result = pipe.transform('item-123');
        expect(result).toBe('item-123');
      });
    });
  });

  describe('schema imports sync with primitives', () => {
    it('addToCartSchema uses idSchema for sellerProductId', () => {
      const result = addToCartSchema.safeParse({ sellerProductId: '  sp-1  ', quantity: 1 });
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.sellerProductId).toBe('sp-1');
      }
    });

    it('updateCartItemSchema uses idSchema for itemId validation', () => {
      const result = idSchema.safeParse('  item-123  ');
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data).toBe('item-123');
      }
    });
  });
});