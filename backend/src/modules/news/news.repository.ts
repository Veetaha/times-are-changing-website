import { EntityRepository, Repository } from 'typeorm';

import { News } from './news.entity';

@EntityRepository(News)
export class NewsRepo extends Repository<News> {

    /**
     * Increments/decrements likesAmount/dislikesAmount counts according to whether the user
     * `hasLiked` the news or not.
     * 
     * @param id       Target news id.
     * @param hasLiked True if user liked the news, false otherwise.
     */
    async updateRatingCounts(id: number, hasLiked: boolean) {
        return this
            .createQueryBuilder()
            .update()
            .set(hasLiked ?
                { 
                    likesAmount:    () => '"likesAmount" + 1', 
                    dislikesAmount: () => '"dislikesAmount" - 1'
                } : {
                    likesAmount:    () => '"likesAmount" - 1', 
                    dislikesAmount: () => '"dislikesAmount" + 1'
                } 
             )
            .where({ id })
            .execute();
    }
}