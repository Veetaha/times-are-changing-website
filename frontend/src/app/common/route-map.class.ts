import _ from 'lodash';

import { RouteArray, RouteMapObj } from './route-map.interface';


export interface RouteMapAndArray<TPaths extends string> {
    routeMap: RouteMap<TPaths>;
    routes:   RouteArray<TPaths>;
}

export class RouteMap<TPaths extends string> {
    private readonly routeMap: RouteMapObj<TPaths>;

    constructor(routes: RouteArray<TPaths>) {
        this.routeMap = routes.reduce(
            (acc, route) => (acc[route.path] = route, acc),
            {} as RouteMapObj<TPaths>
        );
    }

    static create<TPaths extends string>(routes: RouteArray<TPaths>): RouteMapAndArray<TPaths> {
        return { routeMap: new RouteMap(routes), routes };
    }

    getRoleLimitFor(path: TPaths) {
        const roleLimit = this.routeMap[path].data;
        if (roleLimit == null) {
            throw new TypeError('Required role limit, but it was null');
        }
        return roleLimit;
    }
}