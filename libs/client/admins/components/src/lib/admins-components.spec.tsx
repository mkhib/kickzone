import { render } from '@testing-library/react';

import AdminsComponents from './admins-components';

describe('AdminsComponents', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<AdminsComponents />);
    expect(baseElement).toBeTruthy();
  });
});
