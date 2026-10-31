import { BadRequestException } from '@nestjs/common';
import { ZodValidationPipe } from '@kickzone-workspace/resolvers';
import { createOrderSchema } from '@kickzone-workspace/validation';
import { CreateOrderInput, CreateOrderItemInput } from '@kickzone-workspace/inputs';

describe('Order Inputs Validation', () => {
  const pipe = new ZodValidationPipe(createOrderSchema);

  const validOrderItem: CreateOrderItemInput = {
    productId: 'prod-1',
    productName: 'Test Product',
    quantity: 1,
    unitPrice: 10.0,
    totalPrice: 10.0,
  };

  const validOrderBase = {
    customerEmail: 'customer@example.com',
    customerPhone: '+1234567890',
    customerName: 'John Doe',
    shippingAddress: '123 Main St',
    city: 'New York',
    state: 'NY',
    zipCode: '10001',
    country: 'USA',
    sellerId: 1,
  };

  it('should reject CreateOrderInput with quantity 0 via BadRequestException', () => {
    const input: CreateOrderInput = {
      ...validOrderBase,
      items: [{ ...validOrderItem, quantity: 0 }], // invalid: must be >= 1
    };
    expect(() => pipe.transform(input)).toThrow(BadRequestException);
  });

  it('should reject CreateOrderInput with quantity 1.5 via BadRequestException', () => {
    const input: CreateOrderInput = {
      ...validOrderBase,
      items: [{ ...validOrderItem, quantity: 1.5 }], // invalid: must be integer
    };
    expect(() => pipe.transform(input)).toThrow(BadRequestException);
  });

  it('should resolve CreateOrderInput with quantity 1 and valid fields', () => {
    const input: CreateOrderInput = { ...validOrderBase, items: [validOrderItem] };
    expect(pipe.transform(input)).toEqual(input);
  });
});