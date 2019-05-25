/**
 * Workaround for `as const` syntax, as Angular currently doesn't support `TypeScript 3.4`.
 */
export function literal<T>(value: T): T {
    return value;
}