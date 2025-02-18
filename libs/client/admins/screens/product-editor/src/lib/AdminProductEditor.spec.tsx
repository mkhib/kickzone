import { render } from '@testing-library/react';
import { AdminProductEditor } from './AdminProductEditor';

describe('AdminProductEditor', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<AdminProductEditor />);
    expect(baseElement).toBeTruthy();
  });
});
