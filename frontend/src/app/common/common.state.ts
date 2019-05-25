import { State, StateContext, Action, Selector } from '@ngxs/store';

import { SnackBarService } from './snack-bar.service';
import { CommonStateModel as StateModel } from './common.model';
import { AwaitResponse, Info, Success   } from './common.actions';

type StateCtx = StateContext<StateModel>;

@State<StateModel>({
    name: 'common',
    defaults: {
        awaitedResponses: 0
    }
})
export class CommonState {
    @Selector() static isAwaitingResponses(s: StateModel) { 
        return s.awaitedResponses > 0; 
    }

    constructor(private readonly snackBars: SnackBarService) {}

    @Action(Info)
    info(_ctx: StateCtx, { detail, summary }: Info) {
        this.snackBars.showInfo(detail, summary);
    }

    @Action(Success)
    success(_ctx: StateCtx, { detail, summary }: Success) {
        this.snackBars.showSuccess(detail, summary);
    }

    @Action(AwaitResponse)
    awaitResponse({patchState, getState}: StateCtx, {awaiting}: AwaitResponse) {
        patchState({
            awaitedResponses: getState().awaitedResponses + (awaiting ? +1 : -1)
        });
    }

}