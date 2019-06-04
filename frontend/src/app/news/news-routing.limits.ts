import { RouteAcessMap } from '@app/common/route-acess-map.class';
import { allow         } from '@app/auth/user-role-limit.obj';
import { UserRole      } from '@app/gql/generated';

export const newsRouteAccessMap = new RouteAcessMap({
    'news/create': allow(UserRole.Admin)
});