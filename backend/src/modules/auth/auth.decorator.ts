import { MethodDecorator } from 'ts-typedefs';
import { UseGuards, SetMetadata } from '@nestjs/common';

import { UserRole          } from '@modules/user/user-role.enum';
import { composeDecorators } from '@utils/meta';
import { AuthGuard         } from './auth.guard';
import { RolesMetaKey, OptionalAuthMetaKey } from './constants';

export const Auth = (...roles: UserRole[]) => composeDecorators<MethodDecorator>(
    SetMetadata(RolesMetaKey, roles),
    UseGuards(AuthGuard) as MethodDecorator
);

export const OptionalAuth = composeDecorators<MethodDecorator>(
    SetMetadata(OptionalAuthMetaKey, true),
    UseGuards(AuthGuard) as MethodDecorator
);