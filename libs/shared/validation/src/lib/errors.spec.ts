import { describe, expect, it } from 'vitest';
import { z } from 'zod';
import { toValidationIssues } from './errors';

describe('errors', () => {
  describe('toValidationIssues', () => {
    it('returns path, code, message for nested object failure', () => {
      const schema = z.object({
        a: z.object({
          b: z.string(),
        }),
      });

      const result = schema.safeParse({ a: { b: 1 } });
      expect(result.success).toBe(false);

      if (!result.success) {
        const issues = toValidationIssues(result.error);
        expect(issues).toHaveLength(1);
        expect(issues[0].path).toBe('a.b');
        expect(issues[0].code).toBe('invalid_type');
        expect(typeof issues[0].message).toBe('string');
        expect(issues[0].message.length).toBeGreaterThan(0);
      }
    });

    it('returns empty path for root level failure', () => {
      const schema = z.string();
      const result = schema.safeParse(123);
      expect(result.success).toBe(false);

      if (!result.success) {
        const issues = toValidationIssues(result.error);
        expect(issues).toHaveLength(1);
        expect(issues[0].path).toBe('');
        expect(issues[0].code).toBe('invalid_type');
      }
    });

    it('returns multiple issues for multiple failures', () => {
      const schema = z.object({
        x: z.string(),
        y: z.number(),
      });

      const result = schema.safeParse({ x: 1, y: 'two' });
      expect(result.success).toBe(false);

      if (!result.success) {
        const issues = toValidationIssues(result.error);
        expect(issues).toHaveLength(2);
        const paths = issues.map((i) => i.path).sort();
        expect(paths).toEqual(['x', 'y']);
      }
    });
  });
});