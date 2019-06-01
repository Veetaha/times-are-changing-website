import { Nullable } from 'ts-typedefs';
import { tap, skip, map, catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { State, Selector, StateContext, Action, NgxsOnInit, UpdateState, Store } from '@ngxs/store';


import { UserRole } from '@app/gql/generated';
import { Warning  } from '@app/error/error.actions';
import { Success, Info } from '@app/common/common.actions';

import { LoggingService } from '@utils/logging.service';

import { ClientAndToken, Client  } from './interfaces';
import { SignIn, SignUp, SignOut } from './auth.actions';
import { AuthService             } from './auth.service';
import { 
    AuthStateModel as StateModel, createFetchingClientSnap, createAuthSnap, stableUnAuthSnap
} from './auth.model';



type StateCtx = StateContext<StateModel>;

@State<StateModel>({
    name: 'auth'
})
export class AuthState implements NgxsOnInit {
    constructor(
        private readonly store:     Store,
        private readonly auth:      AuthService,
        private readonly log:       LoggingService
    ) {}

    static selectClientRole(store: Store) {
        return this.selectClient(store).pipe(map(
            client => client == null ? UserRole.Guest : client.role
        ));
    }

    static selectClient(store: Store) {
        return this.skipOneIfFetchingClient(store, store.select(this.clientSnap));
    }

    @Selector() static clientRoleSnap  (s: StateModel) { return this.getClientRole(s.client); } 
    @Selector() static token           (s: StateModel) { return s.token; }
    @Selector() static clientSnap      (s: StateModel) { return s.client; }
    @Selector() static isFetchingClient(s: StateModel) { return s.isFetchingClient; }
    @Selector() static isAuthorizedSnap(s: StateModel) { return s.client != null; }

    private static skipOneIfFetchingClient<TValue>(store: Store, observable: Observable<TValue>) {
        return store.selectSnapshot(this.isFetchingClient) 
            ? observable.pipe(skip<TValue>(1))
            : observable;
    }

    private static getClientRole(client: Nullable<Client>) {
        return client == null ? UserRole.Guest : client.role;
    }

    ngxsOnInit() {
        this.log.info('ngxsOnInit() is now working!');
    }

    @Action(UpdateState)
    _ngxsOnInit(ctx: StateCtx): void | Observable<any> {
        
        this.log.warning('Using temporary workaround @Action(UpdateState) instead of ngxsOnInit()');

        const { token } = ctx.getState();
        if (token != null) {
            ctx.setState(createFetchingClientSnap(token));
            // you should subscribe to this observable when moving this code to ngxsOnInit()
            return this.auth.getMe().pipe(
                tap(client => ctx.setState(createAuthSnap({ token, client }))),
                catchError(() => {
                    ctx.setState(stableUnAuthSnap);
                    throw new Error('Could not restore previous client session.');
                })
            );
        } else {
            ctx.setState(stableUnAuthSnap);
        }
    }

    @Action(SignIn)
    signIn(ctx: StateCtx, action: SignIn) {
        this.ensureCanAuthOrFail(ctx);
        return this.fetchClient(ctx, this.auth.signIn(action)).pipe(
            tap(res => this.store.dispatch(res == null 
                ? new Warning(`Failed to sign in, probably invalid credentials.`)
                : new Success(
                    `Signed in under name '${res.client.name}'`,
                    'Successfully signed in'
                )
            )));
    }

    @Action(SignUp)
    signUp(ctx: StateCtx, action: SignUp) {
        this.ensureCanAuthOrFail(ctx);
        return this.fetchClient(ctx, this.auth.signUp(action)).pipe(
            tap(res => this.store.dispatch(new Success(
                `Signed up under name '${res.client.name}'`,
                'Successfully signed up'
            ))),
            catchError(() => this.store.dispatch(new Warning(
                `Failed to sign up, login '${action.credentials.login
                }' is probably already taken.`
            )))
        );
    }

    @Action(SignOut)
    signOut(ctx: StateCtx) {
        this.ensureCanSignOutOrFail(ctx);
        ctx.setState(stableUnAuthSnap);
        this.store.dispatch(new Info(
            `Sign in again to get access to your account.`, 
            'You are signed out'
        ));
    }


    private fetchClient<TClientAndToken extends Nullable<ClientAndToken>>(
        ctx:           StateCtx, 
        userAndToken$: Observable<TClientAndToken>
    ) {
        ctx.setState(createFetchingClientSnap());
        return userAndToken$.pipe(
            tap(res => ctx.setState(
                res == null ? stableUnAuthSnap : createAuthSnap(res!)
            )),
            catchError(err => { 
                ctx.setState(stableUnAuthSnap);
                throw err;
            })
        );
    }

    private ensureCanSignOutOrFail(ctx: StateCtx) {
        if (ctx.getState().token == null) {
            throw new Error("Client is not signed in.");
        }
    }

    private ensureCanAuthOrFail(ctx: StateCtx) {
        const state = ctx.getState();
        if (state.token != null) {
            throw new Error("Client is already signed in.");
        }
        if (state.isFetchingClient) {
            throw new Error("Can't sign in, previous request is not ready.");
        }
    }

}