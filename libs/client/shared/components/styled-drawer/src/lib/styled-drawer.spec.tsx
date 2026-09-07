import { render } from '@testing-library/react';
import {
  LanguageProvider,
  RTLThemeProvider,
} from '@kickzone-workspace/shared-i18n';
import { vi } from 'vitest';

import StyledDrawer from './styled-drawer';

describe('StyledDrawer', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <LanguageProvider>
        <RTLThemeProvider>
          <StyledDrawer open={true} onClose={vi.fn()}>
          <div>Test content</div>
          </StyledDrawer>
        </RTLThemeProvider>
      </LanguageProvider>
    );
    expect(baseElement).toBeTruthy();
  });
});
