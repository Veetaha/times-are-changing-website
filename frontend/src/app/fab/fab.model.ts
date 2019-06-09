import { Nullable, DeepReadonly } from 'ts-typedefs';

import { UserRoleLimit } from '@app/auth/user-role-limit.obj';

export type FabStateModel = DeepReadonly<{
    /** defines fab button icon */
    fabIcon?:    Nullable<string>;        
    /**
     * Defines route where fab navigates user when clicked.
     * Fab will be deleted when and no action will be dispatch when click happend
     * if route is not `null | undefined`.
     */ 
    routerLink?: Nullable<string>;        
    /** defines role limit that client must obey to in order to view fab. */
    roleLimit?:  Nullable<UserRoleLimit>;
    /** Tooltip text that will be diplayed when the users hovers over the fab. */
    tooltip?: Nullable<string>;
}>;

export const noFabSnap = {
    fabIcon:    null,
    tooltip:    null,
    routerLink: null,
    roleLimit:  null
};