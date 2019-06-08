import { Navigate } from '@ngxs/router-plugin';

export class OpenUserProfilePage extends Navigate {
    constructor(userLogin: string) {
        super(['users', userLogin]);
    }
}