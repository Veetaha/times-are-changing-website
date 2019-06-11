import { RouteAcessMap } from '@app/common/route-acess-map.class';
import { UserRole      } from '@app/gql/generated';

import { allow } from './user-role-limit.obj';

// `sign-in` and `sign-up` are supposed to have the same role limit
const signInAndSignUpLimit = allow(UserRole.Guest);

export const authRouteAcessMap = new RouteAcessMap({
    'sign-in': signInAndSignUpLimit,
    'sign-up': signInAndSignUpLimit
});