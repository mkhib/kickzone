import { render, screen, fireEvent } from '@testing-library/react';
import {
  LanguageProvider,
  RTLThemeProvider,
} from '@kickzone-workspace/shared-i18n';
import { useUIStore } from '@kickzone-workspace/shared-ui-store';
import { vi } from 'vitest';

import StyledDrawer, { CustomListItemText } from './styled-drawer';

describe('StyledDrawer', () => {
  beforeEach(() => {
    useUIStore.getState().resetUI();
  });

  it('should render successfully with content in light theme', () => {
    useUIStore.getState().setTheme({ mode: 'light' });

    const { baseElement } = render(
      <LanguageProvider>
        <RTLThemeProvider>
          <StyledDrawer open={true} onClose={vi.fn()}>
            <div data-testid="drawer-child">Liquid Glass Content</div>
          </StyledDrawer>
        </RTLThemeProvider>
      </LanguageProvider>
    );

    expect(baseElement).toBeTruthy();
    expect(screen.getByTestId('drawer-child')).toBeInTheDocument();
    expect(screen.getByText('Liquid Glass Content')).toBeInTheDocument();
  });

  it('should render successfully in dark theme', () => {
    useUIStore.getState().setTheme({ mode: 'dark' });

    const { baseElement } = render(
      <LanguageProvider>
        <RTLThemeProvider>
          <StyledDrawer open={true} onClose={vi.fn()}>
            <div data-testid="dark-drawer-child">Dark Theme Liquid Glass</div>
          </StyledDrawer>
        </RTLThemeProvider>
      </LanguageProvider>
    );

    expect(baseElement).toBeTruthy();
    expect(screen.getByTestId('dark-drawer-child')).toBeInTheDocument();
  });

  it('should call onClose when close button is clicked', () => {
    const handleClose = vi.fn();

    render(
      <LanguageProvider>
        <RTLThemeProvider>
          <StyledDrawer open={true} onClose={handleClose}>
            <div>Content</div>
          </StyledDrawer>
        </RTLThemeProvider>
      </LanguageProvider>
    );

    const closeBtn = screen.getByLabelText('close drawer');
    expect(closeBtn).toBeInTheDocument();
    fireEvent.click(closeBtn);
    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  it('should support custom anchor and render CustomListItemText', () => {
    render(
      <LanguageProvider>
        <RTLThemeProvider>
          <StyledDrawer open={true} onClose={vi.fn()} anchor="left">
            <CustomListItemText primary="Navigation Item" />
          </StyledDrawer>
        </RTLThemeProvider>
      </LanguageProvider>
    );

    expect(screen.getByText('Navigation Item')).toBeInTheDocument();
  });

  it('should render drawer in Farsi (RTL) mode with default anchor', () => {
    localStorage.setItem('kickzone-language', 'fa');

    const { baseElement } = render(
      <LanguageProvider>
        <RTLThemeProvider>
          <StyledDrawer open={true} onClose={vi.fn()}>
            <div>منوی فارسی</div>
          </StyledDrawer>
        </RTLThemeProvider>
      </LanguageProvider>
    );

    expect(baseElement).toBeTruthy();
    expect(screen.getByText('منوی فارسی')).toBeInTheDocument();
  });
});
