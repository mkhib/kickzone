import React from 'react';
import { Layout } from '@kickzone-workspace/layout';
import { Headerbar } from '@kickzone-workspace/customers-headerbar';
import { CustomersFooter } from '@kickzone-workspace/customers-footer';

interface CustomersLayoutProps {
  children: React.ReactNode;
  drawerItems?: React.ReactNode;
}

export function CustomersLayout({
  children,
  drawerItems,
}: CustomersLayoutProps) {
  const header = <Headerbar />;
  const footer = <CustomersFooter />;

  return <Layout header={header} body={children} footer={footer} />;
}

export default CustomersLayout;
