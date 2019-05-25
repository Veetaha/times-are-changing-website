import { Nullable } from 'ts-typedefs';

import { ClientAndToken } from './interfaces';

export const createAuthSnap = ({ token, client }: ClientAndToken) => ({ 
    token,
    client,
    isFetchingClient: false
});

export const stableUnAuthSnap = {
    token: null,
    client: null,
    isFetchingClient: false
};

export const createFetchingClientSnap = (token: Nullable<string> = null) => ({
    token, 
    client: null,
    isFetchingClient: true
});

export type AuthStateModel = (
    | ReturnType<typeof createAuthSnap>
    | typeof stableUnAuthSnap
    | ReturnType<typeof createFetchingClientSnap>
);