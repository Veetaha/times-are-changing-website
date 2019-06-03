import { InjectRepository               } from '@nestjs/typeorm';
import { GraphQLDatabaseLoader          } from 'typeorm-loader';
import { GraphQLResolveInfo             } from 'graphql';
import { Injectable, ForbiddenException } from '@nestjs/common';

import * as I from '@app/interfaces';
import { OrmUtilsService } from '@utils/orm/orm-utils.service';

import { User                        } from './user.entity';
import { UserPaginationInput         } from './gql/user-pagination.input';
import { UserRepo, HashedCredentials } from './user.repository';




@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserRepo)
        private readonly repo: UserRepo,
        private readonly orm: OrmUtilsService
    ) {}

    /**
     * Returns `User` that has the given `login` if it exists.
     * @param login Target user unique login.
     */
    async getByLogin(login: string) { 
        return this.repo.getByLogin(login);
    }

    async loadByLogin(loader: GraphQLDatabaseLoader, info: GraphQLResolveInfo, login: string) {
        return loader.loadOne<User>(User, {login}, info);
    }

    async getByHashedCredentials(credentials: HashedCredentials) {
        return this.repo.getByHashedCredentials(credentials);
    }

    async ensureUserNotExistsOrFail(login: string) {
        if (await this.repo.loginIsTaken(login)) {
            throw new ForbiddenException(`Login '${login}' is already taken.`);
        }
    }

    async create(user: Partial<User>) {
        return this.repo.save(user);
    }

    async getPage(pageInput: UserPaginationInput) {
        return this.orm.getPage(this.repo, pageInput);
    }

    async update(login: string, upd: I.UpdateInput<User, 'login'>) {
        return this.orm.updateOne(this.repo, upd, 'login = :login', {login});
    }       

}
