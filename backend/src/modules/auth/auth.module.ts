import { Module, forwardRef } from '@nestjs/common';

import { CommonModule  } from '@modules/common/common.module';
import { UserModule    } from '@modules/user/user.module';
import { AuthService   } from './auth.service';
import { AuthResolver  } from './auth.resolver';
import { AuthGuard     } from './auth.guard';
import { GetClientPipe } from './get-client.pipe';
import { JwtStrategy   } from './jwt.strategy';


@Module({
    imports: [
        CommonModule,
        forwardRef(() => UserModule)
    ],
    providers: [AuthService, AuthResolver, AuthGuard, GetClientPipe, JwtStrategy],
    exports:   [AuthService, AuthGuard]
})
export class AuthModule {}