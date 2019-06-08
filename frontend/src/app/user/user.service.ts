import { Injectable } from '@angular/core';
import { map        } from 'rxjs/operators';

import * as Gql from '@app/gql/generated';

export type UsersPage = Gql.GetUsersPageQuery['getUsersPage'];

@Injectable({ providedIn: 'root' })
export class UserService {
    constructor(
        private readonly updateMeGQL:       Gql.UpdateMeGQL,
        private readonly updateUserGQL:     Gql.UpdateUserGQL,
        private readonly getUsersPageGQL:   Gql.GetUsersPageGQL,
        private readonly getUserByLoginGQL: Gql.GetUserByLoginGQL
    ) {}
    
    updateMe(params: Gql.UpdateMeInput) {
        return this.updateMeGQL
            .mutate({params})
            .pipe(map(v => v.data!.updateMe));
    }

    updateUser(params: Gql.UpdateUserInput) {
        return this.updateUserGQL
            .mutate({params})
            .pipe(map(v => v.data!.updateUser));
    }

    getUserByLogin(login: string) {
        return this.getUserByLoginGQL
            .fetch({login})
            .pipe(map(v => v.data.getUserByLogin));
    }

    getUsersPage(params: Gql.UserPaginationInput) {
        return this.getUsersPageGQL
            .fetch({params})
            .pipe(map(v => v.data.getUsersPage));
    }

}