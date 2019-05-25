import { Nullable, NullableProps } from 'ts-typedefs';
import { InputType } from 'type-graphql';

import { User              } from '@modules/user/user.entity';
import { ValidateIfPresent } from '@utils/validation/validate-if-present.decorator';
import { StringField       } from '@utils/gql/decorators/explicit-type-field.decorator';
import { ValidateAs        } from '@utils/validation/validations.decorator';

@InputType()
export class UserUpdateInput implements NullableProps<User> {
    @ValidateAs(User, 'name')
    @ValidateIfPresent
    @StringField({
        nullable: true,
        description: 'New user name.'
    })
    name?: Nullable<string>;

    @ValidateAs(User, 'avatarId')
    @ValidateIfPresent
    @StringField({
        nullable: true,
        description: 'New user avatar id. This is currently an uploadcare image uiud.'
    })
    avatarId?: Nullable<string>;
}
