import { render } from '@testing-library/react';

import UnauthorizedPath from './unauthorized-path';

describe('UnauthorizedPath', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<UnauthorizedPath />);
    expect(baseElement).toBeTruthy();
  });
});
