import { Store } from '@ngxs/store';
import { Nullable } from 'ts-typedefs';
import { Observable } from 'rxjs';
import { Component, Input } from '@angular/core';

import { AuthState } from '@app/auth/auth.state';
import { CommonState } from '../common.state';

import { Rateful, Rating } from './rateful.obj';
import { Warning } from '@app/error/error.actions';

export type RatingUpdater = (newRating: Nullable<Rating>) => Observable<unknown>;

@Component({
    selector:    'app-rating',
    templateUrl: './rating.component.html',
    styleUrls:  ['./rating.component.scss']
})
export class RatingComponent {
    /**
     * Target object to manage rating for.
     */
    @Input() rateful!: Rateful;
    /**
     * Callback function that sends a request to the backend to update current
     * `Rateful` object rating.
     */
    @Input() ratingUpdater!: RatingUpdater;

    isAwaitingResponses$ = this.store.select(CommonState.isAwaitingResponses);
    client$ = AuthState.selectClient(this.store);

    constructor(private readonly store: Store) {}

    onRatingBtnClicked(isLikeBtn: boolean) {
        const { myRating } = this.rateful;

        // if no initial rating was set or client swapped like to dislike or vice versa
        // otherwise, remove his [dis]like

        // FIXME: rating counts doesn't get updated under some conditions
        const newRating = myRating == null || myRating.hasLiked !== isLikeBtn
            ? { hasLiked: isLikeBtn }
            : null;

        this.ratingUpdater(newRating).subscribe(
            () => Rateful.updateRating(this.rateful, newRating),

            err => this.store.dispatch(new Warning(
                `Backend failed to update rating: ${err.message}`
            ))
        );
    }

    isButtonActive(isLikeBtn: boolean) {
        const { myRating } = this.rateful;
        return myRating != null && myRating.hasLiked === isLikeBtn;
    }
}