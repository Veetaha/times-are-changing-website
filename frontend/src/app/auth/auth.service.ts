import _ from 'lodash';
import { Injectable } from '@angular/core';
import { map        } from 'rxjs/operators';

import * as Gql from '@app/gql/generated';

@Injectable({ providedIn: 'root' })
export class AuthService {
    constructor(
        private readonly signUpGQL: Gql.SignUpGQL,
        private readonly signInGQL: Gql.SignInGQL,
        private readonly getMeGQL:  Gql.GetMeGQL,
    ) {}

    getMe() {
        return this.getMeGQL
            .fetch()
            .pipe(map(v => v.data.getMe));
    }

    signUp(params: Gql.SignUpInput) {
        return this.signUpGQL
            .mutate({params})
            .pipe(map(v => v.data!.signUp));
    }

    signIn(params: Gql.SignInInput) {
        return this.signInGQL
            .mutate({params})
            .pipe(map(v => v.data!.signIn));
    }


}