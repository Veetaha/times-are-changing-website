import { EntitySubscriberInterface, Connection, RemoveEvent, InsertEvent } from 'typeorm';
import { Injectable       } from '@nestjs/common';
import { InjectConnection } from '@nestjs/typeorm';

import { NewsComment } from '@modules/news-comment/news-comment.entity';

import { News } from './news.entity';

@Injectable()
export class NewsCommentEntitySubscriber implements EntitySubscriberInterface<NewsComment> {

    constructor(
        @InjectConnection() connection: Connection
    ) {
        connection.subscribers.push(this);
    }

    /* implements `EntitySubscriberInterface<>` */
    listenTo() { return NewsComment; }

    /* implements `EntitySubscriberInterface<>`  */
    afterRemove({entity, manager}: RemoveEvent<NewsComment>): Promise<any> | void {
        if (entity != null) {
            return manager.decrement(News, { id: entity.newsId }, 'commentsAmount', 1);
        }
    }

    /* implements `EntitySubscriberInterface<>` */
    afterInsert({entity, manager}: InsertEvent<NewsComment>) {
        return manager.increment(News, { id: entity.newsId }, 'commentsAmount' , 1);  
    }

}