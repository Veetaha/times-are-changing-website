import { ObjectType } from 'type-graphql';

import { Page } from '@utils/gql/pagination/page.object';

import { NewsComment } from '../news-comment.entity';

@ObjectType()
export class NewsCommentPage extends Page(NewsComment) {}