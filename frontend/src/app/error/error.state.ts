import { State, StateContext, Action, Selector, Store } from '@ngxs/store';

import { SnackBarService } from '@app/common/snack-bar.service';
import { OpenHomePage } from '@app/app.actions';

import { CriticalError, Warning  } from './error.actions';
import { ErrorStateModel as StateModel } from './error.model';


type StateCtx = StateContext<StateModel>;

@State<StateModel>({
    name: 'error',
    defaults: {
        message: null
    }
})
export class ErrorState {

    constructor(
        readonly snackBars: SnackBarService,
        readonly store: Store
    ) {}

    @Selector() static message({message}: StateModel) { return message; }


    @Action(CriticalError)
    raiseError(ctx: StateCtx, {message}: CriticalError) {
        ctx.setState({ message });
        this.snackBars.showError(message);
        this.store.dispatch(OpenHomePage);
    }

    @Action(Warning)
    raiseWarning(ctx: StateCtx, {message}: Warning) {
        ctx.setState({message});
        this.snackBars.showWarning(message);
    }

}