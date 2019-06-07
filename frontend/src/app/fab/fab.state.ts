import { State, Action, StateContext, Selector } from '@ngxs/store';

import { FabStateModel as StateModel, noFabSnap } from './fab.model';
import { SetFab, DeleteFab } from './fab.actions';

type StateCtx = StateContext<StateModel>;

@State<StateModel>({
    name: 'fab',
    defaults: noFabSnap
})
export class FabState {

    @Selector()
    static fab(s: StateModel) { return s; }

    @Action(SetFab)
    setFab(ctx: StateCtx, action: SetFab) {
        ctx.setState(action);
    }

    @Action(DeleteFab)
    DeleteFab(ctx: StateCtx) {
        ctx.setState(noFabSnap);
    }

}