import { BadRequestException } from '@nestjs/common';
import { z } from 'zod';
import { ZodValidationPipe } from './zod-validation.pipe';

describe('ZodValidationPipe', () => {
  const schema = z.object({
    name: z.string().trim().min(1),
    age: z.number().int().min(1),
  });

  const pipe = new ZodValidationPipe(schema);

  describe('transform', () => {
    it('returns parsed data with trim applied', () => {
      const input = { name: '  John  ', age: 30 };
      const result = pipe.transform(input);
      expect(result).toEqual({ name: 'John', age: 30 });
    });

    it('throws BadRequestException for invalid input', () => {
      const input = { name: '', age: 30 };
      expect(() => pipe.transform(input)).toThrow(BadRequestException);
    });

    it('exception response has message Validation failed', () => {
      const input = { name: '', age: 30 };
      try {
        pipe.transform(input);
      } catch (e: unknown) {
        expect(e).toBeInstanceOf(BadRequestException);
        const response = (e as BadRequestException).getResponse();
        expect(response).toMatchObject({
          message: 'Validation failed',
        });
      }
    });

    it('exception response errors array contains failing path', () => {
      const input = { name: '', age: 30 };
      try {
        pipe.transform(input);
      } catch (e: unknown) {
        const response = (e as BadRequestException).getResponse() as { errors: Array<{ path: string }> };
        expect(response.errors).toEqual(
          expect.arrayContaining([expect.objectContaining({ path: 'name' })])
        );
      }
    });

    it('strips extra unknown keys (z.object default)', () => {
      const input = { name: 'John', age: 30, extra: 'should be stripped' };
      const result = pipe.transform(input);
      expect(result).toEqual({ name: 'John', age: 30 });
      expect(result).not.toHaveProperty('extra');
    });
  });
});