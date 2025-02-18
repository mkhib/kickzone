import React from 'react';
import { Layout } from '@kickzone-workspace/layout';
import { AdminsHeaderbar } from '@kickzone-workspace/admins-headerbar';

interface AdminsLayoutProps {
  children: React.ReactNode;
  drawerItems?: React.ReactNode;
}

export function AdminsLayout({ children, drawerItems }: AdminsLayoutProps) {
  const header = <AdminsHeaderbar />;
  const footer = <div style={{ backgroundColor: 'red' }}>Footer</div>;

  return <Layout header={header} body={children} footer={footer} />;
}

export default AdminsLayout;
