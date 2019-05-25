import _ from 'lodash';
import { Obj, Nullable } from 'ts-typedefs';

import { UserRoleLimit } from '@app/auth/user-role-limit.obj';
import { Route } from '@utils/routing/route.interface';

export type RouteData = Nullable<UserRoleLimit>;

export type RouteArray<TPaths extends string> = Route<TPaths, RouteData>[];

export type RouteMapObj<TPaths extends string> = (
    Obj<Route<TPaths, RouteData>, TPaths>
);