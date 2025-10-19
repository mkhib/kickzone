import React from 'react';
import { Layout } from '@kickzone-workspace/layout';
import { Headerbar } from '@kickzone-workspace/sellers-headerbar';
import { SellersFooter } from '@kickzone-workspace/sellers-footer';

interface SellersLayoutProps {
  children: React.ReactNode;
}

export function SellersLayout({ children }: SellersLayoutProps) {
  const header = <Headerbar />;
  const footer = <SellersFooter />;

  return <Layout header={header} body={children} footer={footer} />;
}

export default SellersLayout;
