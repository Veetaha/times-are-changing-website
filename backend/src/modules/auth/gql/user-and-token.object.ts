import { ObjectType, Field } from 'type-graphql';
 
import { User                } from '@modules/user/user.entity';
import { StringField         } from '@utils/gql/decorators/explicit-type-field.decorator';
import { AssignConstructable } from '@common/utils/obj/assign-constructable';

@ObjectType()
export class UserAndToken extends AssignConstructable<UserAndToken> {
    @Field({ description: 'User instance that represents the client data.' })
    user!: User;

    @StringField({
        description: 'Bearer auth token that the client has to pass in "Authorization" header'
    })
    token!: string;
}