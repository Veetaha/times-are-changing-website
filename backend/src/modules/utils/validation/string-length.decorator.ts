import { Length   } from 'class-validator';

import { IntRange } from '@common/utils/math/int-range';

export function StringLength({ min, max}: IntRange) {
    return Length(min, max - 1);
}