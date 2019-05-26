import { GetUsersPageQuery } from '@app/gql/generated';

export type PagedUser = GetUsersPageQuery['getUsersPage']['data'][number];