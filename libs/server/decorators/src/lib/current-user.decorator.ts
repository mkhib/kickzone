import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

export const CurrentUser = createParamDecorator(
  (data: unknown, context: ExecutionContext) => {
    // Check if this is a GraphQL context
    const gqlContext = GqlExecutionContext.create(context);
    const gqlReq = gqlContext.getContext().req;

    // If GraphQL context has a request, use it
    if (gqlReq) {
      return gqlReq.user;
    }

    // Otherwise, fall back to HTTP context
    const httpReq = context.switchToHttp().getRequest();
    return httpReq.user;
  }
);
