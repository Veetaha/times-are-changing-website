import { Nullable            } from 'ts-typedefs';
import { Reflector           } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthGuard as PassportAuthGuard } from '@nestjs/passport';
import { ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';

import { User           } from '@modules/user/user.entity';
import { UserRole       } from '@modules/user/user-role.enum';
import { ResolveContext } from '@modules/common/resolve-context.class';

import { rolesMetaKey, optionalAuthMetaKey } from './constants';


@Injectable()
export class AuthGuard extends PassportAuthGuard('jwt') {

    constructor(private readonly reflector: Reflector) {
        super();
    }

    /** @override */
    getRequest(ctx: ExecutionContext) {
        return this.getResolveContext(ctx).getRequest();
    }

    /**
     * Checks whether the client has already been fetched in the first place,
     * otherwise reads it from the database via `JwtStrategy` and then validates 
     * his role. If `@Auth()` was called with no arguments, only checks that the
     * client is authenticated, withoug validating his role.
     * 
     * AHTUNG! This function contains a crictical section guarded with async
     * mutex, thus calling it mulptiple times (e.g. with `Promise.all([])`)
     * is safe.
     */
    async canActivate(ctx: ExecutionContext) {
        const resolveCtx   = this.getResolveContext(ctx);
        const releaseMutex = await resolveCtx.acquireAsyncMutex(); 
        return this
            .canActivateImpl(resolveCtx, ctx)
            .finally(releaseMutex);
    }

    private async canActivateImpl(resolveCtx: ResolveContext, ctx: ExecutionContext) {
        if (!resolveCtx.wasClientCached()) {
            try {
                await super.canActivate(ctx);                  // fetches user and attaches it to request
            } catch (err) {
                if (!(err instanceof UnauthorizedException)) { // auth may be optional
                    throw err; 
                }
            } finally {
                resolveCtx.cacheClient();
            }
        }
        const client = resolveCtx.getClient();

        if (!this.isOptionalAuth(ctx) && (client == null || !this.obeysRoleLimit(ctx, client))) {
            throw new UnauthorizedException;       
        }
        return true;
    }

    private obeysRoleLimit(ctx: ExecutionContext, client: User) {
        const allowedRoles = this.getAllowedRoles(ctx);
        return allowedRoles.length === 0 || allowedRoles.includes(client.role);
    }

    private isOptionalAuth(ctx: ExecutionContext) {
        return this.reflector.get<Nullable<true>>(optionalAuthMetaKey, ctx.getHandler());
    }

    private getAllowedRoles(ctx: ExecutionContext) {
        return this.reflector.get<UserRole[]>(rolesMetaKey, ctx.getHandler());
    }

    private getResolveContext(ctx: ExecutionContext): ResolveContext {
        return GqlExecutionContext.create(ctx).getContext();
    }
}