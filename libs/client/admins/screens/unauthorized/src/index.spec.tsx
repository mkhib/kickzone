import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import * as exports from './index';

// Mock dependencies to avoid lottie-web issues
vi.mock('@kickzone-workspace/admins-layout', () => ({
  AdminsLayout: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="admins-layout">{children}</div>
  ),
}));

vi.mock('@kickzone-workspace/unauthorized-path', () => ({
  UnauthorizedPath: () => <div data-testid="unauthorized-path" />,
}));

describe('admins-unauthorized-screen exports', () => {
  it('should export AdminsUnauthorizedScreen', () => {
    expect(exports).toHaveProperty('AdminsUnauthorizedScreen');
    expect(typeof exports.AdminsUnauthorizedScreen).toBe('function');
  });
});
