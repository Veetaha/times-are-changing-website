import { NullableProps } from 'ts-typedefs';
import { InputType } from 'type-graphql';
import { Min       } from 'class-validator';

import { ValidateAs        } from '@utils/validation/validations.decorator';
import { StringField, IntField } from '@utils/gql/decorators/explicit-type-field.decorator';

import { NewsComment } from '../news-comment.entity';

@InputType()
export class UpdateNewsCommentInput implements NullableProps<NewsComment> {
    
    @Min(1)
    @IntField()
    id!: number;

    @ValidateAs(NewsComment, 'body') 
    @StringField()
    body!: string;

}