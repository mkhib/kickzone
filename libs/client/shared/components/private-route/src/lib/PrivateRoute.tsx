import { Navigate, Outlet } from 'react-router-dom';

export type BaseUser = {
  id: string;
  name: string;
  email: string;
  role: string;
};

interface PrivateRouteProps<T extends BaseUser> {
  acceptedRoles?: string[];
  user?: T | null;
}

export const PrivateRoute = <T extends BaseUser>({
  acceptedRoles,
  user,
}: PrivateRouteProps<T>) => {
  if (!user) {
    return <Navigate to="/login" />;
  }

  if (acceptedRoles && !acceptedRoles.includes(user.role)) {
    return <Navigate to="/unauthorized" />;
  }

  return <Outlet />;
};
