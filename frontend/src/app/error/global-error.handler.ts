import { Injectable, ErrorHandler, Injector } from '@angular/core';
import { Store } from '@ngxs/store';
import { CriticalError } from './error.actions';
import { LoggingService } from '@utils/logging.service';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {

    prevError: unknown = null;

    constructor(private readonly injector: Injector) { }
    handleError(err: unknown) {
        // workaround for handling same error multiple times
        // this happens when an observable that throws an error has multiple 
        // subscribers 
        if (this.prevError === err) { 
            return;
        }
        this.prevError = err;
        this.injector
            .get<LoggingService>(LoggingService)
            .error(err);

        this.injector
            .get<Store>(Store)
            .dispatch(new CriticalError(err));
    }
}