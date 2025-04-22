import { render } from '@testing-library/react';

import SnackbarHook from './snackbar-hook';

describe('SnackbarHook', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<SnackbarHook />);
    expect(baseElement).toBeTruthy();
  });
});
