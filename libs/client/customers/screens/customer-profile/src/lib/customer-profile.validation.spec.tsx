import { describe, it, expect } from 'vitest';
import type { TranslationFunctions } from '@kickzone-workspace/shared-i18n';
import {
  profileAddressFormSchema,
  profilePhoneFormSchema,
  type ProfileAddressFormInput,
  type ProfilePhoneFormInput,
} from '@kickzone-workspace/validation';
import { createProfileResolver } from './customer-profile';

// Every LL.validation.<field>.<rule>() returns "<field>.<rule>".
const makeLL = (prefix: string[] = []): unknown =>
  new Proxy(() => prefix.slice(1).join('.'), {
    get: (_t, key) => makeLL([...prefix, String(key)]),
  });
const LL = makeLL() as TranslationFunctions;

const opts = { shouldUseNativeValidation: false, fields: {} };

describe('customer profile forms use the shared Zod profile schemas', () => {
  const address = createProfileResolver<ProfileAddressFormInput>(profileAddressFormSchema, LL);
  const phone = createProfileResolver<ProfilePhoneFormInput>(profilePhoneFormSchema, LL);

  it('accepts a valid address with Persian digits and allows blank (cleared) fields', async () => {
    const res = await address(
      { state: '', city: '', address: '', zipCode: '۱۲۳۴۵۶۷۸۹۰', phone: '09128884422', country: '' },
      undefined,
      opts
    );
    expect(res.errors).toEqual({});
  });

  it('reports localized messages for invalid fields, mapped to the checkout rules', async () => {
    const res = await address(
      { state: 'T', city: 'Tehran', address: 'ab', zipCode: '12', phone: 'xx', country: 'Iran' },
      undefined,
      opts
    );
    expect(res.errors['state']?.message).toBe('state.minLength');
    expect(res.errors['address']?.message).toBe('address.minLength');
    expect(res.errors['zipCode']?.message).toBe('zipCode.minLength');
    expect(res.errors['phone']?.message).toBe('phone.invalid');
    expect(res.errors['city']).toBeUndefined();
  });

  it('validates the personal-info phone', async () => {
    expect((await phone({ phone: '0912 888 4422' }, undefined, opts)).errors).toEqual({});
    expect((await phone({ phone: 'abc' }, undefined, opts)).errors['phone']?.message).toBe('phone.invalid');
  });
});