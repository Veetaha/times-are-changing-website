import { IntRange } from './utils/math/int-range';

export const limits = {
    proposal: {
        name:      new IntRange(1, 256),
        introText: new IntRange(0, 256),
        bodyText:  new IntRange(0, 5001),
    },

    user: {
        name:     new IntRange(3, 256),
        password: new IntRange(5, 37),
        login:    new IntRange(2, 37),
    },

    imageUrl:     new IntRange(0, 256)
};