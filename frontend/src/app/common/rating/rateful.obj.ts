import { Nullable } from 'ts-typedefs';

/**
 * Generic `Rateful` object may be any entity that obeys to the following contract.
 */
export interface Rateful {
    likesAmount:    number;
    dislikesAmount: number;
    myRating?:      Nullable<Rating>;
}
export interface Rating {
    hasLiked: boolean;
}

/**
 * Methods that are provided to manage the logic of `Rateful` objects.
 */
export namespace Rateful {
    export function updateRating(self: Rateful, newRating: Nullable<Rating>) {
        const prevRating = self.myRating;
        if (prevRating == null && newRating == null) {
            return;                     
        }
        if (prevRating == null || newRating == null) {
            updateOnlyLikesOrDislikes(
                self, (prevRating || newRating)!.hasLiked, prevRating == null
            );
        } else {
            swapLikeAndDislike(self, newRating.hasLiked);
        }
        self.myRating = newRating;
    }
    function updateOnlyLikesOrDislikes(self: Rateful, isLikes: boolean, shouldIncrement: boolean) {
        self[isLikes ? 'likesAmount' : 'dislikesAmount'] += shouldIncrement ? +1 : -1;
    }
    function swapLikeAndDislike(self: Rateful, shouldSetLike: boolean) {
        const incr  = shouldSetLike ? +1 : -1;
        self.likesAmount    += incr;
        self.dislikesAmount -= incr;
    }
}