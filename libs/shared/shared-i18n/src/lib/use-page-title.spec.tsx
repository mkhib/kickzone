import { afterAll, beforeEach, describe, expect, it, vi } from 'vitest';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { usePageTitle } from './use-page-title';

vi.mock('../lib/locales/i18n-react', () => ({
  useI18nContext: () => ({
    LL: {
      appNames: {
        siteName: () => 'SAINTBALA',
      },
    },
  }),
}));

function TestComponent({ titleGetter }: { titleGetter?: () => string }) {
  usePageTitle(titleGetter);
  return <div data-testid="title-test">Test</div>;
}

describe('usePageTitle', () => {
  const originalTitle = document.title;

  beforeEach(() => {
    document.title = '';
    vi.clearAllMocks();
  });

  afterAll(() => {
    document.title = originalTitle;
  });

  it('prefixes page title with site name', () => {
    render(<TestComponent titleGetter={() => 'Home'} />);
    expect(document.title).toBe('SAINTBALA - Home');
  });

  it('handles empty getter (just site name)', () => {
    render(<TestComponent titleGetter={() => ''} />);
    expect(document.title).toBe('SAINTBALA');
  });

  it('strips trailing "— SAINTBALA" from title getter', () => {
    render(<TestComponent titleGetter={() => 'Favorites — SAINTBALA'} />);
    expect(document.title).toBe('SAINTBALA - Favorites');
  });

  it('strips trailing "- SAINTBALA" from title getter', () => {
    render(<TestComponent titleGetter={() => 'Page Not Found - SAINTBALA'} />);
    expect(document.title).toBe('SAINTBALA - Page Not Found');
  });

  it('strips trailing "| SAINTBALA" from title getter', () => {
    render(<TestComponent titleGetter={() => 'Products | SAINTBALA'} />);
    expect(document.title).toBe('SAINTBALA - Products');
  });

  it('strips leading "SAINTBALA —" from title getter', () => {
    render(<TestComponent titleGetter={() => 'SAINTBALA — Home'} />);
    expect(document.title).toBe('SAINTBALA - Home');
  });

  it('strips leading "SAINTBALA -" from title getter', () => {
    render(<TestComponent titleGetter={() => 'SAINTBALA - Products'} />);
    expect(document.title).toBe('SAINTBALA - Products');
  });

  it('does not rewrite document.title when computed title is the same (unstable getter)', () => {
    let getterRef = () => 'Home';
    const { rerender } = render(<TestComponent titleGetter={getterRef} />);
    expect(document.title).toBe('SAINTBALA - Home');

    getterRef = () => 'Home';
    rerender(<TestComponent titleGetter={getterRef} />);

    expect(document.title).toBe('SAINTBALA - Home');
  });
});
