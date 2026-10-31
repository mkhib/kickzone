import { describe, it, expect } from 'vitest';
import type { TranslationFunctions } from '@kickzone-workspace/shared-i18n';
import { shippingAddressSchema } from '@kickzone-workspace/validation';
import { createShippingInfoSchema, validateShippingInfo } from './shipping-validation';

const keys: Record<string, string[]> = {
  name: ['required', 'minLength', 'maxLength', 'invalidCharacters'],
  email: ['required', 'maxLength', 'invalid'],
  phone: ['required', 'invalid'],
  address: ['required', 'minLength', 'maxLength'],
  city: ['required', 'minLength', 'maxLength', 'invalidCharacters'],
  state: ['required', 'minLength', 'maxLength', 'invalidCharacters'],
  zipCode: ['required', 'minLength', 'maxLength', 'invalidCharacters'],
  country: ['required', 'minLength', 'maxLength', 'invalidCharacters'],
  notes: ['maxLength'],
  general: ['error'],
};

const validation = Object.fromEntries(
  Object.entries(keys).map(([group, names]) => [
    group,
    Object.fromEntries(names.map((n) => [n, () => `${group}.${n}`])),
  ])
);
const LL = { validation } as unknown as TranslationFunctions;

const valid = {
  customerName: 'Ali Rezaei',
  customerEmail: '',
  customerPhone: '09123456789',
  shippingAddress: 'Valiasr St, No 12',
  city: 'Tehran',
  state: 'Tehran',
  zipCode: '1987654321',
  country: 'Iran',
  notes: '',
};

describe('checkout shipping validation uses the shared schema', () => {
  it('client schema extends the shared shippingAddressSchema fields', () => {
    const clientShape = Object.keys(createShippingInfoSchema(LL).shape);
    for (const key of Object.keys(shippingAddressSchema.shape)) {
      expect(clientShape).toContain(key);
    }
  });

  it('accepts what the server accepts', () => {
    expect(validateShippingInfo(valid, LL).isValid).toBe(true);
    expect(shippingAddressSchema.safeParse(valid).success).toBe(true);
  });

  it.each([
    ['customerName', '', 'name.required'],
    ['customerName', 'A', 'name.minLength'],
    ['customerName', 'Ali123', 'name.invalidCharacters'],
    ['customerEmail', 'nope', 'email.invalid'],
    ['customerPhone', '', 'phone.required'],
    ['customerPhone', '12', 'phone.invalid'],
    ['shippingAddress', '', 'address.required'],
    ['shippingAddress', 'ab', 'address.minLength'],
    ['city', 'T1', 'city.invalidCharacters'],
    ['state', '', 'state.required'],
    ['zipCode', '12', 'zipCode.minLength'],
    ['zipCode', '12#45', 'zipCode.invalidCharacters'],
    ['country', 'I', 'country.minLength'],
    ['notes', 'x'.repeat(501), 'notes.maxLength'],
  ])('maps %s=%j to the localized %s message', (field, value, message) => {
    const result = validateShippingInfo({ ...valid, [field]: value }, LL);
    expect(result.isValid).toBe(false);
    expect(result.errors[field]).toBe(message);
  });

  it('trims values in the validated data', () => {
    const result = validateShippingInfo({ ...valid, city: '  Tehran  ' }, LL);
    expect(result.validatedData?.city).toBe('Tehran');
  });
});
