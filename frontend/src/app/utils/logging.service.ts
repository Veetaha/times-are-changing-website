import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class LoggingService {

    private getCurrentTime() {
        return `${new Date().toUTCString()} │ `;
    }

    /**
     * Logs current time with, optional description and detailed view on `payload` object.
     * If you have no object to view you may forward a single string message as a `payload`.
     * 
     * @param payload       Object, which state needs to be logged.
     * @param description   Additional info message to be logged before `payload`.
     */
    info(payload: unknown, description = '') {
        console.log(`${this.getCurrentTime()} Info: ${description} `);
        console.dir(payload);
    }

    /**
     * The same as info(), but if `!(payload instanceof Error)` logs additional
     * stacktrace, otherwise uses provided `Error` stacktrace of `payload`.
     * Makes program to hault execution when invoking this function with debugger.
     * 
     * @param payload       `Error` or vanilla object, which state needs to be logged.
     * @param description   Additional info message to be logged before `payload`.
     */
    error(payload: unknown, description = '') {
        debugger;
        console.error(`${this.getCurrentTime()} Error: ${description} `);
        if (payload instanceof Error) {
            console.error(payload);
        } else {
            console.dir(payload);
            console.error(new Error('View stacktrace'));
        }
    }

    /**
     * Same as info(), but has warning style formatting.
     * 
     * @param payload     Vanilla object, which state needs to be logged.
     * @param description Additional info message to be logged before `payload`.
     */
    warning(payload: unknown, description = '') {
        console.warn(`${this.getCurrentTime()} Warning: ${description} `);
        console.dir(payload);
    }
}