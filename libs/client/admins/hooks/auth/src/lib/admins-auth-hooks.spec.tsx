import { render } from '@testing-library/react';

import AdminsAuthHooks from './admins-auth-hooks';

describe('AdminsAuthHooks', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<AdminsAuthHooks />);
    expect(baseElement).toBeTruthy();
  });
});
