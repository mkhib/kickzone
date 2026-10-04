import {
  createConnection,
  parseOffset,
} from '@kickzone-workspace/utils';

describe('relay-connection', () => {
  describe('parseOffset', () => {
    it('returns 0 for falsy or empty values', () => {
      expect(parseOffset(undefined)).toBe(0);
      expect(parseOffset(null)).toBe(0);
      expect(parseOffset('')).toBe(0);
    });

    it('returns 0 for UUIDs', () => {
      expect(parseOffset('123e4567-e89b-12d3-a456-426614174000')).toBe(0);
    });

    it('parses raw integer string', () => {
      expect(parseOffset('12')).toBe(12);
      expect(parseOffset(' 24 ')).toBe(24);
    });

    it('parses cursor:offset string', () => {
      expect(parseOffset('cursor:12')).toBe(12);
    });

    it('parses base64 encoded cursor:offset and numeric strings', () => {
      const b64Cursor = Buffer.from('cursor:36').toString('base64');
      expect(parseOffset(b64Cursor)).toBe(36);

      const b64Num = Buffer.from('48').toString('base64');
      expect(parseOffset(b64Num)).toBe(48);
    });
  });

  describe('createConnection', () => {
    const products = [
      { id: 101, name: 'Product 1' },
      { id: 102, name: 'Product 2' },
      { id: 103, name: 'Product 3' },
    ];

    it('creates offset-based connection for first page', () => {
      const conn = createConnection(products, 10, 3, undefined);

      expect(conn.edges).toHaveLength(3);
      expect(conn.edges[0].cursor).toBe('1');
      expect(conn.edges[2].cursor).toBe('3');
      expect(conn.pageInfo.endCursor).toBe('3');
      expect(conn.pageInfo.hasNextPage).toBe(true);
      expect(conn.pageInfo.hasPreviousPage).toBe(false);
      expect(conn.totalCount).toBe(10);
    });

    it('creates offset-based connection for middle page', () => {
      const conn = createConnection(products, 10, 3, '3');

      expect(conn.edges[0].cursor).toBe('4');
      expect(conn.edges[2].cursor).toBe('6');
      expect(conn.pageInfo.endCursor).toBe('6');
      expect(conn.pageInfo.hasNextPage).toBe(true);
      expect(conn.pageInfo.hasPreviousPage).toBe(true);
    });

    it('creates offset-based connection for final page', () => {
      const lastPageProducts = [{ id: 110, name: 'Product 10' }];
      const conn = createConnection(lastPageProducts, 10, 3, '9');

      expect(conn.edges).toHaveLength(1);
      expect(conn.edges[0].cursor).toBe('10');
      expect(conn.pageInfo.endCursor).toBe('10');
      expect(conn.pageInfo.hasNextPage).toBe(false);
      expect(conn.pageInfo.hasPreviousPage).toBe(true);
    });

    it('handles UUID-based cursor correctly', () => {
      const uuid = '123e4567-e89b-12d3-a456-426614174000';
      const users = [
        { id: '223e4567-e89b-12d3-a456-426614174001', name: 'User 1' },
        { id: '323e4567-e89b-12d3-a456-426614174002', name: 'User 2' },
      ];

      const conn = createConnection(users, 5, 2, uuid);
      expect(conn.edges[0].cursor).toBe('223e4567-e89b-12d3-a456-426614174001');
      expect(conn.pageInfo.endCursor).toBe('323e4567-e89b-12d3-a456-426614174002');
      expect(conn.pageInfo.hasNextPage).toBe(true);
      expect(conn.pageInfo.hasPreviousPage).toBe(true);
    });
  });
});
