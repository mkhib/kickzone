import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class PageInfo {
  @Field(() => String, { nullable: true })
  endCursor: string | number | null;

  @Field(() => Boolean)
  hasNextPage: boolean;
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

export function createConnection<T extends Node>(
  nodes: T[],
  totalCount: number,
  first: number,
  after?: string | null
): Connection<T> {
  const edges: Edge<T>[] = nodes.map((node) => ({
    cursor: node.id,
    node,
  }));

  const pageInfo: PageInfo = {
    endCursor: edges.length > 0 ? edges[edges.length - 1].cursor : null,
    hasNextPage: totalCount > (first || 10) + (after ? 1 : 0),
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
