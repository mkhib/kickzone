import React from 'react';
import { ILayoutProps, Layout } from '@kickzone-workspace/layout';
import { AdminsHeaderbar } from '@kickzone-workspace/admins-headerbar';
import { AdminsFooter } from '@kickzone-workspace/admins-footer';

interface AdminsLayoutProps extends ILayoutProps {
  children: React.ReactNode;
}

export function AdminsLayout({ children }: AdminsLayoutProps) {
  const header = <AdminsHeaderbar />;
  const footer = <AdminsFooter />;

  return <Layout header={header} body={children} footer={footer} />;
}

export default AdminsLayout;
