import { BadRequestException } from '@nestjs/common';
import { ZodValidationPipe } from '@kickzone-workspace/resolvers';
import { updateOrderSchema } from '@kickzone-workspace/validation';
import { UpdateOrderInput, UpdateOrderItemInput } from '@kickzone-workspace/inputs';

describe('UpdateOrderInput Validation', () => {
  const pipe = new ZodValidationPipe(updateOrderSchema);

  const validUpdateOrderItem: UpdateOrderItemInput = {
    productId: 'prod-1',
    productName: 'Test Product',
    quantity: 1,
    unitPrice: 10.0,
    totalPrice: 10.0,
  };

  it('should resolve UpdateOrderInput with only trackingNumber (no items)', () => {
    const input: UpdateOrderInput = { trackingNumber: 'T1' };
    expect(pipe.transform(input)).toEqual(input);
  });

  it('should resolve UpdateOrderInput with trackingNumber and items: null', () => {
    const input: UpdateOrderInput = { trackingNumber: 'T1', items: null };
    expect(pipe.transform(input)).toEqual(input);
  });

  it('should reject UpdateOrderInput with items containing quantity 0 via BadRequestException', () => {
    const input: UpdateOrderInput = {
      items: [{ ...validUpdateOrderItem, quantity: 0 }], // invalid: must be >= 1
    };
    expect(() => pipe.transform(input)).toThrow(BadRequestException);
  });

  it('should resolve UpdateOrderInput with items containing quantity 1 and valid fields', () => {
    const input: UpdateOrderInput = { items: [validUpdateOrderItem] };
    expect(pipe.transform(input)).toEqual(input);
  });
});