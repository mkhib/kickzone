import React from 'react';
import { Layout } from '@kickzone-workspace/layout';
import { Headerbar } from '@kickzone-workspace/sellers-headerbar';
import { SellersFooter } from '@kickzone-workspace/sellers-footer';
import { SellersTabbar } from './SellersTabbar';

export interface SellersLayoutProps {
  children: React.ReactNode;
  drawerItems?: React.ReactNode;
  handledInTabbarIds?: string[];
  disablePadding?: boolean;
  variant?: 'default' | 'glass';
  glassFooter?: boolean;
  glassTabbar?: boolean;
}

export function SellersLayout({
  children,
  drawerItems,
  handledInTabbarIds,
  disablePadding = false,
  variant = 'default',
  glassFooter,
  glassTabbar,
}: SellersLayoutProps) {
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
    <SellersFooter variant={useGlassFooter ? 'glass' : 'default'} />
  );
  const bottomBar = (
    <SellersTabbar
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

export default SellersLayout;