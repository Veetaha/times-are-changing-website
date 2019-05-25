import { Injectable, ErrorHandler, Injector } from '@angular/core';
import { Store } from '@ngxs/store';
import { CriticalError } from './error.actions';
import { LoggingService } from '@utils/logging.service';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {

    constructor(private readonly injector: Injector) { }
    handleError(err: unknown) {
        this.injector
            .get<LoggingService>(LoggingService)
            .error(err);

        this.injector
            .get<Store>(Store)
            .dispatch(new CriticalError(err));
    }
}