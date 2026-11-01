import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { ShippingValidation } from './shipping-validation.tsx';
import { toEnglishDigits, validateShippingInfo } from './shipping-validation.ts';

describe('ShippingValidation', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ShippingValidation />);
    expect(baseElement).toBeTruthy();
  });

  it('toEnglishDigits converts Persian and Arabic digits to English digits', () => {
    expect(toEnglishDigits('۰۱۲۳۴۵۶۷۸۹')).toBe('0123456789');
    expect(toEnglishDigits('٠١٢٣٤٥٦٧٨٩')).toBe('0123456789');
    expect(toEnglishDigits('تهران ۱۹۸۷۶')).toBe('تهران 19876');
    expect(toEnglishDigits('')).toBe('');
  });

  it('validateShippingInfo accepts Persian postal code and normalizes it to English', () => {
    const mockLL = {
      validation: {
        name: { required: () => '', minLength: () => '', maxLength: () => '', invalidCharacters: () => '' },
        email: { required: () => '', maxLength: () => '', invalid: () => '' },
        phone: { required: () => '', invalid: () => '' },
        address: { required: () => '', minLength: () => '', maxLength: () => '' },
        city: { required: () => '', minLength: () => '', maxLength: () => '', invalidCharacters: () => '' },
        state: { required: () => '', minLength: () => '', maxLength: () => '', invalidCharacters: () => '' },
        zipCode: { required: () => '', minLength: () => '', maxLength: () => '', invalidCharacters: () => '' },
        country: { required: () => '', minLength: () => '', maxLength: () => '', invalidCharacters: () => '' },
        notes: { maxLength: () => '' },
        general: { error: () => '' },
      },
    };

    const result = validateShippingInfo(
      {
        customerName: 'آرشام پارسا',
        customerEmail: 'test@example.com',
        customerPhone: '۰۹۱۲۳۴۵۶۷۸۹',
        shippingAddress: 'خیابان ولیعصر',
        city: 'تهران',
        state: 'تهران',
        zipCode: '۱۹۸۷۶۵۴۳۲۱',
        country: 'ایران',
      },
      mockLL as unknown as Parameters<typeof validateShippingInfo>[1]
    );

    expect(result.isValid).toBe(true);
    expect(result.validatedData?.zipCode).toBe('1987654321');
    expect(result.validatedData?.customerPhone).toBe('09123456789');
  });

  it('validateShippingInfo allows guest checkout with empty or omitted customerEmail', () => {
    const mockLL = {
      validation: {
        name: { required: () => '', minLength: () => '', maxLength: () => '', invalidCharacters: () => '' },
        email: { required: () => '', maxLength: () => '', invalid: () => 'Invalid email' },
        phone: { required: () => '', invalid: () => '' },
        address: { required: () => '', minLength: () => '', maxLength: () => '' },
        city: { required: () => '', minLength: () => '', maxLength: () => '', invalidCharacters: () => '' },
        state: { required: () => '', minLength: () => '', maxLength: () => '', invalidCharacters: () => '' },
        zipCode: { required: () => '', minLength: () => '', maxLength: () => '', invalidCharacters: () => '' },
        country: { required: () => '', minLength: () => '', maxLength: () => '', invalidCharacters: () => '' },
        notes: { maxLength: () => '' },
        general: { error: () => '' },
      },
    };

    const result = validateShippingInfo(
      {
        customerName: 'Guest User',
        customerPhone: '+989123456789',
        shippingAddress: 'Tehran Valiasr St',
        city: 'Tehran',
        state: 'Tehran',
        zipCode: '1234567890',
        country: 'Iran',
      },
      mockLL as unknown as Parameters<typeof validateShippingInfo>[1]
    );

    expect(result.isValid).toBe(true);
  });
});
