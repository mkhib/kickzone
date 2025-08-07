import { render } from '@testing-library/react';

import AdminsUnauthorizedScreen from './admins-unauthorized-screen';

describe('AdminsUnauthorizedScreen', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<AdminsUnauthorizedScreen />);
    expect(baseElement).toBeTruthy();
  });
});
