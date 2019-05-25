import { Module } from '@nestjs/common';

import { UtilsModule } from '@utils/utils.module';
import { ConfigService } from './config.service';

@Module({
    imports:   [UtilsModule],
    providers: [ConfigService],
    exports:   [ConfigService]
})
export class ConfigModule {
    static readonly asyncOptsProvider = { 
        imports:     [ConfigModule], 
        useExisting: ConfigService, 
    };
}
