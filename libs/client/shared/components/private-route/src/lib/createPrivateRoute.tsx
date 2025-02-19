import { BaseUser, PrivateRoute } from './PrivateRoute';

export function createPrivateRoute<T extends BaseUser>(
  acceptedRoles?: string[],
  user?: T | null
) {
  return () => <PrivateRoute acceptedRoles={acceptedRoles} user={user} />;
}
