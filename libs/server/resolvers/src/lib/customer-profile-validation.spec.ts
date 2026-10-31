import { BadRequestException, PipeTransform } from '@nestjs/common';
import { ROUTE_ARGS_METADATA } from '@nestjs/common/constants';
import { CustomerProfileResolver } from './customer-profile.resolver';
import { ZodValidationPipe } from './zod-validation.pipe';

type ParamMeta = { index: number; pipes?: PipeTransform[] };

function zodPipe(method: string, argIndex: number): PipeTransform {
  const raw = (Reflect.getMetadata(ROUTE_ARGS_METADATA, CustomerProfileResolver, method) ?? {}) as Record<
    string,
    ParamMeta
  >;
  const param = Object.values(raw).find((p) => p.index === argIndex);
  const pipe = param?.pipes?.find((p) => p instanceof ZodValidationPipe);
  if (!pipe) throw new Error(`no ZodValidationPipe on ${method} arg ${argIndex}`);
  return pipe;
}

describe('CustomerProfileResolver argument validation', () => {
  const pipe = () => zodPipe('updateMyProfile', 1);
  const run = (value: unknown) => pipe().transform(value, { type: 'body' });

  it('accepts valid and blank profile updates', () => {
    expect(() => run({ phone: '09121234567', city: 'Tehran' })).not.toThrow();
    expect(() => run({ state: '', zipCode: '' })).not.toThrow();
  });

  it('rejects an invalid phone or postal code', () => {
    expect(() => run({ phone: '12' })).toThrow(BadRequestException);
    expect(() => run({ zipCode: '1#' })).toThrow(BadRequestException);
  });
});
