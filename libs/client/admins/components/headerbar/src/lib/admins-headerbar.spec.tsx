import { render } from '@testing-library/react';

import AdminsHeaderbar from './admins-headerbar';

describe('AdminsHeaderbar', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<AdminsHeaderbar />);
    expect(baseElement).toBeTruthy();
  });
});
