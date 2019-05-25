import { InputType } from 'type-graphql';

import { User             } from '@modules/user/user.entity';
import { NestedInputField } from '@utils/gql/decorators/nested-input-field.decorator';
import { StringField      } from '@utils/gql/decorators/explicit-type-field.decorator';
import { ValidateAs       } from '@utils/validation/validations.decorator';

import { SignInInput } from './sign-in.input';

@InputType()
export class SignUpInput {
    @NestedInputField(_type => SignInInput)
    credentials!: SignInInput;

    @ValidateAs(User, 'name')
    @StringField()
    name!: string;
}
