import { z } from 'zod';

export interface ValidationIssue {
  path: string;
  message: string;
  code: string;
}

export function toValidationIssues(error: z.ZodError): ValidationIssue[] {
  return error.issues.map((issue) => ({
    path: issue.path.join('.'),
    message: issue.message,
    code: issue.code,
  }));
}