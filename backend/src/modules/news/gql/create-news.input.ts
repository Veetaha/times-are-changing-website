import { Nullable  } from 'ts-typedefs';
import { InputType } from 'type-graphql';

import { StringField } from '@utils/gql/decorators/explicit-type-field.decorator';
import { ValidateAs  } from '@utils/validation/validations.decorator';
import { NullableOpt } from '@utils/gql/opts';

import { News } from '../news.entity';

@InputType()
export class CreateNewsInput implements Partial<News> {

    @ValidateAs(News, 'title') 
    @StringField() 
    title!: string;

    @ValidateAs(News, 'body')  
    @StringField() 
    body!: string;

    @ValidateAs(News, 'promoImgId') @StringField(NullableOpt)
    promoImgId?: Nullable<string>;

}