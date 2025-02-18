import { render } from '@testing-library/react';

import AdminsContexts from './admins-contexts';

describe('AdminsContexts', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<AdminsContexts />);
    expect(baseElement).toBeTruthy();
  });
});
