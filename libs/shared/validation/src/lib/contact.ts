import { z } from 'zod';

export const CONTACT_LIMITS = {
  fullName: { max: 100 },
  email: { max: 254 },
  phone: { max: 30 },
  inquiryType: { max: 50 },
  subject: { max: 200 },
  message: { max: 5000 },
} as const;

/** Same pattern the contact form has always used. */
export const CONTACT_EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const requiredText = (max: number) => z.string().trim().min(1).max(max);

/** Customer contact (concierge) form. */
export const contactFormSchema = z.object({
  fullName: requiredText(CONTACT_LIMITS.fullName.max),
  email: requiredText(CONTACT_LIMITS.email.max).regex(CONTACT_EMAIL_PATTERN),
  phone: z.string().trim().max(CONTACT_LIMITS.phone.max).optional(),
  inquiryType: requiredText(CONTACT_LIMITS.inquiryType.max),
  subject: requiredText(CONTACT_LIMITS.subject.max),
  message: requiredText(CONTACT_LIMITS.message.max),
});

export type ContactFormInput = z.input<typeof contactFormSchema>;
export type ContactFormData = z.output<typeof contactFormSchema>;