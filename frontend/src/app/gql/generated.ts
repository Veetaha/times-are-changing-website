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

export type AdminUpdateUserInput = {
    /** New user name. */
    name?: Maybe<Scalars["String"]>;
    /** New user avatar id. This is currently an uploadcare image uiud. */
    avatarImgId?: Maybe<Scalars["String"]>;
    /** Defines the login of the user to update */
    login: Scalars["String"];
    role?: Maybe<UserRole>;
};

/** Filter input parameters for `Boolean` type. */
export type BooleanFilterInput = {
    /** Defines the mode (logical operator) to unite all filter conditions (`And` by default). */
    unionMode?: Maybe<FilterUnion>;
    /** Defines `target == param` SQL logical expression. */
    eq?: Maybe<Scalars["Boolean"]>;
    /** Defines `target <> param` SQL logical expression. */
    neq?: Maybe<Scalars["Boolean"]>;
};

export type CreateNewsInput = {
    title: Scalars["String"];
    body: Scalars["String"];
    promoImgId?: Maybe<Scalars["String"]>;
};

/** Filter input parameters for `Date` type. */
export type DateFilterInput = {
    /** Defines the mode (logical operator) to unite all filter conditions (`And` by default). */
    unionMode?: Maybe<FilterUnion>;
    /** Defines `target == param` SQL logical expression. */
    eq?: Maybe<Scalars["DateTime"]>;
    /** Defines `target <> param` SQL logical expression. */
    neq?: Maybe<Scalars["DateTime"]>;
    /** Defines `target <= param` SQL logical expression. */
    geq?: Maybe<Scalars["DateTime"]>;
    /** Defines `target <= param` SQL logical expression. */
    leq?: Maybe<Scalars["DateTime"]>;
    /** Defines `target > param` SQL logical expression. */
    gt?: Maybe<Scalars["DateTime"]>;
    /** Defines `target < param` SQL logical expression. */
    lt?: Maybe<Scalars["DateTime"]>;
    /** Defines `target IN param` SQL logical expression. */
    in?: Maybe<Array<Scalars["DateTime"]>>;
    /** Defines `target NOT IN param` SQL logical expression. */
    nin?: Maybe<Array<Scalars["DateTime"]>>;
};

/** Defines a mode to unite all filter conditions for fields or inside one field. */
export enum FilterUnion {
    And = "And",
    Or = "Or",
    Nand = "Nand",
    Nor = "Nor"
}

/** Filter input parameters for `Int` type. */
export type IntFilterInput = {
    /** Defines the mode (logical operator) to unite all filter conditions (`And` by default). */
    unionMode?: Maybe<FilterUnion>;
    /** Defines `target == param` SQL logical expression. */
    eq?: Maybe<Scalars["Int"]>;
    /** Defines `target <> param` SQL logical expression. */
    neq?: Maybe<Scalars["Int"]>;
    /** Defines `target <= param` SQL logical expression. */
    geq?: Maybe<Scalars["Int"]>;
    /** Defines `target <= param` SQL logical expression. */
    leq?: Maybe<Scalars["Int"]>;
    /** Defines `target > param` SQL logical expression. */
    gt?: Maybe<Scalars["Int"]>;
    /** Defines `target < param` SQL logical expression. */
    lt?: Maybe<Scalars["Int"]>;
    /** Defines `target IN param` SQL logical expression. */
    in?: Maybe<Array<Scalars["Int"]>>;
    /** Defines `target NOT IN param` SQL logical expression. */
    nin?: Maybe<Array<Scalars["Int"]>>;
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
    /** Requires auth. Creates or updates existing rating the client gave to the news. */
    rateNews: NewsRating;
    /** Requires auth. Deletes rating instance on behalf of the client. Returns `true` if deletion was successful. */
    deleteNewsRating: Scalars["Boolean"];
    /** Requires auth. Creates news on behalf of the client and returns it. */
    createNews: News;
    /** Requires auth. Updates news and returns it, but throws if news doesn't exist or client has no rights to mutate the news. */
    updateNews: News;
    /** Requires auth. Deletes the news by id and returns `true`, but throws if news
     * doesn't exist or client has no rights to mutate the news.
     */
    deleteNews: Scalars["Boolean"];
};

export type MutationSignInArgs = {
    params: SignInInput;
};

export type MutationSignUpArgs = {
    params: SignUpInput;
};

export type MutationUpdateMeArgs = {
    params: UpdateUserInput;
};

export type MutationUpdateUserArgs = {
    params: AdminUpdateUserInput;
};

export type MutationRateNewsArgs = {
    newsId: Scalars["Int"];
    hasLiked: Scalars["Boolean"];
};

export type MutationDeleteNewsRatingArgs = {
    newsId: Scalars["Float"];
};

export type MutationCreateNewsArgs = {
    params: CreateNewsInput;
};

