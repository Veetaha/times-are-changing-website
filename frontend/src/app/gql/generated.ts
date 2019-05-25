export type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
    ID: string;
    String: string;
    Boolean: boolean;
    Int: number;
    Float: number;
    /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
    DateTime: string;
};

export type AdminUserUpdateInput = {
    /** New user name. */
    name?: Maybe<Scalars["String"]>;
    /** New user avatar id. This is currently an uploadcare image uiud. */
    avatarId?: Maybe<Scalars["String"]>;
    /** Defines the login of the user to update */
    login: Scalars["String"];
    role?: Maybe<UserRole>;
};

/** Filter input parameters for `Date` type. */
export type DateFilterInput = {
    /** Defines the mode (logical operator) to unite all filter conditions (`And` by default). */
    unionMode?: Maybe<FilterUnion>;
    /** Defines `target == param` SQL logical expression. */
    eq?: Maybe<Scalars["DateTime"]>;
    /** Defines `target <> param` SQL logical expression. */
    neq?: Maybe<Scalars["DateTime"]>;
    /** Defines `target <= param` SQL logical expression */
    geq?: Maybe<Scalars["DateTime"]>;
    /** Defines `target <= param` SQL logical expression */
    leq?: Maybe<Scalars["DateTime"]>;
    /** Defines `target > param` SQL logical expression */
    gt?: Maybe<Scalars["DateTime"]>;
    /** Defines `target < param` SQL logical expression */
    lt?: Maybe<Scalars["DateTime"]>;
    /** Defines `target IN param` SQL logical expression */
    in?: Maybe<Array<Scalars["DateTime"]>>;
    /** Defines `target NOT IN param` SQL logical expression */
    nin?: Maybe<Array<Scalars["DateTime"]>>;
};

/** Defines a mode to unite all filter conditions for fields or inside one field. */
export enum FilterUnion {
    And = "And",
    Or = "Or",
    Nand = "Nand",
    Nor = "Nor"
}

export type MetaUserPropsFilterInput = {
    /** Defines the mode (logical operator) to unite all filter conditions (`And` by default). */
    unionMode?: Maybe<FilterUnion>;
    /** Per-property filters. */
    props: UserPropsFilterInput;
};

export type Mutation = {
    /** Returns `UserAndToken` for the client according to the given `credentials`. */
    signIn?: Maybe<UserAndToken>;
    /** Registers the client in the database and returns its `UserAndToken`. Throws if failed to register new client. */
    signUp: UserAndToken;
    /** Requires auth. Updates current client data and returns it. */
    updateMe: User;
    /** Requires 'Admin' rights. Updates user by the given login and returns it, but
     * retuns `null` if there nothing was found for the given login.
     */
    updateUser?: Maybe<User>;
};

export type MutationSignInArgs = {
    params: SignInInput;
};

export type MutationSignUpArgs = {
    params: SignUpInput;
};

export type MutationUpdateMeArgs = {
    params: UserUpdateInput;
};

export type MutationUpdateUserArgs = {
    params: AdminUserUpdateInput;
};

export type Query = {
    /** Returns global default user `avatarId`. */
    getDefaultUserAvatarId: Scalars["String"];
    /** Returns user by login, or `null` if nothing was found. */
    getUserByLogin?: Maybe<User>;
    /** Paginates all users. */
    getUsersPage: UserPage;
    /** Requires auth. Returns `User` that represents the current client. */
    getMe: User;
};

export type QueryGetUserByLoginArgs = {
    login: Scalars["String"];
};

export type QueryGetUsersPageArgs = {
    params: UserPaginationInput;
};

export type SignInInput = {
    login: Scalars["String"];
    password: Scalars["String"];
};

export type SignUpInput = {
    credentials: SignInInput;
    name: Scalars["String"];
};

/** Defines ascending or descending order for sorting items. */
export enum SortingOrder {
    Asc = "Asc",
    Desc = "Desc"
}

/** Defines sorting order for the given field. */
export type SortInput = {
    /** Defines whether to return `null` values first or not (`false` by default) */
    nullsFirst?: Maybe<Scalars["Boolean"]>;
    /** Defines the order for the given field to be sorted with. */
    ordering: SortingOrder;
};

