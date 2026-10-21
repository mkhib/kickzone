import { z } from 'zod';
import type { TranslationFunctions } from '@kickzone-workspace/shared-i18n';

export type ShippingInfoFormData = {
  customerName: string;
  customerEmail?: string;
  customerPhone: string;
  shippingAddress: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  notes?: string;
};

export interface ShippingInfoValidationErrors {
  [key: string]: string | undefined;
}

export const createShippingInfoSchema = (LL: TranslationFunctions) =>
  z.object({
    customerName: z
      .string()
      .min(1, LL.validation.name.required())
      .min(2, LL.validation.name.minLength())
      .max(100, LL.validation.name.maxLength())
      .regex(/^[\p{L}\s'-]+$/u, {
        message: LL.validation.name.invalidCharacters(),
      }),

    customerEmail: z
      .string()
      .max(255, LL.validation.email.maxLength())
      .optional()
      .or(z.literal(''))
      .refine(
        (email) => {
          if (!email || email.trim() === '') return true;
          return z.string().email().safeParse(email.trim()).success;
        },
        {
          message: LL.validation.email.invalid(),
        }
      ),

    customerPhone: z
      .string()
      .min(1, LL.validation.phone.required())
      .regex(/^[+]?[\d\s\-()]{7,15}$/, {
        message: LL.validation.phone.invalid(),
      }),

    shippingAddress: z
      .string()
      .min(1, LL.validation.address.required())
      .min(3, LL.validation.address.minLength())
      .max(200, LL.validation.address.maxLength()),

    city: z
      .string()
      .min(1, LL.validation.city.required())
      .min(2, LL.validation.city.minLength())
      .max(100, LL.validation.city.maxLength())
      .regex(/^[\p{L}\s'-]+$/u, {
        message: LL.validation.city.invalidCharacters(),
      }),

    state: z
      .string()
      .min(1, LL.validation.state.required())
      .min(2, LL.validation.state.minLength())
      .max(100, LL.validation.state.maxLength())
      .regex(/^[\p{L}\s'-]+$/u, {
        message: LL.validation.state.invalidCharacters(),
      }),

    zipCode: z
      .string()
      .min(1, LL.validation.zipCode.required())
      .regex(/^[a-zA-Z0-9\s-]+$/, {
        message: LL.validation.zipCode.invalidCharacters(),
      })
      .min(3, LL.validation.zipCode.minLength())
      .max(20, LL.validation.zipCode.maxLength()),

    country: z
      .string()
      .min(1, LL.validation.country.required())
      .min(2, LL.validation.country.minLength())
      .max(100, LL.validation.country.maxLength())
      .regex(/^[\p{L}\s'-]+$/u, {
        message: LL.validation.country.invalidCharacters(),
      }),

    notes: z
      .string()
      .max(500, LL.validation.notes.maxLength())
      .optional()
      .or(z.literal('')),
  });

/**
 * Converts Persian (۰-۹) and Arabic (٠-٩) digits to standard English ASCII digits (0-9).
 */
export const toEnglishDigits = (value: string): string => {
  if (!value) return '';
  return value
    .replace(/[۰-۹]/g, (d) => String.fromCharCode(d.charCodeAt(0) - 1728))
    .replace(/[٠-٩]/g, (d) => String.fromCharCode(d.charCodeAt(0) - 1584));
};

export const validateShippingInfo = (
  data: Partial<ShippingInfoFormData>,
  LL: TranslationFunctions
): {
  isValid: boolean;
  errors: ShippingInfoValidationErrors;
  validatedData?: ShippingInfoFormData;
} => {
  try {
    const normalizedData: Partial<ShippingInfoFormData> = {
      ...data,
      zipCode: data.zipCode ? toEnglishDigits(data.zipCode).trim() : data.zipCode,
      customerPhone: data.customerPhone
        ? toEnglishDigits(data.customerPhone).trim()
        : data.customerPhone,
    };
    const schema = createShippingInfoSchema(LL);
    const validatedData = schema.parse(normalizedData);
    return {
      isValid: true,
      errors: {},
      validatedData,
    };
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errors: ShippingInfoValidationErrors = {};

      error.issues.forEach((err) => {
        if (err.path.length > 0) {
          const fieldName = err.path[0] as string;
          errors[fieldName] = err.message;
        }
      });

      return {
        isValid: false,
        errors,
      };
    }

    // Fallback for unexpected errors
    return {
      isValid: false,
      errors: {
        general: LL.validation.general.error(),
      },
    };
  }
};

// Helper function to get field-specific error message
export const getFieldError = (
  errors: ShippingInfoValidationErrors,
  fieldName: string
): string | undefined => {
  return errors[fieldName];
};

// Helper function to check if form is valid for submission
export const isFormValidForSubmission = (
  data: Partial<ShippingInfoFormData>,
  LL: TranslationFunctions
): boolean => {
  const { isValid } = validateShippingInfo(data, LL);
  return isValid;
};
