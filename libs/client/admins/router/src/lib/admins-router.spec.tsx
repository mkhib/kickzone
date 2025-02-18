import { render } from '@testing-library/react';

import AdminsRouter from './admins-router';

describe('AdminsRouter', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<AdminsRouter />);
    expect(baseElement).toBeTruthy();
  });
});
