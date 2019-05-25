export function createSimpleAction(type: string) {
    return class GenericSimpleAction {
        static readonly type     = type;
        static readonly instance = new GenericSimpleAction;

        protected constructor() {}
    };
}