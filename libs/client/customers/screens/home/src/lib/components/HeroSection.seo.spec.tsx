import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { describe, expect, it, vi } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { HeroSection } from './HeroSection';
import { CategoryBentoSection } from './CategoryBentoSection';

let mockLocale = 'fa';

vi.mock('@kickzone-workspace/shared-ui-store', () => ({
  useUIStore: (selector: (s: { theme: { mode: string } }) => unknown) =>
    selector({ theme: { mode: 'light' } }),
}));

vi.mock('@kickzone-workspace/shared-i18n', async (importOriginal) => {
  const actual = await importOriginal<typeof import('@kickzone-workspace/shared-i18n')>();
  return {
    ...actual,
    useLanguageContext: () => ({
      currentLocale: mockLocale,
      formatNumber: (n: number | string) => String(n),
      isRTL: mockLocale === 'fa',
    }),
    useI18nContext: () => ({
      LL: {
        home: {
          categories: {
            kicker: () => 'Categories',
            title: () => 'Shop by category',
            women: () => 'Women',
            men: () => 'Men',
            hoodies: () => 'Hoodies',
            pants: () => 'Pants',
            jordan: () => 'Jordan',
            jordanTagline: () => 'Jordan tagline',
            productCount: ({ count }: { count: string }) => `${count} items`,
          },
        },
      },
    }),
  };
});

function renderHero() {
  return render(
    <MemoryRouter>
      <HeroSection />
    </MemoryRouter>
  );
}

describe('HeroSection SEO', () => {
  it('keeps Rise Above in the h1 and adds Farsi SAINTBALA context when locale is fa', () => {
    mockLocale = 'fa';
    renderHero();
    const heading = document.querySelector('h1');
    expect(heading).toBeTruthy();
    expect(heading?.textContent).toContain('Rise Above');
    expect(heading?.textContent).toContain('SAINTBALA');
    expect(heading?.textContent).toContain('فروشگاه آنلاین پوشاک');
    expect(heading?.querySelector('bdi')?.textContent).toBe('Rise Above');
  });

  it('adds English SAINTBALA context to the h1 when locale is en', () => {
    mockLocale = 'en';
    renderHero();
    const heading = document.querySelector('h1');
    expect(heading?.textContent).toContain('Rise Above');
    expect(heading?.textContent).toContain('SAINTBALA');
    expect(heading?.textContent).toContain('Authentic Luxury Streetwear & Sneakers');
  });

  it('gives hero panel images non-empty localized alts that include SAINTBALA', () => {
    mockLocale = 'fa';
    renderHero();
    const images = Array.from(
      document.querySelectorAll<HTMLImageElement>('.hero-panel-img')
    );
    expect(images.length).toBeGreaterThan(0);
    images.forEach((img) => {
      expect(img.getAttribute('alt')).toBeTruthy();
      expect(img.alt).toContain('SAINTBALA');
    });
    const alts = images.map((img) => img.alt);
    expect(alts.some((alt) => alt.includes('زنانه') || alt.includes("Women"))).toBe(
      true
    );
    expect(alts.some((alt) => alt.includes('مردانه') || alt.includes("Men"))).toBe(
      true
    );
  });
});

describe('CategoryBentoSection SEO', () => {
  it('sets non-empty alts that include the category title and SAINTBALA', () => {
    mockLocale = 'en';
    render(
      <MemoryRouter>
        <CategoryBentoSection
          bento={{
            jordan: { count: 1 },
            women: { count: 1 },
            men: { count: 1 },
            hoodies: { count: 1 },
            pants: { count: 1 },
          }}
        />
      </MemoryRouter>
    );
    const images = Array.from(
      document.querySelectorAll<HTMLImageElement>('.bento-tile-img')
    );
    expect(images.length).toBe(5);
    images.forEach((img) => {
      expect(img.alt).toMatch(/SAINTBALA/);
      expect(img.alt.length).toBeGreaterThan(0);
    });
    const alts = images.map((img) => img.alt);
    expect(alts.some((alt) => alt.includes('Women'))).toBe(true);
    expect(alts.some((alt) => alt.includes('Men'))).toBe(true);
    expect(alts.some((alt) => alt.includes('Jordan'))).toBe(true);
  });
});
