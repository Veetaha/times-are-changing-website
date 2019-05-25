import Express from 'express';
import { Catch, NotFoundException, ExceptionFilter, ArgumentsHost } from '@nestjs/common';
import { ConfigService } from '@modules/config/config.service';

@Catch(NotFoundException)
export class NotFoundExceptionFilter implements ExceptionFilter<NotFoundException> {
    constructor(private readonly config: ConfigService) {}

    catch(_err: NotFoundException, host: ArgumentsHost){ 
        host.switchToHttp()
            .getResponse<Express.Response>()
            .sendFile(this.config.frontendIndexHtmlPath);
    }
}