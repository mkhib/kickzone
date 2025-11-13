import { render } from '@testing-library/react';

import RtlTableUtils from './rtl-table-utils';

describe('RtlTableUtils', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<RtlTableUtils />);
    expect(baseElement).toBeTruthy();
  });
});
