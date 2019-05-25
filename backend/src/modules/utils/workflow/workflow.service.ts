import * as Coll from 'typescript-collections';
import { Injectable } from '@nestjs/common';
import { AsyncFunc, FuncContext, AsyncFuncReturnType } from 'ts-typedefs';

import { LoggingService } from '@utils/logging/logging.service';


@Injectable()
export class WorkflowService {

    constructor(
        private readonly log: LoggingService
    ) {}

    /**
     * Returns a Promise, that will be resolved in `msec` miliseconds.
     */
    delay(msec: number) {
        return new Promise<void>(resolve => setInterval(resolve, msec));
    }

    /** Rate limit ensures a function is never called more than every [rate]ms
     *  Unlike lodash's _.throttle function, function calls are queued so that
     *   requests are never lost and simply deferred until some other time.
     *
     * @param func Async function to limit execution rate.
     * @param minDelay Minimum time to wait between function calls (miliseconds).
     *
     * @copyright https://gist.github.com/mattheworiordan/1084831 
     */
    limitExecRate<
        TFn extends AsyncFunc<any[], any>
    >
    (func: TFn, minDelay: number) {       

        type PromiseResolveFn = (result: AsyncFuncReturnType<TFn>) => void;
        type PromiseRejectFn  = (error: unknown) => void;

        const queue = new Coll.Queue<[
            PromiseResolveFn, 
            PromiseRejectFn,
            FuncContext<TFn>, 
            Parameters<TFn>
        ]>();
        let isWaiting = false;
        
        return function wrapper(this: FuncContext<TFn>, ...args: Parameters<TFn>) {
            return new Promise<AsyncFuncReturnType<TFn>>((resolve, reject) => {
                if (isWaiting) {
                    queue.enqueue([resolve, reject, this, args]);
                    return;
                } 
                setTimeout(() => {
                    isWaiting = false;
                    if (!queue.isEmpty()) {
                        const [headResolve, headReject, headThis, headArgs] = queue.dequeue()!;
                        wrapper.apply(headThis, headArgs).then(headResolve, headReject);
                    }
                }, minDelay);
                isWaiting = true;
                func.apply(this, args).then(resolve, reject);
            });
        };
    }


    /**
     * Awaits `routine()` and prints its execution time to the console.
     */
    async measurePerformance(routine: () => Promise<void>, functionName = routine.name) {
        this.log.info(`invoking ${functionName}`);
        const before = Date.now();
        await routine();
        const after = Date.now();
        this.log.info(`${functionName} was running ${after - before} ms`);
    }


}
