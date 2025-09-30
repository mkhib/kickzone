import React from 'react';
import { render, screen } from '@testing-library/react';
import { vi, describe, it, expect } from 'vitest';
import '@testing-library/jest-dom';
import { AdminsUnauthorizedScreen } from './admins-unauthorized-screen';

// Mock AdminsLayout
vi.mock('@kickzone-workspace/admins-layout', () => ({
  AdminsLayout: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="admins-layout">{children}</div>
  ),
}));

// Mock UnauthorizedPath
vi.mock('@kickzone-workspace/unauthorized-path', () => ({
  UnauthorizedPath: ({
    appName,
    loginPath,
    showAnimation,
    animationWidth,
    animationHeight,
  }: {
    appName: string;
    loginPath: string;
    showAnimation: boolean;
    animationWidth: number;
    animationHeight: number;
  }) => (
    <div data-testid="unauthorized-path">
      <div data-testid="app-name">{appName}</div>
      <div data-testid="login-path">{loginPath}</div>
      <div data-testid="show-animation">{showAnimation ? 'true' : 'false'}</div>
      <div data-testid="animation-width">{animationWidth}</div>
      <div data-testid="animation-height">{animationHeight}</div>
    </div>
  ),
}));

describe('AdminsUnauthorizedScreen', () => {
  it('should render successfully', () => {
    render(<AdminsUnauthorizedScreen />);
    expect(screen.getByTestId('unauthorized-path')).toBeInTheDocument();
  });

  it('should render within AdminsLayout', () => {
    render(<AdminsUnauthorizedScreen />);
    expect(screen.getByTestId('admins-layout')).toBeInTheDocument();
  });

  it('should render UnauthorizedPath with correct props', () => {
    render(<AdminsUnauthorizedScreen />);
    expect(screen.getByTestId('unauthorized-path')).toBeInTheDocument();
  });

  it('should pass correct appName to UnauthorizedPath', () => {
    render(<AdminsUnauthorizedScreen />);
    expect(screen.getByTestId('app-name')).toHaveTextContent('Admins Portal');
  });

  it('should pass correct loginPath to UnauthorizedPath', () => {
    render(<AdminsUnauthorizedScreen />);
    expect(screen.getByTestId('login-path')).toHaveTextContent('/login');
  });

  it('should pass showAnimation as true to UnauthorizedPath', () => {
    render(<AdminsUnauthorizedScreen />);
    expect(screen.getByTestId('show-animation')).toHaveTextContent('true');
  });

  it('should pass correct animationWidth to UnauthorizedPath', () => {
    render(<AdminsUnauthorizedScreen />);
    expect(screen.getByTestId('animation-width')).toHaveTextContent('250');
  });

  it('should pass correct animationHeight to UnauthorizedPath', () => {
    render(<AdminsUnauthorizedScreen />);
    expect(screen.getByTestId('animation-height')).toHaveTextContent('250');
  });

  it('should have correct component structure', () => {
    const { container } = render(<AdminsUnauthorizedScreen />);
    const layout = container.querySelector('[data-testid="admins-layout"]');
    const unauthorized = container.querySelector(
      '[data-testid="unauthorized-path"]'
    );

    expect(layout).toContainElement(unauthorized);
  });

  it('should render with all required props', () => {
    render(<AdminsUnauthorizedScreen />);

    // Verify all props are rendered correctly
    expect(screen.getByTestId('app-name')).toBeInTheDocument();
    expect(screen.getByTestId('login-path')).toBeInTheDocument();
    expect(screen.getByTestId('show-animation')).toBeInTheDocument();
    expect(screen.getByTestId('animation-width')).toBeInTheDocument();
    expect(screen.getByTestId('animation-height')).toBeInTheDocument();
  });
});
