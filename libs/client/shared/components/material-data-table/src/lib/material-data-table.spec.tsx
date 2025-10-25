import { render } from '@testing-library/react';

import { DataTable } from './material-data-table';

describe('DataTable', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <DataTable columns={[]} data={[]} loading={false} />
    );
    expect(baseElement).toBeTruthy();
  });
});
