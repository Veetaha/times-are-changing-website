import { InputType     } from 'type-graphql';

import { User          } from '@modules/user/user.entity';
import { limits        } from '@common/constants';
import { StringField   } from '@utils/gql/decorators/explicit-type-field.decorator';
import { StringLength  } from '@utils/validation/string-length.decorator';
import { ValidateAs    } from '@utils/validation/validations.decorator';

@InputType()
export class SignInInput {
    @ValidateAs(User, 'login')
    @StringField()
    login!: string;

    @StringField()
    @StringLength(limits.user.password)
    password!: string;
}