import { Obj } from 'ts-typedefs';
import { UserRoleLimit } from '@app/auth/user-role-limit.obj';

export type RouteMapObj<TPaths extends string> = (
    Obj<UserRoleLimit | undefined, TPaths>
);

export class RouteAcessMap<TPaths extends string> {
    constructor(private readonly routeMap: RouteMapObj<TPaths>) {}

    getRoleLimitFor(path: TPaths) {
        const roleLimit = this.routeMap[path];
        if (roleLimit == null) {
            throw new TypeError('Required role limit, but it was null');
        }
        return roleLimit;
    }
}
