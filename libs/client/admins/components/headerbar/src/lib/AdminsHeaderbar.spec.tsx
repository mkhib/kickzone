import { render } from '@testing-library/react';

import AdminsHeaderbar from './AdminsHeaderbar';

describe('AdminsHeaderbar', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<AdminsHeaderbar />);
    expect(baseElement).toBeTruthy();
  });
});
