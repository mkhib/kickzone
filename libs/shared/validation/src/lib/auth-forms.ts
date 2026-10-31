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