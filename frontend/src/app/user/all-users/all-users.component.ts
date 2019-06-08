import { Component } from '@angular/core';
import { Store } from '@ngxs/store';
import { ITdDataTableColumn } from '@covalent/core/data-table';

import { AuthState     } from '@app/auth/auth.state';
import { ConfigService } from '@app/config/config.service';
import { PageFetcherFn } from '@app/common/pagination/pagination.interfaces';
import { SortingOrder, FilterUnion, UserPaginationInput  } from '@app/gql/generated';

import { UserService } from '../user.service';
import { PagedUser   } from '../user.interfaces';
import { OpenUserProfilePage } from '../user-routing.actions';


@Component({
    selector:    'app-all-users',
    templateUrl: './all-users.component.html',
    styleUrls:  ['./all-users.component.scss']
})
export class AllUsersComponent {
    client$ = AuthState.selectClient(this.store);
    readonly dateFormat: string;

    tableColumnsConfig: ITdDataTableColumn[] = [
        { name: 'role',   label: 'Role', width: 80 },
        { name: 'user',   label: 'User' },
        { name: 'creationDate', label: 'How old kukold' }
    ];

    constructor(
        private readonly users: UserService,
        private readonly store: Store,
        config: ConfigService
    ) {
        this.dateFormat = config.dateFormat;
    }


    usersPageFetcher: PageFetcherFn<PagedUser> = ({limit, offset, search}) => { 
        const query: UserPaginationInput = { 
            limit, 
            offset, 
            sort: { creationDate: { ordering: SortingOrder.Desc } }
        };

        if (search != null) {
            const strFilter = { ilike: search };           
            query.filter = {
                unionMode: FilterUnion.Or,
                props: { name: strFilter, login: strFilter  } 
            };
        }

        return this.users.getUsersPage(query);
    }


    openUserProfilePage(userLogin: string) {
        this.store.dispatch(new OpenUserProfilePage(userLogin));
    }
}