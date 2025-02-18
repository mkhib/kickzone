import { render } from '@testing-library/react';

import AdminsLogin from './admins-login';

describe('AdminsLogin', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<AdminsLogin />);
    expect(baseElement).toBeTruthy();
  });
});
