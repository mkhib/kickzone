import React from 'react';
import { render, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import { beforeEach, afterEach, describe, expect, it, vi } from 'vitest';
import { MemoryRouter, useNavigate } from 'react-router-dom';
import { ScrollToTop } from './ScrollToTop';

describe('ScrollToTop', () => {
  let scrollToSpy: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    scrollToSpy = vi.fn();
    window.scrollTo = scrollToSpy as unknown as typeof window.scrollTo;
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  function NavigationHarness() {
    const navigate = useNavigate();
    return (
      <div>
        <button
          onClick={() => navigate('/shop?category=women')}
          data-testid="go-women"
        >
          Women
        </button>
        <button
          onClick={() => navigate('/shop?category=men')}
          data-testid="go-men"
        >
          Men
        </button>
        <button
          onClick={() => navigate('/product/42')}
          data-testid="go-product"
        >
          Product
        </button>
        <button
          onClick={() => navigate('/product/42#details')}
          data-testid="go-hash"
        >
          Hash
        </button>
      </div>
    );
  }

  it('scrolls to top on initial mount', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <ScrollToTop />
        <NavigationHarness />
      </MemoryRouter>
    );

    expect(scrollToSpy).toHaveBeenCalledWith(
      expect.objectContaining({ top: 0, left: 0 })
    );
  });

  it('scrolls to top when navigating to another route path', () => {
    const { getByTestId } = render(
      <MemoryRouter initialEntries={['/']}>
        <ScrollToTop />
        <NavigationHarness />
      </MemoryRouter>
    );

    scrollToSpy.mockClear();

    act(() => {
      getByTestId('go-product').click();
    });

    expect(scrollToSpy).toHaveBeenCalledWith(
      expect.objectContaining({ top: 0, left: 0 })
    );
  });

  it('scrolls to top when query params change', () => {
    const { getByTestId } = render(
      <MemoryRouter initialEntries={['/shop?category=women']}>
        <ScrollToTop />
        <NavigationHarness />
      </MemoryRouter>
    );

    scrollToSpy.mockClear();

    act(() => {
      getByTestId('go-men').click();
    });

    expect(scrollToSpy).toHaveBeenCalledWith(
      expect.objectContaining({ top: 0, left: 0 })
    );
  });

  it('scrolls to anchored element when hash is present and element exists', () => {
    const scrollIntoViewMock = vi.fn();
    const targetEl = document.createElement('div');
    targetEl.id = 'details';
    targetEl.scrollIntoView = scrollIntoViewMock;
    document.body.appendChild(targetEl);

    const { getByTestId } = render(
      <MemoryRouter initialEntries={['/product/42']}>
        <ScrollToTop />
        <NavigationHarness />
      </MemoryRouter>
    );

    scrollToSpy.mockClear();

    act(() => {
      getByTestId('go-hash').click();
    });

    expect(scrollIntoViewMock).toHaveBeenCalled();

    document.body.removeChild(targetEl);
  });

  it('sets window.history.scrollRestoration to manual when supported', () => {
    Object.defineProperty(window.history, 'scrollRestoration', {
      value: 'auto',
      writable: true,
      configurable: true,
    });

    render(
      <MemoryRouter initialEntries={['/']}>
        <ScrollToTop />
      </MemoryRouter>
    );

    expect(window.history.scrollRestoration).toBe('manual');
  });
});

