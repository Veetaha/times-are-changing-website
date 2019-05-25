import { ObjectType } from 'type-graphql';

import { Page } from '@utils/gql/pagination/page.object';

import { User } from '../user.entity';

@ObjectType()
export class UserPage extends Page(User) {}