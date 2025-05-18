import { render } from '@testing-library/react';

import ApolloProviderBase from './apollo-provider-base';

describe('ApolloProviderBase', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ApolloProviderBase />);
    expect(baseElement).toBeTruthy();
  });
});
