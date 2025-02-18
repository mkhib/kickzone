import { render } from '@testing-library/react';

import AdminsLayout from './admins-layout';

describe('AdminsLayout', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<AdminsLayout />);
    expect(baseElement).toBeTruthy();
  });
});
