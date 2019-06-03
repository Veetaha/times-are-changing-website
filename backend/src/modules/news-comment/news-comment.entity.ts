import { ObjectType } from 'type-graphql';
import { 
    Entity, Column, JoinColumn, ManyToOne, 
    PrimaryGeneratedColumn, UpdateDateColumn, CreateDateColumn 
} from 'typeorm';

import { User   } from '@modules/user/user.entity';
import { News   } from '@modules/news/news.entity';
import { limits } from '@common/constants';

import { StringField, IntField, DateField } from '@utils/gql/decorators/explicit-type-field.decorator';
import { StringColumn } from '@utils/orm/decorators/string-column.decorator';

@ObjectType({
    description: "Represents users' thoughts about particular news that they express in text."
})
@Entity()
export class NewsComment {
    /**
     * Unique identifier.
     */
    @PrimaryGeneratedColumn()
    @IntField({ description: "`NewsComment` unique identifier." })
    id!: number;

    @CreateDateColumn() 
    @DateField({ description: "Date when this comment was created." })
    creationDate!: Date;

    @UpdateDateColumn() 
    @DateField({ description: "Date when this comment was updated last time." })
    lastUpdateDate!: Date;

    @ManyToOne(_type => User, { onDelete: 'CASCADE', lazy: true })
    @JoinColumn({ name: 'commentatorLogin' })
    commentator!: Promise<User>;

    @ManyToOne(_type => News, { onDelete: 'CASCADE', lazy: true })
    @JoinColumn({ name: 'newsId' })
    news!: Promise<News>;
    
    @Column()
    @StringField({ description: 'Login of the user that created this comment.' })
    commentatorLogin!: string;

    @Column()
    @IntField({ description: 'Id of the news that the user commented on.' })
    newsId!: number;
    
    @StringField({
        description: 
        "Comment body markdown text, it may be vulnerable XSS attacks, be sure " +
        "to sanitize it on the client side after having converted it to HTML."
    }) 
    @StringColumn(limits.newsComment.body) 
    body!: string;
}