import { Nullable, ParameterDecorator } from 'ts-typedefs';
import { Context } from '@nestjs/graphql';

import { User } from '@modules/user/user.entity';

import { GetClientPipe } from './get-client.pipe';

/**
 * Injects user from context into the parameter.
 */
export const Client: ParameterDecorator<Nullable<User>> = Context(GetClientPipe);