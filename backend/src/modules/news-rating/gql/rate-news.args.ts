import { ArgsType } from 'type-graphql';

import { IntField, BooleanField } from '@utils/gql/decorators/explicit-type-field.decorator';

@ArgsType()
export class RateNewsArgs {

    @IntField({ description: "Id of the news to rate." })
    newsId!: number;

    @BooleanField({ description: "`true` if user has liked the news, `false` means a dislike." })
    hasLiked!: boolean;

}