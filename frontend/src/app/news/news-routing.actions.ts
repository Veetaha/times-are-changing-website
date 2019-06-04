import { Navigate } from '@ngxs/router-plugin';

export class OpenNewsDetailsPage extends Navigate {
    constructor(proposalId: number) {
        super([`news`, proposalId]);
    }
}