import escapeStringRegExp from 'escape-string-regexp';
import { Component } from '@angular/core';
import { ITdDataTableColumn } from '@covalent/core/data-table';

import { PageFetcherFn } from '@app/common/pagination/pagination.interfaces';
import { SortingOrder  } from '@app/gql/generated';

import { UserService } from '../user.service';
import { PagedUser } from '../user.interfaces';


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
        const sort = { creationDate: { ordering:  SortingOrder.Desc } };

        if (search == null) {
            return this.users.getUsersPage({ limit, offset, sort });
        }

        const strFilter = { iregexp: `.*${escapeStringRegExp(search)}.*` };
        return this.users.getUsersPage({
            limit, offset, sort, filter: { props: { name: strFilter, login: strFilter } }
        });
    }

    constructor(private readonly users: UserService) {}
}