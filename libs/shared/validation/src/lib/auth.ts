import { z } from 'zod';
import { VALIDATION_LIMITS } from './limits';
import { trimmedString } from './primitives';

export const USER_ROLES = ['ADMIN', 'SELLER', 'CUSTOMER'] as const;

export const emailSchema = z.string().trim().max(254).pipe(z.email());

export const loginPasswordSchema = z.string().min(1).max(VALIDATION_LIMITS.password.max);

export const newPasswordSchema = z
  .string()
  .min(VALIDATION_LIMITS.password.min)
  .max(VALIDATION_LIMITS.password.max);

export const personNameSchema = trimmedString(1, 100);

export const usernameSchema = z
  .string()
  .trim()
  .min(3)
  .max(50)
  .regex(/^[A-Za-z0-9_.-]+$/);

export const tokenSchema = z.string().trim().min(1).max(512);

export const baseUrlSchema = z.url({ protocol: /^https?$/ }).max(2048);

export const userRoleSchema = z.enum(USER_ROLES);

export const createUserSchema = z.object({
  name: personNameSchema,
  lastName: personNameSchema,
  username: usernameSchema,
  email: emailSchema,
  password: newPasswordSchema,
  role: userRoleSchema,
});

export type CreateUserData = z.infer<typeof createUserSchema>;
export type EmailData = z.infer<typeof emailSchema>;
export type LoginPasswordData = z.infer<typeof loginPasswordSchema>;
export type NewPasswordData = z.infer<typeof newPasswordSchema>;
export type PersonNameData = z.infer<typeof personNameSchema>;
export type UsernameData = z.infer<typeof usernameSchema>;
export type TokenData = z.infer<typeof tokenSchema>;
export type BaseUrlData = z.infer<typeof baseUrlSchema>;
export type UserRoleData = z.infer<typeof userRoleSchema>;