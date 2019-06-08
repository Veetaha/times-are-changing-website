import { Nullable } from 'ts-typedefs';
import { InputType, Field } from 'type-graphql';

import { NullableOpt     } from '@utils/gql/opts';
import { ValidateAs      } from '@utils/validation/validations.decorator';
import { StringField     } from '@utils/gql/decorators/explicit-type-field.decorator';
import { UserRole        } from '../user-role.enum';
import { UpdateMeInput } from './update-user.input';
import { User            } from '../user.entity';

@InputType()
export class UpdateUserInput extends UpdateMeInput {
    @ValidateAs(User, 'login')
    @StringField({ description: 'Defines the login of the user to update' })
    login!: string;

    @Field(_type => UserRole, NullableOpt)
    role?: Nullable<UserRole>;
}