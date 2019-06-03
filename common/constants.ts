import { IntRange } from './utils/math/int-range';

export const limits = {
    news: {
        title: new IntRange(1, 256),
        body:  new IntRange(0, 9001),
    },
    newsComment: {
        body: new IntRange(0, 3001)
    },

    user: {
        name:     new IntRange(3, 256),
        password: new IntRange(5, 37),
        login:    new IntRange(2, 37),
    },

    imgId: new IntRange(0, 256)
};