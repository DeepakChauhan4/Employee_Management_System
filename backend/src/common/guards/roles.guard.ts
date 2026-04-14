import {
    Injectable,
    CanActivate,
    ExecutionContext,
    ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';

// This key must match your decorator
export const ROLES_KEY = 'roles';

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private reflector: Reflector) { }

    canActivate(context: ExecutionContext): boolean {
        // 1. Get required roles from decorator
        const requiredRoles = this.reflector.getAllAndOverride<string[]>(
            ROLES_KEY,
            [
                context.getHandler(), // method level
                context.getClass(),   // controller level
            ],
        );

        // 2. If no roles defined → allow access
        if (!requiredRoles) {
            return true;
        }

        // 3. Get request
        const request = context.switchToHttp().getRequest();

        // 4. Get user from JWT (added by AuthGuard)
        const user = request.user;

        if (!user) {
            throw new ForbiddenException('User not found in request');
        }

        // 5. Check if user's role matches required roles
        const hasRole = requiredRoles.includes(user.role);

        if (!hasRole) {
            throw new ForbiddenException('Access denied: insufficient role');
        }

        return true;
    }
}