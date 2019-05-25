import Morgan  from 'morgan';
import { NestFactory            } from '@nestjs/core';
import { ValidationPipe         } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';

import { AppModule      } from '@modules/app.module';
import { ConfigService  } from '@modules/config/config.service';
import { LoggingService } from '@utils/logging/logging.service';

async function bootstrap() {
    const app    = await NestFactory.create<NestExpressApplication>(AppModule);
    const config = app.get(ConfigService);
    const logger = app.get(LoggingService);

    await app
        .useGlobalPipes(new ValidationPipe({ transform: true }))
        .useStaticAssets(config.frontendPublicDir)
        .useStaticAssets(
            config.gqlApiDocsDir,
            config.createGqlApiDocsServeStaticOptions()
        )
        .use(Morgan('dev'))
        .listen(config.port);
        
    logger.info(`🚀  Server is listening on port ${config.port}`);
}

bootstrap()
    .catch(err => console.error('Bootstrapping error:', err));
      