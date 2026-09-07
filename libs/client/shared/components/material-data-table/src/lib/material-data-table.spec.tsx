import { render } from '@testing-library/react';
import { vi } from 'vitest';

vi.mock('@kickzone-workspace/shared-i18n', () => ({
  useLanguageContext: () => ({ isRTL: false, currentLocale: 'en' }),
  useTableLocalization: () => ({}),
}));

vi.mock('material-react-table', () => ({
  MaterialReactTable: () => <div data-testid="material-react-table" />,
  useMaterialReactTable: () => ({}),
}));

vi.mock('material-react-table/locales/fa', () => ({
  MRT_Localization_FA: {},
}));

vi.mock('material-react-table/locales/en', () => ({
  MRT_Localization_EN: {},
}));

import { DataTable } from './material-data-table';

describe('DataTable', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <DataTable columns={[]} data={[]} loading={false} />
    );
    expect(baseElement).toBeTruthy();
  });
});
