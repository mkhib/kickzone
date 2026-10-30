import { BadRequestException, ValidationPipe } from '@nestjs/common';
import { createGlobalValidationPipe } from './global-validation-pipe';
import { CreateOrderInput, CreateOrderItemInput } from '@kickzone-workspace/inputs';

describe('Order Inputs Validation', () => {
  let pipe: ValidationPipe;

  beforeEach(() => {
    pipe = createGlobalValidationPipe();
  });

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

  it('should reject CreateOrderInput with quantity 0 via BadRequestException', async () => {
    const input: CreateOrderInput = {
      ...validOrderBase,
      items: [
        {
          ...validOrderItem,
          quantity: 0, // invalid: must be >= 1
        },
      ],
    };

    await expect(
      pipe.transform(input, {
        type: 'body',
        metatype: CreateOrderInput,
        data: '',
      })
    ).rejects.toThrow(BadRequestException);
  });

  it('should reject CreateOrderInput with quantity 1.5 via BadRequestException', async () => {
    const input: CreateOrderInput = {
      ...validOrderBase,
      items: [
        {
          ...validOrderItem,
          quantity: 1.5, // invalid: must be integer
        },
      ],
    };

    await expect(
      pipe.transform(input, {
        type: 'body',
        metatype: CreateOrderInput,
        data: '',
      })
    ).rejects.toThrow(BadRequestException);
  });

  it('should resolve CreateOrderInput with quantity 1 and valid fields', async () => {
    const input: CreateOrderInput = {
      ...validOrderBase,
      items: [validOrderItem],
    };

    const result = await pipe.transform(input, {
      type: 'body',
      metatype: CreateOrderInput,
      data: '',
    });

    expect(result).toEqual(input);
  });
});