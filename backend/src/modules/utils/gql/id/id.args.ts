import { ArgsType } from 'type-graphql';
import { Min      } from 'class-validator';

import { IntField } from '@utils/gql/decorators/explicit-type-field.decorator';


@ArgsType()
export class IdArgs {
    @Min(1)
    @IntField()
    id!: number;
}