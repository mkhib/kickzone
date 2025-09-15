import { render } from '@testing-library/react';

import SharedUiStore from './shared-ui-store';

describe('SharedUiStore', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<SharedUiStore />);
    expect(baseElement).toBeTruthy();
  });
});
