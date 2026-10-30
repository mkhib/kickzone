import { BadRequestException, ValidationPipe } from '@nestjs/common';
import { createGlobalValidationPipe } from './global-validation-pipe';
import { UpdateOrderInput, UpdateOrderItemInput } from '@kickzone-workspace/inputs';

describe('UpdateOrderInput Validation', () => {
  let pipe: ValidationPipe;

  beforeEach(() => {
    pipe = createGlobalValidationPipe();
  });

  const validUpdateOrderItem: UpdateOrderItemInput = {
    productId: 'prod-1',
    productName: 'Test Product',
    quantity: 1,
    unitPrice: 10.0,
    totalPrice: 10.0,
  };

  it('should resolve UpdateOrderInput with only trackingNumber (no items)', async () => {
    const input: UpdateOrderInput = {
      trackingNumber: 'T1',
    };

    const result = await pipe.transform(input, {
      type: 'body',
      metatype: UpdateOrderInput,
      data: '',
    });

    expect(result).toEqual(input);
  });

  it('should resolve UpdateOrderInput with trackingNumber and items: null', async () => {
    const input: UpdateOrderInput = {
      trackingNumber: 'T1',
      items: null,
    };

    const result = await pipe.transform(input, {
      type: 'body',
      metatype: UpdateOrderInput,
      data: '',
    });

    expect(result).toEqual(input);
  });

  it('should reject UpdateOrderInput with items containing quantity 0 via BadRequestException', async () => {
    const input: UpdateOrderInput = {
      items: [
        {
          ...validUpdateOrderItem,
          quantity: 0, // invalid: must be >= 1
        },
      ],
    };

    await expect(
      pipe.transform(input, {
        type: 'body',
        metatype: UpdateOrderInput,
        data: '',
      })
    ).rejects.toThrow(BadRequestException);
  });

  it('should resolve UpdateOrderInput with items containing quantity 1 and valid fields', async () => {
    const input: UpdateOrderInput = {
      items: [validUpdateOrderItem],
    };

    const result = await pipe.transform(input, {
      type: 'body',
      metatype: UpdateOrderInput,
      data: '',
    });

    expect(result).toEqual(input);
  });
});