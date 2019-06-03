import _ from 'lodash';
import { 
    EntitySubscriberInterface, Connection, RemoveEvent, 
    UpdateEvent, InsertEvent, EntityManager 
} from 'typeorm';
import { Injectable       } from '@nestjs/common';
import { InjectConnection } from '@nestjs/typeorm';

import { NewsRating } from '@modules/news-rating/news-rating.entity';

import { News     } from './news.entity';
import { NewsRepo } from './news.repository';

const enum NewsRatingPropName {
    Likes    = 'likesAmount',
    Dislikes = 'dislikesAmount'
}


@Injectable()
export class NewsRatingEntitySubscriber implements EntitySubscriberInterface<NewsRating> {

    constructor(
        @InjectConnection() connection: Connection
    ) {
        connection.subscribers.push(this);
    }

    /* implements `EntitySubscriberInterface<>` */
    listenTo() { return NewsRating; }

    /* 
        implements `EntitySubscriberInterface<>` 

        See a bug with primary columns absence in this method: 
        https://github.com/typeorm/typeorm/issues/4058
    */
    afterRemove({entity, manager, entityId}: RemoveEvent<Pick<NewsRating, 'hasLiked'>>): Promise<any> | void {
        if (entity != null) {
            return this.decrement(manager, entityId.newsId, this.getUpdColName(entity.hasLiked));
        }
    }

    /* implements `EntitySubscriberInterface<>` */
    afterInsert({manager, entity}: InsertEvent<NewsRating>) {
        return this.increment(manager, entity.newsId, this.getUpdColName(entity.hasLiked));  
    }



    /* implements `EntitySubscriberInterface<>` */
    afterUpdate({entity, manager, updatedColumns}: UpdateEvent<NewsRating>): Promise<any> | void {
        if (entity != null && _.find(updatedColumns, ['propertyName', 'hasLiked']) != null) {
            return manager
                .getCustomRepository(NewsRepo)
                .updateRatingCounts(entity.newsId, entity.hasLiked);
        } 
    }


    private getUpdColName(hasLiked: boolean) {
        return hasLiked ? NewsRatingPropName.Likes : NewsRatingPropName.Dislikes;
    }

    private async decrement(manager: EntityManager, newsId: number, prop: NewsRatingPropName) {
        return manager.decrement(News, { id: newsId }, prop, 1);
    }

    private async increment(manager: EntityManager, newsId: number, prop: NewsRatingPropName) {
        return manager.increment(News, { id: newsId }, prop, 1);
    }
}