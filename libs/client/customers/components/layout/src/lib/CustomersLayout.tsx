import React from 'react';
import { Layout } from '@kickzone-workspace/layout';
import { Headerbar } from '@kickzone-workspace/customers-headerbar'; // Import the HeaderBar component

interface CustomersLayoutProps {
  children: React.ReactNode;
  drawerItems?: React.ReactNode;
}

export function CustomersLayout({
  children,
  drawerItems,
}: CustomersLayoutProps) {
  const header = <Headerbar />;
  const footer = <div style={{ backgroundColor: 'red' }}>Footer</div>;

  return <Layout header={header} body={children} footer={footer} />;
}

export default CustomersLayout;
