import { Component } from '@angular/core';
import { ITdDataTableColumn } from '@covalent/core/data-table';

import { PageFetcherFn } from '@app/common/pagination/pagination.interfaces';
import { SortingOrder, FilterUnion, UserPaginationInput  } from '@app/gql/generated';

import { UserService } from '../user.service';
import { PagedUser   } from '../user.interfaces';


@Component({
    selector:    'app-all-users',
    templateUrl: './all-users.component.html',
    styleUrls:  ['./all-users.component.scss']
})
export class AllUsersComponent {

    tableColumnsConfig: ITdDataTableColumn[] = [
        { name: 'role',   label: 'Role', width: 80 },
        { name: 'login',  label: 'Login' },
        { name: 'name',   label: 'Name' },
        { name: 'creationDate', label: 'How old kukold' }
    ];

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

    constructor(private readonly users: UserService) {}
}