export type MutationUpdateNewsArgs = {
    params: UpdateNewsInput;
};

export type MutationDeleteNewsArgs = {
    id: Scalars["Int"];
};

export type News = {
    /** News unique identifier. */
    id: Scalars["Int"];
    /** Date when this news was created. */
    creationDate: Scalars["DateTime"];
    /** Date when this news was updated last time. */
    lastUpdateDate: Scalars["DateTime"];
    /** Login of the user that created this news. */
    creatorLogin: Scalars["String"];
    /** Human-readable sentence that laconically describes this news. */
    title: Scalars["String"];
    /** News main body markdown text, it may be vulnerable XSS attacks, be sure to
     * sanitize it on the client side after having converted it to HTML.
     */
    body: Scalars["String"];
    /** Id (from `UploadCare` file-hosting service) of the image to display as the introduction to the news. */
    promoImgId?: Maybe<Scalars["String"]>;
    /** Total number of likes for this news. */
    likes: Scalars["Int"];
    /** Total number of dislikes for this news. */
    dislikes: Scalars["Int"];
    /** Returns the rating that the client has set to this news or `null` if client is
     * not authenticated or he hasn't set any rating to the target news yet.
     */
    myRating?: Maybe<NewsRating>;
    /** Returns existing news `promoImgId` or default one if former was not set. */
    promoImgIdOrDefault: Scalars["String"];
    /** Returns the user that created this news. */
    creator: User;
};

export type NewsFilterInput = {
    /** Defines the mode (logical operator) to unite all filter conditions (`And` by default). */
    unionMode?: Maybe<FilterUnion>;
    /** Per-property filters. */
    props: NewsPropsFilterInput;
};

export type NewsPage = {
    /** Contains an array of items payload for this page. */
    data: Array<News>;
    /** Total number of items a client can query with this request. It must me an integer that is >= 0. */
    total: Scalars["Int"];
};

export type NewsPaginationInput = {
    /** Maximum amount of items to return for page. It must be an integer within the range [0, 500] */
    limit: Scalars["Int"];
    /** Offset that defines an index of the beginning of the page of items. It must be an integer that is >= 0. */
    offset: Scalars["Int"];
    /** Defines limitations for the items of the returned page. */
    filter?: Maybe<NewsFilterInput>;
    /** Defines sorting order for the items according to their property values. */
    sort?: Maybe<NewsSortInput>;
};

export type NewsPropsFilterInput = {
    id?: Maybe<IntFilterInput>;
    title?: Maybe<StringFilterInput>;
    promoImgId?: Maybe<StringFilterInput>;
    creatorLogin?: Maybe<StringFilterInput>;
    creationDate?: Maybe<DateFilterInput>;
    lastUpdateDate?: Maybe<DateFilterInput>;
};

/** Represents a [dis]like instance that the users set to news. */
export type NewsRating = {
    /** Login of the user that rated the news. */
    raterLogin: Scalars["String"];
    /** Id of the news that the user rated. */
    newsId: Scalars["Int"];
    /** Defines whether the user liked the news or not. */
    hasLiked: Scalars["Boolean"];
    /** Returns the user that rated the given `news`. */
    rater: User;
    /** Returns the news that was rated by the `rater`. */
    news: News;
};

export type NewsRatingFilterInput = {
    /** Defines the mode (logical operator) to unite all filter conditions (`And` by default). */
    unionMode?: Maybe<FilterUnion>;
    /** Per-property filters. */
    props: NewsRatingPropsFilterInput;
};

export type NewsRatingPage = {
    /** Contains an array of items payload for this page. */
    data: Array<NewsRating>;
    /** Total number of items a client can query with this request. It must me an integer that is >= 0. */
    total: Scalars["Int"];
};

export type NewsRatingPaginationInput = {
    /** Maximum amount of items to return for page. It must be an integer within the range [0, 500] */
    limit: Scalars["Int"];
    /** Offset that defines an index of the beginning of the page of items. It must be an integer that is >= 0. */
    offset: Scalars["Int"];
    /** Defines limitations for the items of the returned page. */
    filter?: Maybe<NewsRatingFilterInput>;
    /** Defines sorting order for the items according to their property values. */
    sort?: Maybe<NewsRatingSortInput>;
};

export type NewsRatingPropsFilterInput = {
    newsId?: Maybe<IntFilterInput>;
    raterLogin?: Maybe<StringFilterInput>;
    hasLiked?: Maybe<BooleanFilterInput>;
};

export type NewsRatingSortInput = {
    newsId?: Maybe<SortInput>;
    raterLogin?: Maybe<SortInput>;
    hasLiked?: Maybe<SortInput>;
};

export type NewsSortInput = {
    id?: Maybe<SortInput>;
    title?: Maybe<SortInput>;
    creatorLogin?: Maybe<SortInput>;
    creationDate?: Maybe<SortInput>;
    lastUpdateDate?: Maybe<SortInput>;
};

