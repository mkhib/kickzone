import React from 'react';
import { ILayoutProps, Layout } from '@kickzone-workspace/layout';
import { AdminsHeaderbar } from '@kickzone-workspace/admins-headerbar';

interface AdminsLayoutProps extends ILayoutProps {
  children: React.ReactNode;
}

export function AdminsLayout({ children }: AdminsLayoutProps) {
  const header = <AdminsHeaderbar />;
  const footer = <div style={{ backgroundColor: 'red' }}>Footer</div>;

  return <Layout header={header} body={children} footer={footer} />;
}

export default AdminsLayout;
