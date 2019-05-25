export class Warning {
    static readonly type: string = "[Error] Warning";
    readonly message: string;
    constructor(err: unknown = 'some warning') {
        this.message = typeof err === 'string' ? 
            err                                :
            err instanceof Error               ? 
            this.getMessageFromError(err)      :
            `Non-error object was thrown: ${err}`;
    }

    private getMessageFromError({ message }: Error) {
        return message;
        // return !isDevelopmentMode || stack == null ? message : stack;
    }
}

export class CriticalError extends Warning {
    static readonly type = "[Error] CriticalError";
    constructor(err: unknown = 'some critical error') {
        super(err);
    }
}
