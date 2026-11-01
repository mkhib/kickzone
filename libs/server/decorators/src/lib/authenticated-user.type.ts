/**
 * The request user exposed by @CurrentUser() on routes guarded by GraphqlAuthGuard / HttpAuthGuard.
 * Only the fields that resolvers and controllers read are declared.
 */
export interface AuthenticatedUser {
  id: string;
  email?: string;
  sub?: string;
  role?: string;
  userType?: string;
}

/** A request user that may be absent (unguarded routes or defensive helpers). */
export type OptionalAuthenticatedUser = AuthenticatedUser | null | undefined;
