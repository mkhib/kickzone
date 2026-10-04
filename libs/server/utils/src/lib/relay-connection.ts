import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class PageInfo {
  @Field(() => String, { nullable: true })
  endCursor?: string;

  @Field(() => Boolean)
  hasNextPage: boolean;

  @Field(() => Boolean)
  hasPreviousPage: boolean;
}

export type ConnectionArgs = {
  first?: number;
  after?: string | null;
  searchTerm?: string;
};

export type Node = {
  id: string | number;
};

export type Edge<T extends Node> = {
  cursor: string | number;
  node: T;
};

export type Connection<T extends Node> = {
  edges: Edge<T>[];
  pageInfo: PageInfo;
  totalCount: number;
};

export function parseOffset(cursor?: string | null): number {
  if (!cursor) return 0;
  // If it's a UUID, it's not an offset
  if (
    /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(
      cursor
    )
  ) {
    return 0;
  }
  const trimmed = cursor.trim();
  const num = parseInt(trimmed, 10);
  if (!isNaN(num) && String(num) === trimmed) {
    return num;
  }
  if (trimmed.startsWith('cursor:')) {
    const val = parseInt(trimmed.replace('cursor:', ''), 10);
    if (!isNaN(val)) return val;
  }
  try {
    const decoded = Buffer.from(trimmed, 'base64').toString('utf8');
    if (decoded.startsWith('cursor:')) {
      const val = parseInt(decoded.replace('cursor:', ''), 10);
      if (!isNaN(val)) return val;
    }
    const val = parseInt(decoded, 10);
    if (!isNaN(val)) return val;
  } catch {
    // Non-base64 or invalid format - fallback to numeric parse
  }

  if (!isNaN(num)) return num;
  return 0;
}

export function createConnection<T extends Node>(
  nodes: T[],
  totalCount: number,
  first: number,
  after?: string | null
): Connection<T> {
  const isUuid = Boolean(
    after &&
      /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(
        after
      )
  );

  if (isUuid) {
    const edges: Edge<T>[] = nodes.map((node) => ({
      cursor: node.id,
      node,
    }));
    return {
      edges,
      pageInfo: {
        endCursor:
          edges.length > 0 ? String(edges[edges.length - 1].cursor) : undefined,
        hasNextPage: nodes.length >= (first || 10),
        hasPreviousPage: !!after,
      },
      totalCount,
    };
  }

  const currentOffset = parseOffset(after);
  const edges: Edge<T>[] = nodes.map((node, index) => ({
    cursor: String(currentOffset + index + 1),
    node,
  }));

  const pageInfo: PageInfo = {
    endCursor:
      edges.length > 0 ? String(currentOffset + nodes.length) : undefined,
    hasNextPage: currentOffset + nodes.length < totalCount,
    hasPreviousPage: currentOffset > 0,
  };

  return {
    edges,
    pageInfo,
    totalCount,
  };
}

@ObjectType({ isAbstract: true })
export class EdgeType<T> {
  @Field(() => String)
  cursor: string | number;
}

@ObjectType({ isAbstract: true })
export class ConnectionType<T> {
  @Field(() => PageInfo)
  pageInfo: PageInfo;

  @Field(() => Int)
  totalCount: number;
}
