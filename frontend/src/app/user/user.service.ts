import { Injectable } from '@angular/core';
import { map        } from 'rxjs/operators';

import * as Gql from '@app/gql/generated';

export type UsersPage = Gql.GetUsersPageQuery['getUsersPage'];

@Injectable({ providedIn: 'root' })
export class UserService {
    constructor(private readonly getUsersPageGQL: Gql.GetUsersPageGQL) {}


    getUsersPage(params: Gql.UserPaginationInput) {
        return this.getUsersPageGQL
            .fetch({ params })
            .pipe(map(v => v.data.getUsersPage));
    }

}