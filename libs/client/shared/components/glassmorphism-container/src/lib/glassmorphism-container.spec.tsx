import { render } from '@testing-library/react';

import GlassmorphismContainer from './glassmorphism-container';

describe('GlassmorphismContainer', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<GlassmorphismContainer />);
    expect(baseElement).toBeTruthy();
  });
});