/** Filter input parameters for `String` type */
export type StringFilterInput = {
    /** Defines the mode (logical operator) to unite all filter conditions (`And` by default). */
    unionMode?: Maybe<FilterUnion>;
    /** Defines `target == param` SQL logical expression. */
    eq?: Maybe<Scalars["String"]>;
    /** Defines `target <> param` SQL logical expression. */
    neq?: Maybe<Scalars["String"]>;
    /** Defines `target ILIKE param` SQL logical expression */
    ilike?: Maybe<Scalars["String"]>;
    /** Defines `target NOT ILIKE param` SQL logical expression */
    nilike?: Maybe<Scalars["String"]>;
    /** Defines `target LIKE param` SQL logical expression */
    like?: Maybe<Scalars["String"]>;
    /** Defines `target NOT LIKE param` SQL logical expression */
    nlike?: Maybe<Scalars["String"]>;
    /** Defines `target IN param` SQL logical expression */
    in?: Maybe<Array<Scalars["String"]>>;
    /** Defines `target NOT IN param` SQL logical expression */
    nin?: Maybe<Array<Scalars["String"]>>;
};

export type User = {
    /** Date when this account was created. */
    creationDate: Scalars["DateTime"];
    /** Date when this account was updated last time. */
    lastUpdateDate: Scalars["DateTime"];
    /** Defines user access level role. */
    role: UserRole;
    /** User name to refer to him/her. */
    name: Scalars["String"];
    /** Unique user identifier. */
    login: Scalars["String"];
    /** User avatar picture url, or null of was not set. This is currently an `uploadcare` image uuid. */
    avatarId?: Maybe<Scalars["String"]>;
    /** Returns existing `avatarid` or default one if former was not set. */
    avatarIdOrDefault: Scalars["String"];
};

export type UserAndToken = {
    /** User instance that represents the client data. */
    user: User;
    /** Bearer auth token that the client has to pass in "Authorization" header */
    token: Scalars["String"];
};

export type UserPage = {
    /** Contains an array of items payload for this page. */
    data: Array<User>;
    /** Total number of items a client can query with this request. It must me an integer that is >= 0. */
    total: Scalars["Int"];
};

export type UserPaginationInput = {
    /** Maximum amount of items to return for page. It must be an integer within the range [0, 500] */
    limit: Scalars["Int"];
    /** Offset that defines an index of the beginning of the page of items. It must be an integer that is >= 0. */
    offset: Scalars["Int"];
    /** Defines limitations for the items of the returned page. */
    filter?: Maybe<MetaUserPropsFilterInput>;
    /** Defines sorting order for the items according to their property values. */
    sort?: Maybe<UserSortInput>;
};

export type UserPropsFilterInput = {
    avatarId?: Maybe<StringFilterInput>;
    creationDate?: Maybe<DateFilterInput>;
    lastUpdateDate?: Maybe<DateFilterInput>;
    login?: Maybe<StringFilterInput>;
    name?: Maybe<StringFilterInput>;
    role?: Maybe<UserRoleFilterInput>;
};

/** Enumeration that defines users' access level */
export enum UserRole {
    Guest = "Guest",
    Regular = "Regular",
    Admin = "Admin"
}

export type UserRoleFilterInput = {
    /** Defines the mode (logical operator) to unite all filter conditions (`And` by default). */
    unionMode?: Maybe<FilterUnion>;
    /** Defines `target == param` SQL logical expression. */
    eq?: Maybe<UserRole>;
    /** Defines `target <> param` SQL logical expression. */
    neq?: Maybe<UserRole>;
    /** Defines `target IN param` SQL logical expression */
    in?: Maybe<Array<UserRole>>;
    /** Defines `target NOT IN param` SQL logical expression */
    nin?: Maybe<Array<UserRole>>;
};

export type UserSortInput = {
    avatarUrl?: Maybe<SortInput>;
    login?: Maybe<SortInput>;
    name?: Maybe<SortInput>;
    creationDate?: Maybe<SortInput>;
    lastUpdateDate?: Maybe<SortInput>;
    role?: Maybe<SortInput>;
};

