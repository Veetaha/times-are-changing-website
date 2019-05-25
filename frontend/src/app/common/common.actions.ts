export class AwaitResponse {
    static readonly type = '[Common] AwaitResponse';
    constructor(readonly awaiting: boolean) {}
}

export class Info {
    static readonly type = '[Common] Info';
    constructor(readonly detail: string, readonly summary = 'Info') {}
}

export class Success {
    static readonly type = '[Common] Success';
    constructor(readonly detail: string, readonly summary = 'Success') {}
}