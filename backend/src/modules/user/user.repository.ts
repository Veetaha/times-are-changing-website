import { RenameKey } from 'ts-typedefs';
import { EntityRepository, Repository } from 'typeorm';

import { SignInInput } from '@modules/auth/gql/sign-in.input';
import { User             } from './user.entity';

export type HashedCredentials = RenameKey<SignInInput, 'password', 'passwordHash'>;


@EntityRepository(User)
export class UserRepo extends Repository<User> {

    async getByHashedCredentials(where: HashedCredentials) {
        return this.findOne({ where });
    }

    async getByLogin(login: string) {
        return this.findOne({ where: {login} });
    }

    async loginIsTaken(login: string) {
        return (await this.count({ where: {login} })) > 0;
    }
}