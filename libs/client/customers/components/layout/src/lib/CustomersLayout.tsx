import React from 'react';
import { Layout } from '@kickzone-workspace/layout';
import { Headerbar } from '@kickzone-workspace/customers-headerbar';
import { CustomersFooter } from '@kickzone-workspace/customers-footer';
import { CustomersTabbar } from './CustomersTabbar';

export interface CustomersLayoutProps {
  children: React.ReactNode;
  drawerItems?: React.ReactNode;
  handledInTabbarIds?: string[];
  disablePadding?: boolean;
}

export function CustomersLayout({
  children,
  drawerItems,
  handledInTabbarIds,
  disablePadding = false,
}: CustomersLayoutProps) {
  const header = (
    <Headerbar
      drawerItems={drawerItems}
      handledInTabbarIds={handledInTabbarIds}
    />
  );
  const footer = <CustomersFooter />;
  const bottomBar = (
    <CustomersTabbar handledInTabbarIds={handledInTabbarIds} />
  );

  return (
    <Layout
      header={header}
      body={children}
      footer={footer}
      bottomBar={bottomBar}
      disablePadding={disablePadding}
    />
  );
}

export default CustomersLayout;
