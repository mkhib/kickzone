import { ValidationPipe, ValidationPipeOptions } from '@nestjs/common';

export const GLOBAL_VALIDATION_PIPE_OPTIONS: ValidationPipeOptions = {
  whitelist: false,
  forbidNonWhitelisted: false,
  forbidUnknownValues: false,
  transform: false,
  stopAtFirstError: true,
};

export function createGlobalValidationPipe(): ValidationPipe {
  return new ValidationPipe(GLOBAL_VALIDATION_PIPE_OPTIONS);
}