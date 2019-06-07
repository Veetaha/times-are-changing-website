import { Length   } from 'class-validator';

import { IntRange } from '@common/utils/math/int-range';

/** 
 * Shorthand validation decorator to verify for a string with length `[min, max]`.
 * Both bounds are inclusive.
 */
export function StringLength({min, max}: IntRange) {
    return Length(min, max);
}