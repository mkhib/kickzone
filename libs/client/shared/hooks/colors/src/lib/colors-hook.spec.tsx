import { render } from '@testing-library/react';

import ColorsHook from './colors-hook';

describe('ColorsHook', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ColorsHook />);
    expect(baseElement).toBeTruthy();
  });
});
