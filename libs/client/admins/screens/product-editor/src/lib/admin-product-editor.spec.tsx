import { render } from '@testing-library/react';

import AdminProductEditor from './admin-product-editor';

describe('AdminProductEditor', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<AdminProductEditor />);
    expect(baseElement).toBeTruthy();
  });
});
