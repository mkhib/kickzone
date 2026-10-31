import { z } from 'zod';
import {
  optionalEmailSchema,
  shippingAddressSchema,
} from '@kickzone-workspace/validation';
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

/**
 * Checkout shipping schema: the shared server-side order/shipping rules
 * (`shippingAddressSchema`) plus client-only fields. Email may be omitted for guests.
 */
export const createShippingInfoSchema = (LL: TranslationFunctions) =>
  shippingAddressSchema.extend({
    customerEmail: optionalEmailSchema.optional(),
    notes: z
      .string()
      .max(500, LL.validation.notes.maxLength())
      .optional()
      .or(z.literal('')),
  });

type ShippingIssue = {
  code: string;
  path?: PropertyKey[];
  input?: unknown;
};

const isBlank = (input: unknown) =>
  input === undefined || input === null || String(input).trim() === '';

/** Maps a shared-schema issue to the existing localized checkout message. */
export const shippingIssueMessage = (
  issue: ShippingIssue,
  LL: TranslationFunctions
): string => {
  const field = String(issue.path?.[0] ?? '');
  const v = LL.validation;
  const kind =
    issue.code === 'invalid_type' || (issue.code === 'too_small' && isBlank(issue.input))
      ? 'required'
      : issue.code === 'too_small'
      ? 'min'
      : issue.code === 'too_big'
      ? 'max'
      : 'format';

  switch (field) {
    case 'customerName':
      return kind === 'required'
        ? v.name.required()
        : kind === 'min'
        ? v.name.minLength()
        : kind === 'max'
        ? v.name.maxLength()
        : v.name.invalidCharacters();
    case 'customerEmail':
      return kind === 'max' ? v.email.maxLength() : v.email.invalid();
    case 'customerPhone':
      return isBlank(issue.input) ? v.phone.required() : v.phone.invalid();
    case 'shippingAddress':
      return kind === 'required'
        ? v.address.required()
        : kind === 'max'
        ? v.address.maxLength()
        : v.address.minLength();
    case 'city':
      return kind === 'required'
        ? v.city.required()
        : kind === 'min'
        ? v.city.minLength()
        : kind === 'max'
        ? v.city.maxLength()
        : v.city.invalidCharacters();
    case 'state':
      return kind === 'required'
        ? v.state.required()
        : kind === 'min'
        ? v.state.minLength()
        : kind === 'max'
        ? v.state.maxLength()
        : v.state.invalidCharacters();
    case 'zipCode':
      return kind === 'required'
        ? v.zipCode.required()
        : kind === 'min'
        ? v.zipCode.minLength()
        : kind === 'max'
        ? v.zipCode.maxLength()
        : v.zipCode.invalidCharacters();
    case 'country':
      return kind === 'required'
        ? v.country.required()
        : kind === 'max'
        ? v.country.maxLength()
        : v.country.minLength();
    case 'notes':
      return v.notes.maxLength();
    default:
      return v.general.error();
  }
};

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
    const validatedData = schema.parse(normalizedData, {
      error: (issue) => shippingIssueMessage(issue, LL),
    });
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
          // Keep the first (most specific) message, e.g. "required" for an empty field.
          if (!errors[fieldName]) errors[fieldName] = err.message;
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
