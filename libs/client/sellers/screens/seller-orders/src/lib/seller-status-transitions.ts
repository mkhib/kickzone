import { KickzoneGraphqlTypes } from '@kickzone-workspace/codegen';

const SELLER_NEXT_STATUS: Partial<Record<KickzoneGraphqlTypes.OrderStatus, KickzoneGraphqlTypes.OrderStatus>> = {
  [KickzoneGraphqlTypes.OrderStatus.Confirmed]: KickzoneGraphqlTypes.OrderStatus.Processing,
  [KickzoneGraphqlTypes.OrderStatus.Processing]: KickzoneGraphqlTypes.OrderStatus.Shipped,
  [KickzoneGraphqlTypes.OrderStatus.Shipped]: KickzoneGraphqlTypes.OrderStatus.Delivered,
};

/**
 * Returns the allowed statuses a seller can transition to from the current status.
 * The first element is always the current status (no-op).
 * The second element (if present) is the single next status the server accepts.
 * If no next status exists, returns only [current].
 */
export function getSellerAllowedNextStatuses(current: KickzoneGraphqlTypes.OrderStatus): KickzoneGraphqlTypes.OrderStatus[] {
  const next = SELLER_NEXT_STATUS[current];
  return next ? [current, next] : [current];
}