export type Query = {
    /** Returns global default news `promoImgId`. */
    getDefaultUserAvatarImgId: Scalars["String"];
    /** Returns user by login, or `null` if nothing was found. */
    getUserByLogin?: Maybe<User>;
    /** Paginates all users. */
    getUsersPage: UserPage;
    /** Requires auth. Returns `User` that represents the current client. */
    getMe: User;
    /** Paginates all news ratings. */
    getNewsRatingsPage: NewsRatingPage;
    /** Paginates all news. */
    getNewsPage: NewsPage;
    /** Returns a single news instance by `id`, or `null` if nothing was found. */
    getNewsById?: Maybe<News>;
};

export type QueryGetUserByLoginArgs = {
    login: Scalars["String"];
};

export type QueryGetUsersPageArgs = {
    params: UserPaginationInput;
};

export type QueryGetNewsRatingsPageArgs = {
    params: NewsRatingPaginationInput;
};

export type QueryGetNewsPageArgs = {
    params: NewsPaginationInput;
};

export type QueryGetNewsByIdArgs = {
    id: Scalars["Int"];
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
    /** Applies `param` POSIX case-insensitive regular expression to `target`. */
    iregexp?: Maybe<Scalars["String"]>;
    /** Applies `param` POSIX case-insensitive regular expression to `target` and negates the result. */
    niregexp?: Maybe<Scalars["String"]>;
    /** Applies `param` POSIX case-sensitive regular expression to `target`. */
    regexp?: Maybe<Scalars["String"]>;
    /** Applies `param` POSIX case-sensitive regular expression to `target` and negates the result. */
    nregexp?: Maybe<Scalars["String"]>;
    /** Defines `target IN param` SQL logical expression. */
    in?: Maybe<Array<Scalars["String"]>>;
    /** Defines `target NOT IN param` SQL logical expression. */
    nin?: Maybe<Array<Scalars["String"]>>;
};

export type UpdateNewsInput = {
    id: Scalars["Int"];
    title?: Maybe<Scalars["String"]>;
    body?: Maybe<Scalars["String"]>;
    promoImgId?: Maybe<Scalars["String"]>;
};

export type UpdateUserInput = {
    /** New user name. */
    name?: Maybe<Scalars["String"]>;
    /** New user avatar id. This is currently an uploadcare image uiud. */
    avatarImgId?: Maybe<Scalars["String"]>;
};

export type User = {
    /** Unique user identifier. */
    login: Scalars["String"];
    /** Date when this account was created. */
    creationDate: Scalars["DateTime"];
    /** Date when this account was updated last time. */
    lastUpdateDate: Scalars["DateTime"];
    /** Defines user access level role. */
    role: UserRole;
    /** User name to refer to him/her. */
    name: Scalars["String"];
    /** User avatar picture url, or null of was not set. This is currently an `uploadcare` image uuid. */
    avatarImgId?: Maybe<Scalars["String"]>;
    /** Returns existing user `avatarImgId` or default one if former was not set. */
    avatarImgIdOrDefault: Scalars["String"];
};

export type UserAndToken = {
    /** User instance that represents the client data. */
    user: User;
    /** Bearer auth token that the client has to pass in "Authorization" header */
    token: Scalars["String"];
};

export type UserFilterInput = {
    /** Defines the mode (logical operator) to unite all filter conditions (`And` by default). */
    unionMode?: Maybe<FilterUnion>;
    /** Per-property filters. */
    props: UserPropsFilterInput;
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
    filter?: Maybe<UserFilterInput>;
    /** Defines sorting order for the items according to their property values. */
    sort?: Maybe<UserSortInput>;
};

export type UserPropsFilterInput = {
    avatarImgId?: Maybe<StringFilterInput>;
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
    /** Defines `target IN param` SQL logical expression. */
    in?: Maybe<Array<UserRole>>;
    /** Defines `target NOT IN param` SQL logical expression. */
    nin?: Maybe<Array<UserRole>>;
};

export type UserSortInput = {
    login?: Maybe<SortInput>;
    name?: Maybe<SortInput>;
    creationDate?: Maybe<SortInput>;
    lastUpdateDate?: Maybe<SortInput>;
    role?: Maybe<SortInput>;
};
export type EntireUserFragment = { __typename: "User" } & Pick<
    User,
    "creationDate" | "lastUpdateDate" | "role" | "name" | "login"
> & { avatarImgId: User["avatarImgIdOrDefault"] };

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
                    "role" | "name" | "login" | "creationDate"
                > & { avatarImgId: User["avatarImgIdOrDefault"] }
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
        avatarImgId: avatarImgIdOrDefault
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
                avatarImgId: avatarImgIdOrDefault
                creationDate
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
