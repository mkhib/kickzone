import { BadRequestException, PipeTransform } from '@nestjs/common';
import { z } from 'zod';
import { toValidationIssues } from '@kickzone-workspace/validation';

export class ZodValidationPipe<S extends z.ZodType> implements PipeTransform<unknown, z.output<S>> {
  constructor(private readonly schema: S) {}

  transform(value: unknown): z.output<S> {
    const r = this.schema.safeParse(value);
    if (!r.success) {
      throw new BadRequestException({
        message: 'Validation failed',
        errors: toValidationIssues(r.error),
      });
    }
    return r.data;
  }
}