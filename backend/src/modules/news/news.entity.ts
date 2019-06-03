import { Nullable   } from 'ts-typedefs';
import { ObjectType } from 'type-graphql';
import { 
    Entity, 
    CreateDateColumn, 
    UpdateDateColumn, 
    PrimaryGeneratedColumn, 
    JoinColumn, 
    ManyToOne, 
    Column
} from 'typeorm';

import { User          } from '@modules/user/user.entity';
import { StringColumn  } from '@utils/orm/decorators/string-column.decorator';
import { StringField, DateField, IntField } 
from '@utils/gql/decorators/explicit-type-field.decorator';

import { limits } from '@common/constants';

@ObjectType()
@Entity()
export class News {    
    /**
     * Unique identifier.
     */
    @PrimaryGeneratedColumn()
    @IntField({ description: "`News` unique identifier." })
    id!: number;

    @CreateDateColumn() 
    @DateField({ description: "Date when this news was created." })
    creationDate!: Date;

    @UpdateDateColumn() 
    @DateField({ description: "Date when this news was updated last time." })
    lastUpdateDate!: Date;

    @ManyToOne(_type => User, { onDelete: 'CASCADE', lazy: true })
    @JoinColumn({ name: 'creatorLogin' })
    creator!: Promise<User>;

    /**
     * Collumn for News * <=> 1 User relation.
     */
    @StringField({ description: "Login of the user that created this news." }) 
    @Column()
    creatorLogin!: string;

    @StringField({ description: "Human-readable sentence that laconically describes this news." }) 
    @StringColumn(limits.news.title) 
    title!: string;

    @StringField({
        description: 
        "News main body markdown text, it may be vulnerable XSS attacks, be sure " +
        "to sanitize it on the client side after having converted it to HTML."
    }) 
    @StringColumn(limits.news.body) 
    body!: string;
    
        
    @StringColumn(limits.imgId, { nullable: true })
    @StringField({
        nullable: true,
        description: 
        "Id (from `UploadCare` file-hosting service) of the image to display as the " +
        "introduction to the news."
    })
    promoImgId?: Nullable<string>;

    @Column({ default: 0 })
    @IntField({ description: "Total amoutn of likes for this news." })
    likesAmount!: number;

    @Column({ default: 0 })
    @IntField({ description: "Total amount of dislikes for this news." })
    dislikesAmount!: number;

    @Column({ default: 0 })
    @IntField({ description: "Total amount of comments for this news." })
    commentsAmount!: number;
}