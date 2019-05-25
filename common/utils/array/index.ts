/**
 * Swaps items in `arr` at indexes `i`, `j`.
 * @param arr Array to swap items in. 
 * @param i   Index of `arr` item to swap with `arr[j]`
 * @param j   Index of `arr` item to swap with `arr[i]`
 */
export function swapItems<T>(arr: T[], i: number, j: number) {
    const temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
}
