import { renderHook } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { useSiteLanguages } from './useSiteLanguages';
import * as apolloReact from '@apollo/client/react';

vi.mock('@apollo/client/react', () => ({
  useQuery: vi.fn(),
  gql: vi.fn((strings: TemplateStringsArray) => strings.join('')),
}));

describe('useSiteLanguages', () => {
  it('should return site languages from query', () => {
    const mockLanguages = [
      { id: '1', code: 'en', name: 'English', nativeName: 'English', isRTL: false, isActive: true, isDefault: false },
      { id: '2', code: 'fa', name: 'Persian', nativeName: 'فارسی', isRTL: true, isActive: true, isDefault: true },
    ];

    vi.mocked(apolloReact.useQuery).mockReturnValue({
      data: { siteLanguages: mockLanguages },
      loading: false,
      error: undefined,
      refetch: vi.fn(),
    } as unknown as ReturnType<typeof apolloReact.useQuery>);

    const { result } = renderHook(() => useSiteLanguages());

    expect(result.current.siteLanguages).toEqual(mockLanguages);
    expect(result.current.loading).toBe(false);
  });
});
