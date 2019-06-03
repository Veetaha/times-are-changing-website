import { InputType } from 'type-graphql';

import { IntField, StringField } from '@utils/gql/decorators/explicit-type-field.decorator';

@InputType()
export class CreateNewsCommentInput {

    @IntField({ description: "Id of the news to add a comment to." })
    newsId!: number;

    @StringField({ description: "Comment markdown body text." })
    body!: string;

}