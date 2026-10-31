import {
  profileAddressFormSchema,
  profilePhoneFormSchema,
  updateCustomerProfileSchema,
} from './profile';

describe('updateCustomerProfileSchema', () => {
  it('accepts a full valid profile and partial updates', () => {
    expect(
      updateCustomerProfileSchema.safeParse({
        phone: '09121234567',
        address: 'Valiasr St, No 12',
        city: 'Tehran',
        state: 'Tehran',
        zipCode: '1234567890',
        country: 'Iran',
        clothingSize: 'L',
        shoeSize: '42',
      }).success
    ).toBe(true);
    expect(updateCustomerProfileSchema.safeParse({ phone: '09121234567' }).success).toBe(true);
    expect(updateCustomerProfileSchema.safeParse({}).success).toBe(true);
  });

  it('allows clearing fields with empty strings or null', () => {
    expect(
      updateCustomerProfileSchema.safeParse({ state: '', city: '', zipCode: '', clothingSize: null }).success
    ).toBe(true);
  });

  it('rejects invalid non-empty values', () => {
    expect(updateCustomerProfileSchema.safeParse({ phone: '12' }).success).toBe(false);
    expect(updateCustomerProfileSchema.safeParse({ zipCode: '12#4' }).success).toBe(false);
    expect(updateCustomerProfileSchema.safeParse({ city: 'T1' }).success).toBe(false);
    expect(updateCustomerProfileSchema.safeParse({ clothingSize: 'x'.repeat(21) }).success).toBe(false);
  });

  it('accepts Farsi city and state', () => {
    expect(updateCustomerProfileSchema.safeParse({ city: 'تهران', state: 'تهران' }).success).toBe(true);
  });
});

describe('profile form schemas', () => {
  it('address form accepts blanks and validates filled fields', () => {
    expect(
      profileAddressFormSchema.safeParse({ state: '', city: '', address: '', zipCode: '', phone: '', country: 'ایران' })
        .success
    ).toBe(true);
    expect(profileAddressFormSchema.safeParse({ zipCode: '1' }).success).toBe(false);
  });

  it('phone form validates the phone', () => {
    expect(profilePhoneFormSchema.safeParse({ phone: '09121234567' }).success).toBe(true);
    expect(profilePhoneFormSchema.safeParse({ phone: 'abc' }).success).toBe(false);
  });
});
