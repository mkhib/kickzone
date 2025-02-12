import { render } from '@testing-library/react';

import SellersProductEditorScreen from './sellers-product-editor-screen';

describe('SellersProductEditorScreen', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<SellersProductEditorScreen />);
    expect(baseElement).toBeTruthy();
  });
});
