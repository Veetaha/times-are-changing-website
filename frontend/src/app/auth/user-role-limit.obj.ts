import _ from 'lodash';
import * as Vts from 'vee-type-safe';

import { UserRole } from '@app/gql/generated';


export interface UserRoleLimit {
    readonly roles:      ReadonlyArray<UserRole>;
    readonly areAllowed: boolean;
}

export namespace UserRoleLimit {
    export const obeysLimit = (self: UserRoleLimit, suspect: UserRole) => 
        self.roles.includes(suspect) === self.areAllowed;
    
    const schema = Vts.td({
        roles:       [],       // any array, just for performance
        areAllowed: 'boolean'
    });
    
    export const isUserRoleLimit = (suspect: unknown): suspect is UserRoleLimit => (
        Vts.conforms(suspect, schema)
    );
}

export const allow = (...roles: UserRole[]) => ({ roles, areAllowed: true});
export const deny  = (...roles: UserRole[]) => ({ roles, areAllowed: false});
