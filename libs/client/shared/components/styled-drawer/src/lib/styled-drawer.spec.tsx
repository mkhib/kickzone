import { render } from '@testing-library/react';
import { ThemeProvider } from '@kickzone-workspace/shared-i18n';

import StyledDrawer from './styled-drawer';

describe('StyledDrawer', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <ThemeProvider>
        <StyledDrawer open={true} onClose={() => {}}>
          <div>Test content</div>
        </StyledDrawer>
      </ThemeProvider>
    );
    expect(baseElement).toBeTruthy();
  });
});
