import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserRole } from '@kickzone-workspace/entities';
import { GqlExecutionContext } from '@nestjs/graphql';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.get<UserRole[]>(
      'roles',
      context.getHandler()
    );
    if (!requiredRoles) {
      return true;
    }

    // Convert to GraphQL context
    const gqlContext = GqlExecutionContext.create(context);
    const { req } = gqlContext.getContext();

    // Get user from request
    const user = req.user;
    if (!user) {
      return false;
    }

    return requiredRoles.includes(user.role);
  }
}
