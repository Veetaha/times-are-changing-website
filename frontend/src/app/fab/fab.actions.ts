import { createPayloadedAction } from '@utils/ngxs/create-payloaded-action';
import { createSimpleAction } from '@utils/ngxs/create-simple-action';

import { FabStateModel } from './fab.model';

export const SetFab = createPayloadedAction<FabStateModel>('[Fab] SetFabAction');
export type SetFab = InstanceType<typeof SetFab>;

export const DeleteFab = createSimpleAction('[Fab] DeleteFab');


// this action should be handled inside the component that uses the global 
// floating action button via ngxs `Actions`
export const FabClicked = createSimpleAction('[Fab] FabClicked');