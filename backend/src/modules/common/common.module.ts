import { Module         } from '@nestjs/common';
import { GraphQLModule  } from '@nestjs/graphql';
import { TypeOrmModule  } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { JwtModule      } from '@nestjs/jwt';

import { UtilsModule  } from '@utils/utils.module';
import { ConfigModule } from '@modules/config/config.module';



const reexports = [
    UtilsModule,
    ConfigModule,
    GraphQLModule.forRootAsync(ConfigModule.asyncOptsProvider),
    TypeOrmModule.forRootAsync(ConfigModule.asyncOptsProvider),
    PassportModule.registerAsync(ConfigModule.asyncOptsProvider),
    JwtModule.registerAsync(ConfigModule.asyncOptsProvider),
];


@Module({
    imports: reexports,
    exports: reexports
})
export class CommonModule {}
