import 'passport';
import * as Express from 'express';
import { Nullable              } from 'ts-typedefs';
import { GraphQLDatabaseLoader } from 'typeorm-loader';
import { getConnection         } from 'typeorm';
import { Mutex                 } from 'async-mutex';

import { User } from '@modules/user/user.entity';

export interface CreateResolveContextOpts {
    req: Express.Request;
    res: Express.Response;
}

export class ResolveContext {
    static createResolveContext({ req }: CreateResolveContextOpts): ResolveContext {
        return new ResolveContext(req); 
    }

    private constructor(private readonly req: Express.Request) {}

    readonly dataLoader = new GraphQLDatabaseLoader(getConnection());
    private readonly asyncMutex = new Mutex;
    /**
     * Flag to track issues when fetching client multiple times.
     * E.g. when you sat `@Auth()` guard for graphql property resolvers.
     */ 
    private isClientCached = false;

    getRequest() { return this.req; }

    getClient(): Nullable<User> {
        if (!this.isClientCached) {
            throw new Error('unable to retrieve client, as it was not cached.');
        }
        return this.req.user;
    }

    wasClientCached() {
        return this.isClientCached;
    }

    cacheClient() {
        if (this.isClientCached) {
            throw new Error('fetching client second time.');
        }
        this.isClientCached = true;
    } 

    acquireAsyncMutex() {    
        return this.asyncMutex.acquire();
    }

}