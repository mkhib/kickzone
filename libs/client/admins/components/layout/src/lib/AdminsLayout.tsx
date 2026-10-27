import React from 'react';
import { ILayoutProps, Layout } from '@kickzone-workspace/layout';
import { AdminsHeaderbar } from '@kickzone-workspace/admins-headerbar';
import { AdminsFooter } from '@kickzone-workspace/admins-footer';
import { AdminsTabbar } from './AdminsTabbar';

interface AdminsLayoutProps extends ILayoutProps {
  children: React.ReactNode;
  drawerItems?: React.ReactNode;
  handledInTabbarIds?: string[];
  variant?: 'default' | 'glass';
  glassFooter?: boolean;
  glassTabbar?: boolean;
}

export function AdminsLayout({
  children,
  drawerItems,
  handledInTabbarIds,
  disablePadding = false,
  variant = 'default',
  glassFooter,
  glassTabbar,
}: AdminsLayoutProps) {
  const isGlass = variant === 'glass';
  const useGlassFooter = glassFooter ?? isGlass;
  const useGlassTabbar = glassTabbar ?? isGlass;

  const header = (
    <AdminsHeaderbar
      drawerItems={drawerItems}
      handledInTabbarIds={handledInTabbarIds}
    />
  );
  const footer = (
    <AdminsFooter variant={useGlassFooter ? 'glass' : 'default'} />
  );
  const bottomBar = (
    <AdminsTabbar
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

export default AdminsLayout;