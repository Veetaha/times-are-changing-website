import { Nullable, NullableProps } from 'ts-typedefs';
import { InputType } from 'type-graphql';
import { Min       } from 'class-validator';

import { ValidateAs        } from '@utils/validation/validations.decorator';
import { NullableOpt       } from '@utils/gql/opts';
import { ValidateIfPresent } from '@utils/validation/validate-if-present.decorator';
import { StringField, IntField } 
from '@utils/gql/decorators/explicit-type-field.decorator';

import { News } from '../news.entity';


@InputType()
export class UpdateNewsInput implements NullableProps<News> {
    
    @Min(1)
    @IntField()
    id!: number;

    @ValidateAs(News, 'title')      
    @ValidateIfPresent 
    @StringField(NullableOpt) 
    title?: Nullable<string>;

    @ValidateAs(News, 'body') 
    @ValidateIfPresent 
    @StringField(NullableOpt)
    body?:  Nullable<string>;

    @ValidateAs(News, 'promoImgId')
    @ValidateIfPresent
    @StringField(NullableOpt)
    promoImgId?: Nullable<string>;
}