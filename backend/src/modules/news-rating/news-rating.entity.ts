import { ObjectType } from 'type-graphql';
import { Entity, Column, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';

import { User } from '@modules/user/user.entity';
import { News } from '@modules/news/news.entity';

import { StringField, IntField, BooleanField } 
from '@utils/gql/decorators/explicit-type-field.decorator';


/**
 * Join table for news and users, also represents the rating users set for news.
 */
@ObjectType({
    description: "Represents a [dis]like instance that the users set to news."
})
@Entity()
export class NewsRating {

    @ManyToOne(_type => User, { onDelete: 'CASCADE', lazy: true })
    @JoinColumn({ name: 'raterLogin' })
    rater!: Promise<User>;

    @ManyToOne(_type => News, { onDelete: 'CASCADE', lazy: true })
    @JoinColumn({ name: 'newsId' })
    news!: Promise<News>;
    
    /**
     * Unique identifiers pair member.
     */
    @PrimaryColumn()    
    @StringField({ description: 'Login of the user that rated the news.' })
    raterLogin!: string;

    /**
     * Unique identifiers pair member.
     */
    @PrimaryColumn()
    @IntField({ description: 'Id of the news that the user rated.' })
    newsId!: number;

    @Column()
    @BooleanField({ description: 'Defines whether the user liked the news or not.' })
    hasLiked!: boolean;
    
}