import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';

import { CommonModule            } from '@modules/common/common.module';
import { NotFoundExceptionFilter } from './not-found-exception.filter';

@Module({
    imports:   [ CommonModule ],
    providers: [{ provide: APP_FILTER, useClass: NotFoundExceptionFilter }]
})
export class FrontendModule {}