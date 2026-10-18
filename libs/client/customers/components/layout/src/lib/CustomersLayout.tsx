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
  variant?: 'default' | 'glass';
  glassFooter?: boolean;
  glassTabbar?: boolean;
}

export function CustomersLayout({
  children,
  drawerItems,
  handledInTabbarIds,
  disablePadding = false,
  variant = 'default',
  glassFooter,
  glassTabbar,
}: CustomersLayoutProps) {
  const isGlass = variant === 'glass';
  const useGlassFooter = glassFooter ?? isGlass;
  const useGlassTabbar = glassTabbar ?? isGlass;

  const header = (
    <Headerbar
      drawerItems={drawerItems}
      handledInTabbarIds={handledInTabbarIds}
    />
  );
  const footer = (
    <CustomersFooter variant={useGlassFooter ? 'glass' : 'default'} />
  );
  const bottomBar = (
    <CustomersTabbar
      handledInTabbarIds={handledInTabbarIds}
      variant={useGlassTabbar ? 'glass' : 'default'}
    />
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

