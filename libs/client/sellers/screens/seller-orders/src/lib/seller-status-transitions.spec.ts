import { KickzoneGraphqlTypes } from '@kickzone-workspace/codegen';
import { getSellerAllowedNextStatuses } from './seller-status-transitions';

describe('getSellerAllowedNextStatuses', () => {
  it('returns [Pending] for PENDING (no seller transition)', () => {
    const allowed = getSellerAllowedNextStatuses(KickzoneGraphqlTypes.OrderStatus.Pending);
    expect(allowed).toEqual([KickzoneGraphqlTypes.OrderStatus.Pending]);
  });

  it('returns [Confirmed, Processing] for CONFIRMED', () => {
    const allowed = getSellerAllowedNextStatuses(KickzoneGraphqlTypes.OrderStatus.Confirmed);
    expect(allowed).toEqual([
      KickzoneGraphqlTypes.OrderStatus.Confirmed,
      KickzoneGraphqlTypes.OrderStatus.Processing,
    ]);
  });

  it('returns [Processing, Shipped] for PROCESSING', () => {
    const allowed = getSellerAllowedNextStatuses(KickzoneGraphqlTypes.OrderStatus.Processing);
    expect(allowed).toEqual([
      KickzoneGraphqlTypes.OrderStatus.Processing,
      KickzoneGraphqlTypes.OrderStatus.Shipped,
    ]);
  });

  it('returns [Shipped, Delivered] for SHIPPED', () => {
    const allowed = getSellerAllowedNextStatuses(KickzoneGraphqlTypes.OrderStatus.Shipped);
    expect(allowed).toEqual([
      KickzoneGraphqlTypes.OrderStatus.Shipped,
      KickzoneGraphqlTypes.OrderStatus.Delivered,
    ]);
  });

  it('returns [Delivered] for DELIVERED (terminal, no next)', () => {
    const allowed = getSellerAllowedNextStatuses(KickzoneGraphqlTypes.OrderStatus.Delivered);
    expect(allowed).toEqual([KickzoneGraphqlTypes.OrderStatus.Delivered]);
  });

  it('returns [Cancelled] for CANCELLED (terminal, no next)', () => {
    const allowed = getSellerAllowedNextStatuses(KickzoneGraphqlTypes.OrderStatus.Cancelled);
    expect(allowed).toEqual([KickzoneGraphqlTypes.OrderStatus.Cancelled]);
  });

  it('returns [Refunded] for REFUNDED (terminal, no next)', () => {
    const allowed = getSellerAllowedNextStatuses(KickzoneGraphqlTypes.OrderStatus.Refunded);
    expect(allowed).toEqual([KickzoneGraphqlTypes.OrderStatus.Refunded]);
  });

  it('never returns Cancelled as a next status for any input', () => {
    const allStatuses = Object.values(KickzoneGraphqlTypes.OrderStatus);
    for (const status of allStatuses) {
      const allowed = getSellerAllowedNextStatuses(status);
      // If there's a next status (index 1), it must not be Cancelled
      if (allowed.length > 1) {
        expect(allowed[1]).not.toBe(KickzoneGraphqlTypes.OrderStatus.Cancelled);
      }
      // The current status itself could be Cancelled, but that's at index 0
      // The assertion is that Cancelled never appears as a *next* status
      for (let i = 1; i < allowed.length; i++) {
        expect(allowed[i]).not.toBe(KickzoneGraphqlTypes.OrderStatus.Cancelled);
      }
    }
  });

  it('never returns Refunded as a next status for any input', () => {
    const allStatuses = Object.values(KickzoneGraphqlTypes.OrderStatus);
    for (const status of allStatuses) {
      const allowed = getSellerAllowedNextStatuses(status);
      for (let i = 1; i < allowed.length; i++) {
        expect(allowed[i]).not.toBe(KickzoneGraphqlTypes.OrderStatus.Refunded);
      }
    }
  });

  it('never returns Confirmed as a next status for any input', () => {
    const allStatuses = Object.values(KickzoneGraphqlTypes.OrderStatus);
    for (const status of allStatuses) {
      const allowed = getSellerAllowedNextStatuses(status);
      for (let i = 1; i < allowed.length; i++) {
        expect(allowed[i]).not.toBe(KickzoneGraphqlTypes.OrderStatus.Confirmed);
      }
    }
  });
});