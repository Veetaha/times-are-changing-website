import { RouteAcessMap } from '@app/common/route-acess-map.class';
import { UserRole      } from '@app/gql/generated';

import { allow } from './user-role-limit.obj';

export const authRouteAcessMap = new RouteAcessMap({
    'sign-in': allow(UserRole.Guest),
    'sign-up': allow(UserRole.Guest)
});