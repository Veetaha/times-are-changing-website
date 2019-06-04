/**
 * Checks `suspect` to be a positive integer.
 */
export function isValidId(suspect: number) {
    return !Number.isNaN(suspect) && Number.isInteger(suspect) && suspect > 0;
}