export type UserUpdateInput = {
    /** New user name. */
    name?: Maybe<Scalars["String"]>;
    /** New user avatar id. This is currently an uploadcare image uiud. */
    avatarId?: Maybe<Scalars["String"]>;
};
export type EntireUserFragment = { __typename: "User" } & Pick<
    User,
    "creationDate" | "lastUpdateDate" | "role" | "name" | "login"
> & { avatarId: User["avatarIdOrDefault"] };

export type EntireClientAndTokenFragment = {
    __typename?: "UserAndToken";
} & Pick<UserAndToken, "token"> & {
        client: { __typename?: "User" } & EntireUserFragment;
    };

export type GetMeQueryVariables = {};

export type GetMeQuery = { __typename?: "Query" } & {
    getMe: { __typename?: "User" } & EntireUserFragment;
};

export type SignUpMutationVariables = {
    params: SignUpInput;
};

export type SignUpMutation = { __typename?: "Mutation" } & {
    signUp: { __typename?: "UserAndToken" } & EntireClientAndTokenFragment;
};

export type SignInMutationVariables = {
    params: SignInInput;
};

export type SignInMutation = { __typename?: "Mutation" } & {
    signIn: Maybe<
        { __typename?: "UserAndToken" } & EntireClientAndTokenFragment
    >;
};

export type GetUsersPageQueryVariables = {
    params: UserPaginationInput;
};

export type GetUsersPageQuery = { __typename?: "Query" } & {
    getUsersPage: { __typename?: "UserPage" } & Pick<UserPage, "total"> & {
            data: Array<
                { __typename?: "User" } & Pick<
                    User,
                    "role" | "name" | "login"
                > & { avatarId: User["avatarIdOrDefault"] }
            >;
        };
};

import gql from "graphql-tag";
import { Injectable } from "@angular/core";
import * as Apollo from "apollo-angular";
export const EntireUserFragmentDoc = gql`
    fragment EntireUser on User {
        __typename
        creationDate
        lastUpdateDate
        role
        name
        login
        avatarId: avatarIdOrDefault
    }
`;
export const EntireClientAndTokenFragmentDoc = gql`
    fragment EntireClientAndToken on UserAndToken {
        token
        client: user {
            ...EntireUser
        }
    }
    ${EntireUserFragmentDoc}
`;
export const GetMeDocument = gql`
    query getMe {
        getMe {
            ...EntireUser
        }
    }
    ${EntireUserFragmentDoc}
`;

@Injectable({
    providedIn: "root"
})
export class GetMeGQL extends Apollo.Query<GetMeQuery, GetMeQueryVariables> {
    document = GetMeDocument;
}
export const SignUpDocument = gql`
    mutation signUp($params: SignUpInput!) {
        signUp(params: $params) {
            ...EntireClientAndToken
        }
    }
    ${EntireClientAndTokenFragmentDoc}
`;

@Injectable({
    providedIn: "root"
})
export class SignUpGQL extends Apollo.Mutation<
    SignUpMutation,
    SignUpMutationVariables
> {
    document = SignUpDocument;
}
export const SignInDocument = gql`
    mutation signIn($params: SignInInput!) {
        signIn(params: $params) {
            ...EntireClientAndToken
        }
    }
    ${EntireClientAndTokenFragmentDoc}
`;

@Injectable({
    providedIn: "root"
})
export class SignInGQL extends Apollo.Mutation<
    SignInMutation,
    SignInMutationVariables
> {
    document = SignInDocument;
}
export const GetUsersPageDocument = gql`
    query getUsersPage($params: UserPaginationInput!) {
        getUsersPage(params: $params) {
            total
            data {
                role
                name
                login
                avatarId: avatarIdOrDefault
            }
        }
    }
`;

@Injectable({
    providedIn: "root"
})
export class GetUsersPageGQL extends Apollo.Query<
    GetUsersPageQuery,
    GetUsersPageQueryVariables
> {
    document = GetUsersPageDocument;
}
