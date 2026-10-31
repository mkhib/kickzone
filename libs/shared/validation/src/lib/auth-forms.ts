import { z } from 'zod';
import { personNameSchema, emailSchema, newPasswordSchema, loginPasswordSchema } from './auth';

export const customerSignupFormSchema = z
  .object({
    name: personNameSchema,
    email: emailSchema,
    password: newPasswordSchema,
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: 'passwordsDoNotMatch',
  });

export type CustomerSignupFormValues = z.input<typeof customerSignupFormSchema>;

export const customerLoginFormSchema = z.object({
  email: emailSchema,
  password: loginPasswordSchema,
});

export type CustomerLoginFormValues = z.input<typeof customerLoginFormSchema>;

export const customerForgotPasswordFormSchema = z.object({
  email: emailSchema,
});

export type CustomerForgotPasswordFormValues = z.input<typeof customerForgotPasswordFormSchema>;

export const customerResetPasswordFormSchema = z
  .object({
    password: newPasswordSchema,
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: 'passwordsDoNotMatch',
  });

export type CustomerResetPasswordFormValues = z.input<typeof customerResetPasswordFormSchema>;

// Seller form schemas (same rules as customer, no duplication)
export const sellerLoginFormSchema = customerLoginFormSchema;
export type SellerLoginFormValues = CustomerLoginFormValues;

export const sellerSetupPasswordFormSchema = customerResetPasswordFormSchema;
export type SellerSetupPasswordFormValues = CustomerResetPasswordFormValues;