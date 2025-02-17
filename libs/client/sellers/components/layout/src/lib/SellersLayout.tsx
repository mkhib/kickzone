import React from 'react';
import { Layout } from '@kickzone-workspace/layout';
import { Headerbar } from '@kickzone-workspace/sellers-headerbar';

interface SellersLayoutProps {
  children: React.ReactNode;
}

export function SellersLayout({ children }: SellersLayoutProps) {
  const header = <Headerbar />;
  const footer = <div style={{ backgroundColor: 'red' }}>Footer</div>;

  return <Layout header={header} body={children} footer={footer} />;
}

export default SellersLayout;
