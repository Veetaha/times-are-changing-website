import { Module } from '@nestjs/common';

import { CommonModule   } from './common/common.module';
import { UserModule     } from './user/user.module';
import { AuthModule     } from './auth/auth.module';
import { FrontendModule } from './frontend/frontend.module';

@Module({
    imports: [
        CommonModule,
        UserModule,
        AuthModule,
        FrontendModule
    ]
})
export class AppModule {}
