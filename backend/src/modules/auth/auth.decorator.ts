import { MethodDecorator } from 'ts-typedefs';
import { UseGuards, SetMetadata } from '@nestjs/common';

import { UserRole          } from '@modules/user/user-role.enum';
import { composeDecorators } from '@utils/meta';
import { AuthGuard         } from './auth.guard';
import { rolesMetaKey, optionalAuthMetaKey } from './constants';

export const Auth = (...roles: UserRole[]) => composeDecorators<MethodDecorator>(
    SetMetadata(rolesMetaKey, roles),
    UseGuards(AuthGuard) as MethodDecorator
);

export const OptionalAuth = composeDecorators<MethodDecorator>(
    SetMetadata(optionalAuthMetaKey, true),
    UseGuards(AuthGuard) as MethodDecorator
);