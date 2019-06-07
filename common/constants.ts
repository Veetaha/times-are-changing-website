import { IntRange } from './utils/math/int-range';

export const limits = {
    news: {
        title: new IntRange(1, 255),
        body:  new IntRange(0, 50000),
    },
    newsComment: {
        body: new IntRange(0, 5000)
    },

    user: {
        name:     new IntRange(3, 255),
        password: new IntRange(5, 36),
        login:    new IntRange(2, 36),
    },
    imgId: new IntRange(36, 36)
};