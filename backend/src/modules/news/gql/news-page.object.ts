import { ObjectType } from 'type-graphql';

import { Page } from '@utils/gql/pagination/page.object';

import { News } from '../news.entity';

@ObjectType()
export class NewsPage extends Page(News) {}